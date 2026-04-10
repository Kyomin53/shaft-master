-- -------------------------------------------------
-- fitting_reports 테이블 (사용자 피팅 결과 히스토리)
-- -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fitting_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 분석 당시 입력한 스펙 (JSON)
  spec JSONB NOT NULL,
  
  -- 분석 결과 (추천 리스트 JSON)
  results JSONB NOT NULL,
  
  -- 카드 최상단 노출용 핵심 데이터 (인덱싱 및 빠른 조회를 위해 별도 컬럼 추출)
  recommended_model TEXT NOT NULL,         -- 상위 1위 모델명
  match_rate INTEGER NOT NULL,            -- 매칭률 (%)
  swing_speed TEXT NOT NULL,              -- 분석 당시 스피드
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) 설정
ALTER TABLE public.fitting_reports ENABLE ROW LEVEL SECURITY;

-- 본인의 데이터만 조회/추가 가능하도록 정책 설정
CREATE POLICY "Users can view their own reports" 
  ON public.fitting_reports FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports" 
  ON public.fitting_reports FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
