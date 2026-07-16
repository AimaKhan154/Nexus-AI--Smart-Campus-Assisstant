import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Mail, 
  MessageSquare, 
  Clock,
  Filter,
  ArrowUpRight
} from 'lucide-react';

const FACULTY = [
  { id: 1, name: 'Dr. Ahmed Ali', dept: 'Computer Science', role: 'Head of Department', email: 'ahmed.ali@ssuet.edu.pk', hours: 'Mon/Wed 10-12' },
  { id: 2, name: 'Prof. Sarah Khan', dept: 'Software Engineering', role: 'Associate Professor', email: 'sarah.k@ssuet.edu.pk', hours: 'Tue/Thu 11-1' },
  { id: 3, name: 'Dr. Faisal Raza', dept: 'Electrical Engineering', role: 'Professor', email: 'faisal.r@ssuet.edu.pk', hours: 'Fri 9-11' },
  { id: 4, name: 'Ms. Hiba Noor', dept: 'Computer Science', role: 'Senior Lecturer', email: 'hiba.n@ssuet.edu.pk', hours: 'Mon-Fri 2-3' },
  { id: 5, name: 'Dr. Umair Siddiqui', dept: 'Information Technology', role: 'Professor', email: 'umair.s@ssuet.edu.pk', hours: 'Wed 12-2' }
];

export default function Faculty() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const departments = ['All', ...new Set(FACULTY.map(f => f.dept))];
  
  const filtered = FACULTY.filter(f => 
    (deptFilter === 'All' || f.dept === deptFilter) &&
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.dept.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase mb-1">Faculty Directory</h1>
            <p className="text-gray-500 text-sm font-light uppercase tracking-widest">Academic Personnel Interface</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase whitespace-nowrap transition-all ${deptFilter === dept ? 'bg-primary text-bg' : 'glass text-gray-400 hover:text-white'}`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prof, i) => (
            <motion.div
              key={prof.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-8 rounded-3xl group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-black text-2xl text-primary glow-border">
                  {prof.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{prof.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{prof.role}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{prof.dept}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="truncate">{prof.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{prof.hours}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={`mailto:${prof.email}`}
                  className="flex items-center justify-center gap-2 py-3 glass rounded-xl text-xs font-bold uppercase hover:bg-white/5 transition-all"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
                <button className="flex items-center justify-center gap-2 py-3 bg-primary text-bg rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all">
                  <MessageSquare className="w-4 h-4" /> Chat
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 glass rounded-3xl text-center opacity-40">
            <Users className="w-16 h-16 mx-auto mb-4" />
            <p className="text-xl font-bold uppercase tracking-widest">No Personnel Found</p>
            <button onClick={() => { setSearch(''); setDeptFilter('All'); }} className="text-primary mt-2 hover:underline">Clear Search</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
