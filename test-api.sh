#!/bin/bash

echo "🧪 测试 API 路由版本"
echo "==================="

echo "1. 测试开发环境 API..."
curl -s "http://localhost:3000/api/agents" | jq '.' || echo "开发服务器未运行"

echo ""
echo "2. 测试 Docker 环境 API..."
curl -s "http://localhost:17180/api/agents" | jq '.' || echo "Docker 容器未运行"

echo ""
echo "3. 检查 agents.txt 文件..."
echo "本地文件内容："
cat agents.txt

echo ""
echo "4. 测试文件修改..."
echo "测试Agent https://test.example.com" >> agents.txt
echo "添加测试条目后的文件内容："
cat agents.txt

echo ""
echo "5. 再次测试 API..."
curl -s "http://localhost:3000/api/agents" | jq '.' || echo "开发服务器未运行"
curl -s "http://localhost:17180/api/agents" | jq '.' || echo "Docker 容器未运行"

echo ""
echo "6. 清理测试数据..."
sed -i '' '/测试Agent/d' agents.txt
echo "清理后的文件内容："
cat agents.txt
