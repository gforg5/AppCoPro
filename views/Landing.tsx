import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Hyper Premium Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-600/10 blur-[150px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-5xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase bg-blue-500/5 border border-blue-500/20 rounded-full backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
          Next-Gen Native Compilation
        </div>
        
        <h1 className="text-6xl md:text-[7rem] font-black mb-10 leading-[0.95] tracking-tight text-white">
          Web to App <br />
          <span className="gradient-text drop-shadow-[0_0_30px_rgba(192,132,252,0.3)]">Hyper Native</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
          Transform any website into a professional <span className="text-white">Android & iOS</span> application. 
          Simply paste your URL and upload your favicon.
        </p>
        
        <div className="flex flex-col items-center gap-10">
          <Link to="/builder">
            <Button size="lg" className="px-16 py-7 text-xl rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95 font-black uppercase tracking-widest border border-white/10">
              Compile Website Now
            </Button>
          </Link>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
               {[1,2,3,4,5].map(i => (
                 <img key={i} src={`https://picsum.photos/seed/${i+50}/100/100`} className="w-12 h-12 rounded-full border-[3px] border-slate-950 shadow-2xl transition-transform hover:scale-110" alt="user" />
               ))}
               <div className="w-12 h-12 rounded-full bg-slate-900 border-[3px] border-slate-950 flex items-center justify-center text-[10px] font-black text-white shadow-2xl">+8k</div>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Active Platform Users</p>
          </div>
        </div>
      </div>

      {/* Stats Grid - Hyper Premium Styling */}
      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl">
        {[
          { label: 'Cloud Build', val: '< 60s', icon: '⚡' },
          { label: 'Auto Refresh', val: 'Native', icon: '🔄' },
          { label: 'Push API', val: 'Supported', icon: '🔔' },
          { label: 'Multi Platform', val: 'Dual OS', icon: '📱' },
        ].map(stat => (
          <div key={stat.label} className="glass group p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:from-white/[0.08] transition-all duration-500 text-center">
            <div className="text-2xl mb-4">{stat.icon}</div>
            <div className="text-white font-black text-2xl mb-2 tracking-tight group-hover:scale-110 transition-transform">{stat.val}</div>
            <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-blue-400 transition-colors">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};