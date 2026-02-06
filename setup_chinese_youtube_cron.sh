#!/bin/bash

# AI 内容情报监测员 - 定时任务设置脚本
# 用于在 macOS 上设置每 12 小时自动运行

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_PATH="/usr/bin/python3"
MONITOR_PATH="$SCRIPT_DIR/scripts/run_chinese_youtube_monitor.py"
LOG_PATH="$SCRIPT_DIR/logs/chinese_youtube_monitor.log"

# 创建日志目录
mkdir -p "$SCRIPT_DIR/logs"

# 创建 plist 文件
PLIST_PATH="$HOME/Library/LaunchAgents/com.ainews.chinese.youtube.plist"

cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ainews.chinese.youtube</string>

    <key>ProgramArguments</key>
    <array>
        <string>$PYTHON_PATH</string>
        <string>$MONITOR_PATH</string>
    </array>

    <!-- 每 12 小时运行一次（43200 秒） -->
    <key>StartInterval</key>
    <integer>43200</integer>

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
echo "   launchctl bootstrap gui/\$(id -u) \"$PLIST_PATH\""
echo ""
echo "2. 查看任务列表："
echo "   launchctl list | grep chinese"
echo ""
echo "3. 查看日志："
echo "   tail -f $LOG_PATH"
echo ""
echo "4. 停止定时任务："
echo "   launchctl bootout gui/\$(id -u)/com.ainews.chinese.youtube"
echo ""
echo "⚠️  注意："
echo "   1. 请先在 config.yaml 中配置 youtube_chinese.api_key"
echo "   2. 请先设置 youtube_chinese.enabled: true"
echo "   3. YouTube API Key 获取方式：https://console.cloud.google.com/apis/credentials"
