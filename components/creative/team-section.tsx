'use client';

import React from 'react';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface TeamSectionProps {
  members: TeamMember[];
  title?: string;
  description?: string;
  variant?: 'default' | 'cards' | 'minimal';
  className?: string;
}

const SocialLinks = ({ socials }: { socials: TeamMember['socials'] }) => {
  if (!socials) return null;
  
  return (
    <div className="flex items-center gap-3">
      {socials.twitter && (
        <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
          <Twitter className="w-4 h-4" />
        </a>
      )}
      {socials.linkedin && (
        <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
      )}
      {socials.github && (
        <a href={socials.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
          <Github className="w-4 h-4" />
        </a>
      )}
      {socials.website && (
        <a href={socials.website} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
          <Globe className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

export function TeamSection({
  members,
  title = "Meet Our Team",
  description = "The brilliant minds behind our success.",
  variant = 'default',
  className
}: TeamSectionProps) {
  
  if (variant === 'cards') {
    return (
      <section className={cn("w-full py-12 md:py-24", className)}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
            <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed">{description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/50 p-6 flex flex-col items-center text-center hover:border-indigo-500/30 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden ring-4 ring-white/5 group-hover:ring-indigo-500/20 transition-all duration-300">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-indigo-400 mb-3">{member.role}</p>
                {member.bio && <p className="text-xs text-zinc-400 mb-6 leading-relaxed line-clamp-3">{member.bio}</p>}
                
                <div className="mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
                  <SocialLinks socials={member.socials} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'minimal') {
    return (
      <section className={cn("w-full py-12 md:py-24", className)}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{title}</h2>
            <p className="text-zinc-400 md:text-xl/relaxed max-w-2xl">{description}</p>
          </div>
          <div className="flex flex-col gap-6">
            {members.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{member.name}</h3>
                    <p className="text-sm text-zinc-400">{member.role}</p>
                  </div>
                </div>
                <div className="sm:ml-auto">
                  <SocialLinks socials={member.socials} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default Grid
  return (
    <section className={cn("w-full py-12 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
          <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed">{description}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {members.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden bg-zinc-900">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sm font-medium text-indigo-400 mb-4">{member.role}</p>
              <SocialLinks socials={member.socials} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
