"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LayerLoader } from "@/components/loader/LayerLoader";
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { LineSweep } from "@/components/motion/LineSweep";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { WaitlistModal } from "@/components/WaitlistModal";

import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { StudioSnapshot } from "@/components/sections/StudioSnapshot";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  const handleWaitlistClick = () => {
    setShowWaitlistModal(true);
  };

  useEffect(() => {
    // Show loader for at least 2 seconds
    const timer = setTimeout(() => {
      if (showLoader) {
        setShowLoader(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showLoader]);

  return (
    <>
      <LayerLoader isVisible={showLoader} onComplete={handleLoaderComplete} />

      {!showLoader && (
        <div className="relative">
          <NavBar />

          <main>
            <Hero />
            <StudioSnapshot />
            {/* <Philosophy /> */}

            {/* Projects Gallery - Shows project preview and links to projects page */}
            <section className="py-20 bg-muted/50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <LineSweep className="mb-8" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6">
                    Our Architectural Portfolio
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Explore our complete collection of projects, from residential designs to commercial spaces that showcase our innovative approach to architecture.
                  </p>
                </div>

                {/* Featured Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {getAllProjects().slice(0, 6).map((project, index) => (
                    <div key={project.id} className="group bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-background/90 text-foreground border-border shadow-sm">
                            {project.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'Under Construction' ? 'secondary' : 'outline'}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground mt-2 text-sm leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {project.location}
                            </div>
                            <div>{project.year}</div>
                          </div>

                          <a href={`/project/${project.slug}`}>
                            <button className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 text-sm shadow-sm hover:shadow-md">
                              View Project
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Projects Button */}
                <div className="text-center">
                  <a
                    href="/projects"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                  >
                    View All Projects
                  </a>
                </div>
              </div>
            </section>

            <Process />
            {/* <Services /> */}

            <Testimonials />
            <ContactCTA onWaitlistClick={handleWaitlistClick} />
          </main>

          <Footer />

          {/* Waitlist Modal */}
          <WaitlistModal
            isOpen={showWaitlistModal}
            onClose={() => setShowWaitlistModal(false)}
          />
        </div>
      )}
    </>
  );
}
