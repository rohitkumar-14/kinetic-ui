import fs from 'fs';
import path from 'path';

const missingComponents = [
  { name: 'AnimatedPromptInput', slug: 'animated-prompt-input' },
  { name: 'StreamingMarkdownRenderer', slug: 'streaming-markdown-renderer' },
  { name: 'ThinkingVisualizer', slug: 'thinking-visualizer' },
  { name: 'ProductConfigurator', slug: 'product-configurator' },
  { name: 'RaymarchingClouds', slug: 'raymarching-clouds' },
  { name: 'FallingElements', slug: 'falling-elements' },
  { name: 'MicrophoneReactiveOrb', slug: 'microphone-reactive-orb' },
  { name: 'BeatSyncedTypography', slug: 'beat-synced-typography' },
  { name: 'WebcamShaderPortal', slug: 'webcam-shader-portal' },
  { name: 'MultiplayerCursorEcosystem', slug: 'multiplayer-cursor-ecosystem' },
  { name: 'InfiniteZoomCanvas', slug: 'infinite-zoom-canvas' }
];

const mdxDir = path.join(process.cwd(), 'content', 'components');
const demoDir = path.join(process.cwd(), 'components', 'creative', 'docs');

missingComponents.forEach(({ name, slug }) => {
  // 1. Generate MDX
  const mdxPath = path.join(mdxDir, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    const mdxContent = `---
title: "${name}"
description: "A highly interactive ${name} component."
---

<ComponentPreview name="${slug}-demo" />

## Installation

<CliInstallCommand name="${slug}" />

## Props

The component accepts standard HTML attributes along with specific configuration props. Check the source code for details.
`;
    fs.writeFileSync(mdxPath, mdxContent);
    console.log(`Created ${slug}.mdx`);
  }

  // 2. Generate Demo Wrapper
  const demoPath = path.join(demoDir, `${slug}-demo.tsx`);
  if (!fs.existsSync(demoPath)) {
    // Some components like InfiniteZoomCanvas require full height, so wrapper needs to be large
    const demoContent = `"use client";

import React from "react";
import { ${name} } from "@/components/creative/${slug}";

export function ${name}Demo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <${name} />
    </div>
  );
}
`;
    fs.writeFileSync(demoPath, demoContent);
    console.log(`Created ${slug}-demo.tsx`);
  }
});
