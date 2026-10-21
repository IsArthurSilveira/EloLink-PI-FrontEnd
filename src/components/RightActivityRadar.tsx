import React, { useState } from 'react';
import { UserProfile, EventItem, AppNotification } from '../types';
import { 
  Flame, 
  Heart, 
  X, 
  Star, 
  Calendar, 
  TrendingUp, 
  Check, 
  ArrowUpRight, 
  MessageSquare, 
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface RightActivityRadarProps {
  currentUser: UserProfile;
  topCandidate: UserProfile;
  events: EventItem[];
  notifications: AppNotification[];
  onNavigateToMatch: () => void;
  onOpenProfile: (user: UserProfile) => void;
  onConnectWithUser: (user: UserProfile) => void;
  onOpenChatWith: (user: UserProfile) => void;
  onToggleRsvpEvent: (eventId: string) => void;
}

export const RightActivityRadar: React.FC<RightActivityRadarProps> = ({
  currentUser,
  topCandidate,
  events,
  notifications,
  onNavigateToMatch,
  onOpenProfile,
  onConnectWithUser,
  onOpenChatWith,
  onToggleRsvpEvent
}) => {
  const [swipedCandidate, setSwipedCandidate] = useState<'match' | 'pass' | null>(null);

  const demoDay = events[0] || {
    id: 'ev-1',
    title: 'LATAM B2B AI Demo Day 2026',
    date: '28 de Outubro, 2026',
    time: '18:30 - 21:00 (BRT)',
    rsvpsCount: 184,
    isUserRegistered: true
  };

  const handleQuickSwipe = (decision: 'match' | 'pass') => {
    setSwipedCandidate(decision);
    if (decision === 'match') {
      onConnectWithUser(topCandidate);
    }
    setTimeout(() => {
      setSwipedCandidate(null);
    }, 2000);
  };

  // Recent activity items inspired by Reference Image 2
  const activities = [
    {
      id: 'act-1',
      avatar: '/src/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
      name: 'Rodrigo Mendes',
      fund: 'Nexa Horizons',
      action: 'assistiu ao seu Vídeo Pitch',
      time: 'há 3 min',
      kicker: 'Lead Seed • R$ 3.5M',
      buttonText: 'Conectar',
      actionType: 'connect'
    },
    {
      id: 'act-2',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      name: 'Beatriz Vasconcellos',
      fund: 'Angels Latam',
      action: 'deixou avaliação 5★ no seu perfil',
      time: 'há 18 min',
      kicker: 'Governança Ágil',
      buttonText: 'Ver Review',
      actionType: 'review'
    },
    {
      id: 'act-3',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      name: 'Lucas Alencar',
      fund: 'Valore Capital',
      action: 'solicitou acesso ao Data Room',
      time: 'há 1 hr',
      kicker: 'SaaS & Enterprise',
      buttonText: 'Liberar',
      actionType: 'dataroom'
    }
  ];

  const trendingTopics = [
    { tag: 'RodadaSeed', count: '1.4k posts' },
    { tag: 'AgentesDeIA', count: '920 posts' },
    { tag: 'SupplyChainTech', count: '680 posts' },
    { tag: 'UnitEconomics', count: '510 posts' }
  ];

  return (
    <aside className="w-full space-y-4">
      
      {/* 1. Radar de Afinidade (Modo Swipe Mini Widget) */}
      <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-purple-400 fill-purple-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-300">
              Radar de Afinidade
            </h4>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-black">
            98% Match
          </span>
        </div>

        {/* Candidate Mini Card */}
        {topCandidate && (
          <div className="relative rounded-2xl overflow-hidden bg-[#0E1220] border border-purple-950/50 p-3 mb-3">
            {swipedCandidate && (
              <div className={`absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm ${
                swipedCandidate === 'match' ? 'bg-emerald-950/90' : 'bg-purple-950/90'
              }`}>
                <span className={`text-base font-black uppercase tracking-widest ${
                  swipedCandidate === 'match' ? 'text-emerald-400' : 'text-purple-400'
                }`}>
                  {swipedCandidate === 'match' ? '⚡ Elo Criado!' : '✕ Recusado'}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-2.5">
              <img
                src={topCandidate.avatar}
                alt={topCandidate.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/40"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h5 className="text-xs font-bold text-white truncate">{topCandidate.name}</h5>
                  {topCandidate.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-purple-400 block truncate">
                  {topCandidate.role === 'startup' ? topCandidate.companyName : topCandidate.fundName}
                </span>
                <span className="text-[10px] text-zinc-400 block truncate">
                  {topCandidate.role === 'startup' ? `Rodada: ${topCandidate.targetRound || 'R$ 3.5M'}` : `Ticket: R$ 500k - R$ 2.5M`}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-200 leading-relaxed mb-3 bg-[#080B16] p-3 rounded-xl border border-purple-900/40 break-words">
              "{topCandidate.bio}"
            </p>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => handleQuickSwipe('pass')}
                className="flex-1 py-2 rounded-xl bg-[#11162B] hover:bg-[#18203E] hover:text-purple-300 text-zinc-400 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                title="Passar"
              >
                <X className="w-3.5 h-3.5" />
                <span>Passar</span>
              </button>

              <button
                onClick={() => handleQuickSwipe('match')}
                className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-extrabold text-xs flex items-center justify-center gap-1 transition-all shadow-md shadow-emerald-950/40"
                title="Dar Match"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Dar Match</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 2. Atividade Recente */}
      <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
            Atividade Recente
          </h4>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="space-y-3">
          {activities.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#0E1220] border border-purple-950/40 hover:border-purple-800/60 transition-all space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-500/40 shrink-0"
                />
                <div className="min-w-0 flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white truncate">{item.name}</span>
                    <span className="text-[10px] text-zinc-500 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {item.action}
                  </p>
                </div>
              </div>

              {/* Value / status + Action Button */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-bold text-blue-400">
                  {item.kicker}
                </span>

                <button
                  onClick={() => {
                    if (item.actionType === 'connect' || item.actionType === 'dataroom') {
                      onOpenChatWith(topCandidate);
                    } else {
                      onOpenProfile(currentUser);
                    }
                  }}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-[11px] rounded-lg transition-transform active:scale-95 shadow-sm shadow-purple-950/40"
                >
                  {item.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Demo Day em Destaque */}
      {demoDay && (
        <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
              Demo Day em Destaque
            </span>
            <span className="text-[10px] text-zinc-400">28 OUT</span>
          </div>

          <h5 className="text-xs font-bold text-white mb-1">
            {demoDay.title}
          </h5>

          <p className="text-[11px] text-zinc-400 mb-3">
            {demoDay.rsvpsCount} investidores e founders confirmados.
          </p>

          <button
            onClick={() => onToggleRsvpEvent(demoDay.id)}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              demoDay.isUserRegistered
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{demoDay.isUserRegistered ? 'Presença Confirmada' : 'Confirmar Presença (RSVP)'}</span>
          </button>
        </div>
      )}

      {/* 4. Assuntos em Alta no Ecossistema */}
      <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-1.5 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
            Assuntos em Alta
          </h4>
        </div>

        <div className="space-y-2 text-xs">
          {trendingTopics.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-zinc-300 hover:text-white transition-colors cursor-pointer group">
              <span className="font-semibold text-zinc-300 group-hover:text-purple-400 transition-colors">
                #{item.tag}
              </span>
              <span className="text-[10px] text-zinc-500 tabular-nums">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
