import React from 'react';
import { UserProfile, AppNotification } from '../types';
import { 
  Radio, 
  Sparkles, 
  Compass, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Moon, 
  Sun, 
  ArrowLeftRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'feed' | 'match' | 'explore' | 'events' | 'chat';
  setActiveTab: (tab: 'feed' | 'match' | 'explore' | 'events' | 'chat') => void;
  currentUser: UserProfile;
  onSwitchUser: () => void;
  onOpenProfile: (user: UserProfile) => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  unreadChatCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
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
    <header className="sticky top-0 z-40 w-full bg-[#0A0F1D]/90 dark:bg-[#0A0F1D]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
            title="Ir para o Feed Elo Link"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-emerald-500 p-[1.5px] shadow-lg shadow-violet-950/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0D1527] rounded-[10px] flex items-center justify-center">
                <span className="text-emerald-400 font-extrabold text-lg tracking-tight">∞</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white whitespace-nowrap">
                Elo <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-emerald-400">Link</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'feed'
                ? 'bg-violet-600/20 text-emerald-400 border border-violet-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Feed ao Vivo</span>
          </button>

          <button
            onClick={() => setActiveTab('match')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all relative ${
              activeTab === 'match'
                ? 'bg-violet-600/20 text-emerald-400 border border-violet-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Match Bidirecional</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Smart
            </span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'explore'
                ? 'bg-violet-600/20 text-emerald-400 border border-violet-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explorar & Filtros</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'events'
                ? 'bg-violet-600/20 text-emerald-400 border border-violet-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Eventos</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all relative ${
              activeTab === 'chat'
                ? 'bg-violet-600/20 text-emerald-400 border border-violet-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Mensagens</span>
            {unreadChatCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & controls cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Persona Switcher */}
          <button
            onClick={onSwitchUser}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
            title="Alternar entre visão de Startup Founder e Investidor VC"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden sm:inline">Modo:</span>
            <span className="font-semibold text-emerald-400 capitalize">
              {currentUser.role === 'startup' ? 'Startup' : 'Investidor'}
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-purple-950/40 transition-colors"
            title={theme === 'dark' ? 'Alternar tema claro' : 'Alternar tema escuro'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-blue-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Notificações push & atividade"
            aria-label="Ver notificações"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-black bg-emerald-400 rounded-full tabular-nums">
                {unreadNotifs}
              </span>
            )}
          </button>

          {/* Current User Avatar with Profile trigger */}
          <button
            onClick={() => onOpenProfile(currentUser)}
            className="flex items-center gap-2 pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg group"
            title="Ver meu perfil detalhado"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/50 group-hover:ring-emerald-400 transition-all"
              />
              {currentUser.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 absolute -bottom-1 -right-1 bg-[#0A0F1D] rounded-full" />
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight truncate max-w-[110px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-400 leading-tight">
                {currentUser.role === 'startup' ? currentUser.companyName : currentUser.fundName}
              </span>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};
