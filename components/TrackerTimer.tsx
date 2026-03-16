"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TrackerTimerProps {
  createdAt: string;
  isFinished: boolean; // True if status is "Gotowe do odbioru" or "Wydane"
}

export function TrackerTimer({ createdAt, isFinished }: TrackerTimerProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isFinished) return;

    const targetTime = new Date(createdAt).getTime() + 15 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = Math.floor((targetTime - now) / 1000);

      if (difference <= 0) {
        setTimeLeft(0);
        setProgress(100);
        clearInterval(interval);
      } else {
        setTimeLeft(difference);
        setProgress(((15 * 60 - difference) / (15 * 60)) * 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt, isFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    return (
      <div className="bg-brand-green/10 border border-brand-green/20 rounded-2xl p-6 text-center shadow-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Pyszne jedzenie czeka!</h3>
        <p className="text-slate-600 font-medium">Zapraszamy do kasy po odbiór zamówienia.</p>
      </div>
    );
  }

  if (timeLeft === 0) {
    return (
      <div className="bg-brand-red/10 border border-brand-red/20 rounded-2xl p-6 text-center shadow-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Kończymy przygotowania!</h3>
        <p className="text-slate-600 font-medium">Twoje zamówienie powinno być już gotowe do odbioru.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-600 font-bold uppercase tracking-wider text-sm">
          <Clock size={18} className="text-brand-yellow" />
          Szacowany czas odbioru
        </div>
        <div className="text-3xl font-black text-slate-900 font-mono tracking-tighter">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-brand-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>
    </div>
  );
}
