import React, { useState, useMemo } from 'react';
import { 
  generateBruteForce 
} from '../utils/caesarCipher';
import { 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle, 
  ArrowUpRight, 
  Layers,
  Filter
} from 'lucide-react';

export default function BruteForcePanel({ currentText, onSelectText, onCopySuccess }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedShift, setCopiedShift] = useState(null);

  // Generate all 26 shifts for the text
  const bruteForceResults = useMemo(() => {
    return generateBruteForce(currentText || 'KHOOR ZRUOG');
  }, [currentText]);

  // Filter if user types in search box
  const filteredResults = useMemo(() => {
    if (!filterQuery.trim()) return bruteForceResults;
    const query = filterQuery.toLowerCase();
    return bruteForceResults.filter((item) =>
      item.result.toLowerCase().includes(query) ||
      item.shift.toString() === query
    );
  }, [bruteForceResults, filterQuery]);

  const handleCopyRow = async (shift, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedShift(shift);
      if (onCopySuccess) {
        onCopySuccess(`Shift ${shift} output copied to clipboard!`);
      }
      setTimeout(() => setCopiedShift(null), 2000);
    } catch {
      setCopiedShift(shift);
      setTimeout(() => setCopiedShift(null), 2000);
    }
  };

  return (
    <section id="brute-force" className="my-12">
      <div className="bg-[#141922] border border-[#1E2638] rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header and explanation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <Layers className="w-3.5 h-3.5" /> Exhaustive Cryptanalysis
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Brute-Force Decoder (Try All 26 Shifts)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Since Caesar Cipher has a key space of only 25 nontrivial shifts, an attacker can test all permutations in milliseconds.
            </p>
          </div>

          {/* Search Filter Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search in outputs or shift..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#0A0C11] border border-[#1E2638] rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Educational Disclaimer Box */}
        <div className="mb-6 p-4 rounded-xl bg-[#0A0C11] border border-amber-500/20 text-slate-300 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-300">
              Important Cryptanalysis Note:
            </p>
            <p className="text-slate-400 leading-relaxed">
              Brute-force output presents every mathematical possibility (Shifts 0 through 25). While automated English dictionary detection highlights probable matches, short texts or acronyms may produce several plausible outputs. Always inspect the context to verify true plaintext.
            </p>
          </div>
        </div>

        {/* Results Table / List */}
        <div className="border border-[#1E2638] rounded-xl overflow-hidden bg-[#0A0C11]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-[#141922] border-b border-[#1E2638] text-xs font-semibold uppercase tracking-wider text-slate-400">
            <div className="col-span-2 sm:col-span-1">Key</div>
            <div className="col-span-7 sm:col-span-8">Decrypted Permutation Output</div>
            <div className="col-span-3 sm:col-span-3 text-right">Actions</div>
          </div>

          {/* Table Rows (26 Shifts) */}
          <div className="max-h-[500px] overflow-y-auto divide-y divide-[#1E2638]/60">
            {filteredResults.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No shift outputs match your filter query "{filterQuery}".
              </div>
            ) : (
              filteredResults.map((item) => {
                const isCopied = copiedShift === item.shift;
                const hasMatch = item.score > 0;
                return (
                  <div
                    key={item.shift}
                    className={`grid grid-cols-12 gap-2 px-4 py-3 items-center text-xs sm:text-sm transition-colors ${
                      hasMatch
                        ? 'bg-emerald-950/20 hover:bg-emerald-950/30'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Shift Number */}
                    <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 font-mono">
                      <span className="font-bold text-slate-300">k={item.shift}</span>
                    </div>

                    {/* Result Text */}
                    <div className="col-span-7 sm:col-span-8 flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden">
                      <span className="font-mono text-slate-200 truncate select-all">
                        {item.result}
                      </span>

                      {/* Likely English Badge */}
                      {hasMatch && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          Likely match ({item.matches.join(', ')})
                        </span>
                      )}
                    </div>

                    {/* Actions (Copy + Load) */}
                    <div className="col-span-3 sm:col-span-3 flex items-center justify-end gap-1.5">
                      {onSelectText && (
                        <button
                          type="button"
                          onClick={() => onSelectText(item.result, item.shift)}
                          className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-[#141922] border border-[#1E2638] hover:border-slate-600 transition-all"
                          title="Load this result into main tool"
                        >
                          <ArrowUpRight className="w-3 h-3 text-blue-400" />
                          Use
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopyRow(item.shift, item.result)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#141922] border border-[#1E2638] text-slate-300 hover:text-white hover:border-slate-600'
                        }`}
                        title="Copy this permutation"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-200" />
                            <span className="hidden sm:inline">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Total permutations: 26 (including Identity shift 0)</span>
          <span className="font-mono">Attack Complexity: O(26 &times; n)</span>
        </div>
      </div>
    </section>
  );
}
