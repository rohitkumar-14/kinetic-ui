"use client";

import React, { useRef } from "react";
import { SmartNavbar } from "@/components/creative/smart-navbar";
import { FluidDistortionGallery } from "@/components/creative/fluid-distortion-gallery";
import { HorizontalScrollHijack } from "@/components/creative/horizontal-scroll-hijack";
import { ScrollVideoScrub } from "@/components/creative/scroll-video-scrub";
import { TextMaskVideoReveal } from "@/components/creative/text-mask-video-reveal";
import { GooeyFooter } from "@/components/creative/gooey-footer";
import { SmoothScroll } from "@/components/creative/smooth-scroll";

const DRIP_IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
];

const LOOKBOOK_IMAGES = [
  { url: "https://images.unsplash.com/photo-1550614000-4b95d466f2fb?q=80&w=1000&auto=format&fit=crop", title: "Autumn Edit", id: "1" },
  { url: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop", title: "Winter Layers", id: "2" },
  { url: "https://images.unsplash.com/photo-1485230895905-ef0816b8b1a8?q=80&w=1000&auto=format&fit=crop", title: "Street Style", id: "3" },
  { url: "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1000&auto=format&fit=crop", title: "Minimalist", id: "4" },
  { url: "https://images.unsplash.com/photo-1434389678369-e840cb19ce73?q=80&w=1000&auto=format&fit=crop", title: "Accessories", id: "5" },
];

export default function DripTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black" ref={containerRef}>
      <SmoothScroll containerRef={containerRef}>
        
        {/* Navigation */}
        <SmartNavbar>
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-black tracking-tighter uppercase">DRIP</span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#collection" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Collection</a>
              <a href="#lookbook" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Lookbook</a>
              <a href="#materials" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Materials</a>
              <a href="#cart" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Cart (0)</a>
            </div>
          </div>
        </SmartNavbar>

        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <TextMaskVideoReveal 
            text="FW 26"
            videoSrc="https://player.vimeo.com/external/434045526.hd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=175&oauth2_token_id=57447761"
          />
          <div className="absolute bottom-10 left-10 flex flex-col">
            <span className="text-xs uppercase tracking-widest font-mono text-zinc-400">Scroll to explore</span>
            <span className="text-xl font-bold mt-2">The New Standard</span>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-32 px-4 md:px-10 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Latest<br/>Arrivals
            </h2>
            <p className="max-w-md text-zinc-400 text-lg">
              Redefining contemporary streetwear with premium materials and aggressive silhouettes. Engineered for the modern landscape.
            </p>
          </div>
          
          <FluidDistortionGallery 
            images={DRIP_IMAGES} 
            className="h-[60vh] md:h-[80vh] w-full"
          />
        </section>

        {/* Horizontal Lookbook */}
        <section className="py-20 w-full overflow-hidden bg-zinc-950">
          <div className="px-4 md:px-10 mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">Lookbook</h2>
          </div>
          
          <HorizontalScrollHijack className="h-screen w-full">
            <div className="flex h-full items-center gap-8 px-10">
              {LOOKBOOK_IMAGES.map((img, i) => (
                <div key={img.id} className="relative h-[70vh] w-[80vw] md:w-[40vw] shrink-0 overflow-hidden rounded-xl group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">0{i + 1}</span>
                    <h3 className="text-3xl font-bold mt-2">{img.title}</h3>
                  </div>
                </div>
              ))}
              <div className="w-[10vw] shrink-0" /> {/* End padding */}
            </div>
          </HorizontalScrollHijack>
        </section>

        {/* Material Deep-Dive */}
        <section className="h-[200vh] relative">
          <ScrollVideoScrub 
            videoUrl="https://player.vimeo.com/external/494252666.hd.mp4?s=2f0b064c5bebc59300301a5f97f7422f483a9a3b&profile_id=175&oauth2_token_id=57447761"
            className="sticky top-0 h-screen w-full"
          />
          <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center px-4 md:px-20">
            <div className="sticky top-1/2 -translate-y-1/2 max-w-2xl bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-white drop-shadow-lg">
                Engineered Fabrics
              </h2>
              <p className="text-xl text-white/90 drop-shadow-md">
                Every piece is constructed using proprietary blends designed for maximum durability and uncompromised aesthetic movement. Scroll to inspect the details.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <GooeyFooter />
        
      </SmoothScroll>
    </div>
  );
}
