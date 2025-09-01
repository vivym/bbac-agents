# RAGFlow Chat Agents 集合网页

一个基于 React 19 和 Next.js 15 的 RAGFlow Chat Agents 管理界面，支持通过 iframe 嵌入多个 RAGFlow chat 实例。

## 功能特性

- 🚀 React 19 + Next.js 15 + TypeScript
- 📱 响应式左右布局设计
- 🔄 Next.js API 路由实时读取配置
- 🐳 Docker Compose 一键部署
- 📝 支持动态修改 agents.txt 配置
- ✅ TDD 开发，完整测试覆盖

## 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 构建生产版本
npm run build
```

### Docker 部署

1. **修改 agents.txt 配置**：
   ```bash
   # 编辑 agents.txt 文件，每行格式：标题 URL
   vim agents.txt
   ```

2. **启动服务**：
   ```bash
   # 构建并启动容器
   docker-compose up -d

   # 查看日志
   docker-compose logs -f
   ```

3. **访问应用**：
   - 本地访问：http://localhost:3000
   - 网络访问：http://your-server-ip:3000

## 配置说明

### agents.txt 格式

每行一个 agent 配置，格式为：`标题 URL`

```
RAGFlow Chat Agent 1 https://ragflow.example.com/agent1
RAGFlow Chat Agent 2 https://ragflow.example.com/agent2
RAGFlow Chat Agent 3 https://ragflow.example.com/agent3
```

### 动态修改配置

在 Docker 环境中，你可以直接修改本地的 `agents.txt` 文件，网页会自动读取最新配置：

```bash
# 修改配置
vim agents.txt

# 刷新网页或点击刷新按钮即可看到更改
# 无需重启容器
```

## 项目结构

```
├── src/
│   ├── app/api/agents/        # API 路由读取配置
│   ├── components/            # React 组件
│   │   ├── AgentList.tsx      # 左侧 agent 列表
│   │   ├── ChatFrame.tsx      # 右侧 iframe
│   │   └── ChatContainer.tsx  # 主容器
│   ├── lib/agents.ts          # 配置解析逻辑
│   └── app/page.tsx           # 首页
├── __tests__/                 # 测试文件
├── agents.txt                 # agent 配置文件
├── docker-compose.yml         # Docker 部署配置
├── Dockerfile                 # Docker 镜像构建
└── next.config.js             # Next.js 配置
```

## 开发说明

### TDD 开发流程

项目严格遵循 TDD（测试驱动开发）流程：

1. **红**：先写失败的测试
2. **绿**：实现功能使测试通过
3. **重构**：优化代码结构

### 测试

```bash
# 运行所有测试
npm test

# 监听模式运行测试
npm run test:watch
```

### 代码质量

```bash
# 代码检查
npm run lint

# 构建检查
npm run build
```

## 部署说明

### 生产环境优化

- 使用 Next.js standalone 输出模式
- 多阶段 Docker 构建优化镜像大小
- 健康检查确保服务可用性
- 自动重启策略

### 安全配置

- iframe 沙箱安全策略
- 文件系统权限控制
- 环境变量隔离

## 故障排除

### 常见问题

1. **agents.txt 文件不存在**：
   ```bash
   # 创建默认配置文件
   echo "RAGFlow Chat Agent 1 https://ragflow.example.com/agent1" > agents.txt
   ```

2. **容器无法启动**：
   ```bash
   # 查看详细日志
   docker-compose logs bbac-agents
   ```

3. **配置不生效**：
   ```bash
   # 重启容器
   docker-compose restart bbac-agents
   ```

## 许可证

MIT License