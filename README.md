# Wading — 3D Wedding Invitation

React + Three.js 기반의 **반응형 3D 웨딩 청첩장 웹앱**입니다.

PC와 모바일 화면을 각각 최적화해서 보여주고, 3D 웨딩 오브젝트와 파티클 효과, D-Day 카운터, 오시는 길, 방명록, 계좌 안내 등 디지털 청첩장에 필요한 화면을 한 페이지에 구성합니다.

현재 샘플 데이터는 `Jihoon & Minji`, `2026.10.24`, `Grand Hyatt Seoul`을 기준으로 들어가 있으며 실제 사용 시 코드에서 이름·날짜·장소·계좌정보 등을 교체하면 됩니다.

---

## 주요 기능

### 반응형 청첩장

- 데스크톱 전용 레이아웃
- 모바일 전용 레이아웃
- 화면 너비에 따라 자동 전환
- 웨딩 정보 / 초대 문구 / 오시는 길 / 방명록 / 계좌 안내 구성

### 3D 연출

`@react-three/fiber`, `@react-three/drei`, `three`를 이용합니다.

- 3D 웨딩 케이크
- 웨딩 링 오브젝트
- 파티클 배경
- 떨어지는 컨페티
- 조명 / 환경광 / 그림자
- 부드러운 애니메이션

### D-Day

결혼식 날짜까지 남은 시간을 실시간으로 계산합니다.

- Days
- Hours
- Minutes
- Seconds

현재 기준 날짜는 코드 안에 다음과 같이 설정되어 있습니다.

```ts
2026-10-24T12:30:00
```

### 방명록 UI

이름과 축하 메시지를 입력해 화면에 추가할 수 있습니다.

> 현재 방명록은 서버나 데이터베이스에 저장되지 않습니다. 새로고침하면 입력된 메시지는 사라집니다.

### 계좌 안내

신랑/신부 계좌정보를 보여주고 클립보드 복사 UI를 제공합니다.

> 저장소에 들어 있는 이름과 계좌번호는 샘플 값입니다. 실제 배포 전 반드시 교체하세요.

---

## 테마 선택

우측 상단의 **THEME** 버튼을 누르면 청첩장의 분위기를 실시간으로 비교하고 선택할 수 있습니다.

현재 5개의 테마가 포함되어 있습니다.

| Theme | 분위기 |
|---|---|
| **Ivory Gold** | 클래식 / 럭셔리 |
| **Rose Champagne** | 로맨틱 / 소프트 |
| **Sage Garden** | 내추럴 / 가든 |
| **Sky Porcelain** | 모던 / 클린 |
| **Lavender Dusk** | 몽환적 / 우아함 |

테마 카드를 선택하면 배경, 텍스트, 포인트 컬러, 카드 테두리, 3D 배경 파티클 등이 즉시 변경됩니다.

선택한 테마는 브라우저 `localStorage`에 저장되기 때문에 같은 브라우저로 다시 접속했을 때 마지막으로 선택한 테마가 유지됩니다.

### 테마 추가하기

새로운 테마를 추가하려면 다음 두 영역을 수정하면 됩니다.

```text
src/theme.ts
src/index.css
```

`src/theme.ts`에는 테마 이름과 미리보기 컬러를 추가하고, `src/index.css`에는 해당 `data-theme`의 CSS 변수를 정의하면 됩니다.

---

## 기술 스택

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Motion
- Lucide React

### 3D

- Three.js
- React Three Fiber
- React Three Drei

### Effects

- canvas-confetti

### Deployment

- Vercel 설정 포함

---

## 프로젝트 구조

```text
wading/
├─ src/
│  ├─ components/
│  │  ├─ Background3D.tsx      # 3D 파티클 배경
│  │  ├─ Button3D.tsx          # 3D 스타일 버튼
│  │  ├─ EmotionalCouple.tsx   # 커플 연출 컴포넌트
│  │  ├─ ErrorBoundary.tsx     # 렌더링 오류 처리
│  │  ├─ InvitationContent.tsx # 청첩장 콘텐츠 구성
│  │  ├─ MobileInvitation.tsx  # 모바일 레이아웃
│  │  ├─ PCInvitation.tsx      # 데스크톱 레이아웃
│  │  ├─ ThemePicker.tsx       # 테마 미리보기 / 선택 UI
│  │  └─ ThreeScene.tsx        # 웨딩 케이크 / 링 3D 씬
│  ├─ lib/
│  │  └─ utils.ts
│  ├─ App.tsx                  # 반응형 분기 + 테마 상태
│  ├─ theme.ts                 # 테마 목록
│  ├─ index.css                # 테마 컬러 및 공통 스타일
│  └─ main.tsx
├─ DEPLOYMENT.md
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vercel.json
└─ vite.config.ts
```

---

## 설치 및 실행

### 요구사항

- Node.js 18 이상 권장
- npm

### 1. 저장소 Clone

```bash
git clone https://github.com/homesweetlove/wading.git
cd wading
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

현재 Vite 개발 서버는 기본적으로 `3000` 포트를 사용하도록 설정되어 있습니다.

```text
http://localhost:3000
```

### 4. TypeScript 검사

```bash
npm run lint
```

이 프로젝트의 `lint` 스크립트는 ESLint가 아니라 다음 명령을 실행합니다.

```bash
tsc --noEmit
```

### 5. 프로덕션 빌드

```bash
npm run build
```

### 6. 빌드 결과 미리보기

```bash
npm run preview
```

---

## 청첩장 정보 수정

현재 청첩장 데이터는 별도의 관리자 페이지나 CMS가 아니라 컴포넌트 코드 안에 들어 있습니다.

주요 수정 대상은 다음과 같습니다.

```text
src/components/PCInvitation.tsx
src/components/MobileInvitation.tsx
src/components/InvitationContent.tsx
```

### 수정할 항목 예시

- 신랑 / 신부 이름
- 결혼식 날짜 및 시간
- 예식장 이름
- 예식장 주소
- 초대 문구
- 신랑 / 신부 계좌번호
- 은행명
- D-Day 기준 날짜

실제 서비스로 사용할 계획이라면 이 값들을 하나의 설정 파일로 분리하는 것을 권장합니다.

---

## 현재 구현 범위와 한계

이 저장소는 현재 **프론트엔드 중심의 인터랙티브 청첩장**입니다.

아직 다음 기능은 실제 서비스와 연결되어 있지 않습니다.

- 방명록 서버 저장
- 관리자 로그인
- 초대장 정보 관리자 페이지
- 사진 업로드
- 실제 지도 API
- 실제 전화/지도 연결 일부
- 음악 재생 관리
- 참석 여부(RSVP) 서버 저장
- 문자/카카오 공유 서버 기능

따라서 현재 방명록이나 일부 버튼은 UI 데모 성격이 있습니다.

---

## 환경 변수

현재 청첩장 화면 자체를 실행하는 데 **Gemini API 키는 필요하지 않습니다.**

저장소에는 AI Studio에서 생성된 초기 설정 흔적으로 `GEMINI_API_KEY` 관련 항목과 `@google/genai` 의존성이 남아 있지만, 현재 청첩장 UI 코드에서는 Gemini API를 호출하지 않습니다.

향후 AI 기능을 추가하지 않는다면 해당 설정과 의존성은 정리해도 됩니다.

---

## 배포

Vercel 설정 파일(`vercel.json`)이 포함되어 있습니다.

일반적인 배포 순서는 다음과 같습니다.

1. GitHub 저장소를 Vercel에 연결
2. Framework Preset을 Vite로 선택
3. Build Command: `npm run build`
4. Deploy

자세한 내용은 [`DEPLOYMENT.md`](./DEPLOYMENT.md)를 참고하세요.

---

## 다음 업그레이드 아이디어

- 이름/날짜/장소/계좌를 한 파일에서 관리하는 `wedding.config.ts`
- 사진 갤러리
- 테마별 3D 오브젝트 재질 변경
- 테마별 폰트 조합 선택
- 음악 테마 선택
- 카카오맵 / 네이버지도 연동
- RSVP 참석 여부 저장
- 실제 방명록 DB 연동
- 관리자 편집 화면
- QR 코드 생성
- 모바일 공유 최적화

---

## 요약

**Wading은 데스크톱과 모바일을 모두 지원하는 3D 웨딩 청첩장 프론트엔드입니다.**

기본 Ivory Gold 디자인에 더해 여러 컬러 테마를 미리 보고 즉시 선택할 수 있으며, 선택한 테마는 브라우저에 저장됩니다. Three.js 기반 3D 장면과 Motion 애니메이션을 조합해 일반적인 정적 청첩장보다 입체적인 경험을 만드는 것을 목표로 합니다.
