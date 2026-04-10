-- -------------------------------------------------
-- shafts 테이블 (골프 샤프트 메타데이터)
-- -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL,                     -- 브랜드명 (예: "Fujikura")
  model TEXT NOT NULL,                     -- 모델명 (예: "Ventus 6.0")
  flex TEXT NOT NULL,                      -- 강도 (예: "Stiff", "Regular")
  weight_g NUMERIC NOT NULL,               -- 무게(g)
  torque NUMERIC NOT NULL,                 -- 토크 (Nm)
  launch TEXT NOT NULL CHECK (launch IN ('Low','Mid','High')),   -- 탄도
  spin   TEXT NOT NULL CHECK (spin   IN ('Low','Mid','High')),   -- 스핀
  recommended_speed_mph NUMERIC NOT NULL, -- 추천 스윙 스피드 (mph)
  description TEXT,                        -- 특징·설명
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 업데이트 시 자동으로 updated_at 갱신
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shafts_updated_at
BEFORE UPDATE ON public.shafts
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
