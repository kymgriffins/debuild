"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Ruler, Building } from "lucide-react";
import { getAllProjects } from "@/lib/projects";

const categoryColors = {
  Healthcare: "bg-blue-500/10 text-blue-700 border-blue-200",
  Residential: "bg-green-500/10 text-green-700 border-green-200",
  Commercial: "bg-purple-500/10 text-purple-700 border-purple-200",
  Cultural: "bg-orange-500/10 text-orange-700 border-orange-200"
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <>
      <NavBar />

      <main className="pt-20 pb-16">
        {/* Header */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <LineSweep className="mb-8" />
            <SlideUp>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6">
                Our Projects
              </h1>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
                Discover our portfolio of architectural excellence. Each project represents our commitment
                to innovative design, sustainable solutions, and spaces that inspire.
              </p>
            </SlideUp>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <SlideUp key={project.id} delay={0.1 * index}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className={categoryColors[project.category as keyof typeof categoryColors]}
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge
                        variant={
                          project.status === 'Completed' ? 'default' :
                          project.status === 'Under Construction' ? 'secondary' :
                          'outline'
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.year}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Ruler className="w-4 h-4 text-muted-foreground" />
                          {project.size}
                        </div>
                      </div>

                      <Link href={`/project/${project.slug}`}>
                        <Button className="w-full group-hover:bg-primary/90">
                          View Project
                          <Building className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </SlideUp>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/20 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4">Our Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Numbers that represent our dedication to architectural excellence and community development
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">285K</div>
                <div className="text-sm text-muted-foreground">Sq Ft Designed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <SlideUp>
            <h2 className="text-3xl font-light mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your architectural vision to life with our expert team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="min-w-[200px]">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  View Our Services
                </Button>
              </Link>
            </div>
          </SlideUp>
        </section>
      </main>
    </>
  );
}
