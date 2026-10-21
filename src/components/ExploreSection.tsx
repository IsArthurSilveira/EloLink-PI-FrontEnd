import React, { useState } from 'react';
import { UserProfile, MarketNiche, FundingStage, FounderExperience, UserRole } from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Briefcase, 
  Star, 
  ShieldCheck, 
  ChevronRight, 
  X,
  Sparkles,
  Layers,
  DollarSign
} from 'lucide-react';

interface ExploreSectionProps {
  profiles: UserProfile[];
  onOpenProfile: (user: UserProfile) => void;
  onConnectWith: (user: UserProfile) => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  profiles,
  onOpenProfile,
  onConnectWith
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [selectedNiche, setSelectedNiche] = useState<MarketNiche | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<FundingStage | 'all'>('all');
  const [selectedExperience, setSelectedExperience] = useState<FounderExperience | 'all'>('all');

  const locations = ['São Paulo', 'Belo Horizonte', 'Florianópolis', 'Curitiba', 'San Francisco'];
  const niches: MarketNiche[] = [
    'AI & B2B SaaS',
    'Fintech',
    'Healthtech',
    'Cleantech & Clima',
    'Agtech',
    'Logtech & Supply'
  ];
  const stages: FundingStage[] = ['Pre-seed', 'Seed', 'Série A', 'Série B'];
  const experiences: FounderExperience[] = [
    'Ex-BigTech / Unicornio',
    'Serial Founder (Exits)',
    '10+ anos no mercado corporativo',
    'Pesquisador / PhD Acadêmico'
  ];

  // Filtering logic
  const filteredProfiles = profiles.filter(p => {
    // Role
    if (selectedRole !== 'all' && p.role !== selectedRole) return false;

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchHeadline = p.headline.toLowerCase().includes(q);
      const matchCompany = (p.companyName || p.fundName || '').toLowerCase().includes(q);
      const matchBio = p.bio.toLowerCase().includes(q);
      if (!matchName && !matchHeadline && !matchCompany && !matchBio) return false;
    }

    // Niche
    if (selectedNiche !== 'all' && !p.niches.includes(selectedNiche)) return false;

    // Location
    if (selectedLocation !== 'all' && !p.location.includes(selectedLocation)) return false;

    // Stage
    if (selectedStage !== 'all') {
      if (p.role === 'startup' && p.stage !== selectedStage) return false;
      if (p.role === 'investor' && !p.preferredStages?.includes(selectedStage)) return false;
    }

    // Experience
    if (selectedExperience !== 'all' && !p.experience.includes(selectedExperience)) return false;

    return true;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRole('all');
    setSelectedNiche('all');
    setSelectedLocation('all');
    setSelectedStage('all');
    setSelectedExperience('all');
  };

  const hasActiveFilters = 
    selectedRole !== 'all' || 
    selectedNiche !== 'all' || 
    selectedLocation !== 'all' || 
    selectedStage !== 'all' || 
    selectedExperience !== 'all' || 
    searchTerm.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-white mb-2">
          Explorar Startups e Investidores
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Utilize os filtros inteligentes de localização, maturidade, experiência e nicho para encontrar o parceiro ideal.
        </p>
      </div>

      {/* Main Search & Filter Box */}
      <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3.5 sm:p-5 mb-6 sm:mb-8 shadow-sm space-y-4">
        
        {/* Search bar & Role tabs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por nome, empresa, tese ou palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#080B16] text-xs text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-purple-950/40 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center p-1 bg-[#080B16] rounded-xl border border-purple-950/40 shrink-0 overflow-x-auto">
            <button
              onClick={() => setSelectedRole('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedRole === 'all' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({profiles.length})
            </button>
            <button
              onClick={() => setSelectedRole('startup')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedRole === 'startup' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Startups
            </button>
            <button
              onClick={() => setSelectedRole('investor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedRole === 'investor' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Investidores & VCs
            </button>
          </div>
        </div>

        {/* Advanced Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-purple-950/40 text-xs">
          
          {/* Niche */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Área de Atuação / Nicho
            </label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value as any)}
              className="w-full bg-[#080B16] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-purple-950/40 focus:outline-none focus:border-purple-500"
            >
              <option value="all">Todos os Nichos</option>
              {niches.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Localização
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[#080B16] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-purple-950/40 focus:outline-none focus:border-purple-500"
            >
              <option value="all">Todas as Regiões</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Stage */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Estágio de Captação
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value as any)}
              className="w-full bg-[#080B16] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-purple-950/40 focus:outline-none focus:border-purple-500"
            >
              <option value="all">Todos os Estágios</option>
              {stages.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Experiência dos Founders
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value as any)}
              className="w-full bg-[#080B16] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-purple-950/40 focus:outline-none focus:border-purple-500"
            >
              <option value="all">Qualquer Experiência</option>
              {experiences.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Clear Filters bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-slate-400">
              Mostrando <strong className="text-emerald-400 tabular-nums">{filteredProfiles.length}</strong> resultados filtrados
            </span>
            <button
              onClick={clearFilters}
              className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpar Filtros</span>
            </button>
          </div>
        )}

      </div>

      {/* Directory Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="bg-[#0D1527] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">Nenhum perfil encontrado</h3>
          <p className="text-xs max-w-sm mx-auto mb-4">
            Tente flexibilizar os filtros de localização ou estágio para ver mais membros do ecossistema.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Redefinir Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProfiles.map(profile => (
            <div
              key={profile.id}
              className="bg-[#0C0F1D] border border-purple-950/40 hover:border-purple-800/60 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-black/40"
            >
              <div>
                
                {/* Header */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/50 group-hover:ring-emerald-400 transition-all"
                    />
                    {profile.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 absolute -bottom-1 -right-1 bg-[#0C0F1D] rounded-full" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-purple-300 font-semibold truncate">
                      {profile.role === 'startup' ? profile.companyName : profile.fundName}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span className="truncate max-w-[120px]">{profile.location}</span>
                      </span>
                      <span>·</span>
                      <span className="text-emerald-400 font-bold tabular-nums">
                        ★ {profile.averageRating.toFixed(1)} ({profile.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Headline / Bio */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {profile.headline}
                </p>

                {/* Key Metrics / Attributes */}
                <div className="p-3 rounded-xl bg-[#080B16] border border-purple-950/40 mb-4 text-xs space-y-1.5">
                  {profile.role === 'startup' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Estágio:</span>
                        <span className="font-semibold text-white">{profile.stage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Meta da Rodada:</span>
                        <span className="font-bold text-emerald-400 tabular-nums">{profile.targetRound || 'R$ 2.5M'}</span>
                      </div>
                      {profile.mrr && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Tração MRR:</span>
                          <span className="font-semibold text-white tabular-nums">{profile.mrr}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Ticket Médio:</span>
                        <span className="font-bold text-emerald-400 tabular-nums">
                          R$ {profile.ticketRange?.min}k - R$ {(profile.ticketRange?.max || 2000) / 1000}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fundo / AUM:</span>
                        <span className="font-semibold text-white tabular-nums">{profile.aum || 'R$ 50M'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Portfólio:</span>
                        <span className="font-semibold text-purple-300 tabular-nums">{profile.portfolioCount || 12} investidas</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Niches tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {profile.niches.map(n => (
                    <span
                      key={n}
                      className="text-[10px] font-medium text-slate-300 bg-[#11162B] px-2 py-0.5 rounded border border-purple-950/30"
                    >
                      {n}
                    </span>
                  ))}
                </div>

              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-purple-950/40 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenProfile(profile)}
                  className="flex-1 py-1.5 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-[#11162B] hover:bg-purple-950/40 rounded-lg transition-colors text-center border border-purple-950/30"
                >
                  Ver Dossiê
                </button>
                <button
                  onClick={() => onConnectWith(profile)}
                  className="py-1.5 px-3 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Conectar</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
