import React, { useState } from 'react';
import { UserProfile, Review, PortfolioItem } from '../types';
import { 
  X, 
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
  Award
} from 'lucide-react';

interface ProfileModalProps {
  user: UserProfile | null;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (user: UserProfile) => void;
  onAddReview: (targetUserId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  currentUser,
  isOpen,
  onClose,
  onStartChat,
  onAddReview
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview');
  
  // Review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [roleText, setRoleText] = useState('Parceiro de Co-investimento');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Smart Money', 'Governança Ágil']);

  if (!isOpen || !user) return null;

  const availableTags = ['Smart Money', 'Governança Ágil', 'Execução Veloz', 'Transparência', 'Resiliência', 'Acesso a Clientes'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddReview(user.id, {
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: `${roleText} · ${currentUser.role === 'startup' ? currentUser.companyName : currentUser.fundName}`,
      authorAvatar: currentUser.avatar,
      targetId: user.id,
      rating,
      comment: comment.trim(),
      tags: selectedTags
    });

    setComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#080B16] border border-purple-900/40 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Header with Close */}
        <div className="relative bg-gradient-to-r from-purple-950/70 via-blue-950/50 to-[#0A0D18] p-4 sm:p-6 border-b border-purple-950/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/50 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-purple-500/50"
              />
              {user.verified && (
                <ShieldCheck className="w-5 h-5 text-emerald-400 absolute -bottom-1 -right-1 bg-[#080B16] rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white truncate">{user.name}</h2>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                  {user.role === 'startup' ? 'Startup Founder' : 'Investidor VC'}
                </span>
              </div>

              <p className="text-xs text-purple-300 font-semibold mb-2">
                {user.role === 'startup' ? user.companyName : user.fundName} · {user.headline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user.location}</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{user.averageRating.toFixed(1)} / 5.0 ({user.reviewsCount} avaliações)</span>
                </span>
              </div>
            </div>

            {/* Direct Connect / Chat button */}
            {currentUser.id !== user.id && (
              <button
                onClick={() => {
                  onClose();
                  onStartChat(user);
                }}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar</span>
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 pt-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-[#11162B]'
              }`}
            >
              Dossiê & Métricas
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'portfolio'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-[#11162B]'
              }`}
            >
              Portfólio ({user.portfolioItems?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-[#11162B]'
              }`}
            >
              Avaliações de Parceiros ({user.reviews?.length || 0})
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tese & Resumo Executivo
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#0C0F1D] p-4 rounded-xl border border-purple-950/40">
                  {user.bio}
                </p>
              </div>

              {/* Startup Specific Financial Highlights */}
              {user.role === 'startup' && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Métricas da Rodada & Tração
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                      <span className="text-[10px] text-slate-400 block mb-0.5">Estágio</span>
                      <span className="font-bold text-white">{user.stage}</span>
                    </div>
                    <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                      <span className="text-[10px] text-slate-400 block mb-0.5">Alvo da Rodada</span>
                      <span className="font-bold text-emerald-400 tabular-nums">{user.targetRound}</span>
                    </div>
                    <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                      <span className="text-[10px] text-slate-400 block mb-0.5">MRR Atual</span>
                      <span className="font-bold text-white tabular-nums">{user.mrr}</span>
                    </div>
                    <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                      <span className="text-[10px] text-slate-400 block mb-0.5">Crescimento</span>
                      <span className="font-bold text-purple-400 tabular-nums">{user.growthRate}</span>
                    </div>
                  </div>

                  {/* Pitch Deck Preview Block */}
                  {user.pitchDeckName && (
                    <div className="mt-4 p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{user.pitchDeckName}</p>
                          <p className="text-[10px] text-slate-400">Pitch Deck Oficial · Confidencial</p>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Download de ${user.pitchDeckName} realizado!`)}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar Deck</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Investor Specific Metrics */}
              {user.role === 'investor' && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Parâmetros do Fundo & Investimentos
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                      <span className="text-[10px] text-slate-400 block mb-0.5">Ticket Médio</span>
                      <span className="font-bold text-emerald-400 tabular-nums">
                        R$ {user.ticketRange?.min}k - R$ {(user.ticketRange?.max || 2000) / 1000}M
                      </span>
                    </div>
                    <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                      <span className="text-[10px] text-slate-400 block mb-0.5">Fundo / AUM</span>
                      <span className="font-bold text-white tabular-nums">{user.aum}</span>
                    </div>
                    <div className="p-3 bg-[#0C0F1D] rounded-xl border border-purple-950/40">
                      <span className="text-[10px] text-slate-400 block mb-0.5">Investidas Ativas</span>
                      <span className="font-bold text-purple-400 tabular-nums">{user.portfolioCount} empresas</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Niches & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0C0F1D] border border-purple-950/40">
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Nichos de Mercado
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {user.niches.map(n => (
                      <span key={n} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-950/40 text-purple-300 border border-purple-800/40">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C0F1D] border border-purple-950/40">
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Histórico & Experiência
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {user.experience.map(e => (
                      <span key={e} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#11162B] text-slate-300 border border-purple-900/30">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {user.role === 'startup' ? 'Produtos & Módulos em Tração' : 'Empresas Investidas no Portfólio'}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.portfolioItems?.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#0A0F1D] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                            {item.logoText}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">{item.name}</h5>
                            <span className="text-[10px] text-slate-400">{item.sector}</span>
                          </div>
                        </div>
                        {item.status && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {item.status}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    {item.metricHighlight && (
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Tração:</span>
                        <span className="font-bold text-emerald-400 tabular-nums">{item.metricHighlight}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS & TESTIMONIALS */}
          {activeTab === 'reviews' && (
            <div className="space-y-5">
              
              {/* Header with Add Review Button */}
              <div className="flex items-center justify-between pb-3 border-b border-purple-950/40">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Avaliações de Parceiros & Co-investidores
                  </h4>
                  <p className="text-xs text-slate-400">
                    Média de <strong className="text-emerald-400 tabular-nums">{user.averageRating.toFixed(1)} / 5.0</strong> baseada em {user.reviewsCount} depoimentos verificados.
                  </p>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Avaliar Parceiro</span>
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="p-4 rounded-xl bg-[#0C0F1D] border border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Sua Avaliação de Reputação:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(st => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setRating(st)}
                          className="p-1 focus:outline-none"
                        >
                          <Star className={`w-4 h-4 ${st <= rating ? 'text-emerald-400 fill-current' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Seu papel na relação (Ex: Lead Investor, Mentor, Co-fundador):
                    </label>
                    <input
                      type="text"
                      value={roleText}
                      onChange={(e) => setRoleText(e.target.value)}
                      className="w-full bg-[#11162B] text-xs text-slate-200 rounded-lg px-3 py-2 border border-purple-950/40 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Comentário / Testemunho da experiência de parceria:
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Descreva a governança, integridade, agilidade na tomada de decisão ou capacidade de entrega..."
                      className="w-full bg-[#11162B] text-xs text-slate-200 rounded-lg p-3 border border-purple-950/40 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Tags de Destaque:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-emerald-500 text-black font-bold'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publicar Avaliação</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-3.5">
                {user.reviews?.map(rev => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-[#0C0F1D] border border-purple-950/40 flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-purple-900/40"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{rev.authorName}</p>
                          <p className="text-[10px] text-slate-400">{rev.authorRole}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'text-emerald-400 fill-current' : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-wrap gap-1">
                        {rev.tags.map(t => (
                          <span key={t} className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 tabular-nums">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
