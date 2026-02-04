"""
AI News Aggregator - LLM Processor
使用 DeepSeek 或其他 LLM 进行翻译、摘要和分类
"""

import os
from typing import List, Dict, Any, Optional
from datetime import datetime

try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False


class LLMProcessor:
    """LLM 内容处理器 - 翻译、摘要、分类"""

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        """
        初始化 LLM 处理器

        Args:
            api_key: API Key，默认从环境变量 DEEPSEEK_API_KEY 读取
            base_url: API Base URL，默认 DeepSeek
        """
        self.api_key = api_key or os.getenv("DEEPSEEK_API_KEY")
        self.base_url = base_url or "https://api.deepseek.com"

        if not self.api_key:
            print("警告: 未设置 API Key，LLM 处理功能将不可用")

    def _call_llm(self, prompt: str, response_format: Optional[Dict] = None) -> Dict[str, Any]:
        """调用 LLM API"""
        if not self.api_key or not HAS_OPENAI:
            raise RuntimeError("需要 openai 库和 API Key")

        client = OpenAI(api_key=self.api_key, base_url=self.base_url)

        kwargs = {
            "model": "deepseek-chat",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.3,
        }

        if response_format:
            kwargs["response_format"] = response_format

        response = client.chat.completions.create(**kwargs)
        return response.choices[0].message

    def translate_and_summarize(self, item: Dict[str, Any]) -> Dict[str, Any]:
        """
        翻译标题并生成摘要（如需要）

        处理规则:
        1. 将标题翻译成中文
        2. 如果标题超过 3 句话，生成 60-80 字中文摘要
        3. 其他字段保持一致

        Args:
            item: 原始内容项，包含 标题、日期、来源、链接、板块 等字段

        Returns:
            处理后的内容项
        """
        prompt = f"""你是一名新闻编辑，任务是将不同来源的标题翻译成中文，要求简洁、准确、有逻辑。请确保输出全是中文。若只有一条链接，保留链接即可。

输入信息：
标题：{item.get('标题', '')}
日期：{item.get('日期', '')}
来源：{item.get('来源', '')}
板块：{item.get('板块', '')}
链接：{item.get('链接', '')}

若标题内容大于三句话，则根据标题里所有的信息生成一段60–80字的中文摘要，遵循以下步骤和格式：

#步骤
1. 提取主语和核心动作，格式为"谁做了什么"
2. 概括主要功能或用途，格式为"实现什么功能，达到什么效果"
3. 如有亮点或创新点，请加以总结
4. 强调主观意义或影响，格式为"对什么有重要意义"

#输出要求
- 以"摘要："为开头，输出一条完整、通顺的中文句子，60–80字左右

#示例输出
"摘要：猫眼娱乐推出'神笔马良'AI工具，实现智能角色创作与分镜生成，提升创作效率，对内容创新具有重要推动作用。"

注意：除了"标题"字段可以修改，其他字段的内容严格保持和输入一致。"""

        try:
            response = self._call_llm(
                prompt,
                response_format={
                    "type": "json_schema",
                    "json_schema": {
                        "name": "news_item",
                        "strict": True,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "标题": {"type": "string"},
                                "日期": {"type": "string"},
                                "链接": {"type": "string"},
                                "来源": {"type": "string"},
                                "板块": {"type": "string"}
                            },
                            "required": ["标题", "日期", "链接", "来源", "板块"]
                        }
                    }
                }
            )

            import json
            result = json.loads(response.content)
            return result

        except Exception as e:
            print(f"LLM 处理失败: {e}")
            return item

    def categorize(self, item: Dict[str, Any]) -> str:
        """
        对内容进行分类

        分类选项:
        - 产品发布: 新工具、新服务发布
        - 研究突破: 论文、技术突破
        - 教程分享: 教程、指南
        - 观点评论: 观点、分析
        - 行业动态: 新闻、事件

        Args:
            item: 内容项

        Returns:
            分类标签
        """
        prompt = f"""请对以下 AI 新闻进行分类，只返回分类名称。

标题：{item.get('标题', '')}
来源：{item.get('来源', '')}

分类选项:
- 产品发布: 新工具、新服务发布
- 研究突破: 论文、技术突破
- 教程分享: 教程、指南
- 观点评论: 观点、分析
- 行业动态: 新闻、事件

只返回分类名称，不要其他内容。"""

        try:
            response = self._call_llm(prompt)
            category = response.content.strip()

            # 验证分类是否有效
            valid_categories = ["产品发布", "研究突破", "教程分享", "观点评论", "行业动态"]
            if category in valid_categories:
                return category
            return "行业动态"  # 默认分类

        except Exception as e:
            print(f"分类失败: {e}")
            return "行业动态"

    def filter_by_value(self, item: Dict[str, Any]) -> tuple[bool, str]:
        """
        评估内容是否有信息价值

        Args:
            item: 内容项

        Returns:
            (是否有价值, 理由)
        """
        prompt = f"""评估以下 AI 新闻是否具有信息价值，对 AI 内容创作者是否有参考意义。

标题：{item.get('标题', '')}
来源：{item.get('来源', '')}

请以 JSON 格式返回:
{{
  "有无信息价值": true/false,
  "理由": "简短理由"
}}"""

        try:
            response = self._call_llm(
                prompt,
                response_format={
                    "type": "json_schema",
                    "json_schema": {
                        "name": "value_assessment",
                        "strict": True,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "有无信息价值": {"type": "boolean"},
                                "理由": {"type": "string"}
                            },
                            "required": ["有无信息价值", "理由"]
                        }
                    }
                }
            )

            import json
            result = json.loads(response.content)
            return result.get("有无信息价值", False), result.get("理由", "")

        except Exception as e:
            print(f"价值评估失败: {e}")
            return True, "默认保留"


def generate_daily_summary(items: List[Dict[str, Any]]) -> str:
    """
    生成每日热点摘要（中文）

    Args:
        items: 内容项列表

    Returns:
        中文摘要文本（不包含标题，HTML模板中已有）
    """
    processor = LLMProcessor()

    # 按来源分组（YouTube 单独处理）
    by_source = {}
    youtube_items = []
    for item in items:
        source = item.get("来源", "未知")
        if "YouTube" in source:
            youtube_items.append(item)
        else:
            if source not in by_source:
                by_source[source] = []
            by_source[source].append(item)

    # 生成摘要
    summary_lines = []

    # 为每个非 YouTube 来源生成一句话中文摘要
    source_summaries = {}
    for source, source_items in by_source.items():
        # 取前3条标题作为该来源的代表性内容
        top_titles = [item.get("标题", "") for item in source_items[:3]]
        titles_text = "；".join(top_titles)

        if processor.api_key:
            # 使用 LLM 生成中文摘要
            prompt = f"""请用一句话（30字以内）概括以下 AI 新闻的核心内容，用中文输出：

{titles_text}

只返回一句话概括，不要其他内容。"""

            try:
                response = processor._call_llm(prompt)
                source_summaries[source] = response.content.strip()
            except:
                # 降级：使用简单翻译
                source_summaries[source] = _simple_chinese_summary(source, top_titles)
        else:
            # 无 API Key 时的智能处理
            source_summaries[source] = _simple_chinese_summary(source, top_titles)

    # 输出非 YouTube 摘要
    for source, summary in source_summaries.items():
        summary_lines.append(f"**{source}**: {summary}")

    # 生成 YouTube 综合摘要
    if youtube_items:
        youtube_summary = _generate_youtube_summary(youtube_items, processor.api_key)
        summary_lines.append(f"**YouTube**: {youtube_summary}")

    return "\n\n".join(summary_lines)


def _generate_youtube_summary(youtube_items: List[Dict[str, Any]], api_key: Optional[str]) -> str:
    """
    生成 YouTube 博主内容的综合摘要

    Args:
        youtube_items: YouTube 内容项列表
        api_key: LLM API Key

    Returns:
        YouTube 综合中文摘要
    """
    if not youtube_items:
        return "暂无新视频"

    # 收集所有视频标题和内容
    video_titles = [item.get("标题", "") for item in youtube_items]
    video_descriptions = [item.get("内容", "") for item in youtube_items]
    channels = list(set([item.get("来源", "").replace("YouTube - ", "") for item in youtube_items]))

    # 提取内容主题关键词
    all_text = " ".join(video_titles + video_descriptions)

    # YouTube 内容主题分类
    youtube_topics = {
        # AI 编程/开发
        "coding|programming|developer|code|xcode|python|javascript": "AI 编程与开发",
        "agentic|agent|workflow|automation": "AI 智能体与自动化",

        # AI 工具/应用
        "tool|app|software|platform|studio": "AI 工具与应用",
        "tutorial|how to|guide|learn|course": "AI 教程与学习",
        "tips|tricks|hack|optimization": "AI 技巧与优化",

        # AI 理论/研究
        "paper|research|study|breakthrough|model": "AI 理论与研究",
        "deep learning|neural|network|training": "深度学习技术",
        "llm|language model|gpt|claude|gemini": "大语言模型",

        # AI 行业/商业
        "business|agency|entrepreneur|startup|scale": "AI 商业与创业",
        "future|trend|prediction|roadmap": "AI 趋势与展望",
        "money|income|profit|salary|career": "AI 职业与变现",

        # AI 产品/评测
        "review|test|comparison|best|top": "AI 产品评测",
        "news|update|release|launch": "AI 新闻动态",
        "demo|showcase|example|project": "AI 项目演示",
    }

    # 检测主题
    detected_topics = []
    for pattern, topic in youtube_topics.items():
        import re
        if re.search(pattern, all_text.lower()):
            detected_topics.append(topic)

    # 检测提到的公司和产品
    companies_products = []
    if "openai" in all_text.lower():
        companies_products.append("OpenAI")
    if "anthropic" in all_text.lower() or "claude" in all_text.lower():
        companies_products.append("Anthropic/Claude")
    if "google" in all_text.lower() or "gemini" in all_text.lower():
        companies_products.append("Google/Gemini")
    if "microsoft" in all_text.lower() or "copilot" in all_text.lower():
        companies_products.append("Microsoft/Copilot")
    if "midjourney" in all_text.lower():
        companies_products.append("Midjourney")
    if "chatgpt" in all_text.lower():
        companies_products.append("ChatGPT")

    # 生成摘要
    topic_str = "、".join(list(set(detected_topics))[:4]) if detected_topics else "AI 相关内容"
    company_str = "、".join(companies_products[:3]) if companies_products else ""

    channel_count = len(channels)
    video_count = len(youtube_items)

    if api_key:
        # 使用 LLM 生成更自然的摘要
        prompt = f"""请根据以下 YouTube 视频信息，生成一段 50-80 字的中文摘要，说明这些视频主要讲了哪些方面的内容：

视频数量：{video_count} 个
涉及频道：{', '.join(channels[:5])}
主要主题：{topic_str}
相关公司/产品：{company_str}

视频标题：
{chr(10).join(video_titles[:5])}

要求：
1. 概括视频内容的主要方向（如教程、实战、理论、行业分析等）
2. 提及涉及的重点主题
3. 用通顺的中文表达
4. 不要逐条列举视频
5. 直接返回摘要文本，不要其他内容"""

        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")
            response = client.chat.completions.create(
                model="deepseek-chat",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3
            )
            return response.choices[0].message.content.strip()
        except:
            pass

    # 无 API Key 时的默认摘要
    if detected_topics:
        if company_str:
            return f"{channel_count}位博主发布{video_count}个视频，涵盖{topic_str}等内容，涉及{company_str}等主流 AI 公司产品"
        else:
            return f"{channel_count}位博主发布{video_count}个视频，涵盖{topic_str}等内容"
    else:
        return f"{channel_count}位博主发布{video_count}个视频，分享 AI 相关内容与见解"


def _simple_chinese_summary(source: str, titles: List[str]) -> str:
    """
    无 API Key 时生成智能中文摘要

    Args:
        source: 来源名称
        titles: 标题列表

    Returns:
        中文摘要
    """
    # 扩展的 AI 关键词映射表（主题分类）
    ai_topics = {
        # 公司/组织
        "OpenAI": "OpenAI", "Anthropic": "Anthropic", "Google": "谷歌",
        "Microsoft": "微软", "Apple": "苹果", "Meta": "Meta",
        "xAI": "xAI", "SpaceX": "SpaceX", "NVIDIA": "英伟达",
        "Intel": "英特尔", "AMD": "AMD", "Tesla": "特斯拉",

        # 人物
        "Elon Musk": "马斯克", "Sam Altman": "奥特曼",

        # 产品/模型
        "Claude": "Claude", "ChatGPT": "ChatGPT", "Grok": "Grok",
        "Gemini": "Gemini", "Copilot": "Copilot",
        "Sora": "Sora", "Midjourney": "Midjourney",

        # 技术/概念
        "GPU": "显卡", "LLM": "大语言模型", "AI Agent": "AI 智能体",
        "coding": "AI 编程", "agentic": "智能代理", "data center": "数据中心",

        # 平台/应用
        "Xcode": "Xcode", "Firefox": "火狐浏览器", "Moltbook": "Moltbook",
        "OpenClaw": "OpenClaw",

        # 行业动态
        "merger": "并购", "acquires": "收购", "investment": "投资",
        "funding": "融资", "launch": "发布", "update": "更新",
        "ban": "禁令", "regulation": "监管",
    }

    # 动作词汇映射
    action_keywords = {
        "merg": "合并", "acquir": "收购", "launch": "发布", "releas": "推出",
        "updat": "更新", "ban": "被禁", "invest": "投资", "fund": "融资",
        "build": "开发", "add": "新增", "integrat": "集成",
    }

    # 提取所有标题中的关键信息
    all_titles = " ".join(titles[:3])  # 取前3个标题综合分析
    detected_companies = []
    detected_products = []
    detected_actions = []
    detected_topics = []

    for keyword, chinese in ai_topics.items():
        if keyword.lower() in all_titles.lower():
            if keyword in ["OpenAI", "Anthropic", "Google", "Microsoft", "Apple", "Meta", "xAI", "SpaceX", "NVIDIA", "Intel"]:
                detected_companies.append(chinese)
            elif keyword in ["Claude", "ChatGPT", "Grok", "Gemini", "Sora", "Midjourney"]:
                detected_products.append(chinese)
            else:
                detected_topics.append(chinese)

    # 检测动作
    for keyword, chinese in action_keywords.items():
        if keyword.lower() in all_titles.lower():
            detected_actions.append(chinese)
            break  # 只取第一个动作

    # 简化来源名称
    source_short = source.replace("The ", "").replace(" AI", "").replace(" - ", " ").replace("YouTube - ", "")

    # 智能生成摘要
    if detected_companies and detected_actions:
        companies_str = "、".join(detected_companies[:2])
        action = detected_actions[0]
        return f"{source_short} 报道了{companies_str}{action}的相关消息"

    elif detected_companies:
        companies_str = "、".join(detected_companies[:2])
        if detected_products:
            products_str = "、".join(detected_products[:2])
            return f"{source_short} 报道了{companies_str}的{products_str}最新动态"
        return f"{source_short} 报道了{companies_str}的最新动态"

    elif detected_products:
        products_str = "、".join(detected_products[:2])
        return f"{source_short} 报道了关于{products_str}的消息"

    elif detected_topics:
        topics_str = "、".join(list(set(detected_topics))[:3])
        return f"{source_short} 报道了关于{topics_str}的最新动态"

    else:
        # 兜底：使用第一个标题的前40个字符
        first_title = titles[0] if titles else ""
        if len(first_title) > 40:
            first_title = first_title[:40] + "..."
        return f"{source_short}: {first_title}"


def process_batch(items: List[Dict[str, Any]], config: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    批量处理内容列表

    config 格式:
    {
        "translate": true,           # 是否翻译
        "summarize": true,           # 是否生成摘要
        "categorize": true,          # 是否分类
        "filter_by_value": true,     # 是否过滤低价值内容
    }
    """
    processor = LLMProcessor()

    if not processor.api_key:
        print("未配置 API Key，跳过 LLM 处理")
        return items

    results = []

    for item in items:
        processed = item.copy()

        # 翻译和摘要
        if config.get("translate", True) or config.get("summarize", True):
            processed = processor.translate_and_summarize(processed)

        # 分类
        if config.get("categorize", True):
            processed["分类"] = processor.categorize(processed)

        # 价值过滤
        if config.get("filter_by_value", True):
            has_value, reason = processor.filter_by_value(processed)
            if not has_value:
                continue  # 跳过低价值内容
            processed["价值评估"] = reason

        results.append(processed)

    return results
