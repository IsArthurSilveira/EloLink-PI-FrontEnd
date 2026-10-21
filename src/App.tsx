import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  Post, 
  EventItem, 
  AppNotification, 
  ChatThread, 
  ChatMessage, 
  Review 
} from './types';
import { 
  CURRENT_FOUNDER_USER, 
  CURRENT_INVESTOR_USER, 
  MOCK_PROFILES_LIST, 
  INITIAL_POSTS, 
  INITIAL_EVENTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CHAT_THREADS 
} from './data/mockData';
import { TopNavbar } from './components/TopNavbar';
import { FeedSection } from './components/FeedSection';
import { MatchSection } from './components/MatchSection';
import { EventsSection } from './components/EventsSection';
import { ChatSection } from './components/ChatSection';
import { ProfileModal } from './components/ProfileModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { NotificationToast } from './components/NotificationToast';
import { NewPostModal } from './components/NewPostModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SettingsSection } from './components/SettingsSection';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('elo-link-authenticated') === 'true'
  );
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'feed' | 'match' | 'events' | 'chat' | 'settings'>('feed');
  
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Current logged in user (can switch between Camila and Rodrigo)
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_FOUNDER_USER);

  // Profiles database
  const [profiles, setProfiles] = useState<UserProfile[]>(MOCK_PROFILES_LIST);

  // Feed Posts
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  // Events
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);

  // Internal Chat Threads
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>(INITIAL_CHAT_THREADS[0]?.id || '');

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  // Modals
  const [selectedProfileModal, setSelectedProfileModal] = useState<UserProfile | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  // Auto theme synchronization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isSystemDark ? 'dark' : 'dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Switch between Founder and Investor
  const handleSwitchUser = () => {
    if (currentUser.id === CURRENT_FOUNDER_USER.id) {
      setCurrentUser(CURRENT_INVESTOR_USER);
    } else {
      setCurrentUser(CURRENT_FOUNDER_USER);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('elo-link-authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  // Update current user profile from settings
  const handleUpdateCurrentUser = (updated: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updated }));
    setProfiles(prev => prev.map(p => p.id === currentUser.id ? { ...p, ...updated } : p));
  };

  // Toggle Dark / Light mode
  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Add a new notification and trigger toast
  const triggerNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Agora',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notif.title, {
          body: notif.message,
          icon: notif.actorAvatar || '/favicon.ico'
        });
      } catch (err) {
        // ignore
      }
    }
  };

  // Handle Mutual Match
  const handleMutualMatch = (matchedUser: UserProfile) => {
    let existingThread = threads.find(t => t.participant.id === matchedUser.id);
    if (!existingThread) {
      const newThread: ChatThread = {
        id: `thread-${Date.now()}`,
        participant: matchedUser,
        lastMessage: 'Match confirmado! Você pode iniciar uma conversa direta.',
        lastMessageTime: 'Agora',
        unreadCount: 0,
        matchDate: 'Hoje',
        isMutualMatch: true,
        messages: [
          {
            id: `msg-welcome-${Date.now()}`,
            senderId: 'system',
            senderName: 'Elo Link',
            senderAvatar: '/favicon.ico',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `🎉 Parabéns! Vocês demonstraram interesse mútuo. O canal direto entre ${currentUser.name} e ${matchedUser.name} está desbloqueado para troca de pitch decks e mensagens de áudio.`,
            type: 'text'
          }
        ]
      };
      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
    } else {
      setActiveThreadId(existingThread.id);
    }

    triggerNotification({
      title: 'Novo Match Mútuo! 🚀',
      message: `Você e ${matchedUser.name} deram match! As mensagens privadas foram liberadas.`,
      type: 'match',
      targetId: matchedUser.id,
      actorAvatar: matchedUser.avatar
    });
  };

  // Open chat with specific user
  const handleOpenChatWith = (user: UserProfile) => {
    let thread = threads.find(t => t.participant.id === user.id);
    if (!thread) {
      const newThread: ChatThread = {
        id: `thread-${Date.now()}`,
        participant: user,
        lastMessage: 'Conexão iniciada.',
        lastMessageTime: 'Agora',
        unreadCount: 0,
        matchDate: 'Hoje',
        isMutualMatch: true,
        messages: []
      };
      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
    } else {
      setActiveThreadId(thread.id);
    }
    setActiveTab('chat');
  };

  // Send message in thread
  const handleSendMessage = (threadId: string, messageData: Partial<ChatMessage>) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: messageData.type || 'text',
      text: messageData.text,
      fileData: messageData.fileData,
      audioData: messageData.audioData
    };

    setThreads(prev =>
      prev.map(t => {
        if (t.id === threadId) {
          const lastMsg = 
            newMessage.type === 'file' 
              ? `[Arquivo] ${newMessage.fileData?.name}` 
              : newMessage.type === 'audio' 
              ? `[Mensagem de Áudio ${newMessage.audioData?.durationSec}s]`
              : newMessage.text || '';

          return {
            ...t,
            lastMessage: lastMsg,
            lastMessageTime: newMessage.timestamp,
            messages: [...t.messages, newMessage]
          };
        }
        return t;
      })
    );
  };

  // Feed interactions
  const handleToggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.userLiked;
          return {
            ...post,
            userLiked: isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1
          };
        }
        return post;
      })
    );
  };

  // Submit new post
  const handleCreatePost = (newPostData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'commentsCount' | 'sharesCount'>) => {
    const newPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      timestamp: 'Agora mesmo',
      likes: 1,
      userLiked: true,
      commentsCount: 0,
      sharesCount: 0
    };

    setPosts(prev => [newPost, ...prev]);

    triggerNotification({
      title: 'Oportunidade Publicada no Feed!',
      message: 'Sua publicação foi compartilhada com a rede de fundadores e investidores.',
      type: 'opportunity'
    });
  };

  // RSVP Event
  const handleToggleRsvpEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId) {
          const isReg = !ev.isUserRegistered;
          const updatedParticipants = isReg
            ? [
                {
                  id: currentUser.id,
                  name: currentUser.name,
                  role: currentUser.role,
                  avatar: currentUser.avatar,
                  companyOrFund: currentUser.role === 'startup' ? currentUser.companyName! : currentUser.fundName!
                },
                ...ev.confirmedParticipants
              ]
            : ev.confirmedParticipants.filter(p => p.id !== currentUser.id);

          if (isReg) {
            triggerNotification({
              title: 'Inscrição Confirmada!',
              message: `Sua vaga no evento "${ev.title}" está garantida.`,
              type: 'event',
              targetId: ev.id
            });
          }

          return {
            ...ev,
            isUserRegistered: isReg,
            rsvpsCount: isReg ? ev.rsvpsCount + 1 : ev.rsvpsCount - 1,
            confirmedParticipants: updatedParticipants
          };
        }
        return ev;
      })
    );
  };

  // Add review to a user profile
  const handleAddReview = (targetUserId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Hoje'
    };

    setProfiles(prev =>
      prev.map(p => {
        if (p.id === targetUserId) {
          const updatedReviews = [newReview, ...(p.reviews || [])];
          const totalRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
          const newAvg = totalRating / updatedReviews.length;

          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            averageRating: newAvg
          };
        }
        return p;
      })
    );

    if (selectedProfileModal && selectedProfileModal.id === targetUserId) {
      setSelectedProfileModal(prev => {
        if (!prev) return null;
        const updatedReviews = [newReview, ...(prev.reviews || [])];
        const totalRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        return {
          ...prev,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          averageRating: totalRating / updatedReviews.length
        };
      });
    }

    triggerNotification({
      title: 'Avaliação de Reputação Publicada',
      message: 'Seu depoimento foi adicionado com sucesso ao perfil do parceiro.',
      type: 'comment'
    });
  };

  const handleSimulateNewOpportunity = () => {
    triggerNotification({
      title: 'Nova Oportunidade no Feed! ⚡',
      message: 'A startup Agtech TerraNova acabou de abrir captação de R$ 1.8M com sensoriamento por satélite.',
      type: 'opportunity',
      targetId: 'user-clara-agtech'
    });
  };

  const unreadChatCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#06080F] text-zinc-100' : 'bg-[#0A0D18] text-zinc-100'}`}>
      
      {/* Reference Image 2 Top Navigation Bar */}
      <TopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogout}
        onOpenProfile={(user) => setSelectedProfileModal(user)}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        unreadChatCount={unreadChatCount}
      />

      {/* Main Content Viewport */}
      <main className={activeTab === 'chat' ? 'h-[calc(100dvh-64px)] md:h-[calc(100vh-64px)] pb-16 md:pb-0 overflow-hidden relative' : 'min-h-[calc(100vh-64px)] pb-16 md:pb-6 relative'}>
        {activeTab === 'feed' && (
          <FeedSection
            posts={posts}
            events={events}
            currentUser={currentUser}
            allProfiles={profiles}
            onOpenProfile={(user) => setSelectedProfileModal(user)}
            onOpenNewPostModal={() => setIsNewPostModalOpen(true)}
            onToggleLikePost={handleToggleLikePost}
            onAddComment={handleAddComment}
            onToggleRsvpEvent={handleToggleRsvpEvent}
            onNavigateToMatch={() => setActiveTab('match')}
            onConnectWithUser={handleMutualMatch}
            onOpenChatWith={handleOpenChatWith}
          />
        )}

        {activeTab === 'match' && (
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 lg:py-5 min-h-[calc(100vh-80px)] flex flex-col justify-center">
            <MatchSection
              currentUser={currentUser}
              allProfiles={profiles}
              onOpenProfile={(user) => setSelectedProfileModal(user)}
              onMutualMatch={handleMutualMatch}
              onOpenChatWith={handleOpenChatWith}
            />
          </div>
        )}

        {activeTab === 'events' && (
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
            <EventsSection
              events={events}
              currentUser={currentUser}
              onToggleRsvp={handleToggleRsvpEvent}
              onOpenProfile={(user) => setSelectedProfileModal(user)}
              onOpenChatWithParticipant={(participantId) => {
                const user = profiles.find(p => p.id === participantId);
                if (user) handleOpenChatWith(user);
              }}
            />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="w-full h-full min-h-0 p-1 sm:p-2.5 overflow-hidden">
            <ChatSection
              threads={threads}
              activeThreadId={activeThreadId}
              onSelectThread={(id) => setActiveThreadId(id)}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onViewProfile={(user) => setSelectedProfileModal(user)}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <SettingsSection
            currentUser={currentUser}
            onUpdateCurrentUser={handleUpdateCurrentUser}
            onSwitchUser={handleSwitchUser}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onTriggerNotification={triggerNotification}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadChatCount={unreadChatCount}
      />

      {/* Profile Detail Modal */}
      <ProfileModal
        user={selectedProfileModal}
        currentUser={currentUser}
        isOpen={!!selectedProfileModal}
        onClose={() => setSelectedProfileModal(null)}
        onStartChat={handleOpenChatWith}
        onAddReview={handleAddReview}
      />

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        currentUser={currentUser}
        onSubmitPost={handleCreatePost}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
        onSelectNotification={(notif) => {
          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
          setIsNotificationsOpen(false);
          if (notif.type === 'match') {
            setActiveTab('chat');
          } else if (notif.type === 'event') {
            setActiveTab('events');
          } else {
            setActiveTab('feed');
          }
        }}
        onSimulateNewOpportunity={handleSimulateNewOpportunity}
      />

      {/* Toast Alert */}
      <NotificationToast
        notification={activeToast}
        onClose={() => setActiveToast(null)}
        onActionClick={(notif) => {
          if (notif.type === 'match') setActiveTab('chat');
          else if (notif.type === 'event') setActiveTab('events');
          else setActiveTab('feed');
        }}
      />

    </div>
  );
}
