import React, { useState } from 'react';
import { UserProfile, Post, MarketNiche, FundingStage, VideoPitch } from '../types';
import { 
  X, 
  Send, 
  Image as ImageIcon, 
  Video, 
  BarChart2, 
  Hash, 
  Globe, 
  ChevronDown, 
  Sparkles, 
  Film, 
  Play, 
  Check, 
  DollarSign, 
  Trash2,
  Lock,
  Smile
} from 'lucide-react';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSubmitPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'commentsCount' | 'sharesCount'>) => void;
}

const AVAILABLE_NICHES: MarketNiche[] = [
  'AI & B2B SaaS',
  'Healthtech',
  'Fintech',
  'Cleantech & Clima',
  'Agtech',
  'Logtech & Supply'
];

const SUGGESTED_HASHTAGS = [
  'RodadaAberta',
  'SeedRound',
  'AIEnterprise',
  'UnitEconomics',
  'PitchDeck',
  'Healthtech',
  'Fintech'
];

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmitPost
}) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<Post['type']>(
    currentUser.role === 'startup' ? 'opportunity' : 'thesis'
  );
  const [selectedNiche, setSelectedNiche] = useState<MarketNiche>(
    currentUser.niches[0] || 'AI & B2B SaaS'
  );
  const [stage, setStage] = useState<FundingStage>(currentUser.stage || 'Seed');
  const [audience, setAudience] = useState<'public' | 'investors_only'>('public');
  const [showAudienceMenu, setShowAudienceMenu] = useState(false);

  // Organic attachments
  const [attachedVideoPitch, setAttachedVideoPitch] = useState<boolean>(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [financialHighlight, setFinancialHighlight] = useState<string>(
    currentUser.role === 'startup' ? 'Rodada Seed • Alvo: R$ 3.5M' : 'Cheque Seed: R$ 500k - R$ 2M'
  );
  const [showFinancialInput, setShowFinancialInput] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'RodadaAberta',
    currentUser.role === 'startup' ? 'SeedRound' : 'TeseVC'
  ]);
  const [showTagsSelector, setShowTagsSelector] = useState(false);

  if (!isOpen) return null;

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleAttachImagePreset = () => {
    if (attachedImage) {
      setAttachedImage(null);
    } else {
      setAttachedImage('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80');
    }
  };

  const handleToggleVideoPitch = () => {
    setAttachedVideoPitch(prev => !prev);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim() && !attachedVideoPitch && !attachedImage) return;

    let finalVideoPitch: VideoPitch | undefined = undefined;
    if (attachedVideoPitch) {
      finalVideoPitch = currentUser.videoPitch || {
        title: `${currentUser.companyName || currentUser.name}: Apresentação da Oportunidade`,
        duration: '02:14',
        viewsCount: 142,
        thumbnail: currentUser.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        speakerName: currentUser.name,
        speakerRole: currentUser.headline,
        keyProblem: currentUser.problemSummary || 'Gargalo operacional de escala no mercado B2B.',
        keySolution: currentUser.solutionSummary || 'Solução automatizada via inteligência verticalizada.',
        metricsKicker: currentUser.mrr ? `MRR ${currentUser.mrr}` : 'Crescimento de +25% MoM'
      };
    }

    onSubmitPost({
      author: currentUser,
      type: attachedVideoPitch ? 'video_pitch' : postType,
      content: content.trim(),
      niche: selectedNiche,
      stage,
      financialHighlight: showFinancialInput || financialHighlight ? financialHighlight : undefined,
      location: currentUser.location,
      tags: selectedTags.length > 0 ? selectedTags : ['EloLink'],
      mediaUrl: attachedImage || undefined,
      mediaType: attachedImage ? 'image' : undefined,
      videoPitch: finalVideoPitch
    });

    // Reset and close
    setContent('');
    setAttachedVideoPitch(false);
    setAttachedImage(null);
    onClose();
  };

  const isPostable = content.trim().length > 0 || attachedVideoPitch || Boolean(attachedImage);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#080B16] border border-purple-900/40 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Organic Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-950/40">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white tracking-tight">Criar publicação</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#11162B] hover:bg-purple-950/40 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Composer Body */}
        <div className="px-4 sm:px-6 py-4 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
          
          {/* Author info & Audience Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#080B16]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white truncate">{currentUser.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {currentUser.role === 'startup' ? 'Founder' : 'Investidor'}
                </span>
              </div>
              
              {/* Audience Pill */}
              <div className="relative inline-block mt-1">
                <button
                  type="button"
                  onClick={() => setShowAudienceMenu(!showAudienceMenu)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#11162B] hover:bg-purple-950/40 border border-purple-950/40 text-[11px] font-medium text-slate-300 transition-colors"
                >
                  {audience === 'public' ? (
                    <>
                      <Globe className="w-3 h-3 text-emerald-400" />
                      <span>Qualquer pessoa</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-purple-400" />
                      <span>Investidores & Startups</span>
                    </>
                  )}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showAudienceMenu && (
                  <div className="absolute left-0 top-full mt-1.5 w-60 bg-[#0C0F1D] border border-purple-900/40 rounded-2xl shadow-xl z-20 p-2 text-xs">
                    <button
                      type="button"
                      onClick={() => { setAudience('public'); setShowAudienceMenu(false); }}
                      className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition-colors ${audience === 'public' ? 'bg-purple-900/40 text-white' : 'hover:bg-purple-950/30 text-slate-300'}`}
                    >
                      <Globe className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Qualquer pessoa</div>
                        <div className="text-[10px] text-slate-400">Visível no feed público e aberto da rede</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAudience('investors_only'); setShowAudienceMenu(false); }}
                      className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition-colors ${audience === 'investors_only' ? 'bg-purple-900/40 text-white' : 'hover:bg-purple-950/30 text-slate-300'}`}
                    >
                      <Lock className="w-4 h-4 text-purple-400 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Investidores & Startups</div>
                        <div className="text-[10px] text-slate-400">Apenas perfis credenciados no ecossistema</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Organic Social Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setPostType('opportunity')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                postType === 'opportunity'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Oportunidade & Rodada</span>
            </button>

            <button
              type="button"
              onClick={() => setPostType('thesis')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                postType === 'thesis'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'bg-[#11162B] text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Tese & Insight</span>
            </button>

            <button
              type="button"
              onClick={() => setPostType('traction_update')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                postType === 'traction_update'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                  : 'bg-[#11162B] text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Tração & Métricas</span>
            </button>
          </div>

          {/* Main Natural Textarea */}
          <div className="relative">
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                currentUser.role === 'startup'
                  ? 'No que a sua startup está avançando hoje? Compartilhe um marco, números da rodada, ou novos clientes conquistados...'
                  : 'Compartilhe uma tese de investimento, setores em que está buscando startups ou um conselho para fundadores...'
              }
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed"
              autoFocus
            />
          </div>

          {/* Video Pitch Attachment Card Preview */}
          {attachedVideoPitch && (
            <div className="relative bg-[#0C0F1D] border border-purple-500/40 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-lg group">
              <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-black shrink-0">
                <img
                  src={currentUser.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80'}
                  alt="Pitch thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-black flex items-center justify-center shadow-md">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-black/80 text-white px-1 rounded">
                  02:14
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <Film className="w-3.5 h-3.5" />
                  <span>Vídeo Pitch Interativo Anexado</span>
                </div>
                <h5 className="text-xs font-bold text-white truncate">
                  {currentUser.companyName || currentUser.name}: Pitch Deck 2 Minutos
                </h5>
                <p className="text-[11px] text-slate-400 truncate">
                  Inclui problema, solução, métricas de tração e dados da rodada.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAttachedVideoPitch(false)}
                className="w-7 h-7 rounded-full bg-[#11162B] hover:bg-purple-950/50 hover:text-purple-400 text-slate-400 flex items-center justify-center transition-colors"
                title="Remover vídeo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Image Attachment Card Preview */}
          {attachedImage && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 max-h-56">
              <img
                src={attachedImage}
                alt="Upload preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                title="Remover imagem"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Financial / Round Highlight Input (if enabled) */}
          {showFinancialInput && (
            <div className="bg-[#0A0F1D] border border-slate-800 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Destaque da Rodada / Ticket
                </span>
                <button
                  type="button"
                  onClick={() => setShowFinancialInput(false)}
                  className="text-slate-500 hover:text-slate-300 text-[11px]"
                >
                  Ocultar
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={financialHighlight}
                  onChange={(e) => setFinancialHighlight(e.target.value)}
                  placeholder="Ex: Rodada Seed • Alvo: R$ 3.500.000"
                  className="flex-1 bg-slate-900/90 text-xs text-white px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500"
                />
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as FundingStage)}
                  className="bg-slate-900/90 text-xs text-white px-2.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-violet-500"
                >
                  <option value="Pre-seed">Pre-seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Série A">Série A</option>
                  <option value="Série B">Série B</option>
                </select>
              </div>
            </div>
          )}

          {/* Nicho Selection Chips */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Nicho de Mercado
            </span>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_NICHES.map(niche => (
                <button
                  key={niche}
                  type="button"
                  onClick={() => setSelectedNiche(niche)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedNiche === niche
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                      : 'bg-[#0C0F1D] text-slate-400 hover:text-slate-200 border border-purple-950/40'
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Hashtags Chips */}
          {showTagsSelector && (
            <div className="bg-[#0C0F1D] p-3 rounded-2xl border border-purple-950/40 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Hashtags sugeridas para engajamento
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_HASHTAGS.map(tag => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                          : 'bg-[#11162B] text-slate-400 hover:text-white border border-purple-950/30'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Organic Bottom Toolbar (LinkedIn / Twitter style) */}
        <div className="px-6 py-3.5 border-t border-purple-950/40 bg-[#06080F]/90 flex items-center justify-between gap-3">
          
          {/* Quick attachment icons */}
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              onClick={handleToggleVideoPitch}
              className={`p-2 rounded-xl transition-colors ${
                attachedVideoPitch 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'hover:bg-slate-800 hover:text-emerald-400'
              }`}
              title="Anexar Vídeo Pitch (60s - 2min)"
            >
              <Video className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleAttachImagePreset}
              className={`p-2 rounded-xl transition-colors ${
                attachedImage 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'hover:bg-purple-950/40 hover:text-purple-400'
              }`}
              title="Adicionar Foto / Slide do Deck"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setShowFinancialInput(!showFinancialInput)}
              className={`p-2 rounded-xl transition-colors ${
                showFinancialInput 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-purple-950/40 hover:text-blue-400'
              }`}
              title="Informações da Rodada / Ticket"
            >
              <DollarSign className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setShowTagsSelector(!showTagsSelector)}
              className={`p-2 rounded-xl transition-colors ${
                showTagsSelector 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'hover:bg-purple-950/40 hover:text-emerald-400'
              }`}
              title="Hashtags e Tópicos"
            >
              <Hash className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setContent(prev => prev + ' 🚀 ')}
              className="p-2 rounded-xl hover:bg-purple-950/40 hover:text-purple-400 transition-colors hidden sm:block"
              title="Adicionar Emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {/* Right Submit Actions */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 tabular-nums hidden sm:inline">
              {content.length} carac.
            </span>

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!isPostable}
              className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                isPostable
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-950/50 cursor-pointer active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
