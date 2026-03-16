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
        background: 'rgba(0, 255, 102, 0.1)',
        border: '1px solid #00ff66',
        color: '#fff',
        backdropFilter: 'blur(10px)',
      },
      icon: <Plus className="text-neon-green" />
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden flex flex-col group"
    >
      <div className="relative h-48 sm:h-64 w-full bg-neutral-900 overflow-hidden flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {/* Placeholder image representation since we don't have real assets */}
          <motion.div 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="relative z-0 w-full h-full flex items-center justify-center text-6xl text-center font-bold text-gray-800"
        >
          {image.startsWith('/') ? '🍔' : image}
        </motion.div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-20">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors">{name}</h3>
          <span className="text-xl font-mono text-neon-green">{price.toFixed(2)} zł</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {ingredients.map(ing => (
            <span key={ing} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300">
              {ing}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="w-full py-3 bg-white/5 hover:bg-neon-green hover:text-black border border-white/10 hover:border-transparent transition-all rounded-lg font-bold flex items-center justify-center gap-2 group/btn"
        >
          <Plus size={18} />
          <span>Dodaj do zamówienia</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
