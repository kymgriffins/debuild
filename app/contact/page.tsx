"use client";

import { useState } from "react";
import { SlideUp } from "@/components/motion/SlideUp";
import { LineSweep } from "@/components/motion/LineSweep";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  Building,
  Home,
  Zap
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Chat With Us",
    description: "Quick questions? Start a conversation",
    action: "Live Chat",
    available: "Available 24/7"
  },
  {
    icon: Calendar,
    title: "Schedule Consultation",
    description: "Book a personalized design consultation",
    action: "Book Now",
    available: "Next available: Today"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send detailed project information",
    action: "Send Email",
    available: "Response within 2 hours"
  }
];

const offices = [
  {
    city: "Nairobi",
    address: "Westlands Business Park, Nairobi, Kenya",
    phone: "+254 700 000 000",
    email: "hello@debuild.co.ke",
    hours: "Mon-Fri 9AM-6PM EAT"
  },
  {
    city: "Kajiado",
    address: "Kajiado Town Center, Kajiado, Kenya",
    phone: "+254 700 000 001",
    email: "kajiado@debuild.co.ke",
    hours: "Mon-Fri 9AM-5PM EAT"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <NavBar />

      <main className="pt-20 pb-16">
        {/* Header */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <div className="text-center mb-16">
              <LineSweep />
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Badge className="bg-primary/20 text-primary font-medium">
                  ⚡ RESPOND WITHIN 2 HOURS
                </Badge>
                <span className="text-sm text-primary/80 font-medium">24/7 Support</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight mt-6 mb-4">
                Let's Build<br />Something<br />Extraordinary
              </h1>
              <p className="text-xl text-muted-foreground/90 max-w-4xl mx-auto leading-relaxed mb-8">
                <strong>Ready to transform your vision into reality?</strong> Whether you're dreaming of
                your perfect home, launching a commercial venture, or planning community impact—we're here to make it happen.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">2hrs</div>
                  <div className="text-sm text-muted-foreground">Average Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Free</div>
                  <div className="text-sm text-muted-foreground">Initial Consultation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Confidential</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <SlideUp key={method.title} delay={index * 0.1}>
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm group cursor-pointer">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                        <method.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-muted-foreground/80 mb-4 leading-relaxed">
                        {method.description}
                      </p>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {method.action}
                      </Button>
                      <div className="mt-4 text-xs text-muted-foreground">
                        {method.available}
                      </div>
                    </CardContent>
                  </Card>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Offices */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold mb-4">Tell Us About Your Project</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Share your vision, timeline, and budget. We'll provide a customized proposal
                    and next steps within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you within 2 hours.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50K</SelectItem>
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                            <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="over-500k">Over $500K</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-3-months">1-3 Months</SelectItem>
                            <SelectItem value="3-6-months">3-6 Months</SelectItem>
                            <SelectItem value="6-months-plus">6+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Project Description *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your vision, requirements, and any specific challenges..."
                        required
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Offices & Info */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold mb-4">Visit Our Offices</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Prefer to meet in person? Visit one of our offices for a face-to-face consultation.
                    We also offer virtual meetings worldwide.
                  </p>
                </div>

                <div className="space-y-6 mb-12">
                  {offices.map((office, index) => (
                    <SlideUp key={office.city} delay={index * 0.1}>
                      <Card className="border-0 shadow-md bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4">{office.city} Office</h3>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{office.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{office.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{office.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{office.hours}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </SlideUp>
                  ))}
                </div>

                {/* Additional Info */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">What Happens Next?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Initial Review (2 hours)</h4>
                          <p className="text-sm text-muted-foreground">We review your project details and prepare initial questions.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Discovery Call (30 min)</h4>
                          <p className="text-sm text-muted-foreground">Free consultation to understand your vision and requirements.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Custom Proposal (24 hours)</h4>
                          <p className="text-sm text-muted-foreground">Detailed proposal with timeline, budget, and next steps.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
