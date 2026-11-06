import React, { useState, useEffect } from 'react';
import { UserProfile, Review, Post, MarketNiche, FundingStage, BusinessModelCanvas } from '../types';
import { VideoPitchPlayer } from './VideoPitchPlayer';
import { BusinessModelCanvasView } from './BusinessModelCanvasView';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Globe, 
  Linkedin, 
  FileText, 
  Download, 
  MessageSquare, 
  Sparkles, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Plus, 
  Send, 
  CheckCircle, 
  Award, 
  Edit3, 
  Camera, 
  Save, 
  RotateCcw, 
  Share2, 
  Flame, 
  ArrowLeft, 
  ExternalLink, 
  Eye, 
  Check, 
  Layers, 
  Video, 
  Heart, 
  MessageCircle,
  Target,
  ChevronRight
} from 'lucide-react';

interface ProfileSectionProps {
  profileUser: UserProfile;
  currentUser: UserProfile;
  posts: Post[];
  allPosts: Post[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigateBack: () => void;
  onStartChat: (user: UserProfile) => void;
  onConnectUser: (user: UserProfile) => void;
  onAddReview: (targetUserId: string, review: Omit<Review, 'id' | 'date'>) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onCreatePost: (postData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'commentsCount' | 'sharesCount'>) => void;
  onSwitchUser?: () => void;
}

const PRESET_BANNERS = [
  { id: 'b-cyber', label: 'Cyber Violet', gradient: 'from-purple-950 via-indigo-950 to-[#0A0D18]' },
  { id: 'b-emerald', label: 'Emerald Tech', gradient: 'from-emerald-950 via-teal-950 to-[#0A0D18]' },
  { id: 'b-nebula', label: 'Deep Blue', gradient: 'from-blue-950 via-purple-950 to-[#070913]' },
  { id: 'b-sunset', label: 'Solar Pitch', gradient: 'from-amber-950 via-rose-950 to-[#0C0F1D]' },
  { id: 'b-obsidian', label: 'Obsidian Minimal', gradient: 'from-zinc-900 via-neutral-950 to-[#05060A]' }
];

const PRESET_AVATARS = [
  { label: 'Camila (Founder)', url: '/assets/images/avatar_founder_camila_1792400686938.jpg' },
  { label: 'Rodrigo (Investor)', url: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg' },
  { label: 'Tech Lead', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { label: 'Partner VC', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
];

const ALL_NICHES: MarketNiche[] = [
  'AI & B2B SaaS',
  'Fintech',
  'Healthtech',
  'Cleantech & Clima',
  'Agtech',
  'Logtech & Supply',
  'Edtech',
  'Deeptech & Hardware'
];

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileUser,
  currentUser,
  posts,
  allPosts,
  onUpdateProfile,
  onNavigateBack,
  onStartChat,
  onConnectUser,
  onAddReview,
  onLikePost,
  onAddComment,
  onCreatePost,
  onSwitchUser
}) => {
  const isOwnProfile = profileUser.id === currentUser.id;

  const [isEditing, setIsEditing] = useState(false);
  const [viewAsGuest, setViewAsGuest] = useState(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [deckDownloaded, setDeckDownloaded] = useState(false);
  const [showBannerPicker, setShowBannerPicker] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'canvas' | 'posts' | 'portfolio' | 'reviews'>('about');
  const [canvasData, setCanvasData] = useState<BusinessModelCanvas | undefined>(profileUser.businessModelCanvas);

  // Form inputs
  const [name, setName] = useState(profileUser.name);
  const [handle, setHandle] = useState(profileUser.handle);
  const [headline, setHeadline] = useState(profileUser.headline);
  const [bio, setBio] = useState(profileUser.bio);
  const [location, setLocation] = useState(profileUser.location);
  const [role, setRole] = useState(profileUser.role);
  const [companyName, setCompanyName] = useState(profileUser.companyName || profileUser.fundName || '');
  const [website, setWebsite] = useState(profileUser.website || '');
  const [linkedin, setLinkedin] = useState(profileUser.linkedin || '');
  const [avatar, setAvatar] = useState(profileUser.avatar);
  const [coverGradient, setCoverGradient] = useState(profileUser.coverImage || PRESET_BANNERS[0].gradient);
  const [niches, setNiches] = useState<MarketNiche[]>(profileUser.niches || []);
  const [newNicheInput, setNewNicheInput] = useState<MarketNiche | ''>('');

  // Metrics
  const [stage, setStage] = useState<FundingStage>((profileUser.stage || 'Seed') as FundingStage);
  const [targetRound, setTargetRound] = useState(profileUser.targetRound || 'R$ 3.500.000');
  const [alreadyRaised, setAlreadyRaised] = useState(profileUser.alreadyRaised || 'R$ 1.800.000');
  const [mrr, setMrr] = useState(profileUser.mrr || 'R$ 94.000');
  const [growthRate, setGrowthRate] = useState(profileUser.growthRate || '+24% MoM');
  const [activeClients, setActiveClients] = useState(profileUser.activeClients || 38);
  const [problemSummary, setProblemSummary] = useState(profileUser.problemSummary || '');
  const [solutionSummary, setSolutionSummary] = useState(profileUser.solutionSummary || '');

  // Investor
  const [aum, setAum] = useState(profileUser.aum || 'R$ 75.000.000');
  const [ticketMin, setTicketMin] = useState(profileUser.ticketRange?.min || 500);
  const [ticketMax, setTicketMax] = useState(profileUser.ticketRange?.max || 2500);
  const [thesis, setThesis] = useState(profileUser.thesis || '');
  const [pitchDeckName, setPitchDeckName] = useState(profileUser.pitchDeckName || 'Pitch_Deck_2026.pdf');

  // Posts & Reviews
  const [newPostText, setNewPostText] = useState('');
  const [newPostType, setNewPostType] = useState<'video_pitch' | 'opportunity' | 'thesis'>('opportunity');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRole, setReviewRole] = useState('Parceiro de Co-investimento / Mentor');
  const [reviewTags, setReviewTags] = useState<string[]>(['Smart Money', 'Governança Ágil']);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputMap, setCommentInputMap] = useState<{ [postId: string]: string }>({});

  useEffect(() => {
    setName(profileUser.name);
    setHandle(profileUser.handle);
    setHeadline(profileUser.headline);
    setBio(profileUser.bio);
    setLocation(profileUser.location);
    setRole(profileUser.role);
    setCompanyName(profileUser.companyName || profileUser.fundName || '');
    setWebsite(profileUser.website || '');
    setLinkedin(profileUser.linkedin || '');
    setAvatar(profileUser.avatar);
    setCoverGradient(profileUser.coverImage || PRESET_BANNERS[0].gradient);
    setNiches(profileUser.niches || []);
    setStage((profileUser.stage || 'Seed') as FundingStage);
    setTargetRound(profileUser.targetRound || 'R$ 3.500.000');
    setAlreadyRaised(profileUser.alreadyRaised || 'R$ 1.800.000');
    setMrr(profileUser.mrr || 'R$ 94.000');
    setGrowthRate(profileUser.growthRate || '+24% MoM');
    setActiveClients(profileUser.activeClients || 38);
    setProblemSummary(profileUser.problemSummary || '');
    setSolutionSummary(profileUser.solutionSummary || '');
    setAum(profileUser.aum || 'R$ 75.000.000');
    setThesis(profileUser.thesis || '');
    setPitchDeckName(profileUser.pitchDeckName || 'Pitch_Deck_2026.pdf');
    setCanvasData(profileUser.businessModelCanvas);
  }, [profileUser]);

  const handleUpdateCanvas = (updated: BusinessModelCanvas) => {
    setCanvasData(updated);
    onUpdateProfile({ businessModelCanvas: updated });
  };

  const handleSaveAll = () => {
    const updatedData: Partial<UserProfile> = {
      name,
      handle,
      headline,
      bio,
      location,
      role,
      avatar,
      coverImage: coverGradient,
      website,
      linkedin,
      niches,
      businessModelCanvas: canvasData,
      ...(role === 'startup'
        ? {
            companyName,
            stage,
            targetRound,
            alreadyRaised,
            mrr,
            growthRate,
            activeClients,
            problemSummary,
            solutionSummary,
            pitchDeckName
          }
        : {
            fundName: companyName,
            aum,
            ticketRange: { min: ticketMin, max: ticketMax },
            thesis
          })
    };

    onUpdateProfile(updatedData);
    setIsEditing(false);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3500);
  };

  const handleDiscard = () => {
    setName(profileUser.name);
    setHeadline(profileUser.headline);
    setBio(profileUser.bio);
    setLocation(profileUser.location);
    setAvatar(profileUser.avatar);
    setCoverGradient(profileUser.coverImage || PRESET_BANNERS[0].gradient);
    setIsEditing(false);
  };

  const handleCopyProfileLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddNiche = () => {
    if (newNicheInput && !niches.includes(newNicheInput)) {
      setNiches([...niches, newNicheInput]);
      setNewNicheInput('');
    }
  };

  const handleRemoveNiche = (nicheToRemove: MarketNiche) => {
    setNiches(niches.filter(n => n !== nicheToRemove));
  };

  const handleProfilePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    onCreatePost({
      author: currentUser,
      type: newPostType,
      content: newPostText.trim(),
      niche: currentUser.niches?.[0] || 'AI & B2B SaaS',
      stage: currentUser.stage || 'Seed',
      financialHighlight: currentUser.role === 'startup' ? currentUser.mrr : currentUser.aum,
      location: currentUser.location || 'São Paulo, SP',
      tags: currentUser.niches || ['AI & B2B SaaS']
    });

    setNewPostText('');
    setActiveTab('posts');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    onAddReview(profileUser.id, {
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: `${reviewRole} · ${currentUser.role === 'startup' ? currentUser.companyName : currentUser.fundName}`,
      authorAvatar: currentUser.avatar,
      targetId: profileUser.id,
      rating: reviewRating,
      comment: reviewComment.trim(),
      tags: reviewTags
    });

    setReviewComment('');
    setShowReviewForm(false);
  };

  const userPosts = allPosts.filter(
    p => p.author?.id === profileUser.id || p.author?.name?.toLowerCase() === profileUser.name.toLowerCase()
  );

  const displayInEdit = isOwnProfile && isEditing && !viewAsGuest;

  return (
    <div className="min-h-full w-full bg-[#06080F] text-zinc-100 pb-20 animate-in fade-in duration-200">
      
      {/* Saved Toast Feedback Banner */}
      {showSavedFeedback && (
        <div className="max-w-6xl mx-auto px-4 mt-3">
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-emerald-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Perfil social atualizado com sucesso! Suas informações já estão visíveis no ecossistema EloLink.</span>
            </div>
            <button onClick={() => setShowSavedFeedback(false)} className="text-emerald-400 font-bold ml-3 hover:underline">
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Main Profile Social Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-4 space-y-5">

        {/* 1. Profile Hero Card (Cover + Avatar + Bio + Social Badges) */}
        <section className="bg-[#0C0F1D] border border-purple-900/35 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Cover Banner */}
          <div className={`relative h-44 sm:h-56 md:h-64 bg-gradient-to-r ${coverGradient} transition-all duration-300 overflow-hidden`}>
            {/* Back Button */}
            <button
              type="button"
              onClick={onNavigateBack}
              className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition-all shadow-lg"
              title="Voltar"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-purple-300" />
              <span>Voltar</span>
            </button>

            {displayInEdit && (
              <div className="absolute top-4 right-4 z-20">
                <button
                  type="button"
                  onClick={() => setShowBannerPicker(!showBannerPicker)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-xs font-bold text-white transition-all shadow-lg"
                >
                  <Camera className="w-4 h-4 text-purple-300" />
                  <span>Trocar Tema da Capa</span>
                </button>

                {showBannerPicker && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#0E1220] border border-purple-900/50 rounded-2xl shadow-2xl p-2.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 px-1">Selecione uma Capa</p>
                    <div className="space-y-1.5">
                      {PRESET_BANNERS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setCoverGradient(b.gradient);
                            setShowBannerPicker(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-left transition-all ${
                            coverGradient === b.gradient ? 'bg-purple-600/30 text-white border border-purple-500/50' : 'hover:bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-md bg-gradient-to-r ${b.gradient} border border-white/20`} />
                            <span>{b.label}</span>
                          </div>
                          {coverGradient === b.gradient && <Check className="w-3.5 h-3.5 text-purple-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Identity Bar */}
          <div className="px-5 sm:px-8 pb-6 pt-0 relative">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
              
              {/* Overlapping Avatar */}
              <div className="relative group self-start">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-tr from-purple-500 via-blue-500 to-emerald-400 shadow-2xl">
                  <div className="w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#0A0D18]">
                    <img
                      src={avatar}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {profileUser.verified && (
                  <div 
                    className="absolute -bottom-1 -right-1 p-1 bg-[#0C0F1D] rounded-full shadow-lg"
                    title="Perfil Verificado EloLink"
                  >
                    <ShieldCheck className="w-6 h-6 text-emerald-400 fill-emerald-950/80" />
                  </div>
                )}

                {displayInEdit && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl sm:rounded-3xl opacity-90 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-lg"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Alterar</span>
                    </button>
                  </div>
                )}

                {showAvatarPicker && displayInEdit && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-[#0E1220] border border-purple-900/50 rounded-2xl shadow-2xl p-3 z-40 animate-in fade-in duration-150">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Avatares Sugeridos</p>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {PRESET_AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setAvatar(av.url);
                            setShowAvatarPicker(false);
                          }}
                          className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                            avatar === av.url ? 'border-purple-500 ring-2 ring-purple-500/40' : 'border-zinc-800'
                          }`}
                          title={av.label}
                        >
                          <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Actions on Right */}
              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                {isOwnProfile ? (
                  displayInEdit ? (
                    <>
                      <button
                        type="button"
                        onClick={handleDiscard}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Descartar</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveAll}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-xs font-bold text-white shadow-lg shadow-purple-950/40 transition-all"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Salvar Alterações</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setViewAsGuest(false);
                        setIsEditing(true);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/40 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar Perfil</span>
                    </button>
                  )
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => onConnectUser(profileUser)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0E1220] hover:bg-[#141A30] border border-purple-900/40 text-xs font-bold text-purple-300 hover:text-white transition-all shadow-sm"
                    >
                      <Flame className="w-3.5 h-3.5 text-purple-400 fill-purple-400/30" />
                      <span>Conectar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartChat(profileUser)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-black text-black shadow-lg shadow-emerald-950/40 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Conversar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('reviews');
                        setShowReviewForm(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-xs font-bold text-purple-300 hover:text-white transition-all"
                    >
                      <Star className="w-4 h-4 text-purple-400 fill-current" />
                      <span>Recomendar</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Identity Details */}
            <div className="space-y-3">
              {displayInEdit ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-sm font-bold text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">Handle Social (@)</label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">Headline / Cargo de Destaque</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                      {role === 'startup' ? 'Nome da Startup' : 'Nome do Fundo / Veículo'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">Localização</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">Website Oficial</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{name}</h1>
                    <span className="text-xs text-zinc-400 font-mono">{handle}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {role === 'startup' ? 'Startup Founder' : 'Investidor VC'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-purple-200/90 font-medium leading-relaxed max-w-3xl">
                    {headline}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-purple-400" />
                      <span className="font-bold text-zinc-200">{companyName}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{location}</span>
                    </div>

                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-purple-400 hover:text-purple-300 underline font-medium"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Website</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}

                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 underline font-medium"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}

                    <div className="flex items-center gap-1 text-emerald-400 font-extrabold tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{profileUser.averageRating.toFixed(1)} ({profileUser.reviewsCount} recomendações)</span>
                    </div>
                  </div>
                </>
              )}

              {/* Bio block */}
              <div className="pt-2">
                {displayInEdit ? (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                      Bio / Sobre Mim (História, Tração & Visão)
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-900/40 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 leading-relaxed"
                    />
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-[#080B16]/60 p-3.5 rounded-2xl border border-purple-950/30">
                    {bio}
                  </p>
                )}
              </div>

              {/* Tag Niches Pills */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Setores de Atuação & Teses</span>
                  {displayInEdit && (
                    <div className="flex items-center gap-1.5">
                      <select
                        value={newNicheInput}
                        onChange={(e) => setNewNicheInput(e.target.value as MarketNiche)}
                        className="text-[11px] bg-[#080B16] border border-purple-900/40 rounded-lg px-2 py-1 text-zinc-200"
                      >
                        <option value="">Selecionar nicho...</option>
                        {ALL_NICHES.filter(n => !niches.includes(n)).map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddNiche}
                        className="px-2 py-1 bg-purple-600 hover:bg-purple-500 rounded-lg text-[10px] font-bold text-white flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {niches.map((niche, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/25"
                    >
                      <span>{niche}</span>
                      {displayInEdit && (
                        <button
                          type="button"
                          onClick={() => handleRemoveNiche(niche)}
                          className="text-purple-400 hover:text-red-400 font-bold ml-1"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* 2. Key Highlights / Tração & Rodada Stat Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {role === 'startup' ? (
            <>
              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1 mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Rodada Alvo</span>
                </span>
                {displayInEdit ? (
                  <input
                    type="text"
                    value={targetRound}
                    onChange={(e) => setTargetRound(e.target.value)}
                    className="w-full px-2 py-1 bg-[#080B16] rounded-lg border border-purple-900/40 text-sm font-extrabold text-white mt-1"
                  />
                ) : (
                  <div className="text-lg font-black text-white">{targetRound}</div>
                )}
                <div className="text-[11px] text-zinc-400 mt-0.5 truncate">{alreadyRaised}</div>
              </div>

              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1 mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Estágio</span>
                </span>
                {displayInEdit ? (
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as FundingStage)}
                    className="w-full px-2 py-1 bg-[#080B16] rounded-lg border border-purple-900/40 text-xs font-bold text-white mt-1"
                  >
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Série A">Série A</option>
                    <option value="Série B">Série B</option>
                  </select>
                ) : (
                  <div className="text-lg font-black text-white">{stage}</div>
                )}
                <div className="text-[11px] text-zinc-400 mt-0.5">Captando ativamente</div>
              </div>

              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>MRR & Tração</span>
                </span>
                {displayInEdit ? (
                  <div className="space-y-1 mt-1">
                    <input
                      type="text"
                      value={mrr}
                      onChange={(e) => setMrr(e.target.value)}
                      className="w-full px-2 py-1 bg-[#080B16] rounded-lg border border-purple-900/40 text-xs font-bold text-white"
                    />
                    <input
                      type="text"
                      value={growthRate}
                      onChange={(e) => setGrowthRate(e.target.value)}
                      className="w-full px-2 py-1 bg-[#080B16] rounded-lg border border-purple-900/40 text-xs font-bold text-emerald-400"
                    />
                  </div>
                ) : (
                  <>
                    <div className="text-lg font-black text-white">{mrr}</div>
                    <div className="text-[11px] text-emerald-400 font-bold mt-0.5">{growthRate}</div>
                  </>
                )}
              </div>

              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Clientes Corporativos</span>
                </span>
                {displayInEdit ? (
                  <input
                    type="number"
                    value={activeClients}
                    onChange={(e) => setActiveClients(Number(e.target.value))}
                    className="w-full px-2 py-1 bg-[#080B16] rounded-lg border border-purple-900/40 text-sm font-extrabold text-white mt-1"
                  />
                ) : (
                  <div className="text-lg font-black text-white">{activeClients} contas</div>
                )}
                <div className="text-[11px] text-zinc-400 mt-0.5">Contratos B2B ativos</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1 mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Ticket Médio</span>
                </span>
                {displayInEdit ? (
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    <input
                      type="number"
                      value={ticketMin}
                      onChange={(e) => setTicketMin(Number(e.target.value))}
                      className="w-16 px-1.5 py-1 bg-[#080B16] rounded border border-purple-900/40 text-white"
                    />
                    <span>k a</span>
                    <input
                      type="number"
                      value={ticketMax}
                      onChange={(e) => setTicketMax(Number(e.target.value))}
                      className="w-16 px-1.5 py-1 bg-[#080B16] rounded border border-purple-900/40 text-white"
                    />
                    <span>k</span>
                  </div>
                ) : (
                  <div className="text-lg font-black text-white">
                    R$ {ticketMin}k – R$ {(ticketMax / 1000).toFixed(1)}M
                  </div>
                )}
                <div className="text-[11px] text-zinc-400 mt-0.5">Por operação</div>
              </div>

              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>AUM Total</span>
                </span>
                {displayInEdit ? (
                  <input
                    type="text"
                    value={aum}
                    onChange={(e) => setAum(e.target.value)}
                    className="w-full px-2 py-1 bg-[#080B16] rounded-lg border border-purple-900/40 text-sm font-extrabold text-white mt-1"
                  />
                ) : (
                  <div className="text-lg font-black text-white">{aum}</div>
                )}
                <div className="text-[11px] text-zinc-400 mt-0.5">Ativos sob gestão</div>
              </div>

              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1 mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Portfólio</span>
                </span>
                <div className="text-lg font-black text-white">{profileUser.portfolioItems?.length || 19} Startups</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Investidas ativas</div>
              </div>

              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
                  <Star className="w-3.5 h-3.5" />
                  <span>Reputação EloLink</span>
                </span>
                <div className="text-lg font-black text-emerald-400 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{profileUser.averageRating.toFixed(1)} / 5.0</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">{profileUser.reviewsCount} depoimentos verificados</div>
              </div>
            </>
          )}
        </section>

        {/* Quick Maturity Callout Banner for Startups */}
        {role === 'startup' && (
          <div 
            onClick={() => setActiveTab('canvas')}
            className="group cursor-pointer bg-gradient-to-r from-purple-950/40 via-[#0E1326] to-emerald-950/30 border border-purple-900/40 hover:border-purple-500/60 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-white">
                    Business Model Canvas & Nível de Maturidade
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {canvasData?.maturityStage || 'Product-Market Fit'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300">
                    Score {canvasData?.maturityScore || 86}/100
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                  Mapeamento dos 9 blocos estratégicos, validação de hipóteses e unit economics para investidores.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="px-3 py-1.5 rounded-xl bg-purple-600/30 group-hover:bg-purple-600 text-xs font-bold text-white transition-all shrink-0 flex items-center gap-1 shadow-sm"
            >
              <span>Ver Canvas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3. Social Media Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-purple-950/50 pb-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'about'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Sobre & Tese
          </button>

          {/* Business Model Canvas Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'canvas'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-purple-300" />
            <span>Business Model Canvas</span>
            {canvasData?.maturityScore && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                Score {canvasData.maturityScore}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'posts'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <span>Publicações</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {userPosts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'portfolio'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            {role === 'startup' ? 'Produtos & Tração' : 'Investimentos & Portfólio'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <span>Recomendações</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {profileUser.reviews?.length || 0}
            </span>
          </button>
        </div>

        {/* 4. Tab Content */}
        
        {/* TAB 1: Sobre & Tese */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            
            <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>{role === 'startup' ? 'Proposta de Valor e Modelo de Negócio' : 'Tese de Investimento Detalhada'}</span>
              </h3>

              {role === 'startup' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#080B16] p-4 rounded-xl border border-purple-950/30">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                      O Problema de Mercado
                    </span>
                    {displayInEdit ? (
                      <textarea
                        rows={3}
                        value={problemSummary}
                        onChange={(e) => setProblemSummary(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-[#0C0F1D] rounded-lg border border-purple-900/40 text-xs text-zinc-200"
                      />
                    ) : (
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {problemSummary || 'Gargalos operacionais e fluxos manuais corporativos demandam centenas de horas improdutivas.'}
                      </p>
                    )}
                  </div>

                  <div className="bg-[#080B16] p-4 rounded-xl border border-purple-950/30">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                      A Solução com IA
                    </span>
                    {displayInEdit ? (
                      <textarea
                        rows={3}
                        value={solutionSummary}
                        onChange={(e) => setSolutionSummary(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-[#0C0F1D] rounded-lg border border-purple-900/40 text-xs text-zinc-200"
                      />
                    ) : (
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {solutionSummary || 'Plataforma autônoma que orquestra conexões com ERPs legados e automatiza decisões críticas em tempo real.'}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-[#080B16] p-4 rounded-xl border border-purple-950/30">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                    Critérios de Seleção & Tese
                  </span>
                  {displayInEdit ? (
                    <textarea
                      rows={4}
                      value={thesis}
                      onChange={(e) => setThesis(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#0C0F1D] rounded-lg border border-purple-900/40 text-xs text-zinc-200"
                    />
                  ) : (
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {thesis || 'Buscamos fundadores técnicos com alto grau de especialização de domínio, focados em dores de alta frequência empresarial.'}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Pitch Deck Card */}
            <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{pitchDeckName}</h4>
                    <p className="text-[11px] text-zinc-400">Material confidencial para investidores credenciados</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDeckDownloaded(true);
                      setTimeout(() => setDeckDownloaded(false), 3000);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                      deckDownloaded ? 'bg-emerald-600 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>{deckDownloaded ? 'Deck Aberto em Nova Aba' : 'Acessar Deck'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Video Pitch section if available */}
            {profileUser.videoPitch && (
              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-5 shadow-xl">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-2 mb-3">
                  <Video className="w-4 h-4 text-purple-400" />
                  <span>Vídeo Pitch & Demonstração</span>
                </h3>
                <div className="max-w-2xl">
                  <VideoPitchPlayer
                    pitch={profileUser.videoPitch}
                    author={profileUser}
                    onConnect={() => onConnectUser(profileUser)}
                    onOpenChat={() => onStartChat(profileUser)}
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB: Business Model Canvas & Nível de Maturidade */}
        {activeTab === 'canvas' && (
          <BusinessModelCanvasView
            canvas={canvasData}
            isOwnProfile={isOwnProfile}
            isEditing={displayInEdit}
            onUpdateCanvas={handleUpdateCanvas}
            companyName={companyName}
          />
        )}

        {/* TAB 2: Publicações */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            
            {/* Quick Post Box on Own Profile */}
            {isOwnProfile && (
              <form onSubmit={handleProfilePostSubmit} className="bg-[#0C0F1D] border border-purple-900/40 rounded-2xl p-4 shadow-xl space-y-3">
                <div className="flex items-center gap-3">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-xl object-cover ring-1 ring-purple-500/40" />
                  <input
                    type="text"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Publique um update, marco de tração ou novidade no feed..."
                    className="flex-1 px-3 py-2 bg-[#080B16] rounded-xl border border-purple-950/40 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-zinc-400">Tipo:</span>
                    <select
                      value={newPostType}
                      onChange={(e) => setNewPostType(e.target.value as any)}
                      className="text-xs bg-[#080B16] border border-purple-900/30 rounded-lg px-2.5 py-1 text-zinc-200"
                    >
                      <option value="opportunity">Oportunidade de Captação</option>
                      <option value="video_pitch">Pitch & Demonstração</option>
                      <option value="thesis">Tese & Insight</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!newPostText.trim()}
                    className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publicar</span>
                  </button>
                </div>
              </form>
            )}

            {/* Post Feed List */}
            {userPosts.length === 0 ? (
              <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-8 text-center text-zinc-400">
                <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-2 opacity-60" />
                <p className="text-xs font-bold text-zinc-300">Nenhuma publicação registrada ainda.</p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  {isOwnProfile ? 'Compartilhe marcos da sua rodada para gerar interesse de investidores.' : 'Este usuário ainda não postou novidades públicas.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {userPosts.map((post) => (
                  <article key={post.id} className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={post.author?.avatar} alt={post.author?.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/30" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{post.author?.name}</h4>
                          <p className="text-[11px] text-zinc-400">{post.author?.headline || post.author?.companyName || post.author?.fundName} · {post.timestamp}</p>
                        </div>
                      </div>

                      {post.financialHighlight && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {post.financialHighlight}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      {post.content}
                    </p>

                    {post.videoPitch && (
                      <div className="pt-2">
                        <VideoPitchPlayer
                          pitch={post.videoPitch}
                          author={post.author}
                          onConnect={() => onConnectUser(post.author)}
                          onOpenChat={() => onStartChat(post.author)}
                          compact
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-2 border-t border-purple-950/30 text-xs text-zinc-400">
                      <button
                        type="button"
                        onClick={() => onLikePost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.userLiked ? 'text-red-400 font-bold' : 'hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.commentsCount} comentários</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyProfileLink}
                        className="flex items-center gap-1.5 hover:text-purple-300 transition-colors ml-auto"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Compartilhar</span>
                      </button>
                    </div>

                    {activeCommentPostId === post.id && (
                      <div className="pt-2 border-t border-purple-950/20 space-y-2 animate-in fade-in duration-150">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={commentInputMap[post.id] || ''}
                            onChange={(e) => setCommentInputMap({ ...commentInputMap, [post.id]: e.target.value })}
                            placeholder="Escreva uma resposta..."
                            className="flex-1 px-3 py-1.5 bg-[#080B16] rounded-xl border border-purple-950/40 text-xs text-zinc-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const txt = commentInputMap[post.id]?.trim();
                              if (txt) {
                                onAddComment(post.id, txt);
                                setCommentInputMap({ ...commentInputMap, [post.id]: '' });
                              }
                            }}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white"
                          >
                            Enviar
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: Portfólio / Produtos */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(profileUser.portfolioItems || []).map((item) => (
                <div key={item.id} className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 font-black text-white flex items-center justify-center text-sm shadow-md">
                        {item.logoText}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="text-[11px] text-purple-300">{item.sector} · {item.stage}</span>
                      </div>
                    </div>

                    {item.metricHighlight && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.metricHighlight}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-purple-950/30 text-[11px] text-zinc-400">
                    <span>Status: <strong className="text-zinc-200">{item.status || 'Ativo'}</strong></span>
                    {item.targetAmount && <span>Captação: <strong className="text-white">{item.targetAmount}</strong></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Recomendações & Avaliações */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            
            <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
                  <div className="text-3xl font-black text-emerald-400 tabular-nums">
                    {profileUser.averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center gap-0.5 mt-1 text-emerald-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Score de Confiança & Reputação</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Baseado em {profileUser.reviewsCount} avaliações validadas por investidores e pares
                  </p>
                </div>
              </div>

              {!isOwnProfile && (
                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-950/40 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Escrever Recomendação</span>
                </button>
              )}
            </div>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-[#0C0F1D] border border-purple-900/40 rounded-2xl p-5 shadow-xl space-y-4 animate-in fade-in duration-200">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
                  Deixar Recomendação para {profileUser.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 mb-1">Sua Relação com este Perfil</label>
                    <input
                      type="text"
                      value={reviewRole}
                      onChange={(e) => setReviewRole(e.target.value)}
                      placeholder="Ex: Co-investidor, Mentor, Parceiro Comercial"
                      className="w-full px-3 py-1.5 bg-[#080B16] rounded-xl border border-purple-950/40 text-xs text-zinc-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 mb-1">Nota em Estrelas</label>
                    <div className="flex items-center gap-1 pt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewRating(s)}
                          className={`p-1 text-sm ${s <= reviewRating ? 'text-amber-400' : 'text-zinc-600'}`}
                        >
                          <Star className={`w-5 h-5 ${s <= reviewRating ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 mb-1">Depoimento Detalhado</label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Descreva a capacidade de entrega, transparência ou valor gerado..."
                    className="w-full px-3 py-2 bg-[#080B16] rounded-xl border border-purple-950/40 text-xs text-zinc-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-black"
                  >
                    Publicar Depoimento
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {(profileUser.reviews || []).map((rev) => (
                <div key={rev.id} className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={rev.authorAvatar} alt={rev.authorName} className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/30" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{rev.authorName}</h4>
                        <p className="text-[11px] text-zinc-400">{rev.authorRole} · {rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  {rev.tags && rev.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {rev.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
