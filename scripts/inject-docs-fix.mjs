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

const pagePath = path.join(process.cwd(), 'app', 'docs', 'components', '[slug]', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const mapEntriesToInject = missingComponents.map(c => 
  `  ${c.name}Demo,`
).join('\n');

const mapIndex = content.indexOf('const mdxComponents = {');
if (mapIndex !== -1) {
  const nextLineIndex = content.indexOf('\n', mapIndex) + 1;
  content = content.slice(0, nextLineIndex) + mapEntriesToInject + '\n' + content.slice(nextLineIndex);
  fs.writeFileSync(pagePath, content);
  console.log('Successfully injected map entries into mdxComponents.');
} else {
  console.log('Failed to find mdxComponents map.');
}
