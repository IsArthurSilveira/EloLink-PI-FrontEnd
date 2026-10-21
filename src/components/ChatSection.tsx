import React, { useState, useRef, useEffect } from 'react';
import { ChatThread, ChatMessage, UserProfile } from '../types';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Square, 
  Play, 
  Pause, 
  FileText, 
  Download, 
  Search,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet,
  X,
  Video,
  Phone,
  Clock,
  Smile,
  MoreHorizontal,
  Tag,
  Star,
  Camera,
  Plus,
  Mail,
  ChevronDown,
  Info,
  Calendar,
  CheckCheck,
  Check,
  FolderArchive,
  PhoneOff,
  MicOff,
  Sparkles,
  Menu
} from 'lucide-react';

interface ChatSectionProps {
  threads: ChatThread[];
  activeThreadId: string;
  onSelectThread: (threadId: string) => void;
  currentUser: UserProfile;
  onSendMessage: (threadId: string, message: Partial<ChatMessage>) => void;
  onViewProfile: (user: UserProfile) => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  currentUser,
  onSendMessage,
  onViewProfile
}) => {
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<{ [id: string]: number }>({});
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'unread'>('recent');
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showMobileThreadList, setShowMobileThreadList] = useState(true);

  // Modals & Interactive States
  const [selectedPreviewFile, setSelectedPreviewFile] = useState<{
    name: string;
    size: string;
    extension: string;
  } | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [isCallingModalOpen, setIsCallingModalOpen] = useState<'video' | 'audio' | null>(null);
  const [isCallMuted, setIsCallMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [tagsList, setTagsList] = useState<string[]>(['IA & B2B SaaS', 'Rodada Seed', 'Alta Afinidade', 'Lead Quente']);
  const [newTagInput, setNewTagInput] = useState('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active thread fallback
  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages]);

  // Call timer simulation
  useEffect(() => {
    if (isCallingModalOpen) {
      setCallDuration(0);
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [isCallingModalOpen]);

  // Audio recording simulation
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    recordTimerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopAndSendRecording = () => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    const duration = recordingSeconds > 0 ? recordingSeconds : 6;
    setIsRecording(false);
    setRecordingSeconds(0);

    const waveform = Array.from({ length: 18 }, () => Math.floor(Math.random() * 70) + 20);

    if (activeThread) {
      onSendMessage(activeThread.id, {
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'audio',
        audioData: {
          durationSec: duration,
          waveform
        }
      });
    }
  };

  const cancelRecording = () => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  // Play/pause voice message
  const togglePlayAudio = (id: string, durationSec: number) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setPlayingAudioId(id);
      let currentSec = 0;
      audioIntervalRef.current = setInterval(() => {
        currentSec += 0.5;
        const progress = Math.min(100, (currentSec / durationSec) * 100);
        setAudioProgress(prev => ({ ...prev, [id]: progress }));
        if (currentSec >= durationSec) {
          clearInterval(audioIntervalRef.current!);
          setPlayingAudioId(null);
          setAudioProgress(prev => ({ ...prev, [id]: 0 }));
        }
      }, 500);
    }
  };

  // Send regular text message
  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    onSendMessage(activeThread.id, {
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      text: inputText.trim()
    });
    setInputText('');
  };

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeThread) {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'ARQUIVO';
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const displaySize = file.size < 1024 * 1024 
        ? `${Math.round(file.size / 1024)} kb` 
        : `${sizeMb} MB`;

      onSendMessage(activeThread.id, {
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'file',
        fileData: {
          name: file.name,
          size: displaySize,
          extension: ext
        }
      });
      e.target.value = '';
    }
  };

  // Quick schedule meeting message
  const handleSendScheduleProposal = (day: string, time: string) => {
    if (!activeThread) return;
    onSendMessage(activeThread.id, {
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      text: `📅 Sugestão de Reunião: Que tal uma call na ${day} às ${time} para alinharmos os próximos passos da rodada?`
    });
    setIsScheduleModalOpen(false);
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Filter threads
  const filteredThreads = threads.filter(t => {
    const matchesSearch = 
      t.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.participant.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'unread') return matchesSearch && t.unreadCount > 0;
    return matchesSearch;
  });

  // Extract shared documents in active thread
  const sharedDocs = activeThread?.messages
    .filter(m => m.type === 'file' && m.fileData)
    .map(m => m.fileData!) || [
      { name: 'Apresentacao_e_Metricas.zip', size: '350.43 kb', extension: 'ZIP' },
      { name: 'Pitch_Deck_OmniFlow_SeriesA.pdf', size: '4.8 MB', extension: 'PDF' }
    ];

  return (
    <div className="h-full min-h-0 w-full flex bg-[#070913] text-zinc-100 rounded-2xl overflow-hidden border border-purple-950/40 shadow-2xl select-none">
      
      {/* ============================================================== */}
      {/* 1. PAINEL ESQUERDO: LISTA DE CONVERSAS */}
      {/* ============================================================== */}
      <div className={`${showMobileThreadList ? 'flex' : 'hidden'} md:flex w-full md:w-80 lg:w-96 shrink-0 bg-[#0C0F1D] border-r border-purple-950/40 flex-col h-full min-h-0 overflow-hidden`}>
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-purple-950/40 shrink-0">
          <div className="flex items-center justify-between mb-3.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Conversas
            </h1>
          </div>

          {/* Search bar */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#11162B] hover:bg-[#161D38] focus:bg-[#161D38] text-xs text-zinc-200 placeholder-zinc-500 rounded-xl pl-9 pr-3.5 py-2.5 border border-purple-900/30 focus:border-purple-500/70 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter Sub-header */}
          <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold px-0.5">
            <button
              onClick={() => setFilterType(prev => prev === 'recent' ? 'all' : 'recent')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>{filterType === 'recent' ? 'Recentes' : 'Todas'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            <button
              onClick={() => {
                const nextCandidate = threads.find(t => t.id !== activeThread?.id);
                if (nextCandidate) onSelectThread(nextCandidate.id);
              }}
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-bold transition-colors"
            >
              <span>Nova Conversa</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Conversation Cards List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2 overscroll-contain">
          {filteredThreads.map(thread => {
            const isSelected = thread.id === activeThread?.id;

            return (
              <button
                key={thread.id}
                onClick={() => {
                  onSelectThread(thread.id);
                  setShowMobileThreadList(false);
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition-all relative flex items-start gap-3 group focus:outline-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-950/40 scale-[1.01]'
                    : 'bg-transparent hover:bg-[#11162B] text-zinc-300 border border-transparent hover:border-purple-950/40'
                }`}
              >
                {/* Avatar with top-right green online indicator dot */}
                <div className="relative shrink-0 mt-0.5">
                  <div className={`w-11 h-11 rounded-full overflow-hidden ${
                    isSelected ? 'ring-2 ring-white/50' : 'ring-1 ring-purple-500/40 bg-zinc-800'
                  }`}>
                    <img
                      src={thread.participant.avatar}
                      alt={thread.participant.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Green status dot */}
                  <span className={`w-3 h-3 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ${
                    isSelected ? 'ring-2 ring-purple-600' : 'ring-2 ring-[#0C0F1D]'
                  }`} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-100 group-hover:text-white'}`}>
                      {thread.participant.name}
                    </span>
                    <span className={`text-[10px] tabular-nums shrink-0 ${isSelected ? 'text-white/80' : 'text-zinc-500'}`}>
                      {thread.lastMessageTime}
                    </span>
                  </div>

                  <p className={`text-[11px] truncate leading-tight ${isSelected ? 'text-white/90 font-medium' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                    {thread.lastMessage}
                  </p>
                </div>

                {/* Trailing Icon / Purple unread badge */}
                <div className="shrink-0 self-center">
                  {isSelected ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewProfile(thread.participant);
                      }}
                      className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      title="Opções da conversa"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  ) : thread.unreadCount > 0 ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50 block" />
                  ) : (
                    <MoreHorizontal className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. CENTER PANEL: ACTIVE CHAT CANVAS (Reference Image Center Area) */}
      {/* ============================================================== */}
      <div className={`${showMobileThreadList ? 'hidden' : 'flex'} md:flex flex-1 flex-col bg-[#0F121E] min-w-0 min-h-0 overflow-hidden`}>
        
        {/* Top Chat Header */}
        <div className="h-16 px-4 sm:px-6 border-b border-[#1E2337] flex items-center justify-between bg-[#141724]/60 backdrop-blur-md">
          {/* Active Contact Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setShowMobileThreadList(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 shrink-0"
              aria-label="Voltar para conversas"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative shrink-0">
              <img
                src={activeThread.participant.avatar}
                alt={activeThread.participant.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400/80 bg-zinc-800"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#141724] absolute bottom-0 right-0" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white truncate">
                  {activeThread.participant.name}
                </h2>
                {activeThread.participant.verified && (
                  <span title="Verificado Elo Link">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span>Online</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 truncate">
                  {activeThread.participant.role === 'startup'
                    ? activeThread.participant.companyName || 'Founder'
                    : activeThread.participant.fundName || 'Investidor VC'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Message Stream (Selector 2) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-5 bg-[#0D101A] overscroll-contain">
          
          {/* Trust & Mutual Elo Badge */}
          <div className="p-3 rounded-2xl bg-[#141724]/90 border border-zinc-800/80 text-center w-full max-w-md mx-auto shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Elo Realizado com Sucesso · Canal Criptografado</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Ambas as partes confirmaram afinidade mútua. Você pode compartilhar Pitch Decks, Cap Tables e agendar calls.
            </p>
          </div>

          {activeThread.messages.map((msg, index) => {
            const isMine = msg.senderId === currentUser.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col group ${isMine ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[95%] sm:max-w-[75%] min-w-0 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Tiny Avatar */}
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-zinc-700 mb-5">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bubble Container */}
                  <div className="flex flex-col min-w-0 max-w-[calc(100%_-_2.25rem)]">
                    
                    {/* Message Bubble */}
                    <div className={`p-4 rounded-3xl transition-all shadow-md relative ${
                      isMine
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm shadow-purple-950/30'
                        : 'bg-[#11162B] border border-purple-950/50 text-zinc-100 rounded-bl-sm shadow-black/40'
                    }`}>

                      {/* Header in sent message */}
                      {isMine && (
                        <p className="text-[11px] font-bold text-white/90 mb-1">
                          {currentUser.name}
                        </p>
                      )}

                      {/* Text content */}
                      {msg.type === 'text' && (
                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                      )}

                      {/* File Card */}
                      {msg.type === 'file' && msg.fileData && (
                        <div className={`flex items-center gap-3.5 p-3 rounded-2xl ${
                          isMine 
                            ? 'bg-white/15 border border-white/20' 
                            : 'bg-[#080B16] border border-purple-950/40'
                        }`}>
                          {/* File Icon Badge */}
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isMine ? 'bg-white/25 text-white' : 'bg-purple-600/20 text-purple-400'
                          }`}>
                            <FileText className="w-5 h-5" />
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-bold text-xs sm:text-sm truncate text-white">
                              {msg.fileData.name}
                            </p>
                            <p className={`text-[10px] tabular-nums ${isMine ? 'text-white/80' : 'text-zinc-400'}`}>
                              {msg.fileData.size}
                            </p>
                          </div>

                          {/* Download Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedPreviewFile(msg.fileData!)}
                            className={`p-2 rounded-xl transition-colors ${
                              isMine 
                                ? 'bg-white/20 hover:bg-white/30 text-white' 
                                : 'bg-[#161D38] hover:bg-[#1E274A] text-purple-400'
                            }`}
                            title="Visualizar documento compartilhado"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Audio Message waveform */}
                      {msg.type === 'audio' && msg.audioData && (
                        <div className="flex items-center gap-3 min-w-[210px] sm:min-w-[250px]">
                          <button
                            onClick={() => togglePlayAudio(msg.id, msg.audioData!.durationSec)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                              playingAudioId === msg.id 
                                ? 'bg-white text-purple-600 scale-105 shadow-md' 
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                            title="Tocar áudio"
                          >
                            {playingAudioId === msg.id ? (
                              <Pause className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            )}
                          </button>

                          <div className="flex-1 flex flex-col gap-1">
                            <div className="flex items-center gap-[2.5px] h-6">
                              {msg.audioData.waveform.map((barHeight, idx) => {
                                const barProgress = (idx / msg.audioData!.waveform.length) * 100;
                                const currentProgress = audioProgress[msg.id] || 0;
                                const isPast = playingAudioId === msg.id && currentProgress >= barProgress;

                                return (
                                  <div
                                    key={idx}
                                    style={{ height: `${Math.max(20, Math.min(100, barHeight))}%` }}
                                    className={`w-[3px] rounded-full transition-colors ${
                                      isPast ? 'bg-emerald-300' : isMine ? 'bg-white/70' : 'bg-zinc-500'
                                    }`}
                                  />
                                );
                              })}
                            </div>
                            
                            <div className="flex items-center justify-between text-[10px] opacity-80 tabular-nums">
                              <span>Voz Gravada</span>
                              <span>{msg.audioData.durationSec}s</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Timestamp & Read Status below bubble */}
                    <div className={`flex items-center gap-1.5 mt-1 text-[10px] text-zinc-500 px-1 tabular-nums ${
                      isMine ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>
                        {isMine ? `Enviada às ${msg.timestamp}` : `Visualizada às ${msg.timestamp}`}
                      </span>
                      {isMine && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Recording active banner */}
        {isRecording && (
          <div className="px-4 py-2.5 bg-purple-950/70 border-t border-purple-800/60 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-purple-300">
              <span className="w-3 h-3 rounded-full bg-purple-500 animate-ping" />
              <span>Gravando áudio com qualidade HD...</span>
              <span className="font-mono text-white font-bold tabular-nums">
                00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={cancelRecording}
                className="px-3 py-1 text-xs text-zinc-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={stopAndSendRecording}
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Finalizar & Enviar</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Input Composer */}
        <div className="p-2.5 sm:p-4 border-t border-purple-950/40 bg-[#0C0F1D] shrink-0">
          <form onSubmit={handleSendText} className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.xlsx,.csv,.doc,.docx,.ppt,.pptx,.png,.jpg,.zip"
            />

            {/* Left Tool Stack: File Attachment & Camera */}
            <div className="flex items-center gap-0.5 sm:gap-1.5 text-zinc-400 shrink-0">
              {/* Document / File attachment */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 sm:p-2.5 rounded-xl hover:text-white hover:bg-[#11162B] transition-colors"
                title="Anexar Pitch Deck, Cap Table ou Arquivo Zip"
              >
                <FileText className="w-4 h-4" />
              </button>

              {/* Camera icon in purple rounded button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 sm:p-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-950/40 transition-transform active:scale-95"
                title="Tirar foto ou enviar mídia"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Main Text Input */}
            <input
              type="text"
              placeholder={isRecording ? 'Gravando áudio...' : 'Digite uma mensagem aqui...'}
              value={inputText}
              disabled={isRecording}
              onChange={(e) => setInputText(e.target.value)}
              className="min-w-0 flex-1 bg-[#11162B] text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 rounded-2xl px-3 sm:px-4 py-3 border border-purple-950/40 focus:border-purple-500/70 focus:outline-none transition-colors"
            />

            {/* Right Tools: Emoji + Send Button */}
            <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setInputText(prev => prev + ' 🚀')}
                className="hidden sm:block p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-[#11162B] transition-colors"
                title="Inserir Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>

              {/* Mic / Send Button */}
              {!inputText.trim() ? (
                <button
                  type="button"
                  onClick={isRecording ? stopAndSendRecording : startRecording}
                  className={`p-3 rounded-2xl transition-all ${
                    isRecording
                      ? 'bg-purple-600 text-white animate-bounce'
                      : 'bg-[#11162B] text-zinc-400 hover:text-purple-400 hover:bg-[#161D38]'
                  }`}
                  title={isRecording ? 'Parar gravação' : 'Gravar áudio'}
                >
                  <Mic className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:scale-95 text-white font-bold transition-all shadow-lg shadow-purple-950/40"
                  title="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

          </form>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. PAINEL DIREITO: INFORMAÇÕES DO CONTATO */}
      {/* ============================================================== */}
      {showRightPanel && (
        <div className="w-80 lg:w-88 shrink-0 bg-[#141724] border-l border-[#1E2337] p-5 flex flex-col gap-5 overflow-y-auto overscroll-contain hidden md:flex">
          
          {/* Top Profile Summary Card */}
          <div className="text-center pt-2">
            <div className="relative inline-block mx-auto mb-3">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-emerald-400/80 bg-zinc-800 mx-auto shadow-lg">
                <img
                  src={activeThread.participant.avatar}
                  alt={activeThread.participant.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-[#141724] absolute top-1 right-1" />
            </div>

            <h3 className="text-lg font-black text-white tracking-tight">
              {activeThread.participant.name}
            </h3>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              {activeThread.participant.role === 'startup' ? 'Fundadora & CEO' : 'Sócio & Investidor Líder'}
            </p>
          </div>

          {/* Section: Personal Information */}
          <div className="bg-[#191D2E] rounded-2xl p-4 border border-zinc-800/80 space-y-3">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Informações do Contato
            </h4>

            {/* Email */}
            <div 
              onClick={() => handleCopy(`support@whelp.net`, 'email')}
              className="flex items-center gap-3 text-xs text-zinc-300 hover:text-white cursor-pointer group p-1.5 rounded-lg hover:bg-[#161D38] transition-colors"
            >
              <Mail className="w-4 h-4 text-zinc-400 group-hover:text-purple-400" />
              <span className="truncate flex-1">
                {activeThread.participant.name.toLowerCase().replace(' ', '')}@whelp.net
              </span>
              {copiedField === 'email' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <span className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100">Copiar</span>
              )}
            </div>

            {/* Phone */}
            <div 
              onClick={() => handleCopy('+1 (786) 903 - 7331', 'phone')}
              className="flex items-center gap-3 text-xs text-zinc-300 hover:text-white cursor-pointer group p-1.5 rounded-lg hover:bg-[#161D38] transition-colors"
            >
              <Phone className="w-4 h-4 text-zinc-400 group-hover:text-purple-400" />
              <span className="tabular-nums flex-1">+1 (786) 903 - 7331</span>
              {copiedField === 'phone' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <span className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100">Copiar</span>
              )}
            </div>

            {/* Schedule / Hours */}
            <div className="flex items-center gap-3 text-xs text-zinc-400 p-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Seg - Sex: 09:00 às 18:00</span>
            </div>
          </div>

          {/* Action Buttons: View Profile, Shared Document */}
          <div className="space-y-2.5">
            {/* View Pages (Ver Perfil Completo) */}
            <button
              onClick={() => onViewProfile(activeThread.participant)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#0F1325] hover:bg-[#161D38] border border-purple-950/40 text-xs font-semibold text-zinc-200 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-purple-400" />
                <span>Ver Perfil Completo</span>
              </div>
              <span className="text-[10px] text-purple-400 font-bold group-hover:text-purple-300">Perfil</span>
            </button>

            {/* Shared Document */}
            <div className="bg-[#0F1325] rounded-2xl p-4 border border-purple-950/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Documentos Compartilhados</span>
                </div>
                <span className="text-[10px] font-semibold text-blue-400 tabular-nums">
                  {sharedDocs.length} arquivos
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {sharedDocs.map((doc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPreviewFile(doc)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-[#080B16] hover:bg-[#11162B] text-left transition-colors text-xs text-zinc-300 hover:text-white group"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <FolderArchive className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-400 shrink-0" />
                      <span className="truncate text-[11px] font-medium">{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 tabular-nums shrink-0">{doc.size}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* MODALS & INTERACTIVE OVERLAYS */}
      {/* ============================================================== */}

      {/* 1. Document Preview Modal */}
      {selectedPreviewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0C0F1D] border border-purple-950/50 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Visualizador de Documento</h3>
              </div>
              <button
                onClick={() => setSelectedPreviewFile(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#0E1222] border border-purple-900/30 rounded-2xl p-5 text-center my-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <p className="font-bold text-white text-sm mb-1">{selectedPreviewFile.name}</p>
              <p className="text-xs text-zinc-400 tabular-nums">
                Formato {selectedPreviewFile.extension} · {selectedPreviewFile.size} · Protegido por NDA
              </p>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-5">
              Este arquivo foi compartilhado exclusivamente através do canal verificado Elo Link.
            </p>

            <div className="flex gap-2.5">
              <button
                onClick={() => setSelectedPreviewFile(null)}
                className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-[#11162B] hover:bg-[#18203E] text-zinc-300 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  alert(`Download de "${selectedPreviewFile.name}" iniciado com sucesso.`);
                  setSelectedPreviewFile(null);
                }}
                className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-opacity flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Arquivo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Chat Rating Modal */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0C0F1D] border border-purple-950/50 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
              <Star className="w-7 h-7 text-emerald-400 fill-current" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Avaliar Conexão com {activeThread.participant.name}
            </h3>
            <p className="text-xs text-zinc-400 mb-5">
              Sua avaliação ajuda a calibrar a pontuação de afinidade e reputação na comunidade Elo Link.
            </p>

            {ratingSubmitted ? (
              <div className="py-4">
                <p className="text-sm font-bold text-emerald-400 mb-2">★ Avaliação enviada com sucesso!</p>
                <button
                  onClick={() => {
                    setIsRatingModalOpen(false);
                    setRatingSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#11162B] text-xs font-bold text-white mt-2"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= userRating
                            ? 'text-emerald-400 fill-current drop-shadow-md'
                            : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRatingModalOpen(false)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-[#11162B] text-zinc-300 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setRatingSubmitted(true)}
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-950/40"
                  >
                    Confirmar {userRating}★
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. Simulated Audio/Video Call Modal */}
      {isCallingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-[#0C0F1D] border border-purple-950/50 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-purple-500 mx-auto animate-pulse">
                <img
                  src={activeThread.participant.avatar}
                  alt={activeThread.participant.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="w-4 h-4 rounded-full bg-emerald-400 absolute bottom-1 right-1 ring-2 ring-[#0C0F1D]" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              {activeThread.participant.name}
            </h3>
            <p className="text-xs text-zinc-400 mb-2">
              Chamada de {isCallingModalOpen === 'video' ? 'Vídeo' : 'Voz'} em andamento...
            </p>

            <p className="font-mono text-sm text-purple-400 font-bold tabular-nums mb-6">
              00:{callDuration < 10 ? `0${callDuration}` : callDuration}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsCallMuted(!isCallMuted)}
                className={`p-3.5 rounded-2xl transition-colors ${
                  isCallMuted ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-[#161D38] text-white'
                }`}
                title={isCallMuted ? 'Desmutar' : 'Mutar microfone'}
              >
                {isCallMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsCallingModalOpen(null)}
                className="p-3.5 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white shadow-lg shadow-purple-950/40"
                title="Encerrar Chamada"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Add Tag Modal */}
      {isAddTagOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0C0F1D] border border-purple-950/50 rounded-3xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Adicionar Tags</h3>
              </div>
              <button onClick={() => setIsAddTagOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Ex: Series A, B2B, Lead Prioritário"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="flex-1 bg-[#11162B] text-xs text-white rounded-xl px-3 py-2 border border-purple-900/40 focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={() => {
                  if (newTagInput.trim()) {
                    setTagsList(prev => [...prev, newTagInput.trim()]);
                    setNewTagInput('');
                  }
                }}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#11162B] text-zinc-200 border border-purple-950/60 flex items-center gap-1.5"
                >
                  <span>#{tag}</span>
                  <button
                    onClick={() => setTagsList(prev => prev.filter((_, i) => i !== idx))}
                    className="text-zinc-500 hover:text-purple-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <button
              onClick={() => setIsAddTagOpen(false)}
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white rounded-xl"
            >
              Concluído
            </button>
          </div>
        </div>
      )}

      {/* 5. Meeting Scheduler Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#141724] border border-zinc-800 rounded-3xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF4D79]" />
                <h3 className="text-sm font-bold text-white">Agendar Reunião</h3>
              </div>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-3">
              Envie uma sugestão rápida de horário para acelerar a conexão:
            </p>

            <div className="space-y-2 mb-4">
              {[
                { day: 'Quinta-feira', time: '14:30 BRT' },
                { day: 'Sexta-feira', time: '10:00 BRT' },
                { day: 'Próxima Segunda', time: '16:00 BRT' }
              ].map((slot, i) => (
                <button
                  key={i}
                  onClick={() => handleSendScheduleProposal(slot.day, slot.time)}
                  className="w-full p-2.5 rounded-xl bg-[#1B1F32] hover:bg-[#252B44] text-xs font-semibold text-zinc-200 flex items-center justify-between transition-colors"
                >
                  <span>{slot.day}</span>
                  <span className="text-[#FF4D79] font-bold">{slot.time}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsScheduleModalOpen(false)}
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 rounded-xl"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
