import React, { useState } from 'react';
import { Bot, ChevronRight, MessageCircle, Send, Sparkles, X } from 'lucide-react';

interface ChatbotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const QUICK_QUESTIONS = [
  {
    question: 'Como funciona o EloLink?',
    answer: 'O EloLink conecta startups e investidores por interesses, estágio e tese. Você pode explorar perfis, participar de eventos e iniciar conversas quando houver interesse.'
  },
  {
    question: 'Como encontro investidores?',
    answer: 'Acesse o Match Radar para ver conexões compatíveis ou use a busca no topo para encontrar investidores por setor, estágio e localização.'
  },
  {
    question: 'Como publico uma oportunidade?',
    answer: 'No Feed, clique em “Nova publicação” e preencha os detalhes da oportunidade. Ela ficará disponível para a rede de fundadores e investidores.'
  },
  {
    question: 'Onde vejo os eventos?',
    answer: 'A área Eventos reúne Demo Days, Pitch Nights e encontros da comunidade. Você pode alternar entre grade e tabela e confirmar sua participação.'
  }
];

const INITIAL_MESSAGE: ChatbotMessage = {
  id: 'bot-welcome',
  sender: 'bot',
  text: 'Olá! Sou o assistente do EloLink. Como posso ajudar?'
};

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([INITIAL_MESSAGE]);

  const handleQuestion = (question: string, answer: string) => {
    setMessages(prev => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: question },
      { id: `bot-${Date.now() + 1}`, sender: 'bot', text: answer }
    ]);
  };

  return (
    <div className="fixed right-4 bottom-20 md:right-6 md:bottom-6 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <section
          aria-label="Assistente EloLink"
          className="w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-2xl border border-purple-900/30 bg-[#0C0F1D] shadow-2xl shadow-black/40"
        >
          <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-purple-700 to-blue-600 px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">Assistente EloLink</p>
                <p className="flex items-center gap-1 text-[11px] text-purple-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Respostas rápidas
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Fechar assistente"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="max-h-[min(52vh,360px)] space-y-3 overflow-y-auto p-3">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    message.sender === 'user'
                      ? 'rounded-br-md bg-purple-600 text-white'
                      : 'rounded-bl-md bg-[#11162B] text-zinc-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            <div className="border-t border-purple-900/20 pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                Perguntas frequentes
              </p>
              <div className="space-y-2">
                {QUICK_QUESTIONS.map(({ question, answer }) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleQuestion(question, answer)}
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-purple-900/25 bg-[#11162B]/60 px-3 py-2.5 text-left text-xs font-medium text-zinc-300 transition-colors hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
                  >
                    <span>{question}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-purple-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <footer className="flex items-center gap-2 border-t border-purple-900/20 bg-[#080B16] px-3 py-2.5 text-[11px] text-zinc-500">
            <Send className="h-3.5 w-3.5 text-purple-400" />
            <span>Chatbot demonstrativo — integração em breve</span>
          </footer>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-950/40 transition-all hover:scale-105 hover:shadow-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#06080F]"
        aria-label={isOpen ? 'Fechar chatbot' : 'Abrir chatbot'}
        title={isOpen ? 'Fechar chatbot' : 'Abrir chatbot'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />}
      </button>
    </div>
  );
};
