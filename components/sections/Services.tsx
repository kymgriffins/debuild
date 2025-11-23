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
  CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Architectural Design",
    description: "Comprehensive design from concept to construction docs. We create spaces that tell stories.",
    features: ["Concept to Completion", "Permit Coordination", "Construction Docs"],
    pricing: "From $5,000",
    popular: false,
    cta: "Start Project"
  },
  {
    icon: Home,
    title: "Interior Design",
    description: "Transform spaces with expert interior design that reflects your vision and personality.",
    features: ["Space Planning", "Material Selection", "Lighting Design"],
    pricing: "From $2,500",
    popular: true,
    cta: "Transform Space"
  },
  {
    icon: Palette,
    title: "3D Visualization",
    description: "Photorealistic renderings that bring your vision to life before construction begins.",
    features: ["VR Tours", "Animation Videos", "Material Studies"],
    pricing: "From $800",
    popular: false,
    cta: "See Your Project"
  },
  {
    icon: Wrench,
    title: "Project Management",
    description: "Expert oversight ensuring your project stays on time, on budget, and exceeds expectations.",
    features: ["Construction Mgmt", "Quality Control", "Timeline Tracking"],
    pricing: "From $3,000",
    popular: false,
    cta: "Get Started"
  },
  {
    icon: Zap,
    title: "Sustainable Consulting",
    description: "Eco-friendly designs with green technologies for environmentally responsible architecture.",
    features: ["Energy Analysis", "LEED Certification", "Green Materials"],
    pricing: "From $2,000",
    popular: false,
    cta: "Go Green"
  },
  {
    icon: Eye,
    title: "Feasibility Studies",
    description: "Comprehensive analysis to ensure your project's success from the ground up.",
    features: ["Site Analysis", "Cost Estimation", "Risk Assessment"],
    pricing: "From $1,500",
    popular: false,
    cta: "Assess Viability"
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-6 z-10">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {service.pricing}
                    </span>
                    <Button
                      variant={service.popular ? "default" : "outline"}
                      size="sm"
                      className="group/button"
                      asChild
                    >
                      <Link href="/contact" className="flex items-center">
                        {service.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </div>
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
