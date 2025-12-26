
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Builder } from './views/Builder';
import { Landing } from './views/Landing';
import { Dashboard } from './views/Dashboard';
import { About } from './views/About';
import { Contact } from './views/Contact';
import { Privacy } from './views/Privacy';
import { Terms } from './views/Terms';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0b0e14] text-[#e1e1e1] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        {/* Modern Platform Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-[#161b22]/80 backdrop-blur-md border-b border-[#30363d] shrink-0 shadow-lg z-50 sticky top-0">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-xl group-hover:scale-110 transition-transform">AC</div>
              <span className="text-xl font-extrabold tracking-tighter text-white">AppCoPro <span className="text-blue-500 text-[10px] font-mono ml-1 uppercase border border-blue-500/30 px-1 rounded">Pro v2.5</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/dashboard" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">My Apps</Link>
              <Link to="/builder" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Compiler</Link>
              <Link to="/about" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Systems Developer</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               CLOUD SIGNING ACTIVE
             </div>
             <Link to="/builder">
               <button className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black px-5 py-2 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95">Compile New</button>
             </Link>
          </div>
        </header>
        
        <main className="flex-1 relative bg-[#05070a]">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>

        <footer className="bg-[#05070a] border-t border-white/5 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-black text-[10px] text-white">AC</div>
                <span className="text-sm font-black text-white uppercase tracking-widest">AppCoPro Platform</span>
              </div>
              <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em]">Systems Architected by Sayed Mohsin Ali</p>
            </div>
            
            <div className="flex gap-8">
              <Link to="/contact" className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Contact</Link>
              <Link to="/privacy" className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Privacy</Link>
              <Link to="/terms" className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Terms</Link>
              <Link to="/about" className="text-[10px] font-bold text-blue-500 hover:text-white uppercase tracking-widest transition-colors">The Developer</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
