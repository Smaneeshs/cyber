/**
 * Caesar Cipher Utility Functions
 *
 * Mathematical Foundations:
 * Encryption: E(x) = (x + k) mod 26
 * Decryption: D(x) = (x - k + 26) mod 26
 *
 * Where:
 * - x represents the 0-indexed alphabet position (A=0, ..., Z=25)
 * - k represents the shift key (integer between 0 and 25)
 */

export const ALPHABET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ALPHABET_LOWER = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Normalizes any integer shift key into the canonical range [0, 25].
 * @param {number|string} shift
 * @returns {number}
 */
export function normalizeShift(shift) {
  const num = parseInt(shift, 10);
  if (isNaN(num)) return 0;
  return ((num % 26) + 26) % 26;
}

/**
 * Encrypts a single character using Caesar Cipher.
 * Preserves casing, and returns non-alphabetic characters unchanged.
 * @param {string} char - Single character
 * @param {number} shift - Shift amount (0-25)
 * @returns {string} Encrypted character
 */
export function shiftChar(char, shift) {
  const k = normalizeShift(shift);
  if (k === 0) return char;

  const code = char.charCodeAt(0);

  // Uppercase letters: A=65 to Z=90
  if (code >= 65 && code <= 90) {
    const x = code - 65;
    const shifted = (x + k) % 26;
    return String.fromCharCode(65 + shifted);
  }

  // Lowercase letters: a=97 to z=122
  if (code >= 97 && code <= 122) {
    const x = code - 97;
    const shifted = (x + k) % 26;
    return String.fromCharCode(97 + shifted);
  }

  // Non-alphabetic characters remain untouched
  return char;
}

/**
 * Encrypts full text with the given shift key.
 * Formula: E(x) = (x + k) mod 26
 * @param {string} text
 * @param {number} shift
 * @returns {string}
 */
export function encryptCaesar(text, shift) {
  if (!text) return '';
  const k = normalizeShift(shift);
  return text
    .split('')
    .map((char) => shiftChar(char, k))
    .join('');
}

/**
 * Decrypts full text with the given shift key.
 * Formula: D(x) = (x - k + 26) mod 26
 * @param {string} text
 * @param {number} shift
 * @returns {string}
 */
export function decryptCaesar(text, shift) {
  if (!text) return '';
  const k = normalizeShift(shift);
  // Decryption by k is equivalent to encryption by (26 - k)
  const decryptShift = (26 - k) % 26;
  return text
    .split('')
    .map((char) => shiftChar(char, decryptShift))
    .join('');
}

/**
 * Generates the shifted alphabet string based on shift key.
 * @param {number} shift
 * @returns {{ original: string, shifted: string, mappings: Array<{ from: string, to: string, index: number }> }}
 */
export function getShiftedAlphabet(shift) {
  const k = normalizeShift(shift);
  const original = ALPHABET_UPPER;
  const shifted = original
    .split('')
    .map((char) => shiftChar(char, k))
    .join('');

  const mappings = original.split('').map((char, index) => ({
    from: char,
    to: shifted[index],
    index,
  }));

  return { original, shifted, mappings, shift: k };
}

/**
 * Common English words used to score likelihood in brute-force decoder
 */
const COMMON_ENGLISH_WORDS = new Set([
  'THE', 'BE', 'TO', 'OF', 'AND', 'A', 'IN', 'THAT', 'HAVE', 'I',
  'IT', 'FOR', 'NOT', 'ON', 'WITH', 'HE', 'AS', 'YOU', 'DO', 'AT',
  'THIS', 'BUT', 'HIS', 'BY', 'FROM', 'THEY', 'WE', 'SAY', 'HER',
  'SHE', 'OR', 'AN', 'WILL', 'MY', 'ONE', 'ALL', 'WOULD', 'THERE',
  'THEIR', 'WHAT', 'SO', 'UP', 'OUT', 'IF', 'ABOUT', 'WHO', 'GET',
  'WHICH', 'GO', 'ME', 'HELLO', 'WORLD', 'ATTACK', 'DAWN', 'SECRET', 'KEY'
]);

/**
 * Performs a brute-force decryption across all 26 possible shift values (0 through 25).
 * Also computes a heuristic confidence score based on common English words.
 * @param {string} ciphertext
 * @returns {Array<{ shift: number, result: string, score: number, matches: string[] }>}
 */
export function generateBruteForce(ciphertext) {
  if (!ciphertext) return [];

  const results = [];
  const words = ciphertext.toUpperCase().match(/[A-Z]+/g) || [];

  for (let shift = 0; shift < 26; shift++) {
    const decrypted = decryptCaesar(ciphertext, shift);
    
    // Heuristic scoring for English readability
    let score = 0;
    const matchedWords = [];
    if (words.length > 0) {
      const decWords = decrypted.toUpperCase().match(/[A-Z]+/g) || [];
      for (const word of decWords) {
        if (COMMON_ENGLISH_WORDS.has(word)) {
          score += 1;
          if (!matchedWords.includes(word)) {
            matchedWords.push(word);
          }
        }
      }
    }

    results.push({
      shift,
      result: decrypted,
      score,
      matches: matchedWords,
    });
  }

  return results;
}
