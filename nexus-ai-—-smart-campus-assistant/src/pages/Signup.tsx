import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, User, Mail, Lock, Loader2, ShieldCheck } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('');
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, resetDatabase } = useAuth();

  // Password strength validation
  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    return { strength, requirements: {
      length: pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd)
    }};
  };

  const passwordStrength = getPasswordStrength(password);
  const isPasswordValid = passwordStrength.strength === 3;

  // Email validation
  const isEmailValid = email.includes('@') && email.includes('.');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Client-side validation
    if (!name.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      setLoading(false);
      return;
    }
    if (!isEmailValid) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (!isPasswordValid) {
      setError('Password must be at least 6 characters with uppercase letter and number');
      setLoading(false);
      return;
    }

    try {
      await signup({ 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password, 
        role,
        major: major || 'Undecided'
      });
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Signup Error:", err);
      setError(err.message || 'Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-lg p-10 rounded-3xl z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
            <Brain className="text-bg w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text text-center">Portal Enrollment</h2>
          <p className="text-text-s mt-2 text-sm text-center font-medium">Create your Nexus Network identification</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-xs font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-3.5 rounded-xl border transition-all text-xs font-black tracking-widest uppercase ${role === 'student' ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,242,255,0.1)]' : 'bg-[#0d1117] border-border text-text-s hover:text-white'}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('faculty')}
              className={`py-3.5 rounded-xl border transition-all text-xs font-black tracking-widest uppercase ${role === 'faculty' ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,242,255,0.1)]' : 'bg-[#0d1117] border-border text-text-s hover:text-white'}`}
            >
              Faculty
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-text-s ml-1 tracking-widest">Full Personnel Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-s" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0d1117] border border-border rounded-xl py-3.5 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm text-white"
                placeholder="Ahmed Khan"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-text-s ml-1 tracking-widest">Official Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-s" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-[#0d1117] border rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all text-sm text-white ${isEmailValid ? 'border-green-500/50' : 'border-border'} focus:border-primary/50`}
                placeholder="id@ssuet.edu.pk"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-text-s ml-1 tracking-widest">Academic Program (Optional)</label>
            <div className="relative">
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full bg-[#0d1117] border border-border rounded-xl py-3.5 pl-4 pr-4 focus:border-primary/50 outline-none transition-all text-sm text-white"
              >
                <option value="">Select Program</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-text-s ml-1 tracking-widest">Security Passkey</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-s" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1117] border border-border rounded-xl py-3.5 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm text-white"
                placeholder="••••••••"
              />
            </div>
            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2 mt-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        i < passwordStrength.strength ? 'bg-green-500' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[9px] space-y-1">
                  <div className={`flex items-center gap-2 ${passwordStrength.requirements.length ? 'text-green-400' : 'text-text-s'}`}>
                    <span>✓ At least 6 characters</span>
                  </div>
                  <div className={`flex items-center gap-2 ${passwordStrength.requirements.uppercase ? 'text-green-400' : 'text-text-s'}`}>
                    <span>✓ One uppercase letter (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-2 ${passwordStrength.requirements.number ? 'text-green-400' : 'text-text-s'}`}>
                    <span>✓ One number (0-9)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] text-text-s px-1 py-2 font-bold uppercase tracking-widest leading-relaxed">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
              Encryption Active
            </div>
            <button 
              type="button" 
              onClick={() => {
                if(window.confirm("CRITICAL: This will wipe ALL local user data. Are you sure?")) {
                  resetDatabase();
                }
              }}
              className="text-red-400/30 hover:text-red-400 transition-colors uppercase tracking-widest font-black text-[9px]"
            >
              Reset Data
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="w-full bg-primary text-black font-black py-4 mt-2 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[2px]"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'INITIALIZE PROFILE'}
          </button>
        </form>

        <p className="text-center mt-10 text-text-s text-xs font-medium">
          Already have an identification? <Link to="/login" className="text-primary hover:underline font-bold">Access Portal</Link>
        </p>
      </motion.div>
    </div>
  );
}
