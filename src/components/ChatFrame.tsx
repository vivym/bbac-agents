'use client'

import { type Agent } from '@/lib/agents'

interface ChatFrameProps {
  selectedAgent: Agent | null
}

export default function ChatFrame({ selectedAgent }: ChatFrameProps) {
  if (!selectedAgent) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">🤖</div>
          <p className="text-gray-500">请选择一个 Chat Agent 开始对话</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 h-screen">
      <iframe
        src={selectedAgent.url}
        className="w-full h-full border-0"
        title={selectedAgent.title}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  )
}
