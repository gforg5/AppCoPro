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
      <div className="min-h-screen bg-[#05070a] text-[#e1e1e1] flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
        {/* Hyper Premium Platform Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#0a0c10]/80 backdrop-blur-2xl border-b border-white/5 shrink-0 shadow-2xl z-50 sticky top-0">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform border border-white/10">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">AppCoPro <span className="text-blue-500 text-[9px] font-black ml-2 uppercase border border-blue-500/20 px-2 py-0.5 rounded-full tracking-[0.2em]">SMA ENGINE</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/dashboard" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors">Workspace</Link>
              <Link to="/builder" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors">Compiler</Link>
              <Link to="/about" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors">Systems Developer</Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden xl:flex items-center gap-3 text-[9px] font-black text-emerald-500 bg-emerald-500/5 px-4 py-1.5 rounded-full border border-emerald-500/20 tracking-[0.2em]">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               CLOUD NODES ACTIVE
             </div>
             <Link to="/builder">
               <button className="bg-white hover:bg-slate-200 text-black text-[10px] font-black px-6 py-2.5 rounded-xl uppercase tracking-widest transition-all shadow-xl active:scale-95">Compile Now</button>
             </Link>
          </div>
        </header>
        
        <main className="flex-1 relative">
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

        {/* Hyper Premium Footer */}
        <footer className="bg-[#07090d] border-t border-white/5 py-16 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-[10px] text-white shadow-lg">AC</div>
                <span className="text-lg font-black text-white uppercase tracking-tighter">AppCoPro Platform</span>
              </div>
              <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.4em]">System Developed by SMA @2025</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10">
              <Link to="/contact" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors">Contact</Link>
              <Link to="/privacy" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors">Privacy</Link>
              <Link to="/terms" className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors">Terms</Link>
              <Link to="/about" className="text-[10px] font-black text-blue-500 hover:text-white uppercase tracking-[0.3em] transition-colors">Systems Developer</Link>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/[0.03] text-center">
             <p className="text-[8px] text-slate-700 uppercase font-black tracking-[0.6em]">Premium Native Bridge Architecture © 2025</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}