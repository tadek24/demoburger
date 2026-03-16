"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, Order, OrderStatus } from '@/lib/supabase';
import { CheckCircle2, ChevronRight, Package, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const STATUS_FLOW: OrderStatus[] = ['Otrzymane', 'W przygotowaniu', 'Gotowe do odbioru', 'Wydane'];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .neq('status', 'Wydane')
      .order('created_at', { ascending: false });
      
    if (data) setOrders(data as Order[]);
    if (error) console.error(error);
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase.channel('admin-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        toast.success(`Nowe zamówienie od: ${payload.new.customer_name}!`, { icon: '🚨' });
        fetchOrders();
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const advanceStatus = async (order: Order) => {
    const currentIndex = STATUS_FLOW.indexOf(order.status);
    if (currentIndex < STATUS_FLOW.length - 1) {
      const nextStatus = STATUS_FLOW[currentIndex + 1];
      
      const { error } = await supabase.from('orders').update({ status: nextStatus }).eq('id', order.id);
      
      if (!error) {
        toast.success(`Zamówienie ${order.id} -> ${nextStatus}`);
        fetchOrders();
      }
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Otrzymane': return 'bg-white/10 text-white';
      case 'W przygotowaniu': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'Gotowe do odbioru': return 'bg-neon-blue/20 text-neon-blue border-neon-blue/50';
      case 'Wydane': return 'bg-neon-green/20 text-neon-green border-neon-green/50';
    }
  };

  return (
    <main className="min-h-screen pb-20 pt-6 px-4 max-w-lg mx-auto bg-black">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tighter">ADMIN_TERMINAL</h1>
          <p className="text-neon-pink font-mono text-xs">AWAITING INPUT</p>
        </div>
        <button onClick={fetchOrders} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <RefreshCw size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 text-gray-500 flex flex-col items-center"
            >
              <Package size={48} className="opacity-20 mb-4" />
              <p>Brak aktywnych zamówień.</p>
            </motion.div>
          ) : (
            orders.map(order => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, height: 0 }}
                layout
                className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{order.customer_name}</h3>
                    <p className="text-sm text-gray-400 font-mono">ID: {order.id.slice(0, 8)}...</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{new Date(order.created_at).toLocaleTimeString()}</p>
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(order.status)} font-bold`}>
                    {order.status}
                  </div>
                </div>

                <div className="bg-black/50 p-3 rounded-lg border border-white/5">
                  <p className="text-sm font-bold mb-2">Pozycje:</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-between font-bold text-neon-green">
                    <span>Suma:</span>
                    <span>{order.total_price.toFixed(2)} zł</span>
                  </div>
                </div>

                <button
                  onClick={() => advanceStatus(order)}
                  className="w-full py-4 mt-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  ZMIEŃ STATUS
                  <ChevronRight size={18} className="text-neon-pink" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
