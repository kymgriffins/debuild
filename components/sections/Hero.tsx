"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-20 flex flex-col items-center justify-center text-center">
        {/* Headline */}
        <div className="space-y-8 max-w-4xl">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Architectural Design
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-black leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Crafting spaces that tell stories. Building environments that inspire.
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg bg-black hover:bg-gray-800 text-white border-0"
          >
            Explore Our Work
          </Button>
        </motion.div>

        {/* Subtle scroll hint */}
        <motion.div
          className="mt-24 flex flex-col items-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="w-px h-8 bg-black" />
          <span className="text-sm text-black tracking-wide">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
