import { Check, Palette, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { ThemeId, WEDDING_THEMES } from '../theme';

interface ThemePickerProps {
  value: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export default function ThemePicker({ value, onChange }: ThemePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 top-4 z-[90] lg:right-8 lg:top-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="theme-picker-trigger"
        aria-label="청첩장 테마 선택"
      >
        <Palette className="h-4 w-4" />
        <span>THEME</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="테마 선택 닫기"
              className="fixed inset-0 z-[91] bg-black/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="theme-picker-panel"
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-black/5 px-5 py-5">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.35em] text-luxury-gold">WEDDING STYLE</p>
                  <h2 className="serif mt-1 text-2xl italic">Choose a theme</h2>
                  <p className="mt-1 text-xs text-luxury-muted">카드를 눌러 실시간으로 비교할 수 있습니다.</p>
                </div>
                <button
                  type="button"
                  className="rounded-full p-2 transition-colors hover:bg-black/5"
                  onClick={() => setOpen(false)}
                  aria-label="닫기"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="custom-scrollbar max-h-[70vh] space-y-3 overflow-y-auto p-4">
                {WEDDING_THEMES.map((theme) => {
                  const selected = value === theme.id;
                  return (
                    <button
                      type="button"
                      key={theme.id}
                      onClick={() => onChange(theme.id)}
                      className={`theme-preview-card ${selected ? 'is-selected' : ''}`}
                    >
                      <div className="theme-preview-canvas" style={{ background: theme.swatches[0] }}>
                        <div
                          className="theme-preview-line"
                          style={{ background: theme.swatches[1] }}
                        />
                        <div className="theme-preview-copy" style={{ color: theme.swatches[2] }}>
                          <span>Jihoon</span>
                          <em style={{ color: theme.swatches[1] }}>&</em>
                          <span>Minji</span>
                        </div>
                        <div className="theme-preview-dots">
                          {theme.swatches.map((color) => (
                            <span key={color} style={{ background: color }} />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-1 items-start justify-between gap-3 text-left">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="serif text-lg italic">{theme.name}</span>
                            {selected && (
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold text-white">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-luxury-gold">
                            {theme.subtitle}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-luxury-muted">{theme.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-black/5 px-5 py-4 text-[11px] leading-relaxed text-luxury-muted">
                선택한 테마는 이 브라우저에 저장되어 다음 방문에도 유지됩니다.
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
