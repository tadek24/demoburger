"use client";

import { Hero } from '@/components/Hero';
import { BurgerCard } from '@/components/BurgerCard';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function Home() {
  const { openCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen relative pb-24 bg-white dark:bg-brand-dark">
      <Hero />
      
      {/* SEO Section */}
      <section className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-brand-dark dark:text-white tracking-tight">
            Prawdziwe Burgery i Chrupiąca Pizza w Grybowie
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Szukasz miejsca, gdzie smak stawia się na pierwszym miejscu? Nasza burgerownia to nie tylko soczysta, w 100% wołowa rzemieślnicza robota, ale też pyszna, gorąca pizza. Działamy z pasją do dobrego jedzenia. Niezależnie od tego, czy jesteś z samego <strong className="text-brand-red">Grybowa</strong>, czy zamawiasz z <strong className="text-brand-red">Gorlic, Stróż, Nowego Sącza</strong> lub okolicznych miejscowości – dowieziemy Twoje zamówienie prosto pod drzwi (dostawa do 50 km!). Sprawdź nasze menu, zamów online i śledź status swojego jedzenia na żywo.
          </p>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-brand-dark dark:text-white uppercase">
            Nasze <span className="text-brand-red">Bestsellery</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium">Najczęściej wybierane klasyki, które skradły serca naszych gości.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BESTSELLERS.map((item) => (
             <BurgerCard key={item.id} {...item} />
          ))}
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
        className="fixed bottom-8 right-8 z-30 p-5 rounded-full bg-brand-yellow text-brand-dark shadow-[0_10px_40px_rgba(250,204,21,0.5)] flex items-center justify-center group border-2 border-white dark:border-slate-800"
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
