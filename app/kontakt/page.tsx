"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Truck } from 'lucide-react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-brand-dark pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase text-brand-dark dark:text-white"
          >
            Napisz <span className="text-brand-red">do nas</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Masz pytanie, chcesz zamówić na konkretną godzinę odbiór w lokalu, lub przygotowujesz imprezę w Grybowie? Skontaktuj się!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-white/5">
              <h2 className="text-3xl font-black mb-8 text-brand-dark dark:text-white">Informacje</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-brand-red/10 p-3 rounded-2xl">
                    <MapPin className="text-brand-red w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-dark dark:text-white">Lokalizacja</h4>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">ul. Główna 1, 33-330 Grybów</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-brand-red/10 p-3 rounded-2xl">
                    <Phone className="text-brand-red w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-dark dark:text-white">Telefon</h4>
                    <a href="tel:+48123456789" className="text-2xl font-black text-brand-red hover:text-red-700 transition">
                      +48 123 456 789
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-brand-red/10 p-3 rounded-2xl">
                    <Mail className="text-brand-red w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-brand-dark dark:text-white">Email</h4>
                    <a href="mailto:kontakt@maxburger.pl" className="text-slate-600 dark:text-slate-400 font-medium hover:text-brand-red transition">
                      kontakt@maxburger.pl
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-brand-yellow rounded-3xl p-8 md:p-10 shadow-sm text-brand-dark">
              <div className="flex items-center gap-4 mb-4">
                <Truck className="w-8 h-8" />
                <h2 className="text-3xl font-black">Odbiór osobisty na czas!</h2>
              </div>
              <p className="font-medium text-lg leading-relaxed">
                Zamów wygodnie na wynos przez naszą stronę lub zadzwoń. Złóż zamówienie z domu czy pracy w <strong className="font-black">Gorlicach, Stróżach czy Nowym Sączu</strong>, wpadnij do Grybowa i zgarnij gorące jedzenie bez czekania w kolejce!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-white/5">
            <h2 className="text-3xl font-black mb-8 text-brand-dark dark:text-white">Formularz kontaktowy</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Imię i nazwisko</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Adres email</label>
                <input 
                  type="email" 
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="jan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Wiadomość</label>
                <textarea 
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all resize-none"
                  placeholder="Jak możemy wam pomóc?"
                />
              </div>
              <button className="w-full py-4 bg-brand-red hover:bg-red-600 text-white font-black rounded-xl text-lg transition-transform hover:scale-[1.02] shadow-md">
                Wyślij wiadomość
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
