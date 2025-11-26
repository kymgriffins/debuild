"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Team', href: '/team' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        hasScrolled
          ? 'bg-background border-b border-border shadow-sm'
          : 'bg-background'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center">
              <span className="text-background text-xs sm:text-sm font-bold">ODL</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button className="hidden md:inline-flex text-sm">
              Start Project
            </Button>
          </motion.div>

            {/* Mobile menu button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Backdrop overlay */}
            {isOpen && (
              <motion.div
                className="fixed inset-0 bg-white/80 backdrop-blur-sm z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Mobile menu dropdown */}
            {isOpen && (
              <motion.div
                className="absolute top-16 right-4 left-4 sm:left-auto sm:w-64 w-auto bg-background border border-border shadow-xl rounded-xl z-40"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="flex flex-col space-y-3 p-6">
                  {navigation.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-muted/50"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navigation.length * 0.05 }}
                  >
                    <Button className="mt-4 w-full text-sm">
                      Start Project
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
