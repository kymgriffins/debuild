"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  Calendar,
  Mail,
  Phone,
  ArrowLeft,
  Linkedin,
  GraduationCap,
  Target,
  Zap,
  MapPin,
  Quote
} from "lucide-react";
import { getTeamMemberBySlug, type TeamMemberData } from "@/lib/teams";
import { cn } from "@/lib/utils";
import { LineSweep } from "@/components/motion/LineSweep";

interface TeamMemberContentProps {
  member: TeamMemberData;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

// Skeleton loader for better UX
export function TeamMemberContentSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8">
        <div className="container mx-auto px-6 lg:px-20">
          <Skeleton className="h-10 w-32 mb-8" />
        </div>
      </div>

      <section className="relative h-96 bg-gray-200">
        <Skeleton className="absolute inset-0" />
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Error state component
function TeamMemberError({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Profile
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button asChild variant="outline">
              <Link href="/team">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team
              </Link>
            </Button>
            {onRetry && (
              <Button onClick={onRetry}>
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Stat card component
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <Card>
      <CardContent className="text-center p-6">
        <div className="w-12 h-12 mx-auto mb-3 bg-black/5 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-black" />
        </div>
        <div className="text-3xl font-bold text-black mb-1">
          {value}
        </div>
        <div className="text-gray-600 text-sm font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}

// Contact button component
function ContactButton({
  href,
  icon: Icon,
  children,
  variant = "default",
  ...props
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  variant?: "default" | "outline";
} & React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant}
      className={cn(
        "px-6 py-3 rounded-lg",
        variant === "default" && "bg-black hover:bg-gray-800 text-white",
        variant === "outline" && "border-gray-300 text-gray-700 hover:bg-gray-50"
      )}
      asChild
      {...props}
    >
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        <Icon className="w-4 h-4 mr-2" />
        {children}
      </a>
    </Button>
  );
}

export function TeamMemberContent({
  member,
  isLoading = false,
  error = null,
  className
}: TeamMemberContentProps) {
  // Handle loading state
  if (isLoading) {
    return <TeamMemberContentSkeleton />;
  }

  // Handle error state
  if (error) {
    return <TeamMemberError error={error} />;
  }

  // Handle missing member data
  if (!member) {
    return (
      <TeamMemberError
        error="Team member not found"
        onRetry={() => window.location.reload()}
      />
    );
  }

  const {
    name,
    role,
    credentials,
    image,
    longBio,
    bio,
    experience_years,
    projects_completed,
    awards = [],
    specializations,
    skills,
    education,
    email,
    linkedin,
    phone
  } = member;

  return (
    <div className={cn("min-h-screen bg-white", className)}>
      {/* Back Button */}
      <div className="pt-8 bg-white sticky top-0 z-30 border-b">
        <div className="container mx-auto px-6 lg:px-20">
          <Button
            variant="outline"
            size="sm"
            className="mb-8 bg-white/95 backdrop-blur-sm"
            asChild
          >
            <Link href="/team" aria-label="Back to team page">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-lg"
      >
        <Image
          src={image}
          alt={`Portrait of ${name}`}
          width={800}
          height={600}
          className="w-full h-auto"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-6 left-6 right-6 text-white"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{name}</h1>
          <p className="text-lg md:text-xl mb-1 opacity-90">{role}</p>
          {credentials && (
            <p className="text-base opacity-75">{credentials}</p>
          )}
        </motion.div>
      </motion.div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bio Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Biography</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {longBio || bio}
            </p>
          </div>
        </section>

        {/* Stats Section */}
        {(experience_years || projects_completed || awards.length > 0) && (
          <section className="mb-12">
            <h2 className="sr-only">Key Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {experience_years && (
                <StatCard
                  value={`${experience_years}+`}
                  label="Years Experience"
                  icon={Calendar}
                />
              )}
              {projects_completed && (
                <StatCard
                  value={`${projects_completed}+`}
                  label="Projects Completed"
                  icon={Target}
                />
              )}
              {awards.length > 0 && (
                <StatCard
                  value={`${awards.length}+`}
                  label="Awards"
                  icon={Award}
                />
              )}
            </div>
          </section>
        )}

        {/* Specializations */}
        {specializations && specializations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Specializations
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {specializations.map((spec: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors"
                >
                  {spec}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Skills & Expertise
            </h2>
            <div className="grid gap-6 md:gap-8">
              {skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-black" />
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill: string, skillIndex: number) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm border-gray-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu: string, index: number) => (
                <div key={index} className="flex items-start group">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <div className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-base md:text-lg">{edu}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Awards & Recognition
            </h2>
            <div className="grid gap-3 md:gap-4">
              {awards.map((award: string, index: number) => (
                <Card key={index} className="border-l-4 border-l-black">
                  <CardContent className="p-4 flex items-start">
                    <Award className="w-5 h-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{award}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="border-t pt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {email && (
              <ContactButton href={`mailto:${email}`} icon={Mail}>
                Send Email
              </ContactButton>
            )}
            {linkedin && (
              <ContactButton href={linkedin} icon={Linkedin} variant="outline">
                Connect on LinkedIn
              </ContactButton>
            )}
            {phone && (
              <ContactButton href={`tel:${phone}`} icon={Phone} variant="outline">
                Call {phone}
              </ContactButton>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
