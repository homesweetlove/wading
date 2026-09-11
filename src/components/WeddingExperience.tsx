import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
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

function AccountCards({ variant }: { variant: 'paper' | 'garden' | 'midnight' }) {
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

function LocationActions({ variant }: { variant: 'paper' | 'garden' | 'midnight' }) {
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

function Countdown({ variant }: { variant: 'paper' | 'garden' | 'midnight' }) {
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

export default function WeddingExperience({ theme }: WeddingExperienceProps) {
  if (theme === 'garden-film') return <GardenFilm />;
  if (theme === 'midnight-ceremony') return <MidnightCeremony />;
  return <PaperLetter />;
}
