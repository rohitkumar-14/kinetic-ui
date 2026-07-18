'use client';

import React, { useState } from 'react';
import { DragReorder } from '@/components/creative/drag-reorder';
import { GripVertical, Music, FileText, Image, Video } from 'lucide-react';
import { useDragControls } from 'framer-motion';

const INITIAL_ITEMS = [
  { id: '1', title: 'Q3 Financial Report.pdf', icon: <FileText className="w-5 h-5 text-blue-400" />, size: '2.4 MB' },
  { id: '2', title: 'Brand Assets 2024.zip', icon: <Image className="w-5 h-5 text-pink-400" />, size: '145 MB' },
  { id: '3', title: 'Product Demo Reel.mp4', icon: <Video className="w-5 h-5 text-purple-400" />, size: '890 MB' },
  { id: '4', title: 'Ambient Background.wav', icon: <Music className="w-5 h-5 text-emerald-400" />, size: '45 MB' },
];

export function DragReorderDemo({ axis = "y" }: any) {
  const [items, setItems] = useState(INITIAL_ITEMS);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">Project Files</h3>
          <p className="text-sm text-zinc-400">Drag the handle to reorder items</p>
        </div>

        <DragReorder
          items={items}
          onReorder={setItems}
          keyExtractor={(item) => item.id}
          axis={axis}
          renderItem={(item, index, dragControls) => (
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-zinc-900 group shadow-sm">
              <div 
                className="cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white transition-colors touch-none"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <p className="text-xs text-zinc-500">{item.size}</p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
