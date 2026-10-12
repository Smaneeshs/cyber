import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  Trash2, 
  ArrowRightLeft, 
  Sparkles, 
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  FileText
} from 'lucide-react';
import { encryptCaesar, decryptCaesar, normalizeShift } from '../utils/caesarCipher';

export default function CipherPanel({
  text,
  setText,
  shift,
  setShift,
  mode,
  setMode,
  onCopySuccess
}) {
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [autoProcess, setAutoProcess] = useState(true);

  // Compute transformation
  const computeCipher = (inputText, currentShift, currentMode) => {
    if (!inputText) return '';
    const k = normalizeShift(currentShift);
    return currentMode === 'encrypt'
      ? encryptCaesar(inputText, k)
      : decryptCaesar(inputText, k);
  };

  // Synchronize result automatically or on demand
  useEffect(() => {
    if (autoProcess) {
      setOutput(computeCipher(text, shift, mode));
    }
  }, [text, shift, mode, autoProcess]);

  const handleManualProcess = () => {
    setOutput(computeCipher(text, shift, mode));
  };

  const handleClear = () => {
    setText('');
    setOutput('');
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      if (onCopySuccess) {
        onCopySuccess('Result copied to clipboard!');
      }
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = output;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      if (onCopySuccess) onCopySuccess('Result copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwap = () => {
    if (!output) return;
    const newText = output;
    const newMode = mode === 'encrypt' ? 'decrypt' : 'encrypt';
    setText(newText);
    setMode(newMode);
    setOutput(computeCipher(newText, shift, newMode));
    if (onCopySuccess) {
      onCopySuccess(`Swapped text & switched to ${newMode} mode.`);
    }
  };

  const sampleMessages = [
    { label: 'HELLO WORLD', text: 'HELLO WORLD' },
    { label: 'ATTACK AT DAWN', text: 'ATTACK AT DAWN' },
    { label: 'THE QUICK BROWN FOX', text: 'THE QUICK BROWN FOX' },
    { 
      label: 'Numbers & Symbols', 
      text: 'Operation #42: Rendezvous at 14:30 PM! [Preserves 123 & ?]' 
    },
  ];

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const letterCount = (text.match(/[a-zA-Z]/g) || []).length;

  return (
    <section id="cipher-tool" className="pt-8 pb-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          CLASSICAL CRYPTOGRAPHY TOOL
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Encrypt. Decrypt. Understand.
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          A simple and interactive tool for exploring classical text encryption with real-time shift visualization, brute-force analysis, and frequency metrics.
        </p>

        {/* Educational Notice Banner */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs text-left max-w-xl mx-auto">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Educational Notice:</strong> For educational use only. Caesar Cipher is a classical monoalphabetic substitution cipher and is not suitable for protecting sensitive information in modern applications.
          </span>
        </div>
      </div>

      {/* Main Cipher Interactive Workspace */}
      <div className="bg-[#141922] border border-[#1E2638] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        {/* Sample Messages Quick Pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mr-1">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Try Samples:
          </span>
          {sampleMessages.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => {
                setText(sample.text);
                if (onCopySuccess) onCopySuccess(`Loaded sample: "${sample.label}"`);
              }}
              className="px-3 py-1 text-xs rounded-lg bg-[#0A0C11] border border-[#1E2638] text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-slate-800 transition-all font-mono"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Shift Key & Mode Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 rounded-xl bg-[#0A0C11]/90 border border-[#1E2638] mb-8">
          {/* Operation Selector */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Operation Mode</span>
              <span className="text-[11px] text-blue-400 font-mono">
                {mode === 'encrypt' ? 'E(x) = (x + k) mod 26' : 'D(x) = (x - k + 26) mod 26'}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#141922] p-1.5 rounded-xl border border-[#1E2638]">
              <button
                type="button"
                id="mode-encrypt-btn"
                onClick={() => setMode('encrypt')}
                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'encrypt'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Lock className="w-4 h-4" />
                Encrypt
              </button>
              <button
                type="button"
                id="mode-decrypt-btn"
                onClick={() => setMode('decrypt')}
                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'decrypt'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Unlock className="w-4 h-4" />
                Decrypt
              </button>
            </div>
          </div>

          {/* Shift Key Control (Number Field + Interactive Slider) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="shift-number-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                Shift Key (k)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Valid range:</span>
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  0 &ndash; 25
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Slider */}
              <div className="flex-1 flex flex-col gap-1">
                <input
                  id="shift-slider-input"
                  type="range"
                  min="0"
                  max="25"
                  value={shift}
                  onChange={(e) => setShift(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  aria-label="Caesar Cipher shift slider"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1">
                  <span>0 (None)</span>
                  <span>3 (Classic)</span>
                  <span>13 (ROT13)</span>
                  <span>25 (Max)</span>
                </div>
              </div>

              {/* Number Field */}
              <div className="flex items-center gap-1.5 bg-[#141922] px-2 py-1 rounded-xl border border-[#1E2638]">
                <button
                  type="button"
                  onClick={() => setShift(Math.max(0, shift - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 font-mono text-sm"
                  title="Decrement Shift"
                >
                  -
                </button>
                <input
                  id="shift-number-input"
                  type="number"
                  min="0"
                  max="25"
                  value={shift}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                    if (!isNaN(val)) {
                      setShift(Math.max(0, Math.min(25, val)));
                    }
                  }}
                  className="w-12 text-center bg-[#0A0C11] border border-[#1E2638] rounded-lg py-1 font-mono font-bold text-base text-blue-400 focus:outline-none focus:border-blue-500"
                  aria-label="Shift numeric input"
                />
                <button
                  type="button"
                  onClick={() => setShift(Math.min(25, shift + 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 font-mono text-sm"
                  title="Increment Shift"
                >
                  +
                </button>
              </div>

              {/* Quick Reset Button */}
              <button
                type="button"
                onClick={() => setShift(3)}
                className="p-2 rounded-xl bg-[#141922] border border-[#1E2638] text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1"
                title="Reset to Caesar's historical key 3"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Input / Output Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Message Panel */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="message-input" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <span>{mode === 'encrypt' ? 'Original Message (Plaintext)' : 'Encrypted Message (Ciphertext)'}</span>
              </label>

              {/* Live Character & Word Metrics */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Chars: <strong className="text-slate-200">{charCount}</strong></span>
                <span>Letters: <strong className="text-blue-400">{letterCount}</strong></span>
                <span>Words: <strong className="text-slate-200">{wordCount}</strong></span>
              </div>
            </div>

            <div className="relative flex-1">
              <textarea
                id="message-input"
                rows={7}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  mode === 'encrypt'
                    ? 'Enter message to encrypt (e.g. HELLO WORLD)...'
                    : 'Enter ciphertext to decrypt (e.g. KHOOR ZRUOG)...'
                }
                className="w-full h-full min-h-[180px] p-4 bg-[#0A0C11] border border-[#1E2638] rounded-xl text-slate-100 placeholder-slate-500 font-mono text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
              />
            </div>

            {/* Input Action Controls */}
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                id="clear-input-btn"
                onClick={handleClear}
                disabled={!text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Text
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="process-msg-btn"
                  onClick={handleManualProcess}
                  disabled={!text}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Process Message
                </button>
              </div>
            </div>
          </div>

          {/* Output Result Panel */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="cipher-output-area" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${mode === 'encrypt' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                <span>{mode === 'encrypt' ? 'Encrypted Output (Ciphertext)' : 'Decrypted Output (Plaintext)'}</span>
              </label>

              {output && (
                <span className="text-xs font-mono text-slate-400">
                  Transformed {output.length} chars
                </span>
              )}
            </div>

            <div className="relative flex-1">
              <textarea
                id="cipher-output-area"
                rows={7}
                readOnly
                value={output}
                placeholder="The transformed result will appear here in real-time..."
                className={`w-full h-full min-h-[180px] p-4 bg-[#0A0C11] border rounded-xl font-mono text-sm sm:text-base focus:outline-none transition-all resize-y ${
                  mode === 'encrypt'
                    ? 'border-blue-900/40 text-blue-100 selection:bg-blue-600/40'
                    : 'border-emerald-900/40 text-emerald-100 selection:bg-emerald-600/40'
                }`}
              />
            </div>

            {/* Output Action Controls (Copy, Swap) */}
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                id="swap-cipher-btn"
                onClick={handleSwap}
                disabled={!output}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-[#0A0C11] border border-[#1E2638] hover:border-slate-600 disabled:opacity-40 disabled:pointer-events-none transition-all"
                title="Swap input and output and invert operation"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-blue-400" />
                Swap Input &amp; Output
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="copy-output-btn"
                  onClick={handleCopy}
                  disabled={!output}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-[#0A0C11] border border-blue-500/40 text-blue-300 hover:bg-blue-600/10 hover:border-blue-400 disabled:opacity-40 disabled:pointer-events-none'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-blue-400" />
                      Copy Output
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
