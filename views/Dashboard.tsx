
import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const projects = [
    { id: '1', name: 'AppCoPro Main', url: 'https://appcopro.io', status: 'Active', platforms: ['iOS', 'Android'], downloads: 1250, icon: 'https://picsum.photos/seed/dash1/100/100' },
    { id: '2', name: 'Personal Blog', url: 'https://mysite.com', status: 'Building', platforms: ['Android'], downloads: 0, icon: 'https://picsum.photos/seed/dash2/100/100' }
  ];

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Applications</h1>
          <p className="text-slate-400">Manage your projects, view analytics, and send push notifications.</p>
        </div>
        <Link to="/builder">
          <Button size="lg">Create New App</Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Project List */}
        <div className="lg:col-span-8 space-y-6">
          {projects.map(project => (
            <div key={project.id} className="glass p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 group hover:border-indigo-500/50 transition-all">
              <img src={project.icon} alt={project.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" />
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${project.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-4">{project.url}</p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="flex -space-x-2">
                    {project.platforms.map(p => (
                      <div key={p} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">
                        {p === 'iOS' ? '🍎' : '🤖'}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{project.downloads.toLocaleString()} Downloads</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Analytics</Button>
                <Button variant="primary" size="sm">Manage</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-6 rounded-3xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
              Global Performance
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Total Installs', value: '45.2k', change: '+12%' },
                { label: 'Push Engagement', value: '28%', change: '+5%' },
                { label: 'Active Devices', value: '3,842', change: '-2%' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-end">
                   <div>
                     <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{stat.label}</div>
                     <div className="text-2xl font-bold">{stat.value}</div>
                   </div>
                   <div className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-rose-400'}`}>
                     {stat.change}
                   </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800">
               <Button variant="outline" className="w-full">Export Detailed Report</Button>
            </div>
          </div>

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl">
             <h4 className="font-bold text-indigo-400 mb-2">Need a Boost?</h4>
             <p className="text-xs text-indigo-300/60 leading-relaxed mb-4">Upgrade to Enterprise to get multi-app management and 24/7 technical support.</p>
             <Link to="/pricing">
               <span className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer">View pricing plans →</span>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
