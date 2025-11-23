"use client";

import Link from "next/link";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
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
  CheckCircle,
  Clock,
  Users,
  Award,
  Shield
} from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Architectural Design",
    description: "Comprehensive architectural design services from concept to construction documentation. We create innovative, functional, and aesthetically pleasing designs.",
    features: [
      "Concept Development",
      "Schematic Design",
      "Design Development",
      "Construction Documents",
      "Permit Coordination"
    ],
    pricing: "Starting at $5,000",
    popular: false
  },
  {
    icon: Home,
    title: "Interior Design",
    description: "Transform spaces with our interior design expertise. We create functional, beautiful interiors that reflect your personality and lifestyle.",
    features: [
      "Space Planning",
      "Material Selection",
      "Furniture Design",
      "Lighting Design",
      "Color Consultation"
    ],
    pricing: "Starting at $2,500",
    popular: false
  },
  {
    icon: Palette,
    title: "3D Visualization",
    description: "Bring your project to life with photorealistic 3D renderings, virtual reality tours, and detailed visualizations of your architectural vision.",
    features: [
      "Photorealistic Rendering",
      "Virtual Reality Tours",
      "Animation Videos",
      "Material Studies",
      "Lighting Analysis"
    ],
    pricing: "Starting at $800",
    popular: true
  },
  {
    icon: Wrench,
    title: "Project Management",
    description: "Expert project management from planning to completion. We ensure your project stays on time, within budget, and meets quality standards.",
    features: [
      "Construction Management",
      "Contractor Coordination",
      "Quality Control",
      "Timeline Management",
      "Budget Monitoring"
    ],
    pricing: "Starting at $3,000",
    popular: false
  },
  {
    icon: Zap,
    title: "Sustainable Consulting",
    description: "Design eco-friendly buildings with our sustainable consulting services. We integrate green technologies and practices for environmentally responsible architecture.",
    features: [
      "Energy Analysis",
      "LEED Certification",
      "Green Material Sourcing",
      "Water Conservation",
      "Renewable Energy Integration"
    ],
    pricing: "Starting at $2,000",
    popular: false
  },
  {
    icon: Eye,
    title: "Feasibility Studies",
    description: "Comprehensive analysis of project viability including site assessment, cost estimation, regulatory review, and market analysis.",
    features: [
      "Site Analysis",
      "Cost Estimation",
      "Regulatory Review",
      "Market Analysis",
      "Risk Assessment"
    ],
    pricing: "Starting at $1,500",
    popular: false
  }
];

const benefits = [
  {
    icon: Award,
    title: "Award-Winning Design",
    description: "Recognized for innovative architectural solutions that push boundaries and create lasting impact."
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Efficient project management ensuring deadlines are met without compromising quality."
  },
  {
    icon: Users,
    title: "Collaborative Approach",
    description: "Work directly with experienced architects who value your input and vision throughout the process."
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous quality control processes ensuring every detail meets our high standards of excellence."
  }
];

export default function ServicesPage() {
  return (
    <>
      <NavBar />

      <main className="pt-20 pb-16">
        {/* Header */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="text-center mb-16">
              <LineSweep />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-4">
                Our Services
              </h1>
              <p className="text-lg text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed mb-8">
                From concept to completion, we provide comprehensive architectural services
                tailored to bring your vision to life with expertise, innovation, and precision.
              </p>
              <Button asChild size="lg" className="min-w-[200px]">
                <Link href="#services">
                  Explore Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <SlideUp key={service.title} delay={index * 0.1}>
                  <Card className="relative h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute -top-3 left-6 z-10">
                        <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
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

                      {/* Pricing */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-foreground">
                          {service.pricing}
                        </span>
                      </div>

                      {/* CTA */}
                      <Button
                        variant="outline"
                        className="w-full group/button border-primary/20 hover:border-primary/40"
                        asChild
                      >
                        <Link href="/contact" className="flex items-center justify-center">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="text-center mb-16">
              <LineSweep />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto">
                Experience the difference of working with a team that combines creativity,
                technical expertise, and unwavering commitment to excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <SlideUp key={benefit.title} delay={index * 0.1}>
                  <Card className="border-0 shadow-md bg-card/50 backdrop-blur-sm text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground/80 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 lg:p-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-muted-foreground/90 mb-8 text-lg">
                  Let's discuss your vision and create something extraordinary together.
                  Get a free consultation and project estimate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="min-w-[160px]" asChild>
                    <Link href="/contact">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="min-w-[160px]" asChild>
                    <Link href="/projects">
                      View Our Work
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
