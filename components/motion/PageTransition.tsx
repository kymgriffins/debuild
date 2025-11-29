"use client";

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastPathname = useRef(pathname);

  // Modern View Transitions API support
  useEffect(() => {
    // Only trigger transition on actual route changes (not query params or hash)
    const currentPath = pathname.split('?')[0].split('#')[0];
    const lastPath = lastPathname.current.split('?')[0].split('#')[0];

    if (currentPath !== lastPath && !isTransitioning) {
      if (typeof window !== 'undefined' && 'startViewTransition' in document) {
        try {
          setIsTransitioning(true);
          const transition = document.startViewTransition(() => {
            // Transition will be handled by the browser
            setIsTransitioning(false);
          });

          // Fallback for when transition is skipped
          transition.finished.catch(() => {
            setIsTransitioning(false);
          });

          transition.ready.finally(() => {
            setIsTransitioning(false);
          });
        } catch (error) {
          // If transition fails, just reset state
          setIsTransitioning(false);
        }
      }
    }

    lastPathname.current = pathname;
  }, [pathname, isTransitioning]);

  return (
    <div className="transition-opacity duration-300 ease-in-out">
      {children}
    </div>
  );
}
