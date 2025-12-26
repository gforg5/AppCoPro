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
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Configuration Panel */}
        <div className="space-y-8">
          <section className="glass p-8 rounded-[2rem] border-slate-800 shadow-2xl">
            <h2 className="text-2xl font-black mb-6 text-white">App Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Website URL</label>
                <input 
                  type="url" 
                  value={config.url}
                  onChange={e => setConfig(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">App Name</label>
                  <input 
                    type="text" 
                    value={config.name}
                    onChange={e => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Application"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Primary Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer p-0 overflow-hidden"
                    />
                    <input 
                      type="text" 
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass p-8 rounded-[2rem] border-slate-800">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Application Icon
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950/30 p-6 rounded-2xl border border-slate-800/50">
              <div className="shrink-0">
                <img 
                  src={config.icon} 
                  alt="App Icon" 
                  className="w-24 h-24 rounded-2xl object-cover shadow-2xl border border-slate-700 bg-slate-800"
                />
              </div>
              <div className="flex-1 w-full">
                <p className="text-sm text-slate-400 mb-4 font-medium">Upload a custom icon from your computer.</p>
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
                  className="w-full border-slate-800 bg-slate-900/50"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  Select Icon File
                </Button>
              </div>
            </div>
          </section>

          <Button 
            className="w-full py-6 text-lg" 
            size="lg" 
            onClick={startBuild}
            isLoading={isBuilding}
            disabled={!config.url || !config.name}
          >
            {isCompleted ? 'Recompile Build' : 'Compile Native Package'}
          </Button>

          {logs.length > 0 && (
            <div className="bg-black/90 rounded-2xl p-6 font-mono text-[11px] border border-slate-800 max-h-48 overflow-y-auto custom-scrollbar shadow-inner">
              {logs.map((log, i) => (
                <div key={i} className={`mb-1 ${log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('[LINK]') ? 'text-blue-400' : 'text-slate-500'}`}>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="sticky top-24">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 flex gap-1 shadow-2xl">
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.ANDROID }))}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${config.platform === AppPlatform.ANDROID ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Android
              </button>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.IOS }))}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${config.platform === AppPlatform.IOS ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
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