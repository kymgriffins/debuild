// Simple directory route to show all team members
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTeamMembers } from "@/lib/teams";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TeamDirectory() {
  const teamMembers = getAllTeamMembers();

  return (
    <div className="min-h-screen py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">
            Our Team
          </h1>
          <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto">
            Meet the architects and designers who bring your vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4">{member.credentials}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specializations.slice(0, 3).map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link href={`/team/${member.slug}`}>
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">
              Start a Project <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
