import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface Building {
  id: string;
  name: string;
  desc: string;
  x: number;
  y: number;
  category: string;
  details: string[];
}

const BUILDINGS: Building[] = [
  { 
    id: 'cs', 
    name: 'CS Department', 
    desc: 'Main Computer Science & IT Hub', 
    x: 200, y: 150, 
    category: 'Academic', 
    details: ['Lab 1-10', 'Faculty Offices', 'Research Center'] 
  },
  { 
    id: 'ee', 
    name: 'EE Block', 
    desc: 'Electrical Engineering & Power Systems', 
    x: 450, y: 120, 
    category: 'Academic', 
    details: ['High Voltage Lab', 'Seminar Hall', 'Robotics Lab'] 
  },
  { 
    id: 'admin', 
    name: 'Admin Office', 
    desc: 'University Management & Registrar', 
    x: 350, y: 350, 
    category: 'Admin', 
    details: ['VC Office', 'Accounts Section', 'Student Affairs'] 
  },
  { 
    id: 'lib', 
    name: 'Central Library', 
    desc: 'Digital & Physical Archive', 
    x: 100, y: 400, 
    category: 'Facility', 
    details: ['Study Pods', 'Digital Library', 'Printing Center'] 
  },
  { 
    id: 'cafe', 
    name: 'Cafeteria', 
    desc: 'Dining & Social Zone', 
    x: 550, y: 450, 
    category: 'Facility', 
    details: ['Main Dining Area', 'Juice Bar', 'Vending Machines'] 
  }
];

export default function CampusMap() {
  const [selected, setSelected] = useState<Building | null>(null);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'schematic' | 'satellite'>('satellite');

  const filteredBuildings = BUILDINGS.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase mb-1">Campus Schematic</h1>
            <p className="text-gray-500 text-sm font-light uppercase tracking-widest text-shadow-glow">Interactive Spatial Navigator</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
              <button 
                onClick={() => setViewMode('schematic')}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'schematic' ? 'bg-primary text-bg' : 'text-gray-500 hover:text-white'}`}
              >
                Blueprint
              </button>
              <button 
                onClick={() => setViewMode('satellite')}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'satellite' ? 'bg-primary text-bg' : 'text-gray-500 hover:text-white'}`}
              >
                Satellite
              </button>
            </div>
            <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Locate building or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Viewer */}
          <div className="lg:col-span-3 h-[600px] glass rounded-3xl relative overflow-hidden group border-white/5 shadow-2xl">
            {viewMode === 'satellite' ? (
              <div className="w-full h-full grayscale-[0.5] contrast-[1.1] brightness-[0.8] hover:grayscale-0 transition-all duration-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.479453995285!2d67.0934778!3d24.915731599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f32a0f2c3f3%3A0x4fc0a6fd386117f0!2sSir%20Syed%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2s!4v1778755543391!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                />
              </div>
            ) : (
              <>
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'radial-gradient(circle, #00f2fe 1px, transparent 1px)', 
                  backgroundSize: '40px 40px' 
                }} />
                
                {/* SVG Map Content */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 transition-transform duration-300"
                >
                  <svg width="800" height="600" className="w-full h-full p-10">
                    {/* Connecting Paths (Conceptual) */}
                    <path d="M200 150 L350 350 L450 120" stroke="rgba(0,242,254,0.1)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    <path d="M100 400 L350 350 L550 450" stroke="rgba(112,0,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="5,5" />

                    {BUILDINGS.map((b) => (
                      <g key={b.id} onClick={() => setSelected(b)} className="cursor-pointer group">
                        <circle 
                          cx={b.x} cy={b.y} r="12" 
                          className={`${selected?.id === b.id ? 'fill-primary' : 'fill-primary/20'} stroke-primary stroke-2 transition-all group-hover:r-16`}
                        />
                        <circle 
                          cx={b.x} cy={b.y} r="30" 
                          className={`fill-primary/5 animate-pulse ${selected?.id === b.id ? 'block' : 'hidden'}`}
                        />
                        <text 
                          x={b.x} y={b.y + 35} 
                          className={`text-[10px] uppercase font-bold tracking-widest ${selected?.id === b.id ? 'fill-primary' : 'fill-gray-500'}`}
                          textAnchor="middle"
                        >
                          {b.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                </motion.div>
              </>
            )}

            {/* Legend */}
            <div className="absolute left-6 bottom-6 flex gap-4 text-[10px] font-bold tracking-widest uppercase bg-bg/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Active Sector</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent" /> Data Node</div>
            </div>
          </div>

          {/* Sidebar Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Navigation className="text-primary w-5 h-5" />
              Navigation Panel
            </h2>

            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-6 rounded-3xl border-primary/20 border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                      {selected.category}
                    </span>
                    <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">
                      <Minimize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{selected.name}</h3>
                  <p className="text-sm text-gray-400 mb-6">{selected.desc}</p>
                  
                  <div className="space-y-4">
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-3 h-3" /> Facility Assets
                    </h4>
                    <ul className="space-y-2">
                      {selected.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Removed Initiate Routing button as requested */}
                </motion.div>
              ) : (
                <div className="glass p-8 rounded-3xl text-center opacity-40 border-white/5">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-sm uppercase font-bold tracking-widest">Select a coordinate to begin exploration</p>
                </div>
              )}
            </AnimatePresence>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Nearby Nodes</h4>
              {filteredBuildings.slice(0, 3).map(b => (
                <button 
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <span className="text-sm font-medium">{b.name}</span>
                  <Navigation className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors rotate-45" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
