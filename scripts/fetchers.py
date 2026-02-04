"""
AI News Aggregator - Data Fetchers
从多个来源获取 AI 相关新闻和动态
"""

import feedparser
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import re


class RSSFetcher:
    """RSS 订阅源获取器"""

    def __init__(self):
        self.ai_rss_sources = {
            "The Verge AI": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
            "TechCrunch AI": "https://techcrunch.com/category/artificial-intelligence/feed/",
            "NYT AI": "https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/spotlight/artificial-intelligence/rss.xml",
        }

    def fetch(self, hours: int = 24) -> List[Dict[str, Any]]:
        """获取最近 N 小时的 AI 新闻"""
        results = []
        cutoff_time = datetime.now() - timedelta(hours=hours)

        for source, url in self.ai_rss_sources.items():
            try:
                feed = feedparser.parse(url)
                for entry in feed.entries:
                    # 解析发布时间
                    pub_time = datetime(*entry.published_parsed[:6])
                    if pub_time >= cutoff_time:
                        results.append({
                            "标题": entry.get('title', ''),
                            "内容": entry.get('description', ''),
                            "日期": pub_time.strftime("%Y-%m-%d %H:%M:%S"),
                            "链接": entry.get('link', ''),
                            "来源": source,
                            "板块": "新闻",
                            "分类": "AI"
                        })
            except Exception as e:
                print(f"RSS 获取失败 {source}: {e}")

        return results


class YouTubeFetcher:
    """YouTube 视频获取器（使用 RSS，无需 API Key）"""

    def __init__(self, api_key: Optional[str] = None, custom_channels: Optional[List[str]] = None):
        # 使用 YouTube RSS 订阅源，无需 API Key
        # 这里的 api_key 参数保留用于兼容性，但实际不使用

        # AI 相关频道的 RSS 订阅（使用 user 参数或正确的 channel_id）
        self.ai_channel_feeds = [
            ("Google", "https://www.youtube.com/feeds/videos.xml?user=Google"),
            ("Google for Developers", "https://www.youtube.com/feeds/videos.xml?user=GoogleDevelopers"),
            ("MIT CSAIL", "https://www.youtube.com/feeds/videos.xml?user=mitcsail"),
            ("TED", "https://www.youtube.com/feeds/videos.xml?user=TED"),
        ]

        # AI 博主频道（直接使用 RSS URL）
        self.ai_blogger_feeds = [
            ("Tina Huang", "https://www.youtube.com/feeds/videos.xml?channel_id=UC2UXDak6o7rBm23k3Vv5dww"),
            ("The AI Advantage", "https://www.youtube.com/feeds/videos.xml?channel_id=UC98re_9VsuVfXisV_AnU6Sg"),
            ("Liam Ottley", "https://www.youtube.com/feeds/videos.xml?channel_id=UCui4jxDaMb53Gdh-AZUTPAg"),
            ("Andrej Karpathy", "https://www.youtube.com/feeds/videos.xml?channel_id=UCPk8m_nTeFiPrnve3_pS7sg"),
            ("Dr Alex Young", "https://www.youtube.com/feeds/videos.xml?channel_id=UCf_o982iSIn6A0O8O3_u2-g"),
            ("DeepLearningAI", "https://www.youtube.com/feeds/videos.xml?channel_id=UCcIXc5mJsHVYTZR1maL5l9w"),
            ("Two Minute Papers", "https://www.youtube.com/feeds/videos.xml?channel_id=UCbfYPyITQ-7l4upoX8nvctg"),
            ("AI Explained", "https://www.youtube.com/feeds/videos.xml?channel_id=UCN9v4QG3nuX6Gml406j_uYg"),
        ]

        # 如果提供了自定义频道，转换为 RSS feed URL
        # 支持用户名格式（如 "Google"）或频道 ID
        if custom_channels:
            for channel in custom_channels:
                # 如果是完整的 RSS URL，直接添加
                if channel.startswith('http'):
                    # 从 URL 中提取频道 ID 或用户名
                    if 'channel_id=' in channel:
                        channel_id = channel.split('channel_id=')[-1]
                        # 尝试从预定义列表中找到名称
                        name = "Custom"
                        for name_template, url in self.ai_blogger_feeds:
                            if channel_id in url:
                                name = name_template
                                break
                        self.ai_channel_feeds.append((name, channel))
                    else:
                        self.ai_channel_feeds.append(("Custom", channel))
                elif channel.startswith('UC') or channel.startswith('@'):
                    # 频道 ID 或 handle 格式
                    param = 'channel_id' if channel.startswith('UC') else 'user'
                    self.ai_channel_feeds.append(
                        (f"Channel {channel}", f"https://www.youtube.com/feeds/videos.xml?{param}={channel}")
                    )
                else:
                    # 用户名格式
                    self.ai_channel_feeds.append(
                        (f"Channel {channel}", f"https://www.youtube.com/feeds/videos.xml?user={channel}")
                    )

    def fetch(self, hours: int = 72, min_views: int = 0) -> List[Dict[str, Any]]:
        """获取最近 N 小时的 AI 视频（使用 RSS，无需 API Key）"""
        results = []

        # 合并所有频道
        all_feeds = self.ai_channel_feeds + self.ai_blogger_feeds

        for channel_name, rss_url in all_feeds:
            try:
                feed = feedparser.parse(rss_url)
                for entry in feed.entries[:10]:  # 每个频道取最近10条
                    # YouTube RSS 的 published 时间格式（UTC）
                    pub_time = datetime(*entry.published_parsed[:6])

                    # 计算时间差（考虑时区）
                    time_diff = datetime.now() - pub_time
                    hours_diff = time_diff.total_seconds() / 3600

                    if hours_diff <= hours:
                        # YouTube 媒体扩展中可能包含播放量信息
                        view_count = 0
                        if hasattr(entry, 'yt_statistics'):
                            yt_stats = entry.get('yt_statistics', {})
                            view_count = int(yt_stats.get('view_count', 0))

                        # 只返回播放量达到阈值的视频
                        if view_count >= min_views or min_views == 0:
                            results.append({
                                "标题": entry.get('title', ''),
                                "内容": entry.get('description', '')[:200] if entry.get('description') else '',
                                "日期": pub_time.strftime("%Y-%m-%d %H:%M:%S"),
                                "链接": entry.get('link', ''),
                                "来源": f"YouTube - {channel_name}",
                                "板块": "视频",
                                "播放量": view_count
                            })

            except Exception as e:
                print(f"YouTube RSS 获取失败 {channel_name}: {e}")

        return results


class RedditFetcher:
    """Reddit 帖子获取器"""

    def __init__(self, client_id: Optional[str] = None, client_secret: Optional[str] = None):
        self.client_id = client_id
        self.client_secret = client_secret
        self.ai_subreddits = [
            "artificial",
            "MachineLearning",
            "singularity",
        ]

    def fetch(self, hours: int = 24, min_upvotes: int = 50) -> List[Dict[str, Any]]:
        """获取最近 N 小时且点赞 > N 的 AI 帖子"""
        # 注意: 需要 Reddit API 认证
        # 这里提供简化实现，实际需要完整的 OAuth 流程
        print("Reddit API 需要完整认证，建议使用 PRAW 库")
        return []


class TwitterFetcher:
    """Twitter/X 推文获取器"""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key
        self.base_url = "https://api.twitterapi.io/twitter"

        # AI 相关账户
        self.ai_accounts = [
            "OpenAI",
            "GoogleAI",
            # 可以添加更多账户
        ]

    def fetch(self, hours: int = 24) -> List[Dict[str, Any]]:
        """获取最近 N 小时的 AI 推文"""
        if not self.api_key:
            print("Twitter API key 未配置，跳过")
            return []

        results = []
        headers = {"Authorization": f"Bearer {self.api_key}"}

        for account in self.ai_accounts:
            try:
                url = f"{self.base_url}/user/last_tweets"
                params = {"username": account, "limit": 10}

                response = requests.get(url, headers=headers, params=params)
                data = response.json()

                for tweet in data:
                    # 解析时间并过滤
                    tweet_time = datetime.fromisoformat(tweet["created_at"].replace("Z", "+00:00"))
                    cutoff_time = datetime.now() - timedelta(hours=hours)

                    if tweet_time >= cutoff_time:
                        results.append({
                            "标题": tweet["text"],
                            "日期": tweet["created_at"],
                            "链接": f"https://twitter.com/{account}/status/{tweet['id']}",
                            "来源": "Twitter",
                            "板块": "社交媒体",
                            "互动量": tweet.get("public_metrics", {}).get("like_count", 0)
                        })
            except Exception as e:
                print(f"Twitter 获取失败 {account}: {e}")

        return results


def fetch_all_sources(config: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    从所有配置的数据源获取内容

    config 格式:
    {
        "rss": {"enabled": true, "hours": 24},
        "youtube": {"enabled": false, "api_key": "", "min_views": 10000},
        "reddit": {"enabled": false, "min_upvotes": 50},
        "twitter": {"enabled": false, "api_key": ""},
        "custom": {"custom_youtube_channels": [...]}
    }
    """
    all_results = []

    # RSS
    if config.get("rss", {}).get("enabled", True):
        rss_fetcher = RSSFetcher()
        all_results.extend(rss_fetcher.fetch(hours=config["rss"]["hours"]))

    # YouTube
    if config.get("youtube", {}).get("enabled", False):
        custom_channels = config.get("custom", {}).get("custom_youtube_channels", [])
        yt_fetcher = YouTubeFetcher(
            api_key=config["youtube"].get("api_key"),
            custom_channels=custom_channels
        )
        all_results.extend(yt_fetcher.fetch(
            hours=config["youtube"].get("hours", 24),
            min_views=config["youtube"].get("min_views", 10000)
        ))

    # Twitter
    if config.get("twitter", {}).get("enabled", False):
        tw_fetcher = TwitterFetcher(api_key=config["twitter"].get("api_key"))
        all_results.extend(tw_fetcher.fetch(hours=config["twitter"].get("hours", 24)))

    # Reddit (需要完整认证，默认禁用)
    if config.get("reddit", {}).get("enabled", False):
        rd_fetcher = RedditFetcher()
        all_results.extend(rd_fetcher.fetch(
            hours=config["reddit"].get("hours", 24),
            min_upvotes=config["reddit"].get("min_upvotes", 50)
        ))

    return all_results
