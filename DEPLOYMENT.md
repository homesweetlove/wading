# Vercel Deployment Guide

이 프로젝트는 Vite 정적 앱으로 배포합니다.

## 기본 설정

Vercel에서 GitHub 저장소 `homesweetlove/wading`을 Import한 뒤 다음 값을 사용합니다.

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

현재 앱은 별도의 API 키나 환경변수를 요구하지 않습니다.

## 자동 배포

Vercel Git Integration이 연결되어 있으면 `main` 브랜치에 push될 때 새 Production Deployment가 자동 생성됩니다.

## SPA routing

`vercel.json`에서 실제 정적 asset은 정상적으로 제공하고, 애플리케이션 경로는 `index.html`로 fallback하도록 설정합니다.

## 배포 전 확인

```bash
npm ci
npm run lint
npm run build
```

세 명령이 모두 성공한 뒤 배포하는 것을 권장합니다.
