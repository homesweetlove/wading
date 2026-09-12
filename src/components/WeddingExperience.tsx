import { useEffect, useMemo, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Gift,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
} from 'lucide-react';
import type { ThemeId } from '../theme';

interface WeddingExperienceProps {
  theme: ThemeId;
}

type WeddingVariant = 'paper' | 'garden' | 'midnight' | 'rose' | 'coastal' | 'modern';

const wedding = {
  groom: 'Jihoon',
  bride: 'Minji',
  date: new Date('2026-10-24T12:30:00+09:00'),
  dateLabel: '2026. 10. 24. SAT · 12:30 PM',
  venue: '그랜드 하얏트 서울',
  hall: 'Grand Ballroom',
  address: '서울특별시 용산구 소월로 322',
  invitation: [
    '서로의 가장 좋은 친구로 오래 머물렀던 두 사람이',
    '이제 같은 방향을 바라보며 한 걸음을 시작합니다.',
    '저희의 첫 장면에 함께해 주시면 오래도록 감사히 간직하겠습니다.',
  ],
  accounts: [
    { role: '신랑', owner: '김지훈', bank: '신한은행', number: '110-123-456789' },
    { role: '신부', owner: '박민지', bank: '국민은행', number: '123456-01-123456' },
  ],
};

function useCountdown() {
  const calculate = () => {
    const diff = Math.max(0, wedding.date.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState(calculate);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return countdown;
}

function AccountCards({ variant }: { variant: WeddingVariant }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(number);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      window.prompt('계좌번호를 복사해주세요.', number);
    }
  };

  return (
    <div className={`account-grid account-grid-${variant}`}>
      {wedding.accounts.map((account) => (
        <article key={account.role} className="account-card">
          <div>
            <span className="account-role">{account.role}</span>
            <strong>{account.owner}</strong>
            <p>{account.bank} · {account.number}</p>
          </div>
          <button type="button" onClick={() => copy(account.number)} aria-label={`${account.role} 계좌번호 복사`}>
            {copied === account.number ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied === account.number ? '복사됨' : '복사'}</span>
          </button>
        </article>
      ))}
    </div>
  );
}

function LocationActions({ variant }: { variant: WeddingVariant }) {
  const openMap = () => {
    window.open(`https://map.naver.com/p/search/${encodeURIComponent(wedding.address)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`location-actions location-actions-${variant}`}>
      <button type="button" onClick={openMap}>
        <Navigation size={16} />
        네이버 지도 열기
      </button>
    </div>
  );
}

function Countdown({ variant }: { variant: WeddingVariant }) {
  const time = useCountdown();
  const values = [
    ['DAYS', time.days],
    ['HOURS', time.hours],
    ['MIN', time.minutes],
    ['SEC', time.seconds],
  ];

  return (
    <div className={`wedding-countdown countdown-${variant}`}>
      {values.map(([label, value]) => (
        <div key={String(label)}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function PaperLetter() {
  return (
    <div className="wedding-experience paper-letter">
      <motion.header
        className="paper-hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="paper-stamp">INVITATION · 2026</div>
        <p className="paper-kicker">SAVE THE DATE</p>
        <h1><span>{wedding.groom}</span><em>&</em><span>{wedding.bride}</span></h1>
        <div className="paper-date-rule"><span />{wedding.dateLabel}<span /></div>
        <p className="paper-caption">Two names, one quiet beginning.</p>
      </motion.header>

      <main className="paper-body">
        <motion.section
          className="paper-letter-sheet"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <Heart size={18} strokeWidth={1.4} />
          <p className="paper-section-label">OUR LETTER</p>
          <div className="paper-message">
            {wedding.invitation.map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="paper-signature">Jihoon & Minji</div>
        </motion.section>

        <section className="paper-information">
          <div className="paper-info-heading">
            <p>THE DAY</p>
            <h2>October<br />Twenty-fourth</h2>
          </div>
          <div className="paper-info-detail">
            <div><CalendarDays size={18} /><span>2026년 10월 24일 토요일</span></div>
            <div><Clock3 size={18} /><span>오후 12시 30분</span></div>
            <div><MapPin size={18} /><span>{wedding.venue} · {wedding.hall}</span></div>
            <p>{wedding.address}</p>
          </div>
        </section>

        <Countdown variant="paper" />

        <section className="paper-venue">
          <div className="paper-map-mark"><MapPin size={30} strokeWidth={1.2} /></div>
          <p className="paper-section-label">LOCATION</p>
          <h2>{wedding.venue}</h2>
          <p>{wedding.address}</p>
          <LocationActions variant="paper" />
        </section>

        <section className="paper-gift">
          <Gift size={20} strokeWidth={1.4} />
          <p className="paper-section-label">WITH GRATITUDE</p>
          <h2>마음을 전하실 곳</h2>
          <p>참석이 어려우신 분들을 위해 조심스러운 마음으로 계좌번호를 남깁니다.</p>
          <AccountCards variant="paper" />
        </section>
      </main>

      <footer className="paper-footer">
        <span>J · M</span>
        <p>Thank you for being part of our beginning.</p>
      </footer>
    </div>
  );
}

function GardenFilm() {
  const frames = useMemo(() => ['01', '02', '03'], []);

  return (
    <div className="wedding-experience garden-film">
      <div className="garden-orb garden-orb-one" />
      <div className="garden-orb garden-orb-two" />

      <header className="garden-hero">
        <motion.div
          className="garden-date-column"
          initial={{ opacity: 0, x: -26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>OCT</span>
          <strong>24</strong>
          <small>2026 · SAT</small>
        </motion.div>

        <motion.div
          className="garden-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          <p>OUR WEDDING FILM</p>
          <h1>{wedding.groom}<br /><em>&</em> {wedding.bride}</h1>
          <span>{wedding.dateLabel}</span>
        </motion.div>

        <motion.div
          className="garden-film-frame garden-film-hero"
          initial={{ opacity: 0, rotate: 3, scale: 0.96 }}
          animate={{ opacity: 1, rotate: -2, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="garden-photo-placeholder">
            <Sparkles size={28} />
            <span>OUR FAVORITE SCENE</span>
          </div>
          <p>frame 00 · seoul</p>
        </motion.div>
      </header>

      <main className="garden-body">
        <section className="garden-story">
          <div className="garden-story-copy">
            <p className="garden-label">A SMALL STORY</p>
            <h2>평범한 날들이 모여<br />가장 특별한 날이 되었습니다.</h2>
            <div>
              {wedding.invitation.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>
          <div className="garden-film-strip">
            {frames.map((frame, index) => (
              <motion.div
                key={frame}
                className={`garden-film-frame frame-${index + 1}`}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
              >
                <div className="garden-photo-placeholder"><span>{frame}</span></div>
                <p>memory · {frame}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Countdown variant="garden" />

        <section className="garden-details">
          <motion.div
            className="garden-detail-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="garden-label">WHEN</span>
            <CalendarDays size={25} />
            <h3>2026. 10. 24</h3>
            <p>토요일 · 오후 12시 30분</p>
          </motion.div>
          <motion.div
            className="garden-detail-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="garden-label">WHERE</span>
            <MapPin size={25} />
            <h3>{wedding.venue}</h3>
            <p>{wedding.hall}<br />{wedding.address}</p>
            <LocationActions variant="garden" />
          </motion.div>
        </section>

        <section className="garden-accounts">
          <p className="garden-label">A LITTLE THANKS</p>
          <h2>축복의 마음을 전해주세요.</h2>
          <AccountCards variant="garden" />
        </section>
      </main>

      <footer className="garden-footer">
        <span>ROLL 24 · FRAME 2026</span>
        <strong>{wedding.groom} × {wedding.bride}</strong>
      </footer>
    </div>
  );
}

function MidnightCeremony() {
  return (
    <div className="wedding-experience midnight-ceremony">
      <header className="midnight-hero">
        <motion.div
          className="midnight-topline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1 }}
        />
        <div className="midnight-navline">
          <span>SEOUL · 2026</span>
          <Heart size={14} />
          <span>PRIVATE CEREMONY</span>
        </div>

        <motion.div
          className="midnight-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.18 }}
        >
          <p>THE WEDDING OF</p>
          <h1>{wedding.groom}<span>&</span>{wedding.bride}</h1>
          <div className="midnight-date">10 · 24 · 26</div>
        </motion.div>

        <div className="midnight-hero-foot">
          <p>{wedding.venue}</p>
          <p>12:30 PM</p>
        </div>
      </header>

      <main className="midnight-body">
        <section className="midnight-intro">
          <motion.span
            initial={{ height: 0 }}
            whileInView={{ height: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p>INVITATION</p>
          <h2>오늘의 끝에서<br />우리의 시작을 함께해주세요.</h2>
          <div>
            {wedding.invitation.map((line) => <p key={line}>{line}</p>)}
          </div>
        </section>

        <section className="midnight-grid">
          <article>
            <span>01 · DATE</span>
            <CalendarDays size={28} />
            <h3>Saturday<br />October 24</h3>
            <p>2026 · 12:30 PM</p>
          </article>
          <article>
            <span>02 · VENUE</span>
            <MapPin size={28} />
            <h3>{wedding.venue}</h3>
            <p>{wedding.hall}<br />{wedding.address}</p>
            <LocationActions variant="midnight" />
          </article>
        </section>

        <Countdown variant="midnight" />

        <section className="midnight-gift">
          <div>
            <span>03 · WITH GRATITUDE</span>
            <h2>마음을 전하실 곳</h2>
            <p>멀리서 축복해 주시는 마음까지 감사히 간직하겠습니다.</p>
          </div>
          <AccountCards variant="midnight" />
        </section>
      </main>

      <footer className="midnight-footer">
        <Sparkles size={16} />
        <p>SEE YOU UNDER THE SAME LIGHT</p>
        <strong>J & M</strong>
      </footer>
    </div>
  );
}

function Ribbon() {
  return (
    <svg className="rose-ribbon" viewBox="0 0 300 190" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M148 77C115 14 27 10 36 52C43 84 111 93 148 77ZM152 77C185 14 273 10 264 52C257 84 189 93 152 77Z" />
        <path d="M148 77C111 44 61 35 46 49M152 77C189 44 239 35 254 49M146 83C103 113 131 144 73 168L89 143L63 145C101 119 107 90 146 83ZM154 83C197 113 169 144 227 168L211 143L237 145C199 119 193 90 154 83Z" />
        <ellipse cx="150" cy="79" rx="10" ry="8" fill="currentColor" />
      </g>
    </svg>
  );
}

function RoseAtelier() {
  return (
    <div className="wedding-experience rose-atelier added-experience">
      <header className="rose-hero">
        <div className="rose-masthead"><span>THE ATELIER OF US</span><Heart size={16} /><span>EST. 2026</span></div>
        <motion.div className="rose-cover" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="rose-cover-note"><span>NO. 1024</span><p>A little love letter,<br />a lifetime together.</p></div>
          <div className="rose-invitation">
            <Ribbon />
            <p className="collection-label">TOGETHER WITH OUR FAMILIES</p>
            <h1>{wedding.groom}<em>and</em>{wedding.bride}</h1>
            <p className="rose-invite-line">request the pleasure of your company</p>
            <div className="rose-date"><span>OCTOBER</span><strong>24</strong><span>2026</span></div>
            <p>{wedding.venue} · 오후 12시 30분</p>
          </div>
          <div className="rose-cover-note rose-cover-note-right"><span>WITH LOVE</span><p>당신을 우리의<br />시작에 초대합니다.</p></div>
        </motion.div>
        <a className="collection-scroll" href="#rose-letter">OPEN OUR LETTER <ArrowDown size={14} /></a>
      </header>
      <main className="rose-body">
        <section className="rose-letter" id="rose-letter">
          <p className="collection-label">DEAR OUR FAVORITE PEOPLE</p>
          <h2>사랑을 담아,<br /><em>당신에게.</em></h2>
          <div className="collection-message">{wedding.invitation.map((line) => <p key={line}>{line}</p>)}</div>
          <span className="rose-signature">{wedding.groom} & {wedding.bride}</span>
        </section>
        <section className="rose-rendezvous">
          <div className="rose-date-block">
            <p className="collection-label">OUR RENDEZVOUS</p>
            <h2>오래 기다린<br />우리의 하루</h2>
            <p>2026년 10월 24일 토요일<br />오후 12시 30분</p>
            <Countdown variant="rose" />
          </div>
          <div className="rose-venue">
            <MapPin size={25} strokeWidth={1.2} />
            <p className="collection-label">A PLACE TO REMEMBER</p>
            <h3>{wedding.venue}</h3>
            <p>{wedding.hall}<br />{wedding.address}</p>
            <LocationActions variant="rose" />
          </div>
        </section>
        <section className="rose-gratitude">
          <Heart size={22} strokeWidth={1.3} />
          <p className="collection-label">SEALED WITH LOVE</p>
          <h2>마음을 전하실 곳</h2>
          <p>보내주신 따뜻한 마음, 오래도록 간직하겠습니다.</p>
          <AccountCards variant="rose" />
        </section>
      </main>
      <footer className="rose-footer"><span>With love, always.</span><p>{wedding.groom} & {wedding.bride} · 2026. 10. 24</p></footer>
    </div>
  );
}

function CoastalIllustration() {
  return (
    <svg className="coastal-illustration" viewBox="0 0 600 680" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <path fill="#dce7ec" d="M0 0h600v680H0z" />
      <circle cx="410" cy="161" r="65" fill="#ecc768" />
      <path d="M0 318Q170 270 320 316T600 300V680H0Z" fill="#92b8cd" />
      <path d="M0 390Q160 330 330 383T600 365V680H0Z" fill="#4d85b0" />
      <path d="M0 475Q200 383 360 457T600 440V680H0Z" fill="#2855ae" />
      <path d="M0 550Q135 503 293 561T600 513V680H0Z" fill="#153a79" />
      <g stroke="#f7f3e8" strokeWidth="2" opacity=".7">
        <path d="M60 363q50-15 99 0M351 430q58 17 107 0M80 484q72-20 141 0M346 575q62 19 121 0" />
        <path d="m256 238 16-84 58 84h-74Zm16-84v113m-37-20h113l-19 20h-80l-14-20Z" fill="#f7f3e8" opacity="1" />
      </g>
      <path d="M0 622q150-38 289 22t311-17v53H0Z" fill="#e8d8ae" />
    </svg>
  );
}

function CoastalPostcard() {
  return (
    <div className="wedding-experience coastal-postcard added-experience">
      <header className="coastal-hero">
        <div className="coastal-masthead"><span>A POSTCARD FOR YOU</span><span>SEOUL, KOREA · 2026</span></div>
        <motion.div className="coastal-card" initial={{ opacity: 0, rotate: -2, y: 20 }} animate={{ opacity: 1, rotate: 0, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="coastal-picture">
            <CoastalIllustration />
            <span className="coastal-picture-caption">Somewhere, together.</span>
            <span className="coastal-edition">THE LOVE LETTER SERIES — Nº 24</span>
          </div>
          <div className="coastal-address-side">
            <div className="coastal-postage"><span>J & M<br /><Heart size={20} strokeWidth={1.2} /><small>24 OCT</small></span><i>SEOUL<br />2026.10.24</i></div>
            <p className="collection-label">TO. OUR DEAREST PEOPLE</p>
            <h1>{wedding.groom}<em>&</em>{wedding.bride}</h1>
            <p className="coastal-greeting">우리의 새로운 항해에<br />당신을 초대합니다.</p>
            <div className="coastal-address-lines"><p>2026. 10. 24. SAT</p><p>12:30 PM · {wedding.venue}</p></div>
            <a className="collection-scroll" href="#coastal-story">READ OUR POSTCARD <ArrowDown size={14} /></a>
          </div>
        </motion.div>
      </header>
      <main className="coastal-body">
        <section className="coastal-story" id="coastal-story">
          <div><p className="collection-label">FROM US, WITH LOVE</p><h2>어디에 있든,<br /><em>함께라는 목적지.</em></h2></div>
          <div className="collection-message">{wedding.invitation.map((line) => <p key={line}>{line}</p>)}</div>
        </section>
        <section className="coastal-itinerary">
          <div className="coastal-itinerary-heading"><span>YOUR DESTINATION</span><ArrowUpRight size={28} /></div>
          <div className="coastal-itinerary-grid">
            <div><p className="collection-label">01 / WHEN</p><h2>October 24</h2><p>2026년 10월 24일 토요일<br />오후 12시 30분</p></div>
            <div><p className="collection-label">02 / WHERE</p><h2>{wedding.venue}</h2><p>{wedding.hall}<br />{wedding.address}</p><LocationActions variant="coastal" /></div>
          </div>
        </section>
        <section className="coastal-counting"><p className="collection-label">COUNTING DOWN TO OUR NEXT CHAPTER</p><Countdown variant="coastal" /></section>
        <section className="coastal-gift">
          <div><p className="collection-label">A NOTE OF THANKS</p><h2>멀리서도 닿는 마음</h2><p>함께 기뻐해 주시는 모든 마음에 감사드립니다.</p></div>
          <AccountCards variant="coastal" />
        </section>
      </main>
      <footer className="coastal-footer"><span>See you there!</span><p>Sent with love, {wedding.groom} & {wedding.bride}</p><Heart size={18} /></footer>
    </div>
  );
}

function ModernVow() {
  return (
    <div className="wedding-experience modern-vow added-experience">
      <header className="modern-hero">
        <div className="modern-masthead"><span>{wedding.groom.toUpperCase()} + {wedding.bride.toUpperCase()}</span><span>THE WEDDING / 2026</span></div>
        <motion.div className="modern-headline" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="collection-label">GOOD TOGETHER. BETTER FOREVER.</p>
          <h1>WE DO<span>FOREVER<span className="modern-asterisk" aria-hidden="true">✳</span></span></h1>
          <div className="modern-hero-bottom"><p>우리, 결혼합니다.<br />가장 즐거운 시작에 함께해 주세요.</p><a href="#modern-ticket" className="modern-jump">YOU'RE INVITED <ArrowDown size={20} /></a></div>
        </motion.div>
        <div className="modern-date-band"><span>SAVE THE DATE</span><strong>24.10.2026</strong><span>SEOUL, KR</span></div>
      </header>
      <main className="modern-body">
        <section className="modern-story">
          <span className="modern-section-number">01 / THE TWO OF US</span>
          <div>
            <h2>같이 웃고,<br />같이 살고,<br /><span>같이 늙어가기.</span></h2>
            <div className="collection-message">{wedding.invitation.map((line) => <p key={line}>{line}</p>)}</div>
            <p className="modern-names">{wedding.groom} <span>+</span> {wedding.bride}</p>
          </div>
        </section>
        <section className="modern-event" id="modern-ticket">
          <span className="modern-section-number">02 / YOUR INVITATION</span>
          <div className="modern-ticket">
            <div className="modern-ticket-main">
              <p className="collection-label">ADMIT ONE VERY SPECIAL YOU</p>
              <h2>LET'S<br />CELEBRATE.</h2>
              <div className="modern-ticket-details">
                <div><span>WHEN</span><strong>2026. 10. 24. SAT</strong><p>오후 12시 30분</p></div>
                <div><span>WHERE</span><strong>{wedding.venue}</strong><p>{wedding.hall}<br />{wedding.address}</p></div>
              </div>
              <LocationActions variant="modern" />
            </div>
            <div className="modern-ticket-stub">
              <span>THE BIG DAY</span>
              <strong>10<br />24</strong>
              <Heart size={30} />
              <p>{wedding.groom}<br />+ {wedding.bride}</p>
              <div className="modern-barcode" aria-hidden="true" />
              <small>J-M · 2026 · LOVE</small>
            </div>
          </div>
        </section>
        <section className="modern-counting"><h2>CAN'T WAIT.</h2><Countdown variant="modern" /></section>
        <section className="modern-gift">
          <div><span className="modern-section-number">03 / ALL THE LOVE</span><h2>고마운 마음,<br />잊지 않을게요.</h2><p>축하해 주시는 모든 분들께 진심으로 감사드립니다.</p></div>
          <AccountCards variant="modern" />
        </section>
      </main>
      <footer className="modern-footer"><strong>LOVE, ALWAYS<span>↗</span></strong><p>{wedding.groom} + {wedding.bride} / 2026. 10. 24</p></footer>
    </div>
  );
}

function SelectedExperience({ theme }: WeddingExperienceProps) {
  if (theme === 'garden-film') return <GardenFilm />;
  if (theme === 'midnight-ceremony') return <MidnightCeremony />;
  if (theme === 'rose-atelier') return <RoseAtelier />;
  if (theme === 'coastal-postcard') return <CoastalPostcard />;
  if (theme === 'modern-vow') return <ModernVow />;
  return <PaperLetter />;
}

export default function WeddingExperience({ theme }: WeddingExperienceProps) {
  return <MotionConfig reducedMotion="user"><SelectedExperience theme={theme} /></MotionConfig>;
}
