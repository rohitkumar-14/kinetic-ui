"use client";

import React, { useRef } from "react";
import { SmoothScroll } from "@/components/creative/smooth-scroll";
import { SmartNavbar } from "@/components/creative/smart-navbar";
import { InteractiveParticleSwarm } from "@/components/creative/interactive-particle-swarm";
import { HoverImageTrails } from "@/components/creative/hover-image-trails";
import { SplitScreenLayout } from "@/components/creative/split-screen-layout";
import { MagneticDepthGallery } from "@/components/creative/magnetic-depth-gallery";
import { MagneticButton } from "@/components/creative/magnetic-button";
import { FilmGrain } from "@/components/creative/film-grain";
import { ArrowRight } from "lucide-react";
import { GooeyFooter } from "@/components/creative/gooey-footer";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?q=80&w=2759&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
];

export default function AgencyTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-zinc-950 text-white min-h-screen" ref={containerRef}>
      <FilmGrain />
      <SmoothScroll containerRef={containerRef}>
        
        {/* Navigation */}
        <SmartNavbar>
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-bold tracking-tight">KINETIC</span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#work" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Work</a>
              <a href="#studio" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Studio</a>
              <a href="#capabilities" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Capabilities</a>
              <a href="#contact" className="text-sm font-medium hover:text-white text-zinc-400 transition-colors">Contact</a>
            </div>
          </div>
        </SmartNavbar>

        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <InteractiveParticleSwarm particleCount={1000} />
          </div>
          
          <div className="relative z-10 text-center pointer-events-none">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mix-blend-difference text-white">
              Digital<br/>Architecture
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mix-blend-difference">
              We engineer immersive web experiences that redefine how humans interact with technology.
            </p>
          </div>
        </section>

        {/* Dynamic Image Trails Section */}
        <section id="capabilities" className="py-32 w-full border-t border-white/5 relative overflow-hidden bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 uppercase tracking-tight">Capabilities</h2>
          </div>
          <div className="h-[60vh] w-full relative">
            <HoverImageTrails 
              images={PROJECT_IMAGES}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h3 className="text-5xl md:text-7xl font-bold text-white/20 hover:text-white transition-colors duration-500 uppercase tracking-tighter cursor-crosshair">
                Wave your mouse here
              </h3>
            </HoverImageTrails>
          </div>
        </section>

        {/* Split Screen Studio Section */}
        <section id="studio">
          <SplitScreenLayout
            leftContent={
              <div className="p-8 md:p-20 flex flex-col justify-center h-full">
                <span className="text-indigo-500 font-mono text-sm tracking-widest uppercase mb-4">The Studio</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                  Where code meets physics.
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12">
                  Our studio sits at the intersection of design, engineering, and mathematics. We don't just build websites; we build digital environments governed by their own physical laws. 
                </p>
                <MagneticButton className="self-start px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  Meet the Team <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </div>
            }
            rightContent={
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" 
                alt="Studio"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            }
            stickySide="right"
          />
        </section>

        {/* Magnetic WebGL Gallery */}
        <section id="work" className="py-32 bg-zinc-900 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-end">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Selected<br/>Works</h2>
            <p className="text-zinc-400 max-w-sm hidden md:block">
              Explore our most recent spatial computing and God-tier scrollytelling projects.
            </p>
          </div>
          
          <div className="h-[80vh] w-full px-6">
            <MagneticDepthGallery 
              images={[
                { id: "1", url: PROJECT_IMAGES[0], alt: "Lumina Project" },
                { id: "2", url: PROJECT_IMAGES[1], alt: "Aether Project" },
                { id: "3", url: PROJECT_IMAGES[2], alt: "Void Project" },
                { id: "4", url: PROJECT_IMAGES[3], alt: "Quantum Project" },
              ]}
              className="h-full w-full rounded-3xl overflow-hidden"
            />
          </div>
        </section>

        {/* CTA & Footer */}
        <section id="contact" className="relative pt-32 pb-0 flex flex-col items-center bg-black">
          <div className="text-center z-10 px-6">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">Ready to start?</h2>
            <MagneticButton className="px-10 py-5 bg-indigo-500 text-white rounded-full font-bold text-lg hover:bg-indigo-600 transition-colors shadow-2xl shadow-indigo-500/20">
              Initiate Project
            </MagneticButton>
          </div>
          
          <div className="w-full mt-24">
            <GooeyFooter color="#4f46e5" />
          </div>
        </section>
        
      </SmoothScroll>
    </div>
  );
}
