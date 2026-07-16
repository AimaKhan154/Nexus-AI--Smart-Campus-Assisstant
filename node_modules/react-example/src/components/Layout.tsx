import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Map as MapIcon, 
  Bell, 
  Users, 
  LogOut, 
  Brain,
  Menu,
  X,
  UserX
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const { profile, logout, deleteAccount } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = async () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("CRITICAL: This will permanently purge your neural profile and all associated data from Nexus. Proceed?")) {
      try {
        setIsDeleting(true);
        await deleteAccount();
        navigate('/');
      } catch (err: any) {
        alert("System Error: Re-authentication required for terminal sequence. Please sign out and sign back in before purging.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Brain, label: 'AI Study Helper', path: '/study-helper' },
    { icon: Users, label: 'Peer Connect', path: '/peer-connect' },
    { icon: MessageCircle, label: 'Internal Feedback', path: '/feedback' },
    { icon: MapIcon, label: 'Campus Map', path: '/map' },
    { icon: Bell, label: 'Announcements', path: '/announcements' },
    { icon: Users, label: 'Faculty', path: '/faculty' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-[#080a0d] border-r border-white/5 z-50 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-10 flex items-center justify-between mb-2">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Brain className="text-bg w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-[4px] text-white uppercase italic leading-none">Nexus</span>
                <span className="text-[8px] font-black uppercase tracking-[3px] text-primary/50 italic mt-1 ml-0.5">SST Engine v4.0</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/50">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="px-6 space-y-2 mt-10">
            <div className="flex items-center gap-3 px-4 mb-6">
              <div className="h-px w-6 bg-primary/20" />
              <div className="text-[9px] uppercase font-black tracking-[5px] text-primary/30">Lattice Nodes</div>
            </div>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `group flex items-center gap-4 px-5 py-4 rounded-[20px] transition-all duration-500 text-[10px] font-black uppercase tracking-[3px] border relative overflow-hidden ${
                    isActive 
                      ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_30px_rgba(0,242,255,0.08)]' 
                      : 'text-white/30 border-transparent hover:bg-white/[0.02] hover:text-white hover:border-white/5'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 transition-transform group-hover:scale-110 group-active:scale-95" />
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-8 border-t border-white/5 bg-[#080a0d] shrink-0">
          <div className="flex items-center gap-5 mb-8 px-2 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center font-black text-primary uppercase text-sm group-hover:border-primary/40 transition-colors">
                {profile?.name?.[0] || 'U'}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-4 border-[#080a0d] bg-primary shadow-[0_0_10px_#00f2ff]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black uppercase tracking-[2px] text-white truncate mb-0.5 group-hover:text-primary transition-colors">{profile?.name || 'User'}</p>
              <p className="text-[8px] text-primary font-black uppercase tracking-[3px] opacity-50 italic">Auth Level: {profile?.role || 'Guest'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <button 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-s hover:bg-red-500/10 hover:text-red-400 transition-all text-[9px] font-black uppercase tracking-widest disabled:opacity-50"
            >
              <UserX className="w-3.5 h-3.5" />
              <span>{isDeleting ? 'Purging...' : 'Termination'}</span>
            </button>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Broadcast Exit</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex relative overflow-hidden">
      {/* Structural Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen relative z-10">
        {/* Mobile Header */}
        <header className="lg:hidden glass border-b border-white/5 px-6 py-5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Brain className="text-primary w-6 h-6" />
            <span className="font-black uppercase tracking-[3px] text-sm">Nexus</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400">
            <Menu />
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-12 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
