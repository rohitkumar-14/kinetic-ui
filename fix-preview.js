const fs = require('fs');
const path = require('path');
const mdxDir = path.join(process.cwd(), 'content', 'components');
const files = fs.readdirSync(mdxDir);

let imports = '';
let maps = '';

files.forEach(f => {
  if (!f.endsWith('.mdx')) return;
  const slug = f.replace('.mdx', '');
  const content = fs.readFileSync(path.join(mdxDir, f), 'utf8');
  
  // Find componentName="Something"
  const match = content.match(/<ComponentPreview[^>]*componentName=["']([^"']+)["']/);
  if (match) {
    const componentName = match[1];
    const demoName = componentName + 'Demo';
    
    // try to find the import in app/docs/components/[slug]/page.tsx
    const docs = fs.readFileSync('app/docs/components/[slug]/page.tsx', 'utf8');
    const importMatch = docs.match(new RegExp('import \\{? ' + demoName + ' \\}? from .*'));
    
    if (importMatch) {
      imports += importMatch[0] + '\n';
      maps += '  \'' + slug + '\': ' + demoName + ',\n';
    } else {
       // fallback search for default export
       const importMatch2 = docs.match(new RegExp('import ' + demoName + ' from .*'));
       if (importMatch2) {
         imports += importMatch2[0] + '\n';
         maps += '  \'' + slug + '\': ' + demoName + ',\n';
       }
    }
  }
});

let preview = fs.readFileSync('app/preview/[slug]/page.tsx', 'utf8');

// Remove all existing imports from components/creative/docs
preview = preview.replace(/import \{? [a-zA-Z0-9_]+ \}? from '@\/components\/creative\/docs\/[^']+';\n/g, '');

// Replace the mdxComponents object
preview = preview.replace(/const mdxComponents: Record<string, any> = \{[\s\S]*?\};/, 'const mdxComponents: Record<string, any> = {\n' + maps + '};');

// Add the fresh imports at the top
preview = imports + '\n' + preview;

fs.writeFileSync('app/preview/[slug]/page.tsx', preview);
console.log('Successfully fixed preview page mappings!');
