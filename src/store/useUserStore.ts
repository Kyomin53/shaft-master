import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type UserSpec = {
  gender: string;
  handicap: string;
  averageScore: string;
  swingSpeed: string;
  averageDistance: string;
  preferredBrand: string;
  // 신규 필드
  height: number;
  gloveSize: string;
  currentShaft: string;
  feelFeedback: string[];
  swingTempo: "smooth" | "normal" | "hard";
  ballFlight: "slice" | "straight" | "hook";
  trajectoryGoal: "low" | "mid" | "high";
};

interface UserState {
  deviceId: string;
  spec: Partial<UserSpec>;
  setSpec: (spec: Partial<UserSpec>) => void;
  clearSpec: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      deviceId: uuidv4(),
      spec: {},
      setSpec: (newSpec) => set((state) => ({ spec: { ...state.spec, ...newSpec } })),
      clearSpec: () => set({ spec: {} }),
    }),
    {
      name: 'user-storage',
    }
  )
);
