import React, { useState } from 'react';
import { UserProfile, AppNotification } from '../types';
import { 
  User, 
  Bell, 
  Shield, 
  Volume2, 
  Sliders, 
  Sparkles, 
  Check, 
  Flame, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  Globe, 
  FileText, 
  Save, 
  RotateCcw,
  Moon,
  Sun,
  ArrowLeftRight,
  ExternalLink
} from 'lucide-react';

interface SettingsSectionProps {
  currentUser: UserProfile;
  onUpdateCurrentUser?: (updated: Partial<UserProfile>) => void;
  onSwitchUser: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onTriggerNotification?: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  currentUser,
  onUpdateCurrentUser,
  onSwitchUser,
  theme,
  onToggleTheme,
  onTriggerNotification
}) => {
  // Form state
  const [name, setName] = useState(currentUser.name);
  const [headline, setHeadline] = useState(currentUser.headline);
  const [bio, setBio] = useState(currentUser.bio);
  const [companyName, setCompanyName] = useState(
    currentUser.role === 'startup' ? (currentUser.companyName || '') : (currentUser.fundName || '')
  );
  const [primaryNiche, setPrimaryNiche] = useState(
    currentUser.niches?.[0] || 'AI & B2B SaaS'
  );
  const [location, setLocation] = useState(currentUser.location || 'São Paulo, SP');

  // Preferences toggles
  const [radarVisibility, setRadarVisibility] = useState<'public' | 'verified' | 'paused'>('public');
  const [autoShareDeck, setAutoShareDeck] = useState(true);
  const [instantHighMatchAlert, setInstantHighMatchAlert] = useState(true);
  
  // Notification toggles
  const [notifyMatches, setNotifyMatches] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(true);
  const [notifyWeeklyDigest, setNotifyWeeklyDigest] = useState(true);
  
  // Audio & media
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoPlayPitch, setAutoPlayPitch] = useState(false);
  const [volume, setVolume] = useState(80);

  // Privacy & security
  const [hideConfidentialMetrics, setHideConfidentialMetrics] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Feedback banner state
  const [isSaved, setIsSaved] = useState(false);

  // Active settings category tab
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'radar' | 'notifications' | 'audio' | 'privacy'>('profile');

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onUpdateCurrentUser) {
      onUpdateCurrentUser({
        name,
        headline,
        bio,
        location,
        niches: [primaryNiche as any, ...(currentUser.niches?.slice(1) || [])],
        ...(currentUser.role === 'startup' ? { companyName } : { fundName: companyName })
      });
    }

    setIsSaved(true);
    if (onTriggerNotification) {
      onTriggerNotification({
        title: 'Configurações Salvas! ✨',
        message: 'Suas preferências e perfil foram atualizados com sucesso.',
        type: 'comment'
      });
    }

    setTimeout(() => {
      setIsSaved(false);
    }, 3500);
  };

  const handleReset = () => {
    setName(currentUser.name);
    setHeadline(currentUser.headline);
    setBio(currentUser.bio);
    setCompanyName(currentUser.role === 'startup' ? (currentUser.companyName || '') : (currentUser.fundName || ''));
    setRadarVisibility('public');
    setAutoShareDeck(true);
    setInstantHighMatchAlert(true);
    setNotifyMatches(true);
    setNotifyMessages(true);
    setNotifyEvents(true);
    setNotifyWeeklyDigest(true);
    setSoundEffects(true);
    setAutoPlayPitch(false);
    setVolume(80);
    setHideConfidentialMetrics(false);
  };

  const handlePushPermissionRequest = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          if (onTriggerNotification) {
            onTriggerNotification({
              title: 'Notificações Ativadas! 🔔',
              message: 'Você receberá avisos diretos no navegador.',
              type: 'comment'
            });
          }
        }
      } catch (err) {
        console.warn('Erro ao solicitar permissão', err);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 animate-in fade-in duration-200">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 p-[1.5px] shadow-lg shadow-purple-950/40">
              <div className="w-full h-full bg-[#0E1220] rounded-[10px] flex items-center justify-center">
                <Sliders className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Configurações
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  Elo Link
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400">
                Gerencie preferências de radar, alertas, privacidade e customização da sua conta
              </p>
            </div>
          </div>
        </div>

        {/* Top actions: Save & persona switch */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSwitchUser}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0E1220] hover:bg-[#151B30] border border-purple-900/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all"
            title="Alternar entre perfil Founder e Investidor para testar a plataforma"
          >
            <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Alternar:</span>
            <span className="text-emerald-400 font-bold">
              {currentUser.role === 'startup' ? 'Founder' : 'Investidor'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>

      {/* Success banner */}
      {isSaved && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-200 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" />
            </div>
            <span>Suas alterações foram gravadas com sucesso no Elo Link!</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Sincronizado</span>
        </div>
      )}

      {/* Settings Layout: Left Nav Tabs + Right Content */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Subtabs Sidebar */}
        <div className="lg:col-span-1 space-y-1.5">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'profile'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <User className="w-4 h-4 text-purple-400" />
            <span>Perfil & Identidade</span>
          </button>

          <button
            onClick={() => setActiveSubTab('radar')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'radar'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Flame className="w-4 h-4 text-blue-400" />
            <span>Radar & Matchmaking</span>
          </button>

          <button
            onClick={() => setActiveSubTab('notifications')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'notifications'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notificações & Alertas</span>
          </button>

          <button
            onClick={() => setActiveSubTab('audio')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'audio'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Volume2 className="w-4 h-4 text-purple-400" />
            <span>Áudio & Efeitos</span>
          </button>

          <button
            onClick={() => setActiveSubTab('privacy')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'privacy'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Privacidade & Segurança</span>
          </button>

          {/* Quick theme toggler in sidebar */}
          <div className="pt-4 border-t border-purple-900/30">
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0E1220] border border-purple-900/30 text-xs text-zinc-300 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2.5">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-blue-400" />}
                <span>Tema da Interface</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                {theme === 'dark' ? 'Escuro' : 'Claro'}
              </span>
            </button>
          </div>
        </div>

        {/* Content Section Panel */}
        <div className="lg:col-span-3">
          <div className="bg-[#0A0D18] border border-purple-900/30 rounded-2xl p-5 sm:p-7 shadow-xl">
            
            {/* SUBTAB: PROFILE */}
            {activeSubTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    Identidade & Perfil Público
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Essas informações aparecem no seu card de match, no feed de oportunidades e nos chats.
                  </p>
                </div>

                {/* Avatar preview card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0E1220] border border-purple-900/30">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-purple-500/50"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white truncate">{currentUser.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {currentUser.role === 'startup' ? 'Founder Verificado' : 'Investidor Verificado'}
                      </span>
                    </div>
                    <p className="text-xs text-purple-400 font-medium truncate mt-0.5">
                      {currentUser.role === 'startup' ? currentUser.companyName : currentUser.fundName}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Foto vinculada à sua conta corporativa
                    </p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0E1220] text-xs text-zinc-100 rounded-xl border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      {currentUser.role === 'startup' ? 'Nome da Startup' : 'Nome do Fundo / Veículo'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0E1220] text-xs text-zinc-100 rounded-xl border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Título / Headline de Apresentação
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Ex: CEO & Co-founder | Captação Seed | Inteligência Artificial"
                    className="w-full px-3 py-2 bg-[#0E1220] text-xs text-zinc-100 rounded-xl border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Setor / Tese Principal
                    </label>
                    <input
                      type="text"
                      value={primaryNiche}
                      onChange={(e) => setPrimaryNiche(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#0E1220] text-xs text-zinc-100 rounded-xl border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Localização / Hub
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0E1220] text-xs text-zinc-100 rounded-xl border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Bio Executiva / Resumo do Pitch
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Descreva a tração da sua startup, métricas de crescimento e o valor que você busca agregar ao ecossistema..."
                    className="w-full p-3 bg-[#0E1220] text-xs text-zinc-100 rounded-xl border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* SUBTAB: RADAR & MATCH */}
            {activeSubTab === 'radar' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-blue-400" />
                    Radar de Afinidade & Matchmaking
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Configure os parâmetros do algoritmo de correspondência entre Startups e Investidores.
                  </p>
                </div>

                {/* Radar Visibility Mode */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Modo de Visibilidade no Radar
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setRadarVisibility('public')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        radarVisibility === 'public'
                          ? 'bg-purple-600/15 border-purple-500/50 text-white shadow-sm'
                          : 'bg-[#0E1220] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Público (Total)</span>
                        <Eye className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Seu perfil aparece para todos os fundadores e investidores ativos.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRadarVisibility('verified')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        radarVisibility === 'verified'
                          ? 'bg-purple-600/15 border-purple-500/50 text-white shadow-sm'
                          : 'bg-[#0E1220] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Apenas Verificados</span>
                        <Shield className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Visível exclusivamente para contas com selo de checagem Elo Link.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRadarVisibility('paused')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        radarVisibility === 'paused'
                          ? 'bg-purple-600/15 border-purple-500/50 text-white shadow-sm'
                          : 'bg-[#0E1220] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Pausado</span>
                        <EyeOff className="w-4 h-4 text-zinc-500" />
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Invisível no Swipe. Suas conversas em andamento continuam ativas.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="divide-y divide-purple-900/20 space-y-4 pt-2">
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-xs font-bold text-white">Auto-envio de Pitch Deck após Match Mútuo</div>
                      <p className="text-[11px] text-zinc-400">
                        Libera automaticamente o resumo executivo e deck de captação no chat assim que houver match mútuo.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoShareDeck(!autoShareDeck)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        autoShareDeck ? 'bg-purple-600' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${autoShareDeck ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-xs font-bold text-white">Alerta de Alta Afinidade (Match Score &gt; 85%)</div>
                      <p className="text-[11px] text-zinc-400">
                        Receba destaque visual e notificação imediata quando surgir um perfil com alta sinergia de tese.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInstantHighMatchAlert(!instantHighMatchAlert)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        instantHighMatchAlert ? 'bg-emerald-500' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${instantHighMatchAlert ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB: NOTIFICATIONS */}
            {activeSubTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    Notificações & Alertas
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Escolha quais tipos de atividades devem disparar avisos em tempo real.
                  </p>
                </div>

                {/* Push browser banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-[#0E1220] to-[#0A0D18] border border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Notificações Push do Navegador</div>
                      <p className="text-[11px] text-zinc-400">Receba popups mesmo com a aba em segundo plano</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handlePushPermissionRequest}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black self-start sm:self-auto transition-colors"
                  >
                    Ativar no Navegador
                  </button>
                </div>

                {/* Notification Items */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Novos Matches Mútuos</div>
                      <p className="text-[11px] text-zinc-400">Quando a outra parte também demonstrar interesse no radar</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifyMatches(!notifyMatches)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        notifyMatches ? 'bg-purple-600' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifyMatches ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Mensagens Diretas & Áudios</div>
                      <p className="text-[11px] text-zinc-400">Respostas nas conversas 1-a-1 e troca de decks</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifyMessages(!notifyMessages)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        notifyMessages ? 'bg-blue-600' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifyMessages ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Lembretes de Demo Days & Eventos</div>
                      <p className="text-[11px] text-zinc-400">Avisos 1h antes do início de bancas e pitch days inscritos</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifyEvents(!notifyEvents)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        notifyEvents ? 'bg-emerald-500' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifyEvents ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Digest Semanal de Oportunidades</div>
                      <p className="text-[11px] text-zinc-400">Resumo executivo de novos cheques e startups alinhadas</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifyWeeklyDigest(!notifyWeeklyDigest)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        notifyWeeklyDigest ? 'bg-purple-600' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifyWeeklyDigest ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB: AUDIO & MEDIA */}
            {activeSubTab === 'audio' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-purple-400" />
                    Áudio, Feedback & Mídia
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Controle de efeitos sonoros de matchmaking e volume dos pitches em vídeo.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Efeitos Sonoros de Interface</div>
                      <p className="text-[11px] text-zinc-400">Som comemorativo ao dar match e som de áudio gravado</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSoundEffects(!soundEffects)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        soundEffects ? 'bg-purple-600' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${soundEffects ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Autoplay de Vídeo Pitches</div>
                      <p className="text-[11px] text-zinc-400">Iniciar vídeo pitch mudo automaticamente ao abrir o perfil</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoPlayPitch(!autoPlayPitch)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        autoPlayPitch ? 'bg-blue-600' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${autoPlayPitch ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className="p-4 rounded-xl bg-[#0E1220] border border-purple-900/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-300">Volume Padrão de Reprodução</span>
                      <span className="font-mono text-purple-400 font-bold">{volume}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB: PRIVACY & SECURITY */}
            {activeSubTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Privacidade & Segurança
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Defina o nível de sigilo das métricas financeiras e proteções da sua conta.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Ocultar Métricas Confidenciais (MRR / Valuation)</div>
                      <p className="text-[11px] text-zinc-400">
                        Apenas fundos e investidores anjo com credenciamento aprovado poderão ver números exatos.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHideConfidentialMetrics(!hideConfidentialMetrics)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        hideConfidentialMetrics ? 'bg-purple-600' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${hideConfidentialMetrics ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E1220] border border-purple-900/20">
                    <div>
                      <div className="text-xs font-bold text-white">Autenticação em Duas Etapas (2FA)</div>
                      <p className="text-[11px] text-zinc-400">Proteção reforçada para transferências de deck e mensagens confidenciais</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        twoFactorAuth ? 'bg-emerald-500' : 'bg-zinc-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${twoFactorAuth ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-200">Exportar Dados Cadastrais</div>
                      <p className="text-[11px] text-zinc-400">Faça o download do histórico de conexões, matches e conversas</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onTriggerNotification) {
                          onTriggerNotification({
                            title: 'Download Preparado! 📦',
                            message: 'Os dados do Elo Link foram exportados em formato JSON seguro.',
                            type: 'comment'
                          });
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                    >
                      Exportar JSON
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Footer */}
            <div className="mt-8 pt-5 border-t border-purple-900/30 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrões</span>
              </button>

              <button
                type="button"
                onClick={() => handleSave()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
