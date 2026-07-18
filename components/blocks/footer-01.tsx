'use client';

// Requires: npx kinetic-ui add magnetic-button
import React from 'react';
import { MagneticButton } from '@/components/creative/magnetic-button';
import { Sparkles, ArrowRight, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer01() {
  return (
    <footer className="w-full bg-black text-white py-20 relative overflow-hidden border-t border-white/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        <div className="text-center max-w-2xl mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to elevate your <br /> next project?
          </h2>
          <p className="text-zinc-400 text-lg font-light mb-10">
            Join thousands of developers building the future of the web with our premium physics-driven UI components.
          </p>
          <MagneticButton className="bg-white text-black px-8 py-4 text-sm font-bold flex items-center gap-2 mx-auto">
            Get Started Now <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-400 text-sm">
          <p>© {new Date().getFullYear()} Kinetic UI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">License</a>
          </div>
          <div className="flex gap-4">
            <MagneticButton className="p-2 bg-white/5 border border-white/10 text-white rounded-full">
              <Twitter className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton className="p-2 bg-white/5 border border-white/10 text-white rounded-full">
              <Github className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton className="p-2 bg-white/5 border border-white/10 text-white rounded-full">
              <Linkedin className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
