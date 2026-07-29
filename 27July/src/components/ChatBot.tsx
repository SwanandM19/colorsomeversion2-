'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ChevronDown, Sparkles, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'Best paint for bedroom?',
  'Exterior paint that lasts longest?',
  'How do I pick a shade?',
  'Book a consultation',
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm **Chroma** 🎨\n\nYour Colorsome paint consultant. Ask me anything about shades, products, or room ideas — I'm here to help you find the perfect colour.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;

    setShowQuick(false);
    const newMessages: Message[] = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, couldn't connect right now. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderText = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');

  return (
    <>
      {/* ── Toggle Button ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 260 }}
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: 'linear-gradient(135deg,#E91E63,#FF5722)' }} />

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setOpen(true)}
                aria-label="Open Chroma chat"
                className="relative w-[58px] h-[58px] rounded-full shadow-[0_8px_30px_rgba(233,30,99,0.35)] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#E91E63,#FF5722)' }}
              >
                {/* Paint palette SVG icon */}
                <svg viewBox="0 0 24 24" fill="none" className="w-[26px] h-[26px]" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1" fill="white" stroke="none"/>
                  <circle cx="17.5" cy="10.5" r="1" fill="white" stroke="none"/>
                  <circle cx="8.5" cy="7.5" r="1" fill="white" stroke="none"/>
                  <circle cx="6.5" cy="12.5" r="1" fill="white" stroke="none"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.046a1.667 1.667 0 0 1 1.667-1.667h1.979c3.054 0 5.531-2.478 5.531-5.532C22 6.228 17.523 2 12 2Z"/>
                </svg>

                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D2D2D] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {unread}
                  </span>
                )}
              </motion.button>

              {/* Label pill */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute right-[66px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#2D2D2D] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-none"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Ask Chroma ✦
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden"
            style={{
              width: 'min(390px, calc(100vw - 2rem))',
              height: 'min(560px, calc(100dvh - 6rem))',
              borderRadius: '1.5rem',
              background: '#FDFBF7',
              boxShadow: '0 24px 60px rgba(45,45,45,0.16), 0 4px 16px rgba(233,30,99,0.08)',
              border: '1px solid rgba(237,230,218,0.8)',
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,#2D2D2D 0%,#1a1a1a 100%)' }}
            >
              {/* Subtle pink glow in header */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(233,30,99,0.2),transparent 70%)' }} />

              <div className="flex items-center gap-3 relative z-10">
                <div
                  className="w-10 h-10 rounded-[0.75rem] flex items-center justify-center shadow-inner flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#E91E63,#FF5722)' }}
                >
                  <Sparkles className="w-[18px] h-[18px] text-white" />
                </div>
                <div>
                  <p
                    className="text-white leading-none mb-0.5"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    Chroma
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-white/50 text-[10px]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}>
                      Colorsome AI · Online
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                aria-label="Close"
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollbarWidth: 'none' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-7 h-7 rounded-[0.5rem] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"
                      style={{ background: 'linear-gradient(135deg,#E91E63,#FF5722)' }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] text-[13.5px] leading-relaxed px-4 py-3 ${
                      msg.role === 'user'
                        ? 'text-white rounded-2xl rounded-tr-sm'
                        : 'text-[#2D2D2D] rounded-2xl rounded-tl-sm bg-white border border-[#EDE6DA]/70 shadow-sm'
                    }`}
                    style={{
                      fontFamily: 'var(--font-inter)',
                      ...(msg.role === 'user' && {
                        background: 'linear-gradient(135deg,#E91E63,#FF5722)',
                        boxShadow: '0 4px 12px rgba(233,30,99,0.25)',
                      }),
                    }}
                    dangerouslySetInnerHTML={{ __html: renderText(msg.content) }}
                  />
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5 justify-start"
                >
                  <div
                    className="w-7 h-7 rounded-[0.5rem] flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg,#E91E63,#FF5722)' }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-[#EDE6DA]/70 rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-sm flex items-center gap-1.5">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          background: 'linear-gradient(135deg,#E91E63,#FF5722)',
                          animationDelay: `${delay}ms`,
                          animationDuration: '0.9s',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Quick Questions ── */}
            <AnimatePresence>
              {showQuick && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-2 overflow-hidden"
                >
                  <p
                    className="text-[10px] uppercase tracking-widest text-[#9B8E7F] mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Quick questions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <motion.button
                        key={q}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => sendMessage(q)}
                        className="text-[11.5px] px-3 py-1.5 rounded-full border border-[#EDE6DA] bg-white text-[#2D2D2D] font-medium transition-all hover:border-[#E91E63] hover:text-[#E91E63]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input ── */}
            <div
              className="px-4 pb-4 pt-3 flex-shrink-0 border-t"
              style={{ borderColor: 'rgba(237,230,218,0.6)', background: 'rgba(253,251,247,0.9)', backdropFilter: 'blur(8px)' }}
            >
              <div
                className="flex items-center gap-2 rounded-[0.875rem] px-4 py-2.5 transition-all"
                style={{
                  background: '#fff',
                  border: '1.5px solid #EDE6DA',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                onFocus={() => {}}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about shades, products…"
                  className="flex-1 text-[13.5px] text-[#2D2D2D] placeholder-[#B0A99E] bg-transparent outline-none"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send"
                  className="w-8 h-8 rounded-[0.625rem] flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  style={{ background: 'linear-gradient(135deg,#E91E63,#FF5722)' }}
                >
                  {isLoading ? (
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-white" />
                  )}
                </motion.button>
              </div>

              <p
                className="text-center text-[9.5px] text-[#C4BAB0] mt-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Powered by Colorsome AI · Chroma
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}