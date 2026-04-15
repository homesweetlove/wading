/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PCInvitation from './components/PCInvitation';
import MobileInvitation from './components/MobileInvitation';
import Background3D from './components/Background3D';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-luxury-bg flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="display text-4xl text-luxury-gold tracking-tighter">Eternal Vows</div>
              <div className="w-48 h-[1px] bg-luxury-gold/20 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-luxury-gold"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <p className="serif italic text-sm opacity-40">Loading our story...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen relative">
        <Background3D />
        {isMobile ? <MobileInvitation /> : <PCInvitation />}
      </main>
    </ErrorBoundary>
  );
}





