import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-[300] flex items-center gap-2 rounded-lg border border-accent/35 bg-surface px-5 py-3 shadow-soft"
        >
          <CheckCircle2 size={16} className="text-accent" />
          <span className="text-[13px] text-ink">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
