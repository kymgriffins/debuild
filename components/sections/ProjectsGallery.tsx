"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { getAllProjects } from "@/lib/projects";
import Image from "next/image";
import { useRef } from "react";

export function ProjectsGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const projects = getAllProjects().slice(0, 6);

  return (
    <section
      ref={targetRef}
      className="relative py-32 bg-white text-black overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-6xl lg:text-7xl font-semibold mb-6 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xl text-black/60 font-light">
            Explore our portfolio of transformative architectural works
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <motion.div
        className="flex gap-8 px-6"
        style={{ x }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} />
        ))}
        {/* Duplicate for seamless loop effect */}
        {projects.map((project, index) => (
          <ProjectCard
            key={`dup-${project.id || index}`}
            project={project}
            index={index + projects.length}
          />
        ))}
      </motion.div>
    </section>
  );
}

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-[500px] h-[600px] rounded-3xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <div className="relative w-full h-full">
        {/* Image */}
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
          sizes="500px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Scale Effect on Hover */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${project.images[0]})`, backgroundSize: 'cover' }}
          whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-sm uppercase tracking-widest text-white/60 mb-3 font-medium">
              {project.category} • {project.year}
            </div>
            <h3 className="text-4xl font-semibold mb-4 text-white tracking-tight">
              {project.title}
            </h3>
            <motion.div
              className="flex items-center gap-2 text-white group-hover:gap-3 transition-all"
              whileHover={{ x: 5 }}
            >
              View Project →
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
