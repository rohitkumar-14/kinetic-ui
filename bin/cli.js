#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const args = process.argv.slice(2);

if (args.length === 0 || args[0] !== 'add') {
  console.log("Usage: npx @kinetic/cli add <component-name>");
  process.exit(1);
}

const componentName = args[1];
if (!componentName) {
  console.log(
    "Please specify a component name. Example: npx @kinetic/cli add smooth-scroll",
  );
  process.exit(1);
}

// For demo purposes, we will fetch from the local registry. 
// In production, this would be `fetch('https://your-domain.com/registry.json')`
const REGISTRY_PATH = path.join(process.cwd(), 'public', 'registry.json');
let registry = [];
try {
  registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
} catch (error) {
  console.error('Could not find local registry.json for demo.', error.message);
  process.exit(1);
}

const component = registry.find(c => c.name === componentName);

if (!component) {
  console.error(`Component '${componentName}' not found in registry.`);
  process.exit(1);
}

console.log(`Installing ${component.name}...`);

// Ensure target directory exists
const targetDir = path.join(process.cwd(), 'components', 'creative');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Write files
component.files.forEach(file => {
  const filePath = path.join(targetDir, file.name);
  fs.writeFileSync(filePath, file.content);
  console.log(`Created ${filePath}`);
});

// Install dependencies
if (component.dependencies && component.dependencies.length > 0) {
  console.log(`Installing dependencies: ${component.dependencies.join(', ')}`);
  try {
    execSync(`npm install ${component.dependencies.join(' ')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to install dependencies.');
  }
}

if (component.registryDependencies && component.registryDependencies.length > 0) {
  console.log(`\nNote: This component also requires internal UI components: ${component.registryDependencies.join(', ')}`);
  console.log('Make sure they are installed in your project!');
}

console.log(`\nSuccessfully installed ${component.name}! 🚀`);
