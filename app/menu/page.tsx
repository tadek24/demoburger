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

  const scrollToMenuCategory = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Nav height + spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen relative pb-24 pt-12 bg-slate-50 dark:bg-brand-dark">
      
      <div className="text-center mb-8 px-4 pt-8">
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight uppercase text-brand-dark dark:text-white">Pełne <span className="text-brand-red">Menu</span></h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
          Wybierz swoje ulubione jedzenie, dodaj do zamówienia i ciesz się smakiem premium.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="w-full lg:w-64 flex-shrink-0 sticky top-[80px] z-40 bg-slate-50/90 dark:bg-brand-dark/90 backdrop-blur pb-4 lg:py-8 lg:min-h-[calc(100vh-100px)] border-b lg:border-none border-slate-200 dark:border-white/10">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 hidden lg:block">Kategorie</h3>
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
            {CATEGORIES.map((cat) => {
              const id = cat.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <a 
                  key={cat.title} 
                  href={`#${id}`}
                  onClick={(e) => scrollToMenuCategory(id, e)}
                  className="whitespace-nowrap px-5 py-3 rounded-full lg:rounded-xl text-sm font-bold bg-white dark:bg-slate-800/50 hover:bg-brand-red hover:text-white transition-all shadow-sm border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300"
                >
                  {cat.title}
                </a>
              )
            })}
          </nav>
        </aside>

        {/* Main Content Areas */}
        <div className="flex-1 space-y-20 pt-4 lg:pt-8 w-full">
          {CATEGORIES.map((category) => {
            const id = category.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <section key={category.title} id={id} className="scroll-mt-36">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-black uppercase tracking-wider text-brand-dark dark:text-white">{category.title}</h2>
                  <div className="h-[2px] flex-grow bg-slate-200 dark:bg-white/10 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {category.items.map((item) => (
                    <BurgerCard key={item.id} {...item} />
                  ))}
                </div>
              </section>
            );
          })}
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
