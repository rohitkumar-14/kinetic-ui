const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('app/preview/[slug]/page.tsx', 'utf8');

// Use a proper parser or just aggressively clear all imports and rewrite
const lines = content.split('\n');
const otherLines = [];

lines.forEach(line => {
  if (line.trim().startsWith('import ') && line.includes('@/components/creative/docs')) {
    // skip
  } else {
    otherLines.push(line);
  }
});

// Now we need to recreate the imports from all MDX files
const mdxDir = path.join(process.cwd(), 'content', 'components');
const files = fs.readdirSync(mdxDir);

let maps = '';
let imports = new Set();
let errorLog = '';

files.forEach(f => {
  if (!f.endsWith('.mdx')) return;
  const slug = f.replace('.mdx', '');
  const mdxContent = fs.readFileSync(path.join(mdxDir, f), 'utf8');
  
  const match = mdxContent.match(/<ComponentPreview[^>]*>[\s\S]*?<([A-Z][a-zA-Z0-9_]+Demo)\s*\/?>(?:[\s\S]*?<\/ComponentPreview>)?/);
  let demoName = null;
  
  if (match) {
    demoName = match[1];
  } else {
    const match2 = mdxContent.match(/<ComponentPreview[^>]*componentName=["']([^"']+)["']/);
    if (match2) {
      demoName = match2[1] + 'Demo';
    }
  }

  if (demoName) {
    const docs = fs.readFileSync('app/docs/components/[slug]/page.tsx', 'utf8');
    const importMatch = docs.match(new RegExp('import \\{? ' + demoName + ' \\}? from .*'));
    if (importMatch) {
      imports.add(importMatch[0]);
      maps += '  \'' + slug + '\': ' + demoName + ',\n';
    } else {
       const importMatch2 = docs.match(new RegExp('import ' + demoName + ' from .*'));
       if (importMatch2) {
         imports.add(importMatch2[0]);
         maps += '  \'' + slug + '\': ' + demoName + ',\n';
       } else {
         errorLog += 'Could not find import for ' + demoName + ' (slug: ' + slug + ')\n';
       }
    }
  }
});

let newContent = Array.from(imports).join('\n') + '\n\n' + otherLines.join('\n');
newContent = newContent.replace(/const mdxComponents: Record<string, any> = \{[\s\S]*?\};/, 'const mdxComponents: Record<string, any> = {\n' + maps + '};');

fs.writeFileSync('app/preview/[slug]/page.tsx', newContent);
console.log('Successfully recreated everything without duplicates!');
if (errorLog) console.log('ERRORS:', errorLog);
