'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Mic, MicOff } from 'lucide-react';

export interface AiVoiceVisualizerProps {
  className?: string;
  barColor?: string;
}

export function AiVoiceVisualizer({
  className,
  barColor = '#818cf8',
}: AiVoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const numBars = 32;

    const render = () => {
      t += 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / numBars) - 3;
      const centerY = canvas.height / 2;

      for (let i = 0; i < numBars; i++) {
        const height = isActive
          ? Math.sin(t + i * 0.3) * 25 + Math.cos(t * 0.7 + i * 0.2) * 15 + 15
          : 4;

        const x = i * (barWidth + 3);
        const y = centerY - height / 2;

        ctx.save();
        ctx.fillStyle = barColor;
        ctx.shadowColor = barColor;
        ctx.shadowBlur = isActive ? 8 : 0;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 4);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isActive, barColor]);

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-3xl border border-zinc-800 space-y-4 max-w-md mx-auto', className)}>
      <canvas ref={canvasRef} width={300} height={100} className="w-full h-24" />
      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          'p-4 rounded-full border transition-all shadow-xl',
          isActive ? 'bg-indigo-600 border-indigo-500 text-white shadow-indigo-500/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
        )}
      >
        {isActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>
    </div>
  );
}
