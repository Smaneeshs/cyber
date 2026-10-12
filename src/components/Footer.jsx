import React from 'react';
import { Shield, Lock, ArrowUp, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#1E2638] bg-[#0A0C11] text-slate-400 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand & Privacy Statement */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">
                Caesar Cipher Tool
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              An open-source interactive classical cryptography laboratory for students, educators, and cybersecurity enthusiasts.
            </p>

            {/* Privacy verification badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141922] border border-emerald-500/20 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>100% Client-Side Execution &bull; Zero Network Transmission</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#cipher-tool" className="hover:text-blue-400 transition-colors">
                  Cipher &amp; Decrypt Tool
                </a>
              </li>
              <li>
                <a href="#alphabet-map" className="hover:text-blue-400 transition-colors">
                  Alphabet Shift Mapping
                </a>
              </li>
              <li>
                <a href="#brute-force" className="hover:text-blue-400 transition-colors">
                  Brute-Force Permutations
                </a>
              </li>
              <li>
                <a href="#frequency-analysis" className="hover:text-blue-400 transition-colors">
                  Frequency Analysis
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-400 transition-colors">
                  How Caesar Cipher Works
                </a>
              </li>
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Security Notice
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              For educational use only. Caesar Cipher is not suitable for protecting sensitive information in production systems or modern communication.
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141922] border border-[#1E2638] text-xs text-slate-300 hover:text-white hover:border-slate-600 transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#1E2638] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <span>
            &copy; {new Date().getFullYear()} Caesar Cipher Tool. Built with React &amp; Tailwind CSS.
          </span>
          <span className="flex items-center gap-1">
            Engineered for interactive cryptography education
          </span>
        </div>
      </div>
    </footer>
  );
}
