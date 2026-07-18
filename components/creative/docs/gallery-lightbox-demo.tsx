'use client';

import React from 'react';
import { GalleryLightbox } from '@/components/creative/gallery-lightbox';

export function GalleryLightboxDemo({ aspectRatio = "video" }: any) {
  const images = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1682687982501-1e58f813fe88?q=80&w=3270&auto=format&fit=crop",
      alt: "Desert landscape",
      caption: "Sahara Desert, Morocco"
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1682695796254-16c200711c5d?q=80&w=3270&auto=format&fit=crop",
      alt: "Mountain peaks",
      caption: "Dolomites, Italy"
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=3270&auto=format&fit=crop",
      alt: "Canyon valley",
      caption: "Grand Canyon, USA"
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=3270&auto=format&fit=crop",
      alt: "Ocean waves",
      caption: "Nusa Penida, Indonesia"
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=3270&auto=format&fit=crop",
      alt: "Forest road",
      caption: "Black Forest, Germany"
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=3270&auto=format&fit=crop",
      alt: "Icebergs",
      caption: "Ilulissat, Greenland"
    }
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-4 md:p-8 min-h-[500px]">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Travel Photography</h3>
        <p className="text-zinc-400 font-medium">Click any image to expand the lightbox gallery.</p>
      </div>

      <GalleryLightbox 
        images={images} 
        aspectRatio={aspectRatio}
      />
    </div>
  );
}
