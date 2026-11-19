import React from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {Check, X} from 'lucide-react';
import {useStore} from '../context/StoreContext';

export function ToastNotification() {
  const {toast, dismissToast} = useStore();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={prefersReduced ? false : {opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 10}}
          transition={{duration: 0.2}}
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 border border-[#C3A66B]/40 bg-[#123F3A] px-4 py-3 text-xs text-[#E8E5D9] shadow-xl"
        >
          <Check className="h-4 w-4 text-[#C3A66B] shrink-0" />
          <span className="flex-1 leading-snug">{toast.message}</span>
          {toast.actionLabel && toast.actionHref && (
            <Link
              to={toast.actionHref}
              onClick={dismissToast}
              className="font-medium underline underline-offset-4 text-[#C3A66B] hover:text-[#E8E5D9] whitespace-nowrap"
            >
              {toast.actionLabel}
            </Link>
          )}
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss notification"
            className="text-[#E8E5D9]/65 hover:text-[#E8E5D9] p-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
