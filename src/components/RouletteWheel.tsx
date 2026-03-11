import React, { useEffect, useState } from 'react';
import { ROULETTE_NUMBERS, getNumberColor } from '../constants';

interface RouletteWheelProps {
  isSpinning: boolean;
  winningNumber: number | null;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({ isSpinning, winningNumber }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (winningNumber !== null && isSpinning) {
      const index = ROULETTE_NUMBERS.indexOf(winningNumber);
      const segmentAngle = 360 / 37;
      const fullSpins = 8; // More spins for dramatic effect
      const targetRotation = rotation + (360 * fullSpins) - (index * segmentAngle) - (rotation % 360);
      
      setRotation(targetRotation);
    }
  }, [winningNumber, isSpinning]);

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center group">
      {/* Outer Decorative Ring */}
      <div className="absolute inset-[-10px] rounded-full border-[12px] border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,0.8)] z-0" />
      <div className="absolute inset-[-5px] rounded-full border-2 border-gold-500/30 z-0" />

      {/* Pointer */}
      <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-gold-400" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-white/30 rounded-full blur-[1px]" />
      </div>

      {/* The Wheel */}
      <div 
        className="relative w-full h-full rounded-full bg-zinc-900 overflow-hidden transition-transform duration-[3000ms] [transition-timing-function:cubic-bezier(0.15,0,0.15,1)] shadow-inner border-4 border-zinc-800"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {ROULETTE_NUMBERS.map((num, i) => {
          const angle = (360 / 37) * i;
          const color = getNumberColor(num);
          return (
            <div
              key={num}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1/2 origin-bottom flex flex-col items-center pt-3"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div 
                className={`
                  w-full h-10 flex items-center justify-center text-[11px] md:text-sm font-black text-white rounded-t-md border-x border-t border-white/5
                  ${color === 'red' ? 'bg-gradient-to-b from-red-600 to-red-800' : color === 'black' ? 'bg-gradient-to-b from-zinc-800 to-zinc-950' : 'bg-gradient-to-b from-emerald-600 to-emerald-800'}
                `}
              >
                <span className="rotate-0">{num}</span>
              </div>
            </div>
          );
        })}
        
        {/* Inner Decorative Elements */}
        <div className="absolute inset-[15%] rounded-full border-[6px] border-gold-900/40 bg-zinc-900 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-0" />
        <div className="absolute inset-[20%] rounded-full border-2 border-gold-500/10 z-0" />
        
        {/* Center Hub */}
        <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-black border-8 border-zinc-900 shadow-2xl z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-700 via-gold-400 to-gold-200 shadow-[0_0_20px_rgba(245,135,0,0.4)] border-2 border-gold-300/50" />
          <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
