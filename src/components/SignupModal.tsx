import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, X } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onSignup: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      onSignup();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-zinc-900 border-2 border-gold-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(245,135,0,0.2)] relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-gold-100 via-gold-400 to-gold-700 bg-clip-text text-transparent">
                  Free Spins Ended
                </h2>
                <p className="text-gold-500/60 font-mono text-xs tracking-widest uppercase">
                  Sign up to continue playing
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 ml-1">Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-gold-400 transition-colors" />
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold-500/50 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 ml-1">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-gold-400 transition-colors" />
                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold-500/50 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-gold-400 transition-colors" />
                    <input
                      required
                      type="password"
                      placeholder="Create a password"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold-500/50 transition-all"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-500 active:scale-95 text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(245,135,0,0.2)] transition-all duration-300 border-b-4 border-gold-800 hover:border-gold-700 mt-4 uppercase tracking-widest text-sm"
                >
                  Create Account
                </button>
              </form>

              <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest">
                By signing up, you agree to our terms of service
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
