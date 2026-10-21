import React, { useState, useEffect, useRef } from 'react';
import { VideoPitch, UserProfile } from '../types';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Heart, 
  X, 
  FileText, 
  MessageSquare, 
  Check, 
  Eye, 
  TrendingUp, 
  Building2,
  ShieldCheck
} from 'lucide-react';

interface VideoPitchPlayerProps {
  pitch: VideoPitch;
  author: UserProfile;
  onConnect: () => void;
  onPass?: () => void;
  onOpenDeck?: () => void;
  onOpenChat?: () => void;
  compact?: boolean;
}

export const VideoPitchPlayer: React.FC<VideoPitchPlayerProps> = ({
  pitch,
  author,
  onConnect,
  onPass,
  onOpenDeck,
  onOpenChat,
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const [hasConnected, setHasConnected] = useState(false);

  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const subtitles = [
    { label: 'O PROBLEMA', text: pitch.keyProblem },
    { label: 'A SOLUÇÃO', text: pitch.keySolution },
    { label: 'MÉTRICAS & TRAÇÃO', text: pitch.metricsKicker }
  ];

  // Simulated video playback scrubber & subtitle ticker
  useEffect(() => {
    if (isPlaying) {
      playbackTimerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1.2;
          // Rotate subtitles every ~33%
          const subIdx = Math.min(2, Math.floor((next / 100) * 3));
          setActiveSubtitleIndex(subIdx);
          return next;
        });
      }, 200);
    } else {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    }

    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleConnectClick = () => {
    setHasConnected(true);
    onConnect();
  };

  return (
    <div className="w-full bg-[#080D1A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col group/player">
      
      {/* Video Canvas Container */}
      <div className={`relative w-full ${compact ? 'h-64 sm:h-72' : 'h-80 sm:h-96'} bg-slate-950 overflow-hidden select-none`}>
        
        {/* Background Video Frame Thumbnail */}
        <img
          src={pitch.thumbnail}
          alt={pitch.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isPlaying ? 'scale-105 brightness-90' : 'brightness-75 group-hover/player:scale-102'
          }`}
        />

        {/* Cinematic Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-black/30 to-black/60 pointer-events-none" />

        {/* Top Video Header Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
              <span className={`w-1.5 h-1.5 rounded-full bg-white ${isPlaying ? 'animate-ping' : ''}`} />
              <span>Vídeo Pitch Oficial</span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-slate-300 tabular-nums">
              {pitch.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md tabular-nums">
              <Eye className="w-3 h-3 text-emerald-400" />
              <span>{pitch.viewsCount} visualizações</span>
            </span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-slate-300 hover:text-white transition-colors"
              title={isMuted ? 'Ativar som' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Center Prominent Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <button
            onClick={togglePlay}
            className={`pointer-events-auto p-4 sm:p-5 rounded-full transition-all duration-300 shadow-2xl flex items-center justify-center ${
              isPlaying
                ? 'bg-black/50 backdrop-blur-md text-white opacity-0 group-hover/player:opacity-100 hover:scale-105'
                : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-black scale-100 hover:scale-110 active:scale-95 shadow-emerald-950/60'
            }`}
            title={isPlaying ? 'Pausar pitch' : 'Assistir pitch da startup'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
            ) : (
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            )}
          </button>
        </div>

        {/* Interactive Live Equalizer when playing */}
        {isPlaying && (
          <div className="absolute bottom-16 right-4 z-10 flex items-end gap-1 h-6 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-5" style={{ animationDelay: '0.15s' }} />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0.3s' }} />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-4" style={{ animationDelay: '0.45s' }} />
            <span className="text-[10px] text-emerald-300 font-mono ml-1 tabular-nums">Áudio On</span>
          </div>
        )}

        {/* Subtitles / Key Takeaway Overlay (Synced with Scrubber) */}
        <div className="absolute bottom-5 left-4 right-4 z-10">
          <div className="bg-black/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 sm:p-3 text-left">
            <div className="flex items-center justify-between text-[10px] font-black mb-1">
              <span className="text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{subtitles[activeSubtitleIndex].label}</span>
              </span>
              <span className="text-slate-400 tabular-nums">
                {Math.round((progress / 100) * 134)}s / 134s
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-2">
              {subtitles[activeSubtitleIndex].text}
            </p>
          </div>
        </div>

        {/* Scrubber Progress Bar at the very bottom edge of video */}
        <div 
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newPct = (clickX / rect.width) * 100;
            setProgress(newPct);
          }}
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/80 cursor-pointer z-20 group/bar"
        >
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 relative transition-all"
          >
            <span className="w-3 h-3 rounded-full bg-white absolute right-0 top-1/2 -translate-y-1/2 shadow opacity-0 group-hover/bar:opacity-100" />
          </div>
        </div>

      </div>

      {/* Decision Footer: Watch Video & Choose to Connect! */}
      <div className="p-4 sm:p-5 bg-[#0C0F1D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Startup & Pitch Meta */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-11 h-11 rounded-xl object-cover ring-2 ring-purple-500/50 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-white truncate">{pitch.title}</h4>
              {author.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            </div>
            <p className="text-xs text-purple-300 font-semibold truncate">
              Apresentado por {pitch.speakerName} ({pitch.speakerRole})
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {author.role === 'startup' ? author.companyName : author.fundName} · {author.stage}
            </p>
          </div>
        </div>

        {/* Immediate Connect / Pass Choice Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Deck Button */}
          {onOpenDeck && (
            <button
              onClick={onOpenDeck}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#11162B] hover:bg-purple-950/40 rounded-xl transition-colors flex items-center gap-1.5 border border-purple-950/30"
              title="Baixar ou visualizar Pitch Deck"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Deck PDF</span>
            </button>
          )}

          {/* Pass Button */}
          {onPass && (
            <button
              onClick={onPass}
              className="p-2 text-slate-400 hover:text-purple-300 bg-[#11162B] hover:bg-purple-950/40 rounded-xl transition-colors border border-purple-950/40"
              title="Passar startup (próximo pitch)"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Connect / Invest Button (Main Decision) */}
          <button
            onClick={handleConnectClick}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-lg ${
              hasConnected
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black shadow-emerald-950/50'
            }`}
          >
            {hasConnected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Interesse Enviado!</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-current" />
                <span>Gostei! Conectar com a Startup</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
