import { supabase } from './supabase';
import { UserSpec } from '@/store/useUserStore';
import { FittingResult } from './fittingLogic';

export interface SavedReport {
  id?: string;
  user_id?: string;
  spec: Partial<UserSpec>;
  results: FittingResult[];
  recommended_model: string;
  match_rate: number;
  swing_speed: string;
  created_at: string;
}

const LOCAL_STORAGE_KEY = 'guest_fitting_history';

export const storageService = {
  // 1. 리포트 저장
  async saveFittingReport(
    user: any, 
    spec: Partial<UserSpec>, 
    results: FittingResult[]
  ): Promise<void> {
    const mainResult = results[0];
    const reportData: SavedReport = {
      spec,
      results,
      recommended_model: `${mainResult.shaft.brand} ${mainResult.shaft.model}`,
      match_rate: mainResult.matchRate,
      swing_speed: spec.swingSpeed || '0',
      created_at: new Date().toISOString(),
    };

    if (user) {
      // 1-1. 로그인 유저: Supabase 저장
      const { error } = await supabase
        .from('fitting_reports')
        .insert([{
          user_id: user.id,
          spec: reportData.spec,
          results: reportData.results,
          recommended_model: reportData.recommended_model,
          match_rate: reportData.match_rate,
          swing_speed: reportData.swing_speed,
          created_at: reportData.created_at
        }]);
      
      if (error) {
        console.error('Error saving to Supabase:', (error as any).message || error);
        // DB 저장 실패 시 일단 로컬에도 백업 (선택 사항)
        this.saveToLocalStorage(reportData);
      }
    } else {
      // 1-2. 비로그인 유저 또는 Mock 유저: LocalStorage 저장
      this.saveToLocalStorage(reportData);
    }
  },

  // 2. 로컬 스토리지 저장 보조 함수
  saveToLocalStorage(report: SavedReport): void {
    const history = this.getLocalStorageHistory();
    history.unshift(report); // 최신순
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  },

  // 3. 히스토리 조회
  async getFittingHistory(user: any): Promise<SavedReport[]> {
    if (user) {
      // Supabase에서 가져오기
      const { data, error } = await supabase
        .from('fitting_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        // 테이블이 아직 생성되지 않았거나 설정 오류인 경우 무시하고 로컬 데이터 반환
        console.warn('Supabase fetch bypassed (using local):', (error as any).message || error);
        return this.getLocalStorageHistory();
      }
      return data as SavedReport[];
    } else {
      // LocalStorage에서 가져오기
      return this.getLocalStorageHistory();
    }
  },

  getLocalStorageHistory(): SavedReport[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // 4. 게스트 데이터 동기화 (로그인 시 호출)
  async syncGuestData(userId: string): Promise<void> {
    const history = this.getLocalStorageHistory();
    if (history.length === 0) return;

    const reportsToInsert = history.map(h => ({
      user_id: userId,
      spec: h.spec,
      results: h.results,
      recommended_model: h.recommended_model,
      match_rate: h.match_rate,
      swing_speed: h.swing_speed,
      created_at: h.created_at
    }));

    const { error } = await supabase
      .from('fitting_reports')
      .insert(reportsToInsert);

    if (!error) {
      // 성공적으로 동기화되면 로컬 스토리지 비우기 (또는 유지)
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      console.log('Guest history synced to Supabase successfully.');
    } else {
      console.error('Error syncing guest history:', error);
    }
  }
};
