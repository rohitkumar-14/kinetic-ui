"use client";

import { RefractionCursor } from "@/components/creative/refraction-cursor";

export interface RefractionCursorDemoProps {
  magnification?: number;
  lensSize?: number;
}

export function RefractionCursorDemo({
  magnification = 1.5,
  lensSize = 200
}: RefractionCursorDemoProps) {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10">
      <RefractionCursor 
        key={`${magnification}-${lensSize}`}
        imageUrl="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
        magnification={magnification}
        lensSize={lensSize}
        className="w-full h-full"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
            Explore the <br /> Details
          </h2>
          <p className="mt-6 text-lg text-white/80 font-medium max-w-md drop-shadow-lg">
            Hover over this section to magnify and distort the background image with a stunning glassmorphism lens.
          </p>
        </div>
      </RefractionCursor>
    </div>
  );
}
