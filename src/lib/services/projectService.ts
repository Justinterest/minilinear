import { supabase } from '../supabase'
import type { Database, ProjectWithWorkspace } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export class ProjectService {
  // 获取工作空间的项目列表
  static async getWorkspaceProjects(workspaceId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // 获取项目详情
  static async getProject(projectId: string): Promise<ProjectWithWorkspace | null> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        workspaces (
          id, name, slug
        )
      `)
      .eq('id', projectId)
      .single()

    if (error) throw error
    return data as ProjectWithWorkspace
  }

  // 根据slug获取项目
  static async getProjectBySlug(workspaceId: string, slug: string): Promise<ProjectWithWorkspace | null> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        workspaces (
          id, name, slug
        )
      `)
      .eq('workspace_id', workspaceId)
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data as ProjectWithWorkspace
  }

  // 创建项目
  static async createProject(project: Omit<ProjectInsert, 'created_by'>): Promise<Project> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('未认证用户')

    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...project,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 更新项目
  static async updateProject(projectId: string, updates: ProjectUpdate): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 删除项目
  static async deleteProject(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) throw error
  }

  // 获取项目统计信息
  static async getProjectStats(projectId: string): Promise<{
    issueCount: number
    completedIssues: number
    activeIssues: number
  }> {
    const { data, error } = await supabase
      .from('issues')
      .select('status')
      .eq('project_id', projectId)

    if (error) throw error

    const stats = {
      issueCount: data?.length || 0,
      completedIssues: data?.filter(issue => issue.status === 'done').length || 0,
      activeIssues: data?.filter(issue => issue.status === 'in_progress').length || 0
    }

    return stats
  }
} 