#!/bin/bash
cd /Users/y/.claude/skills/ai-news-aggregator
nohup python3 scripts/web_server.py > /tmp/web-server.log 2>&1 &
echo "Web 服务器已在后台启动"
echo "访问地址: http://127.0.0.1:5000"
