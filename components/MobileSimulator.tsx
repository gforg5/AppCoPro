
import React from 'react';
import { AppConfig, AppPlatform } from '../types';

interface MobileSimulatorProps {
  config: AppConfig;
  platform: AppPlatform;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({ config, platform }) => {
  // The 'allow' attribute delegates hardware access directly to the loaded URL.
  const featurePolicy = [
    config.features.cameraAccess ? 'camera *' : '',
    config.features.micAccess ? 'microphone *' : '',
    config.features.locationAccess ? 'geolocation *' : '',
    'accelerometer *',
    'gyroscope *',
    'magnetometer *',
    'payment *',
    'usb *'
  ].filter(Boolean).join('; ');

  return (
    <div className="flex flex-col items-center transition-all duration-700 w-full justify-center py-4">
      {/* Sleeker, Wider Mobile Frame */}
      <div className={`relative overflow-hidden bg-black border-[6px] border-[#1a1d21] rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8),0_0_20px_rgba(37,99,235,0.1)] w-full max-w-[380px] aspect-[9/18.5] shrink-0 group`}>
        
        {/* Subtle Edge Reflection */}
        <div className="absolute inset-0 border-[1px] border-white/5 rounded-[2.2rem] pointer-events-none z-10"></div>

        {/* Dynamic Content Area */}
        <div className="w-full h-full bg-slate-950 overflow-hidden">
          {config.url ? (
            <div className="w-full h-full relative">
              <iframe 
                src={config.url}
                className="w-full h-full border-none bg-white"
                title="App Native Host"
                allow={featurePolicy}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation allow-downloads"
              />
              
              {/* Overlay on Hover: App Metadata - Subtle and clean */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-50">
                <div className="w-20 h-20 bg-white/10 rounded-3xl mb-4 flex items-center justify-center border border-white/20 overflow-hidden shadow-2xl">
                  <img src={config.icon} className="w-full h-full object-cover" alt="app" />
                </div>
                <h4 className="font-bold text-white text-lg mb-1">{config.name || 'Web Preview'}</h4>
                <p className="text-[10px] text-blue-400 mb-6 font-mono tracking-widest uppercase">Native Bridge Active</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                   {config.features.locationAccess && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>}
                   {config.features.cameraAccess && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-[#0d1117] relative">
               {/* Background Pattern for Empty State */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#30363d 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               <div className="w-20 h-20 bg-[#161b22] rounded-[2rem] flex items-center justify-center mb-8 border border-[#30363d] shadow-2xl transition-transform group-hover:scale-110">
                  <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 0c.886 0 1.72.103 2.523.29m3.29 1.97l-.05.09A10.002 10.002 0 0112 21"/></svg>
               </div>
               <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Awaiting Stream</p>
               <p className="text-[9px] text-slate-600 font-medium">Enter a URL to initialize the simulator</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Clean Status Indicator */}
      <div className="mt-8 flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800 shadow-xl">
        <div className={`w-1.5 h-1.5 rounded-full ${config.url ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-700'} ${config.url ? 'animate-pulse' : ''}`}></div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {config.url ? 'Device Online' : 'Standby Mode'}
        </span>
      </div>
    </div>
  );
};
