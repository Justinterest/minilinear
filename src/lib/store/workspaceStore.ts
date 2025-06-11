import { create } from 'zustand'
import { Workspace, WorkspaceService } from '@/lib/services/workspaceService'

interface WorkspaceState {
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  loading: boolean
  initialized: boolean
  fetchWorkspaces: (userId: string, userName?: string) => Promise<void>
  setCurrentWorkspace: (workspace: Workspace | null) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  currentWorkspace: null,
  loading: true,
  initialized: false,
  fetchWorkspaces: async (userId, userName) => {
    if (get().initialized) return
    set({ loading: true })
    try {
      let workspaceList = await WorkspaceService.getUserWorkspaces()
      console.log(workspaceList)
      if (workspaceList.length === 0) {
        const newWorkspace = await WorkspaceService.setupDefaultWorkspace(
          userId,
          userName
        )
        if (newWorkspace) {
          workspaceList = [newWorkspace]
        }
        workspaceList = await WorkspaceService.getUserWorkspaces()
      }

      set({
        workspaces: workspaceList,
        currentWorkspace: workspaceList[0] || null,
        loading: false,
        initialized: true,
      })
    } catch (error) {
      console.error('Error fetching or setting up workspaces:', error)
      set({ loading: false, initialized: true }) // Stop loading on error but mark as initialized
    }
  },
  setCurrentWorkspace: (workspace) => {
    set({ currentWorkspace: workspace })
  },
})) 