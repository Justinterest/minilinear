import { supabase } from '../supabase'
import type { Database, ViewWithWorkspace } from '@/types/database'

type View = Database['public']['Tables']['views']['Row']
type ViewInsert = Database['public']['Tables']['views']['Insert']
type ViewUpdate = Database['public']['Tables']['views']['Update']

export class ViewService {
  // 获取工作空间的视图列表
  static async getWorkspaceViews(workspaceId: string): Promise<View[]> {
    const { data, error } = await supabase
      .from('views')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // 获取视图详情
  static async getView(viewId: string): Promise<ViewWithWorkspace | null> {
    const { data, error } = await supabase
      .from('views')
      .select(`
        *,
        workspaces (
          id, name, slug
        )
      `)
      .eq('id', viewId)
      .single()

    if (error) throw error
    return data as ViewWithWorkspace
  }

  // 获取默认视图
  static async getDefaultView(workspaceId: string): Promise<View | null> {
    const { data, error } = await supabase
      .from('views')
      .select('*')
      .eq('workspace_id', workspaceId)
      .eq('is_default', true)
      .single()

    if (error) return null
    return data
  }

  // 创建视图
  static async createView(view: Omit<ViewInsert, 'created_by'>): Promise<View> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('未认证用户')

    // 如果这是默认视图，先取消其他默认视图
    if (view.is_default) {
      await supabase
        .from('views')
        .update({ is_default: false })
        .eq('workspace_id', view.workspace_id)
        .eq('is_default', true)
    }

    const { data, error } = await supabase
      .from('views')
      .insert({
        ...view,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 更新视图
  static async updateView(viewId: string, updates: ViewUpdate): Promise<View> {
    // 如果要设置为默认视图，先取消其他默认视图
    if (updates.is_default) {
      const view = await this.getView(viewId)
      if (view) {
        await supabase
          .from('views')
          .update({ is_default: false })
          .eq('workspace_id', view.workspace_id)
          .eq('is_default', true)
          .neq('id', viewId)
      }
    }

    const { data, error } = await supabase
      .from('views')
      .update(updates)
      .eq('id', viewId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 删除视图
  static async deleteView(viewId: string): Promise<void> {
    const { error } = await supabase
      .from('views')
      .delete()
      .eq('id', viewId)

    if (error) throw error
  }

  // 设置默认视图
  static async setDefaultView(viewId: string): Promise<View> {
    const view = await this.getView(viewId)
    if (!view) throw new Error('视图不存在')

    // 先取消工作空间中其他默认视图
    await supabase
      .from('views')
      .update({ is_default: false })
      .eq('workspace_id', view.workspace_id)
      .eq('is_default', true)

    // 设置新的默认视图
    const { data, error } = await supabase
      .from('views')
      .update({ is_default: true })
      .eq('id', viewId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 复制视图
  static async duplicateView(viewId: string, newName: string): Promise<View> {
    const originalView = await this.getView(viewId)
    if (!originalView) throw new Error('原视图不存在')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('未认证用户')

    const { data, error } = await supabase
      .from('views')
      .insert({
        workspace_id: originalView.workspace_id,
        name: newName,
        description: originalView.description,
        type: originalView.type,
        filters: originalView.filters,
        sort_config: originalView.sort_config,
        display_config: originalView.display_config,
        is_default: false,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
} 