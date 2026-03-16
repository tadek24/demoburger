"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface AdminTimerProps {
  createdAt: string;
}

export function AdminTimer({ createdAt }: AdminTimerProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const targetTime = new Date(createdAt).getTime() + 15 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = Math.floor((targetTime - now) / 1000);
      setTimeLeft(difference > 0 ? difference : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft <= 5 * 60 && timeLeft > 0;
  const isDanger = timeLeft === 0;

  return (
    <div className={`flex items-center gap-1.5 font-mono text-sm px-2 py-1 rounded-md font-bold ${
      isDanger ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 
      isWarning ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 
      'bg-slate-800 text-slate-300'
    }`}>
      <Clock size={14} />
      {isDanger ? 'OPÓŹNIENIE!' : formatTime(timeLeft)}
    </div>
  );
}
