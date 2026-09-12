/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ErrorBoundary from './components/ErrorBoundary';
import ThemePicker from './components/ThemePicker';
import WeddingExperience from './components/WeddingExperience';
import { DEFAULT_THEME, isThemeId } from './theme';
import type { ThemeId } from './theme';

const THEME_STORAGE_KEY = 'wading_wedding_theme';

function getInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  try {
    const requested = new URLSearchParams(window.location.search).get('theme');
    if (isThemeId(requested)) return requested;

    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export default function App() {
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable in private/restricted browsing modes.
    }
  }, [theme]);

  return (
    <ErrorBoundary>
      <div className="wading-app">
        <ThemePicker value={theme} onChange={setTheme} />
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <WeddingExperience theme={theme} />
          </motion.div>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
