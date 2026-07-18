'use client';

import React from 'react';
import { TestimonialCarousel } from '@/components/creative/testimonial-carousel';

export function TestimonialCarouselDemo({ autoPlay = true, interval = 5000 }: any) {
  const testimonials = [
    {
      id: 1,
      author: "Sarah Connor",
      role: "Creative Director",
      company: "Linear Systems",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      text: "Kinetic UI helped us deliver an Awwwards-winning site in half the time. The spring damping is so polished.",
      rating: 5
    },
    {
      id: 2,
      author: "Alex Rivera",
      role: "Lead Interactive Developer",
      company: "VibeData",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      text: "The custom GLSL shaders and R3F canvas integrations compile to almost nothing. Our page speed stayed at 99.",
      rating: 5
    },
    {
      id: 3,
      author: "Emily Chen",
      role: "Co-Founder",
      company: "Framer Agency",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      text: "A complete cheat code for startups. We copy-paste premium components directly and customize them in Tailwind.",
      rating: 5
    }
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-4 md:p-8 min-h-[500px] flex items-center justify-center">
      <TestimonialCarousel 
        testimonials={testimonials} 
        autoPlay={autoPlay} 
        interval={interval}
      />
    </div>
  );
}
