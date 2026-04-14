import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Heart, Phone, Share2, MessageSquare, Gift, ChevronRight, Music } from 'lucide-react';
import ThreeScene from './ThreeScene';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={cn("py-16 px-6 max-w-4xl mx-auto", className)}
  >
    {children}
  </motion.section>
);

export default function InvitationContent() {
  const [dDay, setDDay] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [guestMessages, setGuestMessages] = useState<{name: string, text: string}[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const target = new Date('2026-10-24T12:30:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
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
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c5a059', '#f5f2ed', '#1a1a1a']
    });
  };

  const addMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newMessage) {
      setGuestMessages([{ name: newName, text: newMessage }, ...guestMessages]);
      setNewName('');
      setNewMessage('');
      handleConfetti();
    }
  };

  return (
    <div className="relative w-full">
      {/* PC Side Rail - Left */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-between py-10 border-r border-luxury-gold/10 z-50 bg-luxury-bg/50 backdrop-blur-sm">
        <div className="vertical-rail text-[10px] tracking-[0.5em] font-bold text-luxury-gold uppercase">
          Eternal Vows 2026
        </div>
        <div className="flex flex-col gap-6">
          <button className="p-2 hover:text-luxury-gold transition-colors"><Heart className="w-4 h-4" /></button>
          <button className="p-2 hover:text-luxury-gold transition-colors"><Music className="w-4 h-4" /></button>
          <button className="p-2 hover:text-luxury-gold transition-colors"><Share2 className="w-4 h-4" /></button>
        </div>
        <div className="vertical-rail text-[10px] tracking-[0.5em] font-bold text-luxury-gold uppercase">
          Jihoon & Minji
        </div>
      </div>

      {/* Hero Section - PC Editorial Style */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden relative lg:pl-20">
        {/* Background Large Text for PC */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
          <h1 className="display text-[30vw] leading-none text-luxury-gold uppercase font-black">WEDDING</h1>
        </div>

        <div className="w-full lg:w-[45%] text-center lg:text-left z-10 px-6 lg:pl-20 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span className="text-luxury-gold text-xs lg:text-sm uppercase font-bold tracking-[0.8em] mb-8 block">
              Invitation to Our Beginning
            </span>
            <h1 className="display text-7xl lg:text-[10rem] font-light leading-[0.85] tracking-tighter mb-6">
              Jihoon<br />
              <span className="serif italic text-5xl lg:text-8xl text-luxury-gold">&</span> Minji
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 mt-12">
              <div className="space-y-1">
                <p className="text-[10px] tracking-widest text-luxury-gold font-bold uppercase">Date</p>
                <p className="serif italic text-2xl lg:text-3xl">2026. 10. 24</p>
              </div>
              <div className="hidden lg:block w-[1px] h-10 bg-luxury-gold/20" />
              <div className="space-y-1">
                <p className="text-[10px] tracking-widest text-luxury-gold font-bold uppercase">Time</p>
                <p className="serif italic text-2xl lg:text-3xl">12:30 PM</p>
              </div>
              <div className="hidden lg:block w-[1px] h-10 bg-luxury-gold/20" />
              <div className="space-y-1">
                <p className="text-[10px] tracking-widest text-luxury-gold font-bold uppercase">Venue</p>
                <p className="serif italic text-2xl lg:text-3xl">Grand Hyatt Seoul</p>
              </div>
            </div>
          </motion.div>

          {/* PC D-Day Counter - More Dramatic */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex gap-8 justify-center lg:justify-start pt-10"
          >
            {[
              { label: 'DAYS', value: dDay.days },
              { label: 'HOURS', value: dDay.hours },
              { label: 'MINUTES', value: dDay.minutes },
              { label: 'SECONDS', value: dDay.seconds }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl lg:text-5xl font-light text-luxury-gold group-hover:scale-110 transition-transform duration-500">{item.value}</div>
                <div className="text-[8px] lg:text-[10px] tracking-[0.3em] opacity-40 font-bold mt-2">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="w-full lg:w-[55%] h-[500px] lg:h-screen relative">
          <ThreeScene />
          {/* PC Floating Accents */}
          <div className="hidden lg:block absolute top-1/4 right-10 p-8 glass-card rounded-full animate-float">
            <Heart className="w-8 h-8 text-luxury-gold fill-current" />
          </div>
          <div className="hidden lg:block absolute bottom-1/4 left-10 p-6 glass-card rounded-full animate-float" style={{ animationDelay: '2s' }}>
            <Music className="w-6 h-6 text-luxury-gold" />
          </div>
        </div>
      </section>

      {/* PC Content Grid - More Flashy */}
      <div className="lg:px-20 lg:pl-40 max-w-[1600px] mx-auto space-y-32 pb-40">
        
        {/* Intro Section - PC Centered & Wide */}
        <Section className="text-center max-w-4xl">
          <div className="relative inline-block mb-12">
            <Heart className="w-10 h-10 text-luxury-gold opacity-30 animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-luxury-gold/20 rounded-full" />
          </div>
          <h2 className="serif text-5xl lg:text-7xl italic mb-12 gold-gradient-text">Our Invitation</h2>
          <div className="space-y-8 text-luxury-ink/80 leading-relaxed text-xl lg:text-2xl serif italic">
            <p>
              서로가 마주보며 다져온 사랑을<br />
              이제 함께 한 곳을 바라보며 걸어가려 합니다.
            </p>
            <p>
              저희 두 사람이 사랑의 이름으로 지키고자 하는<br />
              이 소중한 약속의 자리에 함께하시어<br />
              축복해 주시면 감사하겠습니다.
            </p>
          </div>
        </Section>

        {/* Bento Grid Style for Info */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 px-6 lg:px-0">
          
          {/* Location - Large Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="lg:col-span-7 glass-card rounded-[4rem] p-12 lg:p-20 space-y-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-luxury-gold/10 transition-colors" />
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="serif text-4xl lg:text-5xl italic">Location</h3>
            </div>

            <div className="space-y-4">
              <p className="text-3xl lg:text-4xl font-bold">그랜드 하얏트 서울, 그랜드 볼룸</p>
              <p className="text-lg text-luxury-muted tracking-wide">서울특별시 용산구 소월로 322</p>
            </div>
            
            <div className="aspect-[21/9] bg-luxury-gold/5 rounded-[2rem] flex items-center justify-center border border-luxury-gold/10 relative overflow-hidden">
              <div className="text-8xl group-hover:scale-110 transition-transform duration-700">📍</div>
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold/20 to-transparent" />
              <div className="absolute bottom-6 text-xs tracking-[0.5em] font-bold text-luxury-gold">HYATT SEOUL EXPERIENCE</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <button className="flex items-center justify-center gap-3 py-5 bg-white/50 hover:bg-white rounded-3xl text-sm font-bold shadow-xl transition-all active:scale-95">
                <Phone className="w-5 h-5" /> CALL VENUE
              </button>
              <button className="flex items-center justify-center gap-3 py-5 bg-luxury-gold text-white rounded-3xl text-sm font-bold shadow-xl hover:brightness-110 transition-all active:scale-95">
                <Share2 className="w-5 h-5" /> SHARE MAP
              </button>
            </div>
          </motion.div>

          {/* Right Column Bento Items */}
          <div className="lg:col-span-5 flex flex-col gap-8 mt-8 lg:mt-0">
            {/* Guestbook Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="flex-1 bg-luxury-ink text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold" />
              <div className="flex items-center gap-4 mb-10">
                <MessageSquare className="w-8 h-8 text-luxury-gold" />
                <h3 className="serif text-3xl italic">Guestbook</h3>
              </div>
              
              <form onSubmit={addMessage} className="space-y-4 mb-8">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                />
                <textarea 
                  placeholder="Leave a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm h-32 focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                />
                <button className="w-full py-5 bg-luxury-gold text-white rounded-2xl font-bold text-sm shadow-lg shadow-luxury-gold/20">
                  SEND BLESSINGS
                </button>
              </form>

              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {guestMessages.map((msg, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/5 p-5 rounded-3xl border border-white/10"
                    >
                      <p className="text-xs text-luxury-gold font-bold mb-2 uppercase tracking-widest">{msg.name}</p>
                      <p className="text-sm opacity-70 leading-relaxed">{msg.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Gift Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card rounded-[4rem] p-12 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <Gift className="w-8 h-8 text-luxury-gold" />
                <h3 className="serif text-3xl italic">Registry</h3>
              </div>
              <div className="space-y-4">
                {[
                  { type: 'Groom', bank: 'SHINHAN', acc: '110-123-456789', owner: 'Jihoon Kim' },
                  { type: 'Bride', bank: 'KB BANK', acc: '123456-01-123456', owner: 'Minji Park' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/40 p-6 rounded-3xl flex justify-between items-center border border-luxury-gold/10 group">
                    <div>
                      <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.3em]">{item.type}</span>
                      <p className="font-bold text-lg mt-1">{item.bank}</p>
                      <p className="text-sm opacity-60">{item.acc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${item.bank} ${item.acc}`);
                        alert('Copied to clipboard');
                      }}
                      className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PC Footer - Cinematic */}
      <footer className="py-40 text-center space-y-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <h2 className="display text-[20vw] whitespace-nowrap text-luxury-gold uppercase font-black">THANK YOU</h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-6xl"
        >
          🌸
        </motion.div>
        
        <div className="space-y-4 z-10 relative">
          <h3 className="display text-5xl lg:text-7xl font-light">See You There</h3>
          <p className="serif italic text-2xl lg:text-3xl opacity-40">With all our love, Jihoon & Minji</p>
        </div>

        <div className="flex justify-center gap-8 pt-12 z-10 relative">
          <button className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-xl flex items-center justify-center text-luxury-gold shadow-2xl hover:scale-110 transition-transform">
            <Music className="w-6 h-6" />
          </button>
          <button className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-xl flex items-center justify-center text-luxury-gold shadow-2xl hover:scale-110 transition-transform">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </footer>

      {/* Mobile RSVP Floating Button - Hidden on PC */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <button 
          onClick={handleConfetti}
          className="bg-luxury-ink text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 active:scale-95 transition-transform"
        >
          <Heart className="w-4 h-4 text-luxury-gold fill-current" />
          <span className="text-xs font-bold tracking-[0.2em]">RSVP NOW</span>
        </button>
      </div>
    </div>
  );
}

