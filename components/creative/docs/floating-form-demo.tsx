"use client";

import React, { useState } from "react";
import { FloatingInput, FloatingTextarea, FloatingCheckbox, FloatingRadio } from "@/components/creative/floating-form";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Lock, Mail, Send, User } from "lucide-react";

const VARIANTS = [
  { id: "newsletter", label: "Newsletter", accent: "#6366f1" },
  { id: "login", label: "Login Form", accent: "#10b981" },
  { id: "contact", label: "Contact Us", accent: "#f97316" },
  { id: "preferences", label: "Preferences", accent: "#a855f7" },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

export function FloatingFormDemo() {
  const [activeVariant, setActiveVariant] = useState<VariantId>("newsletter");

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ── Variant Tab Bar ── */}
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(v.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
              activeVariant === v.id
                ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: v.accent }}
              />
              {v.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Active Variant Preview ── */}
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-12 min-h-[400px] flex items-center justify-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{
            background: `radial-gradient(circle at center, ${VARIANTS.find(v => v.id === activeVariant)?.accent} 0%, transparent 60%)`
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm relative z-10"
          >
            {activeVariant === "newsletter" && <NewsletterVariant />}
            {activeVariant === "login" && <LoginVariant />}
            {activeVariant === "contact" && <ContactVariant />}
            {activeVariant === "preferences" && <PreferencesVariant />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Newsletter Variant ─── */
function NewsletterVariant() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return <SuccessMessage message="You're on the list." onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
      }}
      className="flex gap-2"
    >
      <FloatingInput 
        label="Email address" 
        type="email" 
        required 
      />
      <button 
        type="submit"
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}

/* ─── Login Variant ─── */
function LoginVariant() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return <SuccessMessage message="Welcome back." onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
      }}
      className="flex flex-col gap-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-white">Sign In</h3>
        <p className="text-sm text-zinc-400 mt-1">Access your dashboard</p>
      </div>
      
      <div className="relative">
        <FloatingInput label="Email address" type="email" required />
        <Mail className="absolute right-4 top-3.5 w-5 h-5 text-zinc-500" />
      </div>
      
      <div className="relative">
        <FloatingInput label="Password" type="password" required />
        <Lock className="absolute right-4 top-3.5 w-5 h-5 text-zinc-500" />
      </div>
      
      <button 
        type="submit"
        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors mt-2"
      >
        Sign In
      </button>
      
      <a href="#" className="text-xs text-center text-zinc-500 hover:text-white transition-colors">
        Forgot your password?
      </a>
    </form>
  );
}

/* ─── Contact Variant ─── */
function ContactVariant() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return <SuccessMessage message="Message sent." onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
      }}
      className="flex flex-col gap-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-white">Get in touch</h3>
        <p className="text-sm text-zinc-400 mt-1">We'd love to hear from you</p>
      </div>
      
      <div className="relative">
        <FloatingInput label="Full Name" type="text" required />
        <User className="absolute right-4 top-3.5 w-5 h-5 text-zinc-500" />
      </div>
      
      <div className="relative">
        <FloatingInput label="Email address" type="email" required />
        <Mail className="absolute right-4 top-3.5 w-5 h-5 text-zinc-500" />
      </div>
      
      <FloatingTextarea label="Your Message" required />
      
      <button 
        type="submit"
        className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium transition-colors mt-2 flex items-center justify-center gap-2"
      >
        Send Message
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

/* ─── Shared Success Component ─── */
function SuccessMessage({ message, onReset }: { message: string, onReset: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center bg-zinc-900/50 border border-white/5 rounded-2xl"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
        <Check className="w-6 h-6 text-emerald-400" />
      </div>
      <h3 className="text-lg font-medium text-white">{message}</h3>
      <button 
        onClick={onReset}
        className="text-sm text-zinc-400 hover:text-white mt-4 underline decoration-zinc-700 underline-offset-4"
      >
        Go back
      </button>
    </motion.div>
  );
}

/* ─── Preferences Variant ─── */
function PreferencesVariant() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [theme, setTheme] = useState("dark");

  if (isSubmitted) {
    return <SuccessMessage message="Preferences saved." onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
      }}
      className="flex flex-col gap-5 w-full max-w-sm mx-auto"
    >
      <div className="text-center mb-2">
        <h3 className="text-xl font-semibold text-white">Preferences</h3>
        <p className="text-sm text-zinc-400 mt-1">Customize your experience</p>
      </div>
      
      <div className="space-y-3">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Notifications</label>
        <FloatingCheckbox label="Email updates" defaultChecked />
        <FloatingCheckbox label="SMS alerts" />
      </div>

      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Theme</label>
        <div className="flex flex-col gap-2">
          <FloatingRadio 
            name="theme" 
            label="Dark Mode" 
            checked={theme === "dark"} 
            onChange={() => setTheme("dark")} 
          />
          <FloatingRadio 
            name="theme" 
            label="Light Mode" 
            checked={theme === "light"} 
            onChange={() => setTheme("light")} 
          />
        </div>
      </div>
      
      <button 
        type="submit"
        className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors mt-4"
      >
        Save Changes
      </button>
    </form>
  );
}
