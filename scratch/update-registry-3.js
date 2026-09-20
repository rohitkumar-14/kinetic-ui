const fs = require('fs');
const path = require('path');

const newComponents = [
  { slug: 'cube-image-gallery', name: 'CubeImageGallery', deps: ['framer-motion-3d', 'three', '@react-three/fiber', '@react-three/drei'] },
];

const registryPath = path.join(process.cwd(), 'registry', 'components.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

for (const comp of newComponents) {
  registry['creative'].items[comp.slug] = {
    name: comp.name,
    description: `Advanced ${comp.name} component.`,
    dependencies: comp.deps,
    files: [
      `components/creative/${comp.slug}.tsx`
    ]
  };
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
console.log('Successfully updated registry/components.json');
