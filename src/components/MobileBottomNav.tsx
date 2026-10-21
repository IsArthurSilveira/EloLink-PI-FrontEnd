import React from 'react';
import { Radio, Calendar, MessageSquare, Flame, Settings } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'feed' | 'match' | 'events' | 'chat' | 'settings';
  setActiveTab: (tab: 'feed' | 'match' | 'events' | 'chat' | 'settings') => void;
  unreadChatCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  unreadChatCount
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070913]/95 backdrop-blur-lg border-t border-purple-950/40 px-2 py-2 flex items-center justify-around">
      <button
        onClick={() => setActiveTab('feed')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
          activeTab === 'feed' ? 'text-purple-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Radio className="w-5 h-5" />
        <span>Feed</span>
      </button>

      <button
        onClick={() => setActiveTab('match')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
          activeTab === 'match' ? 'text-purple-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Flame className={`w-5 h-5 ${activeTab === 'match' ? 'fill-current text-purple-400' : ''}`} />
        <span>Radar</span>
      </button>

      <button
        onClick={() => setActiveTab('events')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
          activeTab === 'events' ? 'text-blue-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span>Eventos</span>
      </button>

      <button
        onClick={() => setActiveTab('chat')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors relative ${
          activeTab === 'chat' ? 'text-emerald-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat</span>
        {unreadChatCount > 0 && (
          <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1 right-2" />
        )}
      </button>

      <button
        onClick={() => setActiveTab('settings')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
          activeTab === 'settings' ? 'text-purple-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Settings className="w-5 h-5" />
        <span>Ajustes</span>
      </button>
    </div>
  );
};
