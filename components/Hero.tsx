"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToNext = () => {
    document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background soft shapes */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-50 dark:opacity-20">
        <div className="absolute top-4 left-4 text-sm font-bold text-slate-400 dark:text-slate-500 z-50 bg-white/50 dark:bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
          (Tło docelowe: 1920x1080px)
        </div>
        <div className="w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[100px] absolute -top-20 -left-20" />
        <div className="w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] absolute bottom-0 -right-40" />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mt-16">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter text-brand-dark dark:text-white leading-[0.9]"
        >
          SMAKUJ <span className="text-brand-red block md:inline">ŻYCIE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-12 font-medium max-w-2xl mx-auto"
        >
          Prawdziwe rzemieślnicze burgery ze 100% wołowiny i chrupiąca, gorąca pizza prosto z pieca.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
          className="px-10 py-5 bg-brand-red text-white text-xl font-black rounded-full shadow-xl hover:shadow-2xl uppercase tracking-wider transition-all hover:bg-red-600"
        >
          Zamów online
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-10 animate-bounce cursor-pointer p-2 rounded-full bg-white/50 backdrop-blur"
        onClick={scrollToNext}
      >
        <ChevronDown size={32} className="text-brand-red" />
      </motion.div>
    </section>
  );
}
