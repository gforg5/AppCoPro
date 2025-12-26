
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Builder } from './views/Builder';
import { Landing } from './views/Landing';
import { Dashboard } from './views/Dashboard';

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
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               BUILD NODES ONLINE
             </div>
             <Link to="/builder">
               <button className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black px-5 py-2 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95">Compile New</button>
             </Link>
          </div>
        </header>
        
        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
