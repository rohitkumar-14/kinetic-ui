import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const CREATIVE_DIR = path.join(ROOT_DIR, 'components', 'creative');
const REGISTRY_PATH = path.join(ROOT_DIR, 'public', 'registry.json');

// Helper to extract dependencies from file content
function extractDependencies(content) {
  const dependencies = new Set();
  const registryDependencies = new Set();

  // Basic regex to find imports
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    if (importPath.startsWith('lucide-react') || importPath.startsWith('framer-motion') || importPath.startsWith('lenis') || importPath.startsWith('clsx') || importPath.startsWith('tailwind-merge') || importPath.startsWith('zod') || importPath.startsWith('react-hook-form')) {
      // 3rd party deps
      dependencies.add(importPath.split('/')[0]); // get package name
    } else if (importPath.startsWith('@/components/ui/')) {
      // UI dependencies (shadcn style)
      const compName = importPath.split('/').pop();
      registryDependencies.add(compName);
    } else if (importPath.startsWith('@/components/creative/')) {
      // Internal creative dependencies
      const compName = importPath.split('/').pop();
      // Only add if it's not a docs import
      if (!importPath.includes('/docs/')) {
        registryDependencies.add(compName);
      }
    }
  }

  // Common UI deps that might be implied
  if (content.includes('cn(')) {
    dependencies.add('clsx');
    dependencies.add('tailwind-merge');
  }

  return {
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies)
  };
}

async function buildRegistry() {
  console.log('Building component registry...');
  
  const registry = [];
  
  // Read all files in creative dir
  const files = fs.readdirSync(CREATIVE_DIR);
  
  for (const file of files) {
    // Skip directories (like docs, assets)
    const filePath = path.join(CREATIVE_DIR, file);
    if (fs.statSync(filePath).isDirectory() || !file.endsWith('.tsx')) {
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const name = file.replace('.tsx', '');
    
    const { dependencies, registryDependencies } = extractDependencies(content);
    
    registry.push({
      name,
      type: "components:creative",
      dependencies,
      registryDependencies,
      files: [
        {
          name: file,
          content
        }
      ]
    });
  }
  
  // Write the registry
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`Successfully built registry.json with ${registry.length} components!`);
}

buildRegistry().catch(console.error);
