import React, { useState } from 'react';
import { getShiftedAlphabet } from '../utils/caesarCipher';
import { ArrowRight, ArrowDown, Sparkles, RefreshCw, Info } from 'lucide-react';

export default function AlphabetVisualization({ shift, setShift }) {
  const [activeLetter, setActiveLetter] = useState(null);
  const alphabetData = getShiftedAlphabet(shift);

  return (
    <section id="alphabet-map" className="my-12">
      <div className="bg-[#141922] border border-[#1E2638] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Key Offset: +{alphabetData.shift}
              </span>
              <span className="text-xs text-slate-400 font-mono">k = {alphabetData.shift}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
              Alphabet Shift Visualization
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Hover over or tap any letter to inspect its direct substitution mapping under shift {shift}.
            </p>
          </div>

          {/* Quick preset keys */}
          <div className="flex items-center gap-1.5 bg-[#0A0C11] p-1.5 rounded-xl border border-[#1E2638]">
            <span className="text-xs text-slate-400 px-2 font-medium">Quick Keys:</span>
            {[0, 3, 7, 13, 25].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setShift(k)}
                className={`px-2.5 py-1 text-xs rounded-lg font-mono font-medium transition-all ${
                  shift === k
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {k === 13 ? 'ROT13' : `+${k}`}
              </button>
            ))}
          </div>
        </div>

        {/* Active Letter Interactive Preview Banner */}
        <div className="mb-6 p-4 rounded-xl bg-[#0A0C11]/80 border border-[#1E2638] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Info className="w-4 h-4" />
            </div>
            <div className="text-sm">
              {activeLetter ? (
                <span className="text-slate-200">
                  Inspecting letter{' '}
                  <strong className="text-blue-400 font-mono text-base px-1.5 py-0.5 bg-blue-500/10 rounded">
                    {activeLetter.from}
                  </strong>{' '}
                  (Index {activeLetter.index}) &rarr; shifts by +{alphabetData.shift} &rarr; maps to{' '}
                  <strong className="text-emerald-400 font-mono text-base px-1.5 py-0.5 bg-emerald-500/10 rounded">
                    {activeLetter.to}
                  </strong>{' '}
                  (Index {(activeLetter.index + alphabetData.shift) % 26})
                </span>
              ) : (
                <span className="text-slate-400">
                  Hover or click on any alphabet tile below to isolate the mapping transformation.
                </span>
              )}
            </div>
          </div>

          {activeLetter && (
            <button
              type="button"
              onClick={() => setActiveLetter(null)}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
            >
              Reset highlight
            </button>
          )}
        </div>

        {/* Dual Alphabet Track (Desktop Scrollable & Clean) */}
        <div className="space-y-4 overflow-x-auto pb-2 pt-1 select-none">
          {/* Row 1: Plaintext Original Alphabet */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Plaintext Alphabet (Input x)
              </span>
              <span className="text-xs font-mono text-slate-500">26 letters [A-Z]</span>
            </div>

            <div className="grid grid-cols-13 sm:grid-cols-26 gap-1 min-w-[700px]">
              {alphabetData.mappings.map((item) => {
                const isSelected = activeLetter?.index === item.index;
                return (
                  <button
                    key={`orig-${item.from}`}
                    type="button"
                    onMouseEnter={() => setActiveLetter(item)}
                    onClick={() => setActiveLetter(item)}
                    className={`h-11 flex flex-col items-center justify-center rounded-lg border font-mono transition-all text-xs sm:text-sm font-semibold ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/50 shadow-md scale-105 z-10'
                        : 'bg-[#0A0C11] text-slate-200 border-[#1E2638] hover:border-blue-500/50 hover:bg-slate-900/80'
                    }`}
                  >
                    <span>{item.from}</span>
                    <span className="text-[9px] font-normal text-slate-500 leading-none">
                      {item.index}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connection Vector Indicator */}
          <div className="flex items-center justify-center py-1 min-w-[700px]">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0C11] border border-[#1E2638] text-[11px] font-mono text-slate-400">
              <span>(x + {alphabetData.shift}) mod 26</span>
              <ArrowDown className="w-3.5 h-3.5 text-blue-400" />
            </div>
          </div>

          {/* Row 2: Shifted Cipher Alphabet */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Cipher Alphabet (Shifted Result E(x))
              </span>
              <span className="text-xs font-mono text-slate-500">
                Shifted by +{alphabetData.shift}
              </span>
            </div>

            <div className="grid grid-cols-13 sm:grid-cols-26 gap-1 min-w-[700px]">
              {alphabetData.mappings.map((item) => {
                const isSelected = activeLetter?.index === item.index;
                return (
                  <button
                    key={`shift-${item.to}-${item.index}`}
                    type="button"
                    onMouseEnter={() => setActiveLetter(item)}
                    onClick={() => setActiveLetter(item)}
                    className={`h-11 flex flex-col items-center justify-center rounded-lg border font-mono transition-all text-xs sm:text-sm font-semibold ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/50 shadow-md scale-105 z-10'
                        : 'bg-[#0A0C11] text-emerald-400/90 border-[#1E2638] hover:border-emerald-500/50 hover:bg-slate-900/80'
                    }`}
                  >
                    <span>{item.to}</span>
                    <span className="text-[9px] font-normal text-slate-500 leading-none">
                      {(item.index + alphabetData.shift) % 26}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-3 border-t border-[#1E2638] gap-2">
          <span>
            {alphabetData.shift === 0
              ? 'Shift 0: Identity cipher (plaintext equals ciphertext).'
              : alphabetData.shift === 13
              ? 'Shift 13: ROT13 cipher (symmetric cipher where encrypting twice restores text).'
              : `Each character undergoes modular rotation by ${alphabetData.shift} characters clockwise.`}
          </span>
          <span className="font-mono text-slate-500">Wrapping: Z &rarr; A at shift boundary</span>
        </div>
      </div>
    </section>
  );
}
