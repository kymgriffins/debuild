 "use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { getAllProjects } from "@/lib/projects";

const projects = getAllProjects();

// Create featured images with enhanced data
const featuredImages = projects.map(project => ({
  image: project.images[0],
  title: project.title,
  category: project.category,
  projectId: project.id,
  location: project.location,
  description: project.description,
  year: project.year,
  status: project.status,
  aspectRatio: Math.random() > 0.5 ? "landscape" : "portrait" // Dynamic aspect ratios
}));

interface ImageCardProps {
  imageData: typeof featuredImages[0];
  index: number;
  layout: "masonry" | "grid" | "featured";
  size?: "small" | "medium" | "large";
}

function ImageCard({ imageData, index, layout, size = "medium" }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Enhanced mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30
  });

  // Text reveal animation for title - FIXED TYPES
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  // Character reveal variants - FIXED TYPES
  const characterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Size classes based on prop - INCREASED SIZES
  const sizeClasses = {
    small: "aspect-[4/5] min-h-[400px]",    // Taller, minimum height
    medium: "aspect-[4/3] min-h-[500px]",   // Larger aspect ratio
    large: "aspect-[16/10] min-h-[600px]"   // Much larger
  };

  const layoutClasses = {
    masonry: "break-inside-avoid",
    grid: "",
    featured: "col-span-2 row-span-2"
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          delay: index * 0.15,
          type: "spring",
          stiffness: 80
        }
      } : { opacity: 0, y: 60, scale: 0.95 }}
      className={`group cursor-pointer ${layoutClasses[layout]}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-700 border border-gray-100 ${sizeClasses[size]}`}
        whileHover={{
          scale: layout === "featured" ? 1.01 : 1.03,
          y: -5
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Subtle hover border glow */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 z-20"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main image container */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          {/* Background image with enhanced scaling */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <Image
              src={imageData.image}
              alt={`${imageData.title} Featured Image`}
              fill
              className={`object-cover transition-all duration-1000 filter grayscale ${isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsLoaded(true)}
              priority={index < 3}
            />

            {/* Loading skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            )}
          </motion.div>

          {/* Enhanced overlay system */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.9 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Enhanced content overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white z-10"
            initial={{ y: 30, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={isHovered ? { scale: 1 } : { scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated title with character reveal */}
              <motion.h3
                className="text-2xl font-bold mb-3 leading-tight text-white"
                variants={titleVariants}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
              >
                {imageData.title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={characterVariants}
                    initial="hidden"
                    animate={isHovered ? "visible" : "hidden"}
                    custom={i}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h3>

              <motion.p
                className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                {imageData.description}
              </motion.p>

              <motion.div
                className="flex items-center justify-between text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {imageData.location}
                  </span>
                </div>

                <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border ${imageData.status === 'Completed'
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : imageData.status === 'Under Construction'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                  }`}>
                  {imageData.status}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Top badges with enhanced animations */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <motion.div
              className="bg-black/80 backdrop-blur-md rounded-xl px-3 py-2 text-sm text-white border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHovered ? {
                scale: 1.05,
                y: -2,
                opacity: 1
              } : {
                scale: 1,
                y: 0,
                opacity: 1
              }}
              transition={{ duration: 0.2 }}
            >
              {imageData.category}
            </motion.div>

            <motion.div
              className="bg-black/80 backdrop-blur-md rounded-lg px-2 py-1 text-xs text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHovered ? {
                scale: 1.05,
                y: -2,
                opacity: 1
              } : {
                scale: 1,
                y: 0,
                opacity: 1
              }}
              transition={{ duration: 0.2 }}
            >
              {imageData.year}
            </motion.div>
          </div>

          {/* Floating action button on hover */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl">
              <motion.svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Layout selector component
function LayoutSelector({ layout, setLayout }: {
  layout: "masonry" | "grid" | "featured";
  setLayout: (layout: "masonry" | "grid" | "featured") => void
}) {
  const layouts = [
    { id: "masonry" as const, name: "Masonry", icon: "🧱" },
    { id: "grid" as const, name: "Grid", icon: "🔲" },
    { id: "featured" as const, name: "Featured", icon: "⭐" }
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white backdrop-blur-md rounded-lg p-1 border border-gray-200 shadow-sm">
        <div className="flex space-x-1">
          {layouts.map((layoutOption) => (
            <motion.button
              key={layoutOption.id}
              onClick={() => setLayout(layoutOption.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${layout === layoutOption.id
                  ? "bg-gray-800 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
            >
              <span>{layoutOption.icon}</span>
              {layoutOption.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const [layout, setLayout] = useState<"masonry" | "grid" | "featured">("masonry");
  const [filter, setFilter] = useState("all");

  // Filter projects by category
  const filteredImages = filter === "all"
    ? featuredImages
    : featuredImages.filter(img => img.category === filter);

  // Get unique categories for filter
  const categories = ["all", ...new Set(featuredImages.map(img => img.category))];

  return (
    <section id="work" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <LineSweep className="mb-8" />
          <SlideUp>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-gray-900">
              Our Portfolio
            </h2>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Discover our architectural journey through innovative designs, sustainable solutions,
              and spaces that inspire. Each project tells a unique story of creativity and precision.
            </p>
          </SlideUp>
        </div>

        {/* Layout & Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* LayoutSelector removed - keeping masonry layout as preferred */}
          {/* <LayoutSelector layout={layout} setLayout={setLayout} /> */}

          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 border ${filter === category
                    ? "bg-gray-800 text-white border-gray-800"
                    : "text-gray-600 border-gray-300 hover:border-gray-400 hover:text-gray-800"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dynamic Gallery Layouts */}
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`
              ${layout === "masonry"
                ? `columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6 ${filteredImages.length === 1 ? 'flex justify-center' : ''}`
                : layout === "grid"
                  ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${filteredImages.length === 1 ? 'justify-center' : ''}`
                  : `grid grid-cols-1 lg:grid-cols-3 gap-6 ${filteredImages.length === 1 ? 'justify-center' : ''}`
              }
            `}
          >
            {filteredImages.map((imageData, index) => (
              <ImageCard
                key={`${imageData.projectId}-${layout}`}
                imageData={imageData}
                index={index}
                layout={layout}
                size={
                  layout === "featured" && index === 0 ? "large" : "small"
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced CTA */}
        <div className="text-center mt-16">
          <SlideUp delay={0.4}>
            <motion.a
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-900 transition-all duration-300 group shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore All Projects</span>
              <motion.svg
                className="w-5 h-5 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <polyline points="9,18 15,12 9,6" />
              </motion.svg>
            </motion.a>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
