"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
    name: "Sarah Chen",
    role: "Property Developer",
    company: "Chen Developments",
    image: "/mockdata/team/Judychesire.jpg",
    content: "Working with this team transformed our vision into reality. Their attention to detail and innovative approach to sustainable design exceeded our expectations. The project finished on time and within budget.",
    project: "Eco-Resort Development",
    rating: 5,
    metrics: ["20% energy savings", "6 month completion"]
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "CEO",
    company: "Johnson Enterprises",
    image: "/mockdata/team/kevin.png",
    content: "The 3D visualizations were incredible - they helped us secure financing and communicate our vision to stakeholders. The final building is even better than the renders suggested.",
    project: "Commercial Complex",
    rating: 5,
    metrics: ["$2.3M project value", "Pre-financing secured"]
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Homeowner",
    company: "Private Client",
    image: "/mockdata/team/weldon.png",
    content: "They didn't just design our home, they designed our lifestyle. Every space feels intentional and beautiful. The process was collaborative and stress-free from start to finish.",
    project: "Custom Residence",
    rating: 5,
    metrics: ["Award-winning design", "100% satisfaction"]
  },
  {
    id: 4,
    name: "David Kim",
    role: "Restaurant Owner",
    company: "Kim's Bistro",
    image: "/mockdata/Kijabe/me.png",
    content: "Our restaurant space needed to balance functionality with ambiance. They delivered a space that not only looks stunning but also operates efficiently. Our customer traffic increased 40% after opening.",
    project: "Restaurant Renovation",
    rating: 5,
    metrics: ["40% traffic increase", "Profitability improved"]
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    role: "Medical Director",
    company: "Thompson Healthcare",
    image: "/mockdata/team/Judychesire.jpg",
    content: "The healthcare facility design prioritizes patient comfort and staff efficiency. The evidence-based design approach has resulted in measurable improvements in patient outcomes and staff satisfaction.",
    project: "Medical Center",
    rating: 5,
    metrics: ["Improved patient outcomes", "Staff efficiency +25%"]
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
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LineSweep />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-4">
            Trusted by Visionaries
          </h2>
          <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of satisfied clients who've transformed their spaces with our expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Awards Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Recognitions</h3>
              </div>
              <div className="space-y-3">
                {awards.slice(0, 4).map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Badge variant="outline" className="text-xs">
                      {award.name} {award.year}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Based on 150+ reviews</p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="lg:col-span-3">
            {/* Main Testimonial */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-8 lg:p-10">
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
          <Button size="lg" className="min-w-[200px]">
            Start Your Project
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
