import React from 'react';
import { getNumberColor, LINE_BETS } from '../constants';
import { Bet, BetType } from '../types';
import { Chip } from './Chip';

interface BettingBoardProps {
  currentBets: Bet[];
  onPlaceBet: (type: BetType, value: number | string | number[]) => void;
  disabled: boolean;
  winningNumber: number | null;
}

export const BettingBoard: React.FC<BettingBoardProps> = ({ currentBets, onPlaceBet, disabled, winningNumber }) => {
  const rows = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  ];

  const getBet = (type: BetType, value: any) => {
    const valStr = JSON.stringify(value);
    return currentBets.find(b => b.type === type && JSON.stringify(b.value) === valStr);
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-full">
      <div className="flex w-full bg-zinc-900/90 p-2 md:p-6 rounded-3xl border-2 border-gold-500/30 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">
        {/* Zero Section */}
        <button
          onClick={() => onPlaceBet('straight', 0)}
          disabled={disabled}
          className={`
            w-10 md:w-20 h-full min-h-[100px] md:min-h-[150px] bg-emerald-800 border-2 border-white/10 flex items-center justify-center font-black text-lg md:text-2xl text-white transition-all duration-300
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 cursor-pointer'}
            ${winningNumber === 0 ? 'ring-4 ring-gold-400 ring-inset shadow-[0_0_30px_rgba(255,215,0,0.6)] z-10' : ''}
            relative rounded-l-xl
          `}
        >
          <span className="drop-shadow-lg">0</span>
          {getBet('straight', 0) && <Chip amount={getBet('straight', 0)!.amount} />}
        </button>

        {/* Numbers Grid */}
        <div className="flex-1 flex flex-col gap-0.5 md:gap-1 ml-0.5 md:ml-1">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-0.5 md:gap-1 h-full">
              {row.map((num) => {
                const color = getNumberColor(num);
                const bet = getBet('straight', num);
                const isWinner = winningNumber === num;
                return (
                  <button
                    key={num}
                    onClick={() => onPlaceBet('straight', num)}
                    disabled={disabled}
                    className={`
                      flex-1 h-8 md:h-14 border border-white/5 flex items-center justify-center font-black text-[10px] md:text-xl text-white transition-all duration-200
                      ${color === 'red' ? 'bg-red-800/90 hover:bg-red-600' : 'bg-zinc-800/90 hover:bg-zinc-700'}
                      ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 hover:z-10 hover:shadow-xl active:scale-90 cursor-pointer'}
                      ${isWinner ? 'ring-4 ring-gold-400 ring-inset shadow-[0_0_30px_rgba(255,215,0,0.6)] z-10' : ''}
                      relative rounded-sm md:rounded-md
                    `}
                  >
                    <span className="drop-shadow-md">{num}</span>
                    {bet && <Chip amount={bet.amount} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Line Bets (Beside the rows) */}
        <div className="flex flex-col gap-0.5 md:gap-1 ml-1 md:ml-4 h-full justify-between py-1">
          {LINE_BETS.map((line, idx) => {
            const bet = getBet('line', line.numbers);
            const isWinner = winningNumber !== null && line.numbers.includes(winningNumber);
            return (
              <button
                key={idx}
                onClick={() => onPlaceBet('line', line.numbers)}
                disabled={disabled}
                className={`
                  w-12 md:w-24 h-8 md:h-14 bg-zinc-900 border border-gold-500/20 flex items-center justify-center font-black text-[6px] md:text-[10px] text-gold-500/60 transition-all duration-200 rounded-sm md:rounded-md
                  ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-800 hover:text-gold-400 cursor-pointer'}
                  ${bet ? 'bg-gold-500/10 border-gold-500 text-gold-500' : ''}
                  ${isWinner ? 'ring-2 ring-gold-400 shadow-[0_0_15px_rgba(255,215,0,0.4)]' : ''}
                  relative
                `}
              >
                <span className="text-center leading-tight">{line.label.replace('LINE ', 'LINE\n')}</span>
                {bet && <Chip amount={bet.amount} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Bets */}
      <div className="flex gap-6 w-full max-w-2xl">
        <button
          onClick={() => onPlaceBet('color', 'red')}
          disabled={disabled}
          className={`
            flex-1 py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all duration-300 border-2
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95 cursor-pointer'}
            ${getBet('color', 'red') ? 'bg-red-600 border-white shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'bg-red-800/40 border-red-600/30 text-red-500/60'}
            relative
          `}
        >
          RED
          {getBet('color', 'red') && <Chip amount={getBet('color', 'red')!.amount} />}
        </button>
        <button
          onClick={() => onPlaceBet('color', 'black')}
          disabled={disabled}
          className={`
            flex-1 py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all duration-300 border-2
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95 cursor-pointer'}
            ${getBet('color', 'black') ? 'bg-zinc-800 border-white shadow-[0_0_30px_rgba(0,0,0,0.4)]' : 'bg-zinc-800/40 border-zinc-600/30 text-zinc-500/60'}
            relative
          `}
        >
          BLACK
          {getBet('color', 'black') && <Chip amount={getBet('color', 'black')!.amount} />}
        </button>
      </div>
    </div>
  );
};
