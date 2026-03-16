"use client";

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const ALLERGENS_DATA = [
  { item: "Wszystkie Burgery (Bułka)", allergens: "Gluten, Jaja, Sezam" },
  { item: "Burgery z Serem", allergens: "Mleko (Laktoza)" },
  { item: "Sos Burgerowy / Majonez", allergens: "Jaja, Gorczyca" },
  { item: "Pizza (Ciasto)", allergens: "Gluten" },
  { item: "Pizza (Ser, Sos Serowy)", allergens: "Mleko (Laktoza)" },
  { item: "Kurczak Panierowany", allergens: "Gluten, Jaja" },
  { item: "Sałatka Grecka", allergens: "Mleko (Ser Feta)" },
];

export default function Allergens() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-brand-dark pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase text-brand-dark dark:text-white"
          >
            Tabela <span className="text-brand-red">Alergenów</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Dbamy o Twoje zdrowie. Przejrzyj listę potencjalnych alergenów w naszych daniach. Jeśli masz wątpliwości, zapytaj obsługę przed złożeniem zamówienia.
          </motion.p>
        </div>

        <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
          
          <div className="flex items-center gap-4 bg-brand-yellow/20 p-4 rounded-xl mb-8">
            <Info className="text-brand-yellow w-6 h-6 flex-shrink-0" />
            <p className="text-brand-dark dark:text-white font-medium text-sm">
              W naszym lokalu używamy również orzechów, soi oraz selera. Mimo najwyższych starań, śladowe ilości mogą znaleźć się w każdym daniu.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-white/10 uppercase text-sm tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="pb-4 font-bold">Pozycja w Menu</th>
                  <th className="pb-4 font-bold">Alergeny</th>
                </tr>
              </thead>
              <tbody>
                {ALLERGENS_DATA.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="py-5 pr-4 font-bold text-brand-dark dark:text-white">
                      {row.item}
                    </td>
                    <td className="py-5 text-slate-600 dark:text-slate-300 font-medium">
                      {row.allergens}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </main>
  );
}
