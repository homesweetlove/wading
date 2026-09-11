export type ThemeId = 'paper-letter' | 'garden-film' | 'midnight-ceremony';

export interface WeddingTheme {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  swatches: [string, string, string];
}

export const DEFAULT_THEME: ThemeId = 'paper-letter';

export const WEDDING_THEMES: WeddingTheme[] = [
  {
    id: 'paper-letter',
    name: 'Paper Letter',
    subtitle: 'Editorial / Intimate',
    description: '여백이 많은 종이 초대장처럼 차분하고 정제된 편지형 구성입니다.',
    swatches: ['#f4efe6', '#8c6a45', '#23201c'],
  },
  {
    id: 'garden-film',
    name: 'Garden Film',
    subtitle: 'Natural / Cinematic',
    description: '세이지와 필름 프레임을 사용한 야외 웨딩·스냅 앨범형 구성입니다.',
    swatches: ['#e8eadf', '#6d8065', '#263126'],
  },
  {
    id: 'midnight-ceremony',
    name: 'Midnight Ceremony',
    subtitle: 'Night / Dramatic',
    description: '짙은 밤색 배경과 타이포그래피 중심의 야간 예식 포스터형 구성입니다.',
    swatches: ['#11141b', '#d2b474', '#f0eadf'],
  },
];

export function isThemeId(value: string | null): value is ThemeId {
  return WEDDING_THEMES.some((theme) => theme.id === value);
}
