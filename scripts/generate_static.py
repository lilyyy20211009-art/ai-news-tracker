#!/usr/bin/env python3
"""
生成静态 HTML 版本
不依赖 Flask，适合纯静态托管
"""
import json
import shutil
from pathlib import Path
from datetime import datetime

# 添加脚本目录到路径
script_dir = Path(__file__).parent
import sys
sys.path.insert(0, str(script_dir))

from run_aggregator import load_config, main as run_aggregator_main
from fetchers import fetch_all_sources
from llm_processor import generate_daily_summary
from feishu_output import export_to_json


def generate_static_site(output_dir: str = "./static-site"):
    """
    生成静态网站，适合部署到 GitHub Pages / Cloudflare Pages 等

    Args:
        output_dir: 输出目录
    """
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    print("🔄 正在获取最新数据...")

    # 运行聚合器
    config = load_config()
    raw_items = fetch_all_sources(config["sources"])
    print(f"✅ 获取到 {len(raw_items)} 条内容")

    # 生成摘要
    daily_summary = generate_daily_summary(raw_items)

    # 导出 JSON 数据
    json_file = output_path / "data.json"
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(raw_items, f, ensure_ascii=False, indent=2)

    # 读取 HTML 模板并注入数据
    source_dir = script_dir.parent / "output"
    html_file = source_dir / "today.html"

    if html_file.exists():
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # 修改 HTML 使其支持静态托管
        # 替换数据源为 data.json
        import re

        # 将内嵌数据替换为外部引用
        html_content = re.sub(
            r'const newsData = (\[.*?\]);',
            'const newsData = await fetch("./data.json").then(r => r.json());',
            html_content,
            flags=re.DOTALL
        )

        # 移除刷新按钮相关代码（静态托管不支持后端刷新）
        html_content = re.sub(
            r'<button class="refresh-btn"[^>]*>.*?</button>',
            '',
            html_content,
            flags=re.DOTALL
        )

        # 移除 refreshData 函数
        html_content = re.sub(
            r'function refreshData\(\) \{.*?\n\s*\}',
            '',
            html_content,
            flags=re.DOTALL
        )

        # 添加自动刷新提示
        auto_refresh_note = '''
        <style>
        .auto-refresh-note {
            text-align: center;
            padding: 15px;
            background: var(--bg-secondary);
            border-radius: 12px;
            margin-bottom: 20px;
            font-size: 0.85rem;
            color: var(--text-muted);
        }
        .auto-refresh-note a {
            color: var(--accent-blue);
            text-decoration: none;
        }
        </style>
        <div class="auto-refresh-note">
            📅 数据每天 9:00 自动更新 |
            <a href="https://github.com/你的用户名/ai-news-tracker" target="_blank">源码</a>
        </div>
        '''

        html_content = html_content.replace(
            '<div class="summary-section">',
            auto_refresh_note + '<div class="summary-section">'
        )

        # 保存静态 HTML
        static_html = output_path / "index.html"
        with open(static_html, 'w', encoding='utf-8') as f:
            f.write(html_content)

        # 复制到 today.html（保持兼容）
        shutil.copy2(static_html, output_path / "today.html")

        print(f"✅ 静态网站已生成到: {output_path}")
        print(f"   - index.html (首页)")
        print(f"   - today.html (热点报告)")
        print(f"   - data.json (数据文件)")

        return output_path


def main():
    """生成静态网站"""
    import argparse
    parser = argparse.ArgumentParser(description="生成静态网站")
    parser.add_argument(
        "--output",
        default="./static-site",
        help="输出目录 (默认: ./static-site)"
    )
    args = parser.parse_args()

    generate_static_site(args.output)

    print("\n📤 部署指南:")
    print("1. 将输出目录的内容上传到 GitHub / Cloudflare Pages")
    print("2. 或者将整个项目推送到 GitHub，启用 GitHub Pages")
    print("3. 配置 GitHub Actions 自动更新（已包含 .github/workflows/update.yml）")


if __name__ == "__main__":
    main()
