import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CipherPanel from './components/CipherPanel';
import AlphabetVisualization from './components/AlphabetVisualization';
import BruteForcePanel from './components/BruteForcePanel';
import FrequencyAnalysis from './components/FrequencyAnalysis';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import { Check, Info } from 'lucide-react';

export default function App() {
  const [text, setText] = useState('HELLO WORLD');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState('encrypt');
  const [isDark, setIsDark] = useState(true);
  const [toast, setToast] = useState(null);

  // Sync dark class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const handleSelectFromBruteForce = (selectedResult, selectedShift) => {
    setText(selectedResult);
    setShift(selectedShift);
    setMode('encrypt');
    showToast(`Loaded Shift ${selectedShift} result into main tool.`);
    // Scroll to cipher tool smoothly
    const el = document.getElementById('cipher-tool');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0C11] text-slate-100 transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Core Interactive Caesar Cipher Tool & Hero */}
        <CipherPanel
          text={text}
          setText={setText}
          shift={shift}
          setShift={setShift}
          mode={mode}
          setMode={setMode}
          onCopySuccess={showToast}
        />

        {/* Alphabet Shift Visualization */}
        <AlphabetVisualization
          shift={shift}
          setShift={setShift}
        />

        {/* Brute-Force Decoder (All 26 Shifts) */}
        <BruteForcePanel
          currentText={text}
          onSelectText={handleSelectFromBruteForce}
          onCopySuccess={showToast}
        />

        {/* Letter Frequency Analysis */}
        <FrequencyAnalysis
          text={text}
          shift={shift}
        />

        {/* Educational How It Works Walkthrough */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-blue-500/40 text-white text-xs sm:text-sm shadow-2xl shadow-blue-500/10 animate-bounce-short"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-slate-100">{toast}</span>
        </div>
      )}
    </div>
  );
}
