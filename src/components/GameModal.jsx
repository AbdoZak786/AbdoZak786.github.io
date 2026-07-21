import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TypeFighter from './game/TypeFighter';
import '../game/type-fighter.css';

export default function GameModal({ open, onClose }) {
  // Lock background scroll while the game is open, and restore it on close.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[500] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Type Fighter game"
        >
          {/* The game manages its own "← Portfolio" exit affordance (top-left,
              dashed pill) — wired to onClose here instead of a real navigation,
              since this is a modal on the same page, not a separate route. */}
          <TypeFighter onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
