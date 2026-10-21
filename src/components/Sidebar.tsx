import React from 'react';
import { UserProfile, AppNotification } from '../types';
import { 
  Radio, 
  Flame, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Moon, 
  Sun, 
  ArrowLeftRight,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'feed' | 'match' | 'events' | 'chat';
  setActiveTab: (tab: 'feed' | 'match' | 'events' | 'chat') => void;
  currentUser: UserProfile;
  onSwitchUser: () => void;
  onOpenProfile: (user: UserProfile) => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  unreadChatCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onSwitchUser,
  onOpenProfile,
  notifications,
  onOpenNotifications,
  theme,
  onToggleTheme,
  unreadChatCount
}) => {
  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <aside className="w-64 lg:w-72 bg-[#080B16] border-r border-purple-950/40 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      
      {/* Top Branding & Main Navigation */}
      <div className="p-4 flex flex-col gap-6 overflow-y-auto">
        
        {/* Logo Lockup */}
        <div className="flex items-center justify-between px-2 pt-1">
          <button 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-emerald-400 p-[2px] shadow-lg shadow-purple-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080B16] rounded-[10px] flex items-center justify-center">
                <span className="text-emerald-400 font-black text-xl tracking-tighter">∞</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">
                  Elo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Link</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Venture Match & Network
              </p>
            </div>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-950/40 transition-colors"
            title={theme === 'dark' ? 'Alternar tema claro' : 'Alternar tema escuro'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-blue-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>
        </div>

        {/* Current Active Persona Card */}
        <div className="p-3 bg-gradient-to-br from-[#0C0F1D] to-[#11162B] border border-purple-950/40 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-2.5">
            <div 
              onClick={() => onOpenProfile(currentUser)}
              className="relative cursor-pointer group shrink-0"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-purple-500/50 group-hover:ring-emerald-400 transition-all"
              />
              {currentUser.verified && (
                <ShieldCheck className="w-4 h-4 text-emerald-400 absolute -bottom-1 -right-1 bg-[#080B16] rounded-full" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 
                  onClick={() => onOpenProfile(currentUser)}
                  className="text-xs font-bold text-white hover:text-emerald-300 transition-colors truncate cursor-pointer"
                >
                  {currentUser.name}
                </h4>
              </div>
              <p className="text-[11px] text-purple-300 font-semibold truncate">
                {currentUser.role === 'startup' ? currentUser.companyName : currentUser.fundName}
              </p>
              <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                currentUser.role === 'startup' 
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' 
                  : 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
              }`}>
                {currentUser.role === 'startup' ? '🚀 Startup em Captação' : '💼 Investidor VC Ativo'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-purple-950/40 text-[11px]">
            <button
              onClick={() => onOpenProfile(currentUser)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Ver meu perfil
            </button>
            <button
              onClick={onSwitchUser}
              className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Trocar entre Founder e Investidor para testar matches"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Alternar Modo</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          
          {/* Feed */}
          <button
            onClick={() => setActiveTab('feed')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'feed'
                ? 'bg-purple-950/40 text-emerald-400 border border-purple-800/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-purple-950/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Radio className={`w-4 h-4 ${activeTab === 'feed' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Feed de Oportunidades</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Match Radar */}
          <button
            onClick={() => setActiveTab('match')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'match'
                ? 'bg-purple-950/40 text-emerald-400 border border-purple-800/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-purple-950/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Flame className={`w-4 h-4 ${activeTab === 'match' ? 'text-purple-400 fill-current' : 'text-purple-400'}`} />
              <span>Match Radar</span>
            </div>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-purple-600/20 text-purple-300 border border-purple-500/30">
              SMART
            </span>
          </button>

          {/* Events */}
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-purple-950/40 text-emerald-400 border border-purple-800/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-purple-950/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className={`w-4 h-4 ${activeTab === 'events' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Eventos & Demo Days</span>
            </div>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-600/20 px-1.5 py-0.5 rounded">
              3
            </span>
          </button>

          {/* Messages & Audio */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-purple-950/40 text-emerald-400 border border-purple-800/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-purple-950/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className={`w-4 h-4 ${activeTab === 'chat' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Conversas & Áudio</span>
            </div>
            {unreadChatCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-black text-[10px] font-extrabold flex items-center justify-center tabular-nums">
                {unreadChatCount}
              </span>
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-400" />
              <span>Notificações</span>
            </div>
            {unreadNotifs > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold text-black bg-emerald-400 rounded-full tabular-nums">
                {unreadNotifs}
              </span>
            )}
          </button>

        </nav>


      </div>

      {/* Bottom Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-[#060A14]">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ecossistema Online</span>
          </span>
          <span className="tabular-nums font-mono text-slate-400">v2.4</span>
        </div>
      </div>

    </aside>
  );
};
