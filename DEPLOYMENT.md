# 배포 가이드

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 프로덕션 빌드 및 실행

```bash
# 빌드
npm run build

# 실행
npm start
```

## 환경 변수

`.env.local` 파일이 이미 설정되어 있습니다:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## 테스트 시나리오

### 1. 회원가입
1. http://localhost:3000/signup 접속
2. 사용자명, 이메일, 비밀번호 입력
3. 회원가입 버튼 클릭

### 2. 상품 등록
1. 로그인 후 "상품 등록" 버튼 클릭
2. 이미지 업로드 (최대 5개)
3. 제목, 카테고리, 가격, 설명, 거래지역 입력
4. 등록하기 버튼 클릭

### 3. 상품 조회
1. 메인 페이지에서 상품 목록 확인
2. 상품 클릭하여 상세 정보 확인
3. 조회수 증가 확인

### 4. 상품 수정
1. 내 상품 페이지 접속
2. 상품 클릭 후 "수정하기" 버튼
3. 정보 수정 후 저장

### 5. 상품 삭제
1. 상품 상세 페이지에서 "삭제하기" 버튼
2. 확인 후 삭제

## Vercel 배포

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 import
3. 환경 변수 설정:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy 클릭

## Supabase 설정 확인

### 데이터베이스 테이블
- ✅ profiles (사용자 프로필)
- ✅ products (상품)

### RLS 정책
- ✅ profiles: 모두 조회 가능, 본인만 수정
- ✅ products: 모두 조회 가능, 본인만 수정/삭제

### Storage 버킷
- ✅ product-images (public)

### Functions
- ✅ increment_product_view_count (조회수 증가)

## 주요 기능

### 완료된 기능
- [x] 사용자 인증 (회원가입, 로그인, 로그아웃)
- [x] 상품 CRUD
- [x] 이미지 업로드 (최대 5개)
- [x] 상품 목록 (그리드 레이아웃)
- [x] 상품 상세 (이미지 갤러리)
- [x] 내 상품 관리
- [x] 조회수 카운트
- [x] 상품 상태 관리
- [x] 반응형 디자인

### 향후 추가 가능
- [ ] 실시간 채팅
- [ ] 검색 및 필터
- [ ] 찜하기
- [ ] 알림
