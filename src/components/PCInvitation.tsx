import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Calendar, Clock, MessageSquare, Gift, Share2, Music } from 'lucide-react';
import ThreeScene from './ThreeScene';
import Button3D from './Button3D';
import EmotionalCouple from './EmotionalCouple';
import confetti from 'canvas-confetti';

export default function PCInvitation() {
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
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#c5a059', '#ffffff', '#1a1a1a']
    });
  };

  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col items-center">
      {/* PC Header */}
      <header className="fixed top-0 w-full h-24 flex items-center justify-between px-20 z-50 bg-luxury-bg/80 backdrop-blur-md border-b border-luxury-gold/10">
        <div className="display text-2xl tracking-tighter">Eternal Vows</div>
        <nav className="flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-luxury-muted">
          <a href="#intro" className="hover:text-luxury-gold transition-colors">Invitation</a>
          <a href="#location" className="hover:text-luxury-gold transition-colors">Location</a>
          <a href="#guestbook" className="hover:text-luxury-gold transition-colors">Guestbook</a>
          <a href="#registry" className="hover:text-luxury-gold transition-colors">Registry</a>
        </nav>
        <div className="flex gap-4">
          <Music className="w-4 h-4 text-luxury-gold cursor-pointer" />
          <Share2 className="w-4 h-4 text-luxury-gold cursor-pointer" />
        </div>
      </header>

      {/* PC Hero */}
      <section className="h-screen w-full flex items-center justify-center px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
          <h1 className="display text-[40vw] font-black uppercase">2026</h1>
        </div>

        <div className="w-1/2 space-y-12 z-10">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-luxury-gold text-sm font-bold tracking-[1em] uppercase mb-8 block">Save The Date</span>
            <h1 className="display text-[12rem] font-light leading-[0.8] tracking-tighter">
              Jihoon<br />
              <span className="serif italic text-8xl text-luxury-gold">&</span> Minji
            </h1>
          </motion.div>

          <div className="flex gap-12 pt-10">
            {[
              { label: 'DAYS', value: dDay.days },
              { label: 'HOURS', value: dDay.hours },
              { label: 'MINUTES', value: dDay.minutes },
              { label: 'SECONDS', value: dDay.seconds }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-light text-luxury-gold">{item.value}</div>
                <div className="text-[10px] tracking-[0.4em] opacity-40 font-bold mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 h-full flex items-center justify-center relative">
          <div className="w-full h-[70%]">
            <ThreeScene />
          </div>
        </div>
      </section>

      {/* PC Content Sections */}
      <main className="w-full max-w-7xl px-20 space-y-40 pb-40">
        
        <section id="intro" className="text-center space-y-12 py-20">
          <Heart className="w-12 h-12 mx-auto text-luxury-gold opacity-20 animate-pulse" />
          <h2 className="serif text-7xl italic gold-gradient-text">Our Invitation</h2>
          <div className="serif italic text-3xl leading-relaxed text-luxury-ink/70 space-y-8">
            <p>서로가 마주보며 다져온 사랑을</p>
            <p>이제 함께 한 곳을 바라보며 걸어가려 합니다.</p>
            <p>저희 두 사람이 사랑의 이름으로 지키고자 하는</p>
            <p>이 소중한 약속의 자리에 함께하시어 축복해 주시면 감사하겠습니다.</p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-20">
          {/* Location */}
          <section id="location" className="glass-card rounded-[5rem] p-20 space-y-12">
            <div className="flex items-center gap-6">
              <MapPin className="w-10 h-10 text-luxury-gold" />
              <h3 className="serif text-5xl italic">Location</h3>
            </div>
            <div className="space-y-4">
              <p className="text-4xl font-bold">그랜드 하얏트 서울</p>
              <p className="text-xl text-luxury-muted">서울특별시 용산구 소월로 322</p>
            </div>
            <div className="aspect-video bg-luxury-gold/5 rounded-[3rem] flex items-center justify-center border border-luxury-gold/10 relative overflow-hidden group">
              <div className="text-9xl group-hover:scale-110 transition-transform duration-1000">📍</div>
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold/20 to-transparent" />
            </div>
            <EmotionalCouple />
            <div className="grid grid-cols-2 gap-6">
              <Button3D text="CALL VENUE" onClick={() => alert('Calling...')} />
              <Button3D text="GOOGLE MAPS" onClick={() => alert('Opening Maps...')} />
            </div>
          </section>

          {/* Guestbook */}
          <section id="guestbook" className="bg-luxury-ink text-white rounded-[5rem] p-20 flex flex-col">
            <div className="flex items-center gap-6 mb-12">
              <MessageSquare className="w-10 h-10 text-luxury-gold" />
              <h3 className="serif text-5xl italic">Guestbook</h3>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if(newName && newMessage) {
                setGuestMessages([{name: newName, text: newMessage}, ...guestMessages]);
                setNewName(''); setNewMessage(''); handleConfetti();
              }
            }} className="space-y-6 mb-12">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-luxury-gold transition-colors"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
              <textarea 
                placeholder="Leave a message..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg h-40 resize-none focus:outline-none focus:border-luxury-gold transition-colors"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
              />
              <Button3D text="SEND MESSAGE" onClick={() => {}} />
            </form>
            <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar max-h-[400px]">
              <AnimatePresence>
                {guestMessages.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10"
                  >
                    <p className="text-sm text-luxury-gold font-bold mb-2 uppercase tracking-widest">{m.name}</p>
                    <p className="text-lg opacity-80 leading-relaxed">{m.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* Registry */}
        <section id="registry" className="glass-card rounded-[5rem] p-20 text-center space-y-16">
          <div className="space-y-4">
            <Gift className="w-12 h-12 mx-auto text-luxury-gold" />
            <h3 className="serif text-6xl italic">Registry</h3>
            <p className="text-xl text-luxury-muted">축복의 마음을 담아 전해주시는 소중한 정성을 잊지 않겠습니다.</p>
          </div>
          <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              { label: 'Groom', bank: 'SHINHAN BANK', acc: '110-123-456789', owner: 'Jihoon Kim' },
              { label: 'Bride', bank: 'KB BANK', acc: '123456-01-123456', owner: 'Minji Park' }
            ].map((item, i) => (
              <div key={i} className="bg-white/40 p-10 rounded-[3rem] border border-luxury-gold/10 space-y-6">
                <span className="text-xs font-bold text-luxury-gold uppercase tracking-[0.5em]">{item.label}</span>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{item.bank}</p>
                  <p className="text-xl opacity-60">{item.acc}</p>
                  <p className="text-sm opacity-40">예금주: {item.owner}</p>
                </div>
                <Button3D text="COPY ACCOUNT" onClick={() => { navigator.clipboard.writeText(item.acc); alert('Copied!'); }} />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* PC Footer */}
      <footer className="w-full py-40 bg-luxury-ink text-white text-center space-y-12">
        <div className="display text-8xl opacity-10">THANK YOU</div>
        <div className="space-y-4">
          <h3 className="display text-6xl font-light">See You Soon</h3>
          <p className="serif italic text-3xl opacity-40">Jihoon & Minji</p>
        </div>
        <div className="flex justify-center gap-12 pt-10">
          <Heart className="w-8 h-8 text-luxury-gold animate-bounce" />
        </div>
      </footer>
    </div>
  );
}
