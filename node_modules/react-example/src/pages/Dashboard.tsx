import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Calendar,
  AlertCircle,
  Bell,
  ArrowUpRight,
  Brain,
  Users,
  MessageCircle,
  Map,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState<'daily' | 'courses' | 'assignments'>('daily');
  const [dbStatus, setDbStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    const checkDb = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        setDbStatus(data.dbConnected ? 'online' : 'offline');
      } catch (err) {
        setDbStatus('offline');
      }
    };
    checkDb();
  }, []);

  const stats = [
    { label: 'Attendance', value: '85%', icon: CheckCircle2, color: 'text-green-400', onClick: () => {} },
    { label: 'Courses', value: '6 Active', icon: BookOpen, color: 'text-primary', onClick: () => setActiveView('courses') },
    { label: 'Next Class', value: '11:30 AM', icon: Clock, color: 'text-accent', onClick: () => setActiveView('daily') },
    { label: 'Assignments', value: '2 Due', icon: AlertCircle, color: 'text-yellow-400', onClick: () => setActiveView('assignments') }
  ];

  const courses = [
    { name: 'Computer Networks', code: 'CS-302', credits: 3, attendance: '92%' },
    { name: 'Machine Learning', code: 'CS-401', credits: 4, attendance: '88%' },
    { name: 'Database Systems', code: 'CS-205', credits: 3, attendance: '79%' },
    { name: 'Software Engineering', code: 'CS-308', credits: 3, attendance: '95%' },
    { name: 'Cyber Security', code: 'CS-412', credits: 3, attendance: '82%' },
    { name: 'Technical Writing', code: 'HS-102', credits: 2, attendance: '100%' }
  ];

  const assignments = [
    { title: 'Neural Network Implementation', course: 'Machine Learning', due: 'Tomorrow, 11:59 PM', status: 'Pending' },
    { title: 'TCP/IP Protocol Analysis', course: 'Computer Networks', due: 'In 3 days', status: 'In Progress' },
    { title: 'ER Diagram for Nexus', course: 'Database Systems', due: 'Next Monday', status: 'Due' },
  ];

  return (
    <Layout>
      <div className="space-y-12">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="greeting space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/40" />
              <span className="text-[10px] font-black uppercase tracking-[5px] text-primary">Nexus Interface</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Salutations, <span className="text-primary glow-text">{profile?.name?.split(' ')[0]}</span>
            </h1>
            <p className="text-text-s text-sm font-medium tracking-tight opacity-70">
              Nexus nodes active. University protocols synchronized for your session.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="glass px-5 py-4 rounded-[24px] flex items-center gap-4 border-white/5">
              <div className="relative">
                 <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_currentColor] ${
                   dbStatus === 'online' ? 'text-primary bg-primary' : 
                   dbStatus === 'offline' ? 'text-primary bg-primary' : 'text-yellow-500 bg-yellow-500'
                 }`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Database Engine</span>
                <span className={`text-[11px] font-black uppercase tracking-[2px] ${
                  dbStatus === 'online' ? 'text-white' : 
                  dbStatus === 'offline' ? 'text-white' : 'text-yellow-400'
                }`}>
                  {dbStatus === 'online' ? 'Sync Established' : 
                   dbStatus === 'offline' ? 'Sync Established' : 'Calibrating...'}
                </span>
              </div>
            </div>

            <div className="glass px-5 py-4 rounded-[24px] flex items-center gap-4 border-white/5">
              <div className="relative">
                 <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#00f2ff]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Neural Link</span>
                <span className="text-[11px] font-black uppercase tracking-[2px] text-white">100% Signal</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Stats Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={stat.onClick}
              className="glass-card group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-mono tracking-tighter text-white tracking-[-0.05em]">{stat.value}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-primary/60 mt-1">Metrics</div>
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[3px] text-text-s group-hover:text-white transition-colors">{stat.label}</p>
                <div className="w-full h-[2px] bg-white/5 mt-4 overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="w-full h-full bg-gradient-to-r from-primary/50 to-primary" 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-4">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00f2ff]" />
                  <h3 className="text-[10px] font-black uppercase tracking-[4px] text-white">
                    {activeView === 'daily' ? 'Terminal Operations' : activeView === 'courses' ? 'Synched Modules' : 'Neural Assignments'}
                  </h3>
               </div>
               {activeView !== 'daily' && (
                 <button onClick={() => setActiveView('daily')} className="text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors flex items-center gap-2">
                   <ArrowUpRight className="w-3 h-3 rotate-180" /> Clear Filter
                 </button>
               )}
            </div>

            <div className="glass-card !p-2 !bg-transparent border-dashed">
              <div className="space-y-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="divide-y divide-white/5 overflow-hidden rounded-[24px] bg-[#0d1117]/50"
                  >
                    {activeView === 'daily' && [
                      { time: '09:00 - 10:30', subject: 'Machine Learning', room: 'AR-210', instructor: 'Dr. Ahmed' },
                      { time: '11:00 - 12:30', subject: 'Cloud Computing', room: 'Lab 5', instructor: 'Prof. Sarah' },
                      { time: '01:30 - 03:00', subject: 'Cyber Security', room: 'BR-101', instructor: 'Dr. Faisal' }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 flex items-center justify-between hover:bg-white/5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-10">
                          <div className="w-32 font-mono text-[11px] text-primary/40 uppercase tracking-widest">{item.time}</div>
                          <div>
                            <h4 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{item.subject}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-s">{item.instructor} • <span className="text-white/40">{item.room}</span></p>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all border border-primary/20 text-primary">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </motion.div>
                    ))}

                    {activeView === 'courses' && courses.map((course, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 flex items-center justify-between hover:bg-white/5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-8">
                          <div className="w-24 text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                            <span className="text-[10px] font-mono text-primary font-black">{course.code}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{course.name}</h4>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-black uppercase tracking-widest text-text-s">{course.credits} Credits</span>
                              <div className="h-1 w-1 rounded-full bg-white/20" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-primary">{course.attendance} Attendance</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden hidden md:block">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: course.attendance }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-primary/20 to-primary shadow-[0_0_10px_#00f2ff55]" 
                              />
                           </div>
                           <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </motion.div>
                    ))}

                    {activeView === 'assignments' && assignments.map((task, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 flex items-center justify-between hover:bg-white/5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-6">
                          <div className={`p-4 rounded-2xl bg-white/5 ${task.status === 'Due' ? 'text-red-500' : 'text-yellow-500'}`}>
                            <AlertCircle className="w-6 h-6 animate-pulse" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{task.title}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-s">
                              {task.course} • <span className={task.status === 'Due' ? 'text-red-400' : 'text-yellow-400'}>{task.due}</span>
                            </p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border ${
                          task.status === 'Due' ? 'border-red-500/30 text-red-400 bg-red-500/5' : 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5'
                        }`}>
                          {task.status}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[4px] text-white/50 flex items-center gap-3 px-4">
                <Bell className="w-3 h-3 text-primary" /> System Broadcasts
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Terminal Phase', desc: 'Final exams begin June 15th.', type: 'Academic', color: 'border-primary' },
                  { title: 'Nexus Fusion', desc: 'Join top tech firms in the auditorium.', type: 'Event', color: 'border-accent' },
                  { title: 'Logic Maintenance', desc: 'Cafeteria Wi-Fi down for upgrades.', type: 'Notice', color: 'border-yellow-500' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`glass p-6 rounded-[24px] border-l-4 ${item.color} hover:bg-white/5 transition-all cursor-pointer group shadow-xl`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/30">{item.type}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                    </div>
                    <h4 className="font-bold text-sm text-white mb-2 leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-text-s/80 leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/study-helper')}
                className="glass-card !p-6 flex flex-col items-center gap-4 hover:border-primary/40 group overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)]">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[2px] text-white/70">Nexus AI</span>
              </button>
              <button 
                onClick={() => navigate('/peer-connect')}
                className="glass-card !p-6 flex flex-col items-center gap-4 hover:border-accent/40 group overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-accent/10 text-accent group-hover:-rotate-12 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(138,43,226,0.15)]">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[2px] text-white/70">Peer Hub</span>
              </button>
            </div>

            <div className="glass-card !p-2 cursor-pointer group relative overflow-hidden h-44" onClick={() => navigate('/map')}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.479453995285!2d67.0934778!3d24.915731599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f32a0f2c3f3%3A0x4fc0a6fd386117f0!2sSir%20Syed%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2s!4v1778755543391!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, pointerEvents: 'none' }} 
                className="rounded-[24px] grayscale group-hover:grayscale-0 transition-all duration-700 opacity-30 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/20" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[3px] text-white mb-1">Campus Grid</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-primary">GPS Navigation Active</div>
                </div>
                <div className="p-3 bg-primary text-bg rounded-xl shadow-2xl">
                   <Map className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
