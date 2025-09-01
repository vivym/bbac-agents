#!/bin/bash

# 健康检查脚本

URL="http://localhost:3000"
MAX_ATTEMPTS=30
ATTEMPT=1

echo "🔍 检查服务健康状态..."

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    if curl -s -f "$URL" > /dev/null 2>&1; then
        echo "✅ 服务健康检查通过！"
        echo "🌐 访问地址：$URL"
        exit 0
    else
        echo "⏳ 尝试 $ATTEMPT/$MAX_ATTEMPTS - 服务尚未就绪，等待中..."
        sleep 2
        ATTEMPT=$((ATTEMPT + 1))
    fi
done

echo "❌ 健康检查失败，服务在 $MAX_ATTEMPTS 次尝试后仍未就绪"
echo "📊 请查看日志：docker-compose logs bbac-agents"
exit 1
