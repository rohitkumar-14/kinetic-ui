'use client';

import React from 'react';
import { FloatingActionButton } from '@/components/creative/floating-action-button';
import { Mail, MessageCircle, FileText, Share2 } from 'lucide-react';

export function FloatingActionButtonDemo({ position = "bottom-right" }: any) {
  const actions = [
    {
      id: "1",
      icon: <Mail className="w-5 h-5" />,
      label: "Send Email",
      onClick: () => console.log("Email")
    },
    {
      id: "2",
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Start Chat",
      onClick: () => console.log("Chat")
    },
    {
      id: "3",
      icon: <FileText className="w-5 h-5" />,
      label: "Create Document",
      onClick: () => console.log("Document")
    }
  ];

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex items-center justify-center">
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Speed Dial</h3>
        <p className="text-zinc-400 mb-8 max-w-sm">
          Click the floating button in the bottom corner to reveal quick actions.
        </p>
      </div>

      {/* 
        Note: In a real app, this would be fixed to the viewport.
        For the demo, we use absolute positioning within the container. 
      */}
      <FloatingActionButton 
        actions={actions} 
        position={position}
        className="absolute" // Overrides fixed positioning for demo purposes
      />
    </div>
  );
}
