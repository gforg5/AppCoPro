
import React, { useState, useEffect } from 'react';
import { AppConfig, AppPlatform } from '../types';

interface MobileSimulatorProps {
  config: AppConfig;
  platform: AppPlatform;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({ config, platform }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0); // Used to force iframe refresh

  useEffect(() => {
    if (config.url) {
      setIsLoading(true);
      setKey(prev => prev + 1);
    }
  }, [config.url]);

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
    <div className="flex flex-col items-center transition-all duration-700 w-full justify-center">
      {/* Sleeker, Wider Infinity Display Frame */}
      <div className={`relative overflow-hidden bg-black border-[8px] border-[#1a1d21] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8),0_0_60px_rgba(37,99,235,0.1)] w-full max-w-[440px] aspect-[10/18] shrink-0 group`}>
        
        {/* Subtle Inner Bezel Glow */}
        <div className="absolute inset-0 border-[1px] border-white/10 rounded-[3.1rem] pointer-events-none z-10"></div>

        {/* The "Screen" */}
        <div className="w-full h-full bg-[#050505] overflow-hidden relative">
          {config.url ? (
            <div className="w-full h-full relative">
              {isLoading && (
                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-20">
                  <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest animate-pulse">Initializing Engine...</p>
                </div>
              )}
              
              <iframe 
                key={key}
                src={config.url}
                className="w-full h-full border-none bg-white"
                title="App Native Host"
                allow={featurePolicy}
                onLoad={() => setIsLoading(false)}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation allow-downloads"
              />
              
              {/* Overlay: Interactive Hints */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 bg-slate-950/20 backdrop-blur-[1px] flex flex-col items-center justify-center z-30">
                <div className="bg-black/80 px-6 py-3 rounded-2xl border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                   <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Real-time Native Bridge</p>
                </div>
              </div>

              {/* Security Header Mocking Fallback (Visual Only) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none text-[8px] text-white/50 text-center w-full px-12">
                If the site is blank, it may be preventing mobile previews via security headers.
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-[#0d1117]">
               <div className="w-24 h-24 bg-gradient-to-br from-[#161b22] to-[#0d1117] rounded-[2.5rem] flex items-center justify-center mb-8 border border-[#30363d] shadow-2xl transition-transform group-hover:scale-110 duration-500">
                  <svg className="w-12 h-12 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 0c.886 0 1.72.103 2.523.29m3.29 1.97l-.05.09A10.002 10.002 0 0112 21"/>
                  </svg>
               </div>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2">Simulator Off</p>
               <p className="text-[9px] text-slate-700 max-w-[180px]">Paste a URL to boot the high-performance native container.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
