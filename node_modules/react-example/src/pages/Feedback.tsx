import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ThumbsUp, 
  Zap,
  Info,
  Clock
} from 'lucide-react';

interface Feedback {
  id: string;
  userId: string;
  userName: string;
  type: 'suggestion' | 'issue' | 'other';
  content: string;
  status: 'pending' | 'reviewed';
  createdAt: number;
}

export default function Feedback() {
  const { user, profile } = useAuth();
  const [content, setContent] = useState('');
  const [type, setType] = useState<'suggestion' | 'issue' | 'other'>('suggestion');
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Load existing feedbacks from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('nexus_feedbacks');
    if (saved) setFeedbacks(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newFeedback: Feedback = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user?.uid || 'anon',
      userName: profile?.name || 'Anonymous',
      type,
      content,
      status: 'pending',
      createdAt: Date.now()
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('nexus_feedbacks', JSON.stringify(updated));
    
    setSubmitted(true);
    setContent('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="text-primary w-8 h-8" />
            <h1 className="text-3xl font-black tracking-tight uppercase">Terminal Feedback</h1>
          </div>
          <p className="text-gray-500 text-sm font-light uppercase tracking-widest text-shadow-glow">Direct Integration Link to Administration</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[32px] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Zap className="w-24 h-24 text-primary" />
              </div>

              <h2 className="text-lg font-bold mb-6 uppercase tracking-tight">Transmit Intelligence</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {(['suggestion', 'issue', 'other'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        type === t 
                          ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,242,254,0.1)]' 
                          : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe your suggestion or technical error..."
                    className="w-full bg-[#0d1117] border border-white/10 rounded-2xl p-5 h-48 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none placeholder:text-gray-600"
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-600">
                    {content.length}/500
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="w-full py-4 bg-primary text-bg font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
                >
                  <Send className="w-4 h-4" />
                  Broadcast Message
                </button>
              </form>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 bg-bg/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-[#00ff88]/20 rounded-full flex items-center justify-center text-[#00ff88] mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Transmission Successful</h3>
                    <p className="text-sm text-gray-400">Your feedback has been logged into the Nexus Core database.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="glass p-6 rounded-3xl border-white/5 flex gap-4 items-start">
              <div className="p-2 bg-accent/20 rounded-xl text-accent">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Anonymity Protocol</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">System administrators value your input. Issues reported with "Critical" tags are prioritized for 24-hour response cycles.</p>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[2px] text-text-s flex items-center gap-2 px-2">
              <Clock className="text-primary w-4 h-4" />
              Transmission Log
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {feedbacks.length > 0 ? (
                feedbacks.map((f, i) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-5 rounded-2xl border-white/5 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                          f.type === 'issue' ? 'border-red-500/50 text-red-400 bg-red-400/5' :
                          f.type === 'suggestion' ? 'border-primary/50 text-primary bg-primary/5' :
                          'border-gray-500/50 text-gray-400 bg-gray-400/5'
                        }`}>
                          {f.type}
                        </span>
                        <span className="text-[10px] font-mono text-gray-600">
                          {new Date(f.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {f.status === 'reviewed' ? (
                        <ThumbsUp className="w-3 h-3 text-primary opacity-50" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-gray-700" />
                      )}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{f.content}</p>
                  </motion.div>
                ))
              ) : (
                <div className="glass p-12 rounded-[32px] text-center opacity-20 border-dashed border-2 border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest">No records found in local storage</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
