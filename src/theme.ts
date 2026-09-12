export type ThemeId =
  | 'paper-letter'
  | 'garden-film'
  | 'midnight-ceremony'
  | 'rose-atelier'
  | 'coastal-postcard'
  | 'modern-vow';

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
  {
    id: 'rose-atelier',
    name: 'Rose Atelier',
    subtitle: 'Romantic / Ribbon',
    description: '버건디 리본과 곡선 초대장으로 담아낸 사랑스러운 로맨틱 웨딩입니다.',
    swatches: ['#f5e5e3', '#8e3049', '#652438'],
  },
  {
    id: 'coastal-postcard',
    name: 'Coastal Postcard',
    subtitle: 'Coastal / Nostalgic',
    description: '푸른 바다 일러스트와 우표, 엽서의 여백에 담은 산뜻한 초대입니다.',
    swatches: ['#f7f3e8', '#2855ae', '#153a79'],
  },
  {
    id: 'modern-vow',
    name: 'Modern Vow',
    subtitle: 'Graphic / Playful',
    description: '과감한 타이포그래피와 오렌지색 예식 티켓으로 전하는 경쾌한 시작입니다.',
    swatches: ['#f4f0cb', '#c04424', '#292b23'],
  },
];

export function isThemeId(value: string | null): value is ThemeId {
  return WEDDING_THEMES.some((theme) => theme.id === value);
}
