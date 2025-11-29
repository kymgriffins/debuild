"use client";

import { NavBar } from "@/components/layout/NavBar";
import { LayerLoader } from "@/components/loader/LayerLoader";
import { LineSweep } from "@/components/motion/LineSweep";
import { Hero } from "@/components/sections/Hero";
import { Badge } from "@/components/ui/badge";
import { WaitlistModal } from "@/components/WaitlistModal";
import { getAllProjects } from "@/lib/projects";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { StudioSnapshot } from "@/components/sections/StudioSnapshot";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";

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

            {/* Projects Gallery - Apple-Style Horizontal Scroll */}
            <ProjectsGallery />

            <Process />
            <Services />

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
