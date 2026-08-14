"use client";

import React from "react";
import { RetroGrid } from "@/components/creative/retro-grid";
import { SparklesText } from "@/components/creative/sparkles-text";
import { InfiniteMarquee } from "@/components/creative/infinite-marquee";
import { ConfettiButton } from "@/components/creative/confetti-button";
import { BentoGrid, BentoCard } from "@/components/creative/bento-grid";
import { Shield, Zap, Globe, Cpu } from "lucide-react";

const LOGOS = ["Acme Corp", "Globex", "Soylent", "Initech", "Umbrella", "Stark", "Wayne", "Cyberdyne"];

export default function SaasTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-background/50 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12">
        <div className="font-black text-xl tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-purple-600" />
          KINETIC<span className="text-muted-foreground font-normal">SaaS</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-foreground transition-colors">Testimonials</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:text-primary transition-colors">Log in</button>
          <button className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-full hover:scale-105 transition-transform">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20">
        <RetroGrid className="opacity-50" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          <div className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Introducing Kinetic UI v2.0
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1]">
            Build landing pages <br/>
            with <SparklesText text="pure magic" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" />.
          </h1>
          
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Stop wasting time writing standard UI components. Copy, paste, and ship world-class creative experiences in minutes, not months.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
            <ConfettiButton className="px-8 py-4 text-lg">
              Start Building Free
            </ConfettiButton>
            <button className="px-8 py-4 text-lg font-bold rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <p className="text-center text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by the best teams worldwide
        </p>
        <InfiniteMarquee speed="normal" pauseOnHover>
          {LOGOS.map((logo, i) => (
            <div key={i} className="px-8 font-black text-2xl text-foreground/20 hover:text-foreground/80 transition-colors cursor-default select-none">
              {logo.toUpperCase()}
            </div>
          ))}
        </InfiniteMarquee>
      </section>

      {/* Features (Bento Grid) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to scale</h2>
          <p className="text-muted-foreground mt-4 text-lg">A complete toolkit for modern creative developers.</p>
        </div>

        <BentoGrid className="max-w-5xl mx-auto">
          <BentoCard 
            title="Blazing Fast Performance"
            description="Hardware accelerated CSS animations that never drop a frame."
            icon={<Zap className="w-5 h-5" />}
            header={<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />}
            className="md:col-span-2 md:row-span-2"
          >
            <a href="#" className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-300">Learn more &rarr;</a>
          </BentoCard>
          <BentoCard 
            title="Global Edge Network"
            description="Deploy your sites to 150+ edge nodes instantly."
            icon={<Globe className="w-5 h-5" />}
            header={<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />}
          >
            <a href="#" className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300">View map &rarr;</a>
          </BentoCard>
          <BentoCard 
            title="Bank-grade Security"
            description="SOC2 compliant infrastructure out of the box."
            icon={<Shield className="w-5 h-5" />}
            header={<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />}
          >
            <a href="#" className="mt-4 inline-block text-sm font-medium text-purple-400 hover:text-purple-300">Read docs &rarr;</a>
          </BentoCard>
          <BentoCard 
            title="Serverless Compute"
            description="Run heavy workloads instantly."
            icon={<Cpu className="w-5 h-5" />}
            header={<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />}
          >
            <a href="#" className="mt-4 inline-block text-sm font-medium text-orange-400 hover:text-orange-300">Explore compute &rarr;</a>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 text-center text-muted-foreground">
        <p>© 2026 Kinetic UI. Built with cursor and next.js.</p>
      </footer>

    </div>
  );
}
