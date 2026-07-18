import React from 'react';
import { TextMaskVideoReveal } from '@/components/creative/text-mask-video-reveal';

export function TextMaskVideoRevealDemo() {
  return (
    <div className="w-full h-[600px] overflow-y-auto bg-black rounded-xl border border-white/10 relative">
      <div className="h-[150vh]">
        <TextMaskVideoReveal text="AWWWARDS" videoSrc="https://cdn.dribbble.com/uploads/47178/original/6c6dc579f1ed788f4c281ad124cbf23f.mp4" />
      </div>
    </div>
  );
}
