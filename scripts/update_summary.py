"""
AI News Aggregator - 摘要生成器
自动生成详细的 AI 热点摘要并更新到 index.html
"""

import json
import re
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any


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
        # 移除 HTML 实体
        title = re.sub(r'&#\d+;', '', title)
        # 移除多余空白
        title = ' '.join(title.split())
        key_news.append(title)

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

    # 标题
    html_parts.append(f'            <h2>📊 今日热点摘要</h2>')
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
    更新 index.html 中的摘要部分

    Args:
        summary_html: 生成的摘要 HTML
        index_path: index.html 文件路径
    """
    if index_path is None:
        # 默认路径
        project_root = Path(__file__).parent.parent
        index_path = project_root / "index.html"

    index_path = Path(index_path)

    # 读取 index.html
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 查找并替换摘要部分
    pattern = r'(<div class="summary-section">.*?<h2>📊 今日热点摘要</h2>).*?(</div>\s*</div>)'

    def replace_summary(match):
        return match.group(1) + "\n" + summary_html + "\n        " + match.group(2)

    new_content = re.sub(pattern, replace_summary, content, flags=re.DOTALL)

    # 写回文件
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ 已更新 {index_path}")


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

    # 更新根目录的 index.html（用于 GitHub Pages）
    index_path = project_root / "index.html"
    update_index_html(summary_html, index_path)

    # 更新 output/today.html（用于本地服务器）
    today_path = project_root / "output" / "today.html"
    update_index_html(summary_html, today_path)

    print("✅ 摘要更新完成！")
    print("📌 已同步更新:")
    print(f"   - {index_path} (GitHub Pages)")
    print(f"   - {today_path} (本地服务器)")


if __name__ == "__main__":
    main()
