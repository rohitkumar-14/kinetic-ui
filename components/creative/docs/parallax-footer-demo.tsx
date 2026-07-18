"use client";

import React, { useRef, useState } from "react";
import { ParallaxFooter } from "@/components/creative/parallax-footer";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Twitter,
  Dribbble,
  Mail,
  Heart,
  Sparkles,
  MapPin,
  Phone,
  Globe,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Tab definitions ─── */
const VARIANTS = [
  { id: "brand",   label: "Brand",       accent: "#6366f1" },
  { id: "minimal", label: "Minimal CTA", accent: "#10b981" },
  { id: "agency",  label: "Agency",      accent: "#f97316" },
  { id: "saas",    label: "SaaS Mega",   accent: "#8b5cf6" },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

/* ─── Main exported demo with tabs ─── */
export function ParallaxFooterDemo() {
  const [activeVariant, setActiveVariant] = useState<VariantId>("brand");
  const activeAccent = VARIANTS.find((v) => v.id === activeVariant)!.accent;

  return (
    <div className="w-full flex flex-col gap-5">
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

      {/* ── Active variant preview ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVariant}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <DemoShell>
            {activeVariant === "brand" && (
              <ParallaxFooter
                className="min-h-[450px] bg-zinc-950"
                watermark="KINETIC"
                accentColor="#6366f1"
                intensity={30}
              >
                <BrandFooterContent />
              </ParallaxFooter>
            )}
            {activeVariant === "minimal" && (
              <ParallaxFooter
                className="min-h-[450px] bg-zinc-950"
                watermark="LET'S GO"
                accentColor="#10b981"
                intensity={25}
              >
                <MinimalCTAContent />
              </ParallaxFooter>
            )}
            {activeVariant === "agency" && (
              <ParallaxFooter
                className="min-h-[450px] bg-zinc-950"
                watermark="STUDIO"
                accentColor="#f97316"
                intensity={35}
              >
                <AgencyFooterContent />
              </ParallaxFooter>
            )}
            {activeVariant === "saas" && (
              <ParallaxFooter
                className="min-h-[500px] bg-zinc-950"
                watermark="PLATFORM"
                accentColor="#8b5cf6"
                intensity={28}
              >
                <SaaSFooterContent />
              </ParallaxFooter>
            )}
          </DemoShell>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Shared scroll wrapper ─── */
function DemoShell({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="@container w-full h-[500px] overflow-y-auto relative rounded-2xl border border-white/10 bg-zinc-950"
    >
      <div className="w-full h-[800px] bg-background relative z-10 flex flex-col items-center justify-center border-b border-white/5 rounded-b-[48px] shadow-[0_20px_80px_rgba(0,0,0,0.7)]">
        <motion.div
          className="flex flex-col items-center justify-center gap-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <ArrowDown className="w-5 h-5 text-zinc-500" />
          </div>
          <p className="text-zinc-600 text-xs font-medium tracking-[0.2em] uppercase">
            Scroll to reveal footer
          </p>
        </motion.div>
      </div>

      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              scrollContainer: scrollRef,
            })
          : child
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   VARIANT 1 — Brand Footer
   ════════════════════════════════════════════════ */

const footerLinks = {
  Product: ["Components", "Templates", "Animations", "Playground"],
  Resources: ["Documentation", "Changelog", "Roadmap", "GitHub"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "License"],
};

const socials = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

function BrandFooterContent() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 @sm:px-8 py-10 @sm:py-16 flex flex-col gap-10 @sm:gap-16">
      <div className="pb-10 pt-48 flex flex-col @lg:flex-row justify-between items-start gap-12">
        <div className="space-y-5 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Kinetic
            </span>
          </div>
          <p className="text-sm text-zinc-100 leading-relaxed font-light">
            Handcrafted premium components for React developers who care about
            design, motion, and high-end performance. Open-source and free forever.
          </p>
          <div className="flex gap-2 mt-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-42 @xs:w-44 @sm:flex-1 h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all"
            />
            <button className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors flex items-center gap-1.5 shrink-0">
              Subscribe
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 @sm:grid-cols-4 gap-x-12 gap-y-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3.5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
                {category}
              </h4>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-zinc-300 hover:text-white transition-colors duration-200 w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col @sm:flex-row justify-between items-center gap-6">
        <p className="text-xs text-zinc-400 flex items-center gap-1.5">
          © {new Date().getFullYear()} Kinetic UI. Crafted with
          <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          using Next.js & Framer Motion.
        </p>
        <div className="flex items-center gap-1">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   VARIANT 2 — Minimal CTA Footer
   ════════════════════════════════════════════════ */

function MinimalCTAContent() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 @sm:px-8 py-12 @sm:py-20 flex flex-col items-center text-center gap-8 @sm:gap-10">
      <div className="space-y-6 pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Ready to start?
        </p>
        <h2 className="text-3xl @sm:text-4xl @md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
          Let&apos;s build something
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            extraordinary.
          </span>
        </h2>
        <p className="text-zinc-400 text-sm @sm:text-base max-w-md mx-auto font-light leading-relaxed">
          Start your next project with Kinetic and ship faster with premium,
          production-ready components.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="h-12 px-8 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2">
          Get Started Free
          <ArrowUpRight className="w-4 h-4" />
        </button>
        <button className="h-12 px-8 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
          <Github className="w-4 h-4" />
          Star on GitHub
        </button>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4" />

      <div className="flex flex-col @sm:flex-row items-center justify-between w-full gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-white">Kinetic</span>
        </div>
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {[Twitter, Github, Dribbble].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   VARIANT 3 — Agency / Studio Footer
   ════════════════════════════════════════════════ */

function AgencyFooterContent() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 @sm:px-8 py-10 @sm:py-16 flex flex-col gap-10 @sm:gap-14">
      <div className="pt-16 flex flex-col @lg:flex-row justify-between items-start gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl @sm:text-5xl @md:text-6xl font-black tracking-tighter text-white leading-[1.05]">
            Have a project
            <br />
            in mind?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
              Let&apos;s talk.
            </span>
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-3 text-lg font-medium text-white group"
          >
            hello@kinetic.studio
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-6 text-sm min-w-[240px]">
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Office
            </h4>
            <div className="flex items-start gap-3 text-zinc-300">
              <MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" />
              <span>
                123 Creative Lane
                <br />
                San Francisco, CA 94102
              </span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <Globe className="w-4 h-4 text-orange-400 shrink-0" />
              <span>kinetic.studio</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Follow us
            </h4>
            <div className="flex gap-2">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col @sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Kinetic Studio. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   VARIANT 4 — SaaS Mega Footer
   ════════════════════════════════════════════════ */

const megaLinks = {
  Platform: ["Dashboard", "API", "Integrations", "Pricing", "Changelog"],
  Developers: ["Documentation", "SDKs", "CLI", "Webhooks", "Status"],
  Company: ["About", "Blog", "Careers", "Press Kit"],
  Support: ["Help Center", "Community", "Contact", "Security"],
};

function SaaSFooterContent() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 @sm:px-8 py-10 @sm:py-16 flex flex-col gap-10 @sm:gap-14">
      <div className="pt-28 flex flex-col @lg:flex-row justify-between items-start gap-12">
        <div className="space-y-6 min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Kinetic
            </span>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-xs">
            The developer-first UI platform powering the next generation of web
            applications.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-300">
              All systems operational
            </span>
          </div>

          <div className="flex gap-8 pt-2">
            {[
              { value: "50k+", label: "Developers" },
              { value: "99.9%", label: "Uptime" },
              { value: "200+", label: "Components" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-lg font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 @sm:grid-cols-4 gap-x-10 gap-y-8">
          {Object.entries(megaLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-1">
                {category}
              </h4>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col @sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400 flex items-center gap-1.5">
          © {new Date().getFullYear()} Kinetic Inc. Built with
          <Heart className="w-3 h-3 text-fuchsia-500 fill-fuchsia-500" />
          for developers.
        </p>
        <div className="flex items-center gap-1">
          {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
