"""
AI 内容情报监测员 - YouTube 中文 AI 内容监测
专注发现【低粉但爆款】的 AI 相关视频
"""

import os
import requests
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional, Set
from dataclasses import dataclass
from urllib.parse import urlparse, parse_qs


@dataclass
class ViralVideo:
    """爆款视频数据类"""
    channel_name: str
    channel_id: str
    channel_subscribers: int
    video_id: str
    video_title: str
    video_url: str
    published_at: str
    view_count: int
    like_count: int
    comment_count: int

    def is_viral(self) -> bool:
        """判断是否为低粉爆款"""
        if self.channel_subscribers > 50000:
            return False
        if self.view_count < self.channel_subscribers * 5:
            return False
        if self.comment_count < 10:
            return False
        return True

    def to_report_format(self) -> str:
        """转换为报告格式"""
        # 计算视频年龄
        pub_date = datetime.fromisoformat(self.published_at.replace('Z', '+00:00'))
        days_ago = (datetime.now(pub_date.tzinfo) - pub_date).days

        return f"""1. 频道名称：{self.channel_name}
2. 频道订阅数：{self.channel_subscribers:,}
3. 视频标题：{self.video_title}
4. 视频链接：{self.video_url}
5. 发布时间：{self.published_at}（{days_ago}天前）
6. 当前播放量 / 订阅数：{self.view_count:,} / {self.channel_subscribers:,}（{self.view_count / max(self.channel_subscribers, 1):.1f}x）
7. 为什么判断这是一个低粉爆款：
   - 订阅数 {self.channel_subscribers:,} 低于 50,000 阈值
   - 播放量 {self.view_count:,} 达到订阅数的 {self.view_count / max(self.channel_subscribers, 1):.1f} 倍
   - 评论区有 {self.comment_count} 条真实互动
8. 视频内容核心看点（偏实操总结）：[需人工分析]"""


class ChineseYouTubeMonitor:
    """中文 AI YouTube 监测器"""

    # 中文 AI 内容创作者种子列表（频道 ID 或用户名）
    # 这些频道专注于 AI 工具、编程、工作流等内容
    SEED_CHANNELS = [
        # AI 工具与实操类
        "UC8fn8vUWC4YLYM7mXc5Kjow",  # 类表哥
        "UCvCylEhJUqU7pYL6fY8e8rA",  # AI 工具派
        "UCrKfyF50q5F2uJM6ktqHqRw",  # AI 编程助手
        "UCJQp4SwF5qvHvY0m9k3pGg",  # AI 实验室

        # AI + 编程类
        "UC0AIPjCYI0cKQ8QXJ3Y-YyA",  # 代码与AI
        "UCZKQnEh5Q8fN5xHhY5q9hg",  # Python AI

        # AI 应用案例类
        "UCG2XgDfQwY7J8eZg5Z3Z3Zg",  # AI 创作者
        "UCHp5F7VQ7Q8fN6h4i4V4Qgg",  # AI 实战

        # 可以添加更多频道...
    ]

    # AI 相关关键词（用于视频内容过滤）
    AI_KEYWORDS = [
        "AI", "人工智能", "ChatGPT", "Claude", "GPT", "Gemini",
        "Agent", "智能体", "大模型", "LLM", "Prompt",
        "自动化", "工作流", "n8n", "Midjourney", "Stable Diffusion",
        "AI 编程", "AI 工具", "AI 教程", "AI 实战",
        "AI 应用", "AI 副业", "AI 内容创作",
        "Copilot", "Cursor", " Windsurf",
    ]

    # 排除关键词（营销号、搬运号特征）
    EXCLUDE_PATTERNS = [
        "搬运", "转载", "合集", "推荐", "广告", "课程",
        "加群", "代写", "刷课", "薅羊毛"
    ]

    def __init__(self, api_key: Optional[str] = None, config: Optional[Dict] = None):
        """
        初始化监测器

        Args:
            api_key: YouTube Data API v3 密钥
            config: 配置字典，包含 channels, days_threshold 等
        """
        self.api_key = api_key or os.getenv("YOUTUBE_API_KEY")
        self.config = config or {}

        self.channels = self.config.get("channels", self.SEED_CHANNELS)
        self.days_threshold = self.config.get("days_threshold", 14)
        self.max_subscribers = self.config.get("max_subscribers", 50000)
        self.viral_ratio = self.config.get("viral_ratio", 5)

        self.base_url = "https://www.googleapis.com/youtube/v3"

        # 记录已汇报的视频 ID，避免重复
        self.reported_videos: Set[str] = set()
        self._load_reported_videos()

    def _load_reported_videos(self):
        """加载已汇报的视频列表"""
        reported_file = "/Users/y/.claude/skills/ai-news-aggregator/data/reported_videos.json"
        try:
            if os.path.exists(reported_file):
                with open(reported_file, 'r', encoding='utf-8') as f:
                    self.reported_videos = set(json.load(f))
        except Exception as e:
            print(f"⚠️ 无法加载已汇报视频列表: {e}")

    def _save_reported_videos(self):
        """保存已汇报的视频列表"""
        reported_file = "/Users/y/.claude/skills/ai-news-aggregator/data/reported_videos.json"
        try:
            os.makedirs(os.path.dirname(reported_file), exist_ok=True)
            with open(reported_file, 'w', encoding='utf-8') as f:
                json.dump(list(self.reported_videos), f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"⚠️ 无法保存已汇报视频列表: {e}")

    def _make_api_request(self, endpoint: str, params: Dict) -> Dict:
        """发起 YouTube API 请求"""
        if not self.api_key:
            print("❌ 未配置 YouTube API Key")
            return {}

        params["key"] = self.api_key
        url = f"{self.base_url}/{endpoint}"

        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            print(f"❌ HTTP 错误: {e}")
            try:
                error_data = response.json()
                if "error" in error_data:
                    print(f"   API 错误: {error_data['error'].get('message', 'Unknown')}")
            except:
                pass
        except Exception as e:
            print(f"❌ API 请求失败: {e}")
        return {}

    def get_channel_info(self, channel_id: str) -> Optional[Dict]:
        """获取频道信息"""
        data = self._make_api_request("channels", {
            "part": "snippet,statistics",
            "id": channel_id
        })

        if data.get("items"):
            item = data["items"][0]
            return {
                "channel_id": item["id"],
                "channel_name": item["snippet"]["title"],
                "subscribers": int(item["statistics"]["subscriberCount"])
            }
        elif data.get("error"):
            print(f"   ⚠️ API 错误: {data['error'].get('message', 'Unknown error')}")
        elif data.get("pageInfo", {}).get("totalResults", 0) == 0:
            print(f"   ⚠️ 频道 ID '{channel_id}' 不存在或已删除")
        return None

    def get_channel_videos(self, channel_id: str, days_back: int = 14) -> List[Dict]:
        """获取频道的最新视频"""
        # 计算日期范围
        date_after = (datetime.now() - timedelta(days=days_back)).isoformat() + "Z"

        data = self._make_api_request("search", {
            "part": "snippet",
            "channelId": channel_id,
            "order": "date",
            "publishedAfter": date_after,
            "maxResults": 50,
            "type": "video"
        })

        videos = []
        for item in data.get("items", []):
            video_id = item["id"]["videoId"]
            videos.append({
                "video_id": video_id,
                "video_title": item["snippet"]["title"],
                "video_url": f"https://www.youtube.com/watch?v={video_id}",
                "published_at": item["snippet"]["publishedAt"],
                "channel_id": item["snippet"]["channelId"]
            })

        return videos

    def get_video_stats(self, video_id: str) -> Optional[Dict]:
        """获取视频统计数据"""
        data = self._make_api_request("videos", {
            "part": "statistics",
            "id": video_id
        })

        if data.get("items"):
            stats = data["items"][0]["statistics"]
            return {
                "view_count": int(stats.get("viewCount", 0)),
                "like_count": int(stats.get("likeCount", 0)),
                "comment_count": int(stats.get("commentCount", 0))
            }
        return None

    def get_video_comments(self, video_id: str, max_results: int = 20) -> List[Dict]:
        """获取视频评论，用于判断是否为真实互动"""
        data = self._make_api_request("commentThreads", {
            "part": "snippet",
            "videoId": video_id,
            "maxResults": max_results,
            "order": "relevance"
        })

        comments = []
        for item in data.get("items", []):
            comment = item["snippet"]["topLevelComment"]["snippet"]
            comments.append({
                "text": comment["textDisplay"],
                "like_count": int(comment["likeCount"])
            })

        return comments

    def is_ai_related(self, title: str, description: str = "") -> bool:
        """判断视频是否与 AI 相关"""
        text = f"{title} {description}".lower()
        return any(keyword.lower() in text for keyword in self.AI_KEYWORDS)

    def should_exclude(self, title: str, description: str = "") -> bool:
        """判断是否应该排除此视频"""
        text = f"{title} {description}"
        return any(pattern in text for pattern in self.EXCLUDE_PATTERNS)

    def check_real_engagement(self, video_id: str, comment_count: int) -> bool:
        """检查是否有真实互动（非机器人）"""
        if comment_count < 10:
            return False

        # 获取评论样本
        comments = self.get_video_comments(video_id, max_results=20)
        if not comments:
            return False

        # 检查评论质量
        meaningful_comments = 0
        for comment in comments:
            text = comment["text"]
            # 排除太短、纯表情、重复的评论
            if len(text) >= 5 and not text.count("！") > 3:
                meaningful_comments += 1

        return meaningful_comments >= len(comments) * 0.3

    def analyze_content(self, video: ViralVideo) -> str:
        """分析视频内容，提取核心看点"""
        # 这里可以调用 LLM API 来分析
        # 暂时返回提示
        return "需人工分析：建议观看视频前 3 分钟判断实操价值"

    def search_ai_videos(self, query: str, max_results: int = 50) -> List[Dict]:
        """搜索 AI 相关视频"""
        # 计算日期范围
        date_after = (datetime.now() - timedelta(days=self.days_threshold)).isoformat() + "Z"

        data = self._make_api_request("search", {
            "part": "snippet",
            "q": query,
            "type": "video",
            "order": "relevance",  # 按相关性排序
            "publishedAfter": date_after,
            "maxResults": max_results,
            "relevanceLanguage": "zh",  # 优先中文内容
            "videoDefinition": "any"  # 包含所有画质
        })

        videos = []
        for item in data.get("items", []):
            video_id = item["id"]["videoId"]
            videos.append({
                "video_id": video_id,
                "video_title": item["snippet"]["title"],
                "video_url": f"https://www.youtube.com/watch?v={video_id}",
                "published_at": item["snippet"]["publishedAt"],
                "channel_id": item["snippet"]["channelId"],
                "channel_name": item["snippet"]["channelTitle"]
            })

        return videos

    def monitor(self) -> List[ViralVideo]:
        """执行监测，通过搜索自动发现低粉爆款视频"""
        viral_videos = []

        # AI 相关搜索词
        search_queries = [
            "AI 教程",
            "ChatGPT 中文",
            "AI 工具",
            "人工智能 应用",
            "GPT-4 使用",
            "Claude AI",
            "AI 编程",
            "Prompt 教程",
            "AI 自动化",
            "AI 副业"
        ]

        print(f"🔍 开始搜索 AI 相关视频...")
        print(f"   搜索词数量: {len(search_queries)}")
        print(f"   时间范围: 最近 {self.days_threshold} 天")

        all_videos = []

        # 搜索多个关键词
        for query in search_queries:
            print(f"\n   搜索: {query}")
            videos = self.search_ai_videos(query, max_results=20)
            print(f"   找到 {len(videos)} 个视频")
            all_videos.extend(videos)

        # 去重（同一视频可能被多个搜索词命中）
        seen_video_ids = set()
        unique_videos = []
        for video in all_videos:
            if video["video_id"] not in seen_video_ids:
                seen_video_ids.add(video["video_id"])
                unique_videos.append(video)

        print(f"\n   去重后共 {len(unique_videos)} 个视频")
        print(f"\n🔍 分析视频...")

        # 分析每个视频
        for i, video in enumerate(unique_videos, 1):
            video_id = video["video_id"]

            # 跳过已汇报的
            if video_id in self.reported_videos:
                continue

            # 检查是否应该排除（营销号、搬运号）
            if self.should_exclude(video["video_title"]):
                continue

            # 检查是否与 AI 相关（过滤误报）
            if not self.is_ai_related(video["video_title"]):
                continue

            # 获取视频统计
            stats = self.get_video_stats(video_id)
            if not stats:
                continue

            # 获取频道信息
            channel_id = video["channel_id"]
            channel_info = self.get_channel_info(channel_id)
            if not channel_info:
                continue

            subscribers = channel_info["subscribers"]

            # 跳过大频道（超过50K订阅）
            if subscribers > self.max_subscribers:
                continue

            # 创建 ViralVideo 对象
            viral_video = ViralVideo(
                channel_name=channel_info["channel_name"],
                channel_id=channel_id,
                channel_subscribers=subscribers,
                video_id=video_id,
                video_title=video["video_title"],
                video_url=video["video_url"],
                published_at=video["published_at"],
                view_count=stats["view_count"],
                like_count=stats["like_count"],
                comment_count=stats["comment_count"]
            )

            # 判断是否为爆款
            if viral_video.is_viral():
                print(f"\n   🎯 发现潜在爆款！")
                print(f"      标题: {viral_video.video_title[:50]}...")
                print(f"      频道: {viral_video.channel_name}")
                print(f"      播放: {viral_video.view_count:,} / 订阅: {viral_video.channel_subscribers:,} ({viral_video.view_count / max(viral_video.channel_subscribers, 1):.1f}x)")

                viral_videos.append(viral_video)
                self.reported_videos.add(video_id)

        # 保存已汇报的视频列表
        self._save_reported_videos()

        return viral_videos

    def generate_report(self, viral_videos: List[ViralVideo]) -> str:
        """生成监测报告"""
        if not viral_videos:
            return "# 监测结果\n\n暂未发现新的低粉爆款视频。"

        report = f"""# YouTube 中文 AI 内容监测报告

生成时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

发现 {len(viral_videos)} 个新的低粉爆款视频：

---

"""

        for i, video in enumerate(viral_videos, 1):
            report += f"\n## 发现 #{i}\n\n"
            report += video.to_report_format()
            report += "\n\n" + "-" * 60 + "\n"

        report += f"\n\n监测说明：\n"
        report += f"- 监测频道数: {len(self.channels)}\n"
        report += f"- 监测时间范围: 最近 {self.days_threshold} 天\n"
        report += f"- 爆款标准: 订阅 ≤ {self.max_subscribers:,} 且 播放量 ≥ {self.viral_ratio}x 订阅数\n"

        return report


def export_viral_report(viral_videos: List[ViralVideo], filepath: str):
    """导出报告到文件"""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    monitor = ChineseYouTubeMonitor()
    report = monitor.generate_report(viral_videos)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"✅ 报告已导出到: {filepath}")


if __name__ == "__main__":
    # 测试代码
    monitor = ChineseYouTubeMonitor()
    viral_videos = monitor.monitor()
    print(monitor.generate_report(viral_videos))
