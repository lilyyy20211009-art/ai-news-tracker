# 飞书多维表格配置指南

## 步骤 1: 创建飞书多维表格

1. 打开 [飞书](https://www.feishu.cn) 并登录
2. 在左侧导航栏点击 "云文档" → "多维表格"
3. 点击 "新建多维表格"
4. 命名为 "AI 热点追踪"

## 步骤 2: 配置表格字段

在多维表格中创建以下字段：

| 字段名称 | 字段类型 | 说明 |
|---------|---------|------|
| 标题 | 文本 | 新闻标题 |
| 日期 | 日期 | 发布时间 |
| 链接 | URL | 原文链接 |
| 来源 | 单选 | The Verge AI、TechCrunch AI、NYT AI、YouTube 等 |
| 板块 | 单选 | 新闻、视频 |
| 分类 | 单选 | AI、行业动态、产品发布、融资等 |

## 步骤 3: 创建飞书应用获取 API 凭证

### 3.1 创建应用

1. 访问 [飞书开放平台](https://open.feishu.cn/app)
2. 点击 "创建企业自建应用"
3. 填写应用信息：
   - 应用名称：AI News Aggregator
   - 应用描述：自动聚合 AI 新闻
4. 点击 "创建"

### 3.2 获取凭证

1. 在应用页面，找到 "凭证与基础信息"
2. 复制以下信息：
   - **App ID**: `cli_xxxxxxxxxxxxx`
   - **App Secret**: `xxxxxxxxxxxxxxxxxxxxx`

### 3.3 申请权限

在 "权限管理" 中申请以下权限：
- `bitable:app` (查看和编辑多维表格)
- `bitable:app:readonly` (只读权限，备用)

### 3.4 发布应用

1. 在 "版本管理与发布" 中点击 "创建版本"
2. 填写版本信息后点击 "申请发布"
3. 在 "管理后台" 中审核并发布应用

## 步骤 4: 获取表格 ID

1. 打开你创建的 "AI 热点追踪" 多维表格
2. 从浏览器地址栏复制表格 ID
3. 表格 URL 格式：`https://example.feishu.cn/base/xxxxxx`
4. 复制 `base/` 后面的部分（如果需要特定的 table_id，请在表格设置中查看）

## 步骤 5: 配置 API Key（可选，用于更好的中文摘要）

1. 访问 [DeepSeek 开放平台](https://platform.deepseek.com)
2. 注册并登录
3. 在 API Keys 页面创建新的 API Key
4. 复制 API Key

## 步骤 6: 更新配置文件

将获取到的信息填入配置文件：

```bash
cd /Users/y/.claude/skills/ai-news-aggregator
```

编辑 `config.yaml` 文件，填入你的凭证。

---

完成后，请告诉我你的：
1. 飞书 App ID
2. 飞书 App Secret
3. 表格 ID

我会帮你更新配置并测试连接。
