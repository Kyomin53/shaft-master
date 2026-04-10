# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)
**프로젝트명:** ShaftMaster (골프 에이전트 02)
**목적:** 사용자의 골프 스윙, 장비(샤프트 등), 플레이 스타일 데이터를 바탕으로 최적의 장비 추천 및 골프 관련 상담을 제공하는 AI 기반 골프 에이전트 서비스.
**플랫폼:** Web Application (반응형 대응)

## 2. 기술 스택 (Tech Stack)
- **Frontend / Framework:** Next.js (App Router), React 19, TypeScript
- **Styling / UI:** Tailwind CSS, shadcn/ui, Base UI, Lucide React (아이콘)
- **State Management:** Zustand
- **Backend / Database:** Supabase (Auth, Database, Edge Functions)
- **AI Integration:** OpenAI API (GPT-4o 등, 자연어 처리 및 추천 로직 강화)

## 3. 핵심 기능 (Core Features)

### 3.1. AI 골프 에이전트 (AI Golf Agent Chat)
- 사용자와 자연어로 대화하며 골프 관련 질문(스윙 교정, 룰, 용품 추천 등)에 답변.
- 대화 컨텍스트를 유지하여 개인화된 상담 지원.
- OpenAI API를 연동하여 전문적인 골프 지식 기반 응답 생성.

### 3.2. 개인 맞춤형 피팅 및 샤프트 추천 (ShaftMaster)
- 사용자의 기본 정보(신체 스펙, 핸디캡, 평균 비거리, 스윙 스피드, 탄도 등) 입력 폼 제공.
- 입력된 데이터를 바탕으로 최적의 클럽 샤프트 스펙(강도, 무게, 킥포인트 등) 추천.
- 추천 결과에 대한 AI의 상세 설명 및 기대 효과 제공.

### 3.3. 회원 관리 및 개인화 (Auth & Personalization)
- Supabase Auth를 활용한 회원가입 및 로그인 기능.
- 사용자 프로필 관리 (나의 골프 스펙 저장 및 수정).
- 이전 대화 내역 및 추천 기록 저장 및 조회.

### 3.4. 스윙/장비 데이터베이스 연동
- 시중의 다양한 골프 클럽 및 샤프트 정보를 Supabase DB에 구축 혹은 외부 API 연동.
- AI가 해당 데이터베이스를 검색(RAG 방식 등)하여 정확한 정보 제공.

## 4. UI / UX 디자인 요구사항
- **Aesthetics:** 고급스럽고 모던한 느낌을 주는 프리미엄 디자인(Premium Design). 다크 모드(Dark Mode) 혹은 깔끔한 글래스모피즘(Glassmorphism) 적용.
- **Micro-animations:** 인터랙션 시 부드러운 애니메이션 적용 (tw-animate-css 활용).
- **Responsive:** 모바일 환경에서도 쉽게 챗봇 및 폼을 이용할 수 있도록 완벽한 반응형 UI 구현.

## 5. 단계별 개발 로드맵 (Roadmap)

- **Phase 1: 기반 설정 및 UI/UX 설계**
  - 프로젝트 구조 세팅, 환경 변수 구성.
  - 프리미엄 디자인 시스템(테마, 컬러, 타이포그래피) 구축 및 컴포넌트 세팅.
- **Phase 2: 코어 기능 구현 (AI 에이전트)**
  - OpenAI 연동 및 챗봇 UI 개발.
  - 프롬프트 엔지니어링을 통한 '골프 전문가' 페르소나 적용.
- **Phase 3: Supabase 연동 및 맞춤형 추천**
  - 회원가입/로그인 구현.
  - 사용자 스펙 입력 폼 및 DB 스키마 생성.
  - 저장된 스펙 기반의 샤프트/장비 추천 로직 연동.
- **Phase 4: 고도화 및 안정화**
  - RAG(Retrieval-Augmented Generation) 도입 검토 (최신 장비 정보 반영).
  - 전체 사용자 피드백 반영 및 UI 폴리싱, 에러 핸들링.

## 6. 데이터베이스 스키마 초안 (Supabase)
- `users`: id, email, created_at
- `user_profiles`: user_id, height, weight, handicap, swing_speed, average_distance, preferred_brand
- `chat_sessions`: session_id, user_id, created_at
- `chat_messages`: message_id, session_id, role (user/assistant), content, created_at
