"use client";

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';

interface BurgerProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
}

export function BurgerCard({ id, name, description, price, image, ingredients }: BurgerProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAdd = () => {
    addItem({ id, name, price, image });
    toast.success(`Dodano ${name} do koszyka!`, {
      style: {
        background: '#fff',
        border: '1px solid #e2e8f0',
        color: '#0f172a',
      },
      icon: <span className="text-brand-green">✓</span>
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      <div className="relative h-48 sm:h-64 w-full bg-slate-50 overflow-hidden flex flex-col items-center justify-center p-6 rounded-t-3xl">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full flex items-center justify-center text-7xl text-center filter drop-shadow-lg mb-2"
        >
          {image.startsWith('/') ? '🍔' : image}
        </motion.div>
        <span className="text-xs font-bold text-slate-400 z-10">(Karta: 600x400px)</span>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-20">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-brand-red transition-colors">{name}</h3>
          <span className="text-xl font-black text-brand-green whitespace-nowrap">{price.toFixed(2)} zł</span>
        </div>
        
        <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">{description}</p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="w-full py-3.5 bg-brand-yellow hover:bg-yellow-400 text-brand-dark transition-colors rounded-full font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus size={20} className="text-brand-dark" />
          <span>Dodaj do koszyka</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
