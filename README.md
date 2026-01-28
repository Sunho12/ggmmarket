# 🍠 고구마마켓 (GGM Market)

당근마켓 클론 프로젝트 - 지역 기반 중고 거래 플랫폼

## 기술 스택

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Image Optimization**: Next.js Image Component

## 주요 기능

### ✅ 구현 완료
- 사용자 인증 (회원가입, 로그인, 로그아웃)
- 상품 CRUD (등록, 조회, 수정, 삭제)
- 이미지 업로드 (최대 5개)
- 상품 목록 보기 (그리드 레이아웃)
- 상품 상세 보기 (이미지 갤러리, 조회수)
- 내 상품 관리
- 상품 상태 관리 (판매중, 예약중, 판매완료)
- 카테고리 분류
- 반응형 디자인

### 🚧 향후 추가 예정
- 실시간 채팅
- 지역 기반 필터링
- 상품 검색
- 찜하기/관심상품
- 사용자 프로필 페이지
- 알림 시스템

## 시작하기

### 환경 변수 설정

`.env.local` 파일에 다음 내용을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 프로젝트 구조

```
ggmmarket/
├── app/
│   ├── (auth)/              # 인증 페이지
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/              # 메인 레이아웃
│   │   ├── page.tsx         # 홈 (상품 목록)
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx      # 상품 상세
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx  # 상품 수정
│   │   │   └── new/
│   │   │       └── page.tsx      # 상품 등록
│   │   └── my-products/
│   │       └── page.tsx     # 내 상품
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── auth/                # 인증 컴포넌트
│   ├── products/            # 상품 컴포넌트
│   ├── ui/                  # UI 컴포넌트
│   └── layout/              # 레이아웃 컴포넌트
├── lib/
│   ├── supabase/            # Supabase 클라이언트
│   └── hooks/               # React Hooks
├── types/
│   └── database.types.ts    # 데이터베이스 타입
└── middleware.ts            # 인증 미들웨어
```

## 데이터베이스 스키마

### Profiles (사용자 프로필)
- id (UUID, FK to auth.users)
- email
- username
- full_name
- avatar_url
- bio
- phone
- location
- created_at, updated_at

### Products (상품)
- id (UUID)
- user_id (FK to profiles)
- title
- description
- price
- category (enum)
- status (enum: available, reserved, sold)
- location
- images (text[])
- view_count
- created_at, updated_at

## 보안 기능

- Row Level Security (RLS) 정책
- 인증된 사용자만 상품 등록
- 본인 상품만 수정/삭제
- 미들웨어를 통한 라우트 보호
- 이미지 업로드 권한 제어

## 라이선스

MIT
