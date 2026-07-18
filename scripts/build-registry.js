const fs = require('fs');
const path = require('path');

async function buildRegistry() {
  console.log('Building components registry...');

  try {
    const registryPath = path.join(process.cwd(), 'registry', 'components.json');
    const registryContent = fs.readFileSync(registryPath, 'utf8');
    const categoriesRegistry = JSON.parse(registryContent);

    const result = {};

    // Flatten category items to support backwards-compatible CLI and search operations
    for (const [catKey, category] of Object.entries(categoriesRegistry)) {
      for (const [slug, item] of Object.entries(category.items)) {
        result[slug] = {
          name: slug,
          title: item.name,
          category: category.name,
          dependencies: item.dependencies || [],
          files: item.files.map((filePath) => {
            try {
              const fullPath = path.join(process.cwd(), filePath);
              const content = fs.readFileSync(fullPath, 'utf8');
              return {
                path: filePath,
                content
              };
            } catch (e) {
              console.error(`Error reading ${filePath}:`, e);
              return { path: filePath, content: `// Error loading component source` };
            }
          })
        };
      }
    }

    // Write to public folder
    const publicPath = path.join(process.cwd(), 'public');
    fs.mkdirSync(publicPath, { recursive: true });
    const outputPath = path.join(publicPath, 'registry.json');
    
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    
    console.log(`✅ Registry successfully generated at public/registry.json`);
    console.log(`Total components: ${Object.keys(result).length}`);
  } catch (err) {
    console.error('Failed to construct components registry payload:', err);
    process.exit(1);
  }
}

buildRegistry();
