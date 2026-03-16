"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background neon glow */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="w-96 h-96 bg-neon-green/20 rounded-full blur-[120px]" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-neon-pink/10 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        >
          NEON <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue neon-text-green">BURGER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-400 mb-10 font-light"
        >
          Przyszłość smaku w trybie widma. Tech-heavy klasyka.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToMenu}
          className="px-8 py-4 bg-transparent border-2 border-neon-green text-neon-green text-xl font-bold rounded-lg neon-box-green uppercase tracking-wider transition-all hover:bg-neon-green/10"
        >
          Zamów Teraz
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10 animate-bounce cursor-pointer"
        onClick={scrollToMenu}
      >
        <ChevronDown size={32} className="text-neon-green" />
      </motion.div>
    </section>
  );
}
