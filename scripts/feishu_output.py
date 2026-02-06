"""
AI News Aggregator - Feishu Output
将处理后的新闻输出到飞书多维表格
"""

import os
import requests
from datetime import datetime
from typing import List, Dict, Any, Optional


class FeishuBitableClient:
    """飞书多维表格客户端"""

    def __init__(
        self,
        app_id: Optional[str] = None,
        app_secret: Optional[str] = None,
        app_token: Optional[str] = None,
        table_id: Optional[str] = None,
        wiki_node_id: Optional[str] = None,
        conversation_id: Optional[str] = None,
        webhook_url: Optional[str] = None
    ):
        """
        初始化飞书客户端

        Args:
            app_id: 飞书应用 ID，默认从环境变量 FEISHU_APP_ID 读取
            app_secret: 飞书应用 Secret，默认从环境变量 FEISHU_APP_SECRET 读取
            app_token: 多维表格 app_token，默认从环境变量 FEISHU_APP_TOKEN 读取
            table_id: 数据表 ID，默认从环境变量 FEISHU_TABLE_ID 读取
            wiki_node_id: Wiki 节点 ID（用于 Wiki 中的表格，已弃用）
            conversation_id: 飞书群聊/机器人对话 ID，用于发送通知
            webhook_url: 自定义机器人 Webhook URL，用于发送通知（推荐）
        """
        self.app_id = app_id or os.getenv("FEISHU_APP_ID")
        self.app_secret = app_secret or os.getenv("FEISHU_APP_SECRET")
        self.app_token = app_token or os.getenv("FEISHU_APP_TOKEN")
        self.table_id = table_id or os.getenv("FEISHU_TABLE_ID")
        self.wiki_node_id = wiki_node_id or os.getenv("FEISHU_WIKI_NODE_ID")
        self.conversation_id = conversation_id or os.getenv("FEISHU_CONVERSATION_ID", "")
        self.webhook_url = webhook_url or os.getenv("FEISHU_WEBHOOK_URL", "")

        self.base_url = "https://open.feishu.cn/open-apis"
        self.access_token = None

        if not all([self.app_id, self.app_secret]):
            print("警告: 飞书配置不完整，缺少 App ID 或 App Secret")

    def _get_wiki_app_token(self) -> str:
        """获取 Wiki 中表格的 app_token"""
        if self.app_token:
            return self.app_token

        if not self.wiki_node_id:
            raise RuntimeError("未配置 Wiki 节点 ID，无法获取 app_token")

        try:
            access_token = self._get_access_token()

            # 对于 Wiki 中的表格，wiki_node_id 就是 bitable 的 app_token
            # Wiki 表格本质上就是一个独立的多维表格
            # 节点 token (wiki_node_id) 就是表格的 app_token

            # 先尝试通过搜索 API 获取节点信息
            url = f"{self.base_url}/wiki/v2/spaces/{self.wiki_node_id}/nodes/{self.wiki_node_id}"
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }

            response = requests.get(url, headers=headers)
            data = response.json()

            if data.get("code") == 0 and "data" in data:
                node_obj = data["data"].get("node_obj", {})
                obj_type = node_obj.get("obj_type", "")

                # 如果是表格类型，obj_token 就是 app_token
                if obj_type == "bitable":
                    self.app_token = node_obj.get("obj_token", "")
                    if self.app_token:
                        print(f"✅ 获取到 Wiki 表格 app_token: {self.app_token}")
                        return self.app_token
                else:
                    print(f"⚠️ 节点类型不是 bitable，而是: {obj_type}")

            # 如果 API 调用失败，对于 Wiki 中的表格，node_id 通常就是 app_token
            print(f"⚠️ API 返回: {data.get('msg', data)}")
            print(f"ℹ️  尝试直接使用 wiki_node_id 作为 app_token")

            # Wiki 中的多维表格，node_id 通常可以作为 app_token 使用
            self.app_token = self.wiki_node_id
            return self.app_token

        except Exception as e:
            print(f"⚠️ 获取 app_token 失败: {e}")
            import traceback
            traceback.print_exc()
            # 回退：使用 wiki_node_id
            self.app_token = self.wiki_node_id
            return self.app_token

    def _get_access_token(self) -> str:
        """获取访问令牌"""
        if self.access_token:
            return self.access_token

        url = f"{self.base_url}/auth/v3/tenant_access_token/internal"
        payload = {
            "app_id": self.app_id,
            "app_secret": self.app_secret
        }

        response = requests.post(url, json=payload)
        data = response.json()

        if data.get("code") != 0:
            raise RuntimeError(f"飞书认证失败: {data.get('msg')}")

        self.access_token = data["tenant_access_token"]
        return self.access_token

    def add_record(self, item: Dict[str, Any]) -> bool:
        """
        添加一条记录到飞书多维表格

        Args:
            item: 内容项，包含 标题、日期、链接、来源、板块 等字段

        Returns:
            是否成功
        """
        if not all([self.app_id, self.app_secret, self.table_id]):
            print("飞书配置不完整，跳过")
            return False

        try:
            access_token = self._get_access_token()

            # 确定 app_token
            if self.app_token:
                app_token = self.app_token
            elif self.wiki_node_id:
                app_token = self._get_wiki_app_token()
            else:
                app_token = self.table_id

            # 构造记录
            # 注意: 字段名称需要与飞书表格中的字段完全匹配

            # 定义需要转换为时间戳的字段名
            date_field_names = ["日期", "发布时间"]
            # 定义需要转换为 URL 格式的字段名
            url_field_names = ["链接", "视频链接"]
            # 定义飞书表格中实际存在的字段（根据表格结构定义）
            allowed_fields = ["标题", "内容", "日期", "链接", "来源", "板块", "分类"]
            # 字段名映射：将数据中的字段名映射到飞书表格的实际字段名
            field_mapping = {
                "内容": "多行文本"  # 数据中的"内容"对应飞书表格的"多行文本"
            }

            fields = {}
            for key, value in item.items():
                # 跳过不在允许列表中的字段
                if key not in allowed_fields:
                    continue

                # 应用字段名映射
                field_name = field_mapping.get(key, key)

                # 处理日期字段 -> 毫秒时间戳
                if field_name in date_field_names:
                    if isinstance(value, str) and value:
                        try:
                            dt = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
                            value = int(dt.timestamp() * 1000)
                        except ValueError:
                            value = 0
                    else:
                        value = value if isinstance(value, int) else 0

                # 处理 URL 字段 -> {"link": "..."} 格式
                elif field_name in url_field_names:
                    value = {"link": value}

                fields[field_name] = value

            # 使用正确的 API URL 格式
            url = f"{self.base_url}/bitable/v1/apps/{app_token}/tables/{self.table_id}/records"
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }

            payload = {"fields": fields}
            response = requests.post(url, headers=headers, json=payload)

            # 检查 HTTP 状态码和 API 响应码
            if response.status_code == 200:
                result = response.json()
                if result.get("code") == 0:
                    print(f"✅ 已添加到飞书: {item.get('标题', '')[:30]}...")
                    return True
                else:
                    print(f"❌ 飞书 API 错误: {result.get('msg')} ({result.get('code')})")
                    return False
            else:
                print(f"❌ 飞书添加失败: {response.text}")
                return False

        except Exception as e:
            print(f"❌ 飞书输出错误: {e}")
            return False

    def _get_existing_titles(self) -> set:
        """获取表格中已存在的标题，用于去重"""
        try:
            access_token = self._get_access_token()

            if self.app_token:
                app_token = self.app_token
            elif self.wiki_node_id:
                app_token = self._get_wiki_app_token()
            else:
                app_token = self.table_id

            url = f"{self.base_url}/bitable/v1/apps/{app_token}/tables/{self.table_id}/records"
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }

            existing_titles = set()
            page_token = None

            while True:
                params = {"page_size": 100}
                if page_token:
                    params["page_token"] = page_token

                response = requests.get(url, headers=headers, params=params)
                data = response.json()

                items = data.get('data', {}).get('items', [])
                for item in items:
                    fields = item.get('fields', {})
                    # 支持 "标题" 和 "视频标题" 两种字段名
                    title = fields.get('标题', '') or fields.get('视频标题', '')
                    if title:
                        existing_titles.add(title)

                if not data.get('data', {}).get('has_more'):
                    break
                page_token = data.get('data', {}).get('page_token')

            return existing_titles
        except Exception as e:
            print(f"⚠️ 获取已有标题失败: {e}")
            return set()

    def add_batch(self, items: List[Dict[str, Any]]) -> int:
        """
        批量添加记录到飞书多维表格（自动去重）

        Args:
            items: 内容项列表

        Returns:
            成功添加的数量
        """
        if not all([self.app_id, self.app_secret, self.table_id]):
            print("飞书配置不完整，无法批量添加")
            return 0

        # 获取已存在的标题用于去重
        existing_titles = self._get_existing_titles()
        skipped_count = 0

        success_count = 0
        for item in items:
            # 支持 "标题" 和 "视频标题" 两种字段名
            title = item.get("标题", "") or item.get("视频标题", "")
            if title in existing_titles:
                skipped_count += 1
                continue

            if self.add_record(item):
                success_count += 1
                existing_titles.add(title)

        if skipped_count > 0:
            print(f"   跳过 {skipped_count} 条已存在的记录")

        return success_count

    def send_conversation_message(self, message: str) -> bool:
        """
        发送消息到飞书群聊或机器人对话

        Args:
            message: 要发送的消息内容

        Returns:
            是否发送成功
        """
        if not self.conversation_id:
            print("   ⚠️ 未配置 conversation_id，跳过飞书对话通知")
            return False

        try:
            access_token = self._get_access_token()

            url = f"{self.base_url}/message/v4/send"
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }

            payload = {
                "receive_id_type": "chat_id",
                "receive_id": self.conversation_id,
                "msg_type": "text",
                "content": {"text": message}
            }

            response = requests.post(url, headers=headers, json=payload)
            data = response.json()

            if data.get("code") == 0:
                print(f"   ✅ 飞书对话通知已发送")
                return True
            else:
                print(f"   ⚠️ 飞书对话通知发送失败: {data.get('msg')}")
                return False

        except Exception as e:
            print(f"   ⚠️ 发送飞书对话通知失败: {e}")
            return False

    def send_webhook_message(self, message: str) -> bool:
        """
        通过自定义机器人 Webhook 发送消息

        Args:
            message: 要发送的消息内容

        Returns:
            是否发送成功
        """
        if not self.webhook_url:
            return False

        try:
            payload = {
                "msg_type": "text",
                "content": {"text": message}
            }

            response = requests.post(self.webhook_url, json=payload)
            data = response.json()

            if data.get("code") == 0 or response.status_code == 200:
                print(f"   ✅ 飞书 Webhook 通知已发送")
                return True
            else:
                print(f"   ⚠️ 飞书 Webhook 通知发送失败: {data.get('msg')}")
                return False

        except Exception as e:
            print(f"   ⚠️ 发送飞书 Webhook 通知失败: {e}")
            return False

    def send_notification(self, message: str) -> bool:
        """
        发送通知（优先使用 Webhook，其次使用 conversation_id）

        Args:
            message: 要发送的消息内容

        Returns:
            是否发送成功
        """
        # 优先使用 Webhook
        if self.webhook_url:
            return self.send_webhook_message(message)
        # 其次使用 conversation_id
        elif self.conversation_id:
            return self.send_conversation_message(message)
        else:
            return False


def export_to_feishu(items: List[Dict[str, Any]], config: Dict[str, Any], table_id: Optional[str] = None, send_notification: bool = False) -> int:
    """
    将内容列表导出到飞书

    Args:
        items: 内容项列表
        config: 配置字典，包含 app_id, app_secret, app_token 等
        table_id: 可选的自定义表格 ID（用于写入不同的表格）
        send_notification: 是否发送飞书对话通知

    Returns:
        成功添加的数量
    """
    # 使用指定的 table_id 或配置中的默认 table_id
    target_table_id = table_id or config.get("table_id")

    client = FeishuBitableClient(
        app_id=config.get("app_id"),
        app_secret=config.get("app_secret"),
        app_token=config.get("app_token"),
        table_id=target_table_id,
        wiki_node_id=config.get("wiki_node_id"),
        conversation_id=config.get("conversation_id"),
        webhook_url=config.get("webhook_url")
    )

    count = client.add_batch(items)

    # 发送飞书对话通知（优先使用 Webhook，其次使用 conversation_id）
    if send_notification and count > 0:
        client.send_notification(f"✅ 已成功更新 {count} 条记录到飞书多维表格")

    return count


def export_to_json(items: List[Dict[str, Any]], filepath: str) -> bool:
    """
    将内容导出为 JSON 文件

    Args:
        items: 内容项列表
        filepath: 输出文件路径

    Returns:
        是否成功
    """
    import json
    from pathlib import Path

    try:
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)

        print(f"✅ 已导出到 {filepath}")
        return True

    except Exception as e:
        print(f"❌ JSON 导出失败: {e}")
        return False


def export_to_markdown(items: List[Dict[str, Any]], filepath: str) -> bool:
    """
    将内容导出为 Markdown 文件

    Args:
        items: 内容项列表
        filepath: 输出文件路径

    Returns:
        是否成功
    """
    from pathlib import Path
    from datetime import datetime

    try:
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)

        with open(filepath, "w", encoding="utf-8") as f:
            # 头部
            f.write(f"# AI 信息聚合报告\n\n")
            f.write(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write(f"共 {len(items)} 条信息\n\n")
            f.write("---\n\n")

            # 按分类分组
            by_category = {}
            for item in items:
                category = item.get("分类", "行业动态")
                if category not in by_category:
                    by_category[category] = []
                by_category[category].append(item)

            # 输出各分类
            for category, category_items in by_category.items():
                f.write(f"## {category}\n\n")
                for item in category_items:
                    f.write(f"### {item.get('标题', '')}\n\n")
                    f.write(f"- **来源**: {item.get('来源', '')}\n")
                    f.write(f"- **日期**: {item.get('日期', '')}\n")
                    f.write(f"- **链接**: [{item.get('链接', '')}]({item.get('链接', '')})\n")
                    if "板块" in item:
                        f.write(f"- **板块**: {item['板块']}\n")
                    f.write("\n")

        print(f"✅ 已导出到 {filepath}")
        return True

    except Exception as e:
        print(f"❌ Markdown 导出失败: {e}")
        return False


def export_to_html(items: List[Dict[str, Any]], summary: str, filepath: str) -> bool:
    """
    将内容导出为交互式 HTML 文件（带刷新按钮）

    Args:
        items: 内容项列表
        summary: 中文摘要文本
        filepath: 输出文件路径

    Returns:
        是否成功
    """
    import json
    from pathlib import Path
    from datetime import datetime

    try:
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)

        # 统计数据
        total = len(items)
        verge = len([i for i in items if 'Verge' in i.get('来源', '')])
        techcrunch = len([i for i in items if 'TechCrunch' in i.get('来源', '')])
        nyt = len([i for i in items if 'NYT' in i.get('来源', '')])
        twitter = len([i for i in items if 'Twitter' in i.get('来源', '') or 'X' in i.get('来源', '')])
        reddit = len([i for i in items if 'Reddit' in i.get('来源', '')])
        youtube = len([i for i in items if 'YouTube' in i.get('来源', '')])

        # 将 Markdown 摘要转为 HTML（摘要已经是纯内容，不包含标题）
        import re
        summary_html = summary
        # 不转换标题，因为模板中已经有了
        # 只处理列表和换行
        summary_html = re.sub(r'^- (.+)$', r'<li>\1</li>', summary_html, flags=re.MULTILINE)
        summary_html = re.sub(r'(<li>.+</li>\n?)+', lambda m: f'<ul>{m.group(0)}</ul>', summary_html)
        summary_html = summary_html.replace('\n', '<br>')

        html_template = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 热点追踪 - {datetime.now().strftime('%Y年%m月%d日')}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        :root {{
            --bg-primary: #0a0a0f;
            --bg-secondary: #12121a;
            --bg-card: #1a1a25;
            --text-primary: #e4e4e7;
            --text-secondary: #a1a1aa;
            --text-muted: #71717a;
            --accent-blue: #3b82f6;
            --accent-purple: #8b5cf6;
            --accent-green: #10b981;
            --border-color: #27272a;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            line-height: 1.6;
        }}
        .container {{ max-width: 1400px; margin: 0 auto; padding: 20px; }}
        .header {{ text-align: center; padding: 40px 0; border-bottom: 1px solid var(--border-color); margin-bottom: 30px; }}
        .header h1 {{ font-size: 2.5rem; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }}
        .header-meta {{ color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px; }}
        .refresh-btn {{ padding: 12px 32px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border: none; border-radius: 24px; color: white; font-size: 1rem; cursor: pointer; transition: all 0.3s; }}
        .refresh-btn:hover {{ transform: scale(1.05); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3); }}
        .stats {{ display: flex; justify-content: center; gap: 30px; margin-top: 20px; flex-wrap: wrap; }}
        .stat-item {{ text-align: center; }}
        .stat-value {{ font-size: 1.8rem; font-weight: 700; color: var(--accent-blue); }}
        .stat-label {{ font-size: 0.85rem; color: var(--text-muted); }}
        .summary-section {{ background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 30px; margin-bottom: 30px; }}
        .summary-section h2 {{ font-size: 1.5rem; margin-bottom: 20px; color: var(--accent-blue); }}
        .summary-section h3 {{ font-size: 1.2rem; margin: 20px 0 10px; color: var(--accent-purple); }}
        .summary-section ul {{ margin-left: 20px; }}
        .summary-section li {{ margin: 8px 0; color: var(--text-secondary); }}
        .filter-tabs {{ display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; justify-content: center; }}
        .filter-tab {{ padding: 10px 24px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; cursor: pointer; transition: all 0.3s; color: var(--text-secondary); }}
        .filter-tab:hover {{ border-color: var(--accent-blue); color: var(--text-primary); }}
        .filter-tab.active {{ background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-color: transparent; color: white; }}
        .news-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; }}
        .news-card {{ background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; transition: all 0.3s; cursor: pointer; position: relative; overflow: hidden; }}
        .news-card::before {{ content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple)); opacity: 0; transition: opacity 0.3s; }}
        .news-card:hover {{ transform: translateY(-4px); border-color: var(--accent-blue); box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15); }}
        .news-card:hover::before {{ opacity: 1; }}
        .card-source {{ display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: var(--bg-secondary); border-radius: 12px; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; }}
        .card-source::before {{ content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-green); }}
        .card-source.verge::before {{ background: #e11d48; }}
        .card-source.techcrunch::before {{ background: #0a9f1a; }}
        .card-source.nyt::before {{ background: #3b82f6; }}
        .card-source.twitter::before {{ background: #000; }}
        .card-source.reddit::before {{ background: #ff4500; }}
        .card-source.youtube::before {{ background: #ff0000; }}
        .card-title {{ font-size: 1.1rem; font-weight: 600; margin-bottom: 12px; line-height: 1.4; }}
        .card-meta {{ display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); }}
        .card-date {{ display: flex; align-items: center; gap: 4px; }}
        .card-link {{ display: inline-flex; align-items: center; gap: 4px; color: var(--accent-blue); text-decoration: none; font-size: 0.8rem; }}
        @media (max-width: 768px) {{ .header h1 {{ font-size: 1.8rem; }} .news-grid {{ grid-template-columns: 1fr; }} .stats {{ gap: 20px; }} }}
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🤖 AI 热点追踪</h1>
            <div class="header-meta">
                <span>{datetime.now().strftime('%Y年%m月%d日 %H:%M')} 更新</span>
            </div>
            <div class="stats">
                <div class="stat-item"><div class="stat-value">{total}</div><div class="stat-label">总条数</div></div>
                <div class="stat-item"><div class="stat-value">{verge}</div><div class="stat-label">Verge</div></div>
                <div class="stat-item"><div class="stat-value">{techcrunch}</div><div class="stat-label">TechCrunch</div></div>
                <div class="stat-item"><div class="stat-value">{nyt}</div><div class="stat-label">NYT</div></div>
                <div class="stat-item"><div class="stat-value">{twitter}</div><div class="stat-label">Twitter/X</div></div>
                <div class="stat-item"><div class="stat-value">{reddit}</div><div class="stat-label">Reddit</div></div>
                <div class="stat-item"><div class="stat-value">{youtube}</div><div class="stat-label">YouTube</div></div>
            </div>
        </header>

        <div class="summary-section">
            <h2>📊 今日热点摘要</h2>
            {summary_html}
        </div>

        <div class="filter-tabs">
            <button class="filter-tab active" onclick="filterNews('all')">全部</button>
            <button class="filter-tab" onclick="filterNews('Verge')">Verge</button>
            <button class="filter-tab" onclick="filterNews('TechCrunch')">TechCrunch</button>
            <button class="filter-tab" onclick="filterNews('NYT')">NYT</button>
            <button class="filter-tab" onclick="filterNews('Twitter')">Twitter/X</button>
            <button class="filter-tab" onclick="filterNews('Reddit')">Reddit</button>
            <button class="filter-tab" onclick="filterNews('YouTube')">YouTube</button>
        </div>

        <div id="newsContainer" class="news-grid"></div>
    </div>

    <script>
        const newsData = {json.dumps(items, ensure_ascii=False)};

        function renderNewsCards(items) {{
            const container = document.getElementById('newsContainer');
            if (items.length === 0) {{
                container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">暂无数据</div>';
                return;
            }}

            container.innerHTML = items.map(item => {{
                const sourceLower = (item.来源 || '').toLowerCase();
                const sourceClass = sourceLower.includes('verge') ? 'verge' :
                                   sourceLower.includes('techcrunch') ? 'techcrunch' :
                                   sourceLower.includes('nyt') ? 'nyt' :
                                   sourceLower.includes('twitter') || sourceLower.includes('x') ? 'twitter' :
                                   sourceLower.includes('reddit') ? 'reddit' :
                                   sourceLower.includes('youtube') ? 'youtube' : '';

                const date = item.日期 ? new Date(item.日期).toLocaleString('zh-CN', {{
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                }}) : '';

                return `<div class="news-card" onclick="window.open('${{item.链接 || ''}}', '_blank')">
                    <div class="card-source ${{sourceClass}}">${{item.来源 || '未知'}}</div>
                    <div class="card-title">${{item.标题 || '无标题'}}</div>
                    <div class="card-meta">
                        <div class="card-date">🕒 ${{date}}</div>
                        <div class="card-link">阅读原文 →</div>
                    </div>
                </div>`;
            }}).join('');
        }}

        function filterNews(filter) {{
            document.querySelectorAll('.filter-tab').forEach(tab => {{
                tab.classList.remove('active');
                if (tab.textContent.includes(filter === 'all' ? '全部' : filter)) {{
                    tab.classList.add('active');
                }}
            }});

            const filtered = filter === 'all' ? newsData :
                newsData.filter(item => item.来源?.toLowerCase().includes(filter.toLowerCase()));
            renderNewsCards(filtered);
        }}

        function refreshData() {{
            const btn = document.querySelector('.refresh-btn');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '🔄 刷新中...';

            fetch('/api/refresh', {{
                method: 'POST',
                headers: {{
                    'Content-Type': 'application/json'
                }}
            }})
            .then(response => response.json())
            .then(data => {{
                if (data.success) {{
                    // 更新数据
                    newsData = data.data;
                    renderNewsCards(newsData);

                    // 更新所有统计信息
                    const stats = data.stats;
                    const bySource = stats.by_source || {{}};

                    // 计算各平台数量
                    let verge = 0, techcrunch = 0, nyt = 0, twitter = 0, reddit = 0, youtube = 0;
                    for (const [source, count] of Object.entries(bySource)) {{
                        const s = source.toLowerCase();
                        if (s.includes('verge')) verge += count;
                        else if (s.includes('techcrunch')) techcrunch += count;
                        else if (s.includes('nyt')) nyt += count;
                        else if (s.includes('twitter') || s.includes('x')) twitter += count;
                        else if (s.includes('reddit')) reddit += count;
                        else if (s.includes('youtube')) youtube += count;
                    }}

                    // 更新页面上的统计数字
                    const statValues = document.querySelectorAll('.stat-value');
                    if (statValues.length >= 7) {{
                        statValues[0].textContent = stats.total;      // 总条数
                        statValues[1].textContent = verge;            // Verge
                        statValues[2].textContent = techcrunch;       // TechCrunch
                        statValues[3].textContent = nyt;              // NYT
                        statValues[4].textContent = twitter;          // Twitter/X
                        statValues[5].textContent = reddit;           // Reddit
                        statValues[6].textContent = youtube;          // YouTube
                    }}

                    // 显示成功消息
                    alert('✅ ' + data.message + '\\n\\n更新时间: ' + data.timestamp);
                }} else {{
                    alert('❌ 刷新失败: ' + data.message);
                }}
            }})
            .catch(error => {{
                console.error('刷新失败:', error);
                alert('❌ 刷新失败，请确保 Web 服务器正在运行\\n\\n提示: 使用 python3 scripts/web_server.py 启动服务器');
            }})
            .finally(() => {{
                btn.disabled = false;
                btn.innerHTML = originalText;
            }});
        }}

        renderNewsCards(newsData);
    </script>
</body>
</html>'''

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html_template)

        print(f"✅ 已导出到 {filepath}")
        return True

    except Exception as e:
        print(f"❌ HTML 导出失败: {e}")
        import traceback
        traceback.print_exc()
        return False
