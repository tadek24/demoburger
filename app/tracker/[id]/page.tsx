"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ChefHat, Bike, PackageCheck, Copy } from 'lucide-react';
import { supabase, Order, OrderStatus } from '@/lib/supabase';
import { toast } from 'sonner';

const STATUS_FLOW: OrderStatus[] = ['Otrzymane', 'W przygotowaniu', 'Gotowe do odbioru', 'Wydane'];

export default function TrackerPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', params.id)
        .single();
        
      if (data) setOrder(data as Order);
      setLoading(false);
    };

    fetchOrder();

    // Subscribe to changes for this specific order
    const channel = supabase.channel(`order-${params.id}`).on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${params.id}` },
      (payload) => {
        setOrder(payload.new as Order);
        toast.success(`Status zmieniony na: ${payload.new.status}`);
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.id]);

  const copyId = () => {
    navigator.clipboard.writeText(params.id);
    toast.success('Skopiowano ID zamówienia!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-neon-pink mb-4">Nie znaleziono</h1>
        <p className="text-gray-400">Zamówienie w trybie incognito? Sprawdź poprawność ID.</p>
      </div>
    );
  }

  const currentStatusIndex = STATUS_FLOW.indexOf(order.status);

  const StatusIcon = ({ status, index }: { status: string, index: number }) => {
    const isActive = index <= currentStatusIndex;
    const isCurrent = index === currentStatusIndex;
    
    let Icon = Clock;
    if (status === 'W przygotowaniu') Icon = ChefHat;
    if (status === 'Gotowe do odbioru') Icon = Bike;
    if (status === 'Wydane') Icon = PackageCheck;

    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.5 }}
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors ${ isActive ? 'bg-black border-neon-green text-neon-green neon-box-green' : 'bg-white/5 border-white/10 text-gray-500' }`}
      >
        <Icon size={28} />
        {isCurrent && (
          <motion.div
            layoutId="ping"
            className="absolute inset-0 rounded-full border-2 border-neon-green"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen pt-20 px-4 max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Neon decoration */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-green/10 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">ŚLEDŹ PLIK</h1>
              <div className="flex items-center gap-2 text-gray-400 font-mono">
                ID: {params.id}
                <button onClick={copyId} className="hover:text-white transition-colors">
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-sm text-gray-500">Klient</p>
              <p className="font-bold text-neon-blue">{order.customer_name}</p>
            </div>
          </div>

          <div className="relative py-10">
            {/* Connection line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="w-full bg-neon-green neon-box-green"
                initial={{ height: 0 }}
                animate={{ height: `${(currentStatusIndex / (STATUS_FLOW.length - 1)) * 100}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-16">
              {STATUS_FLOW.map((status, index) => {
                const isActive = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                
                return (
                  <div key={status} className={`flex items-center gap-6 md:justify-center relative ${isActive ? '' : 'grayscale opacity-50'}`}>
                    {/* Desktop left text */}
                    <div className="hidden md:block w-1/2 text-right pr-6">
                      {isCurrent && <span className="text-neon-green font-bold text-lg">{status}</span>}
                    </div>
                    
                    <StatusIcon status={status} index={index} />
                    
                    {/* Mobile text / Desktop right text */}
                    <div className="md:hidden w-1/2 text-left">
                      <h3 className={`font-bold text-xl ${isActive ? 'text-white' : 'text-gray-500'}`}>{status}</h3>
                      {isCurrent && <p className="text-neon-green text-sm tracking-wider">Aktualny etap obliczeń...</p>}
                    </div>
                    <div className="hidden md:block w-1/2 text-left pl-6">
                      {!isCurrent && isActive && <span className="text-white font-bold text-lg">{status}</span>}
                      {!isActive && <span className="text-gray-500 font-bold text-lg">{status}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
