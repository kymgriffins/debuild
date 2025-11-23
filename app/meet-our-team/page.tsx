"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LineSweep } from "@/components/motion/LineSweep";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  Building2,
  Calendar,
  ExternalLink
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Judy Chesire",
    role: "Principal Architect",
    bio: "With over 15 years of experience in architectural design, Judy leads our creative vision and ensures every project meets the highest standards of innovation and sustainability.",
    image: "/mockdata/team/Judy Chesire.jpg",
    credentials: "LEED AP, AIA",
    experience: "15+ years",
    specializations: ["Sustainable Design", "Commercial Architecture", "Urban Planning"],
    contact: {
      email: "judy@outlinedesignsltd.com",
      phone: "+254 700 000 001"
    }
  },
  {
    id: 2,
    name: "Kevin Yegon",
    role: "Design Director",
    bio: "Kevin specializes in creating functional yet beautiful spaces that blend modern aesthetics with practical design. His expertise in 3D visualization brings projects to life before construction begins.",
    image: "/mockdata/team/Kevin Yegon.png",
    credentials: "M.Arch, NCARB",
    experience: "12+ years",
    specializations: ["Interior Design", "3D Visualization", "Residential Architecture"],
    contact: {
      email: "kevin@outlinedesignsltd.com",
      phone: "+254 700 000 002"
    }
  },
  {
    id: 3,
    name: "Kimwetich Weldon",
    role: "Project Manager",
    bio: "Kimwetich ensures seamless project execution from concept to completion. His expertise in project management and client relations guarantees that timelines and budgets are met while exceeding expectations.",
    image: "/mockdata/team/Kimwetich Weldon.png",
    credentials: "PMP, LEED AP",
    experience: "10+ years",
    specializations: ["Project Management", "Client Relations", "Construction Oversight"],
    contact: {
      email: "kimwetich@outlinedesignsltd.com",
      phone: "+254 700 000 003"
    }
  }
];

const stats = [
  { label: "Years Experience", value: "15+" },
  { label: "Projects Completed", value: "200+" },
  { label: "Team Members", value: "25" },
  { label: "Awards Won", value: "50+" }
];

const services = [
  "Architectural Design",
  "Interior Design",
  "Urban Planning",
  "Project Management",
  "3D Visualization",
  "Sustainable Design",
  "Construction Documentation",
  "Permit Assistance"
];

export default function MeetOurTeamPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LineSweep />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-6 mb-4">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Passionate architects and designers committed to bringing your vision to life with creativity, expertise, and dedication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid gap-12 lg:gap-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Image Section */}
                    <div className="md:col-span-1 relative">
                      <div className="aspect-square md:aspect-[4/5] relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-2 p-8 lg:p-10">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl lg:text-3xl font-light mb-2">{member.name}</h2>
                          <p className="text-primary font-medium text-lg">{member.role}</p>
                          <p className="text-primary text-sm font-medium">{member.credentials}</p>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {member.bio}
                        </p>

                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold text-sm mb-2">Experience</p>
                            <p className="text-sm text-muted-foreground">{member.experience}</p>
                          </div>

                          <div>
                            <p className="font-semibold text-sm mb-2">Specializations</p>
                            <div className="flex flex-wrap gap-2">
                              {member.specializations.map((spec, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <p className="font-semibold text-sm mb-3">Contact</p>
                            <div className="space-y-2">
                              <a
                                href={`mailto:${member.contact.email}`}
                                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Mail className="w-4 h-4" />
                                <span>{member.contact.email}</span>
                              </a>
                              <a
                                href={`tel:${member.contact.phone}`}
                                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Phone className="w-4 h-4" />
                                <span>{member.contact.phone}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Our Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Years of experience and dedication to creating exceptional architectural solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, we provide comprehensive architectural services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Building2 className="w-8 h-8 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold text-sm">{service}</h3>
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
              Ready to Work Together?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's discuss your project and bring your architectural vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/projects">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
