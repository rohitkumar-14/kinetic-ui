import React from 'react';
import { FluidDistortionGallery } from '@/components/creative/fluid-distortion-gallery';

export function FluidDistortionGalleryDemo() {
  const images = [
    "/landscape_day_1782932459465.png",
    "/landscape_night_1782932469534.png",
    "/cyberpunk_city_1782932482341.png",
    "/neon_forest_1782932492306.png"
  ];
  return (
    <div className="w-full h-[500px] bg-black rounded-xl border border-white/10 overflow-hidden">
      <FluidDistortionGallery images={images} className="w-full h-full" />
    </div>
  );
}
