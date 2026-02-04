# API Key 配置指南

本文档详细说明如何获取 Twitter/X、YouTube 和 Reddit 的 API Key。

## 📋 目录

1. [Twitter/X API](#twitterx-api)
2. [YouTube Data API](#youtube-data-api)
3. [Reddit API](#reddit-api)
4. [配置到聚合器](#配置到聚合器)

---

## 🐦 Twitter/X API

### 费用说明

| 套餐 | 价格 | 限制 |
|------|------|------|
| Free | $0 | 只能读取，不能获取关注列表 |
| Basic | $100/月 | 可获取关注列表、推文搜索 |
| Pro | $5000/月 | 高级功能 |

**推荐**: Basic 套餐（需要付费）

### 获取步骤

#### 1. 注册 X Developer 账号

1. 访问 [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. 使用你的 X 账号登录
3. 点击 "Sign up for Free Account"
4. 填写开发者信息

#### 2. 创建应用

1. 登录后，点击 "+ Create Project"
2. 填写项目信息：
   - **Project name**: AI News Aggregator
   - **Description**: AI news tracking tool
3. 创建后会自动生成一个 App

#### 3. 获取 API Key

1. 进入你的项目
2. 点击 "Settings" → "App settings"
3. 找到以下信息并复制：
   - **API Key** (Bearer Token)
   - **API Secret** (用于认证)

#### 4. 升级到 Basic 套餐（如需获取关注列表）

1. 在 Developer Portal 点击 "Subscriptions"
2. 选择 "Basic" 套餐
3. 绑定信用卡（$100/月）
4. 等待激活（通常几分钟）

### 重要权限

确保你的应用有以下权限：
- ✅ Read Tweets
- ✅ Read Users
- ✅ Follows Read（需要 Basic 套餐）

---

## 📺 YouTube Data API

### 费用说明

| 套餐 | 价格 | 每日配额 |
|------|------|----------|
| 免费 | $0 | 10,000 单位 |
| 付费 | 按使用量 | 更高配额 |

**推荐**: 免费套餐（足够个人使用）

### 获取步骤

#### 1. 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 登录你的 Google 账号
3. 点击顶部的项目选择器
4. 点击 "新建项目"
5. 填写项目名称：`AI News Aggregator`
6. 点击 "创建"

#### 2. 启用 YouTube Data API v3

1. 在 Google Cloud Console 中
2. 进入 "API 和服务" → "库"
3. 搜索 "YouTube Data API v3"
4. 点击进入并点击 "启用"

#### 3. 创建 API Key

1. 进入 "API 和服务" → "凭据"
2. 点击 "创建凭据" → "API 密钥"
3. 复制生成的 API Key

#### 4. 限制 API Key（推荐）

1. 点击刚创建的 API Key
2. 在 "应用限制" 中选择 "IP 地址"
3. 添加你的服务器 IP（或留空用于测试）
4. 在 "API 限制" 中选择 "YouTube Data API v3"
5. 点击 "保存"

---

## 📱 Reddit API

### 费用说明

| 套餐 | 价格 | 限制 |
|------|------|------|
| 免费 | $0 | 每小时 60 请求 |

**推荐**: 免费套餐（完全免费）

### 获取步骤

#### 1. 创建 Reddit 应用

1. 访问 [Reddit App Preferences](https://www.reddit.com/prefs/apps)
2. 确保你已登录 Reddit 账号
3. 滚动到页面底部 "developed apps"
4. 点击 "create app" 或 "create another app"

#### 2. 填写应用信息

填写以下表单：

| 字段 | 值 |
|------|-----|
| name | AI News Aggregator |
| app type | **script** (重要！) |
| description | AI news tracking tool |
| about url | https://github.com/yourusername/ai-aggregator |
| redirect uri | http://localhost:8080 |

#### 3. 获取凭据

创建后你会看到：

```
client_id     = 你的客户端ID (14个字符)
client_secret = 你的密钥 (27个字符)
```

**注意**: `client_secret` 只在创建时显示一次，请立即复制保存！

#### 4. 获取 Access Token（运行时）

Reddit 需要运行时获取临时 access token：

```python
import requests

auth = requests.auth.HTTPBasicAuth('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET')
data = {'grant_type': 'client_credentials'}
response = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data)
access_token = response.json()['access_token']
```

---

## ⚙️ 配置到聚合器

### 方式 1: 环境变量（推荐）

```bash
# Twitter/X
export TWITTER_API_KEY="your-twitter-api-key"

# YouTube
export YOUTUBE_API_KEY="your-youtube-api-key"

# Reddit
export REDDIT_CLIENT_ID="your-reddit-client-id"
export REDDIT_CLIENT_SECRET="your-reddit-client-secret"

# DeepSeek (用于摘要生成)
export DEEPSEEK_API_KEY="your-deepseek-api-key"
```

### 方式 2: 配置文件

复制 `config.example.yaml` 为 `config.yaml`：

```bash
cp /Users/y/.claude/skills/ai-news-aggregator/config.example.yaml \
   /Users/y/.claude/skills/ai-news-aggregator/config.yaml
```

编辑 `config.yaml`：

```yaml
sources:
  rss:
    enabled: true
    hours: 24

  twitter:
    enabled: true
    api_key: "your-twitter-api-key-here"
    hours: 24

  youtube:
    enabled: true
    api_key: "your-youtube-api-key-here"
    hours: 24
    min_views: 10000

  reddit:
    enabled: true
    client_id: "your-reddit-client-id"
    client_secret: "your-reddit-client-secret"
    hours: 24
    min_upvotes: 50

llm:
  api_key: "your-deepseek-api-key-here"
  translate: true
  summarize: true
  categorize: true
  filter_by_value: true
```

---

## 🔑 API Key 安全提示

1. **永远不要**将 API Key 提交到 Git 仓库
2. 使用 `.env` 文件或环境变量存储敏感信息
3. 定期轮换 API Key
4. 为不同项目使用不同的 API Key
5. 监控 API 使用量，避免超额费用

---

## 📞 常见问题

### Twitter API

**Q: 为什么获取不到关注列表？**
A: Free 套餐不支持，需要升级到 Basic ($100/月)

**Q: API 返回 403 错误？**
A: 检查 API Key 是否正确，套餐是否激活

### YouTube API

**Q: 超出配额限制？**
A: 升级到付费套餐或优化请求频率

**Q: 视频信息不完整？**
A: 确保使用了 `snippet` 和 `statistics` 部分

### Reddit API

**Q: 401 Unauthorized 错误？**
A: 检查 client_id 和 client_secret 是否正确

**Q: 如何获取用户特定的内容？**
A: 使用 `user/{username}/submitted` 端点

---

## 📚 相关链接

- [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
- [YouTube Data API 文档](https://developers.google.com/youtube/v3)
- [Reddit API 文档](https://www.reddit.com/dev/api/)
- [Google Cloud Console](https://console.cloud.google.com/)
