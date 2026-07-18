import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AnimatedBackground({ children, className, ...props }: AnimatedBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-background", className)} {...props}>
      {/* Decorative colored blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-indigo-500/30 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] h-[40%] w-[40%] rounded-full bg-purple-500/30 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[20%] h-[60%] w-[60%] rounded-full bg-pink-500/30 blur-[120px]" />
      
      {/* Soft gradient overlay to smooth out the noise */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
