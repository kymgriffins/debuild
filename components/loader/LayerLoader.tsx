"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LayerLoaderProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function LayerLoader({ isVisible, onComplete }: LayerLoaderProps) {
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Start exit animation after 2 seconds
      const timer = setTimeout(() => {
        setExitAnimation(true);
        // Call onComplete after exit animation (0.8s)
        setTimeout(onComplete, 800);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background min-h-screen min-h-[100dvh]"
      style={{ height: '100dvh' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: exitAnimation ? 0 : 1 }}
      transition={{ duration: 0.4, delay: exitAnimation ? 0.4 : 0 }}
    >
      <div className="flex items-center space-x-6 px-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-px h-12 bg-neutral-700 dark:bg-neutral-300"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: exitAnimation ? 0 : 1,
              opacity: exitAnimation ? 0 : 1,
              x: exitAnimation ? (index === 0 ? -50 : index === 2 ? 50 : 0) : 0,
            }}
            transition={{
              duration: exitAnimation ? 0.4 : 0.6,
              delay: exitAnimation ? 0.1 * index : 0.1 * index,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
