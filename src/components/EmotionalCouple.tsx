import { motion } from 'motion/react';

export default function EmotionalCouple() {
  return (
    <div className="w-full h-80 relative flex items-center justify-center overflow-hidden py-10">
      <div className="relative w-full max-w-2xl flex justify-center items-center gap-4 md:gap-10">
        {/* Groom Image */}
        <motion.div
          initial={{ x: -200, opacity: 0, rotate: -5 }}
          whileInView={{ x: 0, opacity: 1, rotate: -2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-32 h-48 md:w-48 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
        >
          <img 
            src="https://images.unsplash.com/photo-1550005816-091e11a30064?auto=format&fit=crop&q=80&w=800" 
            alt="Groom" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay" />
        </motion.div>

        {/* Bride Image */}
        <motion.div
          initial={{ x: 200, opacity: 0, rotate: 5 }}
          whileInView={{ x: 0, opacity: 1, rotate: 2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-32 h-48 md:w-48 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
        >
          <img 
            src="https://images.unsplash.com/photo-1546193430-c2d20e1cb9a1?auto=format&fit=crop&q=80&w=800" 
            alt="Bride" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay" />
        </motion.div>
      </div>
    </div>
  );
}
