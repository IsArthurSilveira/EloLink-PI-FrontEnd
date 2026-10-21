import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, MarketNiche, FundingStage } from '../types';
import { VideoPitchPlayer } from './VideoPitchPlayer';
import { 
  Flame, 
  Heart, 
  X, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  TrendingUp, 
  MessageSquare, 
  Info, 
  FileText, 
  Star, 
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Building2,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Share2,
  Image as ImageIcon,
  Download,
  Filter,
  SlidersHorizontal,
  Command
} from 'lucide-react';

interface MatchSectionProps {
  currentUser: UserProfile;
  allProfiles: UserProfile[];
  onOpenProfile: (user: UserProfile) => void;
  onMutualMatch: (matchedUser: UserProfile) => void;
  onOpenChatWith: (user: UserProfile) => void;
}

export const MatchSection: React.FC<MatchSectionProps> = ({
  currentUser,
  allProfiles,
  onOpenProfile,
  onMutualMatch,
  onOpenChatWith
}) => {
  const targetRole = currentUser.role === 'startup' ? 'investor' : 'startup';
  
  // Filter pool candidates with optional niche filtering
  const [selectedNicheFilter, setSelectedNicheFilter] = useState<string>('all');
  
  const baseCandidates = allProfiles.filter(p => p.id !== currentUser.id && p.role === targetRole);
  const candidates = baseCandidates.filter(p => 
    selectedNicheFilter === 'all' || p.niches.includes(selectedNicheFilter as MarketNiche)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'super' | null>(null);
  const [celebrationMatch, setCelebrationMatch] = useState<UserProfile | null>(null);
  
  // Profile slide-up drawer (Tinder full profile view on mobile)
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Card media tabs (Story-style navigation: Video Pitch vs Photo Gallery)
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'photos'>('video');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Drag physics state
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Confirmed matches carousel at top
  const [confirmedMatches, setConfirmedMatches] = useState<UserProfile[]>(
    allProfiles.filter(p => p.id === 'user-rodrigo' || p.id === 'user-camila')
  );

  const activeCandidate = candidates[currentIndex % candidates.length];

  // Gallery photos for startup
  const candidatePhotos = [
    activeCandidate?.videoPitch?.thumbnail || activeCandidate?.avatar || '',
    '/src/assets/images/startup_showcase_tech_1792400689208.jpg',
    '/src/assets/images/event_demoday_stage_1792400689479.jpg'
  ].filter(Boolean);

  // Calculate intelligent affinity score
  const calculateAffinity = (candidate: UserProfile) => {
    let score = 74;
    const reasons: string[] = [];

    const sharedNiches = candidate.niches.filter(n => currentUser.niches.includes(n));
    if (sharedNiches.length > 0) {
      score += 15;
      reasons.push(`Nicho em comum: ${sharedNiches.join(', ')}`);
    }

    if (currentUser.role === 'startup' && candidate.preferredStages?.includes(currentUser.stage as FundingStage)) {
      score += 8;
      reasons.push(`Estágio ${currentUser.stage} alinhado com a tese`);
    } else if (currentUser.role === 'investor' && currentUser.preferredStages?.includes(candidate.stage as FundingStage)) {
      score += 8;
      reasons.push(`Estágio ${candidate.stage} no foco do fundo`);
    }

    if (candidate.location.includes('São Paulo') && currentUser.location.includes('São Paulo')) {
      score += 3;
      reasons.push('Proximidade geográfica (São Paulo)');
    }

    return {
      score: Math.min(99, score),
      reasons
    };
  };

  const handleSwipe = (direction: 'left' | 'right' | 'super') => {
    if (!activeCandidate) return;

    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === 'right' || direction === 'super') {
        setCelebrationMatch(activeCandidate);
        onMutualMatch(activeCandidate);
        if (!confirmedMatches.some(m => m.id === activeCandidate.id)) {
          setConfirmedMatches(prev => [activeCandidate, ...prev]);
        }
      }

      setSwipeDirection(null);
      setDragOffset({ x: 0, y: 0 });
      setCurrentIndex(prev => (prev + 1) % candidates.length);
      setIsProfileExpanded(false);
      setActiveMediaTab('video');
      setActivePhotoIndex(0);
    }, 320);
  };

  const handleRewind = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : candidates.length - 1));
    setIsProfileExpanded(false);
  };

  // Pointer drag events for realistic Tinder card swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;

    if (dragOffset.x > 90) {
      handleSwipe('right');
    } else if (dragOffset.x < -90) {
      handleSwipe('left');
    } else if (dragOffset.y < -90) {
      handleSwipe('super');
    } else {
      // snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const affinity = activeCandidate ? calculateAffinity(activeCandidate) : { score: 92, reasons: [] };

  // Rotation and tilt calculation
  const cardRotation = isDragging ? dragOffset.x * 0.08 : 0;
  const matchOpacity = Math.min(1, Math.max(0, dragOffset.x / 75));
  const nopeOpacity = Math.min(1, Math.max(0, -dragOffset.x / 75));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (isProfileExpanded || celebrationMatch) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSwipe('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSwipe('right');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleSwipe('super');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCandidate, isProfileExpanded, celebrationMatch, candidates.length]);

  return (
    <div className="w-full flex flex-col select-none">
      
      {/* Mobile Top Header: Tinder Matches Carousel (visible on mobile only) */}
      <div className="w-full mb-3 px-1 lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-purple-400 fill-current" />
            <h2 className="text-xs font-black text-white uppercase tracking-wider">
              Elos Mútuos ({confirmedMatches.length})
            </h2>
          </div>
          <span className="text-[10px] text-slate-400">
            {currentIndex + 1} de {candidates.length} perfis
          </span>
        </div>

        {/* Small round matches strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {confirmedMatches.map(match => (
            <button
              key={match.id}
              onClick={() => onOpenChatWith(match)}
              className="flex flex-col items-center gap-1 shrink-0 group focus:outline-none"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-purple-600 via-blue-500 to-emerald-400 group-hover:scale-105 transition-transform">
                  <img
                    src={match.avatar}
                    alt={match.name}
                    className="w-full h-full rounded-full object-cover ring-2 ring-[#06080F]"
                  />
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-2 ring-[#06080F] flex items-center justify-center text-[7px] text-black font-black">
                  ✓
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-200 group-hover:text-purple-300 truncate max-w-[70px]">
                {match.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP FULL-SCREEN 3-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        
        {/* LEFT COLUMN: Matches Panel + Radar Filters + Keyboard Shortcuts (Desktop) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 sticky top-20">
          
          {/* Confirmed Matches Panel */}
          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-purple-950/30 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-purple-400 fill-current" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    Elos Mútuos
                  </h3>
                  <p className="text-[10px] text-slate-400">Prontos para conversar</p>
                </div>
              </div>
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tabular-nums">
                {confirmedMatches.length}
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {confirmedMatches.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Arraste para a direita para dar o primeiro match!
                </div>
              ) : (
                confirmedMatches.map(match => (
                  <div
                    key={match.id}
                    className="p-2.5 rounded-xl bg-[#080B16] border border-purple-950/30 hover:border-purple-800/40 transition-colors flex items-center justify-between gap-2.5 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={match.avatar}
                          alt={match.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-purple-900/50"
                        />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-2 ring-[#080B16]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                          {match.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {match.role === 'startup' ? match.companyName : match.fundName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenChatWith(match)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white transition-colors shrink-0"
                    >
                      Chat
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Niche Filters Panel */}
          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Filtros do Radar
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Todos', value: 'all' },
                { label: 'AI & SaaS', value: 'AI & B2B SaaS' },
                { label: 'Fintech', value: 'Fintech' },
                { label: 'Healthtech', value: 'Healthtech' },
                { label: 'Cleantech', value: 'Cleantech & Clima' },
                { label: 'Agtech', value: 'Agtech' }
              ].map(item => (
                <button
                  key={item.value}
                  onClick={() => {
                    setSelectedNicheFilter(item.value);
                    setCurrentIndex(0);
                  }}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    selectedNicheFilter === item.value
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-[#080B16] text-slate-400 hover:text-white border border-purple-950/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-purple-950/30 flex items-center justify-between text-[11px] text-slate-400">
              <span>Perfis disponíveis:</span>
              <strong className="text-emerald-400 font-bold tabular-nums">
                {candidates.length} perfis
              </strong>
            </div>
          </div>

          {/* Keyboard Shortcuts Prompt */}
          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3.5 shadow-xl text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-white mb-2">
              <Command className="w-3.5 h-3.5 text-purple-400" />
              <span>Atalhos de Teclado</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 bg-[#080B16] p-1.5 rounded border border-purple-950/30">
                <kbd className="px-1.5 py-0.5 rounded bg-[#11162B] text-slate-200 border border-purple-900/40 font-mono text-[10px]">←</kbd>
                <span>Recusar</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#080B16] p-1.5 rounded border border-purple-950/30">
                <kbd className="px-1.5 py-0.5 rounded bg-[#11162B] text-slate-200 border border-purple-900/40 font-mono text-[10px]">→</kbd>
                <span>Dar Match</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#080B16] p-1.5 rounded border border-purple-950/30">
                <kbd className="px-1.5 py-0.5 rounded bg-[#11162B] text-slate-200 border border-purple-900/40 font-mono text-[10px]">↑</kbd>
                <span>Super Elo</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#080B16] p-1.5 rounded border border-purple-950/30">
                <kbd className="px-1.5 py-0.5 rounded bg-[#11162B] text-slate-200 border border-purple-900/40 font-mono text-[10px]">↺</kbd>
                <span>Voltar</span>
              </div>
            </div>
          </div>

        </div>

        {/* CENTER COLUMN: The Primary Interactive Tinder/Elo Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
          {activeCandidate ? (
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none h-[590px] sm:h-[630px] lg:h-[650px]">
              
              {/* Draggable Card */}
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                style={{
                  transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${cardRotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
                className={`w-full h-full bg-[#0C0F1D] border border-purple-950/40 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between cursor-grab active:cursor-grabbing ${
                  swipeDirection === 'left'
                    ? '-translate-x-full rotate-[-20deg] opacity-0 transition-all duration-300'
                    : swipeDirection === 'right'
                    ? 'translate-x-full rotate-[20deg] opacity-0 transition-all duration-300'
                    : swipeDirection === 'super'
                    ? '-translate-y-full opacity-0 transition-all duration-300'
                    : ''
                }`}
              >
                
                {/* Dynamic Stamp Overlays */}
                {matchOpacity > 0 && (
                  <div
                    style={{ opacity: matchOpacity }}
                    className="absolute top-8 left-6 z-30 border-4 border-emerald-400 text-emerald-400 font-black text-2xl uppercase tracking-widest px-4 py-1 rounded-xl rotate-[-15deg] shadow-lg bg-black/60 backdrop-blur-sm pointer-events-none"
                  >
                    MATCH
                  </div>
                )}

                {nopeOpacity > 0 && (
                  <div
                    style={{ opacity: nopeOpacity }}
                    className="absolute top-8 right-6 z-30 border-4 border-purple-500 text-purple-400 font-black text-2xl uppercase tracking-widest px-4 py-1 rounded-xl rotate-[15deg] shadow-lg bg-black/60 backdrop-blur-sm pointer-events-none"
                  >
                    RECUSAR
                  </div>
                )}

                {/* Media Presentation: Video Pitch or Photos */}
                <div className="relative flex-1 w-full bg-black overflow-hidden">
                  
                  {/* Story / Media Switcher Tabs Bar at top of card */}
                  <div className="absolute top-3 left-4 right-4 z-20 flex gap-1.5 pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMediaTab('video');
                      }}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        activeMediaTab === 'video' ? 'bg-white shadow' : 'bg-white/30'
                      }`}
                      title="Vídeo Pitch Oficial"
                    />
                    {candidatePhotos.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMediaTab('photos');
                          setActivePhotoIndex(i);
                        }}
                        className={`flex-1 h-1 rounded-full transition-all ${
                          activeMediaTab === 'photos' && activePhotoIndex === i ? 'bg-white shadow' : 'bg-white/30'
                        }`}
                        title={`Foto ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Video Pitch Player View */}
                  {activeMediaTab === 'video' && activeCandidate.videoPitch ? (
                    <div className="w-full h-full">
                      <VideoPitchPlayer
                        pitch={activeCandidate.videoPitch}
                        author={activeCandidate}
                        compact={false}
                        onConnect={() => handleSwipe('right')}
                        onPass={() => handleSwipe('left')}
                        onOpenDeck={() => alert(`Acessando Pitch Deck oficial de ${activeCandidate.companyName}...`)}
                      />
                    </div>
                  ) : (
                    /* Photo Gallery View */
                    <div className="relative w-full h-full">
                      <img
                        src={candidatePhotos[activePhotoIndex] || activeCandidate.avatar}
                        alt={activeCandidate.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1D] via-black/30 to-black/50 pointer-events-none" />

                      {/* Photo Navigation controls */}
                      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex(prev => (prev > 0 ? prev - 1 : candidatePhotos.length - 1));
                          }}
                          className="p-1.5 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex(prev => (prev + 1) % candidatePhotos.length);
                          }}
                          className="p-1.5 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Affinity Tag (Top Right) */}
                  <div className="absolute top-7 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/40 flex items-center gap-1.5 shadow-lg z-20">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] font-black text-emerald-400 tabular-nums">
                      {affinity.score}% MATCH
                    </span>
                  </div>

                  {/* Bottom Card Identity & Headline */}
                  <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none text-left">
                    <div className="flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md truncate">
                            {activeCandidate.name}
                          </h3>
                          {activeCandidate.verified && (
                            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-emerald-300 drop-shadow-sm mb-1 truncate">
                          {activeCandidate.role === 'startup' 
                            ? `${activeCandidate.companyName} · Rodada ${activeCandidate.stage} (${activeCandidate.targetRound})` 
                            : `${activeCandidate.fundName} · AUM ${activeCandidate.aum}`}
                        </p>

                        <div className="flex items-center gap-2 text-[11px] text-slate-300 drop-shadow-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{activeCandidate.location}</span>
                          </span>
                          <span>·</span>
                          <span className="font-bold text-emerald-400 tabular-nums">
                            ★ {activeCandidate.averageRating.toFixed(1)} ({activeCandidate.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Info Button: Tap to open full social network profile sheet */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsProfileExpanded(true);
                        }}
                        className="pointer-events-auto w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95 shadow-lg"
                        title="Ver perfil completo da startup"
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Controls Bar */}
                <div className="px-6 py-3.5 bg-[#080B16] border-t border-purple-950/40 flex items-center justify-around z-20">
                  
                  {/* Rewind (↺) */}
                  <button
                    onClick={handleRewind}
                    className="w-11 h-11 rounded-full bg-[#11162B] hover:bg-[#18203E] text-blue-400 border border-purple-900/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md"
                    title="Voltar ao perfil anterior"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Pass / Nope (✕) */}
                  <button
                    onClick={() => handleSwipe('left')}
                    className="w-14 h-14 rounded-full bg-[#11162B] hover:bg-purple-950/50 text-purple-400 border border-purple-900/40 hover:border-purple-500/60 flex items-center justify-center transition-all hover:scale-115 active:scale-95 shadow-xl"
                    title="Passar perfil (Swipe Esquerda)"
                  >
                    <X className="w-7 h-7 stroke-[2.5]" />
                  </button>

                  {/* Super Like / Boost (⚡) */}
                  <button
                    onClick={() => handleSwipe('super')}
                    className="w-11 h-11 rounded-full bg-[#11162B] hover:bg-blue-950/50 text-blue-400 border border-purple-900/40 hover:border-blue-500 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md"
                    title="Super Elo (Swipe Cima)"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                  </button>

                  {/* Like / Match (♥) */}
                  <button
                    onClick={() => handleSwipe('right')}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center transition-all hover:scale-115 active:scale-95 shadow-xl shadow-emerald-950/60"
                    title="Dar Match e Conectar (Swipe Direita)"
                  >
                    <Heart className="w-7 h-7 fill-current" />
                  </button>

                  {/* View Full Profile (ℹ️) */}
                  <button
                    onClick={() => setIsProfileExpanded(true)}
                    className="w-11 h-11 rounded-full bg-[#11162B] hover:bg-[#18203E] text-purple-300 border border-purple-900/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md"
                    title="Ver Fotos e Dossiê Completo"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                </div>

              </div>

              {/* Mobile Slide-up Sheet */}
              {isProfileExpanded && (
                <div className="absolute inset-0 z-40 bg-[#080B16] border border-purple-900/50 rounded-3xl p-5 overflow-y-auto shadow-2xl flex flex-col justify-between animate-in slide-in-from-bottom duration-300">
                  <div>
                    {/* Close sheet */}
                    <div className="flex items-center justify-between pb-3 border-b border-purple-950/30 mb-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={activeCandidate.avatar}
                          alt={activeCandidate.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-400"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">{activeCandidate.name}</h4>
                          <p className="text-xs text-purple-300 font-semibold">
                            {activeCandidate.role === 'startup' ? activeCandidate.companyName : activeCandidate.fundName}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsProfileExpanded(false)}
                        className="p-1.5 rounded-full bg-[#11162B] text-slate-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Photo Gallery Grid */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Galeria de Fotos & Demonstração do Produto
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {candidatePhotos.map((photo, idx) => (
                          <img
                            key={idx}
                            src={photo}
                            alt="Demonstração"
                            className="w-full h-28 rounded-xl object-cover border border-purple-950/40"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Sobre a Startup
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed bg-[#0C0F1D] p-3 rounded-xl border border-purple-950/40">
                        {activeCandidate.bio}
                      </p>
                    </div>

                    {/* Key Numbers */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                        <span className="text-[10px] text-slate-400 block">Rodada / Meta</span>
                        <span className="font-extrabold text-emerald-400 tabular-nums">
                          {activeCandidate.targetRound || 'R$ 3.5M'}
                        </span>
                      </div>
                      <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                        <span className="text-[10px] text-slate-400 block">MRR Atual</span>
                        <span className="font-extrabold text-white tabular-nums">
                          {activeCandidate.mrr || '+24% MoM'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons inside sheet */}
                  <div className="pt-3 border-t border-purple-950/30 flex gap-2">
                    <button
                      onClick={() => {
                        setIsProfileExpanded(false);
                        handleSwipe('left');
                      }}
                      className="flex-1 py-2.5 bg-[#11162B] hover:bg-purple-950/40 text-slate-300 font-bold text-xs rounded-xl transition-colors border border-purple-900/30"
                    >
                      Recusar
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileExpanded(false);
                        handleSwipe('right');
                      }}
                      className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Conectar Agora</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 bg-[#0C0F1D] border border-purple-950/40 rounded-3xl p-8 max-w-md w-full">
              <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Radar Atualizado!</h3>
              <p className="text-xs text-slate-400 mb-5">
                Você avaliou todos os perfis compatíveis com seus filtros atuais.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedNicheFilter('all');
                    setCurrentIndex(0);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Limpar Filtros e Reiniciar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Real-Time Intelligence Dossier for Active Candidate (Desktop) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 sticky top-20">
          {activeCandidate ? (
            <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
              
              {/* Dossier Header */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-purple-950/30">
                <img
                  src={activeCandidate.avatar}
                  alt={activeCandidate.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/50 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-white truncate">{activeCandidate.name}</h3>
                    {activeCandidate.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs font-bold text-purple-300 truncate">
                    {activeCandidate.role === 'startup' ? activeCandidate.companyName : activeCandidate.fundName}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {activeCandidate.headline}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{activeCandidate.location}</span>
                    </span>
                    <span>·</span>
                    <span className="text-emerald-400 font-bold tabular-nums">
                      ★ {activeCandidate.averageRating.toFixed(1)} ({activeCandidate.reviewsCount} avaliações)
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Match Affinity Explainer Box */}
              <div className="bg-gradient-to-br from-purple-950/40 via-[#0A0D18] to-blue-950/30 border border-purple-800/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Score de Afinidade Elo Link</span>
                  </span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 tabular-nums">
                    {affinity.score}% Compatível
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  {affinity.reasons.length > 0 ? (
                    affinity.reasons.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Perfil verificado e ativo no ecossistema</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Executive Thesis / Bio */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                  Tese & Resumo Executivo
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#080B16] p-3 rounded-xl border border-purple-950/30">
                  {activeCandidate.bio}
                </p>
              </div>

              {/* Startup Metrics or Investor Range */}
              {activeCandidate.role === 'startup' ? (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    Métricas da Rodada
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#080B16] rounded-xl border border-purple-950/30">
                      <span className="text-[10px] text-slate-400 block">Estágio</span>
                      <span className="font-bold text-white">{activeCandidate.stage}</span>
                    </div>
                    <div className="p-2.5 bg-[#080B16] rounded-xl border border-purple-950/30">
                      <span className="text-[10px] text-slate-400 block">Alvo</span>
                      <span className="font-bold text-emerald-400 tabular-nums">{activeCandidate.targetRound}</span>
                    </div>
                    <div className="p-2.5 bg-[#080B16] rounded-xl border border-purple-950/30">
                      <span className="text-[10px] text-slate-400 block">MRR Atual</span>
                      <span className="font-bold text-white tabular-nums">{activeCandidate.mrr}</span>
                    </div>
                    <div className="p-2.5 bg-[#080B16] rounded-xl border border-purple-950/30">
                      <span className="text-[10px] text-slate-400 block">Crescimento</span>
                      <span className="font-bold text-purple-400 tabular-nums">{activeCandidate.growthRate}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    Parâmetros do Fundo
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#080B16] rounded-xl border border-purple-950/30">
                      <span className="text-[10px] text-slate-400 block">Ticket Médio</span>
                      <span className="font-bold text-emerald-400 tabular-nums">
                        R$ {activeCandidate.ticketRange?.min}k - R$ {(activeCandidate.ticketRange?.max || 2000) / 1000}M
                      </span>
                    </div>
                    <div className="p-2.5 bg-[#080B16] rounded-xl border border-purple-950/30">
                      <span className="text-[10px] text-slate-400 block">AUM Total</span>
                      <span className="font-bold text-white tabular-nums">{activeCandidate.aum}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Niches */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                  Nichos de Atuação
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCandidate.niches.map(n => (
                    <span
                      key={n}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-purple-950/40 text-purple-300 border border-purple-800/40"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pitch Deck Preview */}
              {activeCandidate.pitchDeckName && (
                <div className="p-3 bg-[#080B16] border border-purple-950/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white truncate">{activeCandidate.pitchDeckName}</span>
                  </div>
                  <button
                    onClick={() => alert(`Download de ${activeCandidate.pitchDeckName} iniciado.`)}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors shrink-0"
                    title="Baixar Deck"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Instant Dossier Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleSwipe('left')}
                  className="flex-1 py-2.5 bg-[#11162B] hover:bg-purple-950/40 text-purple-300 hover:text-white font-bold text-xs rounded-xl transition-all border border-purple-900/40 flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Passar (←)</span>
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Conectar (→)</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-6 text-center text-slate-500 text-xs">
              Selecione outro nicho ou aguarde novos perfis.
            </div>
          )}
        </div>

      </div>

      {/* Mutual Match Celebration Modal */}
      {celebrationMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#0C0F1D] border border-purple-500/50 rounded-3xl max-w-md w-full p-6 text-center relative shadow-2xl shadow-purple-950/60">
            
            <button
              onClick={() => setCelebrationMatch(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Heart & Sparkles Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-emerald-400 p-[2.5px] mx-auto mb-4 shadow-xl shadow-purple-950/50">
              <div className="w-full h-full bg-[#070913] rounded-full flex items-center justify-center">
                <Flame className="w-10 h-10 text-purple-400 fill-current animate-bounce" />
              </div>
            </div>

            <span className="text-[11px] uppercase font-black tracking-widest text-emerald-400 mb-1 block">
              Match Bidirecional Confirmado!
            </span>

            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Vocês Realizaram um Elo
            </h2>

            <p className="text-slate-300 text-xs leading-relaxed mb-6">
              Você e <strong className="text-white">{celebrationMatch.name}</strong> demonstraram interesse mútuo. O canal direto para troca de pitch deck e áudios confidenciais está liberado.
            </p>

            {/* Avatars Lockup */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="text-center">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-400 shadow-lg"
                />
                <span className="text-[11px] font-bold text-white mt-1 block truncate max-w-[90px]">
                  {currentUser.name.split(' ')[0]}
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center text-emerald-400 font-extrabold text-xs">
                ⚡
              </div>

              <div className="text-center">
                <img
                  src={celebrationMatch.avatar}
                  alt={celebrationMatch.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500 shadow-lg"
                />
                <span className="text-[11px] font-bold text-white mt-1 block truncate max-w-[90px]">
                  {celebrationMatch.name.split(' ')[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  const m = celebrationMatch;
                  setCelebrationMatch(null);
                  onOpenChatWith(m);
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Entrar em contato agora</span>
              </button>

              <button
                onClick={() => setCelebrationMatch(null)}
                className="w-full py-2.5 bg-[#11162B] hover:bg-[#18203E] text-slate-300 font-semibold text-xs rounded-xl transition-colors border border-purple-900/30"
              >
                Continuar Deslizando
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
