"use client";

import Link from "next/link";
import { useState } from "react";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Home,
  Building,
  Ruler,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  PlusCircle,
  MinusCircle,
  Sparkles
} from "lucide-react";

const projectTypes = [
  {
    id: "residential",
    name: "Residential",
    icon: Home,
    description: "Homes, apartments, condos"
  },
  {
    id: "commercial",
    name: "Commercial",
    icon: Building,
    description: "Offices, retail, hospitality"
  }
];

const roomTypes = [
  { id: "1-bedroom", name: "1 Bedroom", basePrice: 80000 },
  { id: "2-bedroom", name: "2 Bedrooms", basePrice: 120000 },
  { id: "3-bedroom", name: "3 Bedrooms", basePrice: 160000 },
  { id: "4-bedroom", name: "4 Bedrooms", basePrice: 220000 },
  { id: "5-bedroom", name: "5 Bedrooms", basePrice: 280000 },
  { id: "custom", name: "Custom", basePrice: 0 }
];

const finishingOptions = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential finishes with functional design",
    multiplier: 1.0,
    features: [
      "Standard flooring (vinyl/tiles)",
      "Basic electrical fixtures",
      "Standard paint",
      "Basic plumbing fixtures",
      "Essential appliances"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    description: "Quality finishes with modern touches",
    multiplier: 1.3,
    features: [
      "Quality tiled/wood flooring",
      "Modern electrical fittings",
      "Premium paint selection",
      "Branded plumbing fixtures",
      "Standard appliances"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    description: "High-end materials and craftsmanship",
    multiplier: 1.8,
    features: [
      "Designer flooring options",
      "Smart home integration",
      "Designer lighting fixtures",
      "Designer sanitary fittings",
      "Premium branded appliances"
    ]
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Bespoke finishes with luxury materials",
    multiplier: 2.5,
    features: [
      "Custom flooring (marble/stone)",
      "Smart home automation",
      "Bespoke lighting design",
      "Luxury brand fixtures",
      "Gourmet appliances & features"
    ]
  }
];

export default function DebuildBasicCalculatorPage() {
  const [projectType, setProjectType] = useState("residential");
  const [selectedRoom, setSelectedRoom] = useState("4-bedroom");
  const [customRooms, setCustomRooms] = useState(4);
  const [finishingLevel, setFinishingLevel] = useState("standard");
  const [showResults, setShowResults] = useState(false);

  const getRoomData = () => {
    if (selectedRoom === "custom") {
      return { name: `${customRooms} Bedroom${customRooms > 1 ? 's' : ''}`, basePrice: customRooms * 55000 };
    }
    return roomTypes.find(room => room.id === selectedRoom) || roomTypes[3];
  };

  const selectedRoomData = getRoomData();
  const selectedFinishing = finishingOptions.find(f => f.id === finishingLevel) || finishingOptions[1];
  const totalEstimate = Math.round(selectedRoomData.basePrice * selectedFinishing.multiplier);

  const calculateTimeline = () => {
    const finishingMultiplier = {
      basic: 1,
      standard: 1.2,
      premium: 1.5,
      luxury: 2
    };

    const roomMultiplier = {
      "1-bedroom": 1,
      "2-bedroom": 1.3,
      "3-bedroom": 1.6,
      "4-bedroom": 2,
      "5-bedroom": 2.4,
      "custom": customRooms / 4
    };

    const baseWeeks = 12;
    const calculatedWeeks = Math.round(baseWeeks * finishingMultiplier[finishingLevel as keyof typeof finishingMultiplier] * roomMultiplier[selectedRoom as keyof typeof roomMultiplier]);

    return calculatedWeeks;
  };

  const timeline = calculateTimeline();

  return (
    <>
      <NavBar />

      <main className="pt-20 pb-16">
        {/* Header */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                <Calculator className="w-5 h-5 text-blue-600" />
                <Badge className="bg-blue-600">Free Tool</Badge>
              </div>
              <LineSweep />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-6 mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Debuild Basic Calculator
                </span>
              </h1>
              <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Get a personalized budget estimate for your architectural project in minutes.
                Perfect for getting a feel of what amazing is possible with Debuild.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
              {!showResults ? (
                <Card className="border-2 border-blue-100">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2 mb-4">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      Estimate Your Project
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Let's understand your vision so we can provide accurate estimates
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Project Type */}
                    <div>
                      <Label className="text-base font-semibold block mb-4">
                        What type of project are you planning?
                      </Label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {projectTypes.map((type) => (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all ${
                              projectType === type.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setProjectType(type.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <type.icon className={`w-8 h-8 mx-auto mb-3 ${
                                projectType === type.id ? 'text-blue-600' : 'text-gray-500'
                              }`} />
                              <h3 className="font-medium mb-1">{type.name}</h3>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Room Selection */}
                    <div>
                      <Label className="text-base font-semibold block mb-4">
                        How many bedrooms are you planning for?
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {roomTypes.slice(0, 5).map((room) => (
                          <Button
                            key={room.id}
                            variant={selectedRoom === room.id ? "default" : "outline"}
                            className={`h-12 ${selectedRoom === room.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                            onClick={() => {
                              setSelectedRoom(room.id);
                              if (room.id !== "custom") {
                                setCustomRooms(roomTypes.find(r => r.id === room.id)?.basePrice ? Math.round((roomTypes.find(r => r.id === room.id)?.basePrice || 0) / 55000) : 4);
                              }
                            }}
                          >
                            {room.name}
                          </Button>
                        ))}
                        <Button
                          variant={selectedRoom === "custom" ? "default" : "outline"}
                          className={`h-12 ${selectedRoom === "custom" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                          onClick={() => setSelectedRoom("custom")}
                        >
                          Custom
                        </Button>
                      </div>

                      {selectedRoom === "custom" && (
                        <div className="flex items-center justify-center gap-4 mt-4">
                          <Label className="text-sm">Number of bedrooms:</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCustomRooms(Math.max(1, customRooms - 1))}
                            >
                              <MinusCircle className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={customRooms}
                              onChange={(e) => setCustomRooms(Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-20 text-center"
                              min={1}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCustomRooms(customRooms + 1)}
                            >
                              <PlusCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Finishing Level */}
                    <div>
                      <Label className="text-base font-semibold block mb-4">
                        What's your preferred finishing level?
                      </Label>
                      <div className="grid gap-4">
                        {finishingOptions.map((option) => (
                          <Card
                            key={option.id}
                            className={`cursor-pointer transition-all ${
                              finishingLevel === option.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setFinishingLevel(option.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  {finishingLevel === option.id && (
                                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                  )}
                                  {!finishingLevel || finishingLevel !== option.id ? (
                                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                                  ) : null}
                                  <Label className="font-semibold cursor-pointer">
                                    {option.name}
                                  </Label>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(option.multiplier * 100)}% base
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                              <ul className="text-xs text-muted-foreground grid grid-cols-2 gap-1">
                                {option.features.slice(0, 4).map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {feature}
                                  </li>
                                ))}
                                {option.features.length > 4 && (
                                  <li className="text-blue-600 font-medium">+ more...</li>
                                )}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Calculate Button */}
                    <Button
                      size="lg"
                      className="w-full mt-8"
                      onClick={() => setShowResults(true)}
                    >
                      Calculate My Estimate
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-800">
                      Your Project Estimate
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Here's what working with Debuild could look like for your dream space
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Summary */}
                    <div className="bg-white rounded-lg p-6 border">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-4">Project Summary</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span>Type:</span>
                              <span className="font-medium">{projectTypes.find(t => t.id === projectType)?.name}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Size:</span>
                              <span className="font-medium">{selectedRoomData.name}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Finishing:</span>
                              <span className="font-medium">{selectedFinishing.name}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Timeline:</span>
                              <span className="font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {timeline} weeks
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-4">Your Estimate</h3>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                              ${totalEstimate.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ≈ ${(Math.round(totalEstimate * 4 / 3 / 1000) * 1000).toLocaleString()} total construction
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              *Prices in USD, subject to location and specifications
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h3 className="font-semibold mb-4">What's Included in This Estimate</h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {selectedFinishing.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Ruler className="w-5 h-5 text-blue-600" />
                        Ready for Precision?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        This is your starting point! For accurate pricing tailored to your actual site,
                        specs, and vision, let's get a free detailed consultation.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild className="flex-1">
                          <Link href="/contact">
                            Get Detailed Quote
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1">
                          <Link href="/services">
                            View All Services
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      onClick={() => setShowResults(false)}
                      className="w-full"
                    >
                      ← Recalculate
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Transparency is important to us. Here are some frequently asked questions about our estimates.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How accurate are these estimates?</h3>
                  <p className="text-sm text-muted-foreground">
                    These are ballpark figures based on typical projects. Factors like your location,
                    specific materials chosen, site conditions, and local regulations can affect the final cost.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What's included in the architectural fee?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our fee covers concept development, detailed drawings, permit coordination,
                    construction documents, and site visits throughout the project.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I modify my selections later?</h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! This calculator gives you a starting point. We'll refine your budget
                    and timeline once we understand your specific vision and project details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
