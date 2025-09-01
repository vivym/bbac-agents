'use server'

import { readFile } from 'fs/promises'
import { join } from 'path'
import { parseAgents, type Agent } from '@/lib/agents'

export async function getAgents(): Promise<Agent[]> {
  try {
    // 每次请求都重新读取文件，不使用缓存
    const filePath = join(process.cwd(), 'agents.txt')
    const fileContent = await readFile(filePath, 'utf-8')
    return parseAgents(fileContent)
  } catch (error) {
    console.error('Error reading agents.txt:', error)
    return []
  }
}
