import React, { useState } from 'react';
import { UserProfile, AppNotification } from '../types';
import { 
  Home, 
  MessageSquare, 
  Flame, 
  Bell, 
  Calendar, 
  Search, 
  Moon, 
  Sun, 
  LogOut,
  ChevronDown, 
  User, 
  Settings
} from 'lucide-react';

interface TopNavbarProps {
  activeTab: 'feed' | 'match' | 'events' | 'chat' | 'settings';
  setActiveTab: (tab: 'feed' | 'match' | 'events' | 'chat' | 'settings') => void;
  currentUser: UserProfile;
  onSwitchUser: () => void;
  onLogout: () => void;
  onOpenProfile: (user: UserProfile) => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  unreadChatCount: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onSwitchUser,
  onLogout,
  onOpenProfile,
  notifications,
  onOpenNotifications,
  theme,
  onToggleTheme,
  unreadChatCount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070913]/95 backdrop-blur-md border-b border-purple-900/30 transition-colors">
      <div className="max-w-[1600px] mx-auto px-2.5 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Section: Logo & Search Bar */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Logo Mark */}
          <button
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 group focus:outline-none"
            title="Elo Link - Início"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-500 to-emerald-400 p-[1.5px] shadow-lg shadow-purple-950/40 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#0C0F1C] rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                <img 
                  src="/assets/brand/elolink_logo_Elo_branco_1_059c311e.png"
                  alt="EloLink" 
                  className="w-full h-full object-contain filter drop-shadow" 
                />
              </div>
            </div>
            <span className="text-lg font-black tracking-tight text-white hidden sm:inline">
              Elo<span className="text-purple-400">Link</span>
            </span>
          </button>

          {/* Minimal Search Bar (#Buscar...) */}
          <div className="relative hidden sm:block w-44 md:w-64 lg:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 font-bold text-xs">
              #
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar startups, investidores, teses..."
              className="w-full pl-7 pr-3 py-2 bg-[#0E1220] hover:bg-[#13182C] focus:bg-[#13182C] text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-800 focus:border-purple-500/70 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Center Section: Clean Icon Navigation with Active Purple Indicator */}
        <nav className="hidden md:flex items-center gap-0.5 sm:gap-2">
          {/* Feed / Home */}
          <button
            onClick={() => setActiveTab('feed')}
            className={`p-2 sm:p-2.5 rounded-xl transition-all ${
              activeTab === 'feed'
                ? 'text-purple-400 bg-purple-500/15 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
            title="Feed de Oportunidades & Pitches"
          >
            <Home className="w-5 h-5" />
          </button>

          {/* Messages / Chat */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`relative p-2 sm:p-2.5 rounded-xl transition-all ${
              activeTab === 'chat'
                ? 'text-purple-400 bg-purple-500/15 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
            title="Conversas Diretas & Áudios"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadChatCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-black text-black bg-emerald-400 rounded-full tabular-nums">
                {unreadChatCount}
              </span>
            )}
          </button>

          {/* Match Radar (Swipe Mode) */}
          <button
            onClick={() => setActiveTab('match')}
            className={`p-2 sm:p-2.5 rounded-xl transition-all ${
              activeTab === 'match'
                ? 'text-purple-400 bg-purple-500/15 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
            title="Radar de Afinidade (Modo Swipe)"
          >
            <Flame className="w-5 h-5" />
          </button>

          {/* Events / Demo Days (Moved to place where Notifications was) */}
          <button
            onClick={() => setActiveTab('events')}
            className={`p-2 sm:p-2.5 rounded-xl transition-all ${
              activeTab === 'events'
                ? 'text-purple-400 bg-purple-500/15 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
            title="Eventos & Demo Days"
          >
            <Calendar className="w-5 h-5" />
          </button>

          {/* Settings / Configurações (New Page) */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 sm:p-2.5 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'text-purple-400 bg-purple-500/15 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
            title="Configurações da Plataforma"
          >
            <Settings className="w-5 h-5" />
          </button>
        </nav>

        {/* Right Section: Theme Toggle + Notification Button + User Profile */}
        <div className="flex items-center gap-2 relative">

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors hidden sm:block"
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-blue-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {/* Notification Button (Beside Profile) */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-xl text-zinc-300 hover:text-white bg-[#0E1220] hover:bg-[#151B30] border border-purple-900/30 transition-all group"
            title="Notificações & Alertas em Tempo Real"
          >
            <Bell className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[9px] font-black text-black bg-emerald-400 rounded-full tabular-nums shadow-md">
                {unreadNotifs}
              </span>
            )}
          </button>

          {/* User Profile Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-[#0E1220] hover:bg-[#151B30] border border-purple-900/30 text-left transition-all group"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-purple-500/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#0E1220]" />
              </div>
              <span className="text-xs font-bold text-zinc-200 group-hover:text-white max-w-[100px] truncate hidden md:inline">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-56 bg-[#0E1220] border border-purple-900/40 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <div className="p-2.5 border-b border-zinc-800/80 mb-1">
                  <div className="font-bold text-white truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-purple-400 font-semibold">
                    {currentUser.role === 'startup' ? currentUser.companyName : currentUser.fundName}
                  </div>
                  <div className="text-[10px] text-zinc-400 truncate mt-0.5">{currentUser.headline}</div>
                </div>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onOpenProfile(currentUser);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-purple-600/20 transition-colors"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  <span>Ver Meu Perfil Completo</span>
                </button>

                <div className="pt-1 mt-1 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onToggleTheme();
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/70 transition-colors"
                  >
                    <span>Modo Escuro</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Ativo</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
