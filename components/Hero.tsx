"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const scrollToNext = () => {
    document.getElementById('dlaczego-my')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50 pt-20">
      {/* Background soft shapes */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-50">
        <div className="absolute top-4 left-4 text-sm font-bold text-slate-400 z-50 bg-white/50 px-3 py-1 rounded-full backdrop-blur-md">
          (Tło docelowe: 1920x1080px)
        </div>
        <div className="w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[100px] absolute -top-20 -left-20" />
        <div className="w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] absolute bottom-0 -right-40" />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mt-8">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter text-brand-dark leading-[1.1]"
        >
          Fire Burger – Najlepsze Burgery i Pizza w Regionie
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-8 text-brand-red uppercase tracking-widest"
        >
          Grybów | Gorlice | Nowy Sącz | Stróże
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-600 mb-12 font-medium max-w-3xl mx-auto"
        >
          Prawdziwa rzemieślnicza robota i bezkompromisowy smak. Zamów wygodnie online i odbierz osobiście bez stania w kolejce.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/menu"
            className="w-full sm:w-auto px-10 py-5 bg-brand-red text-white text-xl font-black rounded-full shadow-xl hover:shadow-2xl uppercase tracking-wider transition-all hover:bg-red-600"
          >
            Zamów na wynos
          </Link>
          <button
            onClick={scrollToNext}
            className="w-full sm:w-auto px-10 py-5 bg-white text-brand-dark text-xl font-black rounded-full shadow-md hover:shadow-lg uppercase tracking-wider transition-all border border-slate-200"
          >
            Zobacz Menu
          </button>
        </motion.div>
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
