'use client'

import { useState } from 'react'
import { type Agent } from '@/lib/agents'
import AgentList from './AgentList'
import ChatFrame from './ChatFrame'

interface ChatContainerProps {
  initialAgents: Agent[]
}

export default function ChatContainer({ initialAgents }: ChatContainerProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(
    initialAgents.length > 0 ? initialAgents[0] : null
  )

  return (
    <div className="flex h-screen">
      <AgentList
        agents={initialAgents}
        selectedAgent={selectedAgent}
        onSelectAgent={setSelectedAgent}
      />
      <ChatFrame selectedAgent={selectedAgent} />
    </div>
  )
}
