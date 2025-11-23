"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface TextScrambleProps {
  text: string;
  className?: string;
}

function TextScramble({ text, className = "", enabled = true }: TextScrambleProps & { enabled?: boolean }) {
  const [displayText, setDisplayText] = useState(enabled ? "" : text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    if (!isAnimating) {
      setIsAnimating(true);

      const chars = "!@#$%^&*()_+-=[]{}|;:,<.>?/\\`~";
      const duration = 1800;
      const frameRate = 30;
      const totalFrames = duration / frameRate;
      let frame = 0;

      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        if (progress < 1) {
          const scrambled = text
            .split("")
            .map((char, index) => {
              if (char === " ") return char;
              if (index / text.length < easeProgress) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

          setDisplayText(scrambled);
          setTimeout(animate, frameRate);
        } else {
          setDisplayText(text);
        }
      };

      animate();
    }
  }, [text, isAnimating, enabled]);

  return <span className={className}>{displayText}</span>;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasVisited, setHasVisited] = useState(false);

  // Check if user has visited before to limit animations
  useEffect(() => {
    const visited = localStorage.getItem('hero-visited');
    setHasVisited(!!visited);

    // Set visited flag for next time
    if (!visited) {
      localStorage.setItem('hero-visited', 'true');
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-background to-muted/20"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/5" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20 flex flex-col items-center justify-center text-center space-y-8 md:space-y-12">
        {/* Headline */}
        <motion.div
          className="space-y-4 md:space-y-6 max-w-4xl"
          initial={hasVisited ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: hasVisited ? 0.3 : 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-tight">
            <span className="block">Architectural</span>
            <span className="block">Design</span>
            <span className="block text-muted-foreground mt-2">
              <TextScramble text="Excellence" enabled={!hasVisited} />
            </span>
          </h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Crafting spaces that tell stories. Building environments that inspire. Creating
            architectural experiences that endure.
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {/* <Button size="lg" className="min-w-[160px] sm:min-w-[180px] text-base sm:text-lg bg-primary hover:bg-primary/90">
            Subscribe to Updates
          </Button> */}
          <Button size="lg" className="min-w-[160px] sm:min-w-[180px] text-base sm:text-lg">
            Explore Our Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[160px] sm:min-w-[180px] text-base sm:text-lg border-foreground/20"
          >
            Our Process
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="pt-12 flex flex-col items-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="w-px h-10 bg-muted-foreground/30 relative overflow-hidden">
            <motion.div
              className="w-px h-4 bg-foreground absolute top-0"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-xs text-muted-foreground/70 tracking-wider uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
