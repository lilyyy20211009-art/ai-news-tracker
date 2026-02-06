#!/bin/bash

# AI News Aggregator - 每日定时任务设置脚本
# 用于在 macOS 上设置每天早上 9 点自动运行

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_PATH="/usr/bin/python3"
AGGREGATOR_PATH="$SCRIPT_DIR/scripts/run_aggregator.py"
LOG_PATH="$SCRIPT_DIR/logs/aggregator.log"

# 创建日志目录
mkdir -p "$SCRIPT_DIR/logs"

# 创建 plist 文件
PLIST_PATH="$HOME/Library/LaunchAgents/com.ainews.aggregator.plist"

cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ainews.aggregator</string>

    <key>ProgramArguments</key>
    <array>
        <string>$PYTHON_PATH</string>
        <string>$AGGREGATOR_PATH</string>
    </array>

    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>

    <key>WorkingDirectory</key>
    <string>$SCRIPT_DIR</string>

    <key>StandardOutPath</key>
    <string>$LOG_PATH</string>

    <key>StandardErrorPath</key>
    <string>$LOG_PATH</string>

    <key>RunAtLoad</key>
    <false/>

    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin</string>
    </dict>
</dict>
</plist>
EOF

echo "✅ plist 文件已创建: $PLIST_PATH"
echo ""
echo "接下来执行以下命令："
echo ""
echo "1. 加载定时任务："
echo "   launchctl load \"$PLIST_PATH\""
echo ""
echo "2. 查看任务列表："
echo "   launchctl list | grep ainews"
echo ""
echo "3. 查看日志："
echo "   tail -f $LOG_PATH"
echo ""
echo "4. 停止定时任务："
echo "   launchctl unload \"$PLIST_PATH\""
echo ""
echo "⚠️  注意：请先配置好 config.yaml 或设置环境变量后再加载任务！"
