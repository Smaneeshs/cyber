import React, { useState, useMemo } from 'react';
import { analyzeLetterFrequency, STANDARD_ENGLISH_FREQUENCIES } from '../utils/frequencyAnalysis';
import { encryptCaesar, normalizeShift } from '../utils/caesarCipher';
import { BarChart3, TrendingUp, Info, HelpCircle } from 'lucide-react';

export default function FrequencyAnalysis({ text, shift }) {
  const [viewTarget, setViewTarget] = useState('input'); // 'input' | 'output' | 'both'
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Compute cipher output for frequency comparison
  const cipherOutput = useMemo(() => {
    return encryptCaesar(text || '', normalizeShift(shift));
  }, [text, shift]);

  const activeTextToAnalyze = viewTarget === 'output' ? cipherOutput : text;
  const analysis = useMemo(() => {
    return analyzeLetterFrequency(activeTextToAnalyze || '');
  }, [activeTextToAnalyze]);

  // Find max frequency for chart scaling (max of either sample or expected ~13%)
  const maxFreq = useMemo(() => {
    let max = 13;
    analysis.data.forEach((d) => {
      if (d.frequency > max) max = d.frequency;
    });
    return Math.ceil(max);
  }, [analysis]);

  return (
    <section id="frequency-analysis" className="my-12">
      <div className="bg-[#141922] border border-[#1E2638] rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> Statistical Cryptanalysis
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Letter Frequency Analysis
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Monitors single-letter frequency distribution. In simple substitution ciphers, the frequency distribution curve is merely shifted along the alphabet axis without altering its shape.
            </p>
          </div>

          {/* Toggle between input and transformed output */}
          <div className="flex items-center gap-1 bg-[#0A0C11] p-1.5 rounded-xl border border-[#1E2638]">
            <button
              type="button"
              onClick={() => setViewTarget('input')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                viewTarget === 'input'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Analyze Input Text
            </button>
            <button
              type="button"
              onClick={() => setViewTarget('output')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                viewTarget === 'output'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Analyze Cipher Output
            </button>
          </div>
        </div>

        {/* Quick Stats Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
            <span className="text-xs text-slate-400">Total Letters Analyzed</span>
            <div className="text-xl font-bold text-white mt-1 font-mono">
              {analysis.totalLetters}
            </div>
            <span className="text-[10px] text-slate-500">Excludes symbols/spaces</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
            <span className="text-xs text-slate-400">Most Frequent Letter</span>
            <div className="text-xl font-bold text-blue-400 mt-1 font-mono">
              {analysis.mostFrequent ? `${analysis.mostFrequent} (${analysis.counts[analysis.mostFrequent]}x)` : 'None'}
            </div>
            <span className="text-[10px] text-slate-500">
              {analysis.mostFrequent ? `${analysis.frequencies[analysis.mostFrequent]}% of total` : 'No letters'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
            <span className="text-xs text-slate-400">Expected Top (English)</span>
            <div className="text-xl font-bold text-slate-200 mt-1 font-mono">
              E <span className="text-sm font-normal text-slate-400">(12.7%)</span>
            </div>
            <span className="text-[10px] text-slate-500">Followed by T (9.1%), A (8.2%)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638]">
            <span className="text-xs text-slate-400">Current Key Shift</span>
            <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
              k = {normalizeShift(shift)}
            </div>
            <span className="text-[10px] text-slate-500">Offsets the frequency peaks</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs px-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
              <span className="text-slate-300 font-medium">
                {viewTarget === 'input' ? 'Input Text Letter %' : 'Cipher Output Letter %'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-600 inline-block" />
              <span className="text-slate-400">Standard English Expected %</span>
            </div>
          </div>

          <span className="text-slate-500 text-[11px]">
            Hover over any bar to inspect specific letter statistics
          </span>
        </div>

        {/* Interactive Responsive Bar Chart */}
        <div className="bg-[#0A0C11] border border-[#1E2638] rounded-xl p-4 sm:p-6 overflow-x-auto">
          <div className="min-w-[680px]">
            {/* Chart Area */}
            <div className="h-56 flex items-end gap-1.5 sm:gap-2 pb-2 border-b border-[#1E2638]">
              {analysis.data.map((item) => {
                const heightPercent = maxFreq > 0 ? (item.frequency / maxFreq) * 100 : 0;
                const expectedHeightPercent = (item.expected / maxFreq) * 100;
                const isSelected = selectedLetter === item.letter;

                return (
                  <div
                    key={item.letter}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                    onMouseEnter={() => setSelectedLetter(item.letter)}
                    onMouseLeave={() => setSelectedLetter(null)}
                  >
                    {/* Tooltip on hover */}
                    {isSelected && (
                      <div className="absolute -top-14 z-20 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[10px] shadow-xl whitespace-nowrap pointer-events-none">
                        <div className="font-bold text-blue-400">Letter: {item.letter}</div>
                        <div>Observed: {item.frequency}% ({item.count}x)</div>
                        <div className="text-slate-400">Expected: {item.expected}%</div>
                      </div>
                    )}

                    {/* Bars pair: Observed & Expected */}
                    <div className="w-full flex items-end justify-center gap-0.5 h-full">
                      {/* Observed text bar */}
                      <div
                        style={{ height: `${Math.max(2, heightPercent)}%` }}
                        className={`w-full max-w-[12px] sm:max-w-[16px] rounded-t transition-all duration-300 ${
                          isSelected
                            ? 'bg-blue-400 shadow-md shadow-blue-500/50'
                            : item.count > 0
                            ? 'bg-blue-500 group-hover:bg-blue-400'
                            : 'bg-blue-500/20'
                        }`}
                      />

                      {/* Standard English reference bar */}
                      <div
                        style={{ height: `${expectedHeightPercent}%` }}
                        className="w-full max-w-[6px] sm:max-w-[8px] bg-slate-700/80 rounded-t group-hover:bg-slate-500 transition-all"
                        title={`Standard English: ${item.expected}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-Axis Letter Labels */}
            <div className="flex items-center gap-1.5 sm:gap-2 pt-2">
              {analysis.data.map((item) => (
                <div
                  key={`label-${item.letter}`}
                  className={`flex-1 text-center font-mono text-xs font-semibold transition-colors ${
                    selectedLetter === item.letter
                      ? 'text-blue-400 scale-110 font-bold'
                      : item.count > 0
                      ? 'text-slate-200'
                      : 'text-slate-600'
                  }`}
                >
                  {item.letter}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cryptanalysis Educational Insight */}
        <div className="mt-4 p-4 rounded-xl bg-[#0A0C11] border border-[#1E2638] text-xs text-slate-400 leading-relaxed flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">How Cryptanalysts Break Caesar Ciphers:</strong>{' '}
            Because every 'E' in the original message always transforms into the exact same cipher character, the tallest spike in the ciphertext bar chart almost always points directly to the shifted representation of 'E'. By subtracting 4 (index of E) from that letter's index, an attacker discovers the secret key <code className="text-blue-400 font-mono">k</code> instantly without even needing brute force.
          </div>
        </div>
      </div>
    </section>
  );
}
