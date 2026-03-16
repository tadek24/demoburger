"use client";

import { Hero } from '@/components/Hero';
import { BurgerCard } from '@/components/BurgerCard';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/store/cart';
import { ShoppingBag, Star, ShieldCheck, Flame, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const BESTSELLERS = [
  {
    id: "smash-burger",
    name: "Smash Burger",
    description: "Wołowina 200g, bułka brioche, sos burger, ser x2, piklowana czerwona cebula, ogórek konserwowy.",
    price: 34.00,
    image: "🍔",
    ingredients: ["Wołowina", "Bułka brioche", "Ser x2", "Sos burger"]
  },
  {
    id: "zboj-burger",
    name: "Zboczuji burger",
    description: "Wołowina 200g, bułka brioche, sałata, sos jalapeño, ser BBQ, cebula karmelizowana, podwójny bekon, pomidor, ogórek konserwowy.",
    price: 38.00,
    image: "🍔",
    ingredients: ["Wołowina", "Sos jalapeño", "Ser BBQ", "Podwójny bekon"]
  },
  {
    id: "pizza-margherita",
    name: "Margherita 40cm",
    description: "Sos pomidorowy, ser, oregano.",
    price: 38.00,
    image: "🍕",
    ingredients: ["Sos pomidorowy", "Ser", "Oregano"]
  }
];

const FAQS = [
  {
    q: "Gdzie zjem najlepszego burgera w okolicach Gorlic i Nowego Sącza?",
    a: "W Fire Burger stawiamy na 100% rzemieślniczej wołowiny i świeże, lokalne dodatki. Gwarantujemy, że warto do nas podjechać!"
  },
  {
    q: "Czy mogę zamówić jedzenie na wynos?",
    a: "Oczywiście! Nasz system pozwala na szybkie złożenie zamówienia online. Ty wybierasz godzinę, a my przygotowujemy gorące jedzenie do odbioru osobistego w naszym lokalu w Grybowie, bez czekania w kolejce."
  },
  {
    q: "Z jakich składników robicie swoje dania?",
    a: "Używamy tylko sprawdzonej rolniczo wołowiny, rzemieślniczych maślanych bułek wypiekanych rano i najwyższej jakości składników do naszej chrupiącej pizzy. Każde danie robione jest od podstaw z myślą o smaku."
  }
];

export default function Home() {
  const { openCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen relative pb-24 bg-white dark:bg-brand-dark overflow-hidden">
      <Hero />
      
      {/* Bestsellers Section */}
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-brand-dark dark:text-white uppercase">
            Nasze <span className="text-brand-red">Bestsellery</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium">Najczęściej wybierane klasyki przez naszych gości z całego regionu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BESTSELLERS.map((item) => (
             <BurgerCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* SEO Section: Dlaczego my */}
      <section id="dlaczego-my" className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white leading-[1.1] tracking-tight">
                Dlaczego <span className="text-brand-red">Fire Burger?</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                <p>
                  Myślisz, <strong className="text-brand-dark dark:text-white font-bold">gdzie zjeść w Grybowie</strong>? Jeśli cenisz smak prawdziwego mięsa, dobrze trafiłeś. Jesteśmy dumni, że nasi goście uznają nas za cel, pod tytułem: <strong className="text-brand-dark dark:text-white font-bold">najlepsza burgerownia w okolicy Nowego Sącza</strong>. 
                </p>
                <p>
                  To proste – <strong className="text-brand-red font-bold">rzemieślnicza wołowina</strong> formowana ręcznie każdego ranka, świeże bułki brioche i oryginalne, autorskie sosy robią gigantyczną różnicę w porównaniu do sieciowych potraw. Do tego dochodzi <strong className="text-brand-yellow font-bold">gorąca pizza z pieca</strong>, chrupiąca i pyszna, obładowana Twoimi ulubionymi dodatkami.
                </p>
                <p>
                  Warto do nas przyjechać z każdego zakątka regionu. Przygotujemy Twoje jedzenie na wynos tak, aby po przybyciu na miejsce od razu można było cieszyć się jego perfekcyjnym smakiem.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center shadow-xl overflow-hidden group">
                {/* Photo Placeholder */}
                <span className="text-8xl group-hover:scale-110 transition-transform duration-500 relative z-10 mb-4 drop-shadow-lg">🍔 🔥 🍕</span>
                <span className="text-sm font-bold text-slate-500 z-10 bg-white/80 dark:bg-black/80 px-4 py-2 rounded-full absolute bottom-4 right-4 backdrop-blur">(Zdjęcie: 800x600px - Kuchnia na żywo)</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/10 to-brand-yellow/10 opacity-50"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-yellow text-brand-dark font-black p-6 rounded-3xl shadow-2xl rotate-[-5deg]">
                <span className="text-4xl block">100%</span>
                ŚWIEŻE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-brand-dark dark:text-white">
            Karmimy cały region – Warto do nas wpaść!
          </h2>
          <div className="h-2 w-24 bg-brand-red mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5">
            <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-6">
              <Flame className="text-brand-red w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-brand-dark dark:text-white">Burgery Gorlice</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Szukasz burgera z prawdziwej wołowiny? Wielu naszych gości przyjeżdża z Gorlic, by zjeść coś wyjątkowego. Wpadnij do nas na solidną porcję mięsa.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5">
            <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6">
              <Star className="text-brand-green w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-brand-dark dark:text-white">Pizza Grybów</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Nasz lokal znajduje się w samym sercu Grybowa. Jesteśmy lokalnym punktem na mapie, w którym zjesz najlepszą, gorącą pizzę i rzemieślnicze burgery.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5">
            <div className="w-14 h-14 bg-brand-yellow/20 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-brand-yellow w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-brand-dark dark:text-white">Jedzenie Nowy Sącz</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Jesteś w trasie lub szukasz świetnego jedzenia poza Nowym Sączem? Zrób sobie przerwę w Fire Burger. Zamów online na wynos i zgarnij jedzenie po drodze.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5">
            <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-6">
              <ShoppingBag className="text-brand-red w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-brand-dark dark:text-white">Na wynos Stróże i okolice</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Mieszkasz w Stróżach? Masz do nas rzut beretem! Przeklikaj swoje zamówienie na stronie i odbierz je ciepłe o wyznaczonej przez Ciebie godzinie.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 py-24">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-brand-dark dark:text-white">
              Często zadawane pytania
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="p-6 flex justify-between items-center group">
                  <h4 className="font-bold text-lg text-brand-dark dark:text-white pr-8">{faq.q}</h4>
                  <ChevronDown 
                    className={`text-brand-red transition-transform duration-300 w-6 h-6 flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CartDrawer />

      {/* Floating Cart Button */}
      <motion.button
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openCart}
        className="fixed bottom-8 right-8 z-50 p-5 rounded-full bg-brand-yellow text-brand-dark shadow-[0_10px_40px_rgba(250,204,21,0.5)] flex items-center justify-center group border-2 border-white dark:border-slate-800"
      >
        <div className="relative">
          <ShoppingBag size={32} />
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 bg-brand-red text-white text-sm font-black w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-brand-dark">
              {totalItems}
            </span>
          )}
        </div>
      </motion.button>
    </main>
  );
}
