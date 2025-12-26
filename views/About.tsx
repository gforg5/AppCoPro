
import React from 'react';
import { Button } from '../components/Button';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05070a] pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
            Chief Systems Architect
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 text-white tracking-tighter">
            Sayed Mohsin <span className="gradient-text">Ali</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            High-performance Systems Developer specializing in native bridge architecture and enterprise web-to-app scalability.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Profile Card */}
          <div className="lg:col-span-7 glass p-1 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/5 to-transparent shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 h-full flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl border border-white/20">
                  SMA
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Project Identity</h2>
                  <p className="text-blue-500 font-mono text-xs uppercase tracking-widest">Systems Developer // AppCoPro Lead</p>
                </div>
              </div>
              
              <div className="space-y-6 text-slate-300 text-base leading-relaxed">
                <p>
                  Sayed Mohsin Ali is the engineering force behind the <span className="text-white font-bold">AppCoPro Ecosystem</span>. With deep expertise in bridge technology, he focused on solving the fundamental friction between web-based content and native mobile performance.
                </p>
                <p>
                  His work on the "Liquid Wrapper" engine enables sub-60 second compilation of enterprise-grade URLs into fully functional Android and iOS environments, complete with hardware-level API synchronization.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                 {['Native Bridge', 'Cloud Compilation', 'System Architecture', 'Rust/Wasm', 'V8 Optimization'].map(skill => (
                   <span key={skill} className="px-5 py-2 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     {skill}
                   </span>
                 ))}
              </div>
            </div>
          </div>

          {/* Stats/Quick Info Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass p-8 rounded-[3rem] border-white/5 bg-slate-950/50 flex-1">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Technical Metrics</h3>
              <div className="space-y-8">
                {[
                  { label: 'Apps Compiled', value: '12,500+', color: 'text-blue-500' },
                  { label: 'Uptime Reliability', value: '99.99%', color: 'text-emerald-500' },
                  { label: 'System Latency', value: '< 12ms', color: 'text-indigo-500' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-slate-900 pb-4">
                    <span className="text-xs font-bold text-slate-400">{stat.label}</span>
                    <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[3rem] shadow-2xl shadow-blue-900/20 group cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-500">
                 <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
              </div>
              <h3 className="text-xl font-black text-white mb-2">Connect Directly</h3>
              <p className="text-white/70 text-sm mb-6 font-medium">For enterprise integrations and systems consultation.</p>
              <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full py-4 rounded-2xl">
                Open Channel
              </Button>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-24 text-center">
           <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.5em] mb-8">Development Philosophy</h3>
           <p className="text-3xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight tracking-tighter">
             "Code should be invisible, performance should be absolute, and <span className="text-blue-500">quality</span> is the only metric that survives."
           </p>
        </div>
      </div>
    </div>
  );
};
