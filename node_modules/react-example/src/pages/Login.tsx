import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Mail, Lock, Loader2, KeyRound } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();
  const { login, resetDatabase } = useAuth();

  // Email validation
  const isEmailValid = email.includes('@') && email.includes('.');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetMessage('');

    // Client-side validation
    if (!email.trim()) {
      setError('Email address is required');
      setLoading(false);
      return;
    }
    if (!isEmailValid) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      await login(email.trim().toLowerCase(), password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Failed to access Nexus. Please check your credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first to receive a reset link.');
      return;
    }
    if (!isEmailValid) {
      setError('Please enter a valid email address');
      return;
    }
    
    setResetLoading(true);
    setError('');
    setResetMessage('');
    
    try {
      // Mock reset
      await new Promise(resolve => setTimeout(resolve, 800));
      setResetMessage('Password reset link transmitted to your terminal (check your email).');
    } catch (err: any) {
      setError(err.message || 'Reset request failed');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-10 rounded-3xl z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
            <Brain className="text-bg w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text">Access Nexus</h2>
          <p className="text-text-s mt-2 text-sm">Enter your credentials to proceed</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-xs font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          {resetMessage && (
            <div className="bg-[#00ff88]/10 border border-[#00ff88]/50 text-[#00ff88] p-3 rounded-xl text-xs font-bold uppercase tracking-widest">
              {resetMessage}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-text-s ml-1 tracking-widest">Authentication ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-s" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1117] border border-border rounded-xl py-3.5 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm text-white"
                placeholder="email@ssuet.edu.pk"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-text-s ml-1 tracking-widest">Secure Passkey</label>
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
          </div>

          <div className="flex items-center justify-between text-xs font-medium">
            <label className="flex items-center gap-2 cursor-pointer text-text-s">
              <input type="checkbox" className="w-4 h-4 rounded border-border bg-[#0d1117] text-primary focus:ring-primary" />
              Remember me
            </label>
            <div className="flex gap-4">
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
              <button 
                type="button" 
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-primary hover:underline uppercase tracking-widest font-bold disabled:opacity-50"
              >
                {resetLoading ? 'Transmitting...' : 'Lost Access?'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all disabled:opacity-50 uppercase tracking-[2px]"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
              <>
                <KeyRound className="w-5 h-5" />
                INITIALIZE
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-text-s text-xs font-medium">
          New to the campus? <Link to="/signup" className="text-primary hover:underline font-bold">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
