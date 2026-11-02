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
  Layout,
  Image,
  FormInput,
  BarChart2,
  PackageSearch,
  Wand2,
  Lock,
  Search,
  Copy,
  LayoutDashboard,
  Table as TableIcon,
  CheckSquare,
  Calendar,
  Bell
} from 'lucide-react';

export type SidebarItem = { 
  title: string; 
  href: string; 
  icon: React.ReactNode; 
  soon?: boolean; 
  keywords?: string; 
  environment?: 'crm' | 'creative';
};
export type SidebarSection = { 
  title: string; 
  environment?: 'crm' | 'creative';
  items: SidebarItem[]; 
};
export type SidebarGroup = { 
  label: string; 
  environment?: 'crm' | 'creative' | 'all'; 
  sections: SidebarSection[]; 
};

export const sidebarContent: SidebarGroup[] = [
  {
    label: "Getting Started",
    environment: "all",
    sections: [
      {
        title: "Overview",
        items: [
          { title: "Introduction", href: "/docs", icon: <BookOpen className="w-3.5 h-3.5" /> },
          { title: "Installation", href: "/docs/installation", icon: <Terminal className="w-3.5 h-3.5" /> },
          { title: "Theme Studio", href: "/docs/theme", icon: <Wand2 className="w-3.5 h-3.5" /> },
          { title: "Explore All Components", href: "/docs/components", icon: <Search className="w-3.5 h-3.5" />, keywords: "search find filter library grid preview crm dashboard creative" },
        ]
      }
    ]
  },
  {
    label: "Dashboard & CRM UI",
    environment: "crm",
    sections: [
      {
        title: "CRM & Analytics",
        environment: "crm",
        items: [
          { title: "CRM Lead Table", href: "/docs/components/crm-table", icon: <TableIcon className="w-3.5 h-3.5" />, keywords: "crm table leads sales customers pipeline status deals enterprise saas" },
          { title: "Metric Cards", href: "/docs/components/metric-card", icon: <BarChart2 className="w-3.5 h-3.5" />, keywords: "metric card kpi revenue statistics sparkline trend analytics dashboard" },
          { title: "Data Table", href: "/docs/components/data-table", icon: <TableIcon className="w-3.5 h-3.5" />, keywords: "data table pagination sorting filter column rows saas" },
          { title: "Table", href: "/docs/components/table", icon: <TableIcon className="w-3.5 h-3.5" />, keywords: "table grid spreadsheet rows data list crm" },
          { title: "Comparison Table", href: "/docs/components/comparison-table", icon: <TableIcon className="w-3.5 h-3.5" />, keywords: "pricing comparison features plan tier" },
          { title: "Stats Section", href: "/docs/components/stats-section", icon: <BarChart2 className="w-3.5 h-3.5" />, keywords: "metrics stats numbers counters kpi dashboard" },
          { title: "Activity Matrix", href: "/docs/components/activity-heatmap", icon: <BarChart2 className="w-3.5 h-3.5" />, keywords: "activity heatmap contributions crm log events" },
          { title: "Chart", href: "/docs/components/chart", icon: <BarChart2 className="w-3.5 h-3.5" />, keywords: "data graph bar line visual statistics chart" },
          { title: "Dynamic Morphing Chart", href: "/docs/components/morph-chart", icon: <BarChart2 className="w-3.5 h-3.5" />, keywords: "charts morph graphs animated visualization" },
          { title: "WebGL Line Chart", href: "/docs/components/webgl-line-chart", icon: <BarChart2 className="w-3.5 h-3.5" />, keywords: "high performance chart webgl finance crypto" }
        ]
      },
      {
        title: "Buttons & Actions",
        environment: "crm",
        items: [
          { title: "Button", href: "/docs/components/button", icon: <Layers className="w-3.5 h-3.5" />, keywords: "click action press submit interact ui crm primary secondary" },
          { title: "Dropdown Menu", href: "/docs/components/dropdown-menu", icon: <Compass className="w-3.5 h-3.5" />, keywords: "dropdown action menu context options select crm" },
          { title: "Floating Action Button", href: "/docs/components/floating-action-button", icon: <Layers className="w-3.5 h-3.5" />, keywords: "fab speed dial quick actions create lead" },
          { title: "Shimmer Border Button", href: "/docs/components/shimmer-border-button", icon: <Layers className="w-3.5 h-3.5" />, keywords: "outline shine loading skeleton premium upgrade cta" },
          { title: "Morphing State Button", href: "/docs/components/morphing-state-button", icon: <Layers className="w-3.5 h-3.5" />, keywords: "save submit success error loading feedback state" }
        ]
      },
      {
        title: "Forms & Inputs",
        environment: "crm",
        items: [
          { title: "Select", href: "/docs/components/select", icon: <MousePointer2 className="w-3.5 h-3.5" />, keywords: "select dropdown options picker form choice" },
          { title: "Multi Select", href: "/docs/components/multi-select", icon: <FormInput className="w-3.5 h-3.5" />, keywords: "multiselect tags pills multiple choice filter assignees" },
          { title: "Input", href: "/docs/components/input", icon: <Terminal className="w-3.5 h-3.5" />, keywords: "text input field search form email crm" },
          { title: "Textarea", href: "/docs/components/textarea", icon: <Terminal className="w-3.5 h-3.5" />, keywords: "notes description multiline form feedback message" },
          { title: "Checkbox", href: "/docs/components/checkbox", icon: <CheckSquare className="w-3.5 h-3.5" />, keywords: "checkbox toggle select multi row select" },
          { title: "Switch", href: "/docs/components/switch", icon: <MousePointer2 className="w-3.5 h-3.5" />, keywords: "switch toggle boolean settings on off" },
          { title: "Date Picker", href: "/docs/components/date-picker", icon: <Calendar className="w-3.5 h-3.5" />, keywords: "calendar schedule date due deadline" },
          { title: "Date Range Picker", href: "/docs/components/date-range-picker", icon: <Calendar className="w-3.5 h-3.5" />, keywords: "date range filter calendar reports time frame" },
          { title: "File Upload", href: "/docs/components/file-upload", icon: <Terminal className="w-3.5 h-3.5" />, keywords: "upload drag drop attachments documents files csv" },
          { title: "Filter", href: "/docs/components/filter", icon: <Layers className="w-3.5 h-3.5" />, keywords: "filter facets search sorting pipeline" }
        ]
      },
      {
        title: "Navigation & Structure",
        environment: "crm",
        items: [
          { title: "Tabs", href: "/docs/components/tabs", icon: <Compass className="w-3.5 h-3.5" />, keywords: "tabs switch panels views sections subpages" },
          { title: "Glass Morphing Tabs", href: "/docs/components/glass-tabs", icon: <Compass className="w-3.5 h-3.5" />, keywords: "modern glass tabs smooth layout navigation" },
          { title: "Accordion", href: "/docs/components/accordion", icon: <Compass className="w-3.5 h-3.5" />, keywords: "collapse expand faq sections drawer" },
          { title: "Breadcrumb", href: "/docs/components/breadcrumb", icon: <Compass className="w-3.5 h-3.5" />, keywords: "breadcrumbs hierarchy path navigation history" },
          { title: "Pagination", href: "/docs/components/pagination", icon: <Compass className="w-3.5 h-3.5" />, keywords: "pagination pages table data split previous next" },
          { title: "Expandable Sidebar", href: "/docs/components/expandable-sidebar", icon: <Compass className="w-3.5 h-3.5" />, keywords: "sidebar navigation collapsible admin dashboard" },
          { title: "Stepper", href: "/docs/components/stepper", icon: <Layers className="w-3.5 h-3.5" />, keywords: "wizard multi-step progress onboard form" }
        ]
      },
      {
        title: "Feedback & Modals",
        environment: "crm",
        items: [
          { title: "Dialog", href: "/docs/components/dialog", icon: <Copy className="w-3.5 h-3.5" />, keywords: "modal popup confirmation form dialog alert" },
          { title: "Drawer", href: "/docs/components/drawer", icon: <Copy className="w-3.5 h-3.5" />, keywords: "sheet drawer slideout details panel edit lead" },
          { title: "Notification Center", href: "/docs/components/notification-center", icon: <Bell className="w-3.5 h-3.5" />, keywords: "notifications alerts inbox activity updates bell" },
          { title: "Sonner (Toast)", href: "/docs/components/sonner", icon: <Layers className="w-3.5 h-3.5" />, keywords: "toast notification feedback message success error" },
          { title: "Alert", href: "/docs/components/alert", icon: <Layers className="w-3.5 h-3.5" />, keywords: "banner warning error info notice inline" },
          { title: "Badge", href: "/docs/components/badge", icon: <Layers className="w-3.5 h-3.5" />, keywords: "tag status chip badge pill label" },
          { title: "Empty State", href: "/docs/components/empty-state", icon: <Layers className="w-3.5 h-3.5" />, keywords: "no data zero state placeholder illustration create first" },
          { title: "Loader", href: "/docs/components/loader", icon: <Layers className="w-3.5 h-3.5" />, keywords: "loading spinner progress wait skeleton" },
          { title: "Timeline", href: "/docs/components/timeline", icon: <Layers className="w-3.5 h-3.5" />, keywords: "history timeline events logs audits activity" },
          { title: "Animated Circular Progress", href: "/docs/components/animated-circular-progress", icon: <Layers className="w-3.5 h-3.5" />, keywords: "progress circle percent completion meter" }
        ]
      }
    ]
  },
  {
    label: "Creative & 3D UI",
    environment: "creative",
    sections: [
      {
        title: "Hero Components",
        environment: "creative",
        items: [
          { title: "Hero Particles", href: "/docs/components/hero-particles", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Hero 3D", href: "/docs/components/hero-3d", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Gravity Grid Hero", href: "/docs/components/gravity-grid-hero", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Text Mask Hero", href: "/docs/components/text-mask-hero", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Hero Globe 3D", href: "/docs/components/hero-globe-3d", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Hero Infinite Canvas", href: "/docs/components/hero-infinite-canvas", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Hero Video Mask", href: "/docs/components/hero-video-mask", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Hero Shimmer Mesh", href: "/docs/components/hero-shimmer-mesh", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Portal Scroll Reveal", href: "/docs/components/portal-scroll", icon: <Sparkles className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "3D Components",
        environment: "creative",
        items: [
          { title: "Cube Image Gallery", href: "/docs/components/cube-image-gallery", icon: <Layers className="w-3.5 h-3.5" />, keywords: "3d cube gallery interactive rotation drag webgl" },
          { title: "MacBook Scroll Reveal", href: "/docs/components/macbook-scroll-reveal", icon: <Layers className="w-3.5 h-3.5" />, keywords: "3d laptop computer mac apple scroll open" },
          { title: "Liquid Mercury Droplet", href: "/docs/components/liquid-mercury-droplet", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "3D Exploded View", href: "/docs/components/exploded-view-3d", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Volumetric Light Beam", href: "/docs/components/volumetric-light-beam", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Chromatic Glass Prism", href: "/docs/components/chromatic-glass-prism", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Interactive 3D Model", href: "/docs/components/interactive-3d-model", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Liquid Fluid Shader", href: "/docs/components/liquid-fluid-shader", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Particle System", href: "/docs/components/particle-system", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Floating 3D Card", href: "/docs/components/floating-3d-card", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Shader Image Reveal", href: "/docs/components/shader-image", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Globe", href: "/docs/components/globe", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Pixel Transition", href: "/docs/components/pixel-transition", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "3D Audio Visualizer", href: "/docs/components/audio-visualizer-3d", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "WebGL Gallery", href: "/docs/components/webgl-gallery", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Hologram Display", href: "/docs/components/hologram-display", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Interactive 3D Customizer", href: "/docs/components/product-customizer", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Fluid Distortion Gallery", href: "/docs/components/fluid-distortion-gallery", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Interactive Particle Swarm", href: "/docs/components/particle-swarm", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Audio Reactive Visualizer", href: "/docs/components/audio-reactive-visualizer", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Product Configurator", href: "/docs/components/product-configurator", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Raymarching Clouds", href: "/docs/components/raymarching-clouds", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Webcam Shader Portal", href: "/docs/components/webcam-shader-portal", icon: <Layers className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Text Effects",
        environment: "creative",
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
          { title: "Magnetic Text", href: "/docs/components/magnetic-text", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Typewriter", href: "/docs/components/typewriter", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Animated Gradient Text", href: "/docs/components/animated-gradient-text", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Staggered Text", href: "/docs/components/staggered-text", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Beat Synced Typography", href: "/docs/components/beat-synced-typography", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Variable Font Weight", href: "/docs/components/variable-font-weight", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Particle Dissolve", href: "/docs/components/particle-dissolve", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Text Shatter Physics", href: "/docs/components/text-shatter", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Sparkles Text", href: "/docs/components/sparkles-text", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Cinematic Text Reveal", href: "/docs/components/cinematic-text-reveal", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Generative AI Shimmer", href: "/docs/components/generative-ai-shimmer", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Magnetic Repulsion Text", href: "/docs/components/magnetic-repulsion-text", icon: <Cpu className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Creative Buttons",
        environment: "creative",
        items: [
          { title: "Magnetic Button", href: "/docs/components/magnetic-button", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Liquid Button", href: "/docs/components/liquid-button", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Glow Button", href: "/docs/components/glow-button", icon: <Layers className="w-3.5 h-3.5" />, keywords: "neon light shine bright cyber modern" },
          { title: "Particle Explosion Button", href: "/docs/components/particle-explosion-button", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Morphing SVG Button", href: "/docs/components/morphing-svg-button", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Physics Drop Button", href: "/docs/components/physics-drop-button", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "3D Add To Cart", href: "/docs/components/3d-add-to-cart-button", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Confetti Button", href: "/docs/components/confetti-button", icon: <Layers className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Creative Navigation & Docks",
        environment: "creative",
        items: [
          { title: "Floating Navbar", href: "/docs/components/floating-navbar", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Fullscreen Menu", href: "/docs/components/fullscreen-menu", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Dock", href: "/docs/components/dock", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Physics Dock", href: "/docs/components/physics-dock", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Cyber Terminal", href: "/docs/components/cyber-terminal", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Dynamic Island", href: "/docs/components/dynamic-island", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Smart Navbar", href: "/docs/components/smart-navbar", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Radial Menu", href: "/docs/components/radial-menu", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Scroll Spy", href: "/docs/components/scroll-spy", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Apple Scrollytelling", href: "/docs/components/apple-style-scrollytelling", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Mega Menu", href: "/docs/components/mega-menu", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Back To Top", href: "/docs/components/back-to-top", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Bento Island Nav", href: "/docs/components/bento-island-nav", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Morphing Breadcrumbs", href: "/docs/components/morphing-breadcrumbs", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Liquid Glass Nav", href: "/docs/components/liquid-glass-nav", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Elastic Gooey Menu", href: "/docs/components/elastic-gooey-menu", icon: <Compass className="w-3.5 h-3.5" /> },
          { title: "Vision OS Glass Dock", href: "/docs/components/vision-glass-dock", icon: <Compass className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Cursor & Mouse Effects",
        environment: "creative",
        items: [
          { title: "Custom Cursor", href: "/docs/components/custom-cursor", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
          { title: "Spotlight Cursor", href: "/docs/components/spotlight-cursor", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
          { title: "Magnetic Cursor", href: "/docs/components/magnetic-cursor", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
          { title: "Cursor Trail", href: "/docs/components/cursor-trail", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
          { title: "Context Cursor", href: "/docs/components/context-cursor", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
          { title: "Refraction Cursor", href: "/docs/components/refraction-cursor", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
          { title: "Fluid Cursor Trail", href: "/docs/components/fluid-cursor-trail", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
          { title: "Text Hover Image Reveal", href: "/docs/components/text-hover-image-reveal", icon: <Image className="w-3.5 h-3.5" /> },
          { title: "Hover Image Trails", href: "/docs/components/hover-image-trails", icon: <Image className="w-3.5 h-3.5" /> },
          { title: "Diffusion Image Reveal", href: "/docs/components/diffusion-image-reveal", icon: <Image className="w-3.5 h-3.5" /> },
          { title: "Liquid Image Distortion", href: "/docs/components/liquid-distortion", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Scratch to Reveal", href: "/docs/components/scratch-to-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Directional Hover", href: "/docs/components/directional-hover", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Flashlight Reveal", href: "/docs/components/flashlight-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Magnifying Glass", href: "/docs/components/magnifying-glass", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Hover Image Preview", href: "/docs/components/hover-image-preview", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Drag to Reorder", href: "/docs/components/drag-reorder", icon: <Sparkles className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Background Effects",
        environment: "creative",
        items: [
          { title: "Mesh Gradient", href: "/docs/components/mesh-gradient", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Aurora Background", href: "/docs/components/aurora-background", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Fluid Background", href: "/docs/components/fluid-background", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Interactive Fluid Background", href: "/docs/components/interactive-fluid", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Boids Simulation", href: "/docs/components/boids-canvas", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "SVG Isometric Grid", href: "/docs/components/svg-isometric-grid", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Fluid Canvas", href: "/docs/components/fluid-canvas", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Noise Overlay", href: "/docs/components/noise-overlay", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Film Grain Overlay", href: "/docs/components/film-grain", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Animated Blob Background", href: "/docs/components/blob-background", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Grid Pattern", href: "/docs/components/grid-pattern", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Interactive Grid Noise", href: "/docs/components/interactive-grid-noise", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Constellation Network", href: "/docs/components/constellation-network", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "WebGL Dynamic Ribbon", href: "/docs/components/webgl-ribbon-bg", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Background Rays", href: "/docs/components/background-rays", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Retro Grid", href: "/docs/components/retro-grid", icon: <Sparkles className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Scrollytelling & Transitions",
        environment: "creative",
        items: [
          { title: "Sticky Sequence Container", href: "/docs/components/sticky-sequence", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Scroll Driven Path", href: "/docs/components/scroll-driven-path", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Scroll Velocity Text", href: "/docs/components/scroll-velocity-text", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Sticky Image Mask", href: "/docs/components/sticky-image-mask", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Horizontal Scroll Pin", href: "/docs/components/horizontal-scroll-pin", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Parallax Curtain Reveal", href: "/docs/components/parallax-curtain-reveal", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Sticky Section Pin", href: "/docs/components/sticky-section-pin", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Parallax Depth Cards", href: "/docs/components/parallax-depth-cards", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Scroll Video Scrub", href: "/docs/components/scroll-video-scrub", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Tunnel Scroll", href: "/docs/components/tunnel-scroll", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Horizontal Scroll Hijack", href: "/docs/components/horizontal-scroll-hijack", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Sticky Stacking Cards", href: "/docs/components/sticky-stacking-cards", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Text Mask Video Reveal", href: "/docs/components/text-mask-video-reveal", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Smooth Scroll", href: "/docs/components/smooth-scroll", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Scroll Linked Split", href: "/docs/components/scroll-linked-split", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Interactive Pipeline", href: "/docs/components/interactive-pipeline", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "3D Book Flip", href: "/docs/components/3d-book-flip", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Infinite Fractal Zoom", href: "/docs/components/infinite-fractal-zoom", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Morph Transition", href: "/docs/components/morph-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Cinematic Preloader", href: "/docs/components/cinematic-preloader", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Liquid Sweep", href: "/docs/components/liquid-sweep-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Shutter Transition", href: "/docs/components/shutter-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Glitch Transition", href: "/docs/components/glitch-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Scroll Reveal", href: "/docs/components/scroll-reveal", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Clip Path Transition", href: "/docs/components/clip-path-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Liquid Curtain", href: "/docs/components/liquid-curtain-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Zoom to Fill", href: "/docs/components/zoom-to-fill-transition", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Pixel Dissolve", href: "/docs/components/pixel-dissolve-transition", icon: <Cpu className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "AI & Generative",
        environment: "creative",
        items: [
          { title: "Generative UI Chat", href: "/docs/components/generative-ui-chat", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "AI Command Palette", href: "/docs/components/ai-command-palette", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "AI Stream Wrapper", href: "/docs/components/ai-stream-wrapper", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Spatial UI", href: "/docs/components/spatial-ui", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Animated Prompt Input", href: "/docs/components/animated-prompt-input", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Streaming Markdown Renderer", href: "/docs/components/streaming-markdown-renderer", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Thinking Visualizer", href: "/docs/components/thinking-visualizer", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Microphone Reactive Orb", href: "/docs/components/microphone-reactive-orb", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "AI Voice Visualizer", href: "/docs/components/ai-voice-visualizer", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Typing Code Stream", href: "/docs/components/typing-code-stream", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Agent Tool Inspector", href: "/docs/components/agent-tool-inspector", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Audio Waveform Studio", href: "/docs/components/audio-waveform-studio", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "AI Artifact Sandbox", href: "/docs/components/ai-artifact-sandbox", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "AI Agent Flow", href: "/docs/components/ai-agent-flow", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Voice Agent Aura", href: "/docs/components/voice-agent-aura", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Reasoning Tree", href: "/docs/components/reasoning-tree", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "LLM Compare Slider", href: "/docs/components/llm-compare-slider", icon: <Cpu className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Physics & Micro-Interactions",
        environment: "creative",
        items: [
          { title: "Destructible UI", href: "/docs/components/destructible-ui", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Physics Canvas", href: "/docs/components/physics-canvas", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Force Graph", href: "/docs/components/force-graph", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Falling Elements", href: "/docs/components/falling-elements", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Multiplayer Cursor Ecosystem", href: "/docs/components/multiplayer-cursor-ecosystem", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Infinite Zoom Canvas", href: "/docs/components/infinite-zoom-canvas", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Elastic Pull Drawer", href: "/docs/components/elastic-drawer", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Slot Machine Reel", href: "/docs/components/slot-machine-reel", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Magnetic Planetary Menu", href: "/docs/components/magnetic-orbit-menu", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Scratch Reveal", href: "/docs/components/paper-tear-reveal", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Draggable Canvas", href: "/docs/components/draggable-canvas", icon: <Layout className="w-3.5 h-3.5" /> },
          { title: "Soft Body Jelly", href: "/docs/components/soft-body-jelly", icon: <Layout className="w-3.5 h-3.5" /> },
          { title: "Generative Audio Button", href: "/docs/components/generative-audio-btn", icon: <Layout className="w-3.5 h-3.5" /> },
          { title: "Pluckable String", href: "/docs/components/pluckable-string", icon: <Layout className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Cards & Grids",
        environment: "creative",
        items: [
          { title: "Card", href: "/docs/components/card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Tilt Card", href: "/docs/components/tilt-card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Spotlight Card", href: "/docs/components/spotlight-card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Spotlight Border Card", href: "/docs/components/spotlight-border-card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Bento Grid", href: "/docs/components/bento-grid", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Card Stack", href: "/docs/components/card-stack", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Swipeable Stack Deck", href: "/docs/components/swipeable-stack", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Holographic Foil Card", href: "/docs/components/holographic-foil-card", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Interactive 3D Ticket", href: "/docs/components/conference-ticket", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "3D Card Peeling", href: "/docs/components/3d-card-peel", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Isometric Grid", href: "/docs/components/isometric-grid", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Infinite Panning Grid", href: "/docs/components/infinite-panning-grid", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Staggered Masonry", href: "/docs/components/staggered-masonry", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Broken Grid", href: "/docs/components/broken-grid", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
          { title: "Desktop OS System", href: "/docs/components/desktop-window", icon: <Layers className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Media & Visuals",
        environment: "creative",
        items: [
          { title: "Glass Video Player", href: "/docs/components/glass-video-player", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Video Reveal", href: "/docs/components/video-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Audio Visualizer Canvas", href: "/docs/components/audio-visualizer", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Magnetic Depth Gallery", href: "/docs/components/magnetic-depth-gallery", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Interactive 360° Viewer", href: "/docs/components/interactive-360-viewer", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Before/After Slider", href: "/docs/components/before-after-slider", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Gallery Lightbox", href: "/docs/components/gallery-lightbox", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Image Reveal", href: "/docs/components/image-reveal", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Draggable Carousel", href: "/docs/components/draggable-carousel", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Parallax Slider", href: "/docs/components/parallax-slider", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Coverflow Slider", href: "/docs/components/coverflow-slider", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Infinite Circular Slider", href: "/docs/components/infinite-circular-slider", icon: <Layers className="w-3.5 h-3.5" /> },
          { title: "Velocity Marquee", href: "/docs/components/velocity-marquee", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "3D Cylinder Marquee", href: "/docs/components/cylinder-marquee", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Mouse-Driven Marquee", href: "/docs/components/mouse-marquee", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Vertical Ticker Wall", href: "/docs/components/vertical-ticker", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { title: "Infinite Marquee", href: "/docs/components/infinite-marquee", icon: <GitBranch className="w-3.5 h-3.5" /> },
          { title: "Logo Marquee", href: "/docs/components/logo-marquee", icon: <GitBranch className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Creative Footers",
        environment: "creative",
        items: [
          { title: "Terminal Footer", href: "/docs/components/terminal-footer", icon: <Layout className="w-3.5 h-3.5" /> },
          { title: "Gooey Footer", href: "/docs/components/gooey-footer", icon: <Layout className="w-3.5 h-3.5" /> },
          { title: "Giant Type Footer", href: "/docs/components/giant-type-footer", icon: <Layout className="w-3.5 h-3.5" /> },
          { title: "Parallax Footer", href: "/docs/components/parallax-footer", icon: <LayoutGrid className="w-3.5 h-3.5" /> }
        ]
      }
    ]
  },
  {
    label: "System",
    environment: "all",
    sections: [
      {
        title: "Architecture",
        items: [
          { title: "Server Components", href: "/docs/components/server-components", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Animations", href: "/docs/animations", icon: <Cpu className="w-3.5 h-3.5" /> },
          { title: "Three.js & Shaders", href: "/docs/three", icon: <Layers className="w-3.5 h-3.5" /> }
        ]
      },
      {
        title: "Releases",
        items: [
          { title: "Changelog", href: "/docs/changelog", icon: <GitBranch className="w-3.5 h-3.5" /> }
        ]
      }
    ]
  }
];

export function DocsSidebar() {
  const pathname = usePathname();

  // Environment mode state: 'crm' | 'creative' | 'all'
  const [environment, setEnvironment] = React.useState<'crm' | 'creative' | 'all'>('crm');

  // Sync with localStorage on mount & listen for changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kinetic_ui_env');
      if (saved === 'crm' || saved === 'creative' || saved === 'all') {
        setEnvironment(saved);
      }
    }

    const handleEnvChange = (e: any) => {
      if (e.detail && (e.detail === 'crm' || e.detail === 'creative' || e.detail === 'all')) {
        setEnvironment(e.detail);
      }
    };

    window.addEventListener('kinetic_ui_env_change', handleEnvChange);
    return () => window.removeEventListener('kinetic_ui_env_change', handleEnvChange);
  }, []);

  const handleSelectEnv = (mode: 'crm' | 'creative' | 'all') => {
    setEnvironment(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kinetic_ui_env', mode);
      window.dispatchEvent(new CustomEvent('kinetic_ui_env_change', { detail: mode }));
    }
  };

  // Filter groups according to active environment
  const visibleGroups = React.useMemo(() => {
    return sidebarContent.filter((group) => {
      if (environment === 'all') return true;
      if (!group.environment || group.environment === 'all') return true;
      return group.environment === environment;
    });
  }, [environment]);

  return (
    <div className="w-full h-full flex flex-col bg-background text-foreground py-6 pr-3 lg:pr-4 select-none transition-colors duration-300">

      {/* Environment Mode Switcher */}
      <div className="px-2 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
            <span>Environment</span>
          </span>
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all whitespace-nowrap",
            environment === 'crm' 
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
              : environment === 'creative' 
                ? "bg-violet-500/10 text-violet-400 border-violet-500/30" 
                : "bg-sky-500/10 text-sky-400 border-sky-500/30"
          )}>
            {environment === 'crm' ? 'CRM / SaaS' : environment === 'creative' ? 'Creative 3D' : 'All 205+'}
          </span>
        </div>

        <div className="grid grid-cols-3 p-1 rounded-xl bg-muted/60 border border-border/70 text-xs gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => handleSelectEnv('crm')}
            className={cn(
              "flex flex-col items-center py-2 px-1 rounded-lg font-medium transition-all text-center relative cursor-pointer",
              environment === 'crm'
                ? "bg-background text-emerald-400 font-bold border border-border/60 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
            title="CRM & Dashboard Components (Tables, Metrics, Select, MultiSelect, Buttons)"
          >
            <LayoutDashboard className="w-3.5 h-3.5 mb-1 text-emerald-400 shrink-0" />
            <span className="text-[10px] tracking-tight">CRM UI</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectEnv('creative')}
            className={cn(
              "flex flex-col items-center py-2 px-1 rounded-lg font-medium transition-all text-center relative cursor-pointer",
              environment === 'creative'
                ? "bg-background text-violet-400 font-bold border border-border/60 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
            title="Creative & 3D WebGL Components"
          >
            <Sparkles className="w-3.5 h-3.5 mb-1 text-violet-400 shrink-0" />
            <span className="text-[10px] tracking-tight">Creative</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectEnv('all')}
            className={cn(
              "flex flex-col items-center py-2 px-1 rounded-lg font-medium transition-all text-center relative cursor-pointer",
              environment === 'all'
                ? "bg-background text-sky-400 font-bold border border-border/60 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
            title="Show All 205+ Components"
          >
            <Layers className="w-3.5 h-3.5 mb-1 text-sky-400 shrink-0" />
            <span className="text-[10px] tracking-tight">All (205)</span>
          </button>
        </div>
      </div>

      {/* Sidebar Sections */}
      <div className="flex-1 overflow-y-auto overscroll-contain space-y-8 sidebar-scrollbar">
        {visibleGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            {group.label !== "Getting Started" && (
              <h3 className={cn(
                "px-2 text-xs font-black uppercase tracking-widest border-b pb-2 flex items-center justify-between gap-2",
                group.environment === 'crm' 
                  ? "text-emerald-400 border-emerald-500/20" 
                  : group.environment === 'creative'
                    ? "text-violet-400 border-violet-500/20"
                    : "text-foreground border-border/50"
              )}>
                <span className="truncate">{group.label}</span>
                {group.environment === 'crm' && (
                  <span className="text-[9px] font-semibold lowercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    crm / saas
                  </span>
                )}
                {group.environment === 'creative' && (
                  <span className="text-[9px] font-semibold lowercase px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
                    3d & shaders
                  </span>
                )}
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

function CollapsibleSection({ sec, pathname }: { sec: SidebarSection, pathname: string }) {
  const hasActiveChild = sec.items.some((item) => item.href === pathname);
  const [isExpanded, setIsExpanded] = React.useState(hasActiveChild || sec.title === "Overview" || sec.title === "CRM & Analytics" || sec.title === "Buttons & Actions");

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
        className="w-full flex items-center justify-between px-3 py-1.5 mb-2 group text-left cursor-pointer"
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
              {sec.items.map((sub, subIdx) => {
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
                    <span className={cn("transition-colors shrink-0", isActive ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground")}>
                      {sub.icon}
                    </span>
                    <span className="flex-1 truncate leading-snug">{sub.title}</span>
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
