import React, { useState, useMemo } from 'react';
import { EventItem, UserProfile } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Check, 
  Share2, 
  ExternalLink, 
  Sparkles,
  Building2,
  X,
  ShieldCheck,
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CalendarPlus,
  Download,
  Video,
  Globe,
  Copy,
  CheckCircle2,
  Tag,
  Award,
  ArrowUpDown
} from 'lucide-react';

interface EventsSectionProps {
  events: EventItem[];
  currentUser: UserProfile;
  onToggleRsvp: (eventId: string) => void;
  onOpenProfile: (user: UserProfile) => void;
  onOpenChatWithParticipant: (participantId: string) => void;
  isAdmin?: boolean;
  onCreateEvent?: (event: Pick<EventItem, 'title' | 'date' | 'time' | 'location' | 'format' | 'category'>) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  currentUser,
  onToggleRsvp,
  onOpenProfile,
  onOpenChatWithParticipant
  , isAdmin = false
  , onCreateEvent
}) => {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [onlyRegistered, setOnlyRegistered] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'rsvps' | 'title'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // View & Pagination
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal State
  const [selectedModalEvent, setSelectedModalEvent] = useState<EventItem | null>(null);
  const [modalTab, setModalTab] = useState<'details' | 'agenda' | 'participants'>('details');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [participantRoleFilter, setParticipantRoleFilter] = useState<'all' | 'startup' | 'investor'>('all');
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', format: 'Online' as EventItem['format'], category: 'Demo Day' as EventItem['category'] });

  const categories = [
    'Demo Day',
    'Pitch Night',
    'VC Roundtable',
    'Workshop & Diligence'
  ];

  const formats = ['Online', 'Presencial', 'Híbrido'];

  // Keep modal event synced when events array changes (e.g., RSVP toggled)
  const activeModalEvent = useMemo(() => {
    if (!selectedModalEvent) return null;
    return events.find(e => e.id === selectedModalEvent.id) || selectedModalEvent;
  }, [selectedModalEvent, events]);

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Category filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'all' && event.format !== selectedFormat) {
        return false;
      }
      // Only registered
      if (onlyRegistered && !event.isUserRegistered) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesOrganizer = event.organizer.toLowerCase().includes(query);
        const matchesLocation = event.location.toLowerCase().includes(query);
        const matchesNiche = event.niches.some(n => n.toLowerCase().includes(query));
        const matchesDesc = event.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesOrganizer && !matchesLocation && !matchesNiche && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'rsvps') {
        comparison = a.rsvpsCount - b.rsvpsCount;
      } else {
        // Date sorting heuristic
        comparison = a.id.localeCompare(b.id);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [events, selectedCategory, selectedFormat, onlyRegistered, searchQuery, sortBy, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / pageSize) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedEvents = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredEvents.slice(startIndex, startIndex + pageSize);
  }, [filteredEvents, safeCurrentPage, pageSize]);

  // Statistics
  const stats = useMemo(() => {
    const total = events.length;
    const registeredCount = events.filter(e => e.isUserRegistered).length;
    const totalAttendees = events.reduce((sum, e) => sum + e.rsvpsCount, 0);
    const demoDaysCount = events.filter(e => e.category === 'Demo Day').length;
    return { total, registeredCount, totalAttendees, demoDaysCount };
  }, [events]);

  const handleCopyShareLink = (event: EventItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/#event-${event.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedNotification(`Link copiado: ${event.title}`);
    setTimeout(() => {
      setCopiedNotification(null);
    }, 3200);
  };

  const handleDownloadIcs = (event: EventItem) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EloLink//Events//PT-BR',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.location}`,
      `ORGANIZER;CN=${event.organizer}:MAILTO:events@elolink.latam`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = (event: EventItem) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nOrganizado por: ${event.organizer}\nMais info na Elo Link.`);
    const location = encodeURIComponent(event.location);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const submitNewEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.time || !newEvent.location || !onCreateEvent) return;
    onCreateEvent(newEvent);
    setNewEvent({ title: '', date: '', time: '', location: '', format: 'Online', category: 'Demo Day' });
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-purple-900/90 border border-purple-500/50 text-white text-xs font-semibold shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {isAdmin && (
        <form onSubmit={submitNewEvent} className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 shadow-lg">
          <div className="mb-3 flex items-center gap-2">
            <CalendarPlus className="h-4 w-4 text-emerald-400" />
            <div><h2 className="text-sm font-bold text-white">Gestão administrativa de eventos</h2><p className="text-[11px] text-slate-400">Crie um evento e disponibilize-o para toda a comunidade.</p></div>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
            <input required value={newEvent.title} onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))} placeholder="Nome do evento" className="rounded-xl bg-[#080A14] px-3 py-2.5 text-xs text-white outline-none ring-1 ring-purple-950/50 focus:ring-purple-500 lg:col-span-2" />
            <input required type="date" value={newEvent.date} onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))} className="rounded-xl bg-[#080A14] px-3 py-2.5 text-xs text-white outline-none ring-1 ring-purple-950/50 focus:ring-purple-500" />
            <input required type="text" value={newEvent.time} onChange={e => setNewEvent(prev => ({ ...prev, time: e.target.value }))} placeholder="18:30 - 21:00" className="rounded-xl bg-[#080A14] px-3 py-2.5 text-xs text-white outline-none ring-1 ring-purple-950/50 focus:ring-purple-500" />
            <input required value={newEvent.location} onChange={e => setNewEvent(prev => ({ ...prev, location: e.target.value }))} placeholder="Local ou link" className="rounded-xl bg-[#080A14] px-3 py-2.5 text-xs text-white outline-none ring-1 ring-purple-950/50 focus:ring-purple-500" />
            <button type="submit" className="rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-black text-black transition-colors hover:bg-emerald-400">Adicionar evento</button>
          </div>
        </form>
      )}

      {/* Top Header & Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ecossistema de Deals & Pitch Sessions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Eventos & Demo Days</span>
            <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {events.length} Agendados
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Painel escalável com lista consolidada de Demo Days, Pitch Nights presenciais e bancas de Due Diligence. Clique em qualquer linha para abrir a programação e os participantes.
          </p>
        </div>

        {/* Quick KPI stats pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-[#0C0F1D]/80 border border-purple-950/40 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Eventos</span>
            <span className="text-lg font-black text-white tabular-nums">{stats.total}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0C0F1D]/80 border border-purple-950/40 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Minhas Inscrições</span>
            <span className="text-lg font-black text-emerald-400 tabular-nums">{stats.registeredCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0C0F1D]/80 border border-purple-950/40 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Demo Days</span>
            <span className="text-lg font-black text-purple-300 tabular-nums">{stats.demoDaysCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0C0F1D]/80 border border-purple-950/40 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Presenças Ativas</span>
            <span className="text-lg font-black text-white tabular-nums">{stats.totalAttendees}+</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Search, Filters, View Modes */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#0C0F1D]/90 border border-purple-950/40 backdrop-blur-md space-y-3.5 shadow-lg">
        
        {/* Row 1: Search + View Mode + My Events */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por nome do evento, organizador, cidade ou nicho (ex: AI, Faria Lima)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080A14] border border-purple-950/50 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
                title="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters & View Mode */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            {/* Only registered toggle */}
            <button
              onClick={() => {
                setOnlyRegistered(!onlyRegistered);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                onlyRegistered
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#080A14] text-slate-300 hover:text-white border border-purple-950/50'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${onlyRegistered ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="whitespace-nowrap">Meus Eventos ({stats.registeredCount})</span>
            </button>

            {/* View Mode Toggle: Table vs Grid */}
            <div className="flex items-center p-1 rounded-xl bg-[#080A14] border border-purple-950/50">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Visualização em Tabela (Mais escalável)"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Tabela</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Visualização em Cards"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Category & Format Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-purple-950/30 text-xs">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 text-[11px] font-semibold mr-1">Categoria:</span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#080A14] text-slate-400 hover:text-white border border-purple-950/30'
              }`}
            >
              Todas
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#080A14] text-slate-400 hover:text-white border border-purple-950/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Formats & Sort */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px] font-semibold">Formato:</span>
              <button
                onClick={() => {
                  setSelectedFormat('all');
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  selectedFormat === 'all'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              {formats.map(fmt => (
                <button
                  key={fmt}
                  onClick={() => {
                    setSelectedFormat(fmt);
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    selectedFormat === fmt
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-purple-950/40">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar eventos"
                className="bg-[#080A14] border border-purple-950/40 rounded-lg text-[11px] text-slate-300 px-2 py-1 focus:outline-none focus:border-purple-500"
              >
                <option value="date">Data</option>
                <option value="rsvps">Participantes</option>
                <option value="title">Título</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Area: Table View OR Grid View */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0C0F1D]/80 border border-purple-950/40 backdrop-blur-sm space-y-3">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Nenhum evento encontrado</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Não encontramos eventos correspondentes aos filtros selecionados. Tente ajustar os termos de busca ou limpar as categorias.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedFormat('all');
              setOnlyRegistered(false);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
          >
            Limpar Todos os Filtros
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW (Scalable, Data-Dense, Responsive) */
        <div className="rounded-2xl bg-[#0C0F1D]/90 border border-purple-950/40 backdrop-blur-md overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-950/60 bg-[#080A14]/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-5">Evento & Organizador</th>
                  <th className="py-3.5 px-3">Data & Horário</th>
                  <th className="py-3.5 px-3">Formato / Local</th>
                  <th className="py-3.5 px-3">Nichos & Foco</th>
                  <th className="py-3.5 px-3 text-center">Inscritos</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/30 text-xs text-slate-300">
                {paginatedEvents.map(event => {
                  const capacityPercent = event.capacity 
                    ? Math.min(100, Math.round((event.rsvpsCount / event.capacity) * 100))
                    : 65;

                  return (
                    <tr
                      key={event.id}
                      onClick={() => {
                        setSelectedModalEvent(event);
                        setModalTab('details');
                      }}
                      className="hover:bg-purple-950/20 transition-colors cursor-pointer group"
                    >
                      {/* Event & Organizer */}
                      <td className="py-3.5 px-4 sm:px-5 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={event.bannerImage}
                            alt={event.title}
                            className="w-11 h-11 rounded-xl object-cover shrink-0 border border-purple-900/30 group-hover:scale-105 transition-transform"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-800/30">
                                {event.category}
                              </span>
                              {event.stageFocus && (
                                <span className="text-[10px] text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded">
                                  {event.stageFocus}
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-emerald-300 transition-colors">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate">
                              <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                              <span className="truncate">{event.organizer}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-semibold text-white">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{event.time}</span>
                        </div>
                      </td>

                      {/* Format & Location */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            event.format === 'Online'
                              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                              : event.format === 'Presencial'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                          }`}>
                            {event.format === 'Online' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                            <span>{event.format}</span>
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 truncate max-w-[150px] block" title={event.location}>
                          {event.location}
                        </span>
                      </td>

                      {/* Niches */}
                      <td className="py-3.5 px-3 max-w-[160px]">
                        <div className="flex flex-wrap gap-1">
                          {event.niches.map(niche => (
                            <span
                              key={niche}
                              className="text-[10px] text-slate-300 bg-[#080A14] border border-purple-950/40 px-1.5 py-0.5 rounded whitespace-nowrap"
                            >
                              {niche}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Capacity / Attendees */}
                      <td className="py-3.5 px-3 text-center">
                        <div className="inline-flex flex-col items-center">
                          <div className="flex items-center gap-1 font-bold text-white text-xs">
                            <Users className="w-3.5 h-3.5 text-purple-400" />
                            <span className="tabular-nums">{event.rsvpsCount}</span>
                            {event.capacity && (
                              <span className="text-slate-500 text-[10px] font-normal">/ {event.capacity}</span>
                            )}
                          </div>
                          {event.capacity && (
                            <div className="w-16 bg-slate-800 rounded-full h-1 mt-1 overflow-hidden">
                              <div
                                className="bg-emerald-400 h-1 rounded-full transition-all"
                                style={{ width: `${capacityPercent}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {event.isUserRegistered ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Inscrito</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/50">
                            <span>Vagas Abertas</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedModalEvent(event);
                              setModalTab('details');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all shadow-sm"
                          >
                            Ver Detalhes
                          </button>

                          <button
                            onClick={() => onToggleRsvp(event.id)}
                            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                              event.isUserRegistered
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-950/40'
                            }`}
                            title={event.isUserRegistered ? 'Cancelar inscrição' : 'Confirmar presença'}
                          >
                            {event.isUserRegistered ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Calendar className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            onClick={(e) => handleCopyShareLink(event, e)}
                            className="p-1.5 rounded-lg bg-[#080A14] hover:bg-slate-800 text-slate-400 hover:text-white border border-purple-950/40 transition-colors"
                            title="Compartilhar evento"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW (Visual Cards) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedEvents.map(event => (
            <div
              key={event.id}
              onClick={() => {
                setSelectedModalEvent(event);
                setModalTab('details');
              }}
              className="bg-[#0C0F1D]/90 border border-purple-950/40 hover:border-purple-700/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-md cursor-pointer"
            >
              <div>
                {/* Banner */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1D] via-[#0C0F1D]/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-purple-600/90 backdrop-blur-sm text-white text-[10px] font-bold shadow">
                      {event.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      {event.format}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-1 font-semibold text-[11px]">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{event.time}</span>
                    </span>
                    <span className="font-bold text-white bg-black/70 px-2 py-0.5 rounded text-[11px] border border-purple-900/30 tabular-nums">
                      {event.date}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-[11px] text-purple-300 font-semibold mb-2.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{event.organizer}</span>
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {event.niches.slice(0, 2).map(n => (
                      <span key={n} className="text-[10px] text-slate-300 bg-[#080A14] border border-purple-950/40 px-2 py-0.5 rounded">
                        {n}
                      </span>
                    ))}
                    {event.niches.length > 2 && (
                      <span className="text-[10px] text-slate-500 bg-[#080A14] px-1.5 py-0.5 rounded">
                        +{event.niches.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 flex items-center gap-2 border-t border-purple-950/30 mt-auto" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onToggleRsvp(event.id)}
                  className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    event.isUserRegistered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-950/40'
                  }`}
                >
                  {event.isUserRegistered ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirmado</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Inscrever-se</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedModalEvent(event);
                    setModalTab('details');
                  }}
                  className="p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 text-xs transition-colors"
                  title="Ver mais detalhes"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {filteredEvents.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0C0F1D]/80 border border-purple-950/40 backdrop-blur-sm text-xs">
          {/* Info text & Page Size Selector */}
          <div className="flex items-center gap-3 text-slate-400">
            <span>
              Mostrando <strong className="text-white tabular-nums">{(safeCurrentPage - 1) * pageSize + 1}</strong> a{' '}
              <strong className="text-white tabular-nums">{Math.min(safeCurrentPage * pageSize, filteredEvents.length)}</strong> de{' '}
              <strong className="text-white tabular-nums">{filteredEvents.length}</strong> eventos
            </span>

            <div className="flex items-center gap-1.5 pl-3 border-l border-purple-950/40">
              <span className="text-[11px] text-slate-500">Por página:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                aria-label="Itens por página"
                className="bg-[#080A14] border border-purple-950/50 rounded-lg text-slate-300 text-xs px-2 py-1 focus:outline-none focus:border-purple-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded-lg bg-[#080A14] border border-purple-950/40 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Primeira página"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              className="px-2.5 py-1.5 rounded-lg bg-[#080A14] border border-purple-950/40 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                // Show reasonable range around current page
                if (
                  totalPages > 7 &&
                  pageNum !== 1 &&
                  pageNum !== totalPages &&
                  Math.abs(pageNum - safeCurrentPage) > 1
                ) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return <span key={pageNum} className="text-slate-600 px-1">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all tabular-nums ${
                      safeCurrentPage === pageNum
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-[#080A14] text-slate-400 hover:text-white border border-purple-950/40'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              className="px-2.5 py-1.5 rounded-lg bg-[#080A14] border border-purple-950/40 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <span>Próxima</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={safeCurrentPage === totalPages}
              className="p-1.5 rounded-lg bg-[#080A14] border border-purple-950/40 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Última página"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* RICH EVENT DETAILS MODAL */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#090C18] border border-purple-800/40 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
            
            {/* Modal Top Banner */}
            <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden bg-black">
              <img
                src={activeModalEvent.bannerImage}
                alt={activeModalEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C18] via-[#090C18]/60 to-transparent" />
              
              {/* Badges on Banner */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-purple-600 text-white text-xs font-bold shadow-md">
                  {activeModalEvent.category}
                </span>
                <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {activeModalEvent.format}
                </span>
                {activeModalEvent.stageFocus && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-semibold border border-purple-900/30">
                    {activeModalEvent.stageFocus}
                  </span>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedModalEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Headline Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-lg sm:text-xl font-black text-white leading-tight mb-1">
                  {activeModalEvent.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-semibold text-purple-300">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{activeModalEvent.organizer}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{activeModalEvent.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Ribbon */}
            <div className="p-4 sm:px-6 border-b border-purple-950/40 bg-[#070914] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{activeModalEvent.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{activeModalEvent.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong className="text-emerald-400 tabular-nums">{activeModalEvent.rsvpsCount}</strong> confirmados</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleRsvp(activeModalEvent.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeModalEvent.isUserRegistered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-950/40'
                  }`}
                >
                  {activeModalEvent.isUserRegistered ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Inscrição Confirmada</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Garantir Vaga</span>
                    </>
                  )}
                </button>

                {/* Calendar actions */}
                <button
                  onClick={() => handleGoogleCalendar(activeModalEvent)}
                  className="p-2 rounded-xl bg-[#0F1325] hover:bg-purple-950/60 text-slate-300 hover:text-white border border-purple-950/50 transition-colors"
                  title="Adicionar ao Google Agenda"
                >
                  <CalendarPlus className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDownloadIcs(activeModalEvent)}
                  className="p-2 rounded-xl bg-[#0F1325] hover:bg-purple-950/60 text-slate-300 hover:text-white border border-purple-950/50 transition-colors"
                  title="Baixar arquivo de calendário (.ics)"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => handleCopyShareLink(activeModalEvent, e)}
                  className="p-2 rounded-xl bg-[#0F1325] hover:bg-purple-950/60 text-slate-300 hover:text-white border border-purple-950/50 transition-colors"
                  title="Copiar link do evento"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="flex items-center border-b border-purple-950/40 bg-[#080B16] px-4 sm:px-6">
              <button
                onClick={() => setModalTab('details')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                  modalTab === 'details'
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Sobre o Encontro
              </button>
              <button
                onClick={() => setModalTab('agenda')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  modalTab === 'agenda'
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Programação / Agenda</span>
                {activeModalEvent.agenda && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-900/60 text-purple-300">
                    {activeModalEvent.agenda.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setModalTab('participants')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  modalTab === 'participants'
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Participantes Confirmados</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  {activeModalEvent.confirmedParticipants.length}
                </span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs text-slate-300">
              
              {/* TAB 1: DETAILS */}
              {modalTab === 'details' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 text-purple-400">
                      Descrição Completa
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {activeModalEvent.description}
                    </p>
                  </div>

                  {/* Niches / Badges */}
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 text-purple-400">
                      Setores & Teses em Foco
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModalEvent.niches.map(niche => (
                        <span
                          key={niche}
                          className="px-3 py-1 rounded-lg bg-[#0C0F1D] border border-purple-950/50 text-slate-200 font-semibold text-xs flex items-center gap-1.5"
                        >
                          <Tag className="w-3 h-3 text-emerald-400" />
                          <span>{niche}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Access & Link info */}
                  <div className="p-4 rounded-xl bg-[#070914] border border-purple-950/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Acesso ao Evento</span>
                      </span>
                      <span className="text-[11px] text-slate-400">{activeModalEvent.format}</span>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {activeModalEvent.location}
                    </p>
                    {activeModalEvent.virtualLink && (
                      <div className="pt-2 flex items-center gap-2">
                        <a
                          href={activeModalEvent.virtualLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white font-semibold text-xs transition-colors"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Acessar Sala Virtual Oficial</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Featured Speakers if available */}
                  {activeModalEvent.featuredSpeakers && activeModalEvent.featuredSpeakers.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 text-purple-400">
                        Bancada & Palestrantes em Destaque
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeModalEvent.featuredSpeakers.map((spk, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-[#080B16] border border-purple-950/40 flex items-center gap-3">
                            <img
                              src={spk.avatar}
                              alt={spk.name}
                              className="w-10 h-10 rounded-full object-cover border border-purple-900/40"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">{spk.name}</h4>
                              <p className="text-[11px] text-slate-400 truncate">{spk.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: AGENDA */}
              {modalTab === 'agenda' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <p className="text-xs text-slate-400">
                    Cronograma oficial sujeito a pequenos ajustes de transmissão e perguntas da bancada:
                  </p>

                  {activeModalEvent.agenda && activeModalEvent.agenda.length > 0 ? (
                    <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-950/60 pl-8">
                      {activeModalEvent.agenda.map((item, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full bg-purple-600 border-2 border-[#090C18] ring-2 ring-purple-900/40" />
                          <div className="p-3 rounded-xl bg-[#080B16] border border-purple-950/40">
                            <span className="text-[11px] font-bold text-emerald-400 tabular-nums">
                              {item.time}
                            </span>
                            <h4 className="text-xs font-bold text-white mt-0.5">
                              {item.title}
                            </h4>
                            {item.speaker && (
                              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                                <span>Apresentador:</span>
                                <strong className="text-purple-300">{item.speaker}</strong>
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center rounded-xl bg-[#080B16] border border-purple-950/30 text-slate-400">
                      Agenda detalhada em processo de curadoria pela comissão organizadora.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PARTICIPANTS */}
              {modalTab === 'participants' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Role filter sub-bar */}
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-purple-950/30">
                    <span className="text-slate-400">
                      Total de <strong className="text-emerald-400 tabular-nums">{activeModalEvent.rsvpsCount}</strong> inscritos confirmados:
                    </span>
                    <div className="flex items-center gap-1 bg-[#080B16] p-1 rounded-lg border border-purple-950/40">
                      <button
                        onClick={() => setParticipantRoleFilter('all')}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          participantRoleFilter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setParticipantRoleFilter('startup')}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          participantRoleFilter === 'startup' ? 'bg-purple-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Startups
                      </button>
                      <button
                        onClick={() => setParticipantRoleFilter('investor')}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          participantRoleFilter === 'investor' ? 'bg-purple-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Investidores
                      </button>
                    </div>
                  </div>

                  {activeModalEvent.confirmedParticipants.length > 0 ? (
                    <div className="divide-y divide-purple-950/30">
                      {activeModalEvent.confirmedParticipants
                        .filter(p => participantRoleFilter === 'all' || p.role === participantRoleFilter)
                        .map(participant => (
                          <div key={participant.id} className="py-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={participant.avatar}
                                alt={participant.name}
                                className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-900/40"
                              />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-white">{participant.name}</span>
                                  <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                                    participant.role === 'startup'
                                      ? 'bg-blue-600/20 text-blue-300'
                                      : 'bg-emerald-500/20 text-emerald-300'
                                  }`}>
                                    {participant.role === 'startup' ? 'Startup' : 'Investidor'}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400">{participant.companyOrFund}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedModalEvent(null);
                                onOpenChatWithParticipant(participant.id);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-semibold transition-colors shrink-0"
                            >
                              Conectar no Chat
                            </button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center rounded-xl bg-[#080B16] border border-purple-950/30 text-slate-400">
                      Seja o primeiro a confirmar presença neste evento!
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Bottom Fixed Footer */}
            <div className="p-4 sm:px-6 border-t border-purple-950/40 bg-[#06080F] flex items-center justify-between text-xs">
              <span className="text-slate-400 hidden sm:inline">
                Precisa de dúvidas sobre este evento? Contate a organização oficial.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedModalEvent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => onToggleRsvp(activeModalEvent.id)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeModalEvent.isUserRegistered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-950/50'
                  }`}
                >
                  {activeModalEvent.isUserRegistered ? 'Confirmado (Cancelar)' : 'Garantir Minha Vaga'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
