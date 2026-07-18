"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryActionUrl?: string;
  primaryActionText?: string;
  secondaryActionUrl?: string;
  secondaryActionText?: string;
}

export function CtaSection({
  title = "Ready to transform your workflow?",
  description = "Join thousands of developers building faster and more beautiful applications with our premium UI kit.",
  primaryActionUrl = "#",
  primaryActionText = "Get Started Now",
  secondaryActionUrl = "#",
  secondaryActionText = "View Documentation"
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 w-full">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>v2.0 is now live</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          {title}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-8 text-zinc-400"
        >
          {description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Button 
            asChild
            size="lg" 
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white border-0 font-semibold shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
          >
            <a href={primaryActionUrl}>
              {primaryActionText} <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto h-12 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold backdrop-blur-md transition-all"
          >
            <a href={secondaryActionUrl}>
              {secondaryActionText}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
