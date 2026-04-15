# Vercel Deployment Guide

이 프로젝트는 Vercel을 통해 배포하도록 최적화되어 있습니다.

## 배포 방법

1. **GitHub 저장소 생성**: GitHub에 새 저장소를 만듭니다.
2. **코드 푸시**:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding invitation"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
3. **Vercel 연결**:
   - [Vercel Dashboard](https://vercel.com/dashboard)로 이동합니다.
   - **Add New...** -> **Project**를 클릭합니다.
   - GitHub 저장소를 가져옵니다(Import).
   - Framework Preset은 **Vite**로 자동 감지됩니다.
   - **Deploy**를 클릭합니다.

## 환경 변수
만약 Gemini API 기능을 서버에서 사용한다면 Vercel 프로젝트 설정의 **Environment Variables** 탭에 `GEMINI_API_KEY`를 추가해야 합니다.
