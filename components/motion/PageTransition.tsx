"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Modern View Transitions API support (2025 feature)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        // Transition will be handled by the browser
      });
    }
  }, [pathname]);

  return (
    <div className="transition-opacity duration-300 ease-in-out">
      {children}
    </div>
  );
}
