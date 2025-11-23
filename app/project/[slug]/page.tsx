import { notFound } from "next/navigation";
import { NavBar } from "@/components/layout/NavBar";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";

// Generate static params for all project slugs
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <NavBar />

      <main className="pt-20 pb-16 overflow-hidden">
        {/* Back Button with subtle entrance */}
        <FadeIn delay={0.1}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:gap-3 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </div>
        </FadeIn>

        {/* Project Header with enhanced motion */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            <LineSweep className="mb-8" />

            <StaggerChildren staggerDelay={0.1}>
              <div className="space-y-6 mb-8">
                {/* Meta information with staggered children */}
                <SlideUp delay={0.2}>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-full transition-all hover:scale-105">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-full transition-all hover:scale-105">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </span>
                    <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 transition-all hover:scale-105">
                      {project.category}
                    </span>
                  </div>
                </SlideUp>

                {/* Title with character reveal effect */}
                <SlideUp delay={0.3}>
                  <h1 className="text-4xl lg:text-6xl font-light tracking-tight leading-tight">
                    {project.title}
                  </h1>
                </SlideUp>

                {/* Description with fade-in */}
                <SlideUp delay={0.4}>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {project.description}
                  </p>
                </SlideUp>
              </div>
            </StaggerChildren>
          </div>
        </section>

        {/* Project Details with enhanced layout */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              {/* Extended Description */}
              <div className="xl:col-span-2">
                <StaggerChildren>
                  <SlideUp>
                    <div className="space-y-6">
                      <h2 className="text-3xl font-light mb-6">Project Overview</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>
                  </SlideUp>
                </StaggerChildren>
              </div>

              {/* Project Specs */}
              <SlideUp delay={0.3}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-light mb-6">Project Details</h2>
                    <div className="space-y-4 bg-muted/30 rounded-2xl p-6 border border-border">
                      {[
                        { label: "Year", value: project.year },
                        { label: "Size", value: project.size },
                        { label: "Status", value: project.status },
                        { label: "Location", value: project.location },
                      ].map((item, index) => (
                        <FadeIn key={item.label} delay={0.5 + index * 0.1}>
                          <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0">
                            <span className="font-medium text-foreground/80">{item.label}</span>
                            <span className="font-semibold">{item.value}</span>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>

            {/* Features with enhanced grid */}
            <SlideUp delay={0.5}>
              <div className="mt-16">
                <h2 className="text-3xl font-light mb-8">Key Features</h2>
                <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.features.map((feature, index) => (
                    <FadeIn key={index} delay={0.6 + index * 0.1}>
                      <div className="p-6 bg-muted/30 rounded-xl border border-border hover:bg-muted/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                        <div className="text-center font-medium group-hover:text-primary transition-colors">
                          {feature}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </StaggerChildren>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Project Images with enhanced grid and interactions */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {project.images.map((image, index) => (
              <SlideUp key={index} delay={0.1 * index}>
                <div className="group relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden border border-border">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                </div>
              </SlideUp>
            ))}
          </StaggerChildren>
        </section>

        {/* Enhanced CTA Section */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <StaggerChildren>
              <SlideUp>
                <h2 className="text-4xl font-light mb-6">Explore More Projects</h2>
              </SlideUp>
              <SlideUp delay={0.2}>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Discover how we're shaping the future of architectural design through innovative and sustainable solutions.
                </p>
              </SlideUp>
              <SlideUp delay={0.3}>
                <Link href="/#work">
                  <Button
                    size="lg"
                    className="px-8 py-3 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    View All Projects
                  </Button>
                </Link>
              </SlideUp>
            </StaggerChildren>
          </div>
        </section>
      </main>
    </>
  );
}
