import { supabase } from '../supabase'
import type { Database, IssueWithRelations } from '@/types/database'

type Issue = Database['public']['Tables']['issues']['Row']
type IssueInsert = Database['public']['Tables']['issues']['Insert']
type IssueUpdate = Database['public']['Tables']['issues']['Update']
type IssueStatus = Database['public']['Enums']['issue_status']
type IssuePriority = Database['public']['Enums']['issue_priority']

export interface IssueFilters {
  status?: IssueStatus[]
  priority?: IssuePriority[]
  assignee?: string[]
  project?: string[]
  search?: string
}

export class IssueService {
  // 获取工作空间的问题列表
  static async getWorkspaceIssues(
    workspaceId: string, 
    filters?: IssueFilters,
    limit?: number,
    offset?: number
  ): Promise<IssueWithRelations[]> {
    let query = supabase
      .from('issues')
      .select(`
        *,
        assignee:user_profiles!assignee_id (
          id, full_name, avatar_url
        ),
        reporter:user_profiles!reporter_id (
          id, full_name, avatar_url
        )
      `)
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false })

    // 应用过滤器
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        query = query.in('status', filters.status)
      }
      if (filters.priority && filters.priority.length > 0) {
        query = query.in('priority', filters.priority)
      }
      if (filters.assignee && filters.assignee.length > 0) {
        query = query.in('assignee_id', filters.assignee)
      }
      if (filters.project && filters.project.length > 0) {
        query = query.in('project_id', filters.project)
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }
    }

    if (limit) {
      query = query.limit(limit)
    }
    if (offset) {
      query = query.range(offset, offset + (limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data as IssueWithRelations[]
  }

  // 获取项目的问题列表
  static async getProjectIssues(projectId: string, filters?: IssueFilters): Promise<IssueWithRelations[]> {
    let query = supabase
      .from('issues')
      .select(`
        *,
        projects (
          id, name, slug, color, icon
        ),
        workspaces (
          id, name, slug
        ),
        assignee:user_profiles!assignee_id (
          id, full_name, avatar_url
        ),
        reporter:user_profiles!reporter_id (
          id, full_name, avatar_url
        ),
        issue_labels:issue_label_relations (
          issue_labels (
            id, name, color
          )
        )
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    // 应用过滤器
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        query = query.in('status', filters.status)
      }
      if (filters.priority && filters.priority.length > 0) {
        query = query.in('priority', filters.priority)
      }
      if (filters.assignee && filters.assignee.length > 0) {
        query = query.in('assignee_id', filters.assignee)
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }
    }

    const { data, error } = await query

    if (error) throw error
    return data as IssueWithRelations[]
  }

  // 获取问题详情
  static async getIssue(issueId: string): Promise<IssueWithRelations | null> {
    const { data, error } = await supabase
      .from('issues')
      .select(`
        *,
        projects (
          id, name, slug, color, icon
        ),
        workspaces (
          id, name, slug
        ),
        assignee:user_profiles!assignee_id (
          id, full_name, avatar_url
        ),
        reporter:user_profiles!reporter_id (
          id, full_name, avatar_url
        ),
        issue_labels:issue_label_relations (
          issue_labels (
            id, name, color
          )
        )
      `)
      .eq('id', issueId)
      .single()

    if (error) throw error
    return data as IssueWithRelations
  }

  // 根据标识符获取问题
  static async getIssueByIdentifier(workspaceId: string, identifier: string): Promise<IssueWithRelations | null> {
    const { data, error } = await supabase
      .from('issues')
      .select(`
        *,
        projects (
          id, name, slug, color, icon
        ),
        workspaces (
          id, name, slug
        ),
        assignee:user_profiles!assignee_id (
          id, full_name, avatar_url
        ),
        reporter:user_profiles!reporter_id (
          id, full_name, avatar_url
        ),
        issue_labels:issue_label_relations (
          issue_labels (
            id, name, color
          )
        )
      `)
      .eq('workspace_id', workspaceId)
      .eq('identifier', identifier)
      .single()

    if (error) throw error
    return data as IssueWithRelations
  }

  // 创建问题
  static async createIssue(issue: Omit<IssueInsert, 'reporter_id'>): Promise<Issue> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('未认证用户')

    const { data, error } = await supabase
      .from('issues')
      .insert({
        ...issue,
        reporter_id: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 更新问题
  static async updateIssue(issueId: string, updates: IssueUpdate): Promise<Issue> {
    const { data, error } = await supabase
      .from('issues')
      .update(updates)
      .eq('id', issueId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 删除问题
  static async deleteIssue(issueId: string): Promise<void> {
    const { error } = await supabase
      .from('issues')
      .delete()
      .eq('id', issueId)

    if (error) throw error
  }

  // 分配问题
  static async assignIssue(issueId: string, assigneeId: string | null): Promise<Issue> {
    const { data, error } = await supabase
      .from('issues')
      .update({ assignee_id: assigneeId })
      .eq('id', issueId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 更新问题状态
  static async updateIssueStatus(issueId: string, status: IssueStatus): Promise<Issue> {
    const updates: IssueUpdate = { status }
    
    // 如果状态是完成，设置完成时间
    if (status === 'done') {
      updates.completed_at = new Date().toISOString()
    } else {
      updates.completed_at = null
    }

    const { data, error } = await supabase
      .from('issues')
      .update(updates)
      .eq('id', issueId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 获取问题评论
  static async getIssueComments(issueId: string): Promise<Database['public']['Tables']['issue_comments']['Row'][]> {
    const { data, error } = await supabase
      .from('issue_comments')
      .select(`
        *,
        user_profiles (
          id, full_name, avatar_url
        )
      `)
      .eq('issue_id', issueId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  }

  // 添加问题评论
  static async addComment(issueId: string, content: string): Promise<Database['public']['Tables']['issue_comments']['Row']> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('未认证用户')

    const { data, error } = await supabase
      .from('issue_comments')
      .insert({
        issue_id: issueId,
        user_id: user.id,
        content
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 获取工作空间的问题统计
  static async getWorkspaceIssueStats(workspaceId: string): Promise<{
    total: number
    byStatus: Record<IssueStatus, number>
    byPriority: Record<IssuePriority, number>
  }> {
    const { data, error } = await supabase
      .from('issues')
      .select('status, priority')
      .eq('workspace_id', workspaceId)

    if (error) throw error

    const stats = {
      total: data?.length || 0,
      byStatus: {
        todo: 0,
        in_progress: 0,
        done: 0,
        canceled: 0
      } as Record<IssueStatus, number>,
      byPriority: {
        low: 0,
        medium: 0,
        high: 0,
        urgent: 0
      } as Record<IssuePriority, number>
    }

    data?.forEach(issue => {
      stats.byStatus[issue.status as IssueStatus]++
      stats.byPriority[issue.priority as IssuePriority]++
    })

    return stats
  }

  /**
   * 批量创建问题
   * @param issues - 问题对象数组
   */
  static async createIssues(
    issues: Omit<IssueInsert, 'created_by' | 'workspace_id'>[],
    workspaceId: string
  ): Promise<Database['public']['Tables']['issues']['Row'][]> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('未认证的用户')

    const issuesToInsert = issues.map((issue) => ({
      ...issue,
      workspace_id: workspaceId,
      reporter_id: user.id,
    }))

    const { data, error } = await supabase
      .from('issues')
      .insert(issuesToInsert)
      .select()

    if (error) {
      console.error('Error creating issues:', error)
      throw error
    }

    return data
  }
} 