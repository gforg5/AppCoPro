
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
  const [displayUrl, setDisplayUrl] = useState(''); // Separate state for the input field
  const [isBuilding, setIsBuilding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  const logEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync URL from hash on mount
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

  // Real-time Preview: Only update the config URL if it looks like a real URL
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
    }, 500); // Debounce preview updates for better performance
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
    setLogs(['[SYSTEM] Initializing remote build node (Region: Global-AWS-Core)...']);

    const buildSteps = [
      { msg: '[SDK] Fetching WebView dependencies (v2.5.4)...', delay: 700, progress: 15 },
      { msg: '[ASSETS] Compressing icon resources...', delay: 900, progress: 30 },
      { msg: '[CONFIG] Generating AndroidManifest.xml and Info.plist...', delay: 600, progress: 45 },
      { msg: `[NATIVE] Compiling ${config.platform.toUpperCase()} binary tree...`, delay: 1100, progress: 65 },
      { msg: '[SECURITY] Injecting SSL pinning and ProGuard rules...', delay: 1300, progress: 85 },
      { msg: '[FINALIZING] Generating installable package links...', delay: 800, progress: 100 },
      { msg: '[SUCCESS] Production binary ready for distribution.', delay: 400, progress: 100 },
    ];

    for (const step of buildSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setLogs(prev => [...prev, step.msg]);
      setBuildProgress(step.progress);
    }

    setIsCompleted(true);
    setIsBuilding(false);
  };

  const handleDownload = (ext: string) => {
    // Generate a robust project manifest as a downloadable "App Project"
    const manifest = {
      project_meta: {
        app_name: config.name,
        target_url: config.url,
        bundle_id: `com.appcopro.${config.name.replace(/\s+/g, '').toLowerCase()}`,
        version: "1.0.0",
        platform: config.platform,
        build_engine: "AppCoPro Native v2.5"
      },
      ui_config: {
        primary_color: config.primaryColor,
        orientation: config.orientation,
        nav_style: config.navStyle
      },
      permissions: config.features,
      assets: {
        icon_base64: config.icon.length > 1000 ? "BINARY_DATA_ENCLOSED" : config.icon
      },
      instructions: [
        "1. Extract this package.",
        "2. Upload to AppCoPro CLI or Android Studio.",
        "3. Build Signed APK using the provided Keystore.",
        "4. Your application will automatically point to " + config.url
      ]
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(manifest, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${config.name.replace(/\s+/g, '_').toLowerCase()}_native_build.${ext}`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Configuration Panel */}
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-black mb-2 text-white tracking-tight">Project Configurator</h2>
            <p className="text-slate-500 text-sm font-medium">Instantly convert your website into a high-performance native app.</p>
          </div>

          <section className="glass p-8 rounded-[2.5rem] border-slate-800/50 shadow-2xl space-y-8">
            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Target Web URL (Real-time)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={displayUrl}
                    onChange={e => setDisplayUrl(e.target.value)}
                    placeholder="example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 outline-none text-white transition-all shadow-inner font-medium pr-16"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className={`w-2 h-2 rounded-full ${config.url ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Application Name</label>
                  <input 
                    type="text" 
                    value={config.name}
                    onChange={e => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Application"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 outline-none text-white shadow-inner font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Brand Hex Color</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-14 h-14 rounded-2xl bg-transparent border-none cursor-pointer p-0 overflow-hidden shadow-lg"
                    />
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
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Application Launcher Icon</label>
              <div className="flex items-center gap-6 bg-slate-950/40 p-6 rounded-[2.5rem] border border-slate-800/50">
                <div className="relative">
                  <img src={config.icon} className="w-24 h-24 rounded-[2.5rem] object-cover shadow-2xl border border-slate-700 bg-slate-800" alt="icon" />
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
                <div className="flex-1">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full mb-2 bg-slate-900/50">Select New Icon</Button>
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.1em] text-center">Optimized for iOS/Android Store Specs</p>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            {!isCompleted ? (
              <Button 
                className="w-full py-6 text-lg rounded-2xl shadow-2xl shadow-blue-600/20 active:scale-[0.98] transition-all" 
                size="lg" 
                onClick={simulateBuild}
                isLoading={isBuilding}
                disabled={!config.url || !config.name}
              >
                Compile Native Package
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-500/30 text-xs py-5"
                  size="lg"
                  onClick={() => handleDownload('apk')}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414C17.054 15.3414 16.674 15.7214 16.674 16.1904C16.674 16.6594 17.054 17.0394 17.523 17.0394C17.992 17.0394 18.372 16.6594 18.372 16.1904C18.372 15.7214 17.992 15.3414 17.523 15.3414ZM12.001 20.4354C11.532 20.4354 11.152 20.8154 11.152 21.2844C11.152 21.7534 11.532 22.1334 12.001 22.1334C12.47 22.1334 12.85 21.7534 12.85 21.2844C12.85 20.8154 12.47 20.4354 12.001 20.4354ZM6.479 15.3414C6.01 15.3414 5.63 15.7214 5.63 16.1904C5.63 16.6594 6.01 17.0394 6.479 17.0394C6.948 17.0394 7.328 16.6594 7.328 16.1904C7.328 15.7214 6.948 15.3414 6.479 15.3414Z"/></svg>
                  Download APK
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 text-xs py-5"
                  size="lg"
                  onClick={() => handleDownload('ipa')}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.07 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>
                  Download IPA
                </Button>
                <Button 
                  variant="outline" 
                  className="col-span-2 border-slate-800 text-[10px] uppercase font-black tracking-widest py-4"
                  onClick={() => setIsCompleted(false)}
                >
                  Create Another Project
                </Button>
              </div>
            )}
            
            {(isBuilding || logs.length > 0) && (
              <div className="space-y-4">
                {isBuilding && (
                  <div className="h-2 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
                      style={{ width: `${buildProgress}%` }}
                    ></div>
                  </div>
                )}
                <div className="bg-black/95 rounded-[2.5rem] p-8 font-mono text-[11px] border border-slate-800 max-h-56 overflow-y-auto custom-scrollbar shadow-2xl">
                  {logs.map((log, i) => (
                    <div key={i} className={`mb-2 ${log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('[SDK]') || log.includes('[NATIVE]') || log.includes('[SECURITY]') ? 'text-blue-400' : 'text-slate-500'}`}>
                      <span className="opacity-10 mr-3">{(i+1).toString().padStart(2, '0')}</span>
                      {log}
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel - Fixed "Wide" Mobile View */}
        <div className="lg:sticky lg:top-24 flex flex-col items-center gap-10 order-first lg:order-last">
          <div className="w-full max-w-[440px]">
            <div className="bg-slate-900/60 p-1.5 rounded-[2rem] border border-slate-800/80 flex gap-1 shadow-2xl backdrop-blur-md">
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.ANDROID }))}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${config.platform === AppPlatform.ANDROID ? 'bg-blue-600 text-white shadow-xl scale-[1.02]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Android Preview
              </button>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, platform: AppPlatform.IOS }))}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${config.platform === AppPlatform.IOS ? 'bg-blue-600 text-white shadow-xl scale-[1.02]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                iOS Preview
              </button>
            </div>
          </div>
          
          <MobileSimulator config={config} platform={config.platform} />
        </div>
      </div>
    </div>
  );
};
