import { notFound } from "next/navigation";
import { NavBar } from "@/components/layout/NavBar";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";

// Generate static params for all project slugs
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();

  return slugs.map((slug: string) => ({
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
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <NavBar />

      <main className="pt-20 pb-16">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            <LineSweep className="mb-8" />
            <SlideUp>
              <div className="space-y-4 mb-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Project Images */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {project.images.map((image, index) => (
              <SlideUp key={index} delay={0.1 * index}>
                <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
              </SlideUp>
            ))}
          </div>
        </section>

        {/* Project Details */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Extended Description */}
              <SlideUp>
                <div>
                  <h2 className="text-2xl font-medium mb-4">Project Overview</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {project.longDescription}
                  </p>
                </div>
              </SlideUp>

              {/* Project Specs */}
              <SlideUp delay={0.2}>
                <div>
                  <h2 className="text-2xl font-medium mb-4">Project Details</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Year</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Size</span>
                      <span>{project.size}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Status</span>
                      <span>{project.status}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Location</span>
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>

            {/* Features */}
            <SlideUp delay={0.4}>
              <div className="mt-12">
                <h2 className="text-2xl font-medium mb-6">Key Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-muted rounded-lg text-center text-sm"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Related Projects / CTA */}
        <section className="bg-muted/20 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SlideUp>
              <h2 className="text-3xl font-light mb-4">Explore More Projects</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how we're shaping the future of architectural design through innovative and sustainable solutions.
              </p>
              <Link href="/#work">
                <Button size="lg">View All Projects</Button>
              </Link>
            </SlideUp>
          </div>
        </section>
      </main>
    </>
  );
}
