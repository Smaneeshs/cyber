# Caesar Cipher Tool

A cybersecurity-inspired interactive web application for classical text encryption, decryption, and cryptanalysis. Built with React 19, Vite, Tailwind CSS, and Lucide Icons.

---

## 🔒 Features

- **Core Cryptographic Engine**:
  - Live encryption: $E(x) = (x + k) \pmod{26}$
  - Live decryption: $D(x) = (x - k + 26) \pmod{26}$
  - Full support for uppercase and lowercase letter casing preservation.
  - Preserves whitespace, punctuation, numbers, and symbols.
  - Correct alphabet wrapping (e.g. `Z` with shift 3 wraps to `C`).
  - Key offset range strictly constrained between $0$ and $25$.
- **Alphabet Shift Visualization**:
  - Dual-row visualization mapping original plaintext letters $[A-Z]$ directly to shifted cipher letters.
  - Interactive inspection highlighting individual letter transformation on hover or click.
- **Brute-Force Decoder ("Try All Shifts")**:
  - Automatically generates all 26 shift permutations ($k = 0 \dots 25$).
  - Heuristic dictionary scoring highlighting probable English plaintext.
  - Search/filter functionality to quickly search across all outputs.
  - One-click copy for every individual permutation.
- **Letter Frequency Analysis**:
  - Frequency distribution chart comparing input/output text against standard Oxford English corpus frequencies.
  - Real-time letter counts and percentage metrics.
  - Toggle between input and cipher output distributions.
- **Interactive Educational Walkthrough**:
  - Step-by-step mathematical guide.
  - Detailed breakdown of historical context, modular arithmetic, brute-force attacks, and modern cryptographic limitations.
  - Includes the canonical verification example:
    - **Original:** `HELLO`
    - **Shift:** `3`
    - **Encrypted:** `KHOOR`
    - **Decrypted:** `HELLO`
- **Modern Developer UI/UX**:
  - Cybersecurity-inspired dark theme (`#0A0C11` background, `#141922` cards, `#3B82F6` electric blue, `#22C55E` emerald green).
  - Light theme toggle with automatic contrast adaptation.
  - Toast notifications for clipboard actions.
  - Sample test messages (e.g., `HELLO WORLD`, `ATTACK AT DAWN`, `THE QUICK BROWN FOX`, etc.).
  - 100% Client-side browser execution — zero data leaves the user's device.

---

## 🛠️ Project Structure

```
src/
├── components/
│   ├── Header.jsx                # Top bar with logo, nav links, theme toggle, and GitHub link
│   ├── CipherPanel.jsx           # Main interactive tool (inputs, sliders, live metrics, copy/swap)
│   ├── AlphabetVisualization.jsx # Dual-row alphabet mapper with modular vector indicators
│   ├── BruteForcePanel.jsx       # Exhaustive 26-shift decoder with filter & copy actions
│   ├── FrequencyAnalysis.jsx     # Letter frequency bar chart vs standard English baseline
│   ├── HowItWorks.jsx            # Educational guides, formulas, and canonical walkthroughs
│   └── Footer.jsx                # Security disclaimers, privacy badge, and back-to-top button
├── utils/
│   ├── caesarCipher.js           # Core encryption, decryption, shift normalization & brute-force logic
│   └── frequencyAnalysis.js      # Frequency calculation and standard English corpus baseline
├── App.jsx                       # Master page coordinator and state manager
├── main.jsx                      # React 19 root entry
└── index.css                     # Tailwind CSS configuration and dark/light design system tokens
```

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run automated algorithm tests
node test_cipher.js

# Build for production
npm run build
```

---

## 🛡️ Security Notice

*For educational use only. Caesar Cipher is a classical monoalphabetic substitution cipher and is not suitable for protecting sensitive information in modern applications.*
