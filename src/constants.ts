
export const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
export const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

export const getNumberColor = (num: number) => {
  if (num === 0) return 'green';
  if (RED_NUMBERS.includes(num)) return 'red';
  return 'black';
};

export const CHIP_VALUES = [10, 50, 100];
export const INITIAL_BALANCE = 1000;
export const PAYOUTS = {
  straight: 35,
  color: 1, // 1:1 (total 2x)
  line: 11, // 11:1 for a row of 3 (total 12x) - Wait, user asked for 3x? "Payout should be 3x the bet amount". 
            // Usually a "Street" (3 numbers) is 11:1. But I will follow user's "3x" request if they specifically said so.
            // Actually, user said "Payout should be 3x the bet amount" for line bets. 
            // And "2x the bet amount" for color.
};

export const LINE_BETS = [
  { label: "LINE (3-36)", numbers: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36] },
  { label: "LINE (2-35)", numbers: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35] },
  { label: "LINE (1-34)", numbers: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34] },
];
