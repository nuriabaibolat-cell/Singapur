import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X, RotateCcw, Lightbulb, CheckCircle2 } from 'lucide-react';
import { AI_PROMPT_SUGGESTIONS } from '../data/singaporeData';
import { ChatMessage, Language } from '../types';
import { translations } from '../data/translations';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang];

  const getInitialMessage = (): ChatMessage => ({
    id: 'welcome',
    role: 'assistant',
    text: lang === 'kk'
      ? `Сәлем, 5 «Ғ» сыныбының оқушысы Жансая және достары! 👋 Мен Сингапур әдістемесі бойынша сенің жеке ЖИ тәлімгеріңмін (Singapore Math & English AI Companion).\n\nМен саған:\n- 📐 **Bar Modeling** (блок-модель) арқылы күрделі мәтіндік есептерді көз алдыңа елестетуге,\n- 🗣️ **English Math Terms** — математикалық сөздік пен ағылшынша дәлелдеуді жетілдіруге,\n- 🧩 **CPA (Concrete-Pictorial-Abstract)** қадамдарымен өздігіңнен шешім қабылдауға көмектесемін!\n\nТөмендегі дайын есептердің бірін таңда немесе өз сұрағыңды жаз:`
      : `Hello, Grade 5 G student Zhansaia and classmates! 👋 I am your Singapore Math & English AI Companion.\n\nI can help you:\n- 📐 **Bar Modeling** — visualize complex multi-step word problems,\n- 🗣️ **English Math Discourse** — practice academic terminology and verbal reasoning in English,\n- 🧩 **CPA (Concrete-Pictorial-Abstract)** — scaffold your thinking step-by-step!\n\nPick a sample prompt below or ask your own question:`,
    timestamp: lang === 'kk' ? 'Қазір' : 'Now',
    modelIllustration: {
      type: 'comparison',
      labels: [
        lang === 'kk' ? 'Жансая (1 бөлік)' : 'Zhansaia (1 unit)', 
        lang === 'kk' ? 'Айсұлтан (3 бөлік)' : 'Aisultan (3 units)'
      ],
      values: ['[ 30 ]', '[ 30 ][ 30 ][ 30 ]'],
      total: lang === 'kk' ? '120 стикер' : '120 stickers total'
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState<'math' | 'english'>('math');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!userText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          subject,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      
      let illustration = undefined;
      if (textToSend.toLowerCase().includes('стикер') || textToSend.toLowerCase().includes('120') || textToSend.toLowerCase().includes('bar model') || textToSend.toLowerCase().includes('ratio')) {
        illustration = {
          type: 'comparison' as const,
          labels: [
            lang === 'kk' ? '1-бөлік (Unit)' : '1 Unit',
            lang === 'kk' ? 'Екінші сан' : 'Multiple Units'
          ],
          values: ['[ 1 unit ]', '[ 1 unit ][ 1 unit ][ 1 unit ]'],
          total: lang === 'kk' ? 'Барлығы = Total' : 'Total Units'
        };
      }

      const aiMessage: ChatMessage = {
        id: 'ai-' + Date.now(),
        role: 'assistant',
        text: data.response || (lang === 'kk' ? 'Жауап табылды.' : 'Answer generated.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelIllustration: illustration
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        text: lang === 'kk' 
          ? 'Кешіріңіз, ЖИ серверіне қосылуда кідіріс болды. Қайталап көріңіз.' 
          : 'Sorry, temporary error connecting to AI server. Please retry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: lang === 'kk'
          ? 'Сұхбат тарихы тазартылды. 5-сынып Сингапур математикасы мен ағылшын тілінен сұрағыңды күтемін!'
          : 'Conversation cleared. Ready for Singapore math problem solving or English practice!',
        timestamp: lang === 'kk' ? 'Қазір' : 'Now'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-gradient-to-r from-emerald-800 via-teal-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm tracking-tight">
                  {lang === 'kk' ? '5 «Ғ» ЖИ Тәлімгері (Singapore Lab)' : 'Grade 5 G AI Companion (Singapore Lab)'}
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  CPA Lab
                </span>
              </div>
              <p className="text-[11px] text-emerald-100 font-medium">
                {lang === 'kk' ? 'Сингапур математикасы және ағылшын тілін ЖИ-мен зерттеу' : 'Singapore Math & English Inquiry with AI'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              title={lang === 'kk' ? 'Тарихты тазарту' : 'Clear history'}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              id="close-ai-tutor-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subject Mode Toggle */}
        <div className="px-5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-500">
            {lang === 'kk' ? 'Оқу бағыты:' : 'Subject Mode:'}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSubject('math')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                subject === 'math'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              📐 Singapore Math (Bar Model)
            </button>
            <button
              onClick={() => setSubject('english')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                subject === 'english'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              🗣️ English Discussion
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Render interactive bar model illustration if provided */}
                  {msg.modelIllustration && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-slate-900">
                      <div className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Сингапур Bar Model сызбасы:</span>
                      </div>
                      <div className="space-y-1.5 text-xs font-mono">
                        {msg.modelIllustration.labels?.map((label, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-2">
                            <span className="text-slate-600 text-[11px]">{label}:</span>
                            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                              {msg.modelIllustration?.values?.[idx]}
                            </span>
                          </div>
                        ))}
                        {msg.modelIllustration.total && (
                          <div className="pt-1.5 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-900">
                            <span>Жалпы қосынды (Total):</span>
                            <span className="text-emerald-700">{msg.modelIllustration.total}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`text-[10px] text-slate-400 px-1 ${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-slate-600 text-xs">
                  {lang === 'kk' ? 'ЖИ есепті Сингапур Bar Model-мен талдап жатыр...' : 'AI analyzing Singapore Bar Model...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>{t.samplePrompts}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {AI_PROMPT_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(lang === 'kk' ? s.promptKk : s.promptEn)}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 text-xs font-medium hover:bg-emerald-50/50 transition-all cursor-pointer shadow-2xs"
              >
                {lang === 'kk' ? s.titleKk : s.titleEn}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'kk' ? 'Есеп мәтінін немесе сұрағыңды жаз...' : 'Type your Singapore Math or English question...'}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
