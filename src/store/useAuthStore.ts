import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isMock: boolean;
  isLoading: boolean;
  setUser: (user: User | null, isMock?: boolean) => void;
  signOut: () => Promise<void>;
  // Mock 로그인을 위한 함수
  signInMock: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isMock: false,
  isLoading: true,

  setUser: (user, isMock = false) => set({ user, isMock, isLoading: false }),

  signInMock: () => {
    // 테스트용 목업 사용자 데이터
    const mockUser: any = {
      id: 'mock-user-id-1234',
      isMock: true, // storageService에서 식별할 수 있도록 추가
      email: 'tester@shaftmaster.com',
      user_metadata: {
        full_name: '테스트 골퍼',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Golf',
      },
    };
    set({ user: mockUser, isMock: true, isLoading: false });
  },

  signOut: async () => {
    const { isMock } = useAuthStore.getState();
    if (!isMock) {
      await supabase.auth.signOut();
    }
    set({ user: null, isMock: false, isLoading: false });
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
