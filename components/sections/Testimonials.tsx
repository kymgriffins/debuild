"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { LineSweep } from "@/components/motion/LineSweep";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Award,
  Building2
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Amos Komen",
    role: "CEO",
    company: "Komen Holdings",
    image: "/mockdata/team/Judy Chesire.jpg",
    content: "Their architectural designs transformed my vision into reality with precision and elegance. Every detail was handled expertly.",
    project: "Commercial Development",
    rating: 5,
    metrics: ["Vision realized", "Expert execution"]
  },
  {
    id: 2,
    name: "Rowell Egesa",
    role: "Founder",
    company: "Egesa Urban Planning",
    image: "/mockdata/team/Kevin Yegon.png",
    content: "Creative and professional from start to finish. Their team helped us achieve a sustainable design with innovative solutions.",
    project: "Urban Planning Project",
    rating: 4,
    metrics: ["Sustainable design", "Innovative solutions"]
  },
  {
    id: 3,
    name: "Dr. Sarah",
    role: "Director",
    company: "HealthFirst Clinic",
    image: "/mockdata/team/Kimwetich Weldon.png",
    content: "The collaboration was seamless, and the final design greatly enhanced our facility's functionality and aesthetic appeal.",
    project: "Healthcare Facility",
    rating: 5,
    metrics: ["Enhanced functionality", "Improved aesthetics"]
  }
];

const awards = [
  { name: "AIA Design Excellence", year: "2024" },
  { name: "LEED Platinum", year: "2024" },
  { name: "Sustainable Architecture", year: "2023" },
  { name: "Innovation in Design", year: "2023" },
  { name: "Community Impact", year: "2023" },
  { name: "Rising Star Firm", year: "2022" }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <LineSweep />
          <h2 className="text-6xl lg:text-7xl font-semibold tracking-tight mt-6 mb-6">
            Trusted by Visionaries
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed font-light">
            Join hundreds of satisfied clients who've transformed their spaces with our expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Testimonial Carousel */}
          <div className="lg:col-span-2">
            {/* Main Testimonial */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50 rounded-3xl">
                <CardContent className="p-10">
                  <Quote className="w-10 h-10 text-primary/50 mb-6" />

                  <blockquote className="text-lg lg:text-xl leading-relaxed text-foreground mb-8">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Project Metrics */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {currentTestimonial.metrics.map((metric, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-14 h-14 border-2 border-primary/20">
                      <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                      <AvatarFallback>{currentTestimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-foreground">{currentTestimonial.name}</h4>
                        <div className="flex">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {currentTestimonial.role}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                disabled={testimonials.length <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary w-8' : 'bg-primary/20'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                disabled={testimonials.length <= 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Project Showcase */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Recent Projects</h3>
              </div>
              <div className="space-y-4">
                {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-muted/50 rounded-lg p-4"
                  >
                    <h4 className="font-medium text-sm mb-1">{testimonial.project}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-6">
            Ready to create something extraordinary together?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="min-w-[200px]" asChild>
            <Link href="/team">Meet Our Team</Link>
          </Button>
            <Button size="lg" variant="outline" className="min-w-[200px]" asChild>
              <Link href="/meet-our-team">View Full Team</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
