"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { LineSweep } from "@/components/motion/LineSweep";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  ExternalLink,
  Award,
  BookOpen,
  Calendar,
  Users,
  MapPin,
  ArrowLeft,
  Download,
  Share2,
  Linkedin,
  Building2,
  Quote
} from "lucide-react";
import { getTeamMemberBySlug } from "@/lib/teams";

interface TeamMemberContentProps {
  params: Promise<{
    slug: string;
  }>;
}

export function TeamMemberContent({ params }: TeamMemberContentProps) {
  const resolvedParams = use(params);
  const teamMember = getTeamMemberBySlug(resolvedParams.slug);

  if (!teamMember) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button variant="outline" size="sm" className="px-4" asChild>
              <Link href="/meet-our-team">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={teamMember.image}
                    alt={teamMember.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Role Badge */}
                <div className="absolute -bottom-6 -right-6">
                  <div className="bg-card rounded-xl p-4 shadow-xl border">
                    <div className="text-sm font-medium text-primary">{teamMember.role}</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{teamMember.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-2">
                  {teamMember.name}
                </h1>
                <p className="text-primary font-medium text-xl">{teamMember.role}</p>
                <p className="text-primary text-sm font-medium">{teamMember.credentials}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">
                {teamMember.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{teamMember.experience_years}</div>
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{teamMember.projects_completed}</div>
                  <div className="text-xs text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{teamMember.awards.length}</div>
                  <div className="text-xs text-muted-foreground">Awards Won</div>
                </div>
              </div>

              {/* Contact & Social */}
              <div className="space-y-4">
                <h3 className="font-semibold">Connect</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <a href={`mailto:${teamMember.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={`tel:${teamMember.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </a>
                  </Button>
                </div>

                {teamMember.linkedin && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={teamMember.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn Profile
                    </a>
                  </Button>
                )}
              </div>

              {/* Specializations */}
              <div>
                <h3 className="font-semibold mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {teamMember.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
              About {teamMember.name.split(' ')[0]}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              {teamMember.longBio.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Selected works that showcase {teamMember.name.split(' ')[0]}'s expertise and design philosophy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMember.featured_projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg group hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="text-xs">{project.year}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Education */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
                Skills & Expertise
              </h2>
              <div className="space-y-6">
                {teamMember.skills.map((skillGroup, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-3">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education & Awards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Education */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
                  Education
                </h2>
                <div className="space-y-4">
                  {teamMember.education.map((edu, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 mr-4"></div>
                      <div>
                        <p className="text-sm font-medium">{edu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
                  Awards & Recognition
                </h2>
                <div className="space-y-4">
                  {teamMember.awards.map((award, index) => (
                    <div key={index} className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{award}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophies */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <LineSweep />
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mt-6 mb-4">
              Design Philosophy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide {teamMember.name.split(' ')[0]}'s approach to architecture and design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMember.philosophies.map((philosophy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Quote className="w-8 h-8 mx-auto text-primary/50 mb-4" />
                    <p className="text-sm leading-relaxed">{philosophy}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Ready to Work with {teamMember.name.split(' ')[0]}?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {teamMember.name.split(' ')[0]} specializes in bringing innovative design solutions to life. Let's discuss your project and see how we can collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/meet-our-team">Meet the Full Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
