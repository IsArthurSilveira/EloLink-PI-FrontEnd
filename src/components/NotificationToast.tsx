import React, { useEffect } from 'react';
import { AppNotification } from '../types';
import { Sparkles, Calendar, TrendingUp, X, Bell } from 'lucide-react';

interface NotificationToastProps {
  notification: AppNotification | null;
  onClose: () => void;
  onActionClick: (notif: AppNotification) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  onActionClick
}) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-[#0D1527] border border-emerald-500/50 rounded-2xl p-4 shadow-2xl shadow-black/60 animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
          {notification.type === 'match' ? (
            <Sparkles className="w-5 h-5 text-emerald-400" />
          ) : notification.type === 'event' ? (
            <Calendar className="w-5 h-5 text-violet-400" />
          ) : (
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h4 className="text-xs font-bold text-white truncate">{notification.title}</h4>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2">
            {notification.message}
          </p>
          <button
            onClick={() => {
              onActionClick(notification);
              onClose();
            }}
            className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Ver detalhes agora →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
