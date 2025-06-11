export type IssueStatus = 'todo' | 'in_progress' | 'done' | 'canceled';
export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';
export type ViewType = 'list' | 'board' | 'calendar' | 'timeline';

// View configuration types
export interface ViewFilters {
  status?: IssueStatus[];
  priority?: IssuePriority[];
  assignee?: string[];
  project?: string[];
  labels?: string[];
  [key: string]: unknown;
}

export interface ViewSortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface ViewDisplayConfig {
  groupBy?: string;
  showSubIssues?: boolean;
  showCompletedIssues?: boolean;
  columnsVisible?: string[];
  [key: string]: unknown;
}

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          slug: string;
          created_at: string;
          updated_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          slug: string;
          created_at?: string;
          updated_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          slug?: string;
          created_at?: string;
          updated_at?: string;
          created_by?: string;
        };
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: MemberRole;
          invited_at: string;
          joined_at: string | null;
          invited_by: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          role?: MemberRole;
          invited_at?: string;
          joined_at?: string | null;
          invited_by?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          user_id?: string;
          role?: MemberRole;
          invited_at?: string;
          joined_at?: string | null;
          invited_by?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          description: string | null;
          slug: string;
          color: string;
          icon: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          description?: string | null;
          slug: string;
          color?: string;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          description?: string | null;
          slug?: string;
          color?: string;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      views: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          description: string | null;
          type: ViewType;
          filters: ViewFilters;
          sort_config: ViewSortConfig;
          display_config: ViewDisplayConfig;
          is_default: boolean;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          description?: string | null;
          type?: ViewType;
          filters?: ViewFilters;
          sort_config?: ViewSortConfig;
          display_config?: ViewDisplayConfig;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          description?: string | null;
          type?: ViewType;
          filters?: ViewFilters;
          sort_config?: ViewSortConfig;
          display_config?: ViewDisplayConfig;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      issues: {
        Row: {
          id: string;
          workspace_id: string;
          project_id: string | null;
          title: string;
          description: string | null;
          status: IssueStatus;
          priority: IssuePriority;
          identifier: string;
          assignee_id: string | null;
          reporter_id: string | null;
          parent_id: string | null;
          due_date: string | null;
          estimate: number | null;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          project_id?: string | null;
          title: string;
          description?: string | null;
          status?: IssueStatus;
          priority?: IssuePriority;
          identifier?: string;
          assignee_id?: string | null;
          reporter_id?: string | null;
          parent_id?: string | null;
          due_date?: string | null;
          estimate?: number | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          project_id?: string | null;
          title?: string;
          description?: string | null;
          status?: IssueStatus;
          priority?: IssuePriority;
          identifier?: string;
          assignee_id?: string | null;
          reporter_id?: string | null;
          parent_id?: string | null;
          due_date?: string | null;
          estimate?: number | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
      };
      issue_labels: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          color?: string;
          created_at?: string;
        };
      };
      issue_label_relations: {
        Row: {
          issue_id: string;
          label_id: string;
        };
        Insert: {
          issue_id: string;
          label_id: string;
        };
        Update: {
          issue_id?: string;
          label_id?: string;
        };
      };
      issue_comments: {
        Row: {
          id: string;
          issue_id: string;
          user_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          issue_id: string;
          user_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          issue_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      issue_status: IssueStatus;
      issue_priority: IssuePriority;
      member_role: MemberRole;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Extended types for joined data
export type WorkspaceWithMembers = Database['public']['Tables']['workspaces']['Row'] & {
  workspace_members: (Database['public']['Tables']['workspace_members']['Row'] & {
    user_profiles: Database['public']['Tables']['user_profiles']['Row'];
  })[];
};

export type ProjectWithWorkspace = Database['public']['Tables']['projects']['Row'] & {
  workspaces: Database['public']['Tables']['workspaces']['Row'];
};

export type IssueWithRelations = Database['public']['Tables']['issues']['Row'] & {
  projects?: Database['public']['Tables']['projects']['Row'] | null;
  workspaces: Database['public']['Tables']['workspaces']['Row'];
  assignee?: Database['public']['Tables']['user_profiles']['Row'] | null;
  reporter?: Database['public']['Tables']['user_profiles']['Row'] | null;
  issue_labels?: (Database['public']['Tables']['issue_label_relations']['Row'] & {
    issue_labels: Database['public']['Tables']['issue_labels']['Row'];
  })[];
};

export type ViewWithWorkspace = Database['public']['Tables']['views']['Row'] & {
  workspaces: Database['public']['Tables']['workspaces']['Row'];
}; 