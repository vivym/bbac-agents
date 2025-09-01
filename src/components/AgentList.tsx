'use client'

import { type Agent } from '@/lib/agents'

interface AgentListProps {
  agents: Agent[]
  selectedAgent: Agent | null
  onSelectAgent: (agent: Agent) => void
}

export default function AgentList({ agents, selectedAgent, onSelectAgent }: AgentListProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Chat Agents</h2>
        <div className="space-y-2">
          {agents.map((agent, index) => (
            <button
              key={index}
              onClick={() => onSelectAgent(agent)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAgent?.url === agent.url
                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{agent.title}</div>
              <div className="text-sm text-gray-500 truncate">{agent.url}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
