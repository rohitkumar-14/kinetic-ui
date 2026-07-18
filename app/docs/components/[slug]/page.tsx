import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getComponentDocBySlug, getComponentSlugs } from '@/lib/mdx';
import fs from 'fs';
import path from 'path';
import { ComponentPreview } from '@/components/creative/docs/component-preview';
import { CodeHighlight } from '@/components/creative/code-highlight';
import { PropsTable } from '@/components/docs/props-table';
import { CliInstallCommand } from '@/components/docs/cli-install-command';
import { MagneticButton } from '@/components/creative/magnetic-button';
import { MagneticButtonDemo } from '@/components/creative/docs/magnetic-button-demo';
import { SpotlightCard } from '@/components/creative/spotlight-card';
import { SpotlightCardDemo } from '@/components/creative/docs/spotlight-card-demo';
import { KineticLoader } from '@/components/creative/kinetic-loader';
import { KineticLoaderDemo } from '@/components/creative/docs/kinetic-loader-demo';
import { TiltCard } from '@/components/creative/tilt-card';
import { TiltCardDemo } from '@/components/creative/docs/tilt-card-demo';
import { Floating3DCard } from '@/components/creative/floating-3d-card';
import { Floating3DCardDemo } from '@/components/creative/docs/floating-3d-card-demo';
import { TextReveal } from '@/components/creative/text-reveal';
import { TextRevealDemo } from '@/components/creative/docs/text-reveal-demo';
import { BentoGrid, BentoCard } from '@/components/creative/bento-grid';
import { BentoGridDemo } from '@/components/creative/docs/bento-grid-demo';
import { HeroParticles, HeroParticlesPlayground, HeroParticlesPreview } from '@/components/creative/hero/hero-particles';
import { Hero3D } from '@/components/creative/hero/hero-3d';
import { GravityGridHero } from '@/components/creative/hero/gravity-grid-hero';
import { GravityGridHeroDemo } from '@/components/creative/docs/gravity-grid-hero-demo';
import { TextMaskHero } from '@/components/creative/hero/text-mask-hero';
import { TextMaskHeroDemo } from '@/components/creative/docs/text-mask-hero-demo';
import { FloatingNavbar } from '@/components/creative/floating-navbar';
import { FloatingNavbarDemo } from '@/components/creative/docs/floating-navbar-demo';
import { LiquidButton } from '@/components/creative/liquid-button';
import { LiquidButtonDemo } from '@/components/creative/docs/liquid-button-demo';
import { CustomCursor } from '@/components/creative/custom-cursor';
import { CustomCursorDemo } from '@/components/creative/docs/custom-cursor-demo';
import { BlurText } from '@/components/creative/blur-text';
import { BlurTextDemo } from '@/components/creative/docs/blur-text-demo';
import { AuroraBackground } from '@/components/creative/aurora-background';
import { AuroraBackgroundDemo } from '@/components/creative/docs/aurora-background-demo';
import { MeshGradient } from '@/components/creative/mesh-gradient';
import { MeshGradientDemo } from '@/components/creative/docs/mesh-gradient-demo';
import { ShinyText } from '@/components/creative/shiny-text';
import { ShinyTextDemo } from '@/components/creative/docs/shiny-text-demo';
import { GlowButton } from '@/components/creative/glow-button';
import { GlowButtonDemo } from '@/components/creative/docs/glow-button-demo';
import { FullscreenMenu } from '@/components/creative/fullscreen-menu';
import { FullscreenMenuDemo } from '@/components/creative/docs/fullscreen-menu-demo';
import { DockDemo } from '@/components/creative/docs/dock-demo';
import { ExpandableSidebarDemo } from '@/components/creative/docs/expandable-sidebar-demo';
import { SpotlightCursor } from '@/components/creative/spotlight-cursor';
import { SpotlightCursorDemo } from '@/components/creative/docs/spotlight-cursor-demo';
import { VideoReveal } from '@/components/creative/video-reveal';
import { VideoRevealDemo } from '@/components/creative/docs/video-reveal-demo';
import { FloatingFormDemo } from '@/components/creative/docs/floating-form-demo';

import { MorphTransition } from '@/components/creative/morph-transition';
import { Testimonials } from '@/components/creative/testimonials';
import { InfiniteMarqueeDemo } from '@/components/creative/docs/infinite-marquee-demo';
import { PricingCards } from '@/components/creative/pricing-cards';
import { PricingCardsDemo } from '@/components/creative/docs/pricing-cards-demo';
import { FeatureSection } from '@/components/creative/feature-section';
import { FeatureSectionDemo } from '@/components/creative/docs/feature-section-demo';

import { Globe } from '@/components/creative/globe';
import { GlobeDemo } from '@/components/creative/docs/globe-demo';
import { LogoMarquee } from '@/components/creative/logo-marquee';
import { LogoMarqueeDemo } from '@/components/creative/docs/logo-marquee-demo';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DatePicker } from '@/components/ui/date-picker';
import { FileUpload } from '@/components/ui/file-upload';
import { FileUploadDemo } from '@/components/creative/docs/file-upload-demo';
import { MultiSelect } from '@/components/ui/multi-select';
import { MultiSelectDemo } from '@/components/creative/docs/multi-select-demo';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, CartesianGrid, XAxis } from '@/components/creative/docs/chart-mdx-helper';
import { ChartDemo } from '@/components/creative/docs/chart-demo';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/creative/motion-primitives';
import { MotionPrimitivesDemo } from '@/components/creative/docs/motion-primitives-demo';
import { MorphTransitionDemo } from '@/components/creative/docs/morph-transition-demo';
import { TextScramble } from '@/components/creative/text-scramble';
import { TextScrambleDemo } from '@/components/creative/docs/text-scramble-demo';
import { GlyphMatrix } from '@/components/creative/glyph-matrix';
import { GlyphMatrixDemo } from '@/components/creative/docs/glyph-matrix-demo';
import { HoverImageTrails } from '@/components/creative/hover-image-trails';
import { HoverImageTrailsDemo } from '@/components/creative/docs/hover-image-trails-demo';
import { ParallaxFooter } from '@/components/creative/parallax-footer';
import { ParallaxFooterDemo } from '@/components/creative/docs/parallax-footer-demo';
import { ScrollProgress } from '@/components/creative/scroll-progress';
import { ScrollProgressDemo } from '@/components/creative/docs/scroll-progress-demo';

import { PixelTransition } from '@/components/creative/pixel-transition';
import { PixelTransitionDemo } from '@/components/creative/docs/pixel-transition-demo';
import { GooeyMenu, GooeyMenuItem } from '@/components/creative/gooey-menu';
import { GooeyMenuDemo } from '@/components/creative/docs/gooey-menu-demo';
import { DraggableCanvas } from '@/components/creative/draggable-canvas';
import { DraggableCanvasDemo } from '@/components/creative/docs/draggable-canvas-demo';
import { CardStack } from '@/components/creative/card-stack';
import { CardStackDemo } from '@/components/creative/docs/card-stack-demo';
import { KineticTypography } from '@/components/creative/kinetic-typography';
import { KineticTypographyDemo } from '@/components/creative/docs/kinetic-typography-demo';
import { MagneticCursorDemo } from '@/components/creative/docs/magnetic-cursor-demo';
import { DestructibleUIDemo } from '@/components/creative/docs/destructible-ui-demo';
import { FluidBackground } from '@/components/creative/fluid-background';
import { FluidBackgroundDemo } from '@/components/creative/docs/fluid-background-demo';
import { DirectionalHover } from '@/components/creative/directional-hover';
import { DirectionalHoverDemo } from '@/components/creative/docs/directional-hover-demo';
import { Odometer } from '@/components/creative/odometer';
import { OdometerDemo } from '@/components/creative/docs/odometer-demo';
import { FlipBoard } from '@/components/creative/flip-board';
import { FlipBoardDemo } from '@/components/creative/docs/flip-board-demo';
import { PhysicsDock } from '@/components/creative/physics-dock';
import { PhysicsDockDemo, PhysicsDockJellyDemo, PhysicsDockBlocksDemo } from '@/components/creative/docs/physics-dock-demo';
import { ShaderImage } from '@/components/creative/shader-image';
import { ShaderImageDemo } from '@/components/creative/docs/shader-image-demo';
import { CyberTerminalDemo } from '@/components/creative/docs/cyber-terminal-demo';
import { BreathingText } from '@/components/creative/breathing-text';
import { BreathingTextDemo } from '@/components/creative/docs/breathing-text-demo';
import { AudioVisualizer3DDemo } from '@/components/creative/docs/audio-visualizer-3d-demo';
import { PhysicsCanvasDemo } from '@/components/creative/docs/physics-canvas-demo';
import { AnimatedCircularProgress } from '@/components/creative/animated-circular-progress';
import { AnimatedCircularProgressDemo } from '@/components/creative/docs/animated-circular-progress-demo';
import { MagneticGallery } from '@/components/creative/magnetic-gallery';
import { MagneticGalleryDemo } from '@/components/creative/docs/magnetic-gallery-demo';
import { AudioVisualizer } from '@/components/creative/audio-visualizer';
import { AudioVisualizerDemo } from '@/components/creative/docs/audio-visualizer-demo';
import { AccordionDemo } from '@/components/creative/docs/accordion-demo';
import { AlertDemo } from '@/components/creative/docs/alert-demo';
import { BadgeDemo } from '@/components/creative/docs/badge-demo';
import { TabsDemo } from '@/components/creative/docs/tabs-demo';
import { TextareaDemo } from '@/components/creative/docs/textarea-demo';
import { SelectDemo } from '@/components/creative/docs/select-demo';
import { InputDemo } from '@/components/creative/docs/input-demo';
import { CheckboxDemo } from '@/components/creative/docs/checkbox-demo';
import { CardDemo } from '@/components/creative/docs/card-demo';
import { ButtonDemo } from '@/components/creative/docs/button-demo';
import { TeamSectionDemo } from '@/components/creative/docs/team-section-demo';
import { LoaderDemo } from '@/components/creative/docs/loader-demo';
import { HorizontalScrollDemo } from '@/components/creative/docs/horizontal-scroll-demo';
import { BreadcrumbDemo } from '@/components/creative/docs/breadcrumb-demo';
import { DropdownDemo } from '@/components/creative/docs/dropdown-demo';
import { EmptyStateDemo } from '@/components/creative/docs/empty-state-demo';
import { FilterDemo } from '@/components/creative/docs/filter-demo';
import { PaginationDemo } from '@/components/creative/docs/pagination-demo';
import { DialogDemo } from '@/components/creative/docs/dialog-demo';
import { TimelineDemo } from '@/components/creative/docs/timeline-demo';
import { ToastDemo } from '@/components/creative/docs/toast-demo';
import { SwitchDemo } from '@/components/creative/docs/switch-demo';
import { CartDemo } from '@/components/creative/docs/cart-demo';
import { CtaSectionDemo } from '@/components/creative/docs/cta-section-demo';
import { FaqSectionDemo } from '@/components/creative/docs/faq-section-demo';
import { LiquidDistortionDemo } from '@/components/creative/docs/liquid-distortion-demo';
import { InteractiveFluidDemo } from '@/components/creative/docs/interactive-fluid-demo';
import { ScratchToRevealDemo } from '@/components/creative/docs/scratch-to-reveal-demo';
import { ScrollVelocityTextDemo } from '@/components/creative/docs/scroll-velocity-text-demo';
import { StickyImageMaskDemo } from '@/components/creative/docs/sticky-image-mask-demo';
import { ParallaxDepthCardsDemo } from '@/components/creative/docs/parallax-depth-cards-demo';
import { RefractionCursorDemo } from '@/components/creative/docs/refraction-cursor-demo';
import { VideoPortalDemo } from '@/components/creative/docs/video-portal-demo';
import { ElasticSidebarDemo } from '@/components/creative/docs/elastic-sidebar-demo';
import { TextSplitRevealDemo } from '@/components/creative/docs/text-split-reveal-demo';
import { CircularTextDemo } from '@/components/creative/docs/circular-text-demo';
import { HorizontalScrollPinDemo } from '@/components/creative/docs/horizontal-scroll-pin-demo';
import { ParticleTextDemo } from '@/components/creative/docs/particle-text-demo';
import { CoverFlowCarouselDemo } from '@/components/creative/docs/cover-flow-carousel-demo';
import { CinematicPreloaderDemo } from '@/components/creative/docs/cinematic-preloader-demo';
import { ScrollVideoScrubDemo } from '@/components/creative/docs/scroll-video-scrub-demo';
import { TunnelScrollDemo } from '@/components/creative/docs/tunnel-scroll-demo';
import { SwipeableStackDemo } from '@/components/creative/docs/swipeable-stack-demo';
import { SVGLiquidDistortionDemo } from '@/components/creative/docs/svg-liquid-distortion-demo';
import { AsciiRendererDemo } from '@/components/creative/docs/ascii-renderer-demo';
import { MagnifyingGlassDemo } from '@/components/creative/docs/magnifying-glass-demo';
import { DynamicIslandDemo } from '@/components/creative/docs/dynamic-island-demo';
import { GlassTabsDemo } from '@/components/creative/docs/glass-tabs-demo';
import { WebGLGalleryDemo } from '@/components/creative/docs/webgl-gallery-demo';
import { MinimapDemo } from '@/components/creative/docs/minimap-demo';
import { AIStreamWrapperDemo } from '@/components/creative/docs/ai-stream-wrapper-demo';
import { ForceGraphDemo } from '@/components/creative/docs/force-graph-demo';
import { FlashlightRevealDemo } from '@/components/creative/docs/flashlight-reveal-demo';
import { ImageAccordionDemo } from '@/components/creative/docs/image-accordion-demo';
import { Interactive3DModelDemo } from '@/components/creative/docs/interactive-3d-model-demo';
import { LiquidFluidShaderDemo } from '@/components/creative/docs/liquid-fluid-shader-demo';
import { ParticleSystemDemo } from '@/components/creative/docs/particle-system-demo';
import { StickySequenceDemo } from '@/components/creative/docs/sticky-sequence-demo';
import { ScrollDrivenPathDemo } from '@/components/creative/docs/scroll-driven-path-demo';
import { GenerativeUIChatDemo } from '@/components/creative/docs/generative-ui-chat-demo';
import { AICommandPaletteDemo } from '@/components/creative/docs/ai-command-palette-demo';
import { LiquidSweepTransitionDemo } from '@/components/creative/docs/liquid-sweep-transition-demo';
import { ShutterTransitionDemo } from '@/components/creative/docs/shutter-transition-demo';
import { GlitchTransitionDemo } from '@/components/creative/docs/glitch-transition-demo';
import { MagneticDepthGalleryDemo } from '@/components/creative/docs/magnetic-depth-demo';
import { Interactive360ViewerDemo } from '@/components/creative/docs/interactive-360-demo';
import { TerminalFooterDemo } from '@/components/creative/docs/terminal-footer-demo';
import { GooeyFooterDemo } from '@/components/creative/docs/gooey-footer-demo';
import { GiantTypeFooterDemo } from '@/components/creative/docs/giant-type-footer-demo';
import { VelocityMarqueeDemo } from '@/components/creative/docs/velocity-marquee-demo';
import { CylinderMarqueeDemo } from '@/components/creative/docs/cylinder-marquee-demo';
import { MouseMarqueeDemo } from '@/components/creative/docs/mouse-marquee-demo';
import { VerticalTickerDemo } from '@/components/creative/docs/vertical-ticker-demo';
import { SpatialUIDemo } from '@/components/creative/docs/spatial-ui-demo';
import { GlassVideoPlayerDemo } from '@/components/creative/docs/glass-video-player-demo';
import { DesktopWindowDemo } from '@/components/creative/docs/desktop-window-demo';
import { ProductCustomizerDemo } from '@/components/creative/docs/product-customizer-demo';
import { BoidsCanvasDemo } from '@/components/creative/docs/boids-canvas-demo';
import { FluidCanvasDemo } from '@/components/creative/docs/fluid-canvas-demo';
import { MorphChartDemo } from '@/components/creative/docs/morph-chart-demo';
import { HorizontalScrollHijackDemo } from '@/components/creative/docs/horizontal-scroll-hijack-demo';
import { StickyStackingCardsDemo } from '@/components/creative/docs/sticky-stacking-cards-demo';
import { TextMaskVideoRevealDemo } from '@/components/creative/docs/text-mask-video-reveal-demo';
import { FluidDistortionGalleryDemo } from '@/components/creative/docs/fluid-distortion-gallery-demo';
import { InteractiveParticleSwarmDemo } from '@/components/creative/docs/interactive-particle-swarm-demo';
import { AudioReactiveVisualizerDemo } from '@/components/creative/docs/audio-reactive-visualizer-demo';
import { SmoothScrollDemo } from '@/components/creative/docs/smooth-scroll-demo';
import { NoiseOverlayDemo } from '@/components/creative/docs/noise-overlay-demo';
import { ScrollRevealDemo } from '@/components/creative/docs/scroll-reveal-demo';
import { SmartNavbarDemo } from '@/components/creative/docs/smart-navbar-demo';
import { AnimatedCounterDemo } from '@/components/creative/docs/animated-counter-demo';
import { SplitScreenLayoutDemo } from '@/components/creative/docs/split-screen-layout-demo';
import { MasonryGridDemo } from '@/components/creative/docs/masonry-grid-demo';
import { BrokenGridDemo } from '@/components/creative/docs/broken-grid-demo';
import { ScrollLinkedSplitDemo } from '@/components/creative/docs/scroll-linked-split-demo';
import { RadialMenuDemo } from '@/components/creative/docs/radial-menu-demo';
import { ScrollSpyDemo } from '@/components/creative/docs/scroll-spy-demo';
import { MegaMenuDemo } from '@/components/creative/docs/mega-menu-demo';
import { BackToTopDemo } from '@/components/creative/docs/back-to-top-demo';
import { CursorTrailDemo } from '@/components/creative/docs/cursor-trail-demo';
import { ContextCursorDemo } from '@/components/creative/docs/context-cursor-demo';
import { HoverImagePreviewDemo } from '@/components/creative/docs/hover-image-preview-demo';
import { DragReorderDemo } from '@/components/creative/docs/drag-reorder-demo';
import { TypewriterDemo } from '@/components/creative/docs/typewriter-demo';
import { AnimatedGradientTextDemo } from '@/components/creative/docs/animated-gradient-text-demo';
import { StaggeredTextDemo } from '@/components/creative/docs/staggered-text-demo';
import { BeforeAfterSliderDemo } from '@/components/creative/docs/before-after-slider-demo';
import { GalleryLightboxDemo } from '@/components/creative/docs/gallery-lightbox-demo';
import { ImageRevealDemo } from '@/components/creative/docs/image-reveal-demo';
import { DraggableCarouselDemo } from '@/components/creative/docs/draggable-carousel-demo';
import { StatsSectionDemo } from '@/components/creative/docs/stats-section-demo';
import { TestimonialCarouselDemo } from '@/components/creative/docs/testimonial-carousel-demo';
import { ProjectCardDemo } from '@/components/creative/docs/project-card-demo';
import { ClientLogoGridDemo } from '@/components/creative/docs/client-logo-grid-demo';
import { ComparisonTableDemo } from '@/components/creative/docs/comparison-table-demo';
import { FilmGrainDemo } from '@/components/creative/docs/film-grain-demo';
import { BlobBackgroundDemo } from '@/components/creative/docs/blob-background-demo';
import { GridPatternDemo } from '@/components/creative/docs/grid-pattern-demo';
import { ClipPathTransitionDemo } from '@/components/creative/docs/clip-path-transition-demo';
import { CookieConsentDemo } from '@/components/creative/docs/cookie-consent-demo';
import { FloatingActionButtonDemo } from '@/components/creative/docs/floating-action-button-demo';
import { StepperDemo } from '@/components/creative/docs/stepper-demo';
import { NotificationCenterDemo } from '@/components/creative/docs/notification-center-demo';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DocsPageClient } from '@/components/docs-page-client';
import { VariantContent } from '@/components/creative/docs/variant-content';
import { AnimatedPromptInputDemo } from '@/components/creative/docs/animated-prompt-input-demo';
import { StreamingMarkdownRendererDemo } from '@/components/creative/docs/streaming-markdown-renderer-demo';
import { ThinkingVisualizerDemo } from '@/components/creative/docs/thinking-visualizer-demo';
import { ProductConfiguratorDemo } from '@/components/creative/docs/product-configurator-demo';
import { RaymarchingCloudsDemo } from '@/components/creative/docs/raymarching-clouds-demo';
import { FallingElementsDemo } from '@/components/creative/docs/falling-elements-demo';
import { MicrophoneReactiveOrbDemo } from '@/components/creative/docs/microphone-reactive-orb-demo';
import { BeatSyncedTypographyDemo } from '@/components/creative/docs/beat-synced-typography-demo';
import { WebcamShaderPortalDemo } from '@/components/creative/docs/webcam-shader-portal-demo';
import { MultiplayerCursorEcosystemDemo } from '@/components/creative/docs/multiplayer-cursor-ecosystem-demo';
import { InfiniteZoomCanvasDemo } from '@/components/creative/docs/infinite-zoom-canvas-demo';

// Define the custom components we want to use inside our MDX files
const mdxComponents = {
  AnimatedPromptInputDemo,
  StreamingMarkdownRendererDemo,
  ThinkingVisualizerDemo,
  ProductConfiguratorDemo,
  RaymarchingCloudsDemo,
  FallingElementsDemo,
  MicrophoneReactiveOrbDemo,
  BeatSyncedTypographyDemo,
  WebcamShaderPortalDemo,
  MultiplayerCursorEcosystemDemo,
  InfiniteZoomCanvasDemo,
  ComponentPreview,
  PropsTable,
  CliInstallCommand,
  VariantContent,
  MagneticCursorDemo,
  DestructibleUIDemo,
  LiquidSweepTransitionDemo,
  ShutterTransitionDemo,
  GlitchTransitionDemo,
  MagneticDepthGalleryDemo,
  AudioVisualizerDemo,
  Interactive360ViewerDemo,
  TerminalFooterDemo,
  GooeyFooterDemo,
  GiantTypeFooterDemo,
  VelocityMarqueeDemo,
  CylinderMarqueeDemo,
  MouseMarqueeDemo,
  VerticalTickerDemo,
  SpatialUIDemo,
  GlassVideoPlayerDemo,
  DesktopWindowDemo,
  ProductCustomizerDemo,
  RadialMenuDemo,
  ScrollSpyDemo,
  MegaMenuDemo,
  BackToTopDemo,
  CursorTrailDemo,
  ContextCursorDemo,
  HoverImagePreviewDemo,
  DragReorderDemo,
  TypewriterDemo,
  AnimatedGradientTextDemo,
  StaggeredTextDemo,
  BeforeAfterSliderDemo,
  GalleryLightboxDemo,
  ImageRevealDemo,
  DraggableCarouselDemo,
  StatsSectionDemo,
  TestimonialCarouselDemo,
  ProjectCardDemo,
  ClientLogoGridDemo,
  ComparisonTableDemo,
  FilmGrainDemo,
  BlobBackgroundDemo,
  ClipPathTransitionDemo,
  CookieConsentDemo,
  FloatingActionButtonDemo,
  StepperDemo,
  NotificationCenterDemo,
  BoidsCanvasDemo,
  FluidCanvasDemo,
  MorphChartDemo,
  MagneticButton,
  MagneticButtonDemo,
  SpotlightCard,
  SpotlightCardDemo,
  KineticLoader,
  KineticLoaderDemo,
  TiltCard,
  TiltCardDemo,
  Floating3DCard,
  Floating3DCardDemo,
  TextReveal,
  TextRevealDemo,
  BentoGrid,
  BentoCard,
  BentoGridDemo,
  HeroParticles,
  HeroParticlesPreview,
  HeroParticlesPlayground,
  Hero3D,
  GravityGridHero,
  GravityGridHeroDemo,
  TextMaskHero,
  TextMaskHeroDemo,
  FloatingNavbar,
  FloatingNavbarDemo,
  FullscreenMenu,
  FullscreenMenuDemo,
  DockDemo,
  ExpandableSidebarDemo,
  LiquidButton,
  LiquidButtonDemo,
  GlowButton,
  GlowButtonDemo,
  BlurText,
  BlurTextDemo,
  AuroraBackground,
  AuroraBackgroundDemo,
  MeshGradient,
  MeshGradientDemo,
  ShinyText,
  ShinyTextDemo,
  CustomCursor,
  CustomCursorDemo,
  SpotlightCursor,
  SpotlightCursorDemo,
  Testimonials,
  InfiniteMarqueeDemo,
  PricingCards,
  PricingCardsDemo,
  FeatureSection,
  FeatureSectionDemo,

  VideoReveal,
  VideoRevealDemo,
  FloatingFormDemo,

  MorphTransition,
  MorphTransitionDemo,
  MotionPrimitivesDemo,
  TextScramble,
  TextScrambleDemo,
  GlyphMatrix,
  GlyphMatrixDemo,
  HoverImageTrails,
  HoverImageTrailsDemo,
  ParallaxFooter,
  ParallaxFooterDemo,
  ScrollProgress,
  ScrollProgressDemo,

  PixelTransition,
  PixelTransitionDemo,
  GooeyMenu,
  GooeyMenuItem,
  GooeyMenuDemo,
  DraggableCanvas,
  DraggableCanvasDemo,
  CardStack,
  CardStackDemo,
  KineticTypography,
  KineticTypographyDemo,
  FluidBackground,
  FluidBackgroundDemo,
  DirectionalHover,
  DirectionalHoverDemo,
  Odometer,
  OdometerDemo,
  FlipBoard,
  FlipBoardDemo,
  PhysicsDock,
  PhysicsDockDemo,
  PhysicsDockJellyDemo,
  PhysicsDockBlocksDemo,
  ShaderImage,
  ShaderImageDemo,
  CyberTerminalDemo,
  BreathingText,
  BreathingTextDemo,
  AudioVisualizer3DDemo,
  PhysicsCanvasDemo,
  AnimatedCircularProgress,
  AnimatedCircularProgressDemo,
  MagneticGallery,
  MagneticGalleryDemo,
  AudioVisualizer,
  AccordionDemo,
  AlertDemo,
  BadgeDemo,
  TabsDemo,
  TextareaDemo,
  SelectDemo,
  InputDemo,
  CheckboxDemo,
  CardDemo,
  ButtonDemo,
  TeamSectionDemo,
  LoaderDemo,
  HorizontalScrollDemo,
  BreadcrumbDemo,
  DropdownDemo,
  EmptyStateDemo,
  FilterDemo,
  PaginationDemo,
  DialogDemo,
  TimelineDemo,
  ToastDemo,
  SwitchDemo,
  CartDemo,
  CtaSectionDemo,
  FaqSectionDemo,
  LiquidDistortionDemo,
  InteractiveFluidDemo,
  ScratchToRevealDemo,
  ScrollVelocityTextDemo,
  StickyImageMaskDemo,
  ParallaxDepthCardsDemo,
  RefractionCursorDemo,
  VideoPortalDemo,
  ElasticSidebarDemo,
  TextSplitRevealDemo,
  CircularTextDemo,
  HorizontalScrollPinDemo,
  ParticleTextDemo,
  CoverFlowCarouselDemo,
  CinematicPreloaderDemo,
  ScrollVideoScrubDemo,
  TunnelScrollDemo,
  SwipeableStackDemo,
  SVGLiquidDistortionDemo,
  AsciiRendererDemo,
  MagnifyingGlassDemo,
  DynamicIslandDemo,
  GlassTabsDemo,
  WebGLGalleryDemo,
  MinimapDemo,
  AIStreamWrapperDemo,
  ForceGraphDemo,
  FlashlightRevealDemo,
  ImageAccordionDemo,
  Interactive3DModelDemo,
  LiquidFluidShaderDemo,
  ParticleSystemDemo,
  StickySequenceDemo,
  ScrollDrivenPathDemo,
  GenerativeUIChatDemo,
  AICommandPaletteDemo,
  HorizontalScrollHijackDemo,
  StickyStackingCardsDemo,
  TextMaskVideoRevealDemo,
  FluidDistortionGalleryDemo,
  InteractiveParticleSwarmDemo,
  AudioReactiveVisualizerDemo,
  SmoothScrollDemo,
  NoiseOverlayDemo,
  ScrollRevealDemo,
  SmartNavbarDemo,
  AnimatedCounterDemo,
  SplitScreenLayoutDemo,
  MasonryGridDemo,
  BrokenGridDemo,
  ScrollLinkedSplitDemo,
  Globe,
  GlobeDemo,
  LogoMarquee,
  LogoMarqueeDemo,
  DateRangePicker,
  DatePicker,
  FileUpload,
  FileUploadDemo,
  MultiSelect,
  MultiSelectDemo,
  ChartContainer,
  ChartTooltipContent,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  ChartDemo,
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  ArrowRight,
  code: (props: any) => {
    // Basic code highlighting for inline or small blocks
    if (typeof props.children === 'string' && props.className) {
       return <CodeHighlight code={props.children} lang={props.className.replace('language-', '')} />
     }
    return <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono" {...props} />;
  },
  pre: (props: any) => <>{props.children}</>, // Shiki handles the pre/code structure
  table: (props: any) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full text-left text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="border-b border-border bg-muted/40" {...props} />,
  tbody: (props: any) => <tbody className="divide-y divide-border" {...props} />,
  tr: (props: any) => <tr className="hover:bg-muted/20 transition-colors" {...props} />,
  th: (props: any) => <th className="px-4 py-3 font-semibold text-zinc-200" {...props} />,
  td: (props: any) => <td className="px-4 py-3 align-top text-zinc-400 leading-relaxed" {...props} />,
  h1: (props: any) => <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-4xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
  h2: (props: any) => <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-semibold mt-10 mb-4 tracking-tight border-b border-border pb-2 text-white" {...props} />,
  h3: (props: any) => <h3 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-medium mt-8 mb-3 tracking-tight text-white" {...props} />,
  p: (props: any) => <p className="text-zinc-400 leading-relaxed mb-4 text-base font-light" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 text-zinc-400 space-y-2 text-sm font-light" {...props} />,
  a: (props: any) => <a className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300 transition-colors" {...props} />,
};

export async function generateStaticParams() {
  const slugs = getComponentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ComponentPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const doc = getComponentDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  // Load registry to find dependencies
  let dependencies: string[] = [];
  try {
    const registryPath = path.join(process.cwd(), 'registry', 'components.json');
    const registryContent = fs.readFileSync(registryPath, 'utf-8');
    const registry = JSON.parse(registryContent);
    
    // Find the item matching slug in any category
    for (const catKey of Object.keys(registry)) {
      const category = registry[catKey];
      if (category.items && category.items[slug]) {
        dependencies = category.items[slug].dependencies || [];
        break;
      }
    }
  } catch (e) {
    console.error('Error reading registry/components.json', e);
  }

  const customMdxComponents = {
    ...mdxComponents,
    ComponentPreview: (previewProps: any) => {
      const code = previewProps.code || doc.code;
      // Auto-inject sourceCode if sourceFile prop is provided
      let sourceCode = previewProps.sourceCode;
      if (previewProps.sourceFile && !sourceCode) {
        try {
          const fullPath = path.join(process.cwd(), previewProps.sourceFile);
          sourceCode = fs.readFileSync(fullPath, 'utf-8');
        } catch (e) {
          sourceCode = '// Source file not found: ' + previewProps.sourceFile;
        }
      }
      return (
        <ComponentPreview
          {...previewProps}
          slug={slug}
          dependencies={dependencies}
          code={code}
          sourceCode={sourceCode}
        />
      );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <Link href="/docs" className="text-xs text-zinc-500 hover:text-white flex items-center gap-2 w-fit mb-8 transition-colors">
          <ArrowRight className="h-4 w-4 rotate-180" /> Back to Introduction
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
            {doc.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">{doc.title}</h1>
        <p className="text-base text-zinc-400 font-light max-w-2xl leading-relaxed">{doc.description}</p>
      </div>

      <DocsPageClient slug={slug} title={doc.title} category={doc.category}>
        <MDXRemote 
          source={doc.content} 
          components={customMdxComponents}
          options={{
            // @ts-ignore
            blockJS: false,
            // @ts-ignore
            blockDangerousJS: true
          }}
        />
      </DocsPageClient>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = getComponentSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}
