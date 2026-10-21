import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  MoreVertical, 
  Search, 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  Users,
  Briefcase,
  Check
} from 'lucide-react';

interface LeftSidebarProfileProps {
  currentUser: UserProfile;
  onOpenProfile: (user: UserProfile) => void;
  onNavigateToMatch: () => void;
}

export const LeftSidebarProfile: React.FC<LeftSidebarProfileProps> = ({
  currentUser,
  onOpenProfile,
  onNavigateToMatch
}) => {
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['comm-1', 'comm-2']);
  const [searchCommunityOpen, setSearchCommunityOpen] = useState(false);
  const [communityQuery, setCommunityQuery] = useState('');

  const communities = [
    {
      id: 'comm-1',
      name: 'Founders SaaS Brasil',
      members: '32 membros da sua rede',
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'comm-2',
      name: 'Investidores Seed & Angel LATAM',
      members: '18 fundos conectados',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'comm-3',
      name: 'AI & Data Enterprise Hub',
      members: '24 startups no ecossistema',
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  const toggleCommunity = (id: string) => {
    setJoinedCommunities(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const skillsAndTheses = [
    'AI & B2B SaaS',
    currentUser.role === 'startup' ? 'Rodada Seed' : 'Lead Investor',
    'Supply Chain',
    'Logtech',
    currentUser.role === 'startup' ? 'MRR +24%' : 'Cheque R$ 1M-3M',
    'RAG Enterprise',
    'Valuation R$ 18M'
  ];

  return (
    <aside className="w-full space-y-4">
      
      {/* 1. Main Personal Profile Card with Solar/Orbital Arch Halo */}
      <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        
        {/* Top 3-Dots Action */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => onOpenProfile(currentUser)}
            className="p-1 text-zinc-500 hover:text-purple-300 transition-colors"
            title="Opções do Perfil"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Concentric Arch / Halo Graphic behind Avatar */}
        <div className="relative flex flex-col items-center justify-center pt-2 pb-3">
          
          {/* Concentric Innovation Ring Arches (Roxo, Azul, Verde) */}
          <div className="relative w-44 h-24 flex items-end justify-center overflow-hidden mb-2">
            {/* Outer Arch - Roxo */}
            <div className="absolute bottom-0 w-40 h-40 rounded-full border-t-[3px] border-l-[3px] border-r-[3px] border-purple-500/35" />
            {/* Mid Arch - Azul */}
            <div className="absolute bottom-0 w-32 h-32 rounded-full border-t-[3px] border-l-[3px] border-r-[3px] border-blue-500/50" />
            {/* Inner Arch - Verde */}
            <div className="absolute bottom-0 w-24 h-24 rounded-full border-t-[3.5px] border-l-[3.5px] border-r-[3.5px] border-emerald-400" />
            
            {/* Centered Avatar */}
            <div className="relative z-10 bottom-0 mb-1">
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-[#0C0F1D] shadow-2xl bg-black">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-[#0C0F1D]" />
            </div>
          </div>

          {/* Stats on Both Sides (Followers / Connections) */}
          <div className="flex items-center justify-between w-full px-4 mb-3 text-center">
            <div>
              <span className="block text-base font-black text-white tabular-nums tracking-tight">
                1,984
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">Conexões</span>
            </div>
            
            <div className="w-px h-6 bg-purple-950/40" />

            <div>
              <span className="block text-base font-black text-blue-400 tabular-nums tracking-tight">
                340
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">Investidores</span>
            </div>
          </div>

          {/* User Details */}
          <div className="text-center w-full">
            <div className="flex items-center justify-center gap-1.5">
              <h3 className="text-base font-black text-white tracking-tight">
                {currentUser.name}
              </h3>
              {currentUser.verified && (
                <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              )}
            </div>

            <p className="text-xs text-zinc-400 font-medium mb-1">
              {currentUser.handle} • <span className="text-purple-400 font-bold">{currentUser.role === 'startup' ? currentUser.companyName : currentUser.fundName}</span>
            </p>

            <div className="px-2 py-1.5 rounded-xl bg-[#080B16] border border-purple-900/30 my-2 text-[11px] text-zinc-300 leading-snug">
              ✨ {currentUser.headline} ✨
            </div>

            {/* My Profile Button */}
            <button
              onClick={() => onOpenProfile(currentUser)}
              className="w-full mt-2 py-2.5 px-4 bg-[#11162B] hover:bg-[#18203E] active:bg-[#18203E] border border-purple-900/40 text-xs font-bold text-purple-200 hover:text-white rounded-xl transition-all shadow-md"
            >
              Meu Perfil & Portfólio
            </button>
          </div>

        </div>

      </div>

      {/* 2. Teses / Hard Skills / Tags */}
      <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
            Teses & Hard Skills
          </h4>
          <span className="text-[10px] font-bold text-blue-400">Smart Match</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {skillsAndTheses.map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-[#11162B] hover:bg-[#18203E] text-zinc-300 border border-purple-900/30 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Comunidades / Ecossistema */}
      <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
            Comunidades
          </h4>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchCommunityOpen(!searchCommunityOpen)}
              className="p-1 rounded-lg text-zinc-500 hover:text-purple-300 transition-colors"
              title="Buscar Comunidade"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => alert('Em breve: criar nova comunidade de fundadores!')}
              className="p-1 rounded-lg text-zinc-500 hover:text-emerald-400 transition-colors"
              title="Criar Comunidade"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {searchCommunityOpen && (
          <div className="mb-3">
            <input
              type="text"
              value={communityQuery}
              onChange={(e) => setCommunityQuery(e.target.value)}
              placeholder="Filtrar grupos..."
              className="w-full text-xs bg-[#11162B] text-zinc-200 px-2.5 py-1.5 rounded-lg border border-purple-900/40 focus:outline-none focus:border-purple-400"
            />
          </div>
        )}

        <div className="space-y-2.5">
          {communities
            .filter(c => c.name.toLowerCase().includes(communityQuery.toLowerCase()))
            .map(comm => {
              const isJoined = joinedCommunities.includes(comm.id);
              return (
                <div
                  key={comm.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#0F1424] hover:bg-[#151C33] border border-purple-950/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#080B16] border border-purple-900/30 flex items-center justify-center shrink-0">
                      <div className={`w-4 h-4 rounded-full border-2 bg-gradient-to-tr ${comm.color} p-[1.5px]`}>
                        <div className="w-full h-full bg-[#080B16] rounded-full" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-zinc-200 group-hover:text-white truncate">
                        {comm.name}
                      </h5>
                      <span className="text-[10px] text-zinc-500 block truncate">
                        {comm.members}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCommunity(comm.id)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-colors shrink-0 ml-1 ${
                      isJoined
                        ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 hover:text-emerald-300'
                        : 'text-white bg-purple-600 hover:bg-purple-500'
                    }`}
                  >
                    {isJoined ? 'Seguindo' : 'Entrar'}
                  </button>
                </div>
              );
            })}
        </div>
      </div>

    </aside>
  );
};
