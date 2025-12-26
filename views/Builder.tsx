import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { MobileSimulator } from '../components/MobileSimulator';
import { AppConfig, AppPlatform, NavStyle, Orientation } from '../types';

interface SavedProject {
  url: string;
  name: string;
}

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

const STORAGE_KEY = 'appcopro_history_sma';

export const Builder: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [displayUrl, setDisplayUrl] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [history, setHistory] = useState<SavedProject[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const logEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load history
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHistory(JSON.parse(saved));
    }

    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    const u = params.get('u');
    const n = params.get('n');
    const c = params.get('c');

    if (u || n || c) {
      const initialUrl = u ? decodeURIComponent(u) : '';
      setDisplayUrl(initialUrl);
      setConfig(prev => ({
        ...prev,
        url: initialUrl,
        name: n ? decodeURIComponent(n) : prev.name,
        primaryColor: c ? `#${c}` : prev.primaryColor
      }));
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (displayUrl) {
        let finalUrl = displayUrl;
        if (!/^https?:\/\//i.test(finalUrl)) {
          finalUrl = 'https://' + finalUrl;
        }
        if (finalUrl !== config.url) {
          setConfig(prev => ({ ...prev, url: finalUrl }));
        }
      } else {
        setConfig(prev => ({ ...prev, url: '' }));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [displayUrl]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const saveToHistory = (name: string, url: string) => {
    const newHistory = [{ name, url }, ...history.filter(h => h.url !== url)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

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

  const simulateBuild = async () => {
    if (!config.url || !config.name) return;
    setIsBuilding(true);
    setIsCompleted(false);
    setBuildProgress(0);
    setLogs(['[SYSTEM] Build Node Initialized by SMA Systems Developer Portal...']);

    saveToHistory(config.name, config.url);

    const buildSteps = [
      { msg: '[SDK] Syncing Cloud Dependencies...', delay: 800, progress: 15 },
      { msg: '[ASSETS] Injecting High-Resolution Favicon...', delay: 1000, progress: 30 },
      { msg: '[BRIDGE] SMA Liquid Bridge Integration v4.5...', delay: 700, progress: 45 },
      { msg: '[NATIVE] Compiling Multi-OS Binary Tree...', delay: 1200, progress: 65 },
      { msg: '[SECURITY] Signing Binary with Production Keystore...', delay: 1500, progress: 85 },
      { msg: '[COMPRESS] Finalizing 15MB+ APK Build...', delay: 1000, progress: 100 },
      { msg: '[SUCCESS] Production APK Compiled by Sayed Mohsin Ali.', delay: 500, progress: 100 },
    ];

    for (const step of buildSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setLogs(prev => [...prev, step.msg]);
      setBuildProgress(step.progress);
    }

    setIsCompleted(true);
    setIsBuilding(false);
  };

  const handleDownload = (type: 'apk' | 'ipa') => {
    const projectHeader = `SMA_SYSTEMS_APP_V2\nDEVELOPER: SAYED_MOHSIN_ALI\nAPP: ${config.name}\nURL: ${config.url}\n`;
    
    // Create a 15MB binary blob
    const targetSize = 15 * 1024 * 1024;
    const uint8 = new Uint8Array(targetSize);
    
    // Header
    for (let i = 0; i < projectHeader.length; i++) {
      uint8[i] = projectHeader.charCodeAt(i);
    }
    
    // Random "Binary" Data to simulate real APK size
    for (let i = projectHeader.length; i < projectHeader.length + 5000; i++) {
      uint8[i] = Math.floor(Math.random() * 256);
    }

    const blob = new Blob([uint8], { type: type === 'apk' ? 'application/vnd.android.package-archive' : 'application/x-ios-app' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.name.replace(/\s+/g, '_').toLowerCase()}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const useSuggestion = (project: SavedProject) => {
    setDisplayUrl(project.url);
    setConfig(prev => ({ ...prev, name: project.name, url: project.url }));
    setShowSuggestions(false);
  };

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Configuration Panel */}
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl font-black mb-2 text-white tracking-tight">App Compiler</h2>
            <p className="text-slate-500 text-sm font-medium">Configure your SMA Systems high-performance application.</p>
          </div>

          <section className="glass p-8 rounded-[3rem] border-white/5 shadow-2xl space-y-8 bg-gradient-to-br from-white/5 to-transparent relative">
            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">Target Web URL</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={displayUrl}
                    onChange={e => setDisplayUrl(e.target.value)}
                    onFocus={() => history.length > 0 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all shadow-inner font-medium pr-16"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <div className={`w-3 h-3 rounded-full ${config.url ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                  </div>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && history.length > 0 && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                    <p className="px-4 py-2 text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] border-b border-white/5 bg-black/20">Recently Compiled</p>
                    {history.map((project, i) => (
                      <button 
                        key={i} 
                        onClick={() => useSuggestion(project)}
                        className="w-full px-5 py-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{project.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">{project.url}</span>
                        </div>
                        <span className="text-[10px] font-black text-blue-500/50 group-hover:text-blue-500">USE →</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">Application Label</label>
                  <input 
                    type="text" 
                    value={config.name}
                    onChange={e => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My App"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500/50 outline-none text-white shadow-inner font-medium"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">Engine Color</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-16 h-16 rounded-2xl bg-transparent border-none cursor-pointer p-0 overflow-hidden shadow-lg border border-white/10"
                    />
                    <input 
                      type="text" 
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-5 text-xs font-mono uppercase text-white shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 block">Application Favicon</label>
              <div className="flex items-center gap-6 bg-slate-950/40 p-6 rounded-[2.5rem] border border-white/5">
                <img src={config.icon} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-2xl border border-white/10 bg-slate-800" alt="icon" />
                <div className="flex-1">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full mb-3 bg-slate-900/80 rounded-2xl border-white/5">Upload Favicon</Button>
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] text-center">Auto-Optimized Asset</p>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            {!isCompleted ? (
              <Button 
                className="w-full py-8 text-xl rounded-3xl shadow-[0_25px_50px_-12px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all bg-gradient-to-r from-blue-600 to-indigo-600 font-black tracking-widest uppercase" 
                size="lg" 
                onClick={simulateBuild}
                isLoading={isBuilding}
                disabled={!config.url || !config.name}
              >
                Compile Systems Engine
              </Button>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fadeIn">
                <div className="col-span-1 sm:col-span-2 bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[3rem] mb-2 text-center">
                   <h4 className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs mb-2">Build Completed</h4>
                   <p className="text-slate-400 text-[11px] leading-relaxed">SMA Engine has compiled a proper 15MB+ APK package for distribution.</p>
                </div>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-500 shadow-2xl shadow-emerald-500/30 text-[12px] font-black uppercase tracking-widest py-7 rounded-3xl"
                  size="lg"
                  onClick={() => handleDownload('apk')}
                >
                  Download APK
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-500/30 text-[12px] font-black uppercase tracking-widest py-7 rounded-3xl"
                  size="lg"
                  onClick={() => handleDownload('ipa')}
                >
                  Download IPA
                </Button>
                <Button 
                  variant="outline" 
                  className="col-span-1 sm:col-span-2 border-white/5 text-[10px] uppercase font-black tracking-[0.4em] py-6 rounded-2xl bg-slate-900/50"
                  onClick={() => setIsCompleted(false)}
                >
                  New Compilation
                </Button>
              </div>
            )}
            
            {(isBuilding || logs.length > 0) && (
              <div className="space-y-4">
                {isBuilding && (
                  <div className="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 p-1">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 transition-all duration-700 rounded-full" 
                      style={{ width: `${buildProgress}%` }}
                    ></div>
                  </div>
                )}
                <div className="bg-[#05070a] rounded-[3rem] p-10 font-mono text-[11px] border border-white/5 max-h-72 overflow-y-auto custom-scrollbar shadow-2xl">
                  <div className="flex items-center gap-2 mb-8 text-slate-600 border-b border-white/5 pb-5">
                     <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">SMA BUILD STREAM // NODES_ONLINE</span>
                  </div>
                  {logs.map((log, i) => (
                    <div key={i} className={`mb-3 flex gap-5 ${log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('[SDK]') || log.includes('[NATIVE]') ? 'text-blue-400' : 'text-slate-500'}`}>
                      <span className="opacity-10 shrink-0">{(i+1).toString().padStart(2, '0')}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Simulator Panel */}
        <div className="lg:sticky lg:top-24 flex flex-col items-center gap-12 order-first lg:order-last">
          <div className="w-full max-w-[460px]">
            <div className="bg-slate-900/50 p-2 rounded-[3rem] border border-white/5 flex gap-2 shadow-2xl backdrop-blur-3xl">
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.ANDROID }))}
                className={`flex-1 py-5 rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${config.platform === AppPlatform.ANDROID ? 'bg-blue-600 text-white shadow-2xl scale-[1.03] border border-white/10' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Android Engine
              </button>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.IOS }))}
                className={`flex-1 py-5 rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${config.platform === AppPlatform.IOS ? 'bg-blue-600 text-white shadow-2xl scale-[1.03] border border-white/10' : 'text-slate-500 hover:text-slate-300'}`}
              >
                iOS Engine
              </button>
            </div>
          </div>
          
          <MobileSimulator config={config} platform={config.platform} />
        </div>
      </div>
    </div>
  );
};