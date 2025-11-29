"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: '01',
    title: 'Discovery & Research',
    description: 'Understanding your vision, needs, and project requirements through comprehensive consultation'
  },
  {
    num: '02',
    title: 'Concept Development',
    description: 'Creating innovative solutions with detailed plans, 3D visualizations, and material selections'
  },
  {
    num: '03',
    title: 'Design Refinement',
    description: 'Bringing designs to life with precision engineering and quality craftsmanship'
  },
  {
    num: '04',
    title: 'Technical Documentation',
    description: 'Preparing complete construction documents and coordinating all project details'
  },
];

const ProcessStep = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const isEven = index % 2 === 0;

  return (
    <li ref={ref} className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
      {/* Number */}
      <motion.div
        className={`${!isEven ? 'lg:order-2' : ''}`}
        whileInView={{ scale: [0.8, 1.05, 1] }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="text-[200px] lg:text-[280px] font-bold leading-none text-black/5 tracking-tighter">
          {step.num}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`${!isEven ? 'lg:order-1' : ''}`}
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="text-5xl font-semibold mb-6 tracking-tight">
          {step.title}
        </h3>
        <p className="text-xl text-black/60 leading-relaxed font-light mb-8">
          {step.description}
        </p>

        {/* Progress bar */}
        <motion.div
          className="h-1 bg-black/10 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: 'left' }}
        >
          <motion.div
            className="h-full bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </motion.div>
    </li>
  );
};

export function Process() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-6xl lg:text-7xl font-semibold mb-6 tracking-tight">
            Our Process
          </h2>
          <p className="text-xl text-black/60 font-light">
            A proven methodology that brings your vision to life
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
