import React, { useState } from 'react';
import { Shield, Lock, Moon, Sun, Menu, X, KeyRound, BookOpen, BarChart3, Search } from 'lucide-react';

export default function Header({ isDark, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Cipher Tool', href: '#cipher-tool', icon: Lock },
    { label: 'Alphabet Map', href: '#alphabet-map', icon: KeyRound },
    { label: 'Brute-Force', href: '#brute-force', icon: Search },
    { label: 'Frequency', href: '#frequency-analysis', icon: BarChart3 },
    { label: 'How It Works', href: '#how-it-works', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0C11]/85 border-b border-[#1E2638] dark:bg-[#0A0C11]/85 dark:border-[#1E2638] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-all duration-300">
              <div className="w-full h-full bg-[#0A0C11] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Caesar Cipher
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded">
                  v1.0
                </span>
              </span>
              <span className="text-xs text-slate-400">Classical Cryptography Lab</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-150"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Utilities (Theme, Github, Mobile toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg bg-[#141922] border border-[#1E2638] text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-blue-400 transition-transform rotate-0 hover:-rotate-12 duration-300" />
              )}
            </button>

            {/* GitHub Placeholder Button */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-2 rounded-lg bg-[#141922] border border-[#1E2638] text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="View on GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#141922] border border-[#1E2638] text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#1E2638] space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70"
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                  {item.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
