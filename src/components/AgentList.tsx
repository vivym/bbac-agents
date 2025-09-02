'use client'

import { type Agent } from '@/lib/agents'

interface AgentListProps {
  agents: Agent[]
  selectedAgent: Agent | null
  onSelectAgent: (agent: Agent) => void
  onRefresh?: () => void
}

export default function AgentList({ agents, selectedAgent, onSelectAgent, onRefresh }: AgentListProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-center mb-3">
            <img 
              src="/logo.jpg" 
              alt="北京奔驰Logo" 
              className="h-32 w-auto object-contain"
            />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">北京奔驰技术维护AI工具</h2>
            <p className="text-xs text-gray-500">BBAC TSS AI Tools</p>
          </div>
        </div>
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
