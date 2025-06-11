
import { create } from 'zustand'

interface GlobalState {
  sidebarOpened: boolean
  setSidebarOpened: (sidebarOpened: boolean) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  sidebarOpened: false,
  setSidebarOpened: (sidebarOpened) => set({ sidebarOpened }),
})) 