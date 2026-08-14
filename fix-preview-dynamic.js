const fs = require('fs');
const path = require('path');
const mdxDir = path.join(process.cwd(), 'content', 'components');
const files = fs.readdirSync(mdxDir);

let maps = '';
let imports = [];

files.forEach(f => {
  if (!f.endsWith('.mdx')) return;
  const slug = f.replace('.mdx', '');
  const content = fs.readFileSync(path.join(mdxDir, f), 'utf8');
  
  // Find <ComponentPreview> ... <DemoComponent /> ... </ComponentPreview>
  // The actual demo component is usually the only React component without props inside ComponentPreview
  const match = content.match(/<ComponentPreview[^>]*>[\s\S]*?<([A-Z][a-zA-Z0-9_]+Demo)\s*\/?>(?:[\s\S]*?<\/ComponentPreview>)?/);
  
  if (match) {
    const demoName = match[1];
    
    // search for import in app/docs/components/[slug]/page.tsx
    const docs = fs.readFileSync('app/docs/components/[slug]/page.tsx', 'utf8');
    const importMatch = docs.match(new RegExp('import \\{? ' + demoName + ' \\}? from .*'));
    
    if (importMatch) {
      imports.push(importMatch[0]);
      maps += '  \'' + slug + '\': ' + demoName + ',\n';
    } else {
       const importMatch2 = docs.match(new RegExp('import ' + demoName + ' from .*'));
       if (importMatch2) {
         imports.push(importMatch2[0]);
         maps += '  \'' + slug + '\': ' + demoName + ',\n';
       }
    }
  } else {
    // fallback to componentName
    const match2 = content.match(/<ComponentPreview[^>]*componentName=["']([^"']+)["']/);
    if (match2) {
      const demoName = match2[1] + 'Demo';
      const docs = fs.readFileSync('app/docs/components/[slug]/page.tsx', 'utf8');
      const importMatch = docs.match(new RegExp('import \\{? ' + demoName + ' \\}? from .*'));
      
      if (importMatch) {
        imports.push(importMatch[0]);
        maps += '  \'' + slug + '\': ' + demoName + ',\n';
      }
    }
  }
});

// Deduplicate imports robustly
const uniqueImports = Array.from(new Set(imports));

let preview = fs.readFileSync('app/preview/[slug]/page.tsx', 'utf8');

// Remove existing imports from components/creative/docs
preview = preview.replace(/import \{? [a-zA-Z0-9_]+ \}? from '@\/components\/creative\/docs\/[^']+';\n/g, '');

// Replace the mdxComponents object
preview = preview.replace(/const mdxComponents: Record<string, any> = \{[\s\S]*?\};/, 'const mdxComponents: Record<string, any> = {\n' + maps + '};');

// Add the fresh unique imports at the top
preview = uniqueImports.join('\n') + '\n\n' + preview;

fs.writeFileSync('app/preview/[slug]/page.tsx', preview);
console.log('Fixed previews dynamically!');
