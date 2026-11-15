import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArchiveMedia, ARCHIVE_URL } from '../services/supabase';

interface ArchiveModalProps {
  item: ArchiveMedia | null;
  onClose: () => void;
}

export const hasReview = (item: ArchiveMedia) => Boolean(item.review?.trim());

export const ArchiveModal: React.FC<ArchiveModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;

    document.body.classList.add('lightbox-open');
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('lightbox-open');
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (() => {
        const paragraphs = (item.review ?? '')
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-natural-text/30 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="archive-modal-title"
              className="w-full max-w-4xl rounded-[var(--radius-ui)] overflow-hidden border border-natural-border bg-surface-bg text-natural-text shadow-ui flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              {/* COVER */}
              <div className="w-full md:w-[260px] shrink-0 p-6 md:p-8 flex flex-row md:flex-col gap-4 border-b md:border-b-0 md:border-r border-natural-border">
                <div
                  className="w-24 md:w-full aspect-[3/4] shrink-0 overflow-hidden border border-natural-border bg-black"
                  style={{ borderRadius: 'calc(var(--radius-ui) - 4px)' }}
                >
                  <img
                    src={`${ARCHIVE_URL}${item.image_filename}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 font-mono text-[11px] text-text-muted uppercase tracking-wider self-end md:self-auto">
                  <div>{item.type}</div>
                  {item.displayYear && <div className="serif-italic normal-case tracking-normal">{item.displayYear}</div>}
                </div>
              </div>

              {/* REVIEW */}
              <div className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto seasonal-scrollbar">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs text-accent uppercase tracking-widest">Review</span>
                    <h2 id="archive-modal-title" className="text-3xl font-light tracking-tighter mt-1">
                      {item.title}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close review"
                    className="text-text-muted hover:text-accent text-xl transition-colors font-mono cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="h-[1px] bg-natural-border mb-6" />

                <div className="max-w-prose space-y-4 text-[15px] leading-relaxed font-serif">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-line">{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
};
