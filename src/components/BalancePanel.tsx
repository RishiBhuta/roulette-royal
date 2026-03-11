import React from 'react';
import { Wallet } from 'lucide-react';

interface BalancePanelProps {
  balance: number;
  totalBet: number;
}

export const BalancePanel: React.FC<BalancePanelProps> = ({ balance, totalBet }) => {
  return (
    <div className="flex gap-6 w-full max-w-lg">
      <div className="flex-1 bg-zinc-900/90 p-5 rounded-3xl border border-gold-500/20 flex items-center gap-5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
          <Wallet size={28} />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Total Balance</p>
          <p className="text-3xl font-mono font-black text-white drop-shadow-sm">
            <span className="text-emerald-500 mr-1">$</span>
            {balance.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="flex-1 bg-zinc-900/90 p-5 rounded-3xl border border-gold-500/20 flex items-center gap-5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/20">
          <div className="w-7 h-7 rounded-full border-2 border-dashed border-amber-400 flex items-center justify-center text-[12px] font-black">B</div>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Active Bet</p>
          <p className="text-3xl font-mono font-black text-white drop-shadow-sm">
            <span className="text-amber-500 mr-1">$</span>
            {totalBet.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
