import React from 'react';
import { 
  BookOpen, 
  ShieldAlert, 
  Calculator, 
  History, 
  RotateCw, 
  Unlock, 
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="my-16">
      <div className="bg-[#141922] border border-[#1E2638] rounded-2xl p-6 sm:p-10 shadow-2xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Comprehensive Educational Guide
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How the Caesar Cipher Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Explore the historical origin, mathematical formulas, step-by-step walkthroughs, and fundamental cryptographic limitations of the Caesar substitution cipher.
          </p>
        </div>

        {/* 6 Core Educational Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: What is a Caesar Cipher? */}
          <div className="p-6 rounded-xl bg-[#0A0C11] border border-[#1E2638] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                1. What is a Caesar Cipher?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The Caesar Cipher is one of the earliest and simplest encryption techniques in recorded history. Named after Julius Caesar, who used it to protect military dispatches across the Roman Republic circa 58 BCE, it is a <strong>monoalphabetic substitution cipher</strong> where each letter is substituted by another letter shifted by a fixed number of positions down the alphabet.
              </p>
            </div>
          </div>

          {/* Card 2: How Alphabet Shifting Works */}
          <div className="p-6 rounded-xl bg-[#0A0C11] border border-[#1E2638] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <RotateCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                2. Alphabet Shifting &amp; Wrapping
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Think of the alphabet as a circular ring of 26 letters (A=0 through Z=25). Shifting slides each letter clockwise along the wheel. When a shift exceeds the letter 'Z', modular arithmetic wraps around seamlessly:
              </p>
              <div className="mt-3 p-2.5 rounded bg-[#141922] border border-[#1E2638] font-mono text-xs text-emerald-400">
                With shift 3: X &rarr; A, Y &rarr; B, Z &rarr; C
              </div>
            </div>
          </div>

          {/* Card 3: Mathematical Formulas */}
          <div className="p-6 rounded-xl bg-[#0A0C11] border border-[#1E2638] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                3. Mathematical Formulation
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Modern computer science models the Caesar Cipher using modular arithmetic modulo 26:
              </p>
              <div className="mt-3 space-y-1.5 font-mono text-xs">
                <div className="p-2 rounded bg-[#141922] border border-blue-500/30 text-blue-300">
                  Encryption: E(x) = (x + k) mod 26
                </div>
                <div className="p-2 rounded bg-[#141922] border border-emerald-500/30 text-emerald-300">
                  Decryption: D(x) = (x - k + 26) mod 26
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: How Shift Key Affects Output */}
          <div className="p-6 rounded-xl bg-[#0A0C11] border border-[#1E2638] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                4. Impact of the Shift Key (k)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The shift key <em>k</em> (from 0 to 25) controls the degree of rotation.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-400 list-disc list-inside">
                <li><strong className="text-slate-300">k = 0:</strong> Identity (no transformation).</li>
                <li><strong className="text-slate-300">k = 3:</strong> Caesar's classical historical key.</li>
                <li><strong className="text-slate-300">k = 13:</strong> ROT13 (self-inverting symmetric cipher).</li>
                <li><strong className="text-slate-300">k = 26:</strong> Equivalent to k = 0 (modular cycle).</li>
              </ul>
            </div>
          </div>

          {/* Card 5: What Brute-Force Decoding Means */}
          <div className="p-6 rounded-xl bg-[#0A0C11] border border-[#1E2638] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
                <Unlock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                5. What Brute-Force Means
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Brute-force is an exhaustive cryptanalytic attack where an analyst tries every possible key until coherent plaintext appears. Because the English alphabet has only 26 letters, there are only <strong>25 non-trivial keys</strong>. A human can test all 25 keys in under 60 seconds, and a modern computer executes this in less than a microsecond.
              </p>
            </div>
          </div>

          {/* Card 6: Why Caesar Cipher Is Insecure */}
          <div className="p-6 rounded-xl bg-[#0A0C11] border border-[#1E2638] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                6. Why It's Insecure Today
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Caesar Cipher provides <strong>zero cryptographic security</strong> for real-world confidential information:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-400 list-disc list-inside">
                <li><strong className="text-red-300">Tiny Keyspace:</strong> Only 25 candidate keys.</li>
                <li><strong className="text-red-300">Frequency Leakage:</strong> Preserves identical letter frequencies without diffusion or confusion.</li>
                <li><strong className="text-red-300">No Modern Primitives:</strong> Lacks rounds, nonces, or initialization vectors (AES/RSA).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Required Canonical Demonstration Box */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 via-[#0A0C11] to-emerald-950/30 border border-[#1E2638]">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              Canonical Walkthrough Example (Key Shift = 3)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
              <span className="text-xs text-slate-400 uppercase font-semibold">1. Original Plaintext</span>
              <div className="text-xl font-bold font-mono text-white mt-1">
                HELLO
              </div>
              <span className="text-[11px] text-slate-500">Letter indexes: [7, 4, 11, 11, 14]</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
              <span className="text-xs text-slate-400 uppercase font-semibold">2. Selected Shift Key</span>
              <div className="text-xl font-bold font-mono text-blue-400 mt-1">
                +3
              </div>
              <span className="text-[11px] text-slate-500">Add 3 to each position</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
              <span className="text-xs text-slate-400 uppercase font-semibold">3. Encrypted Ciphertext</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                KHOOR
              </div>
              <span className="text-[11px] text-slate-500">H&rarr;K, E&rarr;H, L&rarr;O, O&rarr;R</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
              <span className="text-xs text-slate-400 uppercase font-semibold">4. Decrypted Plaintext</span>
              <div className="text-xl font-bold font-mono text-blue-300 mt-1">
                HELLO
              </div>
              <span className="text-[11px] text-slate-500">Subtract 3 &rarr; Restores original</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center mt-4">
            Notice that double letters ('LL') remain double letters in the ciphertext ('OO'). This structural signature is why simple frequency and pattern matching breaks Caesar Ciphers immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
