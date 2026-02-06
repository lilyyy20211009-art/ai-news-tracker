#!/bin/bash
# AI News Aggregator 每日自动更新脚本

# 设置项目路径
PROJECT_DIR="/Users/y/.claude/skills/ai-news-aggregator"
cd "$PROJECT_DIR" || exit 1

# 记录日志
LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/daily_update_$(date +%Y%m%d_%H%M%S).log"

echo "============================================================" | tee -a "$LOG_FILE"
echo "AI News Aggregator 每日更新" | tee -a "$LOG_FILE"
echo "开始时间: $(date '+%Y-%m-%d %H:%M:%S')" | tee -a "$LOG_FILE"
echo "============================================================" | tee -a "$LOG_FILE"

# 步骤1: 运行聚合脚本
echo "" | tee -a "$LOG_FILE"
echo "📡 步骤1: 聚合新闻数据..." | tee -a "$LOG_FILE"
python3 scripts/run_aggregator.py >> "$LOG_FILE" 2>&1
if [ $? -eq 0 ]; then
    echo "✅ 数据聚合完成" | tee -a "$LOG_FILE"
else
    echo "❌ 数据聚合失败" | tee -a "$LOG_FILE"
    exit 1
fi

# 步骤2: 更新摘要
echo "" | tee -a "$LOG_FILE"
echo "📝 步骤2: 更新摘要..." | tee -a "$LOG_FILE"
python3 scripts/update_summary.py >> "$LOG_FILE" 2>&1
if [ $? -eq 0 ]; then
    echo "✅ 摘要更新完成" | tee -a "$LOG_FILE"
else
    echo "❌ 摘要更新失败" | tee -a "$LOG_FILE"
    exit 1
fi

# 步骤3: 推送到 GitHub
echo "" | tee -a "$LOG_FILE"
echo "🚀 步骤3: 推送到 GitHub..." | tee -a "$LOG_FILE"
git add -A >> "$LOG_FILE" 2>&1
git commit -m "自动更新 AI 热点摘要 - $(date '+%Y-%m-%d %H:%M')" >> "$LOG_FILE" 2>&1
git push >> "$LOG_FILE" 2>&1
if [ $? -eq 0 ]; then
    echo "✅ GitHub 推送完成" | tee -a "$LOG_FILE"
else
    echo "❌ GitHub 推送失败" | tee -a "$LOG_FILE"
    exit 1
fi

echo "" | tee -a "$LOG_FILE"
echo "============================================================" | tee -a "$LOG_FILE"
echo "✅ 全部完成! 结束时间: $(date '+%Y-%m-%d %H:%M:%S')" | tee -a "$LOG_FILE"
echo "============================================================" | tee -a "$LOG_FILE"

# 清理7天前的日志
find "$LOG_DIR" -name "daily_update_*.log" -mtime +7 -delete
