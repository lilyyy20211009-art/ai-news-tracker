#!/usr/bin/env python3
"""
AI 内容情报监测员 - 独立运行脚本
通过搜索自动发现 YouTube 中文 AI 内容中的低粉爆款视频
"""

import os
import sys
import yaml
from pathlib import Path
from datetime import datetime

# 添加脚本目录到路径
script_dir = Path(__file__).parent
sys.path.insert(0, str(script_dir))

from chinese_youtube_monitor import ChineseYouTubeMonitor, export_viral_report
from feishu_output import export_to_feishu


def load_config(config_path: str = None) -> dict:
    """加载配置文件"""
    if config_path is None:
        config_path = "/Users/y/.claude/skills/ai-news-aggregator/config.yaml"

    if Path(config_path).exists():
        with open(config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)

    return {
        "youtube_chinese": {
            "enabled": False,
            "api_key": os.getenv("YOUTUBE_API_KEY", ""),
            "days_threshold": 14,
            "max_subscribers": 50000,
            "viral_ratio": 5
        }
    }


def viral_video_to_feishu_item(video) -> dict:
    """将爆款视频转换为飞书格式 - 7 个独立字段"""
    # 计算视频年龄
    try:
        pub_date = datetime.fromisoformat(video.published_at.replace('Z', '+00:00'))
        date_str = pub_date.strftime("%Y-%m-%d %H:%M:%S")
    except:
        date_str = video.published_at

    # 计算倍数
    ratio = video.view_count / max(video.channel_subscribers, 1)

    # 构造"为什么是低粉爆款"的 2~3 点理由
    why_viral_points = []
    if video.channel_subscribers <= 50000:
        why_viral_points.append(f"✓ 订阅数 {video.channel_subscribers:,} 低于 50,000 阈值")
    if video.view_count >= video.channel_subscribers * 5:
        why_viral_points.append(f"✓ 播放量 {video.view_count:,} 达到订阅数的 {ratio:.1f} 倍")
    if video.comment_count >= 10:
        why_viral_points.append(f"✓ 评论区有 {video.comment_count} 条真实互动")

    why_viral = "\n".join(why_viral_points) if why_viral_points else "待人工分析"

    return {
        "频道名称": video.channel_name,
        "频道订阅数": f"{video.channel_subscribers:,}",
        "视频标题": video.video_title,
        "视频链接": video.video_url,
        "发布时间": date_str,
        "当前播放量/订阅数": f"{video.view_count:,} / {video.channel_subscribers:,} ({ratio:.1f}x)",
        "为什么判断这是一个低粉爆款": why_viral
    }


def main():
    """主函数"""
    print("=" * 60)
    print("🤖 AI 内容情报监测员")
    print("   YouTube 中文 AI 内容 - 低粉爆款自动发现")
    print("=" * 60)

    # 加载配置
    config = load_config()
    monitor_config = config.get("youtube_chinese", {})

    # 检查是否启用
    if not monitor_config.get("enabled", False):
        print("\n⚠️ YouTube 中文监测功能未启用")
        print("\n请在 config.yaml 中配置:")
        print("""
youtube_chinese:
  enabled: true
  api_key: "YOUR_YOUTUBE_API_KEY"  # 在 https://console.cloud.google.com/apis/credentials 获取
  days_threshold: 14  # 监测最近 14 天的视频
  max_subscribers: 50000  # 最大订阅数阈值（低粉定义）
  viral_ratio: 5  # 播放量达到订阅数的多少倍才算爆款
        """)
        return

    # 检查 API Key
    api_key = monitor_config.get("api_key") or os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        print("\n❌ 未配置 YouTube API Key")
        print("\n获取方式:")
        print("1. 访问 https://console.cloud.google.com/apis/credentials")
        print("2. 创建新的 API 密钥")
        print("3. 启用 YouTube Data API v3")
        print("4. 设置环境变量或在 config.yaml 中配置")
        return

    print(f"\n📋 配置:")
    print(f"   监测天数: {monitor_config.get('days_threshold', 14)} 天")
    print(f"   订阅阈值: ≤ {monitor_config.get('max_subscribers', 50000):,}")
    print(f"   爆款倍数: ≥ {monitor_config.get('viral_ratio', 5)}x")
    print(f"   搜索方式: 自动搜索 AI 相关内容")

    # 创建监测器
    monitor = ChineseYouTubeMonitor(
        api_key=api_key,
        config=monitor_config
    )

    # 执行监测
    viral_videos = monitor.monitor()

    # 生成报告
    print("\n" + "=" * 60)
    print("📊 监测报告")
    print("=" * 60)

    if viral_videos:
        report = monitor.generate_report(viral_videos)
        print(report)

        # 导出报告
        report_path = "/Users/y/.claude/skills/ai-news-aggregator/output/viral_videos_report.md"
        export_viral_report(viral_videos, report_path)
        print(f"\n📄 报告已保存: {report_path}")

        # 导出到飞书
        output_config = config.get("output", {})
        if output_config.get("feishu", {}).get("enabled", False):
            feishu_config = output_config["feishu"]
            feishu_items = [viral_video_to_feishu_item(v) for v in viral_videos]
            viral_table_id = feishu_config.get("viral_table_id")

            # 如果配置了 viral_table_id，使用它；否则使用默认 table_id
            if viral_table_id:
                feishu_count = export_to_feishu(feishu_items, feishu_config, table_id=viral_table_id, send_notification=True)
                print(f"\n✅ 飞书: 已写入 {feishu_count} 条低粉爆款记录到第二个表格")
            else:
                # 如果没有配置第二个表格，使用默认表格并发送通知
                feishu_count = export_to_feishu(feishu_items, feishu_config, send_notification=True)
                print(f"\n✅ 飞书: 已写入 {feishu_count} 条低粉爆款记录（使用默认表格）")
                print(f"   提示: 在 config.yaml 中配置 viral_table_id 可使用独立的表格")

        # 发送通知
        send_notification(
            "AI 内容情报监测",
            f"发现 {len(viral_videos)} 个新的低粉爆款视频"
        )
    else:
        print("\n暂未发现新的低粉爆款视频")
        print("\n提示:")
        print("- 系统会自动搜索 AI 相关内容")
        print("- 只有低粉丝(≤50K)且高播放(≥5x订阅)的视频才会被报告")
        print("- 每12小时自动运行一次")

    print("=" * 60)


def send_notification(title: str, message: str):
    """发送 macOS 系统通知"""
    try:
        import subprocess
        cmd = [
            "osascript",
            "-e",
            f'display notification "{message}" with title "{title}" sound name "Glass"'
        ]
        subprocess.run(cmd, check=True, capture_output=True)
    except Exception as e:
        print(f"   ⚠️ 发送通知失败: {e}")


if __name__ == "__main__":
    main()
