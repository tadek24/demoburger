"use client";

import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-brand-dark pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase text-brand-dark dark:text-white"
          >
            Nasza <span className="text-brand-red">Historia</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Poznaj ludzi i misję, która stoi za najlepszymi burgerami i pizzą w Grybowie. Szybkiego jedzenia nie oznacza złego jedzenia.
          </motion.p>
        </div>

        <div className="space-y-16">
          <section className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-white/5">
            <h2 className="text-3xl font-black mb-6 text-brand-dark dark:text-white">Od pasji do premium fast-foodu</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium">
              Wszystko zaczęło się od prostego marzenia: stworzyć miejsce w <strong className="text-brand-red">Grybowie</strong>, gdzie klasyczny fast-food zostaje wyniesiony na poziom premium. Chcieliśmy udowodnić, że burger może być daniem restauracyjnym, a szybka pizza zachować autentyczny, rzemieślniczy smak.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Zrezygnowaliśmy z półproduktów i mrożonek. Nasze bułki wypiekane są codziennie rano, wołowina to w 100% starannie selekcjonowane mięso z lokalnych ubojni, a sosy przygotowujemy na miejscu. Tak powstał <strong className="text-brand-dark dark:text-white font-bold">Fire Burger</strong>.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-white/5 flex flex-col justify-center">
              <h3 className="text-2xl font-black mb-4 text-brand-dark dark:text-white">Zaufani, lokalni dostawcy</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Aby zapewnić wam najlepszy smak, współpracujemy wyłącznie ze sprawdzonymi, regionalnymi gospodarstwami z okolic Nowego Sącza. Świeże warzywa, najwyższej jakości wołowina i ręcznie robione sery to fundament naszego menu.
              </p>
            </div>
            <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden min-h-[300px] flex items-center justify-center border border-slate-100 dark:border-white/5 group relative flex-col">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300 relative z-10 mb-2">👨‍🍳 🍅 🥩</span>
              <span className="text-sm font-bold text-slate-400 z-10">(Zdjęcie: 800x600px)</span>
              <div className="absolute inset-0 bg-brand-yellow/10" />
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
