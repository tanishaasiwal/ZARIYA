import React, {useEffect} from 'react';
import {motion, useReducedMotion} from 'motion/react';

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | ZARIYA — Luxury Indian Sarees`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${title} | ZARIYA`);
    }
  }, [title, description]);
}

export function PageShell({children, className = ''}: {children: React.ReactNode; className?: string}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.main
      initial={prefersReduced ? false : {opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: prefersReduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1]}}
      className={className}
    >
      {children}
    </motion.main>
  );
}

export function FadeInSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-60px'}}
      transition={{duration: 0.45, delay, ease: [0.16, 1, 0.3, 1]}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
