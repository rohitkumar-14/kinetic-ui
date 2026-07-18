"use client";

import React from "react";
import { TeamSection, TeamMember } from "@/components/creative/team-section";

const MOCK_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Lead Interactive Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    bio: "Obsessed with GLSL shaders and micro-interactions. Builds the core canvas physics engines.",
    socials: {
      twitter: "#",
      github: "#",
      linkedin: "#"
    }
  },
  {
    id: "2",
    name: "Sarah Connor",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    bio: "Former design lead at multiple award-winning agencies. Focuses on typographic harmony.",
    socials: {
      twitter: "#",
      website: "#"
    }
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "UX Architect",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    bio: "Maps out the optimal user journeys and ensures every component passes accessibility guidelines.",
    socials: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    id: "4",
    name: "Marcus Johnson",
    role: "Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    bio: "React performance specialist. Optimizes React hooks and minimizes bundle sizes.",
    socials: {
      twitter: "#",
      github: "#",
      website: "#"
    }
  }
];

export interface TeamSectionDemoProps {
  variant?: "default" | "cards" | "minimal";
}

export function TeamSectionDemo({ variant }: TeamSectionDemoProps) {
  return (
    <div className="w-full bg-zinc-950/20 border border-white/5 rounded-3xl overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      <TeamSection 
        members={MOCK_TEAM} 
        variant={variant}
        className="relative z-10"
      />
    </div>
  );
}
