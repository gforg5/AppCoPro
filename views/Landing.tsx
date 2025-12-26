
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Landing: React.FC = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-4xl text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full animate-pulse">
          Lightning Fast App Builder
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
          Web to App <br />
          <span className="gradient-text">In 60 Seconds</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Paste your website link, upload your logo, and get a professional Android & iOS app instantly. No complexity, just results.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/builder">
            <Button size="lg" className="px-12 py-5 text-xl h-auto">Convert My Website Now</Button>
          </Link>
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <img key={i} src={`https://picsum.photos/seed/${i+10}/100/100`} className="w-10 h-10 rounded-full border-2 border-slate-950 shadow-lg" alt="user" />
             ))}
             <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold">+5k</div>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-slate-500">
        {[
          { label: 'Fast Build', val: '< 1 min' },
          { label: 'Auto Sync', val: 'Realtime' },
          { label: 'Push Support', val: 'Included' },
          { label: 'Platforms', val: 'iOS & Android' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-white font-bold text-lg mb-1">{stat.val}</div>
            <div className="text-xs uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
