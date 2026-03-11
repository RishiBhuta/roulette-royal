import React from 'react';
import { getNumberColor } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface ResultHistoryProps {
  results: number[];
}

export const ResultHistory: React.FC<ResultHistoryProps> = ({ results }) => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-white/10 w-full max-w-xs">
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">History</span>
      <div className="flex gap-2 min-h-[40px]">
        <AnimatePresence mode="popLayout">
          {results.map((num, idx) => {
            const color = getNumberColor(num);
            return (
              <motion.div
                key={`${num}-${idx}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2
                  ${color === 'red' ? 'bg-red-600 border-red-400 text-white' : ''}
                  ${color === 'black' ? 'bg-zinc-800 border-zinc-600 text-white' : ''}
                  ${color === 'green' ? 'bg-emerald-600 border-emerald-400 text-white' : ''}
                `}
              >
                {num}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {results.length === 0 && (
          <div className="text-zinc-700 text-sm italic flex items-center">No spins yet</div>
        )}
      </div>
    </div>
  );
};
