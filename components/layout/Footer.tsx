"use client";

import Link from "next/link";

const footerNavigation = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Blog", url: "/blog" },
  { title: "Work", url: "/projects" },
  { title: "Terms", url: "/terms-conditions" },
  { title: "Privacy Policy", url: "/privacy-policy" }
];

const socialMediaLinks = [
  { title: "Facebook", url: "https://www.facebook.com/weldon.kimutai.96/" },
  { title: "Instagram", url: "https://www.instagram.com/weldon_kym/" },
  { title: "Twitter", url: "https://x.com/kym_weldon" },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/weldon-kimutai-380610173" }
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="dark bg-section-dark text-text-inverse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background text-lg font-bold">ODL</span>
              </div>
              <span className="ml-3 text-xl font-light tracking-wide">Architecture</span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Crafting architectural experiences that shape how we live, work, and connect with one another. Every space tells a story.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:outlinedesignsltd@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  outlinedesignsltd@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=South+Bend,+Indiana,+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  South Bend, Indiana, USA
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-foreground mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerNavigation.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-foreground mb-4">
              Follow Us
            </h3>
            <ul className="space-y-3">
              {socialMediaLinks.map((social) => (
                <li key={social.title}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {social.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-xs text-muted-foreground mb-3">
                Stay updated with our latest projects
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-r-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © Outline {currentYear}
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
            </div>

            {/* Built with indicator */}
            <div className="text-xs text-muted-foreground">
              Built by Gr8
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
