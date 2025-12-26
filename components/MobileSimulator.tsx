
import React from 'react';
import { AppConfig, AppPlatform } from '../types';

interface MobileSimulatorProps {
  config: AppConfig;
  platform: AppPlatform;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({ config, platform }) => {
  const isAndroid = platform === AppPlatform.ANDROID;
  
  // The 'allow' attribute delegates hardware access directly to the loaded URL.
  // This means the website inside the iframe will prompt for its own permissions.
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
    <div className="flex flex-col items-center transition-all duration-700 w-full h-full justify-center">
      <div className={`relative ${isAndroid ? 'rounded-[2.5rem]' : 'rounded-[3.5rem]'} overflow-hidden bg-black border-[12px] border-[#1a1d21] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] w-[280px] h-[580px] sm:w-[320px] sm:h-[650px] shrink-0`}>
        
        {/* Absolute Full Screen Container */}
        <div className="w-full h-full bg-white">
          {config.url ? (
            <div className="w-full h-full relative group">
              <iframe 
                src={config.url}
                className="w-full h-full border-none bg-white"
                title="App Native Host"
                allow={featurePolicy}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation allow-downloads"
              />
              
              {/* Overlay on Hover: App Metadata */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 flex flex-col items-center justify-center p-8 text-center z-50">
                <div className="w-16 h-16 bg-white/10 rounded-2xl mb-4 flex items-center justify-center border border-white/20 overflow-hidden">
                  <img src={config.icon} className="w-full h-full object-cover" alt="app" />
                </div>
                <h4 className="font-bold text-white text-base mb-1">{config.name || 'Web Preview'}</h4>
                <p className="text-[9px] text-slate-400 mb-4 px-2 uppercase tracking-tighter">Running in Native Wrapper</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {config.features.cameraAccess && <span className="bg-white/5 px-1.5 py-0.5 rounded text-[7px] text-slate-300 border border-white/10">CAMERA_ENABLED</span>}
                  {config.features.micAccess && <span className="bg-white/5 px-1.5 py-0.5 rounded text-[7px] text-slate-300 border border-white/10">MIC_ENABLED</span>}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#0d1117]">
               <div className="w-16 h-16 bg-[#161b22] rounded-2xl flex items-center justify-center mb-6 border border-[#30363d] shadow-inner group">
                  <svg className="w-8 h-8 text-[#30363d] group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
               </div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Viewport Ready</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${config.url ? 'bg-green-500' : 'bg-slate-700'} animate-pulse`}></div>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
          {config.url ? 'Live Bridge Connected' : 'Waiting for Target'}
        </span>
      </div>
    </div>
  );
};
