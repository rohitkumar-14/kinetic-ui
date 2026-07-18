'use client';

import React from 'react';
import { RadialMenu } from '@/components/creative/radial-menu';
import { Camera, Heart, MessageCircle, Share2, Settings, User } from 'lucide-react';

export function RadialMenuDemo({ radius = 100, startAngle = -90, endAngle = 90 }: any) {
  const menuItems = [
    { id: '1', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: '2', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: '3', label: 'Messages', icon: <MessageCircle className="w-5 h-5" /> },
    { id: '4', label: 'Likes', icon: <Heart className="w-5 h-5" /> },
    { id: '5', label: 'Camera', icon: <Camera className="w-5 h-5" /> },
    { id: '6', label: 'Share', icon: <Share2 className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex items-center justify-center">
      <RadialMenu 
        items={menuItems} 
        radius={radius}
        startAngle={startAngle}
        endAngle={endAngle}
      />
    </div>
  );
}
