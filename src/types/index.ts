export type UserRole = 'startup' | 'investor';

export type MarketNiche = 
  | 'AI & B2B SaaS'
  | 'Fintech'
  | 'Healthtech'
  | 'Cleantech & Clima'
  | 'Agtech'
  | 'Logtech & Supply'
  | 'Edtech'
  | 'Deeptech & Hardware';

export type FundingStage = 'Pre-seed' | 'Seed' | 'Série A' | 'Série B';

export type FounderExperience = 
  | 'Ex-BigTech / Unicornio'
  | 'Serial Founder (Exits)'
  | '10+ anos no mercado corporativo'
  | 'Pesquisador / PhD Acadêmico';

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string; // e.g. "Lead Investor - Rodada Seed", "Mentor & Co-investidor"
  authorAvatar: string;
  targetId: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  tags: string[]; // e.g. ["Smart Money", "Resiliência", "Governança Ágil"]
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  logoText: string;
  sector: MarketNiche;
  stage: FundingStage;
  targetAmount?: string;
  raisedAmount?: string;
  status?: 'Ativo' | 'Investida' | 'Exit' | 'Acelerada';
  metricHighlight?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  role: UserRole;
  headline: string;
  avatar: string;
  coverImage?: string;
  location: string;
  niches: MarketNiche[];
  experience: FounderExperience[];
  bio: string;
  verified: boolean;
  website?: string;
  linkedin?: string;
  // Startup-specific fields
  companyName?: string;
  foundingYear?: number;
  stage?: FundingStage;
  targetRound?: string;
  alreadyRaised?: string;
  mrr?: string;
  growthRate?: string;
  activeClients?: number;
  pitchDeckName?: string;
  pitchDeckUrl?: string;
  problemSummary?: string;
  solutionSummary?: string;
  // Investor-specific fields
  fundName?: string;
  ticketRange?: {
    min: number; // in thousands R$
    max: number;
  };
  aum?: string; // Assets under management e.g. "R$ 45M"
  thesis?: string;
  preferredStages?: FundingStage[];
  portfolioCount?: number;
  videoPitch?: VideoPitch;
  // Reviews & ratings
  averageRating: number;
  reviewsCount: number;
  reviews: Review[];
  portfolioItems: PortfolioItem[];
}

export interface VideoPitch {
  title: string;
  duration: string;
  viewsCount: number;
  thumbnail: string;
  speakerName: string;
  speakerRole: string;
  keyProblem: string;
  keySolution: string;
  metricsKicker: string;
}

export interface Post {
  id: string;
  author: UserProfile;
  type: 'opportunity' | 'thesis' | 'traction_update' | 'event_highlight' | 'video_pitch';
  timestamp: string;
  content: string;
  niche: MarketNiche;
  stage?: FundingStage;
  financialHighlight?: string; // e.g. "Alvo: R$ 2.5M", "Ticket: R$ 300k - R$ 1M"
  location: string;
  likes: number;
  userLiked?: boolean;
  commentsCount: number;
  sharesCount: number;
  mediaUrl?: string;
  mediaType?: 'image' | 'deck_preview' | 'metric_chart' | 'video';
  videoPitch?: VideoPitch;
  tags: string[];
  eventId?: string; // if tied to an event
}

export interface MatchOpportunity {
  profile: UserProfile;
  affinityScore: number; // e.g. 96 (%)
  affinityReasons: string[];
  status: 'pending' | 'liked_by_me' | 'liked_by_them' | 'matched' | 'passed';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  text?: string;
  type: 'text' | 'file' | 'audio';
  fileData?: {
    name: string;
    size: string;
    extension: string;
    downloadUrl?: string;
  };
  audioData?: {
    durationSec: number;
    audioUrl?: string; // blob or simulated
    waveform: number[];
  };
}

export interface ChatThread {
  id: string;
  participant: UserProfile;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  matchDate: string;
  isMutualMatch: boolean;
  messages: ChatMessage[];
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Demo Day' | 'Pitch Night' | 'VC Roundtable' | 'Workshop & Diligence';
  organizer: string;
  date: string;
  time: string;
  location: string;
  format: 'Online' | 'Presencial' | 'Híbrido';
  bannerImage: string;
  description: string;
  niches: MarketNiche[];
  rsvpsCount: number;
  isUserRegistered: boolean;
  confirmedParticipants: {
    id: string;
    name: string;
    role: UserRole;
    avatar: string;
    companyOrFund: string;
  }[];
  capacity?: number;
  agenda?: {
    time: string;
    title: string;
    speaker?: string;
  }[];
  virtualLink?: string;
  featuredSpeakers?: {
    name: string;
    role: string;
    avatar: string;
  }[];
  stageFocus?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'match' | 'invite' | 'comment' | 'opportunity' | 'event';
  timestamp: string;
  read: boolean;
  targetId?: string;
  actorAvatar?: string;
}

export interface SearchFilters {
  searchTerm: string;
  niche: MarketNiche | 'all';
  location: string;
  stage: FundingStage | 'all';
  experience: FounderExperience | 'all';
  roleFilter: UserRole | 'all';
  minTicket?: number;
  maxTicket?: number;
}
