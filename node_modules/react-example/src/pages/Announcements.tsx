import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Bell, 
  Calendar, 
  Tag, 
  Info,
  Clock,
  X,
  Send
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'exam' | 'event' | 'notice';
  authorId: string;
  createdAt: number;
}

export default function Announcements() {
  const { user, profile } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filter, setFilter] = useState<'all' | 'exam' | 'event' | 'notice'>('all');
  const [isAdding, setIsAdding] = useState(false);
  
  // New Announcement State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<'exam' | 'event' | 'notice'>('notice');

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('nexus_db_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      // Default sample data
      const sample: Announcement[] = [
        {
          id: '1',
          title: 'Fall 2026 Examination Schedule',
          content: 'The official schedule for final examinations has been released. Please check the department notice board for detailed room assignments.',
          type: 'exam',
          authorId: 'system',
          createdAt: Date.now() - 86400000,
        },
        {
          id: '2',
          title: 'Department Tech Symposium',
          content: 'Join us for the annual tech symposium featuring projects from across all engineering disciplines.',
          type: 'event',
          authorId: 'system',
          createdAt: Date.now() - 172800000,
        }
      ];
      setAnnouncements(sample);
      localStorage.setItem('nexus_db_announcements', JSON.stringify(sample));
    }
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || profile.role !== 'admin') return;

    const newAnn: Announcement = {
      id: Math.random().toString(36).substring(2, 9),
      title: newTitle,
      content: newContent,
      type: newType,
      authorId: user?.uid || 'anonymous',
      createdAt: Date.now()
    };

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('nexus_db_announcements', JSON.stringify(updated));
    
    setIsAdding(false);
    setNewTitle('');
    setNewContent('');
  };

  const filtered = filter === 'all' 
    ? announcements 
    : announcements.filter(a => a.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'exam': return <Calendar className="text-red-400" />;
      case 'event': return <Tag className="text-primary" />;
      default: return <Info className="text-accent" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase mb-1">Nexus Broadcasts</h1>
            <p className="text-gray-500 text-sm font-light uppercase tracking-widest">Unified Communications Grid</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex glass rounded-xl p-1">
              {(['all', 'exam', 'event', 'notice'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${filter === f ? 'bg-primary text-bg' : 'text-gray-500 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            {profile?.role === 'admin' && (
              <button 
                onClick={() => setIsAdding(true)}
                className="p-3 bg-primary text-bg rounded-xl hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Post Modal */}
        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass w-full max-w-xl p-8 rounded-3xl border-primary/20 border"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold uppercase tracking-widest">New Broadcast</h2>
                  <button onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-white">
                    <X />
                  </button>
                </div>

                <form onSubmit={handlePost} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Signal Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['notice', 'exam', 'event'] as const).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setNewType(type)}
                          className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${newType === type ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-gray-500'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Subject Line</label>
                    <input
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all"
                      placeholder="e.g. Schedule for Fall 2026 Finals"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Message Payload</label>
                    <textarea
                      required
                      rows={5}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all resize-none"
                      placeholder="Detailed transmission content..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-bg font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all"
                  >
                    <Send className="w-5 h-5" />
                    TRANSMIT BROADCAST
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length > 0 ? (
            filtered.map((ann, i) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass p-6 rounded-3xl border-white/5 group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                      {getIcon(ann.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{ann.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(ann.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase tracking-tighter ${ann.type === 'exam' ? 'bg-red-500/20 text-red-400' : ann.type === 'event' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                    {ann.type}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-light line-clamp-3 group-hover:line-clamp-none transition-all">
                  {ann.content}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 glass rounded-3xl flex flex-col items-center justify-center text-center opacity-40">
              <Bell className="w-16 h-16 mb-4 text-gray-700" />
              <p className="text-xl font-bold uppercase tracking-widest">No Active Broadcasts</p>
              <p className="max-w-xs text-sm mt-2">The system is currently silent. Stand by for updates.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
