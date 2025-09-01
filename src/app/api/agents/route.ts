import { NextResponse } from 'next/server'
import { readFile, stat } from 'fs/promises'
import { join } from 'path'
import { parseAgents } from '@/lib/agents'

export async function GET() {
  try {
    // 在Docker环境中，agents.txt挂载到 /app/data/agents.txt
    // 在开发环境中，使用项目根目录的 agents.txt
    const isDocker = process.env.NODE_ENV === 'production' && process.env.DOCKER === 'true'
    const filePath = isDocker
      ? '/app/data/agents.txt'
      : join(process.cwd(), 'agents.txt')

    console.log('API Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      DOCKER: process.env.DOCKER,
      isDocker,
      filePath
    })

    // 获取文件状态信息
    const fileStats = await stat(filePath)
    console.log('File stats:', {
      size: fileStats.size,
      mtime: fileStats.mtime,
      ctime: fileStats.ctime
    })

    const fileContent = await readFile(filePath, 'utf-8')
    console.log('File content length:', fileContent.length)
    console.log('File content preview:', fileContent.substring(0, 200))

    const agents = parseAgents(fileContent)
    console.log('Parsed agents:', agents)

    // 设置缓存控制头，禁用缓存
    const response = NextResponse.json(agents)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')

    return response
  } catch (error) {
    console.error('Error reading agents.txt:', error)
    return NextResponse.json([], { status: 500 })
  }
}
