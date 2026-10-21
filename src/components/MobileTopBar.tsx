import React from 'react';
import { UserProfile, AppNotification } from '../types';
import { 
  Bell, 
  ArrowLeftRight, 
  Sun, 
  Moon, 
  ShieldCheck,
  Flame
} from 'lucide-react';

interface MobileTopBarProps {
  currentUser: UserProfile;
  onSwitchUser: () => void;
  onOpenProfile: (user: UserProfile) => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  currentUser,
  onSwitchUser,
  onOpenProfile,
  notifications,
  onOpenNotifications,
  theme,
  onToggleTheme
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="md:hidden sticky top-0 z-30 bg-[#070913]/95 backdrop-blur-md border-b border-purple-950/40 px-4 py-2.5 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-blue-500 to-emerald-400 p-[1.5px] flex items-center justify-center">
          <div className="w-full h-full bg-[#0C0F1C] rounded-[7px] flex items-center justify-center p-1 overflow-hidden">
            <img 
              src="/assets/brand/elolink_logo_Elo_branco_1_059c311e.png"
              alt="EloLink" 
              className="w-full h-full object-contain filter drop-shadow" 
            />
          </div>
        </div>
        <span className="text-base font-extrabold text-white">
          Elo<span className="text-purple-400">Link</span>
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSwitchUser}
          className="px-2 py-1 bg-[#11162B] rounded-lg text-[10px] font-bold text-emerald-400 border border-purple-900/30 flex items-center gap-1"
          title="Alternar entre Startup e Investidor"
        >
          <ArrowLeftRight className="w-3 h-3" />
          <span className="capitalize">{currentUser.role === 'startup' ? 'Startup' : 'VC'}</span>
        </button>

        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-blue-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
        </button>

        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 rounded-lg text-zinc-300 hover:text-white"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-purple-600 text-white text-[9px] font-black rounded-full flex items-center justify-center tabular-nums">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onOpenProfile(currentUser)}
          className="relative pl-1 focus:outline-none"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/50"
          />
        </button>
      </div>
    </header>
  );
};
