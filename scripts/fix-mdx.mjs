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

missingComponents.forEach(({ name, slug }) => {
  const mdxPath = path.join(mdxDir, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    let content = fs.readFileSync(mdxPath, 'utf8');
    // Replace kebab-case name with PascalCase name
    content = content.replace(`name="${slug}-demo"`, `name="${name}Demo"`);
    fs.writeFileSync(mdxPath, content);
    console.log(`Updated ${slug}.mdx`);
  }
});
