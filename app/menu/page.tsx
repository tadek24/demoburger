"use client";

import { BurgerCard } from '@/components/BurgerCard';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    title: "Burgery",
    items: [
      { id: "b1", name: "Smash Burger", description: "Wołowina 200g, bułka brioche, sos burger, ser x2, piklowana czerwona cebula, ogórek konserwowy", price: 34, image: "🍔", ingredients: [] },
      { id: "b2", name: "Burger Classic", description: "Wołowina 200g, bułka brioche, sałata, majonez, cebula karmelizowana, pomidor, ogórek konserwowy", price: 36, image: "🍔", ingredients: [] },
      { id: "b3", name: "Cheese burger", description: "Wołowina 200g, bułka brioche, sałata, sos burger, ser x2, cebula karmelizowana, pomidor, ogórek konserwowy", price: 38, image: "🍔", ingredients: [] },
      { id: "b4", name: "Zboczuji burger", description: "Wołowina 200g, bułka brioche, sałata, sos jalapeño, ser BBQ, cebula karmelizowana, podwójny bekon, pomidor, ogórek konserwowy", price: 38, image: "🍔", ingredients: [] },
      { id: "b5", name: "Wypasiona kokoszka", description: "Kurczak panierowany w panko-nachos, sałata, majonez, cebula czerwona, pomidor, ogórek konserwowy", price: 30, image: "🍔", ingredients: [] },
      { id: "b6", name: "Serowa kunka", description: "Kurczak panierowany w panko-nachos, sałata, majonez, cebula czerwona, pomidor, ogórek konserwowy", price: 33, image: "🍔", ingredients: [] },
      { id: "b7", name: "Boskie piekło", description: "Wołowina 200g, bułka brioche, sałata, sos ostre chilli, ser cheddar, bekon x2, jalapeno, pomidor, ogórek konserwowy", price: 36, image: "🍔", ingredients: [] },
      { id: "b8", name: "Chorizo burger", description: "Wołowina 200g, bułka brioche, sałata, sos, pikantne chorizo, ser cheddar, papryczki jalapeno, cebula czerwona, pomidor, ogórek konserwowy", price: 38, image: "🍔", ingredients: [] },
      { id: "b9", name: "Po grecku", description: "Wołowina 200g, bułka brioche, sałata, sos tzatziki, feta, oliwki, suszone pomidory", price: 38, image: "🍔", ingredients: [] },
      { id: "b10", name: "Góral", description: "Wołowina 200g, bułka brioche, sałata, rukola, sos żurawinowy, ser pleśniowy, pomidor, ogórek konserwowy", price: 42, image: "🍔", ingredients: [] },
      { id: "b11", name: "Burak", description: "Bułka brioche, kotlet z buraka, sałata, sos, warzywa, pomidor, ogórek konserwowy", price: 28, image: "🍔", ingredients: [] }
    ]
  },
  {
    title: "Dla Najmłodszych",
    items: [
      { id: "k1", name: "Mini byczek", description: "Wołowina 100g, bułka brioche, ketchup, majonez", price: 26, image: "🍔", ingredients: [] },
      { id: "k2", name: "Mini serek", description: "Wołowina 100g, bułka brioche, ser cheddar, ketchup, majonez", price: 28, image: "🍔", ingredients: [] },
      { id: "k3", name: "Mini kurczaczek", description: "Kurczak panierowany, bułka brioche, ketchup, majonez", price: 27, image: "🍔", ingredients: [] }
    ]
  },
  {
    title: "Zestawy",
    items: [
      { id: "z1", name: "Zestaw burger", description: "Classic burger + frytki 200g + cola puszka", price: 50, image: "🥤", ingredients: [] },
      { id: "z2", name: "Zestaw Cheese", description: "Cheese burger + frytki 200g + cola puszka", price: 55, image: "🥤", ingredients: [] },
      { id: "z3", name: "Zestaw Dziecięcy byczek", description: "Mini byczek + frytki 100g + sok", price: 35, image: "🧃", ingredients: [] },
      { id: "z4", name: "Zestaw Dziecięcy kurczaczek", description: "Mini kurczaczek + frytki 100g + sok", price: 40, image: "🧃", ingredients: [] }
    ]
  },
  {
    title: "Pizza 40cm",
    items: [
      { id: "p1", name: "Margherita", description: "Sos pomidorowy, ser, oregano", price: 38, image: "🍕", ingredients: [] },
      { id: "p2", name: "Cztery sery", description: "Sos, gouda, mozzarella, ser pleśniowy, ser cheddar, oregano", price: 42, image: "🍕", ingredients: [] },
      { id: "p3", name: "Capriciosa", description: "Sos, ser, szynka, pieczarki, oregano", price: 42, image: "🍕", ingredients: [] },
      { id: "p4", name: "Kebab", description: "Sos, ser, gyros, cebula czerwona, oregano", price: 44, image: "🍕", ingredients: [] },
      { id: "p5", name: "Samo mięso", description: "Sos, ser, szynka, boczek, salami, oregano", price: 48, image: "🍕", ingredients: [] },
      { id: "p6", name: "Rzeźnik", description: "Sos, ser, kurczak, cebula, czosnek, oregano", price: 48, image: "🍕", ingredients: [] },
      { id: "p7", name: "Salami", description: "Sos, ser, salami, oregano", price: 40, image: "🍕", ingredients: [] },
      { id: "p8", name: "Pepperoni", description: "Sos, ser, salami pepperoni, jalapeno, oregano", price: 43, image: "🍕", ingredients: [] },
      { id: "p9", name: "Ogień", description: "Sos, ser, wołowina, papryczki jalapeno, cebula, tabasco, oregano", price: 48, image: "🍕", ingredients: [] },
      { id: "p10", name: "Barbecue", description: "Sos, ser, boczek, cebula, sos BBQ, oregano", price: 48, image: "🍕", ingredients: [] },
      { id: "p11", name: "Ziołowo mi", description: "Sos, ser, pomidor, czosnek, oregano", price: 42, image: "🍕", ingredients: [] },
      { id: "p12", name: "Parma", description: "Sos, ser, szynka parmeńska, rukola, suszone pomidory, czosnek", price: 45, image: "🍕", ingredients: [] },
      { id: "p13", name: "Mix pizza", description: "Sos, ser, i wiele składników", price: 55, image: "🍕", ingredients: [] },
      { id: "p14", name: "Love meat", description: "Sos, ser, salami, kurczak kebab, wołowina, boczek, oregano", price: 54, image: "🍕", ingredients: [] },
      { id: "p15", name: "Chicken barbecue", description: "Sos, ser, kurczak kebab, cebula, sos BBQ, oregano", price: 49, image: "🍕", ingredients: [] },
      { id: "p16", name: "Tropikalna", description: "Sos, ser, szynka, ananas, oregano", price: 42, image: "🍕", ingredients: [] }
    ]
  },
  {
    title: "Sałatki",
    items: [
      { id: "s1", name: "Sałatka grecka", description: "Mix sałat, pomidor, ogórek, papryka, oliwki, cebula, ser feta, sos vinegret", price: 22, image: "🥗", ingredients: [] },
      { id: "s2", name: "Sałatka z kurczakiem", description: "Mix sałat, pomidor, ogórek, papryka, kukurydza, kurczak panierowany, sos czosnkowy", price: 25, image: "🥗", ingredients: [] }
    ]
  },
  {
    title: "Zapiekanki",
    items: [
      { id: "zap1", name: "Zapiekanka klasyczna", description: "Pieczarki, ser", price: 17, image: "🥖", ingredients: [] },
      { id: "zap2", name: "Zapiekanka z kurczakiem", description: "Pieczarki, ser, kurczak", price: 20, image: "🥖", ingredients: [] }
    ]
  },
  {
    title: "Dodatki",
    items: [
      { id: "d1", name: "Frytki małe 150g", description: "Chrupiące frytki z solą", price: 10, image: "🍟", ingredients: [] },
      { id: "d2", name: "Frytki duże 250g", description: "Chrupiące frytki z solą", price: 13, image: "🍟", ingredients: [] },
      { id: "d3", name: "Frytki z batatów 150g", description: "Frytki ze słodkich ziemniaków", price: 16, image: "🍟", ingredients: [] },
      { id: "d4", name: "Frytki szefa 250g", description: "Frytki z posypką szefa kuchni", price: 15, image: "🍟", ingredients: [] }
    ]
  },
  {
    title: "Sosy",
    items: [
      { id: "so1", name: "Ketchup", description: "Klasyczny ketchup", price: 3, image: "🥫", ingredients: [] },
      { id: "so2", name: "Majonez", description: "Gęsty majonez", price: 3, image: "🥫", ingredients: [] },
      { id: "so3", name: "Musztarda", description: "Delikatna musztarda", price: 3, image: "🥫", ingredients: [] },
      { id: "so4", name: "Czosnkowy", description: "Sos czosnkowy, autorski", price: 3, image: "🥫", ingredients: [] },
      { id: "so5", name: "BBQ", description: "Sos barbecue", price: 3, image: "🥫", ingredients: [] },
      { id: "so6", name: "Pikantny", description: "Ostry sos firmowy", price: 3, image: "🥫", ingredients: [] }
    ]
  }
];

export default function Menu() {
  const { openCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen relative pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight uppercase">Pełne <span className="text-neon-green">Menu</span></h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Wybierz swoje ulubione jedzenie. Dodaj do koszyka i ciesz się smakiem przyszłości.
          </p>
        </div>

        <div className="space-y-24">
          {CATEGORIES.map((category) => (
            <section key={category.title} id={category.title.toLowerCase().replace(/\s+/g, '-')}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold uppercase tracking-wider">{category.title}</h2>
                <div className="h-[2px] flex-grow bg-gradient-to-r from-neon-green to-transparent opacity-50"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((item) => (
                  <BurgerCard key={item.id} {...item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

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
