'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  User,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Clock,
  ArrowLeft,
} from 'lucide-react';

interface AdminLoginScreenProps {
  onLoginSuccess: () => void;
}

export default function AdminLoginScreen({ onLoginSuccess }: AdminLoginScreenProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      // Check against custom saved password or default master credentials
      const customPassword = typeof window !== 'undefined' ? localStorage.getItem('iconfurniture_custom_admin_pwd') : null;
      const validPasswords = [
        'iconfurniture2026',
        'icon2026',
        'admin',
        '123456',
        customPassword,
      ].filter(Boolean);

      const isValidUser = cleanUser === 'admin' || cleanUser === 'icon' || cleanUser === 'admin@iconfurniture.com';
      const isValidPass = validPasswords.some((p) => p?.toLowerCase() === cleanPass.toLowerCase());

      if (isValidUser && isValidPass) {
        if (rememberMe) {
          localStorage.setItem('iconfurniture_admin_authenticated', 'true');
          localStorage.setItem('iconfurniture_admin_user', cleanUser);
        } else {
          sessionStorage.setItem('iconfurniture_admin_authenticated', 'true');
        }
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid username or master key. (Hint: password is "iconfurniture2026" or "admin")');
      }
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setUsername('admin');
    setPassword('iconfurniture2026');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#859F3C] selection:text-white">
      {/* Ambient background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#859F3C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#859F3C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#859F3C]/5 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar */}
      <header className="p-6 sm:p-8 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-stone-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-[#859F3C]" />
          <span>Addis Ababa Secured Portal</span>
        </div>
      </header>

      {/* Center Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md bg-[#1A1A1A] border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#859F3C] to-transparent" />

          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#859F3C] to-[#5e7226] p-0.5 flex items-center justify-center shadow-lg shadow-[#859F3C]/20">
              <div className="w-full h-full bg-[#1A1A1A] rounded-[14px] flex items-center justify-center">
                <Lock className="w-7 h-7 text-[#859F3C]" />
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#859F3C] font-bold block">
                Executive Access
              </span>
              <h1 className="font-serif text-2xl font-bold text-white mt-0.5">
                ICON FURNITURE
              </h1>
              <p className="text-xs text-stone-400 font-sans mt-1">
                Management Console & Frontend Controls
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-300">
                Administrator Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#859F3C] focus:bg-white/10 focus:ring-2 focus:ring-[#859F3C]/20 text-sm text-white placeholder-stone-500 transition-all font-mono outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-300">
                  Master Security Key
                </label>
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-[11px] font-semibold text-[#859F3C] hover:underline cursor-pointer"
                >
                  Auto-fill Key
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#859F3C] focus:bg-white/10 focus:ring-2 focus:ring-[#859F3C]/20 text-sm text-white placeholder-stone-500 transition-all font-mono outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#859F3C] rounded cursor-pointer"
                />
                <span>Remember this device</span>
              </label>

              <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#859F3C]" />
                <span>SSL Encrypted</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#859F3C] hover:bg-[#738b32] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#859F3C]/30 hover:shadow-[#859F3C]/50 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 group"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Access Info */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-stone-400 font-sans">
              Default credentials:{' '}
              <span className="font-mono text-stone-300 font-bold">admin</span> /{' '}
              <span className="font-mono text-[#859F3C] font-bold">iconfurniture2026</span>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[11px] text-stone-400 z-10 font-sans">
        © {new Date().getFullYear()} Icon Furniture PLC • Bole Medhanialem, Addis Ababa
      </footer>
    </div>
  );
}
