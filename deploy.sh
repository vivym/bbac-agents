#!/bin/bash

# RAGFlow Chat Agents 部署脚本

set -e

echo "🚀 RAGFlow Chat Agents 部署脚本"
echo "================================"

# 检查 Docker 和 Docker Compose 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 检查 agents.txt 文件是否存在
if [ ! -f "agents.txt" ]; then
    echo "📝 创建默认 agents.txt 配置文件..."
    cat > agents.txt << EOF
RAGFlow Chat Agent 1 https://ragflow.example.com/agent1
RAGFlow Chat Agent 2 https://ragflow.example.com/agent2
RAGFlow Chat Agent 3 https://ragflow.example.com/agent3
EOF
    echo "✅ 已创建默认配置文件，请编辑 agents.txt 添加你的 RAGFlow chat URLs"
fi

# 显示当前配置
echo "📋 当前 agents.txt 配置："
echo "------------------------"
cat agents.txt
echo "------------------------"

# 询问是否继续部署
read -p "是否继续部署？(y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 部署已取消"
    exit 0
fi

# 停止现有容器
echo "🛑 停止现有容器..."
docker-compose down

# 构建并启动新容器
echo "🔨 构建并启动容器..."
docker-compose up -d --build

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
if docker-compose ps | grep -q "Up"; then
    echo "✅ 服务启动成功！"
    echo "🌐 访问地址：http://localhost:3000"
    echo "📊 查看日志：docker-compose logs -f"
    echo "🛑 停止服务：docker-compose down"
else
    echo "❌ 服务启动失败，请查看日志："
    docker-compose logs
    exit 1
fi

echo ""
echo "🎉 部署完成！"
echo "💡 提示：修改 agents.txt 后运行 'docker-compose restart' 应用更改"
