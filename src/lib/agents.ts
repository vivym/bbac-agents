export interface Agent {
  title: string
  url: string
}

export function parseAgents(textContent: string): Agent[] {
  if (!textContent.trim()) {
    return []
  }

  return textContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      // 找到最后一个空格的位置，前面是标题，后面是URL
      const lastSpaceIndex = line.lastIndexOf(' ')
      if (lastSpaceIndex === -1) {
        return null
      }

      const title = line.substring(0, lastSpaceIndex).trimEnd()
      const url = line.substring(lastSpaceIndex + 1)

      return { title, url }
    })
    .filter((agent): agent is Agent => agent !== null)
}
