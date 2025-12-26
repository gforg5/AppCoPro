
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { MobileSimulator } from '../components/MobileSimulator';
import { AppConfig, AppPlatform, NavStyle, Orientation } from '../types';

const INITIAL_CONFIG: AppConfig = {
  url: '',
  name: '',
  description: 'Native WebView Application',
  icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png',
  splashScreen: '',
  primaryColor: '#2563eb',
  secondaryColor: '#3b82f6',
  accentColor: '#60a5fa',
  navStyle: NavStyle.BOTTOM_NAV,
  platform: AppPlatform.ANDROID,
  orientation: Orientation.PORTRAIT,
  userAgent: 'Mozilla/5.0 (Linux; Android 13; AppCoPro Engine) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  features: {
    pushNotifications: true,
    offlineMode: true,
    admob: false,
    socialSharing: true,
    cameraAccess: true,
    micAccess: true,
    locationAccess: true
  }
};

export const Builder: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [isBuilding, setIsBuilding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const logEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    const u = params.get('u');
    const n = params.get('n');
    const c = params.get('c');

    if (u || n || c) {
      setConfig(prev => ({
        ...prev,
        url: u ? decodeURIComponent(u) : prev.url,
        name: n ? decodeURIComponent(n) : prev.name,
        primaryColor: c ? `#${c}` : prev.primaryColor
      }));
    }
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig(prev => ({ ...prev, icon: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startBuild = () => {
    if (!config.url || !config.name) return;
    setIsBuilding(true);
    setIsCompleted(false);
    setLogs(['[SYSTEM] Initializing build node...', '[SDK] Validating assets...', '[NATIVE] Compiling WebView bridge...']);
    
    setTimeout(() => {
      setLogs(prev => [...prev, '[ASSETS] Bundling app icon...', '[UI] Applying theme colors...']);
      setTimeout(() => {
        setLogs(prev => [...prev, '[SUCCESS] Native build finished.', '[LINK] HTTPS://BUILDS.APPCOPRO.IO/PACKAGE.APK']);
        setIsCompleted(true);
        setIsBuilding(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Configuration Panel */}
        <div className="space-y-10 order-1">
          <div>
            <h2 className="text-3xl font-black mb-2 text-white tracking-tight">App Designer</h2>
            <p className="text-slate-500 text-sm font-medium">Configure your native wrapper parameters below.</p>
          </div>

          <section className="glass p-8 rounded-[2.5rem] border-slate-800/50 shadow-2xl space-y-8">
            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Source Website</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                  </div>
                  <input 
                    type="url" 
                    value={config.url}
                    onChange={e => setConfig(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-11 pr-4 py-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">App Name</label>
                  <input 
                    type="text" 
                    value={config.name}
                    onChange={e => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Application"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Branding Color</label>
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <input 
                        type="color" 
                        value={config.primaryColor}
                        onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-14 h-14 rounded-2xl bg-transparent border-none cursor-pointer p-0 overflow-hidden"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-4 text-xs font-mono uppercase text-white shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/50">
              <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-white/90">
                <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                Visual Identity
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center gap-8 bg-slate-950/40 p-6 rounded-[2rem] border border-slate-800/50">
                <div className="shrink-0 group">
                  <div className="relative">
                    <img 
                      src={config.icon} 
                      alt="App Icon" 
                      className="w-28 h-28 rounded-3xl object-cover shadow-2xl border border-slate-700 bg-slate-800 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>
                <div className="flex-1 w-full text-center sm:text-left">
                  <p className="text-xs text-slate-400 mb-5 font-medium leading-relaxed">High-resolution icons (1024x1024) recommended for the best native experience.</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button 
                    size="md" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto border-slate-800 bg-slate-900/80 hover:bg-slate-800 px-8"
                  >
                    Upload Favicon
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-4">
            <Button 
              className="w-full py-6 text-lg rounded-2xl shadow-2xl shadow-blue-600/20" 
              size="lg" 
              onClick={startBuild}
              isLoading={isBuilding}
              disabled={!config.url || !config.name}
            >
              {isCompleted ? 'Finalize Project' : 'Initiate Native Compilation'}
            </Button>
            
            {logs.length > 0 && (
              <div className="bg-black/90 rounded-[2rem] p-8 font-mono text-[11px] border border-slate-800 max-h-56 overflow-y-auto custom-scrollbar shadow-2xl">
                {logs.map((log, i) => (
                  <div key={i} className={`mb-2 ${log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('[LINK]') ? 'text-blue-400 underline underline-offset-4' : 'text-slate-500'}`}>
                    <span className="opacity-30 mr-2">{(i+1).toString().padStart(2, '0')}</span>
                    {log}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel - Better Mobile View (Order 2) */}
        <div className="order-2 lg:sticky lg:top-24 flex flex-col items-center">
          <div className="w-full max-w-[380px] mb-8">
            <div className="bg-slate-900/60 p-1.5 rounded-[1.5rem] border border-slate-800/80 flex gap-1 shadow-2xl">
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.ANDROID }))}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${config.platform === AppPlatform.ANDROID ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Android
              </button>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.IOS }))}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${config.platform === AppPlatform.IOS ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                iOS
              </button>
            </div>
          </div>
          
          <MobileSimulator config={config} platform={config.platform} />
        </div>
      </div>
    </div>
  );
};
