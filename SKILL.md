---
name: ai-news-aggregator
description: AI 信息聚合器 - 从多个来源（RSS、YouTube、Twitter/X、Reddit）自动聚合 AI 相关新闻和动态，使用 DeepSeek 进行翻译、摘要和分类，支持输出到飞书多维表格或本地文件。当用户需要聚合 AI 新闻、监控 AI 动态、或从 n8n 迁移信息聚合工作流时使用此 skill。
---

# AI News Aggregator

AI 信息聚合器 - 从多个来源自动聚合 AI 相关内容，进行智能处理并输出。

## 快速开始

```bash
# 1. 安装依赖
pip install feedparser requests openai pyyaml

# 2. 配置 API Key（环境变量或配置文件）
export DEEPSEEK_API_KEY="your-api-key"

# 3. 运行聚合器
python -m scripts.run_aggregator
```

## 核心功能

### 1. 数据源获取

支持多个 AI 内容来源：

| 来源 | 类型 | 需认证 | 默认启用 |
|------|------|--------|----------|
| The Verge AI | RSS | ❌ | ✅ |
| TechCrunch AI | RSS | ❌ | ✅ |
| NYT AI | RSS | ❌ | ✅ |
| YouTube | API | ✅ | ❌ |
| Twitter/X | API | ✅ | ❌ |
| Reddit | API | ✅ | ❌ |

**使用方式：**
```python
from scripts.fetchers import fetch_all_sources

config = {
    "rss": {"enabled": True, "hours": 24},
    "youtube": {"enabled": False, "api_key": "...", "min_views": 10000},
    "twitter": {"enabled": False, "api_key": "..."},
    "reddit": {"enabled": False}
}

items = fetch_all_sources(config)
```

### 2. LLM 智能处理

使用 DeepSeek API 进行：

- **翻译**: 将标题翻译为中文
- **摘要**: 超过 3 句话自动生成 60-80 字摘要
- **分类**: 产品发布、研究突破、教程分享、观点评论、行业动态
- **价值过滤**: 自动过滤低价值内容

**使用方式：**
```python
from scripts.llm_processor import process_batch

config = {
    "translate": True,
    "summarize": True,
    "categorize": True,
    "filter_by_value": True
}

processed = process_batch(items, config)
```

### 3. 多格式输出

支持多种输出格式：

- **飞书多维表格**: 直接写入飞书
- **JSON**: 结构化数据
- **Markdown**: 可读性报告

**使用方式：**
```python
from scripts.feishu_output import export_to_json, export_to_markdown

export_to_json(items, "./output/news.json")
export_to_markdown(items, "./output/news.md")
```

## 配置文件

复制 `config.example.yaml` 为 `config.yaml` 并配置：

```yaml
sources:
  rss:
    enabled: true
    hours: 24

llm:
  api_key: "your-deepseek-api-key"
  translate: true
  categorize: true

output:
  json:
    enabled: true
    path: "./output/news.json"
  markdown:
    enabled: true
    path: "./output/news.md"
```

## 常见用例

### 获取今日 AI 新闻

```
帮我获取今天的 AI 新闻，生成 Markdown 报告
```

### 聚合并翻译 AI 内容

```
从 RSS 获取 AI 新闻，翻译成中文，按分类输出
```

### 从 n8n 迁移

此 skill 可替代 n8n 信息聚合工作流，提供相同功能但更轻量。

## 资源说明

- **scripts/fetchers.py**: 数据源获取（RSS、YouTube、Twitter、Reddit）
- **scripts/llm_processor.py**: DeepSeek LLM 处理（翻译、摘要、分类）
- **scripts/feishu_output.py**: 输出到飞书、JSON、Markdown
- **config.example.yaml**: 配置文件模板
