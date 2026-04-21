import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthDialogOpen: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  setAuthDialogOpen: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthDialogOpen: false,

  setUser: (user) => set({ user, isLoading: false }),

  setAuthDialogOpen: (isOpen) => set({ isAuthDialogOpen: isOpen }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isLoading: false });
  },
}));

// 초기화 로직 (브라우저 로드 시 세션 확인)
if (typeof window !== 'undefined') {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      useAuthStore.getState().setUser(session.user);
    } else {
      setLoading(false);
    }
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setUser(session?.user ?? null);
  });
}

function setLoading(loading: boolean) {
  useAuthStore.setState({ isLoading: loading });
}
