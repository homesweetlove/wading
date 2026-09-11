export type ThemeId =
  | 'ivory-gold'
  | 'rose-champagne'
  | 'sage-garden'
  | 'sky-porcelain'
  | 'lavender-dusk';

export interface WeddingTheme {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  swatches: [string, string, string];
}

export const DEFAULT_THEME: ThemeId = 'ivory-gold';

export const WEDDING_THEMES: WeddingTheme[] = [
  {
    id: 'ivory-gold',
    name: 'Ivory Gold',
    subtitle: 'Classic / Luxury',
    description: '현재 디자인을 유지한 따뜻한 아이보리와 샴페인 골드 조합입니다.',
    swatches: ['#f8f6f2', '#b89352', '#1a1a1a'],
  },
  {
    id: 'rose-champagne',
    name: 'Rose Champagne',
    subtitle: 'Romantic / Soft',
    description: '로즈 핑크와 샴페인 톤으로 조금 더 부드럽고 로맨틱한 분위기입니다.',
    swatches: ['#fff7f5', '#b76e79', '#39282c'],
  },
  {
    id: 'sage-garden',
    name: 'Sage Garden',
    subtitle: 'Natural / Calm',
    description: '세이지 그린과 크림 톤을 사용한 야외·가든 웨딩 느낌의 테마입니다.',
    swatches: ['#f5f7f1', '#71856d', '#253128'],
  },
  {
    id: 'sky-porcelain',
    name: 'Sky Porcelain',
    subtitle: 'Clean / Modern',
    description: '도자기처럼 깨끗한 배경과 차분한 블루 포인트의 현대적인 테마입니다.',
    swatches: ['#f3f7fa', '#6f8fa8', '#1f2d38'],
  },
  {
    id: 'lavender-dusk',
    name: 'Lavender Dusk',
    subtitle: 'Dreamy / Elegant',
    description: '옅은 라벤더와 보랏빛 포인트로 몽환적이고 우아하게 보이는 테마입니다.',
    swatches: ['#f8f5fb', '#8b739e', '#302a35'],
  },
];

export function isThemeId(value: string | null): value is ThemeId {
  return WEDDING_THEMES.some((theme) => theme.id === value);
}
