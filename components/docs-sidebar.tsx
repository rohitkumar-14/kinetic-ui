'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  ChevronDown, 
  Terminal, 
  BookOpen, 
  Compass, 
  Cpu, 
  Layers, 
  GitBranch,
  LayoutGrid,
  MousePointer2,
  Layout
} from 'lucide-react';
export type SidebarItem = { title: string; href: string; icon: React.ReactNode; soon?: boolean };
export type SidebarSection = { title: string; items: SidebarItem[] };
export type SidebarGroup = { label: string; sections: SidebarSection[] };

export const sidebarContent: SidebarGroup[] = [
    {
      label: "Getting Started",
      sections: [
        {
          title: "Overview",
          items: [
            { title: "Introduction", href: "/docs", icon: <BookOpen className="w-3.5 h-3.5" /> },
            { title: "Installation", href: "/docs/installation", icon: <Terminal className="w-3.5 h-3.5" /> },
          ]
        }
      ]
    },
    {
      label: "Blocks & Templates",
      sections: [
        {
          title: "Marketing Sections",
          items: [
            { title: "Pricing Section", href: "/docs/components/pricing-section", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Feature Section", href: "/docs/components/feature-section", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Testimonials", href: "/docs/components/testimonials", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Team Section", href: "/docs/components/team-section", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "CTA Section", href: "/docs/components/cta-section", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "FAQ Section", href: "/docs/components/faq-section", icon: <LayoutGrid className="w-3.5 h-3.5" /> }
          ]
        }
      ]
    },
    {
      label: "Components",
      sections: [
        {
          title: "Hero Components",
          items: [
            { title: "Hero Particles", href: "/docs/components/hero-particles", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Hero 3D", href: "/docs/components/hero-3d", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Gravity Grid Hero", href: "/docs/components/gravity-grid-hero", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Text Mask Hero", href: "/docs/components/text-mask-hero", icon: <Sparkles className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Navigation",
          items: [
            { title: "Accordion", href: "/docs/components/accordion", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Breadcrumb", href: "/docs/components/breadcrumb", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Dropdown Menu", href: "/docs/components/dropdown-menu", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Pagination", href: "/docs/components/pagination", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Tabs", href: "/docs/components/tabs", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Floating Navbar", href: "/docs/components/floating-navbar", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Fullscreen Menu", href: "/docs/components/fullscreen-menu", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Expandable Sidebar", href: "/docs/components/expandable-sidebar", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Elastic Sidebar", href: "/docs/components/elastic-sidebar", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Dock", href: "/docs/components/dock", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Physics Dock", href: "/docs/components/physics-dock", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Cyber Terminal", href: "/docs/components/cyber-terminal", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Dynamic Island", href: "/docs/components/dynamic-island", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Glass Morphing Tabs", href: "/docs/components/glass-tabs", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Smart Navbar", href: "/docs/components/smart-navbar", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Radial Menu", href: "/docs/components/radial-menu", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Scroll Spy", href: "/docs/components/scroll-spy", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Mega Menu", href: "/docs/components/mega-menu", icon: <Compass className="w-3.5 h-3.5" /> },
            { title: "Back To Top", href: "/docs/components/back-to-top", icon: <Compass className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Buttons",
          items: [
            { title: "Button", href: "/docs/components/button", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Magnetic Button", href: "/docs/components/magnetic-button", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Liquid Button", href: "/docs/components/liquid-button", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Glow Button", href: "/docs/components/glow-button", icon: <Layers className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Cards",
          items: [
            { title: "Card", href: "/docs/components/card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Tilt Card", href: "/docs/components/tilt-card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Spotlight Card", href: "/docs/components/spotlight-card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Bento Grid", href: "/docs/components/bento-grid", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Card Stack", href: "/docs/components/card-stack", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Swipeable Stack Deck", href: "/docs/components/swipeable-stack", icon: <LayoutGrid className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Text Effects",
          items: [
            { title: "Glyph Matrix", href: "/docs/components/glyph-matrix", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Text Reveal", href: "/docs/components/text-reveal", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Kinetic Loader", href: "/docs/components/kinetic-loader", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Blur Text", href: "/docs/components/blur-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Shiny Text", href: "/docs/components/shiny-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Motion Primitives", href: "/docs/components/motion-primitives", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Text Scramble", href: "/docs/components/text-scramble", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Kinetic Typography", href: "/docs/components/kinetic-typography", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Text Split Reveal", href: "/docs/components/text-split-reveal", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Circular Text", href: "/docs/components/circular-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Particle Text", href: "/docs/components/particle-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Odometer", href: "/docs/components/odometer", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Flip Board", href: "/docs/components/flip-board", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Breathing Text", href: "/docs/components/breathing-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "SVG Liquid Distortion", href: "/docs/components/svg-liquid-distortion", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "ASCII Renderer", href: "/docs/components/ascii-renderer", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Animated Counter", href: "/docs/components/animated-counter", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Typewriter", href: "/docs/components/typewriter", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Animated Gradient Text", href: "/docs/components/animated-gradient-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Staggered Text", href: "/docs/components/staggered-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Beat Synced Typography", href: "/docs/components/beat-synced-typography", icon: <Cpu className="w-3.5 h-3.5" /> }
          ]
        },

        {
          title: "Mouse Interactions",
          items: [
            { title: "Cursor Follower", href: "/docs/components/cursor-follower", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Spotlight Cursor", href: "/docs/components/spotlight-cursor", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
            { title: "Hover Image Trails", href: "/docs/components/hover-image-trails", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Liquid Image Distortion", href: "/docs/components/liquid-distortion", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Scratch to Reveal", href: "/docs/components/scratch-to-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Refraction Cursor", href: "/docs/components/refraction-cursor", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Video Portal", href: "/docs/components/video-portal", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Gooey Menu", href: "/docs/components/gooey-menu", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Directional Hover", href: "/docs/components/directional-hover", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Flashlight Reveal", href: "/docs/components/flashlight-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Magnifying Glass", href: "/docs/components/magnifying-glass", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Cursor Trail", href: "/docs/components/cursor-trail", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Context Cursor", href: "/docs/components/context-cursor", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Hover Image Preview", href: "/docs/components/hover-image-preview", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Drag to Reorder", href: "/docs/components/drag-reorder", icon: <Sparkles className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "3D Components",
          items: [
            { title: "Interactive 3D Model", href: "/docs/components/interactive-3d-model", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Liquid Fluid Shader", href: "/docs/components/liquid-fluid-shader", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Particle System", href: "/docs/components/particle-system", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Floating 3D Card", href: "/docs/components/floating-3d-card", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Shader Image Reveal", href: "/docs/components/shader-image", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Globe", href: "/docs/components/globe", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Pixel Transition", href: "/docs/components/pixel-transition", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "3D Audio Visualizer", href: "/docs/components/audio-visualizer-3d", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "WebGL Gallery", href: "/docs/components/webgl-gallery", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Interactive 3D Customizer", href: "/docs/components/product-customizer", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Fluid Distortion Gallery", href: "/docs/components/fluid-distortion-gallery", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Interactive Particle Swarm", href: "/docs/components/particle-swarm", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Audio Reactive Visualizer", href: "/docs/components/audio-visualizer-gl", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Product Configurator", href: "/docs/components/product-configurator", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Raymarching Clouds", href: "/docs/components/raymarching-clouds", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Webcam Shader Portal", href: "/docs/components/webcam-shader-portal", icon: <Layers className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Background Effects",
          items: [
            { title: "Mesh Gradient", href: "/docs/components/mesh-gradient", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Aurora Background", href: "/docs/components/aurora-background", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Fluid Background", href: "/docs/components/fluid-background", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Interactive Fluid Background", href: "/docs/components/interactive-fluid", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Boids Simulation", href: "/docs/components/boids-canvas", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Fluid Canvas", href: "/docs/components/fluid-canvas", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Noise Overlay", href: "/docs/components/noise-overlay", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Film Grain Overlay", href: "/docs/components/film-grain", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Animated Blob Background", href: "/docs/components/blob-background", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Grid Pattern", href: "/docs/components/grid-pattern", icon: <Sparkles className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Marquee Components",
          items: [
            { title: "Infinite Marquee", href: "/docs/components/infinite-marquee", icon: <GitBranch className="w-3.5 h-3.5" /> },
            { title: "Logo Marquee", href: "/docs/components/logo-marquee", icon: <GitBranch className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Scrollytelling",
          items: [
            { title: "Sticky Sequence Container", href: "/docs/components/sticky-sequence", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Scroll Driven Path", href: "/docs/components/scroll-driven-path", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Scroll Velocity Text", href: "/docs/components/scroll-velocity-text", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Sticky Image Mask", href: "/docs/components/sticky-image-mask", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Horizontal Scroll Pin", href: "/docs/components/horizontal-scroll-pin", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Parallax Depth Cards", href: "/docs/components/parallax-depth-cards", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Scroll Video Scrub", href: "/docs/components/scroll-video-scrub", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Tunnel Scroll", href: "/docs/components/tunnel-scroll", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Horizontal Scroll Hijack", href: "/docs/components/horizontal-scroll-hijack", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Sticky Stacking Cards", href: "/docs/components/sticky-stacking-cards", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Text Mask Video Reveal", href: "/docs/components/text-mask-video-reveal", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Smooth Scroll", href: "/docs/components/smooth-scroll", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Scroll Linked Split", href: "/docs/components/scroll-linked-split", icon: <Layers className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "AI & Generative",
          items: [
            { title: "Generative UI Chat", href: "/docs/components/generative-ui-chat", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "AI Command Palette", href: "/docs/components/ai-command-palette", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "AI Stream Wrapper", href: "/docs/components/ai-stream-wrapper", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Spatial UI", href: "/docs/components/spatial-ui", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Animated Prompt Input", href: "/docs/components/animated-prompt-input", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Streaming Markdown Renderer", href: "/docs/components/streaming-markdown-renderer", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Thinking Visualizer", href: "/docs/components/thinking-visualizer", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Microphone Reactive Orb", href: "/docs/components/microphone-reactive-orb", icon: <Cpu className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Physics & Micro-Interactions",
          items: [
            { title: "Magnetic Cursor Ecosystem", href: "/docs/components/magnetic-cursor", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Destructible UI", href: "/docs/components/destructible-ui", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Physics Canvas", href: "/docs/components/physics-canvas", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Force Graph", href: "/docs/components/force-graph", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Falling Elements", href: "/docs/components/falling-elements", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Multiplayer Cursor Ecosystem", href: "/docs/components/multiplayer-cursor-ecosystem", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Infinite Zoom Canvas", href: "/docs/components/infinite-zoom-canvas", icon: <Cpu className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Page Transitions",
          items: [
            { title: "Morph Transition", href: "/docs/components/morph-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Cinematic Preloader", href: "/docs/components/cinematic-preloader", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Liquid Sweep", href: "/docs/components/liquid-sweep-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Shutter Transition", href: "/docs/components/shutter-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Glitch Transition", href: "/docs/components/glitch-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Scroll Reveal", href: "/docs/components/scroll-reveal", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Clip Path Transition", href: "/docs/components/clip-path-transition", icon: <Cpu className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Marquees",
          items: [
            { title: "Velocity Marquee", href: "/docs/components/velocity-marquee", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "3D Cylinder Marquee", href: "/docs/components/cylinder-marquee", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Mouse-Driven Marquee", href: "/docs/components/mouse-marquee", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Vertical Ticker Wall", href: "/docs/components/vertical-ticker", icon: <Sparkles className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Media Components",
          items: [
            { title: "Glass Video Player", href: "/docs/components/glass-video-player", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Video Reveal", href: "/docs/components/video-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Audio Visualizer Canvas", href: "/docs/components/audio-visualizer", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Magnetic Depth Gallery", href: "/docs/components/magnetic-depth-gallery", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Interactive 360° Viewer", href: "/docs/components/interactive-360-viewer", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Before/After Slider", href: "/docs/components/before-after-slider", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Gallery Lightbox", href: "/docs/components/gallery-lightbox", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Image Reveal", href: "/docs/components/image-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Draggable Carousel", href: "/docs/components/draggable-carousel", icon: <Sparkles className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Footers",
          items: [
            { title: "Terminal Footer", href: "/docs/components/terminal-footer", icon: <Layout className="w-3.5 h-3.5" /> },
            { title: "Gooey Footer", href: "/docs/components/gooey-footer", icon: <Layout className="w-3.5 h-3.5" /> },
            { title: "Giant Type Footer", href: "/docs/components/giant-type-footer", icon: <Layout className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Data Display & Social Proof",
          items: [
            { title: "Stats Section", href: "/docs/components/stats-section", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Testimonial Carousel", href: "/docs/components/testimonial-carousel", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Project Card", href: "/docs/components/project-card", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Client Logo Grid", href: "/docs/components/client-logo-grid", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Comparison Table", href: "/docs/components/comparison-table", icon: <Layers className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Utility & Trust",
          items: [
            { title: "Cookie Consent", href: "/docs/components/cookie-consent", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Floating Action Button", href: "/docs/components/floating-action-button", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Stepper", href: "/docs/components/stepper", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Notification Center", href: "/docs/components/notification-center", icon: <Layers className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Forms",
          items: [
            { title: "Input", href: "/docs/components/input", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Textarea", href: "/docs/components/textarea", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Select", href: "/docs/components/select", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Checkbox", href: "/docs/components/checkbox", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Switch", href: "/docs/components/switch", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Floating Form", href: "/docs/components/floating-form", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Date Picker", href: "/docs/components/date-picker", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Date Range Picker", href: "/docs/components/date-range-picker", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "File Upload", href: "/docs/components/file-upload", icon: <Terminal className="w-3.5 h-3.5" /> },
            { title: "Multi Select", href: "/docs/components/multi-select", icon: <Terminal className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Layout & Data",
          items: [
            { title: "Loader", href: "/docs/components/loader", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Alert", href: "/docs/components/alert", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Dialog", href: "/docs/components/dialog", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Empty State", href: "/docs/components/empty-state", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Filter", href: "/docs/components/filter", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Cart", href: "/docs/components/cart", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Sonner (Toast)", href: "/docs/components/sonner", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Timeline", href: "/docs/components/timeline", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Animated Circular Progress", href: "/docs/components/animated-circular-progress", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Badge", href: "/docs/components/badge", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Scroll Progress", href: "/docs/components/scroll-progress", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Horizontal Scroll", href: "/docs/components/horizontal-scroll", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Chart", href: "/docs/components/chart", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Force Graph", href: "/docs/components/force-graph", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Draggable Canvas", href: "/docs/components/draggable-canvas", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Physics Canvas", href: "/docs/components/physics-canvas", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Minimap", href: "/docs/components/minimap", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Cover Flow Carousel", href: "/docs/components/cover-flow-carousel", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Horizontal Image Accordion", href: "/docs/components/image-accordion", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Magnetic Gallery", href: "/docs/components/magnetic-gallery", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Desktop OS System", href: "/docs/components/desktop-window", icon: <Layers className="w-3.5 h-3.5" /> },
            { title: "Dynamic Morphing Chart", href: "/docs/components/morph-chart", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Split Screen Layout", href: "/docs/components/split-screen-layout", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Masonry Grid", href: "/docs/components/masonry-grid", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { title: "Broken Grid", href: "/docs/components/broken-grid", icon: <LayoutGrid className="w-3.5 h-3.5" /> }
          ]
        },
        {
          title: "Footers",
          items: [
            { title: "Parallax Footer", href: "/docs/components/parallax-footer", icon: <LayoutGrid className="w-3.5 h-3.5" /> }
          ]
        }
      ]
    },
    {
      label: "System",
      sections: [
        {
          title: "Architecture",
          items: [
            { title: "Server Components", href: "/docs/components/server-components", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Animations", href: "/docs/animations", icon: <Cpu className="w-3.5 h-3.5" /> },
            { title: "Three.js & Shaders", href: "/docs/three", icon: <Layers className="w-3.5 h-3.5" /> },
          ]
        },
        {
          title: "Releases",
          items: [
            { title: "Templates", href: "/docs/templates", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { title: "Changelog", href: "/docs/changelog", icon: <GitBranch className="w-3.5 h-3.5" /> },
          ]
        }
      ]
    }
  ];

export function DocsSidebar() {
  const pathname = usePathname();
  const [version, setVersion] = React.useState('v1.0.0');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-background text-foreground py-6 pr-6 lg:py-8 select-none transition-colors duration-300">
      
      {/* Version Switcher Popover */}
      <div className="relative mb-8 px-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-muted/50 border border-border text-xs font-semibold hover:border-border/80 transition-colors"
        >
          <span className="flex items-center gap-2 text-indigo-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{version}</span>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.25 rounded font-light uppercase">
              latest
            </span>
          </span>
          <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 z-20 mt-1.5 p-1 rounded-xl bg-popover border border-border shadow-2xl text-xs"
              >
                {['v1.0.0', 'v0.9.0 (beta)'].map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setVersion(v.split(' ')[0]);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg transition-colors font-medium text-muted-foreground hover:text-foreground"
                  >
                    {v}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar Sections */}
      <div className="flex-1 overflow-y-auto overscroll-contain space-y-8 sidebar-scrollbar">
        {sidebarContent.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            {group.label !== "Getting Started" && (
              <h3 className="px-3 text-sm font-black text-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                {group.label}
              </h3>
            )}
            
            {group.sections.map((sec, secIdx) => (
              <CollapsibleSection key={secIdx} sec={sec} pathname={pathname} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CollapsibleSection({ sec, pathname }: { sec: any, pathname: string }) {
  const hasActiveChild = sec.items.some((item: any) => item.href === pathname);
  const [isExpanded, setIsExpanded] = React.useState(hasActiveChild || sec.title === "Overview");

  // Auto-expand if a child becomes active during navigation
  React.useEffect(() => {
    if (hasActiveChild) {
      setIsExpanded(true);
    }
  }, [hasActiveChild]);

  return (
    <div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-1.5 mb-2 group text-left"
      >
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
          {sec.title}
        </span>
        <ChevronDown 
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 group-hover:text-foreground", 
            isExpanded ? "rotate-180" : "rotate-0"
          )} 
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5 pb-4">
              {sec.items.map((sub: any, subIdx: number) => {
                if (sub.soon) {
                  return (
                    <div
                      key={subIdx}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-muted-foreground/60 cursor-not-allowed select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-muted-foreground/40">{sub.icon}</span>
                        <span>{sub.title}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted border border-border px-1.5 py-0.5 rounded scale-90">
                        Soon
                      </span>
                    </div>
                  );
                }

                const isActive = pathname === sub.href;
                return (
                  <Link
                    key={subIdx}
                    href={sub.href}
                    className={cn(
                      "group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors duration-200",
                      isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActiveBackground"
                        className="absolute inset-0 bg-accent border border-border/50 rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className={cn("transition-colors", isActive ? "text-indigo-500" : "text-muted-foreground group-hover:text-foreground")}>
                      {sub.icon}
                    </span>
                    <span>{sub.title}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
