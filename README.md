[![English](https://img.shields.io/badge/README-English-24292f?style=for-the-badge)](./README.md) [![한국어](https://img.shields.io/badge/README-%ED%95%9C%EA%B5%AD%EC%96%B4-24292f?style=for-the-badge)](./README.ko.md)

# Wading — Wedding Invitation Experiences

`wading` is a **responsive digital wedding invitation** built with React, TypeScript, and Vite.

Instead of a 3D-object-centered screen or simple color-only skins, the project offers **distinct wedding experiences with different layouts, typography, and animation systems**.

The current sample content uses `Jihoon & Minji`, `2026.10.24`, and `Grand Hyatt Seoul`.

---

## Current Themes

### 1. Paper Letter

The calmest theme, inspired by printed invitations and handwritten letters.

- Generous whitespace and serif typography
- Letter-style invitation copy
- Date and venue arranged like printed stationery
- Restrained fade/reveal animation
- Ivory and brown palette

### 2. Garden Film

Inspired by outdoor wedding snapshots and film albums.

- Sage-green base
- Film and Polaroid frame composition
- Asymmetric hero layout
- Frames enter from different directions while scrolling
- Date and venue separated into card-style elements

### 3. Midnight Ceremony

The most dramatic theme, inspired by night-ceremony posters.

- Deep navy and gold
- Oversized wedding typography
- Line reveals and dark stage-like composition
- Date and venue presented like an event poster
- Strong contrast on both desktop and mobile

Use the theme button at the bottom-right to switch between the three designs.
The selected theme is saved to `localStorage` and restored on later visits.

---

## Main Features

- Responsive layouts for desktop, tablet, and mobile
- Three distinct wedding design experiences
- Real-time D-Day countdown
- Ceremony date, time, and venue information
- Naver Map search link
- Copyable groom/bride bank-account information
- Theme preference saved in the browser
- Motion-based transitions and scroll animations

---

## Project Structure

```text
wading/
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  ├─ theme.ts
│  └─ components/
│     ├─ WeddingExperience.tsx   # Three wedding layouts
│     ├─ ThemePicker.tsx         # Theme preview / selection
│     └─ ErrorBoundary.tsx
├─ index.html
├─ vite.config.ts
├─ vercel.json
├─ package.json
└─ README.md
```

The previous 3D-related components are no longer used by the main screen.

---

## Run

Node.js 20 or newer is recommended.

```bash
npm install
npm run dev
```

The default development server is available at:

```text
http://localhost:3000
```

### Type Check

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

### Preview the Build

```bash
npm run preview
```

---

## Editing Wedding Information

The current sample wedding data is centralized in the `wedding` object near the top of `src/components/WeddingExperience.tsx`.

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

For real use, update:

- Groom / bride names
- Wedding date and time
- Venue and hall name
- Address
- Invitation message
- Bank-account information

---

## Adding a Theme

Theme metadata is defined in `src/theme.ts`.

To add a new design:

1. Add a new ID to `ThemeId`.
2. Add preview metadata to `WEDDING_THEMES`.
3. Create the new layout component in `WeddingExperience.tsx`.
4. Connect it to the theme branch in `WeddingExperience`.
5. Add theme-specific styles to `index.css`.

Themes in this project do **not** merely swap color tokens; they replace the screen structure itself.

---

## Google AI Studio

The current app does not use Gemini or the Google AI API.

The `My Google AI Studio App` document title, `GEMINI_API_KEY` Vite injection, AI Studio `.env.example`, and `metadata.json` left over from the initial generated project were removed.

No AI API key or environment variable is required to run the invitation.

---

## Deployment

For Vercel:

- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Pushing to `main` can be used to trigger automatic deployment in the connected Vercel project.

SPA fallback is handled by the rewrite configuration in `vercel.json`.

---

## CI

`.github/workflows/ci.yml` runs the following checks when `main` changes:

```text
npm ci
  ↓
npm run lint
  ↓
npm run build
```

This is the minimum verification layer for catching type errors and production-build failures.

---

## Current Limitations

- Guestbook server/database features are not included in the current redesign.
- Photos are currently represented by design frames rather than real wedding photos.
- Account numbers and names are sample values.
- Replace personal information and ceremony details before a real deployment.

Future additions may include a real photo gallery, guestbook database, RSVP, and attendance responses.
