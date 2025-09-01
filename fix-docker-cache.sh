#!/bin/bash

echo "🔧 修复 Docker 缓存问题"
echo "======================"

echo "1. 停止现有容器..."
docker-compose down

echo "2. 清理 Docker 缓存..."
docker system prune -f

echo "3. 重新构建并启动容器..."
docker-compose up -d --build

echo "4. 等待服务启动..."
sleep 10

echo "5. 检查服务状态..."
docker-compose ps

echo "6. 查看日志..."
docker-compose logs --tail=10 bbac-agents

echo ""
echo "✅ 修复完成！"
echo "🌐 访问 http://localhost:17180 测试"
echo "📝 修改 agents.txt 后刷新页面查看效果"
