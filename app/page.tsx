"use client";

import { Hero } from '@/components/Hero';
import { BurgerCard } from '@/components/BurgerCard';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  {
    id: "b1",
    name: "Cyber Classic",
    description: "Soczysta wołowina, podwójny ser cheddar, pikle, nasz autorski sos neon.",
    price: 38.00,
    image: "/burger1.png",
    ingredients: ["Wołowina", "Cheddar", "Pikle", "Sos Neon"]
  },
  {
    id: "b2",
    name: "Neon Spicy",
    description: "Pikantny kurczak w panierce panko, jalapeno, sos sriracha mayo.",
    price: 42.00,
    image: "/burger2.png",
    ingredients: ["Kurczak", "Jalapeno", "Sriracha", "Pomidor"]
  },
  {
    id: "b3",
    name: "Truffle Matrix",
    description: "Wołowina angus, pasta truflowa, rucola, karmelizowana cebula.",
    price: 49.00,
    image: "/burger3.png",
    ingredients: ["Wołowina Angus", "Trufle", "Rucola", "Cebula"]
  },
  {
    id: "b4",
    name: "Mushroom Glitch",
    description: "Wegański kotlet z pieczarek portobello, wegański ser, świeże warzywa.",
    price: 36.00,
    image: "/burger4.png",
    ingredients: ["Portobello", "Opcja Wegan", "Sałata", "Pomidor"]
  }
];

export default function Home() {
  const { openCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen relative pb-24">
      <Hero />
      
      <section id="menu-section" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">MENU</h2>
            <div className="h-1 w-20 bg-neon-green"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENU_ITEMS.map((burger) => (
            <BurgerCard key={burger.id} {...burger} />
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
