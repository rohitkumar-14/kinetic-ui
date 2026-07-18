import fs from 'fs';
import path from 'path';

const mdxDir = path.join(process.cwd(), 'content', 'components');

const templates = {
  'raymarching-clouds': `---
title: "Raymarching Clouds"
description: "A gorgeous, cinematic WebGL raymarching volumetric cloud shader."
category: "3D & WebGL"
---

The \`RaymarchingClouds\` component uses raw GLSL raymarching to render hyper-realistic, volumetric clouds in real-time. It provides deep atmosphere scattering and beautiful sun flares.

## Live Preview

<ComponentPreview 
  name="Raymarching Clouds" 
  componentName="RaymarchingClouds"
  sourceFile="components/creative/raymarching-clouds.tsx"
  playgroundControls={[
    {
      name: "speed",
      label: "Cloud Speed",
      type: "number",
      min: 0,
      max: 5,
      step: 0.1,
      default: 1.0
    }
  ]}
  propsData={[
    { name: "speed", type: "number", default: "1.0", description: "Speed of cloud movement" }
  ]}
>
  <RaymarchingCloudsDemo />
</ComponentPreview>

## Installation

<CliInstallCommand name="raymarching-clouds" />
`,

  'webcam-shader-portal': `---
title: "Webcam Shader Portal"
description: "Real-time WebGL shader pipeline applied directly to the user's webcam feed."
category: "Real-time & Media"
---

The \`WebcamShaderPortal\` requests camera permissions and immediately processes the video stream through custom GLSL fragment shaders. Perfect for 'Matrix' or 'Glitch' interactive experiences.

## Live Preview

<ComponentPreview 
  name="Webcam Shader Portal" 
  componentName="WebcamShaderPortal"
  sourceFile="components/creative/webcam-shader-portal.tsx"
  playgroundControls={[
    {
      name: "variant",
      label: "Shader Effect",
      type: "select",
      options: ["default", "glitch", "matrix"],
      default: "default"
    }
  ]}
  propsData={[
    { name: "variant", type: "'default' | 'glitch' | 'matrix'", default: "'default'", description: "The active WebGL shader program" }
  ]}
>
  <WebcamShaderPortalDemo />
</ComponentPreview>

## Installation

<CliInstallCommand name="webcam-shader-portal" />
`,

  'falling-elements': `---
title: "Falling Elements"
description: "Physics-based rigid body simulation of UI elements falling onto the screen."
category: "Physics"
---

A playful physics sandbox using Matter.js to drop rigid bodies onto the screen.

## Live Preview

<ComponentPreview 
  name="Falling Elements" 
  componentName="FallingElements"
  sourceFile="components/creative/falling-elements.tsx"
  playgroundControls={[
    {
      name: "gravity",
      label: "Gravity",
      type: "number",
      min: 0,
      max: 3,
      step: 0.1,
      default: 1
    }
  ]}
>
  <FallingElementsDemo />
</ComponentPreview>

## Installation

<CliInstallCommand name="falling-elements" />
`,

  'multiplayer-cursor-ecosystem': `---
title: "Multiplayer Cursor Ecosystem"
description: "A highly optimized, Framer Motion-driven system for rendering real-time collaborative cursors."
category: "Real-time & Interaction"
---

Simulate a Figma-like multiplayer environment. Automatically interpolates position data using spring physics to ensure buttery smooth movement across the screen. Includes an AI 'Ghost Mode'.

## Live Preview

<ComponentPreview 
  name="Multiplayer Cursor Ecosystem" 
  componentName="MultiplayerCursorEcosystem"
  sourceFile="components/creative/multiplayer-cursor-ecosystem.tsx"
  playgroundControls={[
    {
      name: "ghostMode",
      label: "Enable Ghost AI",
      type: "boolean",
      default: true
    }
  ]}
>
  <MultiplayerCursorEcosystemDemo />
</ComponentPreview>

## Installation

<CliInstallCommand name="multiplayer-cursor-ecosystem" />
`,

  'infinite-zoom-canvas': `---
title: "Infinite Zoom Canvas"
description: "A massive, Miro/Figma style infinite canvas with gesture-driven panning and zooming."
category: "Gestures & Interaction"
---

Uses \`@use-gesture/react\` to provide 60fps pinch-to-zoom, middle-mouse panning, and trackpad scrolling across an infinite grid space.

## Live Preview

<ComponentPreview 
  name="Infinite Zoom Canvas" 
  componentName="InfiniteZoomCanvas"
  sourceFile="components/creative/infinite-zoom-canvas.tsx"
  playgroundControls={[
    {
      name: "showGrid",
      label: "Show Dot Grid",
      type: "boolean",
      default: true
    }
  ]}
>
  <InfiniteZoomCanvasDemo />
</ComponentPreview>

## Installation

<CliInstallCommand name="infinite-zoom-canvas" />
`
};

Object.keys(templates).forEach(slug => {
  const p = path.join(mdxDir, slug + '.mdx');
  fs.writeFileSync(p, templates[slug]);
  console.log('Overwrote ' + slug + '.mdx');
});
