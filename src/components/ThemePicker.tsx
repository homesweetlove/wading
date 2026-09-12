import { Check, Palette, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { WEDDING_THEMES } from '../theme';
import type { ThemeId } from '../theme';

interface ThemePickerProps {
  value: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export default function ThemePicker({ value, onChange }: ThemePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = WEDDING_THEMES.find((theme) => theme.id === value) ?? WEDDING_THEMES[0];

  return (
    <div className="wedding-theme-switcher">
      <button
        type="button"
        className="wedding-theme-trigger"
        onClick={() => setOpen(true)}
        aria-label="청첩장 테마 선택"
        aria-expanded={open}
        aria-controls={open ? 'wedding-theme-panel' : undefined}
      >
        <Palette size={15} />
        <span>{selected.name}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="wedding-theme-backdrop"
              aria-label="테마 선택 닫기"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              id="wedding-theme-panel"
              className="wedding-theme-panel"
              aria-label="청첩장 테마"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <header>
                <div>
                  <span>WEDDING EXPERIENCE</span>
                  <h2>분위기를 골라보세요.</h2>
                  <p>{WEDDING_THEMES.length}가지 디자인, 서로 다른 레이아웃과 움직임.</p>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="닫기"><X size={18} /></button>
              </header>

              <div className="wedding-theme-list">
                {WEDDING_THEMES.map((theme) => {
                  const active = value === theme.id;
                  return (
                    <button
                      type="button"
                      key={theme.id}
                      className={`wedding-theme-card ${active ? 'is-active' : ''}`}
                      aria-pressed={active}
                      onClick={() => {
                        onChange(theme.id);
                        setOpen(false);
                      }}
                    >
                      <div className={`wedding-theme-mini mini-${theme.id}`} style={{ background: theme.swatches[0] }} aria-hidden="true">
                        <span style={{ background: theme.swatches[1] }} />
                        <strong style={{ color: theme.swatches[2] }}>J <em style={{ color: theme.swatches[1] }}>&</em> M</strong>
                        <i style={{ borderColor: theme.swatches[1] }} />
                      </div>
                      <div className="wedding-theme-card-copy">
                        <div>
                          <strong>{theme.name}</strong>
                          {active && <span className="wedding-theme-check"><Check size={12} /></span>}
                        </div>
                        <small>{theme.subtitle}</small>
                        <p>{theme.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
