"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to subscribe');
      }

      setIsSubmitted(true);
      setEmail("");
      setName("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FadeIn>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Stay Connected</h3>
            <p className="text-muted-foreground">
              Get the latest updates on our projects, design insights, and exclusive content.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Welcome to our community!</h4>
              <p className="text-muted-foreground">
                Check your email for a welcome message and stay tuned for updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="newsletter-name">Name (Optional)</Label>
                <Input
                  id="newsletter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="newsletter-email">Email Address *</Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="mt-1"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe to Newsletter
                    <Mail className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  );
}
