"use client";

import Link from "next/link";

const footerLinks = {
  services: [
    { name: 'Architectural Design', href: '#' },
    { name: 'Interior Design', href: '#' },
    { name: 'Project Management', href: '#' },
    { name: 'Consultation', href: '#' },
    { name: '3D Visualization', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Process', href: '#process' },
    { name: 'Studio', href: '#studio' },
    { name: 'Careers', href: '#' },
    { name: 'News', href: '#' },
  ],
  connect: [
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
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

            <div className="flex space-x-4">
              {['Instagram', 'LinkedIn', 'Twitter'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={platform}
                >
                  <span className="text-sm font-medium">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-foreground mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
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
              © 2025 ODL Architecture Studio. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Cookies
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
