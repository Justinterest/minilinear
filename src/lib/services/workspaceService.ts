import { supabase } from '@/lib/supabase'
import { IssueService } from './issueService'
import { IssueStatus } from '@/types/database'
import { useUserStore } from '../store/userStore'

export interface Workspace {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

const onboardingIssues = [
  {
    title: '欢迎来到 MiniLinear 👋',
    description: '这是一个引导任务，帮助你熟悉我们的平台。',
    status: 'in_progress' as IssueStatus,
  },
  {
    title: '导航方式：命令菜单、键盘或鼠标',
    description: '通过键盘快捷键 (Cmd+K) 或界面操作来探索不同功能。',
  },
  { title: '连接 Slack' },
  { title: '连接 GitHub 或 GitLab' },
  { title: '自定义设置' },
  { title: '使用周期 (Cycles) 来专注工作' },
  { title: '使用项目 (Projects) 来组织功能或发布' },
  { title: '邀请你的团队成员' },
  { title: '后续步骤' },
]

export class WorkspaceService {
  static async getUserWorkspaces(): Promise<Workspace[]> {
    const user = useUserStore.getState().user
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select()
      
      if (error) throw error

      // 转换数据格式
      const workspaces: Workspace[] = []
      if (data) {
        for (const item of data) {
          workspaces.push(item as unknown as Workspace)
        }
      }
      
      return workspaces
    } catch (error) {
      console.error('Error fetching user workspaces:', error)
      return []
    }
  }

  static async createWorkspace(workspace: {
    name: string
    slug: string
    description?: string
    userId: string
  }): Promise<Workspace | null> {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .insert({
          name: workspace.name,
          slug: workspace.slug,
          description: workspace.description,
          created_by: workspace.userId
        })
        .select()
        .single()

      if (error) throw error

      return data as unknown as Workspace
    } catch (error) {
      console.error('Error creating workspace:', error)
      return null
    }
  }

  static async setupDefaultWorkspace(
    userId: string,
    userName?: string
  ): Promise<Workspace> {
    const workspaceName = userName ? `${userName}的工作区` : '我的第一个工作区'
    const slug = `${userName?.toLowerCase().replace(/\s/g, '-') || 'my'}-workspace`

    // 1. 创建工作空间
    const newWorkspace = await this.createWorkspace({
      name: workspaceName,
      slug,
      userId,
    })

    if (!newWorkspace) {
      throw new Error('创建默认工作空间失败')
    }

    // 2. 创建引导问题
    await IssueService.createIssues(onboardingIssues, newWorkspace.id)

    return newWorkspace
  }
} 