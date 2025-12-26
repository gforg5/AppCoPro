import React from 'react';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-black mb-6 text-white tracking-tight">Get in Touch</h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Need technical assistance or interested in enterprise-level white labeling? Our support team is active 24/7.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                <p className="text-white font-bold">support@appcopro.io</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Global HQ</p>
                <p className="text-white font-bold">123 Innovation Drive, Tech City</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border-slate-800 shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Full Name</label>
                <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Company</label>
                <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Email Address</label>
              <input type="email" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Message</label>
              <textarea rows={4} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
            </div>
            <Button className="w-full py-4 text-xs uppercase tracking-widest font-black" size="lg">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};