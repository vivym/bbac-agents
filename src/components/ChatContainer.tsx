'use client'

import { useState, useEffect } from 'react'
import { type Agent } from '@/lib/agents'
import AgentList from './AgentList'
import ChatFrame from './ChatFrame'

export default function ChatContainer() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAgents = async () => {
    try {
      setLoading(true)
      setError(null)

      // 添加时间戳参数防止缓存
      const response = await fetch(`/api/agents?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setAgents(data)

      // 如果还没有选中agent且数据不为空，选中第一个
      if (!selectedAgent && data.length > 0) {
        setSelectedAgent(data[0])
      }
    } catch (err) {
      console.error('Error fetching agents:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch agents')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAgents()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">⏳</div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">❌</div>
          <p className="text-red-500 mb-4">加载失败: {error}</p>
          <button
            onClick={fetchAgents}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <AgentList
        agents={agents}
        selectedAgent={selectedAgent}
        onSelectAgent={setSelectedAgent}
        onRefresh={fetchAgents}
      />
      <ChatFrame selectedAgent={selectedAgent} />
    </div>
  )
}
