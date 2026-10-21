import React, { useState } from 'react';
import { AppNotification } from '../types';
import { 
  X, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  MessageSquare, 
  CheckCheck, 
  BellRing,
  AlertCircle
} from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: AppNotification) => void;
  onSimulateNewOpportunity: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  onSimulateNewOpportunity
}) => {
  const [filter, setFilter] = useState<'all' | 'match' | 'opportunity' | 'event'>('all');
  const [pushStatus, setPushStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

  if (!isOpen) return null;

  const handleRequestPush = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setPushStatus(perm);
        if (perm === 'granted') {
          new Notification('Elo Link — Notificações Ativadas!', {
            body: 'Você receberá alertas de novos matches e teses de investimento em tempo real.',
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        console.warn('Erro ao solicitar permissao de notificacao', err);
      }
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'match':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-purple-400" />;
      case 'opportunity':
        return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'comment':
      case 'invite':
      default:
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#080B16] border-l border-purple-950/40 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="px-4 sm:px-5 py-4 border-b border-purple-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <BellRing className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Central de Notificações</h2>
              <p className="text-[11px] text-slate-400">Alertas push & matches em tempo real</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-950/40 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Push Permission Banner */}
        <div className="px-4 sm:px-5 py-3 bg-gradient-to-r from-purple-950/40 to-[#0A0D18] border-b border-purple-950/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-300">Push do navegador:</span>
            <span className={`font-semibold capitalize text-[11px] ${
              pushStatus === 'granted' ? 'text-emerald-400' : 'text-blue-400'
            }`}>
              {pushStatus === 'granted' ? 'Ativo' : pushStatus === 'denied' ? 'Bloqueado' : 'Desativado'}
            </span>
          </div>
          {pushStatus !== 'granted' && (
            <button
              onClick={handleRequestPush}
              className="text-xs font-semibold px-2.5 py-1 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Ativar Push
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="px-5 py-2.5 border-b border-purple-950/30 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('match')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'match' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matches
            </button>
            <button
              onClick={() => setFilter('opportunity')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'opportunity' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Oportunidades
            </button>
            <button
              onClick={() => setFilter('event')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'event' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Eventos
            </button>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:underline shrink-0"
            title="Marcar todas como lidas"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Lidas</span>
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto divide-y divide-purple-950/30 p-2">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 flex flex-col items-center">
              <AlertCircle className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-xs">Nenhuma notificação nesta categoria.</p>
            </div>
          ) : (
            filteredNotifications.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className={`p-3 rounded-lg transition-colors cursor-pointer flex gap-3 ${
                  !item.read ? 'bg-purple-950/30 hover:bg-purple-950/50 border border-purple-800/30' : 'hover:bg-purple-950/20'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#11162B] border border-purple-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap tabular-nums">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{item.message}</p>
                </div>
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 self-center" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Simulation action at footer */}
        <div className="p-4 border-t border-purple-950/40 bg-[#06080F]">
          <button
            onClick={onSimulateNewOpportunity}
            className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-[#11162B] hover:bg-[#18203D] text-slate-200 border border-purple-900/40 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simular Nova Oportunidade em Tempo Real</span>
          </button>
        </div>

      </div>
    </div>
  );
};
