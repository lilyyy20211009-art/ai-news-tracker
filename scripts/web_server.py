#!/usr/bin/env python3
"""
AI News Aggregator Web Server
提供网页界面和刷新 API
"""
import os
import sys
import json
import subprocess
from datetime import datetime
from pathlib import Path
from flask import Flask, jsonify, send_from_directory, request

# 添加脚本目录到路径
script_dir = Path(__file__).parent
sys.path.insert(0, str(script_dir))

app = Flask(__name__)

# 配置
OUTPUT_DIR = script_dir.parent / "output"
HTML_FILE = OUTPUT_DIR / "today.html"
JSON_FILE = OUTPUT_DIR / "news.json"


def run_aggregator():
    """运行聚合器获取最新数据"""
    try:
        result = subprocess.run(
            [sys.executable, str(script_dir / "run_aggregator.py")],
            capture_output=True,
            text=True,
            timeout=120,
            cwd=str(script_dir.parent)
        )
        return result.returncode == 0, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return False, "", "聚合器运行超时"
    except Exception as e:
        return False, "", str(e)


@app.route('/')
def index():
    """主页 - 返回 HTML 报告"""
    if HTML_FILE.exists():
        return send_from_directory(str(OUTPUT_DIR), 'today.html')
    return "请先运行聚合器生成数据", 404


@app.route('/api/refresh', methods=['POST'])
def refresh():
    """刷新数据 API"""
    print(f"[{datetime.now()}] 收到刷新请求")

    # 返回立即响应，后台开始处理
    success, stdout, stderr = run_aggregator()

    if success:
        # 读取最新的 JSON 数据
        if JSON_FILE.exists():
            with open(JSON_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # 统计数据
            by_source = {}
            for item in data:
                source = item.get('来源', '未知')
                by_source[source] = by_source.get(source, 0) + 1

            return jsonify({
                'success': True,
                'message': '数据刷新成功',
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'stats': {
                    'total': len(data),
                    'by_source': by_source
                },
                'data': data
            })
        else:
            return jsonify({'success': False, 'message': '数据文件未生成'}), 500
    else:
        return jsonify({
            'success': False,
            'message': '数据刷新失败',
            'error': stderr
        }), 500


@app.route('/api/data')
def get_data():
    """获取当前数据 API"""
    if JSON_FILE.exists():
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({'error': '数据文件不存在'}), 404


def main():
    """启动 Web 服务器"""
    # 确保输出目录存在
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 检查是否有数据
    if not HTML_FILE.exists():
        print("⚠️  未找到数据文件，正在首次运行聚合器...")
        success, _, _ = run_aggregator()
        if success:
            print("✅ 首次运行成功")
        else:
            print("❌ 首次运行失败，请检查配置")

    print("\n" + "=" * 60)
    print("🚀 AI News Aggregator Web Server")
    print("=" * 60)
    print(f"\n📊 访问地址: http://localhost:5000")
    print(f"📁 数据目录: {OUTPUT_DIR}")
    print("\n按 Ctrl+C 停止服务器")
    print("=" * 60 + "\n")

    app.run(host='127.0.0.1', port=5000, debug=False)


if __name__ == '__main__':
    main()
