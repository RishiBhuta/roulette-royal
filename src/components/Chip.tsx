import React from 'react';

interface ChipProps {
  amount: number;
}

export const Chip: React.FC<ChipProps> = ({ amount }) => {
  const color = amount >= 100 ? 'bg-zinc-800 border-gold-400 text-gold-400 glow-chip-gold' : 
                amount >= 50 ? 'bg-red-600 border-red-300 text-white glow-chip-red' : 
                'bg-blue-600 border-blue-300 text-white glow-chip-blue';
  
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-9 md:h-9 ${color} rounded-full border-2 flex items-center justify-center text-[8px] md:text-[10px] font-black shadow-xl z-20 animate-in zoom-in duration-200`}>
      <div className="absolute inset-0.5 border border-dashed border-white/20 rounded-full" />
      {amount}
    </div>
  );
};
