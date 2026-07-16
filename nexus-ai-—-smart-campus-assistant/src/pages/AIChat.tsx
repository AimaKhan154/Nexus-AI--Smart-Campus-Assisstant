//USER MESSAGE LIKHTA HAI ., GEMINI.TS KO REQUEST JATI HAI, .GEMINI AI PROCESS KRTA HAI
//RESPONSE RETURN KRTA HAI, RESPONSE KO CHAT MAI DISPLAY KRTA HAI 
import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { generateGeminiContent } from '../lib/gemini';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { profile } = useAuth();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setError('');

    try {
      const text = await generateGeminiContent(currentInput, messages, {
        name: profile?.name,
        role: profile?.role
      });
      
      const modelMessage: Message = { role: 'model', parts: [{ text }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      console.error("AI Error:", err);
      setError(err.message || 'Connection pulse lost.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-140px)] gap-8 relative max-w-6xl mx-auto w-full">
        <header className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[5px] text-primary">Nexus Core</span>
              <div className="h-px w-8 bg-primary/40" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              Neural <span className="text-primary glow-text">Assistant</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-6">
             <div className="hidden sm:flex items-center gap-3 glass px-4 py-2 rounded-xl border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00f2ff]" />
                <span className="text-[9px] font-black uppercase tracking-[2px] text-white/60">Quantum Pulse Active</span>
             </div>
             <button 
                onClick={() => setMessages([])} 
                className="group flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 transition-all active:scale-95"
              >
                <span className="text-[10px] font-black uppercase tracking-[3px] text-white/30 group-hover:text-red-500">Purge Buffer</span>
              </button>
          </div>
        </header>

        {/* Chat Interface Container */}
        <div className="flex-1 flex flex-col min-h-0 glass-card !p-0 overflow-hidden border-white/5 bg-white/[0.01] relative">
          {/* Messages Background Polish */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.01] to-transparent pointer-events-none" />
          
          <div className="flex-1 overflow-y-auto px-6 py-10 space-y-10 custom-scrollbar relative z-10">
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center opacity-30"
              >
                <div className="w-32 h-32 rounded-[50px] border-2 border-dashed border-white/10 flex items-center justify-center mb-10 group relative">
                   <Bot className="w-16 h-16 text-white group-hover:text-primary transition-colors" />
                   <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-[8px] text-white mb-6">Awaiting Frequency</h3>
                <p className="max-w-xs text-[11px] font-bold uppercase tracking-[2px] leading-loose text-text-s/60 italic">
                  Neural link established. Query permissions granted. Transmit campus inquiries or logistics data fragments.
                </p>
              </motion.div>
            )}

            <div className="space-y-12">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20, scale: 0.98 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                     className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col gap-3 max-w-[85%] lg:max-w-[75%]">
                      <div 
                        className={`p-8 text-[14px] leading-[1.8] font-medium tracking-tight shadow-3xl relative ${
                          msg.role === 'user' 
                            ? 'bg-primary text-bg font-black rounded-[32px] rounded-tr-none shadow-primary/10' 
                            : 'bg-white/5 border border-white/5 text-white/90 rounded-[32px] rounded-tl-none backdrop-blur-3xl'
                        }`}
                      >
                        {msg.parts[0].text}
                        {msg.role === 'model' && (
                          <div className="absolute -left-3 top-0 w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-4 opacity-30 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.role === 'user' ? 'Local Terminal' : 'Nexus Assistant'} • Verified
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {loading && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 p-6 rounded-[28px] flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-[4px] italic">Processing Neural Streams...</span>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[3px] shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  Signal Interference: {error}
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Luxury Input Bar */}
          <div className="p-10 bg-white/[0.02] border-t border-white/5 backdrop-blur-3xl relative z-20">
            <form onSubmit={handleSend} className="relative group flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="CONSTRUCT NEURAL PACKET..."
                  className="w-full bg-[#0d1117] border border-white/10 rounded-[32px] py-6 px-10 focus:outline-none focus:border-primary/40 focus:ring-4 ring-primary/5 transition-all text-[14px] font-black uppercase tracking-[2px] text-white placeholder:text-white/10 pr-20"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary/20 rounded-full group-focus-within:bg-primary transition-colors" />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-20 h-20 bg-primary text-bg rounded-[28px] flex items-center justify-center hover:scale-105 active:scale-90 transition-all disabled:opacity-20 shadow-[0_10px_40px_rgba(0,242,255,0.2)] hover:shadow-primary/40 group/btn"
              >
                <Send className="w-7 h-7 -rotate-12 transition-transform group-hover/btn:scale-110" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-8 px-6">
                <div className="flex items-center gap-3">
                   <span className="text-[9px] font-black text-white/20 uppercase tracking-[4px]">Verified Security Token</span>
                   <div className="h-px w-8 bg-white/10" />
                </div>
                <span className="text-[9px] font-black text-primary/40 uppercase tracking-[4px] italic">Quantum Core v4.28</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
