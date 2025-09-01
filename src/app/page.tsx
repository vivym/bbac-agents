import { getAgents } from '@/actions/agents'
import ChatContainer from '@/components/ChatContainer'

export default async function HomePage() {
  const agents = await getAgents()

  return (
    <div className="min-h-screen bg-white">
      <ChatContainer initialAgents={agents} />
    </div>
  )
}