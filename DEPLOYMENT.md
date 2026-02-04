# AI 热点追踪 - 部署指南

本文档介绍如何将 AI 热点追踪网站部署到公网，让其他人也能访问。

## 🚀 部署方案对比

| 方案 | 难度 | 费用 | 优点 | 缺点 |
|------|------|------|------|------|
| **Railway** | ⭐ 简单 | $5/月起 | 自动部署、自动 HTTPS | 免费额度有限 |
| **Render** | ⭐ 简单 | $7/月起 | 简单易用、自动部署 | 免费版会休眠 |
| **Fly.io** | ⭐⭐ 中等 | 免费额度大 | 全球部署、性能好 | 配置稍复杂 |
| **云服务器** | ⭐⭐⭐ 复杂 | ¥30/月起 | 完全控制、稳定 | 需要运维 |
| **内网穿透** | ⭐ 简单 | 免费 | 本地开发用 | 不适合生产 |

---

## 方案一：Railway 部署（推荐新手）

### 步骤：

1. **准备代码**
   ```bash
   cd /Users/y/.claude/skills/ai-news-aggregator

   # 初始化 Git（如果还没有）
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到 GitHub**
   ```bash
   # 在 GitHub 创建新仓库后
   git remote add origin https://github.com/你的用户名/ai-news-tracker.git
   git branch -M main
   git push -u origin main
   ```

3. **部署到 Railway**
   - 访问 https://railway.app
   - 用 GitHub 账号登录
   - 点击 "New Project" → "Deploy from GitHub repo"
   - 选择你的仓库
   - Railway 会自动检测 Dockerfile 并开始部署
   - 部署完成后，会获得一个 `xxx.railway.app` 的域名

4. **设置环境变量**（可选）
   - 在 Railway 项目设置中添加：
     ```
     DEEPSEEK_API_KEY=你的密钥（如果有的话）
     ```

5. **完成！**
   - 访问分配的域名即可看到网站

---

## 方案二：Render 部署

### 步骤：

1. **创建 `render.yaml` 配置文件**

在项目根目录创建 `render.yaml`：

```yaml
services:
  - type: web
    name: ai-news-tracker
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python3 scripts/web_server.py
    envVars:
      - key: PORT
        value: 5000
      - key: DEEPSEEK_API_KEY
        sync: false
```

2. **部署**
   - 访问 https://render.com
   - 用 GitHub 账号登录
   - 点击 "New +" → "Web Service"
   - 连接你的 GitHub 仓库
   - 选择分支（main）
   - Render 会自动读取 `render.yaml` 配置
   - 点击 "Create Web Service"
   - 等待部署完成（约 2-5 分钟）

3. **完成！**
   - 会获得 `xxx.onrender.com` 域名

---

## 方案三：Fly.io 部署（推荐，免费额度大）

### 步骤：

1. **安装 Fly CLI**
   ```bash
   brew install flyctl
   ```

2. **登录**
   ```bash
   flyctl auth signup
   flyctl auth login
   ```

3. **部署**
   ```bash
   cd /Users/y/.claude/skills/ai-news-aggregator
   flyctl launch
   ```

   按提示操作：
   - 选择创建新应用
   - 选择区域（推荐选择离你最近的）
   - 会自动生成 `fly.toml` 配置文件

4. **设置环境变量**（可选）
   ```bash
   flyctl secrets set DEEPSEEK_API_KEY=你的密钥
   ```

5. **发布**
   ```bash
   flyctl deploy
   ```

6. **完成！**
   - 会获得 `xxx.fly.dev` 域名

---

## 方案四：云服务器部署（阿里云/腾讯云）

### 适合：需要长期稳定运行

### 步骤：

1. **购买服务器**
   - 阿里云 ECS / 腾讯云轻量服务器
   - 选择：1核2G，带宽1M，约 ¥30-50/月

2. **连接服务器**
   ```bash
   ssh root@服务器IP
   ```

3. **安装环境**
   ```bash
   # 安装 Python
   apt update && apt install -y python3 python3-pip git

   # 克隆代码
   cd /opt
   git clone https://github.com/你的用户名/ai-news-tracker.git
   cd ai-news-tracker

   # 安装依赖
   pip3 install -r requirements.txt
   ```

4. **使用 Supervisor 守护进程**
   ```bash
   # 安装 Supervisor
   apt install -y supervisor

   # 创建配置
   cat > /etc/supervisor/conf.d/ai-news.conf << EOF
   [program:ai-news-web]
   command=/usr/bin/python3 /opt/ai-news-tracker/scripts/web_server.py
   directory=/opt/ai-news-tracker
   autostart=true
   autorestart=true
   stderr_logfile=/var/log/ai-news.err.log
   stdout_logfile=/var/log/ai-news.out.log
   EOF

   # 启动
   supervisorctl reread
   supervisorctl update
   supervisorctl start ai-news-web
   ```

5. **配置 Nginx 反向代理**
   ```bash
   apt install -y nginx

   cat > /etc/nginx/sites-available/ai-news << EOF
   server {
       listen 80;
       server_name 你的域名或IP;

       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host \$host;
           proxy_set_header X-Real-IP \$remote_addr;
       }
   }
   EOF

   ln -s /etc/nginx/sites-available/ai-news /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

6. **完成！**
   - 访问 `http://你的服务器IP`

---

## 方案五：内网穿透（临时展示）

### 适合：快速给朋友看，不想买服务器

### 使用 frp（免费）

1. **下载 frp**
   ```bash
   # 下载适合你系统的版本
   wget https://github.com/fatedier/frp/releases/download/v0.52.0/frp_0.52.0_darwin_amd64.tar.gz
   tar -xzf frp_0.52.0_darwin_amd64.tar.gz
   cd frp_0.52.0_darwin_amd64
   ```

2. **使用免费 frp 服务器**
   - 找一个免费的 frp 服务器，或者自己搭建
   - 配置 `frpc.ini`：
   ```ini
   [common]
   server_addr = 免费frp服务器地址
   server_port = 7000

   [web]
   type = http
   local_port = 5000
   custom_domains = 你的域名.免费frp域名
   ```

3. **启动**
   ```bash
   # 先启动本地服务
   python3 scripts/web_server.py

   # 另一个终端启动 frp
   ./frpc -c frpc.ini
   ```

---

## 💡 推荐选择

- **新手/快速展示** → Railway 或 Render
- **长期免费使用** → Fly.io
- **生产环境/公司使用** → 阿里云/腾讯云
- **临时演示** → 内网穿透

## 🔒 安全建议

1. 不要在代码中硬编码 API Key
2. 使用环境变量存储敏感信息
3. 定期更新依赖包
4. 配置 HTTPS（云平台通常自动配置）

## 📊 监控和日志

- **Railway/Render**：内置日志查看
- **Fly.io**：`flyctl logs`
- **云服务器**：查看 `/var/log/ai-news.out.log`

---

需要我帮你部署到哪个平台？
