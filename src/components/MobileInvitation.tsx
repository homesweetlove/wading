import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Calendar, Clock, Phone, Share2, MessageSquare, Gift, ChevronRight } from 'lucide-react';
import ThreeScene from './ThreeScene';
import Button3D from './Button3D';
import EmotionalCouple from './EmotionalCouple';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';

export default function MobileInvitation() {
  const [dDay, setDDay] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [guestMessages, setGuestMessages] = useState<{name: string, text: string}[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const target = new Date('2026-10-24T12:30:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) return;
      setDDay({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c5a059', '#1a1a1a']
    });
  };

  return (
    <div className="w-full bg-luxury-bg min-h-screen pb-32">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10"
        >
          <span className="text-luxury-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Our Wedding</span>
          <h1 className="display text-6xl font-light mb-2">Jihoon & Minji</h1>
          <p className="serif italic text-xl text-luxury-muted">2026. 10. 24</p>
        </motion.div>
        
        <div className="w-full h-1/2 relative">
          <ThreeScene />
        </div>

        <div className="flex gap-4 mt-16 z-10">
          {Object.entries(dDay).map(([label, value], i) => (
            <div key={i} className="text-center">
              <div className="text-xl font-light text-luxury-gold">{value}</div>
              <div className="text-[8px] tracking-widest opacity-40 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <div className="px-6 space-y-20">
        <section className="text-center space-y-8">
          <Heart className="w-6 h-6 mx-auto text-luxury-gold opacity-30" />
          <h2 className="serif text-3xl italic">초대합니다</h2>
          <p className="text-luxury-ink/80 leading-relaxed">
            서로의 다름을 인정하고<br />
            서로의 부족함을 채워주며<br />
            하나가 되려 합니다.
          </p>
        </section>

        <section className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/40 shadow-xl">
          <h3 className="serif text-2xl italic mb-8 text-center">오시는 길</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-luxury-gold shrink-0" />
              <div>
                <p className="font-bold">그랜드 하얏트 서울</p>
                <p className="text-xs text-luxury-muted">서울특별시 용산구 소월로 322</p>
              </div>
            </div>
            <div className="aspect-video bg-luxury-gold/5 rounded-2xl flex items-center justify-center border border-luxury-gold/10">
              <span className="text-4xl animate-bounce">📍</span>
            </div>
            <EmotionalCouple />
            <div className="grid grid-cols-2 gap-3">
              <Button3D text="전화하기" width={1.5} onClick={() => alert('전화 연결')} />
              <Button3D text="지도보기" width={1.5} onClick={() => alert('지도 열기')} />
            </div>
          </div>
        </section>

        <section className="bg-luxury-ink text-white rounded-[2.5rem] p-8">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-5 h-5 text-luxury-gold" />
            <h3 className="serif text-2xl italic">방명록</h3>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="성함" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <textarea 
              placeholder="축하 메시지" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm h-24 resize-none"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
            <Button3D text="메시지 남기기" onClick={() => {
              if(newName && newMessage) {
                setGuestMessages([{name: newName, text: newMessage}, ...guestMessages]);
                setNewName(''); setNewMessage(''); handleConfetti();
              }
            }} />
          </div>
          <div className="mt-8 space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
            {guestMessages.map((m, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-luxury-gold font-bold mb-1">{m.name}</p>
                <p className="text-xs opacity-70">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 justify-center">
            <Gift className="w-5 h-5 text-luxury-gold" />
            <h3 className="serif text-2xl italic">마음 전하실 곳</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: '신랑측', acc: '신한 110-123-456789' },
              { label: '신부측', acc: '국민 123456-01-123456' }
            ].map((item, i) => (
              <div key={i} className="bg-white/50 p-5 rounded-2xl flex justify-between items-center border border-luxury-gold/10">
                <div>
                  <span className="text-[10px] font-bold text-luxury-gold uppercase">{item.label}</span>
                  <p className="text-sm font-bold">{item.acc}</p>
                </div>
                <button 
                  onClick={() => { navigator.clipboard.writeText(item.acc); alert('복사되었습니다.'); }}
                  className="p-2 bg-luxury-gold/10 rounded-lg text-luxury-gold"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating RSVP */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-10">
        <Button3D text="축하의 마음 전하기" onClick={handleConfetti} />
      </div>
    </div>
  );
}
