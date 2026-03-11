/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { RouletteWheel } from './components/RouletteWheel';
import { BettingBoard } from './components/BettingBoard';
import { ChipSelector } from './components/ChipSelector';
import { BalancePanel } from './components/BalancePanel';
import { ResultHistory } from './components/ResultHistory';
import { INITIAL_BALANCE, ROULETTE_NUMBERS, getNumberColor } from './constants';
import { Bet, BetType } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Play } from 'lucide-react';

export default function App() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [currentBets, setCurrentBets] = useState<Bet[]>([]);
  const [lastResults, setLastResults] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [spinningToNumber, setSpinningToNumber] = useState<number | null>(null);
  const [selectedChip, setSelectedChip] = useState(10);
  const [message, setMessage] = useState<string | null>("Place your bets!");

  const totalBet = currentBets.reduce((sum, bet) => sum + bet.amount, 0);

  const handlePlaceBet = (type: BetType, value: number | string | number[]) => {
    if (isSpinning) return;

    // Create a unique ID for the bet type and value
    const betId = `${type}-${JSON.stringify(value)}`;
    const existingBet = currentBets.find(b => b.id === betId);

    if (existingBet) {
      // Toggle: Remove the bet
      setBalance(prev => prev + existingBet.amount);
      setCurrentBets(prev => prev.filter(b => b.id !== betId));
      setMessage("Bet removed.");
    } else {
      // Add new bet
      if (balance < selectedChip) {
        setMessage("Insufficient balance!");
        return;
      }
      setBalance(prev => prev - selectedChip);
      setCurrentBets(prev => [...prev, { id: betId, type, value, amount: selectedChip }]);
      setMessage(null);
    }
  };

  const handleSpin = () => {
    if (isSpinning || currentBets.length === 0) return;

    setIsSpinning(true);
    setWinningNumber(null);
    setMessage("Spinning...");
    
    const winner = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
    setSpinningToNumber(winner);

    setTimeout(() => {
      setIsSpinning(false);
      setWinningNumber(winner);
      setSpinningToNumber(null);
      
      let totalWinnings = 0;
      const winnerColor = getNumberColor(winner);

      currentBets.forEach(bet => {
        let isWin = false;
        let multiplier = 0;

        if (bet.type === 'straight' && bet.value === winner) {
          isWin = true;
          multiplier = 36;
        } else if (bet.type === 'color' && bet.value === winnerColor) {
          isWin = true;
          multiplier = 2;
        } else if (bet.type === 'line' && Array.isArray(bet.value) && bet.value.includes(winner)) {
          isWin = true;
          multiplier = 3;
        }

        if (isWin) {
          totalWinnings += bet.amount * multiplier;
        }
      });

      if (totalWinnings > 0) {
        setBalance(prev => prev + totalWinnings);
        setMessage(`WINNER! Number ${winner}. You won $${totalWinnings}!`);
      } else {
        setMessage(`Number ${winner}. Better luck next time!`);
      }

      setLastResults(prev => [winner, ...prev].slice(0, 5));
      // We no longer clear bets automatically here
    }, 3000);
  };

  const startNewRound = () => {
    if (isSpinning) return;
    setCurrentBets([]);
    setWinningNumber(null);
    setMessage("Place your bets!");
  };

  const resetBets = () => {
    if (isSpinning) return;
    const refund = currentBets.reduce((sum, b) => sum + b.amount, 0);
    setBalance(prev => prev + refund);
    setCurrentBets([]);
    setMessage("Bets cleared.");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center gap-12">
        
        {/* Header */}
        <header className="text-center space-y-4 relative">
          <div className="absolute -inset-x-20 -top-10 h-40 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-7xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-gold-100 via-gold-400 to-gold-700 bg-clip-text text-transparent drop-shadow-2xl">
            Roulette Royale
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/50" />
            <p className="text-gold-500/60 font-mono text-[10px] tracking-[0.4em] uppercase font-black">Elite Casino Experience</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </header>

        {/* Main Game Area */}
        <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Wheel & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center gap-12">
            <RouletteWheel isSpinning={isSpinning} winningNumber={spinningToNumber} />
            <ResultHistory results={lastResults} />
          </div>

          {/* Right Column: Betting & Controls */}
          <div className="lg:col-span-7 flex flex-col items-center gap-10">
            <BalancePanel balance={balance} totalBet={totalBet} />
            
            <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
              <ChipSelector 
                selectedChip={selectedChip} 
                onSelectChip={setSelectedChip} 
                disabled={isSpinning} 
              />
              
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || currentBets.length === 0}
                  className={`
                    group relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl overflow-hidden
                    ${isSpinning || currentBets.length === 0 
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/5' 
                      : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white border-b-4 border-emerald-800 hover:border-emerald-700 shadow-emerald-900/40'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Play size={24} fill="currentColor" className="drop-shadow-md" />
                  <span className="drop-shadow-md">SPIN WHEEL</span>
                </button>
                
                {winningNumber !== null && !isSpinning && (
                  <button
                    onClick={startNewRound}
                    className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl bg-gold-600 hover:bg-gold-500 active:scale-95 text-white border-b-4 border-gold-800 hover:border-gold-700 shadow-gold-900/40 transition-all duration-300 shadow-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <RotateCcw size={24} className="drop-shadow-md" />
                    <span className="drop-shadow-md">NEW BET</span>
                  </button>
                )}

                <button
                  onClick={resetBets}
                  disabled={isSpinning || currentBets.length === 0}
                  className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-xs bg-zinc-900 border border-gold-500/20 hover:bg-zinc-800 hover:border-gold-500/40 transition-all text-gold-500/60 uppercase tracking-widest disabled:opacity-30"
                >
                  <RotateCcw size={16} />
                  Clear Table
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col items-center gap-6">
              <AnimatePresence mode="wait">
                {message && (
                  <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="text-gold-400 font-black text-xl text-center h-8 drop-shadow-[0_0_10px_rgba(245,135,0,0.3)] uppercase tracking-tight"
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>
              <BettingBoard 
                currentBets={currentBets} 
                onPlaceBet={(type, val) => handlePlaceBet(type, val)} 
                disabled={isSpinning}
                winningNumber={winningNumber}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
