import React, { useState, useEffect } from 'react';
import { BusinessModelCanvas, MaturityStage } from '../types';
import { 
  Users, 
  Zap, 
  Cpu, 
  Award, 
  HeartHandshake, 
  Share2, 
  PieChart, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Layers, 
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface BusinessModelCanvasViewProps {
  canvas?: BusinessModelCanvas;
  isOwnProfile: boolean;
  isEditing: boolean;
  onUpdateCanvas: (updated: BusinessModelCanvas) => void;
  companyName?: string;
}

const MATURITY_STAGES: MaturityStage[] = [
  'Ideação & Descoberta',
  'Validação de Problema',
  'MVP & Primeiros Clientes',
  'Product-Market Fit (PMF)',
  'Escala & Eficiência Operacional'
];

const DEFAULT_CANVAS: BusinessModelCanvas = {
  maturityScore: 86,
  maturityStage: 'Product-Market Fit (PMF)',
  lastUpdated: 'Outubro 2026',
  keyPartners: [
    'Integradores oficiais ERP (SAP, TOTVS, Sankhya)',
    'Provedores de Cloud & GPUs (AWS, GCP for Startups)',
    'Associações setoriais de logística e comércio exterior',
    'Armazéns gerais e operadores aduaneiros parceiros'
  ],
  keyActivities: [
    'Treinamento e fine-tuning de agentes de IA para Supply Chain',
    'Desenvolvimento de conectores para ERPs legados sem downtime',
    'Auditoria contínua de compliance fiscal e LGPD/SOC2',
    'Onboarding técnico e customer success enterprise'
  ],
  keyResources: [
    'Algoritmos proprietários calibrados em +2M regras fiscais',
    'Equipe sênior de engenharia (Ex-iFood, Nubank, TOTVS)',
    'Cluster de inferência de baixa latência em GPU',
    'Base de dados anonimizada de benchmark de cotações B2B'
  ],
  valuePropositions: [
    'Redução de 85% do tempo gasto em conferências manuais de compras',
    'Eliminação de 99.4% dos erros de conciliação fiscal e pedidos',
    'Integração direta com SAP/TOTVS sem necessidade de trocar de ERP',
    'Previsibilidade de ruptura de estoque com alertas inteligentes'
  ],
  customerRelationships: [
    'Atendimento dedicado com Enterprise Customer Success',
    'Co-design de fluxos e automações customizadas para cada cliente',
    'Comunidade exclusiva de Diretores de Suprimentos na EloLink',
    'SLA de 15 minutos para suporte a chamados críticos'
  ],
  channels: [
    'Vendas consultivas B2B diretas (Enterprise Outbound)',
    'Marketplace e ecossistema de parceiros ERP (SAP Store)',
    'Eventos setoriais, Demo Days e Pitch Sessions',
    'Efeito de rede e indicação direta de CFOs e CPOs (NPS 78)'
  ],
  customerSegments: [
    'Indústrias de manufatura e bens de consumo (Faturamento R$ 50M+)',
    'Grandes varejistas com cadeia de suprimentos distribuída',
    'Distribuidores de peças e insumos com catálogo de alta rotação',
    'Operadores logísticos 3PL e 4PL corporativos'
  ],
  costStructure: [
    'Infraestrutura de servidores GPU e cloud computing',
    'Folha de pagamento de engenharia de software e inteligência artificial',
    'Custos de aquisição de clientes (CAC) e eventos do ecossistema',
    'Auditorias de segurança de dados e certificações corporativas'
  ],
  revenueStreams: [
    'Assinatura SaaS recorrente mensal por volume de pedidos processados',
    'Taxa de implementação (setup) de conectores ERP legados',
    'Módulo premium de auditoria preditiva e compliance fiscal',
    'Contratos anuais corporativos com faturamento antecipado'
  ],
  maturityMetrics: {
    pmfScore: '88% Must-Have',
    cacPayback: '4.6 meses',
    ltvCac: '6.2x',
    burnMultiple: '0.9x (Eficiente)',
    grossMargin: '82%',
    nrr: '128% (Expansão)'
  }
};

export const BusinessModelCanvasView: React.FC<BusinessModelCanvasViewProps> = ({
  canvas = DEFAULT_CANVAS,
  isOwnProfile,
  isEditing,
  onUpdateCanvas,
  companyName = 'Startup'
}) => {
  const [data, setData] = useState<BusinessModelCanvas>(canvas);
  const [newItemInput, setNewItemInput] = useState<{ [block: string]: string }>({});

  useEffect(() => {
    setData(canvas);
  }, [canvas]);

  const handleAddItem = (field: keyof BusinessModelCanvas, blockKey: string) => {
    const text = (newItemInput[blockKey] || '').trim();
    if (!text) return;

    const currentArray = (data[field] as string[]) || [];
    const updated = {
      ...data,
      [field]: [...currentArray, text],
      lastUpdated: 'Agora mesmo'
    };
    setData(updated);
    onUpdateCanvas(updated);
    setNewItemInput(prev => ({ ...prev, [blockKey]: '' }));
  };

  const handleRemoveItem = (field: keyof BusinessModelCanvas, index: number) => {
    const currentArray = (data[field] as string[]) || [];
    const updated = {
      ...data,
      [field]: currentArray.filter((_, i) => i !== index),
      lastUpdated: 'Agora mesmo'
    };
    setData(updated);
    onUpdateCanvas(updated);
  };

  const handleStageChange = (newStage: MaturityStage) => {
    const updated = {
      ...data,
      maturityStage: newStage,
      lastUpdated: 'Agora mesmo'
    };
    setData(updated);
    onUpdateCanvas(updated);
  };

  const handleScoreChange = (score: number) => {
    const clamped = Math.max(0, Math.min(100, score));
    const updated = {
      ...data,
      maturityScore: clamped,
      lastUpdated: 'Agora mesmo'
    };
    setData(updated);
    onUpdateCanvas(updated);
  };

  const handleMetricChange = (metricKey: string, val: string) => {
    const updated = {
      ...data,
      maturityMetrics: {
        ...(data.maturityMetrics || {}),
        [metricKey]: val
      },
      lastUpdated: 'Agora mesmo'
    };
    setData(updated);
    onUpdateCanvas(updated);
  };

  const currentStageIndex = MATURITY_STAGES.indexOf(data.maturityStage);

  const renderBlock = (
    title: string,
    field: keyof BusinessModelCanvas,
    icon: React.ReactNode,
    colorClass: string,
    subtitle?: string,
    customClass = ''
  ) => {
    const items = (data[field] as string[]) || [];
    const blockKey = String(field);

    return (
      <div className={`bg-[#0A0D1A] border border-purple-950/40 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all hover:border-purple-800/40 ${customClass}`}>
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-purple-950/30 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`p-1 rounded-lg ${colorClass} shrink-0`}>
                {icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-white truncate">
                  {title}
                </h4>
                {subtitle && (
                  <span className="text-[9px] text-zinc-400 block leading-tight truncate">{subtitle}</span>
                )}
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-800/60 px-1.5 py-0.5 rounded shrink-0">
              {items.length}
            </span>
          </div>

          <ul className="space-y-1.5 mt-1 flex-1 overflow-y-auto max-h-[170px] lg:max-h-none pr-0.5">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="group/item flex items-start justify-between gap-1.5 text-[11px] text-zinc-200 leading-snug bg-[#0E1222]/80 hover:bg-[#12172C] py-1.5 px-2 rounded-lg border border-purple-950/20 transition-colors"
              >
                <div className="flex items-start gap-1.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0" />
                  <span className="break-words">{item}</span>
                </div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(field, idx)}
                    className="text-zinc-500 hover:text-red-400 transition-colors shrink-0 p-0.5 ml-1"
                    title="Remover item"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Add item input when in edit mode */}
        {isEditing && (
          <div className="mt-2.5 pt-2 border-t border-purple-950/30 flex items-center gap-1.5 shrink-0">
            <input
              type="text"
              value={newItemInput[blockKey] || ''}
              onChange={(e) => setNewItemInput({ ...newItemInput, [blockKey]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem(field, blockKey);
                }
              }}
              placeholder={`Adicionar a ${title}...`}
              className="flex-1 px-2 py-1 bg-[#060810] border border-purple-900/40 rounded-lg text-[11px] text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={() => handleAddItem(field, blockKey)}
              className="p-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all shrink-0"
              title="Adicionar"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* 1. Header do Nível de Maturidade da Startup */}
      <div className="bg-gradient-to-r from-purple-950/40 via-[#0C0F1D] to-blue-950/30 border border-purple-900/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Glow background accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Target className="w-5 h-5" />
              </span>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                Business Model Canvas & Termômetro de Maturidade
              </h3>
            </div>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
              Mapeamento estratégico do modelo de negócios da <strong className="text-white">{companyName}</strong>, 
              avaliando validação de hipóteses, alinhamento de canais e solidez financeira para investidores.
            </p>
          </div>

          {/* Maturity Score Gauge */}
          <div className="flex items-center gap-4 bg-[#080B16] border border-purple-900/40 rounded-2xl p-3.5 sm:p-4 self-start lg:self-auto shrink-0 shadow-lg">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block">
                Score de Maturidade
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-emerald-400 tabular-nums">
                  {data.maturityScore}
                </span>
                <span className="text-xs font-bold text-zinc-500">/ 100</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-purple-950/60 hidden sm:block" />

            <div>
              <span className="text-[10px] font-bold text-zinc-400 block">Estágio Atual</span>
              <span className="text-xs font-extrabold text-white bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/30 inline-block mt-0.5">
                {data.maturityStage}
              </span>
              <span className="text-[10px] text-zinc-500 block mt-1">
                Atualizado: {data.lastUpdated}
              </span>
            </div>
          </div>

        </div>

        {/* Stepper de 5 Fases de Maturidade */}
        <div className="mt-6 pt-5 border-t border-purple-950/40">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Jornada de Evolução & Maturidade</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {MATURITY_STAGES.map((stg, idx) => {
              const isPastOrCurrent = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={stg}
                  onClick={() => isEditing && handleStageChange(stg)}
                  className={`p-3 rounded-2xl border transition-all text-left relative overflow-hidden ${
                    isCurrent
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg ring-1 ring-purple-500/40'
                      : isPastOrCurrent
                      ? 'bg-[#0E1222] border-emerald-500/30 text-emerald-300'
                      : 'bg-[#080B16] border-purple-950/30 text-zinc-500'
                  } ${isEditing ? 'cursor-pointer hover:border-purple-400' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase font-mono tracking-wider">
                      Fase 0{idx + 1}
                    </span>
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    ) : isPastOrCurrent ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-zinc-700" />
                    )}
                  </div>
                  <h5 className="text-xs font-bold leading-snug">
                    {stg}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>

        {/* Edit controls for maturity in edit mode */}
        {isEditing && (
          <div className="mt-4 pt-4 border-t border-purple-950/40 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#080B16]/80 p-4 rounded-2xl">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                Ajustar Score Geral de Maturidade (0 a 100)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={data.maturityScore}
                  onChange={(e) => handleScoreChange(Number(e.target.value))}
                  className="flex-1 accent-purple-500"
                />
                <span className="text-sm font-black text-emerald-400 font-mono w-12 text-right">
                  {data.maturityScore}/100
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                Selecionar Estágio de Maturidade
              </label>
              <select
                value={data.maturityStage}
                onChange={(e) => handleStageChange(e.target.value as MaturityStage)}
                className="w-full px-3 py-1.5 bg-[#0C0F1D] border border-purple-900/40 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-purple-500"
              >
                {MATURITY_STAGES.map((stg) => (
                  <option key={stg} value={stg}>{stg}</option>
                ))}
              </select>
            </div>
          </div>
        )}

      </div>

      {/* 2. Key Unit Economics / Validação de Métricas */}
      {data.maturityMetrics && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3 shadow-md">
            <span className="text-[10px] font-bold uppercase text-zinc-400 block truncate">PMF Test Score</span>
            {isEditing ? (
              <input
                type="text"
                value={data.maturityMetrics.pmfScore || ''}
                onChange={(e) => handleMetricChange('pmfScore', e.target.value)}
                className="w-full mt-1 px-1.5 py-0.5 bg-[#080B16] rounded border border-purple-900/40 text-xs text-white font-bold"
              />
            ) : (
              <span className="text-xs font-black text-emerald-400 block mt-1">{data.maturityMetrics.pmfScore}</span>
            )}
          </div>

          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3 shadow-md">
            <span className="text-[10px] font-bold uppercase text-zinc-400 block truncate">CAC Payback</span>
            {isEditing ? (
              <input
                type="text"
                value={data.maturityMetrics.cacPayback || ''}
                onChange={(e) => handleMetricChange('cacPayback', e.target.value)}
                className="w-full mt-1 px-1.5 py-0.5 bg-[#080B16] rounded border border-purple-900/40 text-xs text-white font-bold"
              />
            ) : (
              <span className="text-xs font-black text-purple-300 block mt-1">{data.maturityMetrics.cacPayback}</span>
            )}
          </div>

          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3 shadow-md">
            <span className="text-[10px] font-bold uppercase text-zinc-400 block truncate">LTV / CAC</span>
            {isEditing ? (
              <input
                type="text"
                value={data.maturityMetrics.ltvCac || ''}
                onChange={(e) => handleMetricChange('ltvCac', e.target.value)}
                className="w-full mt-1 px-1.5 py-0.5 bg-[#080B16] rounded border border-purple-900/40 text-xs text-white font-bold"
              />
            ) : (
              <span className="text-xs font-black text-emerald-400 block mt-1">{data.maturityMetrics.ltvCac}</span>
            )}
          </div>

          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3 shadow-md">
            <span className="text-[10px] font-bold uppercase text-zinc-400 block truncate">Burn Multiple</span>
            {isEditing ? (
              <input
                type="text"
                value={data.maturityMetrics.burnMultiple || ''}
                onChange={(e) => handleMetricChange('burnMultiple', e.target.value)}
                className="w-full mt-1 px-1.5 py-0.5 bg-[#080B16] rounded border border-purple-900/40 text-xs text-white font-bold"
              />
            ) : (
              <span className="text-xs font-black text-blue-300 block mt-1">{data.maturityMetrics.burnMultiple}</span>
            )}
          </div>

          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3 shadow-md">
            <span className="text-[10px] font-bold uppercase text-zinc-400 block truncate">Margem Bruta</span>
            {isEditing ? (
              <input
                type="text"
                value={data.maturityMetrics.grossMargin || ''}
                onChange={(e) => handleMetricChange('grossMargin', e.target.value)}
                className="w-full mt-1 px-1.5 py-0.5 bg-[#080B16] rounded border border-purple-900/40 text-xs text-white font-bold"
              />
            ) : (
              <span className="text-xs font-black text-emerald-400 block mt-1">{data.maturityMetrics.grossMargin}</span>
            )}
          </div>

          <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-2xl p-3 shadow-md">
            <span className="text-[10px] font-bold uppercase text-zinc-400 block truncate">Net Retention (NRR)</span>
            {isEditing ? (
              <input
                type="text"
                value={data.maturityMetrics.nrr || ''}
                onChange={(e) => handleMetricChange('nrr', e.target.value)}
                className="w-full mt-1 px-1.5 py-0.5 bg-[#080B16] rounded border border-purple-900/40 text-xs text-white font-bold"
              />
            ) : (
              <span className="text-xs font-black text-purple-300 block mt-1">{data.maturityMetrics.nrr}</span>
            )}
          </div>
        </div>
      )}

      {/* 3. The 9 Classic Canvas Blocks Grid */}
      <div className="bg-[#080B16] border border-purple-900/40 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400">
              Grade Estrutural do Canvas (9 Blocos)
            </span>
          </div>
          <span className="text-[11px] text-zinc-500">
            Metodologia Osterwalder Adaptada para Tech & Startups
          </span>
        </div>

        {/* Desktop Grid Layout (Classic 5 columns for top row, 2 columns for bottom row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-2 gap-3.5">
          
          {/* Col 1: Parcerias Principais (Row span 2 on desktop) */}
          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col min-h-[240px] lg:min-h-[290px]">
            {renderBlock(
              'Parcerias Principais',
              'keyPartners',
              <Users className="w-4 h-4 text-purple-400" />,
              'bg-purple-500/15 text-purple-300',
              'Quem nos ajuda a escalar',
              'h-full'
            )}
          </div>

          {/* Col 2 Top: Atividades Principais */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-1 flex flex-col min-h-[120px] lg:min-h-[140px]">
            {renderBlock(
              'Atividades Principais',
              'keyActivities',
              <Zap className="w-4 h-4 text-amber-400" />,
              'bg-amber-500/15 text-amber-300',
              'O que fazemos com maestria',
              'h-full'
            )}
          </div>

          {/* Col 2 Bottom: Recursos Principais */}
          <div className="lg:col-start-2 lg:row-start-2 lg:row-span-1 flex flex-col min-h-[120px] lg:min-h-[140px]">
            {renderBlock(
              'Recursos Principais',
              'keyResources',
              <Cpu className="w-4 h-4 text-indigo-400" />,
              'bg-indigo-500/15 text-indigo-300',
              'Ativos & tecnologia core',
              'h-full'
            )}
          </div>

          {/* Col 3: Proposta de Valor (Center Core, Row span 2) */}
          <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 flex flex-col min-h-[240px] lg:min-h-[290px]">
            {renderBlock(
              'Proposta de Valor',
              'valuePropositions',
              <Award className="w-4 h-4 text-emerald-400" />,
              'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
              'O valor único que entregamos',
              'h-full border-purple-500/40 ring-1 ring-purple-500/20 shadow-md shadow-purple-950/30'
            )}
          </div>

          {/* Col 4 Top: Relacionamento com Clientes */}
          <div className="lg:col-start-4 lg:row-start-1 lg:row-span-1 flex flex-col min-h-[120px] lg:min-h-[140px]">
            {renderBlock(
              'Relacionamento',
              'customerRelationships',
              <HeartHandshake className="w-4 h-4 text-rose-400" />,
              'bg-rose-500/15 text-rose-300',
              'Como engajamos e retemos',
              'h-full'
            )}
          </div>

          {/* Col 4 Bottom: Canais */}
          <div className="lg:col-start-4 lg:row-start-2 lg:row-span-1 flex flex-col min-h-[120px] lg:min-h-[140px]">
            {renderBlock(
              'Canais de Distribuição',
              'channels',
              <Share2 className="w-4 h-4 text-teal-400" />,
              'bg-teal-500/15 text-teal-300',
              'Como chegamos ao cliente',
              'h-full'
            )}
          </div>

          {/* Col 5: Segmentos de Clientes (Row span 2) */}
          <div className="lg:col-start-5 lg:row-start-1 lg:row-span-2 flex flex-col min-h-[240px] lg:min-h-[290px]">
            {renderBlock(
              'Segmentos de Clientes',
              'customerSegments',
              <PieChart className="w-4 h-4 text-blue-400" />,
              'bg-blue-500/15 text-blue-300',
              'Para quem criamos valor',
              'h-full'
            )}
          </div>

        </div>

        {/* Bottom Row: Cost Structure & Revenue Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 pt-1">
          <div className="min-h-[120px] flex flex-col">
            {renderBlock(
              'Estrutura de Custos',
              'costStructure',
              <CreditCard className="w-4 h-4 text-red-400" />,
              'bg-red-500/15 text-red-300',
              'Principais saídas e alavancas de custo',
              'h-full'
            )}
          </div>

          <div className="min-h-[120px] flex flex-col">
            {renderBlock(
              'Fontes de Receita',
              'revenueStreams',
              <TrendingUp className="w-4 h-4 text-emerald-400" />,
              'bg-emerald-500/15 text-emerald-300',
              'Modelos de monetização e pricing',
              'h-full'
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
