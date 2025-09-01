import ChatContainer from '@/components/ChatContainer'

// 强制动态渲染，禁用静态生成
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <ChatContainer />
    </div>
  )
}