"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
}

export function SlideUp({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  amount = 6
}: SlideUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: amount }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
