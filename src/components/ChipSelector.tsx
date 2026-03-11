import React from 'react';
import { CHIP_VALUES } from '../constants';

interface ChipSelectorProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
  disabled: boolean;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({ selectedChip, onSelectChip, disabled }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-zinc-900/80 backdrop-blur-sm rounded-3xl border border-gold-500/20 shadow-2xl">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500/60">Stake Amount</span>
      <div className="flex gap-5">
        {CHIP_VALUES.map((value) => (
          <button
            key={value}
            onClick={() => onSelectChip(value)}
            disabled={disabled}
            className={`
              relative w-16 h-16 rounded-full border-[3px] flex items-center justify-center font-black text-lg transition-all duration-300
              ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:scale-110 active:scale-90 cursor-pointer'}
              ${selectedChip === value ? 'scale-110 ring-4 ring-gold-500/30' : 'opacity-80'}
              ${value === 10 ? 'bg-blue-600 border-blue-300 text-white glow-chip-blue' : ''}
              ${value === 50 ? 'bg-red-600 border-red-300 text-white glow-chip-red' : ''}
              ${value === 100 ? 'bg-zinc-800 border-gold-400 text-gold-400 glow-chip-gold' : ''}
            `}
          >
            <div className="absolute inset-1.5 border-2 border-dashed border-white/20 rounded-full" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 to-transparent" />
            <span className="relative z-10 drop-shadow-md">{value}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
