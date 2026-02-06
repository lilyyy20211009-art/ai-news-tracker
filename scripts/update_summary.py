"""
AI News Aggregator - 摘要生成器
自动生成详细的 AI 热点摘要并更新到 index.html 和 today.html
"""

import html
import json
import os
import re
import unicodedata
import yaml
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any

# DeepSeek API 配置
def load_api_key():
    """从环境变量或配置文件加载 API Key"""
    # 先尝试环境变量
    api_key = os.environ.get("DEEPSEEK_API_KEY")
    if api_key:
        return api_key, os.environ.get("DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1")

    # 尝试从配置文件读取
    config_paths = [
        Path(__file__).parent.parent / "config.yaml",
        Path("~/config.yaml").expanduser(),
    ]

    for config_path in config_paths:
        if config_path.exists():
            try:
                with open(config_path, 'r', encoding='utf-8') as f:
                    config = yaml.safe_load(f)
                    api_key = config.get("llm", {}).get("api_key", "")
                    base_url = config.get("llm", {}).get("base_url", "https://api.deepseek.com")
                    if api_key:
                        return api_key, base_url
            except Exception as e:
                print(f"读取配置文件失败: {e}")

    return None, None

DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL = load_api_key()
if DEEPSEEK_BASE_URL and not DEEPSEEK_BASE_URL.endswith("/v1"):
    DEEPSEEK_BASE_URL = DEEPSEEK_BASE_URL + "/v1"


# 英文标题到中文的简单翻译映射
# 注意：这里的 key 必须与 HTML 实体解码后的标题完全匹配
TITLE_TRANSLATIONS = {
    # The Verge - 精确匹配解码后的标题
    "Google's annual revenue tops $400 billion for the first time": "Google 年收入首次突破 4000 亿美元",
    "Sam Altman responds to Anthropic's 'funny' Super Bowl ads": "Sam Altman 回应 Anthropic 超级碗广告",
    "OpenClaw's AI 'skill' extensions are a security nightmare": "OpenClaw AI 扩展存在严重安全问题",
    "GitHub adds Claude and Codex AI coding agents": "GitHub 添加 Claude 和 Codex AI 编程助手",
    "Anthropic says 'Claude will remain ad-free,' unlike ChatGPT": "Anthropic 承诺 Claude 将永远无广告",
    "Sen. Warren wants to know what Google Gemini's built-in checkout means for user privacy": "参议员 Warren 质疑 Google Gemini 结账功能隐私问题",

    # TechCrunch
    "Sam Altman got exceptionally testy over Claude Super Bowl ads": "Sam Altman 对 Claude 超级碗广告反应强烈",
    "Alphabet won't talk about the Google-Apple AI deal, even to investors": "Alphabet 拒绝谈论 Google-Apple AI 合作",
    "Google's Gemini app has surpassed 750M monthly active users": "Google Gemini 月活用户超 7.5 亿",
    "Meet Gizmo: A TikTok for interactive, vibe-coded mini apps": "Gizmo：类似 TikTok 的交互式应用平台",
    "AI SRE Resolve AI confirms $125M raise, unicorn valuation": "Resolve AI 获 1.25 亿美元融资，估值达独角兽",
    "Amazon to begin testing AI tools for film and TV production next month": "Amazon 将开始测试影视制作 AI 工具",
    "A16z just raised $1.7B for AI infrastructure": "A16z 筹集 17 亿美元专注 AI 基础设施",
    "ElevenLabs raises $500M from Sequoia at an $11 billion valuation": "ElevenLabs 融资 5 亿美元，估值达 110 亿美元",
    "Alexa+, Amazon's AI assistant, is now available to everyone in the US": "Alexa+ AI 助手向全美开放",
    "Tinder looks to AI to help fight 'swipe fatigue' and dating app burnout": "Tinder 使用 AI 对抗滑动疲劳",
    "ChatGPT now lets you call the AI for free": "ChatGPT 现在支持免费语音通话",
    "OpenAI in 'advanced talks' to host a data center with Oracle": "OpenAI 与 Oracle 洽谈建设数据中心",
    "Former Character.AI founders launch a new educational AI startup": "Character.AI 联合创始人推出教育 AI 创业公司",

    # NYT
    "Google Plans to Double Spending Amid A.I. Race": "Google 计划在 AI 竞赛中加倍投入",
    "Babies, Robots and Climate Change": "婴儿、机器人与气候变化",
    "Why A.I. Fears Are Battering Stocks, Again": "AI 恐惧再次冲击股市",
    "Bedrock, an A.I. Start-Up for Construction, Raises $270 Million": "Bedrock 机器人公司融资 2.7 亿美元",
    "A.I. Loves Fake Images. But They've Been a Thing Since Photography Began.": "AI 与虚假图片的历史",
}


def normalize_quotes(text: str) -> str:
    """将各种引号规范化为标准的直引号"""
    # Curly quotes to straight quotes mapping
    quote_map = {
        '\u2018': "'",  # Left single quotation mark
        '\u2019': "'",  # Right single quotation mark
        '\u201c': '"',  # Left double quotation mark
        '\u201d': '"',  # Right double quotation mark
        '\u0060': "'",  # Grave accent
        '\u00b4': "'",  # Acute accent
        '\u201a': ',',  # Single low-9 quotation mark
        '\u201b': "'",  # Single high-reversed-9 quotation mark
        '\u201e': '"',  # Double low-9 quotation mark
        '\u201f': '"',  # Double high-reversed-9 quotation mark
    }
    for curly, straight in quote_map.items():
        text = text.replace(curly, straight)
    return text


def translate_with_deepseek(title: str) -> str:
    """
    使用 DeepSeek API 翻译英文标题为中文

    Args:
        title: 英文标题

    Returns:
        中文翻译
    """
    if not DEEPSEEK_API_KEY:
        print("警告：未设置 DEEPSEEK_API_KEY 环境变量，使用简单翻译")
        return None

    try:
        from openai import OpenAI

        client = OpenAI(
            api_key=DEEPSEEK_API_KEY,
            base_url=DEEPSEEK_BASE_URL
        )

        prompt = f"""请将以下新闻标题翻译成中文，要求简洁、准确、专业。标题：{title}

注意：
1. 只输出翻译后的中文标题，不要有任何解释或额外内容
2. 保持专业术语的准确性（如 AI、Claude、ChatGPT 等）
3. 公司名称可以保留英文或使用中文通译
4. 翻译要简洁，符合中文新闻标题的习惯"""

        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=200
        )

        translated = response.choices[0].message.content.strip()
        return translated

    except ImportError:
        print("警告：未安装 openai 库，使用简单翻译")
        return None
    except Exception as e:
        print(f"DeepSeek API 调用失败: {e}")
        return None


def translate_title(title: str) -> str:
    """
    翻译英文标题为中文

    Args:
        title: 英文标题

    Returns:
        中文标题（如果没有匹配则返回原文）
    """
    # 先解码 HTML 实体
    decoded_title = html.unescape(title)

    # 规范化引号：将 curly quotes 转换为 straight quotes
    normalized_title = normalize_quotes(decoded_title)

    # 先尝试完全匹配（使用规范化的标题）
    if normalized_title in TITLE_TRANSLATIONS:
        return TITLE_TRANSLATIONS[normalized_title]

    # 移除多余空白
    clean_title = ' '.join(normalized_title.split())

    if clean_title in TITLE_TRANSLATIONS:
        return TITLE_TRANSLATIONS[clean_title]

    # 简单翻译：提取关键词
    keywords = {
        "Google": "谷歌", "OpenAI": "OpenAI", "Anthropic": "Anthropic",
        "Claude": "Claude", "ChatGPT": "ChatGPT", "Gemini": "Gemini",
        "AI": "AI", "raises": "融资", "raise": "融资", "investment": "投资",
        "launch": "发布", "released": "发布", "revenue": "收入", "users": "用户",
        "billion": "十亿", "million": "百万", "tops": "突破", "surpassed": "超过",
        "monthly active": "月活跃", "app": "应用", "ads": "广告", "ad": "广告",
        "extension": "扩展", "security": "安全", "nightmare": "噩梦",
        "coding": "编程", "assistant": "助手", "available": "可用", "testing": "测试",
        "tools": "工具", "production": "制作", "infrastructure": "基础设施",
        "valuation": "估值", "plans": "计划", "spending": "投入", "race": "竞赛",
    }

    result = normalized_title
    for en, zh in keywords.items():
        result = re.sub(r'\b' + en + r'\b', zh, result, flags=re.IGNORECASE)

    return result if result != normalized_title else normalized_title


def extract_key_news(items: List[Dict], source_filter: str = None, limit: int = 3) -> str:
    """
    提取关键新闻标题（用于摘要）

    Args:
        items: 新闻列表
        source_filter: 来源过滤器
        limit: 最多提取多少条

    Returns:
        关键新闻摘要字符串（用分号连接）
    """
    # 过滤来源
    if source_filter:
        filtered = [item for item in items if source_filter.lower() in item.get("来源", "").lower()]
    else:
        filtered = items

    # 提取前几条新闻作为关键新闻
    key_news = []
    for item in filtered[:limit]:
        title = item.get("标题", "")

        # 优先使用 DeepSeek API 翻译
        translated = translate_with_deepseek(title)
        if not translated:
            # 如果 API 翻译失败，使用本地简单翻译
            translated = translate_title(title)

        key_news.append(translated)

    return "；".join(key_news)


def generate_summary_html(items: List[Dict]) -> str:
    """
    生成详细的 HTML 摘要

    Args:
        items: 新闻列表

    Returns:
        HTML 格式的摘要
    """
    # 统计各平台数量
    stats = {
        "verge": 0,
        "techcrunch": 0,
        "nyt": 0,
        "youtube": 0,
        "total": len(items)
    }

    # 按来源分组
    by_source = {
        "The Verge AI": [],
        "TechCrunch AI": [],
        "NYT AI": [],
        "YouTube": []
    }

    for item in items:
        source = item.get("来源", "")
        if "verge" in source.lower():
            by_source["The Verge AI"].append(item)
            stats["verge"] += 1
        elif "techcrunch" in source.lower():
            by_source["TechCrunch AI"].append(item)
            stats["techcrunch"] += 1
        elif "nyt" in source.lower():
            by_source["NYT AI"].append(item)
            stats["nyt"] += 1
        elif "youtube" in source.lower():
            by_source["YouTube"].append(item)
            stats["youtube"] += 1

    # 获取今天的日期
    today = datetime.now().strftime("%Y年%m月%d日")

    # 生成 HTML
    html_parts = []

    # 标题由 update_index_html 中的正则保留，这里不生成
    # html_parts.append(f'            <h2>📊 今日热点摘要</h2>')
    html_parts.append(f'            <p class="highlight">{today}更新 · 共 {stats["total"]} 条内容</p>')

    # The Verge AI
    if by_source["The Verge AI"]:
        verge_summary = extract_key_news(items, "verge", limit=3)
        html_parts.append(f'            <h3>📰 The Verge AI（{stats["verge"]}条）</h3>')
        html_parts.append(f'            <p>{verge_summary}</p>')

    # TechCrunch AI
    if by_source["TechCrunch AI"]:
        tc_summary = extract_key_news(items, "techcrunch", limit=3)
        html_parts.append(f'            <h3>💰 TechCrunch AI（{stats["techcrunch"]}条）</h3>')
        html_parts.append(f'            <p>{tc_summary}</p>')

    # NYT AI
    if by_source["NYT AI"]:
        nyt_summary = extract_key_news(items, "nyt", limit=3)
        html_parts.append(f'            <h3>🏛️ NYT AI（{stats["nyt"]}条）</h3>')
        html_parts.append(f'            <p>{nyt_summary}</p>')

    # YouTube
    if by_source["YouTube"]:
        youtube_items = by_source["YouTube"]
        channels = list(set([item.get("来源", "").replace("YouTube - ", "") for item in youtube_items]))
        channel_count = len(channels)
        video_count = stats["youtube"]

        # 提取主题
        all_titles = " ".join([item.get("标题", "") for item in youtube_items])
        topics = []

        topic_keywords = {
            "商业|创业|business|entrepreneur": "AI 商业与创业",
            "演示|demo|project|showcase": "AI 项目演示",
            "理论|研究|paper|research": "AI 理论与研究",
            "趋势|展望|future|trend": "AI 趋势与展望",
            "教程|tutorial|how to|guide": "AI 教程学习",
            "编程|coding|programming": "AI 编程开发",
        }

        for pattern, topic in topic_keywords.items():
            if re.search(pattern, all_titles, re.IGNORECASE):
                topics.append(topic)

        # 检测公司
        companies = []
        company_keywords = {
            "google|gemini": "Google/Gemini",
            "openai|chatgpt": "OpenAI",
            "anthropic|claude": "Anthropic/Claude",
            "deepseek": "DeepSeek",
        }

        for pattern, company in company_keywords.items():
            if re.search(pattern, all_titles, re.IGNORECASE):
                companies.append(company)

        topic_str = "、".join(topics[:4]) if topics else "AI 相关内容"
        company_str = "、".join(companies[:2]) if companies else "主流 AI"

        html_parts.append(f'            <h3>🎥 YouTube（{stats["youtube"]}条）</h3>')
        html_parts.append(f'            <p>{channel_count}位博主发布{video_count}个视频，涵盖{topic_str}等内容，涉及{company_str}等公司产品</p>')

    return "\n".join(html_parts)


def update_index_html(summary_html: str, index_path: str = None):
    """
    更新 index.html 或 today.html 中的摘要部分

    Args:
        summary_html: 生成的摘要 HTML
        index_path: HTML 文件路径
    """
    index_path = Path(index_path)

    # 读取 HTML 文件
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 查找并替换摘要部分（更精确的模式，完全替换摘要内容）
    # 匹配从 <div class="summary-section"> 之后，到第一个 </div> 结束（摘要部分的结束）
    pattern = r'(<div class="summary-section">\s*<h2>📊 今日热点摘要</h2>\s*).*?(</div>\s*(?=<div class="filter-tabs">|<div id="newsContainer"|<script>|$))'

    def replace_summary(match):
        # 只保留开头的 div 标签和 h2 标题，然后插入新的摘要内容
        return match.group(1) + summary_html + "\n        " + match.group(2)

    new_content = re.sub(pattern, replace_summary, content, count=1, flags=re.DOTALL)

    # 写回文件
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ 已更新 {index_path}")


def update_app_js(items: List[Dict], app_js_path: str = None):
    """
    更新 app.js 中的新闻数据

    Args:
        items: 新闻列表
        app_js_path: app.js 文件路径
    """
    if app_js_path is None:
        project_root = Path(__file__).parent.parent
        app_js_path = project_root / "app.js"

    app_js_path = Path(app_js_path)

    # 生成 JavaScript 数据 - 需要转义换行符
    def escape_js_string(s):
        """转义 JavaScript 字符串中的特殊字符"""
        if not isinstance(s, str):
            return s
        # 转义换行符和其他特殊字符
        s = s.replace('\\', '\\\\')  # 反斜杠必须先转义
        s = s.replace('\n', '\\n')   # 换行
        s = s.replace('\r', '\\r')   # 回车
        s = s.replace('\t', '\\t')   # 制表符
        s = s.replace('"', '\\"')    # 双引号
        return s

    # 手动构建 JavaScript 数组
    js_lines = ['const newsData = [']
    for item in items:
        js_lines.append('    {')
        for key, value in item.items():
            if isinstance(value, str):
                escaped_value = escape_js_string(value)
                js_lines.append(f'"{key}": "{escaped_value}",')
            else:
                js_lines.append(f'"{key}": {value},')
        # 移除最后一行的逗号
        js_lines[-1] = js_lines[-1].rstrip(',')
        js_lines.append('    },')
    js_lines.append('];')

    js_data = '\n'.join(js_lines)

    # 读取 app.js
    with open(app_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 替换 newsData 数组
    pattern = r'const newsData = \[.*?\];'
    new_data = js_data

    new_content = re.sub(pattern, new_data, content, flags=re.DOTALL)

    # 写回文件
    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ 已更新 {app_js_path.name}")


def main():
    """主函数"""
    # 获取项目根目录
    project_root = Path(__file__).parent.parent
    news_json_path = project_root / "output" / "news.json"

    # 读取新闻数据
    if not news_json_path.exists():
        print(f"❌ 未找到数据文件: {news_json_path}")
        print("请先运行 python3 scripts/run_aggregator.py 生成数据")
        return

    with open(news_json_path, 'r', encoding='utf-8') as f:
        items = json.load(f)

    print(f"📊 读取到 {len(items)} 条新闻")

    # 生成摘要 HTML
    summary_html = generate_summary_html(items)

    print("\n📝 生成的摘要预览：")
    print(summary_html)
    print("\n")

    # 第一步：更新本地文件
    print("🔄 第一步：更新本地文件...")

    # 更新 output/today.html（本地服务器）
    today_path = project_root / "output" / "today.html"
    update_index_html(summary_html, today_path)

    # 更新 app.js（根目录，用于 GitHub Pages）
    update_app_js(items)

    print("\n✅ 本地文件更新完成！")
    print(f"   - {today_path.name} (本地服务器)")
    print(f"   - app.js (GitHub Pages 数据)")

    # 第二步：更新根目录 index.html
    print("\n🔄 第二步：更新 GitHub Pages 文件...")

    index_path = project_root / "index.html"
    update_index_html(summary_html, index_path)

    print(f"   - {index_path.name} (GitHub Pages)")

    print("\n✅ 全部更新完成！")
    print("\n📌 下一步：")
    print("   1. 本地测试：访问 http://127.0.0.1:5000/")
    print("   2. 确认无误后，运行以下命令推送到 GitHub：")
    print("      git add -A")
    print("      git commit -m '更新 AI 热点摘要'")
    print("      git push")


if __name__ == "__main__":
    main()
