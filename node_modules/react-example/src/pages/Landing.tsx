import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Brain, Compass, Users, Bell, ArrowRight, Sparkles } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#05070a]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="fixed inset-0 pointer-events-none opacity-[0.05]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-10 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.3)]">
            <Brain className="text-bg w-7 h-7" />
          </div>
          <span className="text-xl font-black tracking-[4px] text-white uppercase">Nexus System</span>
        </div>
        <div className="flex gap-10 items-center">
          <Link to="/login" className="text-[10px] font-black text-white/50 hover:text-primary transition-all uppercase tracking-[3px]">Login</Link>
          <Link to="/signup" className="px-8 py-3.5 bg-primary/10 border border-primary/20 text-primary font-black text-[10px] rounded-2xl hover:bg-primary hover:text-bg hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all uppercase tracking-[4px]">
            Initialize Neural Link
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-primary text-[9px] font-black uppercase tracking-[5px] mb-12 shadow-2xl backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00f2ff]" />
            Nexus Core v4.0.1 Stable
          </div>
          
          <h1 className="text-[14vw] lg:text-[10vw] font-black mb-10 tracking-[-0.08em] leading-[0.85] text-white uppercase select-none">
            Digital Brain <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary glow-text">of SSUET</span>
          </h1>
          
          <div className="h-px w-24 bg-white/10 mx-auto mb-10" />

          <p className="text-sm md:text-base text-text-s mb-16 max-w-xl mx-auto font-black uppercase tracking-[5px] leading-loose opacity-60">
            “Stay connected, get respected — <span className="text-primary italic">NexusAI</span>, perfectly directed.”
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup" className="group px-12 py-5 bg-primary text-bg font-black rounded-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,242,255,0.2)] uppercase tracking-[4px] text-xs">
              <Sparkles className="w-5 h-5" /> Start Initialization
            </Link>
            <Link to="/map" className="px-12 py-5 glass border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-[4px] text-[10px]">
              System Map Topology
            </Link>
          </div>
        </motion.div>

        {/* Features Minimalist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mt-40 max-w-full w-full border-t border-white/5">
          {[
            { icon: Brain, title: "Neural Logic", desc: "Advanced AI interface for complex campus logic." },
            { icon: Compass, title: "Spatial Grid", desc: "Interactive map with topological routing data." },
            { icon: Bell, title: "Signal Pulse", desc: "Real-time broadcasts and academic triggers." },
            { icon: Users, title: "Hive Personnel", desc: "Secure link to faculty and student aggregates." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#05070a] p-12 lg:p-16 text-left group hover:bg-primary/[0.02] transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                <feature.icon className="text-primary w-7 h-7" />
              </div>
              <h3 className="text-xs font-black mb-4 text-white uppercase tracking-[4px] group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-[11px] text-text-s/70 leading-relaxed font-bold uppercase tracking-widest">{feature.desc}</p>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 px-10 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 relative z-10 bg-[#05070a]">
        <div className="flex items-center gap-3 opacity-30">
          <Brain className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[4px]">Nexus Core v4</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[3px] text-text-s/30 text-center">
          &copy; 2026 Sir Syed University of Engineering & Technology. Proprietary Neural OS.
        </div>
        <div className="flex gap-8 opacity-30">
          <span className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-primary">Status</span>
          <span className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-primary">Legal</span>
        </div>
      </footer>
    </div>
  );
}
