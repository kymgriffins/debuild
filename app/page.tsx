"use client";

import { useEffect, useState } from "react";
import { LayerLoader } from "@/components/loader/LayerLoader";
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { StudioSnapshot } from "@/components/sections/StudioSnapshot";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
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
            <Philosophy />
            <FeaturedProjects />
            <Process />
            {/* <Services /> */}

            <StudioSnapshot />
            <Testimonials />
            <ContactCTA />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}
