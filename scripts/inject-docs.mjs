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

// Build imports
const importsToInject = missingComponents.map(c => 
  `import { ${c.name}Demo } from '@/components/creative/docs/${c.slug}-demo';`
).join('\n');

// Build map entries
const mapEntriesToInject = missingComponents.map(c => 
  `  ${c.name}Demo,`
).join('\n');

// 1. Inject imports right after the last import block
// Find the last import statement
const lastImportMatch = [...content.matchAll(/import .* from .*;/g)].pop();
if (lastImportMatch) {
  const index = lastImportMatch.index + lastImportMatch[0].length;
  content = content.slice(0, index) + '\n' + importsToInject + content.slice(index);
}

// 2. Inject map entries into the components = { ... } block
// We find the definition of const components = {
const mapIndex = content.indexOf('const components = {');
if (mapIndex !== -1) {
  const nextLineIndex = content.indexOf('\n', mapIndex) + 1;
  content = content.slice(0, nextLineIndex) + mapEntriesToInject + '\n' + content.slice(nextLineIndex);
}

fs.writeFileSync(pagePath, content);
console.log('Successfully updated page.tsx with imports and map entries.');
