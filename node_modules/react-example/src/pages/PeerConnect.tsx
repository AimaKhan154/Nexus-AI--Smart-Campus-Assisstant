import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  UserPlus, 
  MessageSquare, 
  Filter,
  GraduationCap,
  Sparkles,
  MapPin,
  CheckCircle2,
  Send
} from 'lucide-react';

interface Peer {
  id: string;
  name: string;
  major: string;
  year: string;
  interests: string[];
  status: 'online' | 'busy' | 'offline';
  seekingGroups: boolean;
}

const PEERS: Peer[] = [
  { id: '1', name: 'Zain Abbas', major: 'Software Engineering', year: '3rd Year', interests: ['React', 'Cybersecurity'], status: 'online', seekingGroups: true },
  { id: '2', name: 'Aliza Khan', major: 'Computer Science', year: '2nd Year', interests: ['AI', 'Data Ethics'], status: 'busy', seekingGroups: true },
  { id: '3', name: 'Hamza Rizvi', major: 'Information Technology', year: '4th Year', interests: ['DevOps', 'Cloud'], status: 'online', seekingGroups: false },
  { id: '4', name: 'Sara Ahmed', major: 'Software Engineering', year: '1st Year', interests: ['UI Design', 'Frontend'], status: 'offline', seekingGroups: true },
  { id: '5', name: 'Bilal Siddiqui', major: 'Computer Science', year: '3rd Year', interests: ['Machine Learning', 'Python'], status: 'online', seekingGroups: true },
];

export default function PeerConnect() {
  const { profile } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'seeking'>('all');
  const [friends, setFriends] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [chatPeer, setChatPeer] = useState<Peer | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Record<string, { role: 'user' | 'peer', text: string, time: string }[]>>({});

  const handleAddFriend = (peerId: string, name: string) => {
    if (friends.includes(peerId)) return;
    setFriends([...friends, peerId]);
    setToast(`Connection link established with ${name}`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !chatPeer) return;

    const newMessage = { 
      role: 'user' as const, 
      text: chatInput, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const peerId = chatPeer.id;
    const updatedHistory = {
      ...chatHistory,
      [peerId]: [...(chatHistory[peerId] || []), newMessage]
    };

    setChatHistory(updatedHistory);
    setChatInput('');

    // Mock real-time response
    setTimeout(() => {
      const mockReply = {
        role: 'peer' as const,
        text: `Nexus nodes synched. Received: "${newMessage.text}". Let's coordinate our study session soon.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => ({
        ...prev,
        [peerId]: [...(prev[peerId] || []), mockReply]
      }));
    }, 1500);
  };

  const filteredPeers = PEERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.major.toLowerCase().includes(search.toLowerCase()) ||
                         p.interests.some(i => i.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || (filter === 'seeking' && p.seekingGroups);
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="space-y-12 relative pb-20">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-3xl border border-primary/20 bg-primary/10 backdrop-blur-2xl flex items-center gap-4 shadow-[0_0_50px_rgba(0,242,255,0.2)]"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-bg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[3px] text-white">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/40" />
              <span className="text-[10px] font-black uppercase tracking-[5px] text-primary">Neural Collective</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase italic">
              Peer <span className="text-primary glow-text">Grid</span>
            </h1>
            <p className="text-text-s text-sm font-medium tracking-tight opacity-70">
              Nexus student synchronization active. Discovery protocols initialized.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6"
          >
             <div className="glass px-6 py-4 rounded-[28px] border-primary/20 flex flex-col gap-1 items-end bg-[#00f2ff]/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse shadow-[0_0_10px_#00f2ff]" />
                  <span className="text-[11px] font-black uppercase tracking-[2px] text-white">2,402 Nodes Online</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-primary/50 italic">Global Sync Active</span>
             </div>
          </motion.div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 p-2 glass rounded-[32px] border-white/5 bg-white/[0.01]">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 group-hover:text-primary transition-colors w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="SEARCH BY NAME, MAJOR, OR NEURAL EXPERTISE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none py-6 pl-16 pr-6 focus:outline-none placeholder:text-white/20 text-[11px] font-black tracking-[2px] uppercase transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row p-2 gap-2">
            {[
              { id: 'all', label: 'All Personnel' },
              { id: 'seeking', label: 'Group Seekers' }
            ].map((opt) => (
              <button 
                key={opt.id}
                onClick={() => setFilter(opt.id as any)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[3px] transition-all border ${
                  filter === opt.id 
                    ? 'bg-primary text-bg border-primary shadow-[0_0_30px_rgba(0,242,255,0.2)]' 
                    : 'text-white/40 border-white/5 hover:text-white hover:bg-white/5'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPeers.map((peer, i) => (
              <motion.div
                key={peer.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card !p-8 group relative overflow-hidden flex flex-col border-white/10 hover:border-primary/20 transition-all duration-700 h-full"
              >
                {/* Status Indicator */}
                <div className="absolute top-8 right-8 flex flex-col items-end gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-s/50 italic">{peer.status}</span>
                    <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] ${
                      peer.status === 'online' ? 'text-primary bg-primary animate-pulse' : 
                      peer.status === 'busy' ? 'text-red-500 bg-red-500' : 'text-gray-600 bg-gray-600'
                    }`} />
                  </div>
                </div>

                <div className="flex items-start gap-6 mb-10 mt-2 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-primary/60 group-hover:text-primary transition-all duration-700 group-hover:scale-105 group-hover:-rotate-3 shadow-inner">
                    {peer.name[0]}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-black text-xl text-white tracking-widest uppercase mb-2 group-hover:text-primary transition-colors italic">{peer.name.split(' ')[0]} <br /> {peer.name.split(' ')[1]}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-text-s/60 font-black uppercase tracking-widest">
                      <GraduationCap className="w-3.5 h-3.5 text-primary/40" />
                      {peer.major}
                    </div>
                    <div className="text-[9px] text-primary/40 font-black uppercase tracking-widest mt-1 italic">{peer.year} Phase</div>
                  </div>
                </div>

                <div className="flex-1 space-y-8 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {peer.interests.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[2px] text-text-s/80 group-hover:text-white transition-colors group-hover:border-primary/10 group-hover:bg-primary/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-3">
                       {peer.seekingGroups ? (
                         <div className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-[3px] animate-pulse">
                           <Sparkles className="w-3.5 h-3.5" />
                           Active Seeker
                         </div>
                       ) : (
                         <div className="text-[9px] font-black text-white/20 uppercase tracking-[3px]">
                           Independent
                         </div>
                       )}
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setChatPeer(peer)}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-primary hover:border-primary/30 transition-all active:scale-95 group/btn"
                        title="Establish Comms"
                      >
                        <MessageSquare className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                      </button>
                      <button 
                        onClick={() => handleAddFriend(peer.id, peer.name)}
                        disabled={friends.includes(peer.id)}
                        className={`p-4 rounded-2xl transition-all active:scale-95 group/btn ${
                          friends.includes(peer.id) 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-bg hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                        }`}
                        title="Sync Link"
                      >
                        {friends.includes(peer.id) ? <CheckCircle2 className="w-5 h-5" /> : <UserPlus className="w-5 h-5 transition-transform group-hover/btn:scale-110" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Visual Flair */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Messaging Interface */}
        <AnimatePresence>
          {chatPeer && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setChatPeer(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[120]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#080a0d] border-l border-white/5 z-[130] flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
              >
                {/* Chat Header */}
                <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl font-black shadow-inner">
                        {chatPeer.name[0]}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-[#080a0d] bg-primary shadow-[0_0_10px_#00f2ff]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black uppercase tracking-[3px] text-sm text-white">{chatPeer.name}</h3>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-primary/20 text-primary border border-primary/20">Synced</span>
                      </div>
                      <p className="text-[10px] text-text-s/60 font-black uppercase tracking-widest">{chatPeer.major} • Phase {chatPeer.year}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setChatPeer(null)}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                  >
                    <Send className="w-5 h-5 rotate-45" />
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-gradient-to-b from-bg to-[#080a0d]">
                  {(chatHistory[chatPeer.id] || []).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-10">
                      <div className="w-24 h-24 rounded-[40px] bg-white/5 border border-white/5 flex items-center justify-center mb-8 animate-float">
                        <MessageSquare className="w-10 h-10 text-primary/30" />
                      </div>
                      <h4 className="text-[10px] font-black uppercase tracking-[5px] text-white/40 mb-4">Neural Comms Established</h4>
                      <p className="text-[11px] font-bold text-text-s/30 uppercase tracking-[2px] max-w-xs leading-loose">
                        Channel encrypted. Link signal 100%. Protocol "Collaborate" initialized. Send first data fragment.
                      </p>
                    </div>
                  ) : (
                    chatHistory[chatPeer.id].map((msg, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[85%] p-6 rounded-[28px] text-[13px] leading-relaxed font-medium tracking-tight shadow-2xl ${
                          msg.role === 'user' 
                            ? 'bg-primary text-bg font-black rounded-tr-none shadow-primary/10' 
                            : 'bg-white/5 border border-white/5 text-white rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[9px] font-black text-white/20 mt-3 px-2 uppercase tracking-widest italic">{msg.time} • Local Transmission</span>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Input Area */}
                <div className="p-10 border-t border-white/5 bg-[#080a0d]/80 backdrop-blur-2xl">
                  <form onSubmit={handleSendMessage} className="relative group">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="CONSTRUCT NEURAL PACKET..."
                      className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-8 pr-20 focus:outline-none focus:border-primary/40 focus:ring-4 ring-primary/5 transition-all text-sm font-black uppercase tracking-[2px] text-white placeholder:text-white/20"
                    />
                    <button 
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary text-bg rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale shadow-[0_0_20px_rgba(0,242,255,0.2)] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.4)]"
                    >
                       <Send className="w-5 h-5 -rotate-12" />
                    </button>
                  </form>
                  <p className="text-center text-[9px] font-black uppercase tracking-widest text-white/20 mt-6 italic">Secure Nexus Protocol in Effect • E2E Encrypted</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {filteredPeers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 opacity-20 flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center animate-spin-slow">
              <Search className="w-10 h-10" />
            </div>
            <p className="uppercase font-black text-sm tracking-[5px]">Zero Nodes detected in current Grid Filter</p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
