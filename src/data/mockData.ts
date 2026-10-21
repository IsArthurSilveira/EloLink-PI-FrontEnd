import { UserProfile, Post, EventItem, AppNotification, ChatThread } from '../types';

export const CURRENT_FOUNDER_USER: UserProfile = {
  id: 'user-camila',
  name: 'Camila Rocha',
  handle: '@camilasrocha',
  role: 'startup',
  headline: 'Co-fundadora & CEO na OmniFlow AI · Ex-iFood Tech Lead',
  avatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
  location: 'São Paulo, SP (Híbrido)',
  niches: ['AI & B2B SaaS', 'Logtech & Supply'],
  experience: ['Ex-BigTech / Unicornio', 'Serial Founder (Exits)'],
  bio: 'Construindo o sistema operacional de orquestração autônoma de fluxos de supply chain para o mercado B2B na América Latina. Rodada Seed aberta.',
  verified: true,
  website: 'https://omniflow.ai',
  linkedin: 'https://linkedin.com/in/camilasrocha',
  companyName: 'OmniFlow AI',
  foundingYear: 2024,
  stage: 'Seed',
  targetRound: 'R$ 3.500.000',
  alreadyRaised: 'R$ 1.800.000 (51% fechado)',
  mrr: 'R$ 94.000',
  growthRate: '+24% MoM',
  activeClients: 38,
  pitchDeckName: 'OmniFlow_Seed_Deck_Q3.pdf',
  problemSummary: 'Gargalos manuais em aprovações logísticas corporativas consom 40% das horas de equipes de procurement.',
  solutionSummary: 'Agentes inteligentes que integram ERPs legados e automatizam 85% das cotações e auditorias de fornecedores.',
  videoPitch: {
    title: 'OmniFlow AI: Orquestração Autônoma de Supply Chain B2B',
    duration: '02:14',
    viewsCount: 1420,
    thumbnail: '/assets/images/startup_showcase_tech_1792400689208.jpg',
    speakerName: 'Camila Rocha',
    speakerRole: 'CEO & Co-fundadora',
    keyProblem: '40% do tempo de procurement é perdido em conferências manuais de pedidos.',
    keySolution: 'Agentes de IA que conectam ERPs legados (SAP/TOTVS) e aprovam cotações em segundos.',
    metricsKicker: 'R$ 94k MRR (+24% MoM) · 38 clientes corporativos'
  },
  averageRating: 4.9,
  reviewsCount: 7,
  reviews: [
    {
      id: 'rev-1',
      authorId: 'user-rodrigo',
      authorName: 'Rodrigo Mendes',
      authorRole: 'General Partner · Nexa Horizons VC',
      authorAvatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
      targetId: 'user-camila',
      rating: 5,
      comment: 'A Camila tem uma capacidade de execução e clareza de métricas raras no ecossistema. Co-investi na fase anjo e o crescimento de MRR foi impressionante trimestre a trimestre.',
      date: '14 de Outubro, 2026',
      tags: ['Execução Veloz', 'Transparência', 'Smart Execution']
    },
    {
      id: 'rev-2',
      authorId: 'user-lucas-angel',
      authorName: 'Beatriz Vasconcellos',
      authorRole: 'Syndicate Lead · Angels Latam',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      targetId: 'user-camila',
      rating: 5,
      comment: 'Governança impecável e updates mensais sempre pontuais com cohorts claras. Grande prazer em fazer parte do cap table.',
      date: '28 de Setembro, 2026',
      tags: ['Governança Ágil', 'Clareza de Métricas']
    }
  ],
  portfolioItems: [
    {
      id: 'port-1',
      name: 'OmniFlow Core AI',
      description: 'Plataforma SaaS de orquestração de workflows complexos com RAG empresarial.',
      logoText: 'OF',
      sector: 'AI & B2B SaaS',
      stage: 'Seed',
      targetAmount: 'R$ 3.5M',
      metricHighlight: 'R$ 94k MRR (+24% MoM)'
    },
    {
      id: 'port-2',
      name: 'SmartProcure Plugin',
      description: 'Extensão de auditoria e mitigação de risco de faturamento para SAP e TOTVS.',
      logoText: 'SP',
      sector: 'Logtech & Supply',
      stage: 'Seed',
      metricHighlight: '12 enterprise POCs'
    }
  ]
};

export const CURRENT_INVESTOR_USER: UserProfile = {
  id: 'user-rodrigo',
  name: 'Rodrigo Mendes',
  handle: '@rodrigo_vc',
  role: 'investor',
  headline: 'General Partner na Nexa Horizons · Early Stage VC LatAm',
  avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
  location: 'São Paulo & San Francisco',
  niches: ['AI & B2B SaaS', 'Fintech', 'Healthtech'],
  experience: ['10+ anos no mercado corporativo', 'Ex-BigTech / Unicornio'],
  bio: 'Investindo em rodadas Pre-Seed e Seed de fundadores técnicos resolvendo fricções estruturais na América Latina. Ticket médio: R$ 500k a R$ 2.5M.',
  verified: true,
  website: 'https://nexahorizons.vc',
  linkedin: 'https://linkedin.com/in/rodrigovc',
  fundName: 'Nexa Horizons Fund II',
  ticketRange: {
    min: 500,
    max: 2500
  },
  aum: 'R$ 75.000.000',
  thesis: 'Foco em fundadores com alta densidade técnica, dores de alta frequência B2B e modelo de expansão com net revenue retention superior a 115%.',
  preferredStages: ['Pre-seed', 'Seed'],
  portfolioCount: 19,
  averageRating: 5.0,
  reviewsCount: 11,
  reviews: [
    {
      id: 'rev-inv-1',
      authorId: 'user-camila',
      authorName: 'Camila Rocha',
      authorRole: 'CEO na OmniFlow AI',
      authorAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
      targetId: 'user-rodrigo',
      rating: 5,
      comment: 'O Rodrigo é a definição de Smart Money. Abriu portas com 3 dos nossos maiores clientes corporativos e nos ajudou a redesenhar a precificação da rodada.',
      date: '10 de Outubro, 2026',
      tags: ['Smart Money', 'Acesso a Clientes', 'Fundador Centric']
    },
    {
      id: 'rev-inv-2',
      authorId: 'user-gabriel',
      authorName: 'Gabriel Siqueira',
      authorRole: 'Fundador na Pulso Health',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      targetId: 'user-rodrigo',
      rating: 5,
      comment: 'Diligência rápida e sem burocracias desnecessárias. Term sheet enviado em menos de 10 dias após o primeiro pitch.',
      date: '02 de Setembro, 2026',
      tags: ['Agilidade', 'Term Sheet Transparente']
    }
  ],
  portfolioItems: [
    {
      id: 'inv-port-1',
      name: 'OmniFlow AI',
      description: 'Orquestração autônoma de workflows de supply chain com IA.',
      logoText: 'OF',
      sector: 'AI & B2B SaaS',
      stage: 'Seed',
      status: 'Investida',
      metricHighlight: '+24% MoM'
    },
    {
      id: 'inv-port-2',
      name: 'Pulso Health',
      description: 'Prontuário eletrônico interoperável com copiloto clínico para hospitais.',
      logoText: 'PH',
      sector: 'Healthtech',
      stage: 'Seed',
      status: 'Investida',
      metricHighlight: 'R$ 280k MRR'
    },
    {
      id: 'inv-port-3',
      name: 'CredFlow',
      description: 'Infraestrutura de crédito colateralizado para o agronegócio.',
      logoText: 'CF',
      sector: 'Fintech',
      stage: 'Série A',
      status: 'Investida',
      metricHighlight: 'R$ 45M transacionados'
    }
  ]
};

export const MOCK_PROFILES_LIST: UserProfile[] = [
  CURRENT_FOUNDER_USER,
  CURRENT_INVESTOR_USER,
  {
    id: 'user-gabriel-pulso',
    name: 'Gabriel Siqueira & Dra. Helena Paiva',
    handle: '@pulsohealth',
    role: 'startup',
    headline: 'Fundadores da Pulso Health · Copiloto Clínico & Interoperabilidade',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Belo Horizonte, MG',
    niches: ['Healthtech', 'AI & B2B SaaS'],
    experience: ['Pesquisador / PhD Acadêmico', '10+ anos no mercado corporativo'],
    bio: 'Reduzindo em 70% o tempo de digitação de anamneses e prontuários em redes hospitalares privadas com IA de voz calibrada para termos médicos.',
    verified: true,
    website: 'https://pulso.health',
    companyName: 'Pulso Health',
    foundingYear: 2023,
    stage: 'Seed',
    targetRound: 'R$ 4.000.000',
    alreadyRaised: 'R$ 2.200.000',
    mrr: 'R$ 280.000',
    growthRate: '+19% MoM',
    activeClients: 14,
    pitchDeckName: 'Pulso_Health_Seed_2026.pdf',
    problemSummary: 'Médicos passam 3h por plantão preenchendo telas de prontuários, gerando burnout e erros de faturamento TISS.',
    solutionSummary: 'Microfone de escuta ambiente durante consulta que gera o prontuário estruturado e codificação CID/TUSS automaticamente.',
    videoPitch: {
      title: 'Pulso Health: O Copiloto de Voz que Salva 3h por Plantão Médico',
      duration: '01:52',
      viewsCount: 980,
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      speakerName: 'Gabriel Siqueira',
      speakerRole: 'Co-fundador & CTO',
      keyProblem: 'Médicos gastam 18 minutos por consulta preenchendo telas de prontuários.',
      keySolution: 'IA de voz ambiente treinada no vocabulário médico brasileiro com 99% de acurácia.',
      metricsKicker: 'R$ 280k MRR (+19% MoM) · 98% retenção de médicos'
    },
    averageRating: 4.8,
    reviewsCount: 5,
    reviews: [
      {
        id: 'rev-p-1',
        authorId: 'user-rodrigo',
        authorName: 'Rodrigo Mendes',
        authorRole: 'Nexa Horizons',
        authorAvatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        targetId: 'user-gabriel-pulso',
        rating: 5,
        comment: 'Solução validada diretamente no chão de hospital com retenção de 98% dos médicos cadastrados.',
        date: '04 de Outubro, 2026',
        tags: ['Tração Clínica', 'Retenção Alta']
      }
    ],
    portfolioItems: [
      {
        id: 'ph-item-1',
        name: 'Pulso Ambient Scribe',
        description: 'Mecanismo de transcrição em tempo real para hospitais.',
        logoText: 'PS',
        sector: 'Healthtech',
        stage: 'Seed',
        metricHighlight: '98% retenção médica'
      }
    ]
  },
  {
    id: 'user-clara-agtech',
    name: 'Clara Fagundes',
    handle: '@clara_agroterra',
    role: 'startup',
    headline: 'CEO & Fundadora na TerraNova Agtech · Sensoriamento Satelital',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    location: 'Florianópolis, SC / Mato Grosso',
    niches: ['Agtech', 'Cleantech & Clima'],
    experience: ['Serial Founder (Exits)', 'Pesquisador / PhD Acadêmico'],
    bio: 'Monitoramento preditivo de biomassa e emissões de carbono em fazendas de grãos usando radar orbital e sensores IoT.',
    verified: true,
    website: 'https://terranova.agro',
    companyName: 'TerraNova Agtech',
    foundingYear: 2024,
    stage: 'Pre-seed',
    targetRound: 'R$ 1.800.000',
    alreadyRaised: 'R$ 750.000',
    mrr: 'R$ 48.000',
    growthRate: '+31% MoM',
    activeClients: 22,
    pitchDeckName: 'TerraNova_PreSeed_Deck.pdf',
    problemSummary: 'Produtores rurais perdem até 18% da safra por detecção tardia de anomalias hídricas e pragas.',
    solutionSummary: 'Satélites com resolução diária e alerta automatizado por WhatsApp aos agrônomos de campo.',
    videoPitch: {
      title: 'TerraNova Agtech: Radar Orbital de Carbono e Produtividade Agrícola',
      duration: '02:08',
      viewsCount: 740,
      thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
      speakerName: 'Clara Fagundes',
      speakerRole: 'CEO & Fundadora',
      keyProblem: 'Perda de 18% da safra por anomalias hídricas não identificadas a tempo.',
      keySolution: 'Satélites de radar e IA preditiva com alertas automáticos no WhatsApp do produtor.',
      metricsKicker: 'R$ 48k MRR (+31% MoM) · 45 mil hectares monitorados'
    },
    averageRating: 5.0,
    reviewsCount: 3,
    reviews: [],
    portfolioItems: [
      {
        id: 'tn-item-1',
        name: 'TerraNova Radar Bio',
        description: 'Mapeamento de umidade e carbono de solo com IA.',
        logoText: 'TN',
        sector: 'Agtech',
        stage: 'Pre-seed',
        metricHighlight: '45.000 hectares monitorados'
      }
    ]
  },
  {
    id: 'user-investor-mariana',
    name: 'Mariana Duarte',
    handle: '@marianaduarte_vc',
    role: 'investor',
    headline: 'Managing Director na GreenImpact Capital · Clima & Bioeconomia',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    location: 'São Paulo & Curitiba',
    niches: ['Cleantech & Clima', 'Agtech'],
    experience: ['10+ anos no mercado corporativo'],
    bio: 'Buscando tecnologias pioneiras que aceleram a descarbonização das cadeias produtivas no Brasil. Ticket: R$ 1M a R$ 4M.',
    verified: true,
    website: 'https://greenimpact.capital',
    fundName: 'GreenImpact Fund I',
    ticketRange: {
      min: 1000,
      max: 4000
    },
    aum: 'R$ 120.000.000',
    thesis: 'Climatempo tech, monitoramento de carbono, bioinsumos e energia renovável descentralizada.',
    preferredStages: ['Seed', 'Série A'],
    portfolioCount: 14,
    averageRating: 4.9,
    reviewsCount: 8,
    reviews: [
      {
        id: 'rev-md-1',
        authorId: 'user-clara-agtech',
        authorName: 'Clara Fagundes',
        authorRole: 'TerraNova Agtech',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        targetId: 'user-investor-mariana',
        rating: 5,
        comment: 'A Mariana e a equipe da GreenImpact compreendem a fundo a regulação de carbono brasileira. Foi crucial para nossa estratégia B2B.',
        date: '20 de Agosto, 2026',
        tags: ['Expertise Setorial', 'Parceria Estratégica']
      }
    ],
    portfolioItems: [
      {
        id: 'gi-port-1',
        name: 'SoluVerde Bio',
        description: 'Bioplásticos fermentados a partir de resíduos de cana.',
        logoText: 'SV',
        sector: 'Cleantech & Clima',
        stage: 'Série A',
        status: 'Investida',
        metricHighlight: 'Capacidade 100 ton/mês'
      }
    ]
  },
  {
    id: 'user-investor-andre',
    name: 'André Vianna',
    handle: '@andrevianna_fintech',
    role: 'investor',
    headline: 'Partner na Horizon Fintech Ventures · Especialista B2B & Embedded Finance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'São Paulo, SP',
    niches: ['Fintech', 'AI & B2B SaaS'],
    experience: ['Ex-BigTech / Unicornio', '10+ anos no mercado corporativo'],
    bio: 'Ex-CFO de fintech unicórnio investindo em infraestrutura de pagamentos, BaaS, core banking modular e crédito inteligente.',
    verified: true,
    website: 'https://horizonfintech.com',
    fundName: 'Horizon Seed Fund',
    ticketRange: {
      min: 750,
      max: 3000
    },
    aum: 'R$ 90.000.000',
    thesis: 'Plataformas verticais de software que habilitam serviços financeiros embutidos com margem líquida robusta.',
    preferredStages: ['Pre-seed', 'Seed', 'Série A'],
    portfolioCount: 16,
    averageRating: 5.0,
    reviewsCount: 9,
    reviews: [],
    portfolioItems: [
      {
        id: 'hfv-item-1',
        name: 'PlugPay Core',
        description: 'Infraestrutura de Pix parcelado e conciliação instantânea.',
        logoText: 'PP',
        sector: 'Fintech',
        stage: 'Seed',
        status: 'Investida',
        metricHighlight: 'R$ 80M TPV mensal'
      }
    ]
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-demoday-2026',
    title: 'Elo Link Latin America Demo Day Q4',
    category: 'Demo Day',
    organizer: 'Elo Link Ventures & Cubo Itaú',
    date: '28 de Outubro, 2026',
    time: '18:30 - 21:30 BRT',
    location: 'São Paulo, SP (Presencial) + Live Stream',
    format: 'Híbrido',
    bannerImage: '/assets/images/event_demoday_stage_1792400689479.jpg',
    description: 'Apresentação exclusiva de 12 startups em estágio Seed selecionadas nos setores de AI Empresarial, Clima e Fintech. Sessão de perguntas diretas com mais de 80 VCs e investidores anjo confirmados.',
    niches: ['AI & B2B SaaS', 'Fintech', 'Cleantech & Clima'],
    rsvpsCount: 142,
    capacity: 200,
    stageFocus: 'Seed & Pré-Seed',
    virtualLink: 'https://meet.google.com/elo-demoday-2026',
    isUserRegistered: true,
    confirmedParticipants: [
      {
        id: 'user-rodrigo',
        name: 'Rodrigo Mendes',
        role: 'investor',
        avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        companyOrFund: 'Nexa Horizons VC'
      },
      {
        id: 'user-camila',
        name: 'Camila Rocha',
        role: 'startup',
        avatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        companyOrFund: 'OmniFlow AI'
      },
      {
        id: 'user-investor-mariana',
        name: 'Mariana Duarte',
        role: 'investor',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        companyOrFund: 'GreenImpact Capital'
      },
      {
        id: 'user-gabriel-pulso',
        name: 'Gabriel Siqueira',
        role: 'startup',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        companyOrFund: 'Pulso Health'
      }
    ],
    agenda: [
      { time: '18:30 - 18:50', title: 'Boas-vindas e Panorama de Venture Capital Q4', speaker: 'Rodrigo Mendes (Nexa Horizons)' },
      { time: '18:50 - 20:00', title: 'Pitch Session: 12 Startups Selecionadas (4 min pitch + 3 min Q&A)' },
      { time: '20:00 - 20:40', title: 'Votação dos Jurados & Feedback dos Lead Investors' },
      { time: '20:40 - 21:30', title: 'Cocktail de Networking Presencial e Breakout Rooms Virtuais' }
    ],
    featuredSpeakers: [
      { name: 'Rodrigo Mendes', role: 'General Partner na Nexa Horizons', avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg' },
      { name: 'Camila Rocha', role: 'Founder & CEO na OmniFlow AI', avatar: '/assets/images/avatar_founder_camila_1792400686938.jpg' }
    ]
  },
  {
    id: 'event-roundtable-ai',
    title: 'Investor Roundtable: Valuations & Diligence em Startups de IA',
    category: 'VC Roundtable',
    organizer: 'Nexa Horizons & LatAm Angels',
    date: '05 de Novembro, 2026',
    time: '09:00 - 11:00 BRT',
    location: 'Google for Startups Campus / Sala Virtual',
    format: 'Online',
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    description: 'Discussão restrita entre gestores de fundos e anjos sobre métricas sustentáveis de retenção, custos de inferência de GPU e proteção de IP em rodadas Seed na América Latina.',
    niches: ['AI & B2B SaaS', 'Deeptech & Hardware'],
    rsvpsCount: 68,
    capacity: 80,
    stageFocus: 'Seed & Série A',
    virtualLink: 'https://zoom.us/j/latam-ai-roundtable',
    isUserRegistered: false,
    confirmedParticipants: [
      {
        id: 'user-rodrigo',
        name: 'Rodrigo Mendes',
        role: 'investor',
        avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        companyOrFund: 'Nexa Horizons VC'
      },
      {
        id: 'user-investor-andre',
        name: 'André Vianna',
        role: 'investor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        companyOrFund: 'Horizon Fintech'
      }
    ],
    agenda: [
      { time: '09:00 - 09:20', title: 'Deep-dive: Economia unitária e margens brutas em AI nativa' },
      { time: '09:20 - 10:20', title: 'Mesa-redonda com GPs e Anjos de Tecnologia' },
      { time: '10:20 - 11:00', title: 'Sessão aberta de Deals & Co-investimentos em andamento' }
    ]
  },
  {
    id: 'event-pitch-healthtech',
    title: 'Healthtech & Biotech Pitch Night: Clínicas e Capital',
    category: 'Pitch Night',
    organizer: 'Hospital Israelita Albert Einstein Inovação',
    date: '12 de Novembro, 2026',
    time: '19:00 - 21:30 BRT',
    location: 'Belo Horizonte, MG (Biotech Hub)',
    format: 'Presencial',
    bannerImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    description: 'Encontro presencial focado em startups de tecnologia em saúde apresentando para diretores médicos, hospitais de ponta e fundos de venture capital especializados.',
    niches: ['Healthtech'],
    rsvpsCount: 95,
    capacity: 120,
    stageFocus: 'Early Stage & Seed',
    isUserRegistered: false,
    confirmedParticipants: [
      {
        id: 'user-gabriel-pulso',
        name: 'Gabriel Siqueira',
        role: 'startup',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        companyOrFund: 'Pulso Health'
      }
    ],
    agenda: [
      { time: '19:00 - 19:30', title: 'Credenciamento e Coquetel de Acolhimento' },
      { time: '19:30 - 20:45', title: 'Pitche de 8 Startups Healthtech pré-selecionadas' },
      { time: '20:45 - 21:30', title: 'Conexões diretas e agendamento de POCs hospitalares' }
    ]
  },
  {
    id: 'event-fintech-summit',
    title: 'Fintech & Open Finance Showcase 2026',
    category: 'Demo Day',
    organizer: 'Fintech LatAm & BTG Pactual Hub',
    date: '18 de Novembro, 2026',
    time: '14:00 - 18:00 BRT',
    location: 'São Paulo, SP (Av. Brigadeiro Faria Lima, 3477)',
    format: 'Presencial',
    bannerImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    description: 'Encontro de alto nível reunindo as 10 startups mais promissoras de crédito, pagamentos, infraestrutura bancária e IA antifraude para bancas de C-levels e investidores.',
    niches: ['Fintech', 'AI & B2B SaaS'],
    rsvpsCount: 178,
    capacity: 220,
    stageFocus: 'Seed & Série A',
    isUserRegistered: true,
    confirmedParticipants: [
      {
        id: 'user-investor-andre',
        name: 'André Vianna',
        role: 'investor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        companyOrFund: 'Horizon Fintech'
      },
      {
        id: 'user-rodrigo',
        name: 'Rodrigo Mendes',
        role: 'investor',
        avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        companyOrFund: 'Nexa Horizons VC'
      }
    ],
    agenda: [
      { time: '14:00 - 14:40', title: 'Abertura: O futuro do Open Finance e Pagamentos Instantâneos' },
      { time: '14:40 - 16:30', title: 'Pitches das 10 Startups Finalistas' },
      { time: '16:30 - 18:00', title: 'Salas de Negociação 1:1 e Coquetel' }
    ]
  },
  {
    id: 'event-climate-pitch',
    title: 'GreenTech & Climate Pitch Battle: Descarbonização',
    category: 'Pitch Night',
    organizer: 'GreenImpact Capital & Climate Ventures',
    date: '24 de Novembro, 2026',
    time: '17:00 - 19:30 BRT',
    location: 'Online via Plataforma Interativa',
    format: 'Online',
    bannerImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80',
    description: 'Competição de pitches ao vivo com premiação e fast-track para fundos com tese de impacto ecológico, créditos de carbono verificados e transição energética.',
    niches: ['Cleantech & Clima', 'Agtech'],
    rsvpsCount: 114,
    capacity: 150,
    stageFocus: 'Pre-seed & Seed',
    virtualLink: 'https://meet.google.com/greentech-pitch-2026',
    isUserRegistered: false,
    confirmedParticipants: [
      {
        id: 'user-investor-mariana',
        name: 'Mariana Duarte',
        role: 'investor',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        companyOrFund: 'GreenImpact Capital'
      }
    ],
    agenda: [
      { time: '17:00 - 17:20', title: 'Palestra: Métricas ESG na ótica dos fundos globais' },
      { time: '17:20 - 18:50', title: 'Pitches competitivos (3 min pitch, 2 min réplica)' },
      { time: '18:50 - 19:30', title: 'Anúncio das startups selecionadas para Due Diligence' }
    ]
  },
  {
    id: 'event-diligence-workshop',
    title: 'Workshop Prático: Data Room, Term Sheet & SAFE Agreements',
    category: 'Workshop & Diligence',
    organizer: 'TozziniFreire Advogados & Elo Link Legal',
    date: '01 de Dezembro, 2026',
    time: '10:00 - 12:30 BRT',
    location: 'Webinar Exclusivo + Material Didático',
    format: 'Online',
    bannerImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    description: 'Imersão jurídica e de governança para fundadores preparando suas primeiras rodadas. Modelos de contratos, cláusulas de não diluição, vesting e governança ágil.',
    niches: ['AI & B2B SaaS', 'Fintech', 'Healthtech'],
    rsvpsCount: 205,
    capacity: 300,
    stageFocus: 'Todos os estágios',
    virtualLink: 'https://zoom.us/w/legal-diligence-mastery',
    isUserRegistered: true,
    confirmedParticipants: [
      {
        id: 'user-camila',
        name: 'Camila Rocha',
        role: 'startup',
        avatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        companyOrFund: 'OmniFlow AI'
      }
    ],
    agenda: [
      { time: '10:00 - 10:45', title: 'Como estruturar o Data Room sem pontas soltas' },
      { time: '10:45 - 11:30', title: 'Term Sheets desmistificados: o que negociar e o que ceder' },
      { time: '11:30 - 12:30', title: 'Q&A jurídico com advogados seniores de M&A e VC' }
    ]
  },
  {
    id: 'event-saas-speed-dating',
    title: 'B2B SaaS Founder-Investor Speed Dating 1:1',
    category: 'VC Roundtable',
    organizer: 'ACATE & Floripa Angels',
    date: '08 de Dezembro, 2026',
    time: '15:00 - 18:30 BRT',
    location: 'Florianópolis, SC (Passeio Primavera Hub)',
    format: 'Presencial',
    bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    description: 'Rodadas dinâmicas de 10 minutos entre fundadores de software recorrente B2B com faturamento comprovado e investidores que lideram cheques de R$ 500k a R$ 3M.',
    niches: ['AI & B2B SaaS'],
    rsvpsCount: 88,
    capacity: 100,
    stageFocus: 'Pre-seed & Seed',
    isUserRegistered: false,
    confirmedParticipants: [
      {
        id: 'user-rodrigo',
        name: 'Rodrigo Mendes',
        role: 'investor',
        avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        companyOrFund: 'Nexa Horizons VC'
      }
    ],
    agenda: [
      { time: '15:00 - 15:30', title: 'Credenciamento e alocação de mesas' },
      { time: '15:30 - 17:30', title: '8 Rodadas de Speed Dating 1:1 (10 min cada)' },
      { time: '17:30 - 18:30', title: 'Happy hour de encerramento' }
    ]
  },
  {
    id: 'event-agtech-demoday',
    title: 'AgTech Cerrado Demo Day: Sensores, Drones e Bioinsumos',
    category: 'Demo Day',
    organizer: 'AgroVentures & Embrapa Inova',
    date: '15 de Dezembro, 2026',
    time: '09:30 - 16:00 BRT',
    location: 'Ribeirão Preto, SP (Parque Tecnológico)',
    format: 'Presencial',
    bannerImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80',
    description: 'O maior encontro de inovação no agronegócio do interior paulista, com demonstrações a campo, rodada de negócios com cooperativas e fundos temáticos.',
    niches: ['Agtech', 'Cleantech & Clima'],
    rsvpsCount: 160,
    capacity: 250,
    stageFocus: 'Seed & Série A',
    isUserRegistered: false,
    confirmedParticipants: [],
    agenda: [
      { time: '09:30 - 10:30', title: 'Painel: Digitalização da fazenda e redução de perdas' },
      { time: '10:30 - 13:00', title: 'Pitch Session de 10 AgTechs no palco principal' },
      { time: '14:00 - 16:00', title: 'Demonstrações práticas de campo e rodadas de negócios' }
    ]
  },
  {
    id: 'event-deeptech-roundtable',
    title: 'DeepTech & Hardware Frontier: Rodadas Seed e Séries A',
    category: 'VC Roundtable',
    organizer: 'Poli Angels & HardTech Brasil',
    date: '12 de Janeiro, 2027',
    time: '18:00 - 20:00 BRT',
    location: 'Transmissão Ao Vivo & Discord VIP',
    format: 'Online',
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    description: 'Encontro com fundos internacionais e especialistas em robótica, semicondutores, IoT industrial e fotônica discutindo teses de longo prazo e captação global.',
    niches: ['Deeptech & Hardware', 'AI & B2B SaaS'],
    rsvpsCount: 76,
    capacity: 100,
    stageFocus: 'Seed & Série A',
    virtualLink: 'https://meet.google.com/deeptech-frontier-2027',
    isUserRegistered: false,
    confirmedParticipants: [],
    agenda: [
      { time: '18:00 - 18:30', title: 'Keynote: O ressurgimento do investimento em hardware avançado' },
      { time: '18:30 - 19:30', title: 'Debate com fundos especializados em DeepTech' },
      { time: '19:30 - 20:00', title: 'Apresentação de 3 protótipos em fase de patente' }
    ]
  },
  {
    id: 'event-edtech-pitch',
    title: 'EdTech Global Pitch: Da Educação Básica ao Reskilling',
    category: 'Pitch Night',
    organizer: 'Instituto Ayrton Senna & EdTech Hub',
    date: '20 de Janeiro, 2027',
    time: '19:00 - 21:00 BRT',
    location: 'Online via Zoom',
    format: 'Online',
    bannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    description: 'Pitches focados em inteligência artificial para tutoria individual, plataformas corporativas de upskilling e redução da evasão escolar.',
    niches: ['Edtech', 'AI & B2B SaaS'],
    rsvpsCount: 82,
    capacity: 120,
    stageFocus: 'Early Stage & Seed',
    virtualLink: 'https://zoom.us/j/edtech-global-pitch',
    isUserRegistered: false,
    confirmedParticipants: [],
    agenda: [
      { time: '19:00 - 19:20', title: 'Panorama de investimentos em EdTech pós-IA gerativa' },
      { time: '19:20 - 20:30', title: '6 Pitches selecionados' },
      { time: '20:30 - 21:00', title: 'Votação e considerações dos jurados' }
    ]
  },
  {
    id: 'event-fundraising-bootcamp',
    title: 'Masterclass: Valuation, Cap Table & Simulação de Pitch',
    category: 'Workshop & Diligence',
    organizer: 'Elo Link Academy & Mentores Convidados',
    date: '27 de Janeiro, 2027',
    time: '14:00 - 17:30 BRT',
    location: 'Online (Oficina Prática)',
    format: 'Online',
    bannerImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    description: 'Treinamento intensivo para fundadores refinarem seu deck, alinharem sua pedida financeira, simularem perguntas difíceis de VCs e evitarem armadilhas no Cap Table.',
    niches: ['AI & B2B SaaS', 'Fintech', 'Logtech & Supply'],
    rsvpsCount: 230,
    capacity: 250,
    stageFocus: 'Pre-seed & Seed',
    virtualLink: 'https://meet.google.com/masterclass-fundraising-2027',
    isUserRegistered: false,
    confirmedParticipants: [
      {
        id: 'user-rodrigo',
        name: 'Rodrigo Mendes',
        role: 'investor',
        avatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        companyOrFund: 'Nexa Horizons VC'
      }
    ],
    agenda: [
      { time: '14:00 - 15:00', title: 'Como modelar o Cap Table com múltiplos investidores' },
      { time: '15:00 - 16:30', title: 'Simulação ao vivo de pitch com banca de anjos' },
      { time: '16:30 - 17:30', title: 'Checklist de prontidão para rodada Seed' }
    ]
  },
  {
    id: 'event-logtech-summit',
    title: 'LogTech & Supply Chain Venture Showcase',
    category: 'Demo Day',
    organizer: 'LogVentures & Vale do Pinhão',
    date: '04 de Fevereiro, 2027',
    time: '16:00 - 20:30 BRT',
    location: 'Curitiba, PR (Engenho da Inovação)',
    format: 'Presencial',
    bannerImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    description: 'Reunindo os principais operadores logísticos da América Latina e investidores com startups focadas em last-mile, roteirização inteligente e automação de armazéns.',
    niches: ['Logtech & Supply', 'AI & B2B SaaS'],
    rsvpsCount: 135,
    capacity: 180,
    stageFocus: 'Seed & Série A',
    isUserRegistered: false,
    confirmedParticipants: [],
    agenda: [
      { time: '16:00 - 17:00', title: 'Keynote de Abertura: Eficiência logística e ESG' },
      { time: '17:00 - 19:00', title: 'Demo das 8 Logtechs finalistas' },
      { time: '19:00 - 20:30', title: 'Coquetel de relacionamento com executivos' }
    ]
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-video-1',
    author: CURRENT_FOUNDER_USER,
    type: 'video_pitch',
    timestamp: 'Há 15 minutos',
    content: 'Gravamos o pitch oficial da rodada Seed da OmniFlow AI (R$ 3.5M). Veja como nossos agentes autônomos integram TOTVS e SAP para automatizar 85% das compras corporativas. Assista ao vídeo de 2 minutos e envie mensagem para abrir o data room.',
    niche: 'AI & B2B SaaS',
    stage: 'Seed',
    financialHighlight: 'Rodada Seed: R$ 3.5M (51% subscrito) · MRR R$ 94k (+24% MoM)',
    location: 'São Paulo, SP',
    likes: 89,
    userLiked: true,
    commentsCount: 22,
    sharesCount: 31,
    mediaUrl: '/assets/images/startup_showcase_tech_1792400689208.jpg',
    mediaType: 'video',
    videoPitch: {
      title: 'OmniFlow AI: Orquestração Autônoma de Supply Chain B2B',
      duration: '02:14',
      viewsCount: 1420,
      thumbnail: '/assets/images/startup_showcase_tech_1792400689208.jpg',
      speakerName: 'Camila Rocha',
      speakerRole: 'CEO & Co-fundadora (Ex-iFood)',
      keyProblem: '40% do tempo de procurement é perdido em conferências manuais e cotações repetitivas.',
      keySolution: 'Agentes de IA conectam ERPs legados e automatizam auditoria e aprovação de compras em segundos.',
      metricsKicker: 'R$ 94k MRR (+24% MoM) · 38 clientes enterprise ativos'
    },
    tags: ['VideoPitch', 'RodadaAberta', 'AIEnterprise', 'SeedRound']
  },
  {
    id: 'post-video-2',
    author: MOCK_PROFILES_LIST[2], // Pulso Health
    type: 'video_pitch',
    timestamp: 'Há 1 hora',
    content: 'Apresentação clínica da Pulso Health: Demonstração ao vivo do microfone de escuta ambiente durante consulta médica gerando prontuário estruturado e TUSS automático.',
    niche: 'Healthtech',
    stage: 'Seed',
    financialHighlight: 'Alvo: R$ 4.0M · MRR: R$ 280.000 (+19% MoM)',
    location: 'Belo Horizonte, MG',
    likes: 64,
    userLiked: false,
    commentsCount: 16,
    sharesCount: 19,
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    mediaType: 'video',
    videoPitch: {
      title: 'Pulso Health: Copiloto de Voz que Salva 3h por Plantão Médico',
      duration: '01:52',
      viewsCount: 980,
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      speakerName: 'Gabriel Siqueira',
      speakerRole: 'Co-fundador & CTO',
      keyProblem: 'Médicos passam 3 horas diárias digitando telas de prontuários em vez de atender pacientes.',
      keySolution: 'IA de voz ambiente treinada no vocabulário médico brasileiro com 99.2% de precisão.',
      metricsKicker: 'R$ 280k MRR (+19% MoM) · 14 redes hospitalares ativas'
    },
    tags: ['VideoPitch', 'Healthtech', 'CopilotoClinico']
  },
  {
    id: 'post-2',
    author: CURRENT_INVESTOR_USER,
    type: 'thesis',
    timestamp: 'Há 2 horas',
    content: 'Tese ativa da Nexa Horizons para o Q4: estamos avaliando startups de AI B2B e Vertical SaaS na América Latina que resolvem fluxos regulatórios pesados ou supply chain. Ticket de entrada: R$ 500k a R$ 2.5M. Priorizamos fundadores com experiência setorial prévia ou histórico de liderança técnica.',
    niche: 'AI & B2B SaaS',
    stage: 'Pre-seed',
    financialHighlight: 'Ticket: R$ 500k - R$ 2.5M',
    location: 'São Paulo & San Francisco',
    likes: 67,
    userLiked: true,
    commentsCount: 18,
    sharesCount: 23,
    tags: ['TeseDeInvestimento', 'VentureCapital', 'SmartMoney', 'SeedLatAm']
  },
  {
    id: 'post-3',
    author: MOCK_PROFILES_LIST[2], // Gabriel Pulso Health
    type: 'traction_update',
    timestamp: 'Há 5 horas',
    content: 'Marco significativo: a Pulso Health concluiu o piloto em 3 redes de pronto atendimento. O tempo médio gasto pelos médicos em digitação de prontuário caiu de 18 min para 4.5 min por paciente. Nosso copiloto agora transcreve com 99.2% de precisão termos em português do Brasil.',
    niche: 'Healthtech',
    stage: 'Seed',
    financialHighlight: 'MRR: R$ 280.000 (+19% MoM)',
    location: 'Belo Horizonte, MG',
    likes: 58,
    userLiked: false,
    commentsCount: 12,
    sharesCount: 11,
    tags: ['Healthtech', 'CopilotoClinico', 'CaseDeSucesso']
  },
  {
    id: 'post-4',
    author: MOCK_PROFILES_LIST[4], // Mariana Duarte GreenImpact
    type: 'opportunity',
    timestamp: 'Ontem às 16:40',
    content: 'Chamada aberta para startups do agronegócio sustentável e monitoramento de carbono via satélite. O Fundo GreenImpact destinará R$ 12M em cheques entre R$ 1M e R$ 4M neste semestre para soluções com dados auditáveis e pilotos ativos.',
    niche: 'Cleantech & Clima',
    stage: 'Seed',
    financialHighlight: 'Pool de R$ 12M em alocação',
    location: 'São Paulo & Curitiba',
    likes: 81,
    userLiked: false,
    commentsCount: 15,
    sharesCount: 30,
    tags: ['ClimaTech', 'CarbonoAuditavel', 'Bioeconomia']
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Novo Match Bidirecional! 🚀',
    message: 'Você e Rodrigo Mendes (Nexa Horizons) demonstraram interesse mútuo. O canal de mensagens privadas foi desbloqueado!',
    type: 'match',
    timestamp: 'Há 10 minutos',
    read: false,
    targetId: 'user-rodrigo',
    actorAvatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg'
  },
  {
    id: 'notif-2',
    title: 'Inscrição Confirmada no Evento',
    message: 'Sua vaga no "Elo Link Latin America Demo Day Q4" está garantida. Veja a lista de outros 142 participantes.',
    type: 'event',
    timestamp: 'Há 1 hora',
    read: false,
    targetId: 'event-demoday-2026'
  },
  {
    id: 'notif-3',
    title: 'Nova Oportunidade Compatível (98%)',
    message: 'A startup Pulso Health abriu captação com perfil exatamente alinhado aos seus filtros de Healthtech & Seed.',
    type: 'opportunity',
    timestamp: 'Há 3 horas',
    read: true,
    targetId: 'user-gabriel-pulso'
  },
  {
    id: 'notif-4',
    title: 'Comentário na sua Publicação',
    message: 'Mariana Duarte comentou: "Excelente tração na OmniFlow! Como está a integração com fornecedores regionais?"',
    type: 'comment',
    timestamp: 'Ontem',
    read: true,
    actorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread-aris-christofi',
    participant: {
      id: 'user-aris-christofi',
      name: 'Aris Christofi',
      handle: '@aris_christofi',
      role: 'investor',
      headline: 'Admin & Lead Partner @ Whelp Ventures · Seed & AI Enterprise',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'Miami, FL & São Paulo',
      niches: ['AI & B2B SaaS', 'Fintech'],
      experience: ['10+ anos no mercado corporativo', 'Serial Founder (Exits)'],
      bio: 'Liderando investimentos em infraestrutura empresarial, inteligência artificial e automação de processos B2B. Apoiamos fundadores excepcionais desde o primeiro cheque.',
      verified: true,
      website: 'https://whelp.net',
      fundName: 'Whelp Ventures',
      ticketRange: { min: 500, max: 2500 },
      aum: '$45,000,000',
      thesis: 'Modelos de negócio verticais impulsionados por IA com forte retenção líquida e margens de software sustentáveis.',
      preferredStages: ['Seed', 'Série A'],
      portfolioCount: 18,
      averageRating: 5.0,
      reviewsCount: 14,
      reviews: [],
      portfolioItems: []
    },
    lastMessage: 'Muito obrigado! Vamos avançar. 👏',
    lastMessageTime: '14:44',
    unreadCount: 0,
    matchDate: 'Hoje',
    isMutualMatch: true,
    messages: [
      {
        id: 'msg-ac-1',
        senderId: 'user-aris-christofi',
        senderName: 'Aris Christofi',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '14:30',
        text: 'Olá Camila! Analisei seu modelo de expansão enterprise neste trimestre. Os indicadores de crescimento e retenção estão excelentes.',
        type: 'text'
      },
      {
        id: 'msg-ac-2',
        senderId: 'user-camila',
        senderName: 'Camila Rocha',
        senderAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        timestamp: '14:38',
        text: 'Obrigada Aris! A automação dos fluxos de compras reduziu o ciclo de vendas e já temos 142% de retenção líquida de receita.',
        type: 'text'
      },
      {
        id: 'msg-ac-3',
        senderId: 'user-camila',
        senderName: 'Camila Rocha',
        senderAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        timestamp: '14:40',
        type: 'file',
        fileData: {
          name: 'Apresentacao_e_Metricas.zip',
          size: '350.43 kb',
          extension: 'ZIP'
        }
      },
      {
        id: 'msg-ac-4',
        senderId: 'user-aris-christofi',
        senderName: 'Aris Christofi',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '14:41',
        text: 'Recebido! Muito obrigado pelo envio dos arquivos. Vamos avaliar os números com o comitê de investimentos hoje à tarde.',
        type: 'text'
      },
      {
        id: 'msg-ac-5',
        senderId: 'user-camila',
        senderName: 'Camila Rocha',
        senderAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        timestamp: '14:44',
        text: 'Muito obrigado! Vamos avançar. 👏',
        type: 'text'
      }
    ]
  },
  {
    id: 'thread-julian-mendez',
    participant: {
      id: 'user-julian-mendez',
      name: 'Julian Mendez',
      handle: '@julianmendez',
      role: 'investor',
      headline: 'Growth Partner & Angel Investor · Seed & LatAm Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      location: 'São Paulo & Buenos Aires',
      niches: ['AI & B2B SaaS', 'Fintech'],
      experience: ['Serial Founder (Exits)', '10+ anos no mercado corporativo'],
      bio: 'Investidor anjo e advisor de tração B2B. Ajudando startups a estruturarem canais escaláveis de aquisição corporativa.',
      verified: true,
      website: 'https://julianmendez.vc',
      fundName: 'Mendez Syndicate',
      ticketRange: { min: 250, max: 1000 },
      aum: 'R$ 22.000.000',
      thesis: 'Soluções B2B com forte Product-Market Fit e capacidade de expansão regional.',
      preferredStages: ['Pre-seed', 'Seed'],
      portfolioCount: 12,
      averageRating: 4.9,
      reviewsCount: 11,
      reviews: [],
      portfolioItems: []
    },
    lastMessage: 'Excelente tração! Podemos avançar para a due diligence.',
    lastMessageTime: '11:00',
    unreadCount: 1,
    matchDate: 'Hoje',
    isMutualMatch: true,
    messages: [
      {
        id: 'msg-jm-1',
        senderId: 'user-julian-mendez',
        senderName: 'Julian Mendez',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        timestamp: '10:45',
        text: 'Olá Camila! Analisei seu pitch de supply chain autônomo. O CAC payback está impressionante.',
        type: 'text'
      },
      {
        id: 'msg-jm-2',
        senderId: 'user-camila',
        senderName: 'Camila Rocha',
        senderAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        timestamp: '10:52',
        text: 'Obrigada Julian! Fechamos o Q3 com 38 contas enterprise e churn negativo.',
        type: 'text'
      },
      {
        id: 'msg-jm-3',
        senderId: 'user-julian-mendez',
        senderName: 'Julian Mendez',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        timestamp: '11:00',
        text: 'Excelente tração! Podemos avançar para a due diligence dessa rodada.',
        type: 'text'
      }
    ]
  },
  {
    id: 'thread-gerald-dean',
    participant: {
      id: 'user-gerald-dean',
      name: 'Gerald Dean',
      handle: '@gerald_dean',
      role: 'investor',
      headline: 'Principal @ LatAm DeepTech Capital · Hardware & Cloud',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      location: 'São Paulo, SP',
      niches: ['Deeptech & Hardware', 'AI & B2B SaaS'],
      experience: ['Pesquisador / PhD Acadêmico'],
      bio: 'Investimentos em infraestrutura de dados de alto desempenho e inteligência de dados aplicada.',
      verified: true,
      fundName: 'LatAm DeepTech Capital',
      averageRating: 4.8,
      reviewsCount: 7,
      reviews: [],
      portfolioItems: []
    },
    lastMessage: 'Estou pronto. Vamos revisar o Cap Table.',
    lastMessageTime: '18:50',
    unreadCount: 1,
    matchDate: 'Ontem',
    isMutualMatch: true,
    messages: [
      {
        id: 'msg-gd-1',
        senderId: 'user-gerald-dean',
        senderName: 'Gerald Dean',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        timestamp: '18:50',
        text: 'Olá Camila! Analisei a documentação. Estou pronto para revisar o Cap Table.',
        type: 'text'
      }
    ]
  },
  {
    id: 'thread-eddie-barnett',
    participant: {
      id: 'user-eddie-barnett',
      name: 'Eddie Barnett',
      handle: '@eddie_barnett',
      role: 'startup',
      headline: 'Founder & CTO @ CloudMetrics · DevOps Observability',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      location: 'Florianópolis, SC',
      niches: ['AI & B2B SaaS'],
      experience: ['Ex-BigTech / Unicornio'],
      bio: 'Construindo o novo padrão de telemetria em nuvem para microsserviços distribuídos.',
      verified: true,
      companyName: 'CloudMetrics Inc',
      averageRating: 4.9,
      reviewsCount: 6,
      reviews: [],
      portfolioItems: []
    },
    lastMessage: 'Obrigado pela introdução! Falamos em breve.',
    lastMessageTime: '15:30',
    unreadCount: 0,
    matchDate: 'Há 2 dias',
    isMutualMatch: true,
    messages: [
      {
        id: 'msg-eb-1',
        senderId: 'user-eddie-barnett',
        senderName: 'Eddie Barnett',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        timestamp: '15:30',
        text: 'Obrigado pela introdução! Falamos em breve para trocar experiências de go-to-market.',
        type: 'text'
      }
    ]
  },
  {
    id: 'thread-henry-drake',
    participant: {
      id: 'user-henry-drake',
      name: 'Henry Drake',
      handle: '@henry_drake',
      role: 'investor',
      headline: 'Partner @ Apex Horizon · Fintech & Open Finance',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      location: 'Curitiba & New York',
      niches: ['Fintech'],
      experience: ['10+ anos no mercado corporativo'],
      bio: 'Investindo em infraestrutura bancária, split de pagamentos e crédito estruturado.',
      verified: true,
      fundName: 'Apex Horizon Fund',
      averageRating: 5.0,
      reviewsCount: 9,
      reviews: [],
      portfolioItems: []
    },
    lastMessage: 'Como posso ajudar com conexões agora?',
    lastMessageTime: '10:50',
    unreadCount: 1,
    matchDate: 'Hoje',
    isMutualMatch: true,
    messages: [
      {
        id: 'msg-hd-1',
        senderId: 'user-henry-drake',
        senderName: 'Henry Drake',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        timestamp: '10:50',
        text: 'Olá Camila! Como posso ajudar com conexões estratégicas para sua captação agora?',
        type: 'text'
      }
    ]
  },
  {
    id: 'thread-mabelle-mckenzie',
    participant: {
      id: 'user-mabelle-mckenzie',
      name: 'Mabelle McKenzie',
      handle: '@mabelle_bio',
      role: 'investor',
      headline: 'Managing Director @ BioFuture Capital · Impact & Health',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      location: 'Belo Horizonte & London',
      niches: ['Healthtech', 'Cleantech & Clima'],
      experience: ['Serial Founder (Exits)'],
      bio: 'Acelerando startups que impactam a saúde e a sustentabilidade no sul global.',
      verified: true,
      fundName: 'BioFuture Capital',
      averageRating: 4.9,
      reviewsCount: 12,
      reviews: [],
      portfolioItems: []
    },
    lastMessage: 'Fiquei impressionada com as métricas de retenção.',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    matchDate: 'Há 3 dias',
    isMutualMatch: true,
    messages: [
      {
        id: 'msg-mm-1',
        senderId: 'user-mabelle-mckenzie',
        senderName: 'Mabelle McKenzie',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        timestamp: '11:15',
        text: 'Fiquei muito impressionada com suas métricas de retenção e cohort. Vamos conversar na semana que vem!',
        type: 'text'
      }
    ]
  },
  {
    id: 'thread-rodrigo-camila',
    participant: CURRENT_INVESTOR_USER,
    lastMessage: 'Recebi o Pitch Deck! O unit economics de procurement é muito convincente. Vamos marcar uma call técnica nesta quinta?',
    lastMessageTime: '11:42',
    unreadCount: 1,
    matchDate: 'Hoje',
    isMutualMatch: true,
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-rodrigo',
        senderName: 'Rodrigo Mendes',
        senderAvatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        timestamp: '10:30',
        text: 'Olá Camila! Vi a rodada Seed da OmniFlow no feed do Elo Link. A tese de agentes autônomos para procurement conversa diretamente com o que buscamos na Nexa Horizons.',
        type: 'text'
      },
      {
        id: 'msg-2',
        senderId: 'user-camila',
        senderName: 'Camila Rocha',
        senderAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        timestamp: '10:45',
        text: 'Oi Rodrigo! Muito bom conectar por aqui. Temos acompanhado os investimentos da Nexa em infraestrutura SaaS. Acabei de anexar nossa apresentação completa e os dados de cohort.',
        type: 'text'
      },
      {
        id: 'msg-3',
        senderId: 'user-camila',
        senderName: 'Camila Rocha',
        senderAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        timestamp: '10:46',
        type: 'file',
        fileData: {
          name: 'OmniFlow_Seed_Round_Deck_2026.pdf',
          size: '6.4 MB',
          extension: 'PDF'
        }
      },
      {
        id: 'msg-4',
        senderId: 'user-camila',
        senderName: 'Camila Rocha',
        senderAvatar: '/assets/images/avatar_founder_camila_1792400686938.jpg',
        timestamp: '10:50',
        type: 'audio',
        audioData: {
          durationSec: 32,
          waveform: [15, 30, 45, 80, 60, 40, 90, 75, 40, 60, 85, 95, 70, 50, 65, 40, 25, 60, 80, 45, 30]
        }
      },
      {
        id: 'msg-5',
        senderId: 'user-rodrigo',
        senderName: 'Rodrigo Mendes',
        senderAvatar: '/assets/images/avatar_investor_rodrigo_1792400687856.jpg',
        timestamp: '11:42',
        text: 'Recebi o Pitch Deck! O unit economics de procurement é muito convincente. Vamos marcar uma call técnica nesta quinta?',
        type: 'text'
      }
    ]
  }
];

const profilesById = new Map(MOCK_PROFILES_LIST.map(profile => [profile.id, profile]));

INITIAL_EVENTS.forEach(event => {
  event.confirmedParticipants = event.confirmedParticipants.map(participant => {
    const profile = profilesById.get(participant.id);
    if (!profile) return participant;

    return {
      ...participant,
      name: profile.name,
      role: profile.role,
      avatar: profile.avatar,
      companyOrFund: profile.role === 'startup' ? profile.companyName || participant.companyOrFund : profile.fundName || participant.companyOrFund
    };
  });

  event.featuredSpeakers = event.featuredSpeakers?.map(speaker => {
    const profile = MOCK_PROFILES_LIST.find(candidate => candidate.name === speaker.name);
    return profile ? { ...speaker, avatar: profile.avatar } : speaker;
  });
});

INITIAL_CHAT_THREADS.forEach(thread => {
  const participant = profilesById.get(thread.participant.id);
  if (participant) {
    thread.participant = participant;
  }

  thread.messages = thread.messages.map(message => {
    const sender = profilesById.get(message.senderId);
    return sender ? { ...message, senderName: sender.name, senderAvatar: sender.avatar } : message;
  });
});
