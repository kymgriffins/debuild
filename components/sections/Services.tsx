"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { LineSweep } from "@/components/motion/LineSweep";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Home,
  Palette,
  Zap,
  Wrench,
  Eye,
  ArrowRight,
  Star,
  CheckCircle,
  Crown,
  Sparkles,
  TreePine,
  FileCheck,
  DollarSign,
  TrendingUp
} from "lucide-react";

const servicePillars = [
  {
    icon: Building,
    title: "Architecture",
    subtitle: "Visual & Functional Design",
    description: "Complete architectural design services from concept to construction documentation.",
    features: [
      "Concept design & floor plans",
      "Elevations & façade development",
      "3D visualization & walkthroughs",
      "Material & finish specifications",
      "Construction documentation",
      "Permit coordination"
    ],
    popular: false
  },
  {
    icon: Zap,
    title: "Engineering",
    subtitle: "Structural & MEP Systems",
    description: "Comprehensive engineering solutions ensuring safety, functionality, and compliance.",
    features: [
      "Structural design & load calculations",
      "MEP systems (HVAC, Electrical, Plumbing)",
      "Energy efficiency consulting",
      "Building safety verification",
      "Compliance documentation",
      "Inspection preparation"
    ],
    popular: true
  },
  {
    icon: Home,
    title: "Interiors",
    subtitle: "Space Experience Design",
    description: "Detailed interior architecture that transforms spaces into remarkable experiences.",
    features: [
      "Furniture & space planning",
      "Interior material selection",
      "Lighting scene design",
      "Cabinetry & joinery drawings",
      "Interior finishing schedules",
      "360° preview experiences"
    ],
    popular: false
  },
  {
    icon: TreePine,
    title: "Outdoor & Landscape",
    subtitle: "Environmental Integration",
    description: "Complete outdoor design integrating buildings with their natural surroundings.",
    features: [
      "Landscaping & softscape design",
      "Hardscape & outdoor structures",
      "Irrigation & drainage systems",
      "Garden lighting & features",
      "Sustainable outdoor solutions",
      "Environmental integration"
    ],
    popular: false
  },
  {
    icon: TrendingUp,
    title: "Project Delivery",
    subtitle: "Management & Delivery",
    description: "End-to-end project management ensuring seamless delivery from design to completion.",
    features: [
      "Full project lifecycle management",
      "Cost estimation & BOQ development",
      "Timeline tracking & milestones",
      "Quality control & inspections",
      "Client progress reporting",
      "Post-construction support"
    ],
    popular: false
  }
];

export function Services() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LineSweep />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Comprehensive architectural solutions tailored to bring your vision to life, from initial concept through construction completion.
          </p>
        </motion.div>

        {/* Services Grid */}
        <StaggerChildren
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
          staggerDelay={0.1}
        >
          {servicePillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative h-full group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                {/* Popular Badge */}
                {pillar.popular && (
                  <div className="absolute -top-4 left-8 z-10">
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 text-sm font-medium shadow-md">
                      <Crown className="w-4 h-4 mr-2" />
                      Most Comprehensive
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-sm">
                    <pillar.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {pillar.title}
                    </CardTitle>
                    <p className="text-primary/80 font-medium text-sm uppercase tracking-wide">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <p className="text-muted-foreground/80 text-base leading-relaxed mt-4">
                    {pillar.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pillar.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={pillar.popular ? "default" : "outline"}
                    size="lg"
                    className="w-full group/button shadow-sm hover:shadow-md transition-all duration-300"
                    asChild
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      Get Started with {pillar.title}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-6">
            Need something custom? Let's discuss your unique project requirements.
          </p>
          <Button size="lg" className="min-w-[200px]" asChild>
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
