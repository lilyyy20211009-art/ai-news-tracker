"""
AI News Aggregator - 主运行脚本
执行完整的数据聚合、处理和输出流程
"""

import os
import sys
import yaml
from pathlib import Path
from datetime import datetime

# 添加脚本目录到路径
script_dir = Path(__file__).parent
sys.path.insert(0, str(script_dir))

from fetchers import fetch_all_sources
from llm_processor import process_batch, generate_daily_summary
from feishu_output import export_to_json, export_to_markdown, export_to_feishu, export_to_html


def load_config(config_path: str = None) -> dict:
    """加载配置文件"""
    if config_path is None:
        # 默认查找当前目录和用户目录下的 config.yaml
        for path in ["./config.yaml", "~/config.yaml", "~/.claude/skills/ai-news-aggregator/config.yaml"]:
            expanded = Path(path).expanduser()
            if expanded.exists():
                config_path = str(expanded)
                break

    if config_path and Path(config_path).exists():
        with open(config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)

    # 返回默认配置
    return {
        "sources": {
            "rss": {"enabled": True, "hours": 24},
            "youtube": {"enabled": False},
            "twitter": {"enabled": False},
            "reddit": {"enabled": False}
        },
        "llm": {
            "api_key": os.getenv("DEEPSEEK_API_KEY", ""),
            "translate": True,
            "summarize": True,
            "categorize": True,
            "filter_by_value": True
        },
        "output": {
            "json": {"enabled": True, "path": "./output/news.json"},
            "markdown": {"enabled": True, "path": "./output/news.md"},
            "feishu": {"enabled": False}
        }
    }


def main():
    """主函数"""
    print("=" * 60)
    print("🤖 AI News Aggregator")
    print("=" * 60)

    # 1. 加载配置
    print("\n📋 加载配置...")
    config = load_config()
    print(f"   RSS: {'✅' if config['sources']['rss']['enabled'] else '❌'}")
    print(f"   YouTube: {'✅' if config['sources'].get('youtube', {}).get('enabled') else '❌'}")
    print(f"   Twitter: {'✅' if config['sources'].get('twitter', {}).get('enabled') else '❌'}")

    # 2. 获取数据
    print("\n🔍 获取数据...")
    raw_items = fetch_all_sources(config["sources"])
    print(f"   获取到 {len(raw_items)} 条原始内容")

    if not raw_items:
        print("   ⚠️  未获取到任何内容")
        return

    # 3. LLM 处理
    llm_config = config.get("llm", {})
    if llm_config.get("api_key") or os.getenv("DEEPSEEK_API_KEY"):
        print("\n🧠 LLM 处理中...")
        print("   - 翻译: ✅" if llm_config.get("translate") else "   - 翻译: ❌")
        print("   - 摘要: ✅" if llm_config.get("summarize") else "   - 摘要: ❌")
        print("   - 分类: ✅" if llm_config.get("categorize") else "   - 分类: ❌")

        processed_items = process_batch(raw_items, llm_config)
        print(f"   处理后 {len(processed_items)} 条内容")
    else:
        print("\n⚠️  未配置 DeepSeek API Key，跳过 LLM 处理")
        processed_items = raw_items

    # 4. 输出结果
    print("\n📤 输出结果...")

    output_config = config.get("output", {})

    # 生成中文摘要
    print("\n📝 生成中文摘要...")
    daily_summary = generate_daily_summary(processed_items)

    # JSON
    if output_config.get("json", {}).get("enabled", True):
        json_path = output_config["json"].get("path", "./output/news.json")
        export_to_json(processed_items, json_path)

    # Markdown
    if output_config.get("markdown", {}).get("enabled", True):
        md_path = output_config["markdown"].get("path", "./output/news.md")
        export_to_markdown(processed_items, md_path)

    # HTML (带中文摘要和刷新按钮)
    html_path = output_config.get("html", {}).get("path", "./output/today.html")
    export_to_html(processed_items, daily_summary, html_path)

    # 飞书
    if output_config.get("feishu", {}).get("enabled", False):
        feishu_config = output_config["feishu"]
        count = export_to_feishu(processed_items, feishu_config)
        print(f"   飞书: {count} 条记录")

    print("\n✅ 完成!")
    print(f"   共处理 {len(processed_items)} 条内容")
    print(f"   HTML 报告: {html_path}")
    print("=" * 60)


if __name__ == "__main__":
    main()
