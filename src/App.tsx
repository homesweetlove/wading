/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PCInvitation from './components/PCInvitation';
import MobileInvitation from './components/MobileInvitation';
import Background3D from './components/Background3D';
import ErrorBoundary from './components/ErrorBoundary';
import ThemePicker from './components/ThemePicker';
import { DEFAULT_THEME, isThemeId, WEDDING_THEMES } from './theme';
import type { ThemeId } from './theme';

const THEME_STORAGE_KEY = 'wading_wedding_theme';

function getInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme);

  const selectedTheme = WEDDING_THEMES.find((item) => item.id === theme) ?? WEDDING_THEMES[0];
  const accentColor = selectedTheme.swatches[1];

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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // localStorage may be unavailable in restricted/private browsing environments.
    }
  }, [theme]);

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
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
              <p className="serif italic text-sm opacity-40">Loading our story...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen relative theme-transition">
        <Background3D accentColor={accentColor} />
        <ThemePicker value={theme} onChange={setTheme} />
        {isMobile ? <MobileInvitation /> : <PCInvitation />}
      </main>
    </ErrorBoundary>
  );
}
