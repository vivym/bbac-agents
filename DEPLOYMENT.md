# Docker 部署指南

## 快速部署

### 1. 环境准备

确保已安装：
- Docker
- Docker Compose

### 2. 一键部署

```bash
# 运行部署脚本
./deploy.sh
```

### 3. 手动部署

```bash
# 1. 编辑 agents.txt 配置文件
vim agents.txt

# 2. 构建并启动容器
docker-compose up -d --build

# 3. 查看服务状态
docker-compose ps

# 4. 查看日志
docker-compose logs -f
```

## 配置管理

### agents.txt 格式

每行一个 agent 配置：
```
Agent名称 https://ragflow.example.com/agent1
另一个Agent https://ragflow.example.com/agent2
```

### 动态更新配置

```bash
# 修改配置文件
vim agents.txt

# 重启容器应用更改
docker-compose restart
```

## 常用命令

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看日志
docker-compose logs -f

# 查看服务状态
docker-compose ps

# 进入容器
docker-compose exec bbac-agents sh

# 重新构建
docker-compose up -d --build
```

## 故障排除

### 1. 端口冲突

如果3000端口被占用，修改 `docker-compose.yml`：

```yaml
ports:
  - "8080:3000"  # 改为其他端口
```

### 2. 文件权限问题

```bash
# 确保 agents.txt 有读取权限
chmod 644 agents.txt
```

### 3. 容器无法启动

```bash
# 查看详细错误日志
docker-compose logs bbac-agents

# 检查配置文件格式
cat agents.txt
```

### 4. 配置不生效

```bash
# 检查文件挂载
docker-compose exec bbac-agents ls -la /app/data/

# 重启容器
docker-compose restart
```

## 生产环境建议

### 1. 使用环境变量

创建 `.env` 文件：
```bash
PORT=3000
NODE_ENV=production
```

### 2. 反向代理

使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. SSL 证书

使用 Let's Encrypt 或自签名证书：

```bash
# 使用 certbot
certbot --nginx -d your-domain.com
```

### 4. 数据备份

```bash
# 备份配置文件
cp agents.txt agents.txt.backup

# 定期备份
crontab -e
# 添加：0 2 * * * cp /path/to/agents.txt /path/to/backup/agents-$(date +\%Y\%m\%d).txt
```

## 监控和维护

### 1. 健康检查

容器内置健康检查，每30秒检查一次服务状态。

### 2. 日志管理

```bash
# 限制日志大小
docker-compose logs --tail=100 bbac-agents

# 清理旧日志
docker system prune -f
```

### 3. 更新应用

```bash
# 拉取最新代码
git pull

# 重新构建并部署
docker-compose up -d --build
```
