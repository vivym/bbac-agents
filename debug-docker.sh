#!/bin/bash

echo "🔍 Docker 调试脚本"
echo "=================="

# 检查容器是否运行
echo "1. 检查容器状态："
docker-compose ps

echo ""
echo "2. 检查 agents.txt 文件挂载："
docker-compose exec bbac-agents ls -la /app/data/

echo ""
echo "3. 检查容器内的 agents.txt 内容："
docker-compose exec bbac-agents cat /app/data/agents.txt

echo ""
echo "4. 检查本地 agents.txt 内容："
cat agents.txt

echo ""
echo "5. 检查容器日志（最近20行）："
docker-compose logs --tail=20 bbac-agents

echo ""
echo "6. 测试文件修改时间："
echo "本地文件修改时间："
ls -la agents.txt
echo "容器内文件修改时间："
docker-compose exec bbac-agents ls -la /app/data/agents.txt

echo ""
echo "7. 手动测试文件读取："
docker-compose exec bbac-agents node -e "
const fs = require('fs');
try {
  const content = fs.readFileSync('/app/data/agents.txt', 'utf-8');
  console.log('文件内容长度:', content.length);
  console.log('文件内容:', content);
} catch (error) {
  console.error('读取文件失败:', error.message);
}
"
