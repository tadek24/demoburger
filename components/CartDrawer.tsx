"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.from('orders').insert([{
        customer_name: formData.name,
        items,
        total_price: totalPrice()
      }]).select();
      
      if (error || !data || data.length === 0) {
        console.error(error);
        throw new Error('Błąd przy zamówieniu');
      }
      
      const orderId = data[0].id;
      
      clearCart();
      closeCart();
      
      toast.success('Zamówienie w trakcie realizacji!', {
        icon: '🚀'
      });
      
      router.push(`/tracker/${orderId}`);
    } catch (err) {
      toast.error('Cos poszło nie tak');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-neon-pink" />
                <h2 className="text-xl font-bold">Twój Koszyk</h2>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Twój koszyk jest pusty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        🍔
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <p className="text-neon-green font-mono">{item.price.toFixed(2)} zł</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-500 self-start p-2 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-black/50 border-t border-white/10 border-t-neon-green/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Suma częściowa</span>
                  <span className="text-2xl font-bold text-white font-mono">{totalPrice().toFixed(2)} zł</span>
                </div>
                
                <form onSubmit={handleCheckout} className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Imię (np. Jan K.)" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink transition-all"
                  />
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-neon-pink text-white font-bold rounded-lg hover:bg-neon-pink/90 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Przetwarzanie...' : (
                      <>
                        Zamawiam i płacę 
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
