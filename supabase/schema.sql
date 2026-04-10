-- 1. user_profiles 테이블 생성 (회원가입 없이 device_id 기준)
CREATE TABLE public.user_profiles (
  device_id UUID PRIMARY KEY,
  height NUMERIC NULL,
  weight NUMERIC NULL,
  handicap INTEGER NULL,
  swing_speed NUMERIC NULL,
  average_distance NUMERIC NULL,
  preferred_brand TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. chat_sessions 테이블 생성
CREATE TABLE public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID NOT NULL, -- index 목적으로 foreign key는 설정하지 않음(profile이 필수가 아닐 수 있으므로)
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- device_id를 기준으로 빠른 검색을 위한 인덱스 추가
CREATE INDEX idx_chat_sessions_device_id ON public.chat_sessions(device_id);

-- 3. chat_messages 테이블 생성
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- session_id를 기준으로 빠른 검색을 위한 인덱스 추가
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);

-- 4. 업데이트 트리거 자동 적용 함수 생성 (updated_at)
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

-- 트리거 설정
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_chat_sessions_updated_at
BEFORE UPDATE ON public.chat_sessions
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
