# Wading — Wedding Invitation Experiences

`wading`은 React + TypeScript + Vite로 만든 **반응형 디지털 웨딩 청첩장**입니다.

기존의 3D 오브젝트 중심 화면을 걷어내고, 단순히 색상만 바뀌는 스킨이 아니라 **레이아웃·타이포그래피·애니메이션이 각각 다른 웨딩 경험**을 선택할 수 있도록 다시 구성했습니다.

현재 샘플 정보는 `Jihoon & Minji`, `2026.10.24`, `그랜드 하얏트 서울` 기준입니다.

---

## 현재 테마

### 1. Paper Letter

정적인 종이 초대장과 편지를 모티브로 한 가장 차분한 테마입니다.

- 넓은 여백과 세리프 타이포그래피
- 편지형 초대 문구
- 날짜 / 장소를 인쇄물처럼 정리
- 절제된 fade / reveal 애니메이션
- 아이보리 / 브라운 계열

### 2. Garden Film

야외 웨딩 스냅과 필름 앨범을 모티브로 한 테마입니다.

- 세이지 그린 기반
- 필름·폴라로이드 프레임 구조
- 비대칭 히어로 레이아웃
- 스크롤 시 프레임이 각기 다른 방향에서 등장
- 날짜와 장소를 카드형으로 분리

### 3. Midnight Ceremony

야간 예식 포스터를 모티브로 한 가장 드라마틱한 테마입니다.

- 딥 네이비 / 골드
- 초대형 웨딩 타이포그래피
- 라인 reveal과 어두운 무대형 레이아웃
- 날짜 / 장소를 이벤트 포스터처럼 표현
- 데스크톱과 모바일 모두 강한 대비 유지

### 4. Rose Atelier

버건디 리본과 블러시 핑크를 사용한 로맨틱 초대장입니다.

- 직접 그린 리본 일러스트와 아치 형태의 초대장
- 편지, 약속 날짜, 아치형 장소 안내로 이어지는 구성
- 세리프 타이포그래피와 부드러운 등장 애니메이션

### 5. Coastal Postcard

바다 일러스트와 우편 엽서를 모티브로 한 산뜻한 테마입니다.

- 코발트 블루 / 크림, 돛단배와 파도 SVG 일러스트
- 데스크톱에서는 엽서 앞·뒷면을 나란히, 모바일에서는 세로로 배치
- 우표·소인·주소줄과 여행 일정표 형태의 예식 안내

### 6. Modern Vow

큰 글자와 예식 티켓을 중심으로 구성한 그래픽 테마입니다.

- 버터 옐로 / 오렌지, 굵은 산세리프 타이포그래피
- 절취선과 장식용 바코드를 적용한 초대 티켓
- 모바일에서는 티켓의 절취 부분이 하단으로 이동

우측 하단의 테마 버튼에서 여섯 디자인을 바로 전환할 수 있습니다.
선택한 테마는 `localStorage`에 저장되어 재접속해도 유지됩니다.
새 테마의 일러스트는 SVG/CSS로 구현되어 별도 이미지 요청 없이 표시됩니다.
`?theme=rose-atelier`, `?theme=coastal-postcard`, `?theme=modern-vow`를 URL에 붙이면
해당 디자인을 바로 열 수 있습니다. 유효한 URL 테마는 저장된 선택보다 우선하며,
잘못된 값은 기존 저장값 또는 기본 테마로 돌아갑니다.

---

## 주요 기능

- PC / 태블릿 / 모바일 반응형 레이아웃
- 서로 다른 6가지 웨딩 디자인 경험
- D-Day 실시간 카운트다운
- 예식 날짜 / 시간 / 장소 안내
- 네이버 지도 검색 연결
- 신랑 / 신부 계좌번호 복사
- 테마 선택값 브라우저 저장
- Motion 기반 화면 전환 및 스크롤 애니메이션

---

## 프로젝트 구조

```text
wading/
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  ├─ theme.ts
│  └─ components/
│     ├─ WeddingExperience.tsx   # 6가지 웨딩 레이아웃
│     ├─ ThemePicker.tsx         # 테마 미리보기 / 선택
│     └─ ErrorBoundary.tsx
├─ index.html
├─ vite.config.ts
├─ vercel.json
├─ package.json
└─ README.md
```

기존 3D 관련 컴포넌트는 더 이상 메인 화면에서 사용하지 않습니다.

---

## 실행

Node.js 20 이상을 권장합니다.

```bash
npm install
npm run dev
```

기본 개발 서버는 다음 주소에서 확인할 수 있습니다.

```text
http://localhost:3000
```

### 타입 검사

```bash
npm run lint
```

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 미리보기

```bash
npm run preview
```

---

## 웨딩 정보 수정

현재 샘플 웨딩 정보는 `src/components/WeddingExperience.tsx` 상단의 `wedding` 객체에 모여 있습니다.

```ts
const wedding = {
  groom: 'Jihoon',
  bride: 'Minji',
  date: new Date('2026-10-24T12:30:00+09:00'),
  venue: '그랜드 하얏트 서울',
  hall: 'Grand Ballroom',
  address: '서울특별시 용산구 소월로 322',
  // ...
};
```

실제 사용 시 이 객체에서 다음 내용을 변경하면 됩니다.

- 신랑 / 신부 이름
- 결혼식 날짜와 시간
- 예식장 및 홀 이름
- 주소
- 초대 문구
- 계좌정보

---

## 테마 추가

테마 메타 정보는 `src/theme.ts`에 있습니다.

새로운 디자인을 추가하려면:

1. `ThemeId`에 새 ID 추가
2. `WEDDING_THEMES`에 미리보기 정보 추가
3. `WeddingExperience.tsx`에 새로운 레이아웃 컴포넌트 작성
4. `WeddingExperience`의 theme 분기에 연결
5. `index.css`에 해당 테마 전용 스타일 추가

즉, 이 프로젝트의 테마는 **색상 토큰만 갈아끼우는 방식이 아니라 화면 구조 자체를 교체하는 방식**입니다.

---

## Google AI Studio 관련

현재 앱은 Gemini 또는 Google AI API를 사용하지 않습니다.

초기 생성 프로젝트에 남아 있던 `My Google AI Studio App` 문서 제목, `GEMINI_API_KEY` Vite 주입 설정, AI Studio용 `.env.example`, `metadata.json`은 제거했습니다.

청첩장 실행에 별도의 AI API 키나 환경변수는 필요하지 않습니다.

---

## 배포

Vercel 기준:

- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

`main`에 push하면 연결된 Vercel 프로젝트에서 자동 배포하도록 사용할 수 있습니다.

SPA fallback은 `vercel.json`의 rewrite 설정으로 처리합니다.

---

## CI

`.github/workflows/ci.yml`에서 `main` 변경 시 자동으로 다음을 검사합니다.

```text
npm ci
  ↓
npm run lint
  ↓
npm run build
```

타입 오류나 프로덕션 빌드 실패가 있는 상태로 변경 사항을 방치하지 않기 위한 최소 검증 단계입니다.

---

## 현재 한계

- 방명록 서버 / DB 기능은 현재 새 디자인에 포함하지 않았습니다.
- 사진은 아직 실제 웨딩 사진 대신 디자인용 프레임으로 표현합니다.
- 계좌번호와 이름은 샘플 값입니다.
- 실제 배포 전에 개인정보와 실제 예식 정보를 반드시 교체해야 합니다.

향후 실제 사진 갤러리, 방명록 DB, RSVP, 참석 여부 응답 기능 등을 붙일 수 있습니다.
