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
    <main className="min-h-screen relative pb-24">
      <Hero />
      
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">NASZE POLECAJKI <span className="text-neon-green">/</span> BESTSELLERY</h2>
            <div className="h-1 w-20 bg-neon-green"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        className="fixed bottom-8 right-8 z-30 p-4 rounded-full bg-neon-green text-black shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center group"
      >
        <div className="relative">
          <ShoppingBag size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
              {totalItems}
            </span>
          )}
        </div>
      </motion.button>
    </main>
  );
}
