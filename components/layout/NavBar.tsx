"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/projects' },
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
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        hasScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-sm'
          : 'bg-black/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
              hasScrolled ? 'bg-black' : 'bg-white'
            }`}>
              <span className={`text-lg font-bold transition-colors duration-500 ${
                hasScrolled ? 'text-white' : 'text-black'
              }`}>
                ODL
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-all duration-500 ${
                  hasScrolled
                    ? 'text-black/70 hover:text-black'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button className={`hidden md:inline-flex text-base px-6 py-3 rounded-full font-medium transition-all duration-500 ${
              hasScrolled
                ? 'bg-black hover:bg-black/90 text-white'
                : 'bg-white hover:bg-white/90 text-black'
            }`}>
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
              className="rounded-full bg-black/5 hover:bg-black/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Backdrop overlay */}
            {isOpen && (
              <motion.div
                className="fixed inset-0 bg-white/90 backdrop-blur-xl z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Mobile menu dropdown */}
            {isOpen && (
              <motion.div
                className="absolute top-24 right-6 left-6 sm:left-auto sm:w-80 w-auto bg-white/95 backdrop-blur-xl border border-black/10 shadow-2xl rounded-3xl z-40"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col space-y-2 p-8">
                  {navigation.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-lg text-black/70 hover:text-black transition-all duration-300 py-4 px-4 rounded-2xl hover:bg-black/5 font-medium"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navigation.length * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Button className="mt-6 w-full text-lg px-6 py-4 rounded-full bg-black hover:bg-black/90 text-white font-medium transition-all duration-300">
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
