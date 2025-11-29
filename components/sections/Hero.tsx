"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <motion.section
      className="sticky top-0 h-screen w-full overflow-hidden bg-black z-10"
      style={{ opacity }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <img
          src="/hero-architecture.jpg"
          alt="Modern architecture"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="text-white text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Crafting Spaces
          <br />
          <span className="text-white/80">That Inspire</span>
        </motion.h1>

        <motion.p
          className="text-white/70 text-xl md:text-2xl max-w-2xl mb-12 font-light"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Award-winning architectural design firm in Kenya
          <br />
          transforming visions into timeless reality
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <AppleButton primary>Explore Projects</AppleButton>
          <AppleButton>Start Your Project</AppleButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Apple-style Button Component
const AppleButton = ({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) => (
  <motion.button
    className={`
      px-8 py-4 rounded-full text-lg font-medium
      transition-all duration-300
      ${primary
        ? 'bg-white text-black hover:bg-white/90'
        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-xl'
      }
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.button>
);
