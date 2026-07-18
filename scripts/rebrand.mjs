import fs from 'fs';
import path from 'path';

const dirs = [
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'components'),
  path.join(process.cwd(), 'content'),
];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  // Case sensitive replacements
  newContent = newContent.replace(/Antigravity/g, 'Kinetic');
  newContent = newContent.replace(/antigravity/g, 'kinetic');
  newContent = newContent.replace(/ANTIGRAVITY/g, 'KINETIC');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Rebranded: ' + filePath);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.mdx')) {
      processFile(fullPath);
    }
  }
}

dirs.forEach(traverseDir);
console.log('Rebranding complete.');
