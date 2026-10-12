/**
 * Frequency Analysis Utility for Classical Cryptanalysis
 *
 * Standard English letter frequencies (in percentage) based on corpus analysis.
 * Source: Oxford English Dictionary & Cornell Cryptography Corpus.
 */

export const STANDARD_ENGLISH_FREQUENCIES = {
  A: 8.2,
  B: 1.5,
  C: 2.8,
  D: 4.3,
  E: 12.7,
  F: 2.2,
  G: 2.0,
  H: 6.1,
  I: 7.0,
  J: 0.15,
  K: 0.77,
  L: 4.0,
  M: 2.4,
  N: 6.7,
  O: 7.5,
  P: 1.9,
  Q: 0.095,
  R: 6.0,
  S: 6.3,
  T: 9.1,
  U: 2.8,
  V: 0.98,
  W: 2.4,
  X: 0.15,
  Y: 2.0,
  Z: 0.074,
};

/**
 * Computes letter frequency counts and percentages for a given text.
 * Only alphabetic characters (A-Z, a-z) are analyzed.
 * Spaces, numbers, and punctuation are completely ignored.
 *
 * @param {string} text
 * @returns {{
 *   totalLetters: number,
 *   counts: Record<string, number>,
 *   frequencies: Record<string, number>,
 *   data: Array<{ letter: string, count: number, frequency: number, expected: number }>,
 *   mostFrequent: string | null
 * }}
 */
export function analyzeLetterFrequency(text) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const counts = {};
  letters.forEach((l) => (counts[l] = 0));

  let totalLetters = 0;

  if (text) {
    for (const char of text) {
      const upper = char.toUpperCase();
      if (upper >= 'A' && upper <= 'Z') {
        counts[upper] += 1;
        totalLetters += 1;
      }
    }
  }

  const frequencies = {};
  let mostFrequent = null;
  let maxCount = 0;

  const data = letters.map((letter) => {
    const count = counts[letter];
    const frequency = totalLetters > 0 ? Number(((count / totalLetters) * 100).toFixed(2)) : 0;
    frequencies[letter] = frequency;

    if (count > maxCount) {
      maxCount = count;
      mostFrequent = letter;
    }

    return {
      letter,
      count,
      frequency,
      expected: STANDARD_ENGLISH_FREQUENCIES[letter] || 0,
    };
  });

  return {
    totalLetters,
    counts,
    frequencies,
    data,
    mostFrequent,
  };
}
