"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LineSweep } from "@/components/motion/LineSweep";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  MapPin,
  Award,
  Calendar,
  ExternalLink,
  ArrowRight
} from "lucide-react";

import { getAllTeamMembers } from "@/lib/teams";

const team = [
  {
    slug: "judy-chesire",
    name: "Judy Chesire",
    role: "Principal Architect",
    image: "/mockdata/team/optimized/judy-chesire-profile.jpg",
    imageWebp: "/mockdata/team/optimized/judy-chesire-profile.webp",
    imageAvif: "/mockdata/team/optimized/judy-chesire-profile.avif",
    credentials: "B.Arch , Project Manager "
  },
  {
    slug: "kevin-yegon",
    name: "Kevin Yegon",
    role: "Design Director",
    image: "/mockdata/team/optimized/kevin-yegon-profile.jpg",
    imageWebp: "/mockdata/team/optimized/kevin-yegon-profile.webp",
    imageAvif: "/mockdata/team/optimized/kevin-yegon-profile.avif",
    credentials: "B.Arch, BIM Specialist"
  },
  {
    slug: "kimwetich-weldon",
    name: "Kimwetich Weldon",
    role: "Project Manager",
    image: "/mockdata/team/optimized/kimwetich-weldon-profile.jpg",
    imageWebp: "/mockdata/team/optimized/kimwetich-weldon-profile.webp",
    imageAvif: "/mockdata/team/optimized/kimwetich-weldon-profile.avif",
    credentials: "CEO,  M.Arch"
  }
];

const stats = [
  { label: "Years Experience", value: "+5" },
  { label: "Projects Completed", value: "21+" },
  { label: "Team Members", value: "25" },
  { label: "Awards Won", value: "3+" }
];

const pressLogos = [
  { name: "Architectural Digest", url: "#" },
  { name: "Dezeen", url: "#" },
  { name: "ArchDaily", url: "#" },
  { name: "Design Within Reach", url: "#" },
  { name: "Metropolis Magazine", url: "#" },
  { name: "Interior Design", url: "#" }
];

export function StudioSnapshot() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LineSweep />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-6 mb-4">
            Award-Winning Studio
          </h2>
          <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
            A collaborative team of visionary architects and designers bringing ideas to life through innovative design and sustainable practices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Studio Image & Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Studio Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/mockdata/renders/Photo_ModernHouse_Exterior.jpeg"
                  alt="Studio workspace"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 flex space-x-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-xl border"
                  >
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Studio Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
                <span>•</span>
                <Calendar className="w-4 h-4" />
                <span>Est. 2020</span>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Our studio combines traditional architectural principles with cutting-edge technology,
                creating spaces that are both timeless and contemporary. We believe in sustainable
                design that benefits both people and the planet.
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Sustainable Design</Badge>
                <Badge variant="secondary">Award-Winning</Badge>
                <Badge variant="secondary">15+ Years</Badge>
                <Badge variant="secondary">LEED Certified</Badge>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Team & Recognition */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Team Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-primary" />
                Our Team
              </h3>
              <div className="space-y-4">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={`/team/${member.slug}`} className="block group">
                      <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={member.image}
                                alt={member.name}
                                srcSet={`${member.imageAvif} 1x, ${member.imageWebp} 1x, ${member.image} 1x`}
                              />
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{member.name}</h4>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                              <p className="text-xs text-primary font-medium">{member.credentials}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recognition Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-primary" />
                Recognition
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">Recent Awards</span>
                    <Badge className="text-xs">2024</Badge>
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div>• AIA Design Excellence Award</div>
                    <div>• LEED Platinum Certification</div>
                    <div>• ArchDaily Building of the Year</div>
                  </div>
                </div>

                {/* Press Mentions */}
                <div>
                  <p className="text-sm font-medium mb-3">As featured in</p>
                  <div className="flex flex-wrap gap-2">
                    {pressLogos.slice(0, 4).map((press, index) => (
                      <motion.a
                        key={press.name}
                        href={press.url}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded bg-muted/50 hover:bg-muted"
                      >
                        {press.name}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-6">
            Experience our award-winning design process firsthand.
          </p>
          <Button size="lg" className="min-w-[200px]" asChild>
            <Link href="/team">
              Meet Our Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
