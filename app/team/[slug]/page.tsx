"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTeamMemberBySlug } from "@/lib/teams";
import { ArrowLeft, Mail, Phone, Calendar, Award, ExternalLink } from "lucide-react";

export default function TeamMemberPage() {
  const params = useParams();
  const member = getTeamMemberBySlug(params.slug as string);

  if (!member) {
    return (
      <div className="min-h-screen py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-8">
            Team Member Not Found
          </h1>
          <p className="text-xl text-muted-foreground/90 mb-8">
            The team member you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/team">View Our Team</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="pt-8">
        <div className="container mx-auto px-6 lg:px-20">
          <Button variant="outline" size="sm" className="mb-8" asChild>
            <Link href="/team">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div>
              <div className="relative">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-muted shadow-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Role Badge */}
                <div className="absolute -bottom-6 -right-6">
                  <div className="bg-card rounded-xl p-4 shadow-xl border">
                    <div className="text-sm font-medium text-primary">{member.role}</div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-2">
                  {member.name}
                </h1>
                <p className="text-primary font-medium text-xl">{member.role}</p>
                <p className="text-primary text-sm font-medium">{member.credentials}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">
                {member.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{member.experience_years}</div>
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{member.projects_completed}</div>
                  <div className="text-xs text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{member.awards.length}</div>
                  <div className="text-xs text-muted-foreground">Awards Won</div>
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h3 className="font-semibold mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="font-semibold">Connect</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link href="/contact">Work with {member.name.split(' ')[0]}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Education */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Skills */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
                Skills & Expertise
              </h2>
              <div className="space-y-6">
                {member.skills.map((skillGroup, index) => (
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
            </div>

            {/* Education */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
                Education & Awards
              </h2>
              <div className="space-y-6">
                {/* Education */}
                <div>
                  <h3 className="font-semibold mb-3">Education</h3>
                  <div className="space-y-4">
                    {member.education.map((edu, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 mr-4"></div>
                        <div className="text-sm">
                          {edu}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div className="mt-8">
                  <h3 className="font-semibold mb-3">Awards & Recognition</h3>
                  <div className="space-y-3">
                    {member.awards.slice(0, 3).map((award, index) => (
                      <div key={index} className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{award}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's bring your architectural vision to life. {member.name.split(' ')[0]} specializes in creating spaces that inspire and endure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/team">Meet the Full Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
