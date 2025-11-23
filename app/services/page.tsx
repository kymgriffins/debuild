"use client";

import Link from "next/link";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Home,
  Palette,
  Zap,
  Wrench,
  Eye,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Award,
  Shield
} from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Architectural Design",
    subtitle: "Where Vision Meets Precision",
    description: "We don't just design buildings—we craft experiences. From initial concept to final construction documents, we blend innovative thinking with technical excellence to create spaces that inspire and function flawlessly.",
    features: [
      "AI-Optimized Space Planning",
      "Concept Development",
      "Advanced Schematic Design",
      "BIM Construction Documents",
      "Permit Coordination & Fast-Track"
    ],
    pricing: "Starting at $5,000",
    popular: false,
    badge: "AI-Powered",
    deliveryTime: "2-6 weeks",
    testimonial: "\"Their architectural precision saved us 15% in construction costs.\" - Sarah K., Commercial Developer"
  },
  {
    icon: Home,
    title: "Interior Design",
    subtitle: "Luxury, Personalized",
    description: "Transform ordinary spaces into extraordinary experiences. Our interior design elevates lives through thoughtful, luxurious spaces that reflect personality while maximizing comfort and functionality.",
    features: [
      "Biophilic Design Integration",
      "Smart Home Technology",
      "Sustainable Material Curation",
      "Lighting Psychology",
      "Ergonomic Space Optimization"
    ],
    pricing: "Starting at $2,500",
    popular: false,
    badge: "Luxury Experience",
    deliveryTime: "3-8 weeks",
    testimonial: "\"Beyond beautiful—it's healing for the soul.\" - Michael L., Homeowner"
  },
  {
    icon: Palette,
    title: "3D Visualization",
    subtitle: "See It Before You Build",
    description: "Immerse yourself in your future space before breaking ground. Our cutting-edge 3D visualizations reduce design changes by 80% and ensure your vision is perfectly realized.",
    features: [
      "Photorealistic 8K Rendering",
      "Interactive VR/AR Tours",
      "AI Material Matching",
      "Real-time Lighting Simulation",
      "360° Virtual Walkthroughs"
    ],
    pricing: "Starting at $800",
    popular: true,
    badge: "Most Popular",
    deliveryTime: "1-3 weeks",
    testimonial: "\"Changed our entire design approach—saved thousands.\" - Architecture Firm"
  },
  {
    icon: Wrench,
    title: "Project Management",
    subtitle: "Execution Excellence",
    description: "From blueprint to reality—our project management ensures seamless execution. We handle the complexity so you can focus on your vision, delivering on time and within budget every time.",
    features: [
      "Real-time Progress Tracking",
      "AI Risk Prediction & Mitigation",
      "Integrated Timeline Management",
      "Quality Assurance Protocols",
      "365-Day Support Guarantee"
    ],
    pricing: "Starting at $3,000",
    popular: false,
    badge: "No Surprises",
    deliveryTime: "Project-based",
    testimonial: "\"They predicted issues before they happened. Incredible.\" - Construction Manager"
  },
  {
    icon: Zap,
    title: "Sustainable Consulting",
    subtitle: "Future-Proof Your Legacy",
    description: "Design buildings that give back to the planet. Our sustainable consulting integrates cutting-edge eco-technologies, achieving LEED Platinum while reducing operational costs by 40%.",
    features: [
      "Net-Zero Energy Modeling",
      "LEED Platinum Certification",
      "Carbon Footprint Analysis",
      "Renewable Integration",
      "Living Building Standards"
    ],
    pricing: "Starting at $2,000",
    popular: false,
    badge: "Sustainable Focus",
    deliveryTime: "2-4 weeks",
    testimonial: "\"Our building now produces more energy than it consumes.\" - Green Developer"
  },
  {
    icon: Eye,
    title: "Feasibility Studies",
    subtitle: "Risk-Free Decision Making",
    description: "Make confident decisions with data-driven insights. Our comprehensive studies eliminate guesswork, providing crystal-clear ROI projections and risk assessments.",
    features: [
      "AI-Powered Cost Forecasting",
      "Market Viability Analysis",
      "Regulatory Compliance Mapping",
      "Financial Modeling",
      "Development Strategy Blueprint"
    ],
    pricing: "Starting at $1,500",
    badge: "Best Value",
    deliveryTime: "1-2 weeks",
    testimonial: "\"Prevented a $2M mistake—worth every penny.\" - Property Investor"
  }
];

const benefits = [
  {
    icon: Award,
    title: "Award-Winning Design",
    description: "Recognized for innovative architectural solutions that push boundaries and create lasting impact."
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Efficient project management ensuring deadlines are met without compromising quality."
  },
  {
    icon: Users,
    title: "Collaborative Approach",
    description: "Work directly with experienced architects who value your input and vision throughout the process."
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous quality control processes ensuring every detail meets our high standards of excellence."
  }
];

export default function ServicesPage() {
  return (
    <>
      <NavBar />

      <main className="pt-20 pb-16">
        {/* Header */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <div className="text-center mb-16">
              <LineSweep />
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Badge className="bg-primary/20 text-primary font-medium">
                  LIMITED CAPACITY Q1 2025
                </Badge>
                <span className="text-sm text-primary/80 font-medium">⏰ 7 spots remaining</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight mt-6 mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Architecture,<br />Reimagined for<br />the Digital Age
              </h1>
              <p className="text-xl text-muted-foreground/90 max-w-4xl mx-auto leading-relaxed mb-8">
                <strong>500+ projects delivered.</strong> We don't just design buildings—we craft
                experiences that inspire, perform, and adapt to tomorrow's challenges.
                From AI-optimized spaces to sustainable masterpieces.
              </p>

              {/* Interactive CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button asChild size="lg" className="min-w-[220px]">
                  <Link href="/contact">
                    Book Discovery Call
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="min-w-[220px] group" asChild>
                  <Link href="#calculator">
                    Calculate Timeline
                    <Clock className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">21+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">7+</div>
                  <div className="text-sm text-muted-foreground">Awards Won</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <SlideUp key={service.title} delay={index * 0.1}>
                  <Card className="relative h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
                    {/* Service Badge */}
                    {service.badge && (
                      <div className="absolute -top-3 left-6 z-10">
                        <Badge className={`${
                          service.badge === 'AI-Powered' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                          service.badge === 'Sustainable Focus' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          service.badge === 'Best Value' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                          service.badge === 'Luxury Experience' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                          service.badge === 'No Surprises' ? 'bg-gradient-to-r from-indigo-500 to-blue-500' :
                          'bg-primary'
                        } text-white px-3 py-1 text-xs font-medium`}>
                          {service.badge}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 mb-1">
                          {service.title}
                        </CardTitle>
                        <p className="font-medium text-primary/80 text-sm mb-3">
                          {service.subtitle}
                        </p>
                        <p className="text-muted-foreground/80 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 flex flex-col flex-1">
                      {/* Features */}
                      <ul className="space-y-2 mb-6 flex-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Testimonial */}
                      <div className="bg-muted/30 rounded-lg p-3 mb-4">
                        <p className="text-xs text-muted-foreground italic leading-tight">
                          {service.testimonial}
                        </p>
                      </div>

                      {/* Pricing & Timeline */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-foreground">
                            {service.pricing}
                          </span>
                          <div className="text-xs text-muted-foreground flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.deliveryTime}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        className="w-full group/button mb-2"
                        asChild
                      >
                        <Link href="/contact" className="flex items-center justify-center">
                          Begin Your Vision
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </Button>

                      {/* Urgency Badge */}
                      <div className="text-center">
                        <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                          ⚡ Act before Q1 fills up
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>



        {/* Interactive Timeline Calculator */}
        <section id="calculator" className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <LineSweep />
                <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                  Calculate Your Project Timeline
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get a personalized timeline estimate for your architectural project.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Residential</h3>
                    <p className="text-sm text-muted-foreground mb-4">Single family homes, condos, renovations</p>
                    <Badge className="bg-primary/20 text-primary">2-8 weeks design</Badge>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Commercial</h3>
                    <p className="text-sm text-muted-foreground mb-4">Offices, retail, hospitality spaces</p>
                    <Badge className="bg-primary/20 text-primary">4-16 weeks design</Badge>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Large Scale</h3>
                    <p className="text-sm text-muted-foreground mb-4">Multi-building, master planning</p>
                    <Badge className="bg-primary/20 text-primary">8-24 weeks design</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Ready for consultation within 24 hours
                </p>
                <Button size="lg" className="min-w-[200px]">
                  Get Your Timeline
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Personalization Quiz */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                  Find Your Perfect Service Package
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Take our quick quiz to get a personalized service recommendation tailored to your project.
                </p>
              </div>

              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block font-medium mb-3">
                        What type of project are you planning?
                      </label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Button variant="outline" className="justify-start">
                          Residential Home
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Commercial Building
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Renovation
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium mb-3">
                        What's your primary goal?
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start">
                          Maximize Property Value
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Sustainable & Eco-Friendly
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium mb-3">
                        Project timeline preference?
                      </label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Button variant="outline" className="justify-start">
                          Rush (1-2 months)
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Standard (3-6 months)
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Flexible (6+ months)
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Get My Personalized Recommendation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

  

        {/* Final CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
              <div className="relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                  <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-2 mb-6">
                    <Badge className="bg-primary text-primary-foreground">
                      🔥 FINAL CALL - Q1 2025 SLOTS FILLING FAST
                    </Badge>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    Your Vision Deserves 2025 Architecture
                  </h2>

                  <p className="text-xl text-muted-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                    <strong>Why settle for average when extraordinary is possible?</strong> Join the
                    architects who trust us with their most ambitious projects. From AI-powered
                    precision to sustainable masterpieces that reduce costs by 40%.
                  </p>

                  {/* Key Benefits */}
                  <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
                      <div className="text-sm text-muted-foreground">Consultation booked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">Free</div>
                      <div className="text-sm text-muted-foreground">Initial assessment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">Guaranteed</div>
                      <div className="text-sm text-muted-foreground">On-time delivery</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="min-w-[220px] shadow-lg group" asChild>
                      <Link href="/contact" className="flex items-center justify-center">
                        Claim Your Spot
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="min-w-[220px] group" asChild>
                      <Link href="/projects" className="flex items-center justify-center">
                        See Success Stories
                        <Eye className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>✨ No commitment required • 💬 Virtual or in-person consultation • 📋 Detailed project planning kit included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
