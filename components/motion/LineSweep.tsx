"use client";

import { motion } from "framer-motion";

interface LineSweepProps {
  className?: string;
  delay?: number;
  center?: boolean;
}

export function LineSweep({
  className = "",
  delay = 0,
  center = true
}: LineSweepProps) {
  return (
    <motion.div
      className={`${center ? 'flex justify-center' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
    >
      <motion.div
        className="h-px bg-neutral-700"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 2,
          delay,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: 'center' }}
      />
    </motion.div>
  );
}
