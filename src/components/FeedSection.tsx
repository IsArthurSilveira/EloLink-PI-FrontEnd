import React, { useState } from 'react';
import { Post, UserProfile, EventItem } from '../types';
import { VideoPitchPlayer } from './VideoPitchPlayer';
import { LeftSidebarProfile } from './LeftSidebarProfile';
import { RightActivityRadar } from './RightActivityRadar';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Plus, 
  MoreVertical, 
  Image as ImageIcon, 
  Video, 
  BarChart2, 
  Calendar, 
  Send, 
  ShieldCheck, 
  Smile, 
  ArrowUpRight, 
  Flame, 
  Sparkles,
  ExternalLink,
  Play
} from 'lucide-react';

interface FeedSectionProps {
  posts: Post[];
  events: EventItem[];
  currentUser: UserProfile;
  allProfiles: UserProfile[];
  onOpenProfile: (user: UserProfile) => void;
  onOpenNewPostModal: () => void;
  onToggleLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onToggleRsvpEvent: (eventId: string) => void;
  onNavigateToMatch: () => void;
  onConnectWithUser: (user: UserProfile) => void;
  onOpenChatWith: (user: UserProfile) => void;
}

export const FeedSection: React.FC<FeedSectionProps> = ({
  posts,
  events,
  currentUser,
  allProfiles,
  onOpenProfile,
  onOpenNewPostModal,
  onToggleLikePost,
  onAddComment,
  onToggleRsvpEvent,
  onNavigateToMatch,
  onConnectWithUser,
  onOpenChatWith
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video_pitch' | 'opportunity' | 'thesis'>('all');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputMap, setCommentInputMap] = useState<{ [postId: string]: string }>({});
  
  const [commentsStore, setCommentsStore] = useState<{ [postId: string]: { id: string; author: string; avatar?: string; text: string; time: string }[] }>({
    'post-video-1': [
      {
        id: 'c-1',
        author: 'Rodrigo Mendes',
        avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        text: 'Excelente pitch, Camila! O unit economics de procurement da OmniFlow AI é admirável. Vamos agendar uma conversa.',
        time: 'Há 18 min'
      }
    ]
  });

  const handleSendComment = (postId: string) => {
    const text = commentInputMap[postId]?.trim();
    if (!text) return;

    const newComment = {
      id: `comm-${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      text,
      time: 'Agora'
    };

    setCommentsStore(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    onAddComment(postId, text);
    setCommentInputMap(prev => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    return post.type === activeFilter;
  });

  const topCandidate = allProfiles.find(p => p.id !== currentUser.id) || allProfiles[0];

  return (
    <div className="max-w-[1600px] mx-auto px-2.5 sm:px-5 lg:px-6 py-3 sm:py-4 lg:h-full lg:overflow-hidden">
      
      {/* 3-Column Layout from Reference Image 2: Left Profile | Center Feed | Right Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start lg:h-full lg:min-h-0">
        
        {/* LEFT COLUMN: Personal Profile & Networks (Col 3) - Fixed/Sticky */}
        <div className="hidden lg:block lg:col-span-3 self-start h-full min-h-0 overflow-y-auto scrollbar-none pr-1">
          <LeftSidebarProfile
            currentUser={currentUser}
            onOpenProfile={onOpenProfile}
            onNavigateToMatch={onNavigateToMatch}
          />
        </div>

        {/* CENTER COLUMN: Main Content & Social Dynamics (Col 6) */}
        <div className="col-span-1 lg:col-span-6 h-auto lg:h-full min-h-0 space-y-4 overflow-visible lg:overflow-y-auto lg:pr-2">
          
          {/* Post Creation Card */}
          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3 sm:p-4 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/40"
              />
              <button
                onClick={onOpenNewPostModal}
                className="flex-1 text-left px-4 py-2.5 rounded-xl bg-[#0E1220] hover:bg-[#14192D] border border-purple-900/30 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {currentUser.role === 'startup'
                  ? 'No que sua startup está avançando hoje? Compartilhe marcos ou rodada...'
                  : 'Publique uma tese de investimento, cheque disponível ou oportunidade...'}
              </button>
            </div>

            {/* Quick Action Icons */}
            <div className="flex flex-wrap items-center justify-between gap-1 pt-2 border-t border-purple-950/40 text-xs">
              <button
                onClick={onOpenNewPostModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-emerald-400 hover:bg-emerald-500/10 transition-colors font-semibold"
              >
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Mídia</span>
              </button>

              <button
                onClick={onOpenNewPostModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-purple-400 hover:bg-purple-500/10 transition-colors font-bold"
              >
                <Video className="w-4 h-4 text-purple-400" />
                <span>Vídeo Pitch</span>
              </button>

              <button
                onClick={onOpenNewPostModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-blue-400 hover:bg-blue-500/10 transition-colors font-semibold"
              >
                <BarChart2 className="w-4 h-4 text-blue-400" />
                <span>Rodada Aberta</span>
              </button>

              <button
                onClick={onOpenNewPostModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors font-semibold"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Evento</span>
              </button>
            </div>
          </div>

          {/* 3. Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                  : 'bg-[#0C0F1D] text-zinc-400 hover:text-zinc-200 border border-purple-950/40'
              }`}
            >
              Todos os Destaques
            </button>

            <button
              onClick={() => setActiveFilter('video_pitch')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilter === 'video_pitch'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                  : 'bg-[#0C0F1D] text-zinc-400 hover:text-zinc-200 border border-purple-950/40'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Vídeo Pitches</span>
            </button>

            <button
              onClick={() => setActiveFilter('opportunity')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'opportunity'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                  : 'bg-[#0C0F1D] text-zinc-400 hover:text-zinc-200 border border-purple-950/40'
              }`}
            >
              Captações Abertas
            </button>

            <button
              onClick={() => setActiveFilter('thesis')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'thesis'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                  : 'bg-[#0C0F1D] text-zinc-400 hover:text-zinc-200 border border-purple-950/40'
              }`}
            >
              Teses de Fundos
            </button>
          </div>

          {/* 4. Stream of Social Media Post Cards */}
          <div className="space-y-4">
            {filteredPosts.map(post => {
              const isCommentsOpen = activeCommentPostId === post.id;
              const postComments = commentsStore[post.id] || [];

              return (
                <article
                  key={post.id}
                  className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3.5 sm:p-5 shadow-xl transition-all hover:border-purple-800/60 space-y-3.5"
                >
                  
                  {/* Author Lockup */}
                  <div className="flex items-center justify-between">
                    <div 
                      onClick={() => onOpenProfile(post.author)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-xl object-cover ring-1 ring-purple-500/40 group-hover:ring-purple-400 transition-all"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">
                            {post.author.name}
                          </h4>
                          {post.author.verified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                          <span>{post.author.handle}</span>
                          <span>•</span>
                          <span className="text-zinc-500">{post.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <button className="p-1 text-zinc-500 hover:text-zinc-300">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Content Text */}
                  <div className="text-xs text-zinc-200 leading-relaxed space-y-2">
                    <p className="whitespace-pre-line font-medium">
                      {post.content}
                    </p>

                    {/* Financial or Stage Highlight Badge */}
                    {post.financialHighlight && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-extrabold text-[11px]">
                        <span>⚡ {post.financialHighlight}</span>
                        {post.stage && <span className="text-zinc-400">• {post.stage}</span>}
                      </div>
                    )}
                  </div>

                  {/* Media Content */}
                  {post.type === 'video_pitch' && post.videoPitch ? (
                    <div className="rounded-xl overflow-hidden border border-purple-950/40">
                      <VideoPitchPlayer
                        pitch={post.videoPitch}
                        author={post.author}
                        onConnect={() => onConnectWithUser(post.author)}
                        onOpenDeck={() => onOpenProfile(post.author)}
                      />
                    </div>
                  ) : post.mediaUrl ? (
                    <div className="rounded-xl overflow-hidden border border-purple-950/40 max-h-80 bg-black">
                      <img
                        src={post.mediaUrl}
                        alt="Post media"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[11px] text-blue-400/90 hover:text-blue-300 cursor-pointer">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Engagement Bar & CTA Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-purple-950/40">
                    
                    {/* Left Social Reactions */}
                    <div className="flex items-center gap-4 text-xs">
                      <button
                        onClick={() => onToggleLikePost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.userLiked ? 'text-purple-400 font-bold' : 'text-zinc-400 hover:text-purple-300'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-current' : ''}`} />
                        <span className="tabular-nums">{post.likes}</span>
                      </button>

                      <button
                        onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="tabular-nums">{postComments.length || post.commentsCount}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href);
                          alert('Link da publicação copiado!');
                        }}
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="tabular-nums">{post.sharesCount}</span>
                      </button>
                    </div>

                    {/* Right Prominent Action Button (Purple/Blue Innovation Gradient) */}
                    <div>
                      {post.author.id !== currentUser.id ? (
                        <button
                          onClick={() => {
                            if (post.type === 'opportunity') {
                              onConnectWithUser(post.author);
                            } else {
                              onOpenChatWith(post.author);
                            }
                          }}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-purple-950/40 transition-all flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          <span>{post.type === 'opportunity' ? 'Abrir Data Room' : 'Conectar Agora'}</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800/80 px-2.5 py-1 rounded-lg">
                          Sua Publicação
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Inline Comment Composer */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2.5 bg-[#080B16] border border-purple-950/40 rounded-xl px-3 py-1.5">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-purple-500/40"
                      />
                      <input
                        type="text"
                        value={commentInputMap[post.id] || ''}
                        onChange={(e) => setCommentInputMap({ ...commentInputMap, [post.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendComment(post.id);
                        }}
                        placeholder="Escreva um comentário público..."
                        className="flex-1 bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="text-purple-400 hover:text-purple-300 p-1"
                        title="Enviar comentário"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Comments Thread (when opened) */}
                    {isCommentsOpen && postComments.length > 0 && (
                      <div className="mt-3 space-y-2 pl-2 border-l border-purple-950/50">
                        {postComments.map(c => (
                          <div key={c.id} className="text-xs bg-[#0F1424] p-2.5 rounded-xl border border-purple-950/40">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-white text-[11px]">{c.author}</span>
                              <span className="text-[10px] text-zinc-500">{c.time}</span>
                            </div>
                            <p className="text-zinc-300 text-[11px]">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </article>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: Activity & Opportunity Radar (Col 3) - Fixed/Sticky */}
        <div className="hidden lg:block lg:col-span-3 self-start h-full min-h-0 overflow-y-auto scrollbar-none pl-1">
          <RightActivityRadar
            currentUser={currentUser}
            topCandidate={topCandidate}
            events={events}
            notifications={[]}
            onNavigateToMatch={onNavigateToMatch}
            onOpenProfile={onOpenProfile}
            onConnectWithUser={onConnectWithUser}
            onOpenChatWith={onOpenChatWith}
            onToggleRsvpEvent={onToggleRsvpEvent}
          />
        </div>

      </div>

    </div>
  );
};
