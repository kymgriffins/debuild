"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllTeamMembers } from "@/lib/teams";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { LineSweep } from "@/components/motion/LineSweep";

export default function TeamPage() {
  const teamMembers = getAllTeamMembers();

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

      {/* Team Members Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-foreground hover:bg-white">
                      {member.credentials}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                        <p className="text-primary font-medium">{member.role}</p>
                        <p className="text-sm text-muted-foreground">{member.experience}</p>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Specializations</p>
                          <div className="flex flex-wrap gap-1">
                            {member.specializations.map((spec, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                              {member.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                              {member.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full group-hover:bg-primary/90 transition-colors" asChild>
                        <Link href={`/team/member/${member.slug}`}>
                          View Full Profile
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
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
              Work With Our Experts
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Our team is ready to bring your architectural vision to life. Let's discuss your project and find the perfect fit for your needs.
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
