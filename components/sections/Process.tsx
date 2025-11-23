"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const processSteps = [
  {
    id: 1,
    name: "Discovery & Research",
    description: "Deep dive into site conditions, client needs, and contextual analysis.",
    color: "from-gray-100/10 via-gray-200/10 to-gray-300/10",
    borderColor: "border-white/20",
    glowColor: "rgba(255, 255, 255, 0.1)",
    icon: "🔍",
    details: [
      "User research & stakeholder interviews",
      "Site analysis & environmental assessment",
      "Zoning studies & regulatory review",
      "Market analysis & feasibility studies"
    ],
    duration: "2-4 weeks"
  },
  {
    id: 2,
    name: "Concept Development",
    description: "Synthesis of research into architectural concepts that balance form, function, and site integration.",
    color: "from-gray-200/10 via-gray-300/10 to-gray-400/10",
    borderColor: "border-white/25",
    glowColor: "rgba(255, 255, 255, 0.15)",
    icon: "💡",
    details: [
      "Preliminary sketches & massing studies",
      "Sustainability analysis & energy modeling",
      "Concept refinement through iteration",
      "Client vision alignment sessions"
    ],
    duration: "3-5 weeks"
  },
  {
    id: 3,
    name: "Design Iteration",
    description: "Refinement through collaborative review, technical coordination, and performance optimization.",
    color: "from-gray-300/10 via-gray-400/10 to-gray-500/10",
    borderColor: "border-white/30",
    glowColor: "rgba(255, 255, 255, 0.2)",
    icon: "🔄",
    details: [
      "Design development & 3D modeling",
      "Structural & MEP coordination",
      "Material selection & specification",
      "Cost analysis & value engineering"
    ],
    duration: "4-6 weeks"
  },
  {
    id: 4,
    name: "Technical Detailing",
    description: "Comprehensive documentation ensuring constructability, compliance, and quality execution.",
    color: "from-gray-400/10 via-gray-500/10 to-gray-600/10",
    borderColor: "border-white/35",
    glowColor: "rgba(255, 255, 255, 0.25)",
    icon: "📐",
    details: [
      "Construction document preparation",
      "Specification writing & detailing",
      "Permit coordination & approvals",
      "Quality assurance protocols"
    ],
    duration: "5-8 weeks"
  },
  {
    id: 5,
    name: "Project Delivery",
    description: "Seamless project handover with comprehensive support for successful implementation.",
    color: "from-gray-500/10 via-gray-600/10 to-gray-700/10",
    borderColor: "border-white/40",
    glowColor: "rgba(255, 255, 255, 0.3)",
    icon: "🚀",
    details: [
      "Construction administration",
      "Site visits & progress monitoring",
      "Punch list management",
      "Post-occupancy evaluation"
    ],
    duration: "Ongoing"
  },
];

function ProcessStep({ step, index, totalSteps }: { step: typeof processSteps[0], index: number, totalSteps: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connection Line */}
      {index < totalSteps - 1 && (
        <motion.div
          className="absolute left-1/2 top-full w-0.5 h-24 bg-gradient-to-b from-white/20 to-transparent z-0"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
        />
      )}

      {/* Main Card */}
      <motion.div
        className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
        whileHover={{
          scale: 1.02,
          y: -5,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px ${step.glowColor}`
            : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `radial-gradient(600px circle at center, ${step.glowColor}, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Step Number Badge */}
        <motion.div
          className="relative z-10 flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-light text-lg shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {step.id}
            </motion.div>
            <div>
              <motion.span
                className="text-2xl"
                animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.icon}
              </motion.span>
            </div>
          </div>

          <motion.span
            className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            {step.duration}
          </motion.span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            className="text-2xl font-light text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {step.name}
          </motion.h3>

          <motion.p
            className="text-gray-300 leading-relaxed mb-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {step.description}
          </motion.p>

          {/* Details List */}
          <motion.ul
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step.details.map((detail, detailIndex) => (
              <motion.li
                key={detailIndex}
                className="flex items-center text-sm text-gray-400"
                initial={{ opacity: 0, x: -10 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: detailIndex * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-current mr-3"
                  animate={isHovered ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ duration: 0.6, delay: detailIndex * 0.1 }}
                />
                {detail}
              </motion.li>
            ))}
          </motion.ul>

          {/* Hover Indicator */}
          <motion.div
            className="absolute bottom-6 right-6 text-gray-400"
            animate={isHovered ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Border Glow */}
        <motion.div
          className={`absolute inset-0 rounded-3xl border-2 ${step.borderColor} opacity-0`}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 lg:py-48 bg-black from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Premium Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Design Process</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Our Creative
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
              Process
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            A systematic approach to architectural excellence. Each phase builds upon
            meticulous research and creative exploration, ensuring comprehensive solutions
            that exceed expectations and stand the test of time.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                totalSteps={processSteps.length}
              />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our methodology ensures every project receives the same level of rigorous attention
            and comprehensive thinking, regardless of scale or complexity.
          </motion.p>

          <motion.button
            className="group relative bg-gradient-to-r from-white/10 to-white/5 text-white px-8 py-4 rounded-2xl font-medium overflow-hidden border border-white/10"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Your Project
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
            </span>

            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.8 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}