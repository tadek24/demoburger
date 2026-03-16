"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Strona Główna", href: "/" },
    { name: "Menu", href: "/menu" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tighter uppercase neon-text-green">Neon Burger</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-neon-green ${
                    pathname === link.href ? "text-neon-green" : "text-foreground/80 dark:text-foreground/80 text-black dark:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-neon-green" /> : <Moon className="w-5 h-5 text-neon-green" />}
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-neon-green" /> : <Moon className="w-5 h-5 text-neon-green" />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 dark:text-white text-black" /> : <Menu className="w-6 h-6 dark:text-white text-black" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-black/10 dark:border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                    pathname === link.href ? "text-neon-green bg-black/5 dark:bg-white/5" : "text-foreground/80 dark:text-white text-black"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
