"use client";

import React, { useRef } from "react";
import { SmoothScroll } from "@/components/creative/smooth-scroll";
import { SmartNavbar } from "@/components/creative/smart-navbar";
import { AnimatedGradientText } from "@/components/creative/animated-gradient-text";
import { InteractiveFluid } from "@/components/creative/interactive-fluid";
import { BentoGrid } from "@/components/creative/bento-grid";
import { SpotlightCard } from "@/components/creative/spotlight-card";
import { StatsSection } from "@/components/creative/stats-section";
import { ClientLogoGrid } from "@/components/creative/client-logo-grid";
import { ComparisonTable } from "@/components/creative/comparison-table";
import { CookieConsent } from "@/components/creative/cookie-consent";
import { NotificationCenter } from "@/components/creative/notification-center";
import { MagneticButton } from "@/components/creative/magnetic-button";
import { BarChart3, Shield, Zap, Cloud, ArrowRight, Check, Activity, Users, Database, Globe } from "lucide-react";

// Dummy data for components
const STATS_DATA = [
  { value: 99.99, label: "Uptime", suffix: "%", decimals: 2, icon: <Activity className="w-6 h-6" /> },
  { value: 50, label: "Queries/sec", suffix: "k+", icon: <Zap className="w-6 h-6" /> },
  { value: 2, label: "Users", prefix: "M+", icon: <Users className="w-6 h-6" /> },
  { value: 10, label: "Data Centers", icon: <Globe className="w-6 h-6" /> },
];

const LOGOS_DATA = [
  { id: 1, name: "Acme Corp", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: 2, name: "Global Tech", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 3, name: "Innovate Inc", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { id: 4, name: "Future Solutions", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id: 5, name: "NextGen Systems", src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
];

const PLANS_DATA = [
  { id: "starter", name: "Starter", price: "$49/mo", description: "Perfect for small teams." },
  { id: "pro", name: "Pro", price: "$99/mo", description: "Everything in Starter plus advanced analytics.", isPopular: true },
  { id: "enterprise", name: "Enterprise", price: "Custom", description: "Dedicated support and SLAs." },
];

const FEATURES_DATA = [
  {
    category: "Core Features",
    items: [
      { name: "Real-time Sync", tooltip: "Sync latency under 50ms", values: { starter: true, pro: true, enterprise: true } },
      { name: "Data Retention", values: { starter: "7 Days", pro: "30 Days", enterprise: "Unlimited" } },
      { name: "Custom Dashboards", values: { starter: false, pro: true, enterprise: true } },
    ]
  }
];

export default function SaasTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans" ref={containerRef}>
      <SmoothScroll containerRef={containerRef}>
        
        {/* Navigation */}
        <SmartNavbar>
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-bold tracking-tight">VibeData</span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Features</a>
              <a href="#customers" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Customers</a>
              <a href="#pricing" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Pricing</a>
            </div>
          </div>
        </SmartNavbar>
        
        {/* Notification Bell (Absolute top right) */}
        <div className="fixed top-4 right-4 md:top-6 md:right-8 z-50 mix-blend-difference hidden md:block">
          <NotificationCenter 
            notifications={[
              { id: "1", title: "New Feature", description: "Bento Grids are now available in your dashboard.", time: "2m ago", unread: true },
              { id: "2", title: "System Update", description: "Maintenance scheduled for tonight at 2AM UTC.", time: "1h ago", unread: false },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center pt-20 overflow-hidden">
          {/* Background Fluid */}
          <div className="absolute inset-0 z-0 opacity-40">
            <InteractiveFluid />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              VibeData v2.0 is live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              Data analytics that <br/>
              <AnimatedGradientText className="from-indigo-400 via-purple-400 to-pink-400">
                actually make sense
              </AnimatedGradientText>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect your databases in seconds and visualize billions of rows in real-time. Built for modern teams who need answers, not complex SQL queries.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                Start for free <ArrowRight className="w-5 h-5" />
              </MagneticButton>
              <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Book a demo
              </button>
            </div>
          </div>
        </section>

        {/* Logo Cloud */}
        <section id="customers" className="py-20 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-10">
              Trusted by innovative teams worldwide
            </p>
            <ClientLogoGrid logos={LOGOS_DATA} />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-zinc-950">
          <StatsSection stats={STATS_DATA} layout="grid" className="max-w-7xl mx-auto px-6" />
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-32 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Everything you need, nothing you don't.</h2>
              <p className="text-zinc-400 text-lg">We stripped away the clutter of legacy BI tools and built a lightning-fast experience.</p>
            </div>
            
            <BentoGrid className="max-w-6xl mx-auto">
              {/* Large item */}
              <div className="md:col-span-2 md:row-span-2">
                <SpotlightCard className="h-full p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6">
                      <Zap className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Real-time Sync</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Your data updates in milliseconds. No more waiting for nightly batch jobs or complex ETL pipelines. Connect Postgres, MySQL, or MongoDB in two clicks.
                    </p>
                  </div>
                  <div className="mt-8 h-40 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-50" />
                    <BarChart3 className="w-16 h-16 text-indigo-500/50" />
                  </div>
                </SpotlightCard>
              </div>
              
              {/* Small items */}
              <div>
                <SpotlightCard className="h-full p-8">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    SOC2 Type II certified. Your data never leaves your VPC. End-to-end encryption by default.
                  </p>
                </SpotlightCard>
              </div>
              
              <div>
                <SpotlightCard className="h-full p-8">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6">
                    <Cloud className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Cloud Native</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Built for the modern edge. Deploys seamlessly across AWS, GCP, and Azure with zero config.
                  </p>
                </SpotlightCard>
              </div>
            </BentoGrid>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section id="pricing" className="py-32 bg-zinc-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing.</h2>
              <p className="text-zinc-400 text-lg">No hidden fees. No surprise overages. Just honest pricing that scales with you.</p>
            </div>
            
            <ComparisonTable plans={PLANS_DATA} features={FEATURES_DATA} />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-black text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} VibeData Inc. All rights reserved.</p>
        </footer>

        {/* Trust/Compliance */}
        <CookieConsent variant="modal" />
        
      </SmoothScroll>
    </div>
  );
}
