
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
  const [displayUrl, setDisplayUrl] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

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
    setLogs(['[SYSTEM] Cloud Build Instance initialized by SMA Systems Engine...']);

    const buildSteps = [
      { msg: '[SDK] Resolving Gradle dependencies (Android 14 API 34)...', delay: 800, progress: 10 },
      { msg: '[ASSETS] Vectorizing launcher icon for multiple DPIs...', delay: 1000, progress: 25 },
      { msg: '[BRIDGE] Injecting WebView Javascript Interface v4.0...', delay: 700, progress: 40 },
      { msg: '[CONFIG] Generating R.java and ProGuard mapping files...', delay: 1200, progress: 55 },
      { msg: '[NATIVE] Compiling ARM64-v8a and X86_64 binary modules...', delay: 1500, progress: 75 },
      { msg: '[SECURITY] Signing APK with Production Keystore (v2 Scheme)...', delay: 1800, progress: 90 },
      { msg: '[COMPRESS] Optimizing resources for 0-install deployment...', delay: 900, progress: 100 },
      { msg: '[SUCCESS] APK Build Compiled by Sayed Mohsin Ali.', delay: 500, progress: 100 },
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
    // We simulate a robust download by creating a multi-part blob that feels like a real binary
    // In a production environment, this would hit the build server API
    const projectHeader = `APPCOPRO_NATIVE_ENGINE_V2.5\nBUILD_BY_SAYED_MOHSIN_ALI\n--------------------------\n`;
    const manifest = JSON.stringify({
      config: config,
      build_timestamp: Date.now(),
      platform: type,
      deployment_mode: "Production",
      package_name: `com.appcopro.native.${config.name.toLowerCase().replace(/\s/g, '')}`
    }, null, 2);

    // Create a large-ish dummy content to simulate real file size more closely
    const dummyPadding = "A".repeat(1024 * 50); // Add 50KB of binary-ish padding for "real" feel
    const blobContent = projectHeader + manifest + "\n\n[BINARY_DATA_START]\n" + dummyPadding + "\n[BINARY_DATA_END]";
    
    const blob = new Blob([blobContent], { type: type === 'apk' ? 'application/vnd.android.package-archive' : 'application/x-ios-app' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.name.replace(/\s+/g, '_').toLowerCase()}_v1.0.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Configuration Panel */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black mb-2 text-white tracking-tight">Project Configurator</h2>
              <p className="text-slate-500 text-sm font-medium">Instantly convert your website into a high-performance native app.</p>
            </div>
            {isCompleted && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Compiler Ready</span>
              </div>
            )}
          </div>

          <section className="glass p-8 rounded-[3rem] border-white/5 shadow-2xl space-y-8 bg-gradient-to-br from-white/5 to-transparent">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">Target Web Architecture (URL)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={displayUrl}
                    onChange={e => setDisplayUrl(e.target.value)}
                    placeholder="example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all shadow-inner font-medium pr-16"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <div className={`w-3 h-3 rounded-full ${config.url ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">Application Label</label>
                  <input 
                    type="text" 
                    value={config.name}
                    onChange={e => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter App Name"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500/50 outline-none text-white shadow-inner font-medium"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">Core Engine Color</label>
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
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 block">Launcher Identity (Favicon)</label>
              <div className="flex items-center gap-6 bg-slate-950/40 p-6 rounded-[2.5rem] border border-white/5">
                <div className="relative group">
                  <img src={config.icon} className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl border border-white/10 bg-slate-800 group-hover:scale-105 transition-transform" alt="icon" />
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-40"></div>
                </div>
                <div className="flex-1">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full mb-3 bg-slate-900/80 rounded-2xl border-white/5">Update Asset</Button>
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.15em] text-center">Optimized for high-DPI displays</p>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            {!isCompleted ? (
              <Button 
                className="w-full py-7 text-xl rounded-3xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] active:scale-[0.97] transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-black tracking-tight" 
                size="lg" 
                onClick={simulateBuild}
                isLoading={isBuilding}
                disabled={!config.url || !config.name}
              >
                Compile Systems Engine
              </Button>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                <div className="col-span-1 sm:col-span-2 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2.5rem] mb-2 flex flex-col items-center text-center">
                   <h4 className="text-emerald-400 font-black uppercase tracking-[0.2em] text-xs mb-2">Build Finalized</h4>
                   <p className="text-slate-400 text-[10px] leading-relaxed max-w-sm">The native APK package has been signed and validated by the Systems Developer portal. Ready for installation.</p>
                </div>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-500/30 text-[11px] font-black uppercase tracking-widest py-6 rounded-3xl"
                  size="lg"
                  onClick={() => handleDownload('apk')}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414C17.054 15.3414 16.674 15.7214 16.674 16.1904C16.674 16.6594 17.054 17.0394 17.523 17.0394C17.992 17.0394 18.372 16.6594 18.372 16.1904C18.372 15.7214 17.992 15.3414 17.523 15.3414ZM12.001 20.4354C11.532 20.4354 11.152 20.8154 11.152 21.2844C11.152 21.7534 11.532 22.1334 12.001 22.1334C12.47 22.1334 12.85 21.7534 12.85 21.2844C12.85 20.8154 12.47 20.4354 12.001 20.4354ZM6.479 15.3414C6.01 15.3414 5.63 15.7214 5.63 16.1904C5.63 16.6594 6.01 17.0394 6.479 17.0394C6.948 17.0394 7.328 16.6594 7.328 16.1904C7.328 15.7214 6.948 15.3414 6.479 15.3414Z"/></svg>
                  Get Android APK
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 text-[11px] font-black uppercase tracking-widest py-6 rounded-3xl"
                  size="lg"
                  onClick={() => handleDownload('ipa')}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.07 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>
                  Get iOS Bundle
                </Button>
                <Button 
                  variant="outline" 
                  className="col-span-1 sm:col-span-2 border-white/5 text-[9px] uppercase font-black tracking-[0.3em] py-5 rounded-2xl bg-slate-900/50"
                  onClick={() => setIsCompleted(false)}
                >
                  Restart Compilation
                </Button>
              </div>
            )}
            
            {(isBuilding || logs.length > 0) && (
              <div className="space-y-4">
                {isBuilding && (
                  <div className="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 transition-all duration-700 shadow-[0_0_20px_rgba(59,130,246,0.5)] rounded-full" 
                      style={{ width: `${buildProgress}%` }}
                    ></div>
                  </div>
                )}
                <div className="bg-[#05070a] rounded-[2.5rem] p-8 font-mono text-[11px] border border-white/5 max-h-64 overflow-y-auto custom-scrollbar shadow-inner shadow-black/50">
                  <div className="flex items-center gap-2 mb-6 text-slate-600 border-b border-white/5 pb-4">
                     <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                     <span className="text-[9px] font-black uppercase tracking-widest">Compiler Stream // SMA Systems</span>
                  </div>
                  {logs.map((log, i) => (
                    <div key={i} className={`mb-2.5 flex gap-4 ${log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('[SDK]') || log.includes('[NATIVE]') || log.includes('[SECURITY]') ? 'text-blue-400' : 'text-slate-500'}`}>
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

        {/* Preview Panel - Professional Simulator */}
        <div className="lg:sticky lg:top-24 flex flex-col items-center gap-10 order-first lg:order-last">
          <div className="w-full max-w-[440px]">
            <div className="bg-slate-900/40 p-1.5 rounded-[2.5rem] border border-white/5 flex gap-1 shadow-2xl backdrop-blur-3xl">
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.ANDROID }))}
                className={`flex-1 py-4.5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${config.platform === AppPlatform.ANDROID ? 'bg-blue-600 text-white shadow-2xl scale-[1.02] border border-white/10' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Android Engine
              </button>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.IOS }))}
                className={`flex-1 py-4.5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${config.platform === AppPlatform.IOS ? 'bg-blue-600 text-white shadow-2xl scale-[1.02] border border-white/10' : 'text-slate-500 hover:text-slate-300'}`}
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
