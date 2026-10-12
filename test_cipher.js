import { encryptCaesar, decryptCaesar, generateBruteForce, normalizeShift } from './src/utils/caesarCipher.js';
import { analyzeLetterFrequency } from './src/utils/frequencyAnalysis.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- Testing Caesar Cipher Algorithm ---');

// Requirement 1: HELLO with shift 3 encrypts to KHOOR
assert(encryptCaesar('HELLO', 3) === 'KHOOR', 'HELLO with shift 3 encrypts to KHOOR');

// Requirement 2: KHOOR with shift 3 decrypts to HELLO
assert(decryptCaesar('KHOOR', 3) === 'HELLO', 'KHOOR with shift 3 decrypts to HELLO');

// Requirement 3: XYZ with shift 3 encrypts to ABC
assert(encryptCaesar('XYZ', 3) === 'ABC', 'XYZ with shift 3 encrypts to ABC (wraps alphabet)');
assert(decryptCaesar('ABC', 3) === 'XYZ', 'ABC with shift 3 decrypts to XYZ (wraps backwards)');

// Requirement 4: Lowercase text remains lowercase
assert(encryptCaesar('hello', 3) === 'khoor', 'hello with shift 3 encrypts to khoor (preserves lowercase)');
assert(encryptCaesar('Hello World', 3) === 'Khoor Zruog', 'Mixed case preserves case per letter');

// Requirement 5: Spaces and punctuation remain unchanged
const complexMsg = 'Attack at 06:00 AM! (Code: #99)';
const encryptedComplex = encryptCaesar(complexMsg, 3);
assert(encryptedComplex === 'Dwwdfn dw 06:00 DP! (Frgh: #99)', 'Spaces, numbers, and punctuation preserved');
assert(decryptCaesar(encryptedComplex, 3) === complexMsg, 'Decryption fully restores complex message');

// Requirement 6: Shift 0 produces original message
assert(encryptCaesar('HELLO WORLD 123!', 0) === 'HELLO WORLD 123!', 'Shift 0 leaves encryption unchanged');
assert(decryptCaesar('HELLO WORLD 123!', 0) === 'HELLO WORLD 123!', 'Shift 0 leaves decryption unchanged');

// Requirement 7: All 26 brute-force shifts are generated correctly
const bf = generateBruteForce('KHOOR');
assert(bf.length === 26, 'generateBruteForce generates exactly 26 shift outputs');
assert(bf.find(b => b.shift === 3)?.result === 'HELLO', 'Brute force find shift 3 restores HELLO from KHOOR');
assert(bf[0].shift === 0 && bf[0].result === 'KHOOR', 'Shift 0 in brute force matches original ciphertext');

// Frequency analysis test
const freq = analyzeLetterFrequency('HELLO');
assert(freq.totalLetters === 5, 'Frequency analysis counts 5 total letters');
assert(freq.counts['L'] === 2, 'L has count 2');
assert(freq.counts['H'] === 1, 'H has count 1');
assert(freq.frequencies['L'] === 40, 'L frequency is 40%');

// Normalize shift bounds
assert(normalizeShift(26) === 0, 'Shift 26 wraps to 0');
assert(normalizeShift(-1) === 25, 'Negative shift -1 wraps to 25');
assert(normalizeShift(29) === 3, 'Shift 29 wraps to 3');

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
