
export type BetType = 'straight' | 'color' | 'line';

export interface Bet {
  id: string;
  type: BetType;
  value: number | string | number[]; // number for straight, 'red'/'black' for color, number[] for line
  amount: number;
}

export interface GameState {
  balance: number;
  currentBets: Bet[];
  lastResults: number[];
  isSpinning: boolean;
  winningNumber: number | null;
  selectedChip: number;
}
