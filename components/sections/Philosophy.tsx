"use client";

import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { CheckCircle, Target, Users, Eye } from "lucide-react";

const philosophyPillars = [
  {
    icon: Target,
    title: "Purpose-Driven Design",
    description: "Every decision begins with human needs. We design spaces that enhance how people live, work, and connect.",
  },
  {
    icon: Eye,
    title: "Timeless Aesthetics",
    description: "Beauty that withstands trends. We create architectural language that feels relevant today and enduring tomorrow.",
  },
  {
    icon: Users,
    title: "Collaborative Process",
    description: "Architecture is a team sport. We bring together diverse expertise to create solutions greater than the sum of their parts.",
  },
];

export function Philosophy() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <LineSweep className="mb-8" />
          <SlideUp>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6">
              Our Design Philosophy
            </h2>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
              We believe architectural excellence emerges from a harmonious balance of
              form, function, and human experience. Our approach transcends mere building
              to create environments that enrich lives.
            </p>
          </SlideUp>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {philosophyPillars.map((pillar, index) => (
            <SlideUp
              key={pillar.title}
              delay={0.3 + index * 0.1}
              className="group"
            >
              <div className="text-center space-y-6 p-8 rounded-lg hover:bg-muted/30 transition-colors duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <pillar.icon className="w-8 h-8" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-medium tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="text-center mt-20">
          <LineSweep className="mb-8" />
          <SlideUp delay={0.8}>
            <blockquote className="text-2xl lg:text-3xl font-light italic text-muted-foreground max-w-4xl mx-auto">
              "Architecture is not just about creating buildings;
              it's about crafting experiences that shape how we live,
              work, and connect with one another."
            </blockquote>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
