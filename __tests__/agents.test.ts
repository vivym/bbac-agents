import { parseAgents } from '../src/lib/agents'

describe('parseAgents', () => {
  it('should parse agents from text content', () => {
    const textContent = `Agent 1 https://example.com/agent1
Agent 2 https://example.com/agent2
Agent 3 https://example.com/agent3`

    const result = parseAgents(textContent)

    expect(result).toEqual([
      { title: 'Agent 1', url: 'https://example.com/agent1' },
      { title: 'Agent 2', url: 'https://example.com/agent2' },
      { title: 'Agent 3', url: 'https://example.com/agent3' }
    ])
  })

  it('should handle empty content', () => {
    const result = parseAgents('')
    expect(result).toEqual([])
  })

  it('should handle content with only whitespace', () => {
    const result = parseAgents('   \n  \t  ')
    expect(result).toEqual([])
  })

  it('should handle single line', () => {
    const result = parseAgents('Single Agent https://example.com/single')
    expect(result).toEqual([
      { title: 'Single Agent', url: 'https://example.com/single' }
    ])
  })

  it('should handle lines with multiple spaces', () => {
    const textContent = `Agent   With   Spaces    https://example.com/spaces`
    const result = parseAgents(textContent)
    expect(result).toEqual([
      { title: 'Agent   With   Spaces', url: 'https://example.com/spaces' }
    ])
  })

  it('should skip empty lines', () => {
    const textContent = `Agent 1 https://example.com/agent1

Agent 2 https://example.com/agent2

`
    const result = parseAgents(textContent)
    expect(result).toEqual([
      { title: 'Agent 1', url: 'https://example.com/agent1' },
      { title: 'Agent 2', url: 'https://example.com/agent2' }
    ])
  })
})
