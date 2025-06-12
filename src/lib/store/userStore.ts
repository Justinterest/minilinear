import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { supabase } from '../supabase'

interface UserState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  init: () => Promise<void>
  subscribe: () => () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  logout: () => {
    supabase.auth.signOut();
    set({ user: null, loading: false });
  },
  init: async () => {
    try {
      set({ loading: true });
      const { data: { user } } = await supabase.auth.getUser();
      set({ user, loading: false });
    } catch (error) {
      console.error(error);
      set({ user: null, loading: false });
    }
  },
  subscribe: () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
    return () => {
      subscription.unsubscribe();
    };
  },
})) 