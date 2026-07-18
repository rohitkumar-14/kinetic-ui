import React from 'react';
import { AudioReactiveVisualizer } from '@/components/creative/audio-reactive-visualizer';

export function AudioReactiveVisualizerDemo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-xl border border-white/10 overflow-hidden">
      <AudioReactiveVisualizer audioSrc="https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3" />
    </div>
  );
}
