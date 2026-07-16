import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  PenTool, 
  Lightbulb, 
  Send,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { generateGeminiContent } from '../lib/gemini';

interface StudyTip {
  id: string;
  topic: string;
  advice: string;
  category: 'efficiency' | 'conceptual' | 'exam';
}

export default function StudyHelper() {
  const { profile } = useAuth();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSuggestion(null);

    try {
      const text = await generateGeminiContent(
        `Give me specific study tips, key topics to focus on, and note-taking suggestions for: ${topic}. Format it with bullet points and clear sections.`,
        [],
        {
          name: profile?.name,
          role: profile?.role
        }
      );
      setSuggestion(text);
    } catch (err: any) {
      console.error("AI Error:", err);
      setSuggestion(`Sync Error: ${err.message || "Failed to synthesize study intelligence."}`);
    } finally {
      setLoading(false);
    }
  };

  const quickTopics = ['Machine Learning', 'Data Structures', 'Microprocessors', 'Project Management'];

  return (
    <Layout>
      <div className="space-y-12 pb-20">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/40" />
              <span className="text-[10px] font-black uppercase tracking-[5px] text-primary">Cognitive Synthesis</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase italic">
              Study <span className="text-primary glow-text">Intelligence</span>
            </h1>
            <p className="text-text-s text-sm font-medium tracking-tight opacity-70">
              Nexus AI core ready. Academic consolidation protocols in standby.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
             <div className="glass px-6 py-4 rounded-[28px] border-primary/20 flex items-center gap-4 bg-primary/[0.02]">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                   <Sparkles className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-[11px] font-black uppercase tracking-[2px] text-white">Quantum Engine</div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-primary/50 italic">Processing Capacity: 100%</div>
                </div>
             </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card !p-8 space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40">Objective Payload</label>
                  <BookOpen className="w-4 h-4 text-primary/30" />
                </div>
                <div className="relative group">
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="DEFINE KNOWLEDGE NODE..."
                    className="w-full bg-[#0d1117]/50 border border-white/5 rounded-3xl p-6 h-44 focus:outline-none focus:border-primary/40 focus:ring-4 ring-primary/5 transition-all text-xs font-black uppercase tracking-[2px] text-white placeholder:text-white/10 resize-none leading-relaxed"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 shadow-[0_0_5px_#00f2ff]" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}
                className="w-full py-5 bg-primary text-bg font-black rounded-2xl flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:grayscale uppercase tracking-[4px] text-xs"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 -rotate-12" />}
                {loading ? 'Synthesizing...' : 'Ignite Logic Engine'}
              </button>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[4px] px-2 mb-2">Registry Shortcuts</h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickTopics.map(t => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-text-s/70 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all uppercase tracking-widest text-left truncate"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass p-8 rounded-[32px] border-primary/20 bg-primary/[0.03] overflow-hidden relative"
            >
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className="p-3 rounded-xl bg-primary text-bg shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xs uppercase tracking-[3px] pt-1.5">Synaptic Link</h3>
              </div>
              <p className="text-[11px] text-text-s/60 leading-relaxed font-bold uppercase tracking-widest italic relative z-10">
                "Use the 'Feynman Matrix'—explain your current objective to Nexus AI as if it possesses zero data. Identify the gaps in your neural lattice."
              </p>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8 min-h-[600px] flex flex-col">
            <AnimatePresence mode="wait">
              {suggestion ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card !p-12 border-primary/10 relative overflow-hidden flex-1"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[80px]" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[28px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                        <PenTool className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-black uppercase tracking-[5px] text-sm text-white mb-2">Protocol Generated</h3>
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00f2ff]" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-primary italic">Status: Intelligence Sync Complete</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSuggestion(null)}
                      className="px-6 py-3 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-[3px] text-white/30 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all active:scale-95"
                    >
                      Purge Data
                    </button>
                  </div>
                  
                  <div className="prose prose-invert max-w-none prose-sm relative z-10">
                    <div className="whitespace-pre-wrap text-text-s/90 leading-[1.8] font-medium tracking-tight text-base bg-white/[0.02] p-10 rounded-[32px] border border-white/5 backdrop-blur-sm">
                      {suggestion}
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-3 justify-center opacity-20 relative z-10">
                    <div className="h-px w-12 bg-white/50" />
                    <span className="text-[9px] font-black uppercase tracking-[5px]">Nexus AI End Transmission</span>
                    <div className="h-px w-12 bg-white/50" />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card !p-12 relative overflow-hidden flex-1 flex flex-col items-center justify-center text-center group border-dashed"
                >
                  <div className="relative">
                    <div className="w-40 h-40 rounded-[60px] border-2 border-dashed border-white/10 flex items-center justify-center mb-10 group-hover:rotate-45 transition-all duration-1000">
                      <Brain className="w-16 h-16 text-white/5 group-hover:text-primary/20 transition-colors" />
                    </div>
                    <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-[8px] text-white/20 group-hover:text-white transition-colors duration-700 italic">Awaiting Payload</h3>
                  <p className="text-[10px] font-black uppercase tracking-[3px] text-text-s/20 max-w-xs mx-auto leading-loose group-hover:text-text-s transition-colors duration-700">
                    Enter an academic node to activate the AI study synthesis engine and generate a strategic cognitive protocol.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
}
