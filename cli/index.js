#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');
const http = require('http'); 
const REGISTRY_URL = process.env.REGISTRY_URL || 'https://kinetiic-ui.netlify.app/registry.json';

// Helper to fetch JSON from our Next.js API
async function fetchRegistry() {
  if (!REGISTRY_URL.startsWith('http://') && !REGISTRY_URL.startsWith('https://')) {
    try {
      const localData = fs.readFileSync(REGISTRY_URL, 'utf-8');
      return JSON.parse(localData);
    } catch (err) {
      throw new Error(`Failed to read local registry file at ${REGISTRY_URL}: ${err.message}`);
    }
  }

  return new Promise((resolve, reject) => {
    const client = REGISTRY_URL.startsWith('http://') ? http : https;
    client.get(REGISTRY_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse registry. Make sure the registry is available at ${REGISTRY_URL}.`));
        }
      });
    }).on('error', (err) => {
      reject(new Error(`Failed to fetch registry: ${err.message}. Is ${REGISTRY_URL} accessible?`));
    });
  });
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function blend(c1, c2, weight) {
  const rgb1 = hexToRgb(c1) || {r:0, g:0, b:0};
  const rgb2 = hexToRgb(c2) || {r:255, g:255, b:255};
  const r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight);
  const g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight);
  const b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight);
  return rgbToHex(r, g, b);
}

function getBrightness(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

function getThemeCss(themeOption, customPrimary, customBg) {
  if (themeOption === 'default') {
    return `
/* ═══════════════════════════════════════════════════════════════
   Kinetic UI — Design Tokens (CSS Variables)
   ═══════════════════════════════════════════════════════════════ */
:root {
  --background: #ffffff;
  --foreground: #020617;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --popover: #ffffff;
  --popover-foreground: #020617;
  --card: #ffffff;
  --card-foreground: #020617;
  --primary: #0f172a;
  --primary-foreground: #f8fafc;
  --secondary: #f1f5f9;
  --secondary-foreground: #0f172a;
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;
  --destructive: #ef4444;
  --destructive-foreground: #f8fafc;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #0f172a;
}

.dark {
  --background: #000000;
  --foreground: #ededed;
  --muted: #111111;
  --muted-foreground: #a1a1aa;
  --popover: #0a0a0a;
  --popover-foreground: #ededed;
  --card: #0a0a0a;
  --card-foreground: #ededed;
  --primary: #ededed;
  --primary-foreground: #000000;
  --secondary: #111111;
  --secondary-foreground: #ededed;
  --accent: #111111;
  --accent-foreground: #ededed;
  --destructive: #7f1d1d;
  --destructive-foreground: #ededed;
  --border: #222222;
  --input: #222222;
  --ring: #d4d4d8;
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
`;
  }

  if (themeOption === 'cyberpunk') {
    return `
/* ═══════════════════════════════════════════════════════════════
   Kinetic UI — Design Tokens (CSS Variables) - Cyberpunk Theme
   ═══════════════════════════════════════════════════════════════ */
:root {
  --background: #ffffff;
  --foreground: #09090b;
  --muted: #f3e8ff;
  --muted-foreground: #6b21a8;
  --popover: #ffffff;
  --popover-foreground: #09090b;
  --card: #ffffff;
  --card-foreground: #09090b;
  --primary: #7c3aed;
  --primary-foreground: #ffffff;
  --secondary: #f3e8ff;
  --secondary-foreground: #7c3aed;
  --accent: #06b6d4;
  --accent-foreground: #ffffff;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e9d5ff;
  --input: #e9d5ff;
  --ring: #7c3aed;
}

.dark {
  --background: #03001e;
  --foreground: #f5f3ff;
  --muted: #140526;
  --muted-foreground: #a21caf;
  --popover: #0a0518;
  --popover-foreground: #f5f3ff;
  --card: #0a0518;
  --card-foreground: #f5f3ff;
  --primary: #d946ef;
  --primary-foreground: #03001e;
  --secondary: #1a0933;
  --secondary-foreground: #d946ef;
  --accent: #00f5ff;
  --accent-foreground: #03001e;
  --destructive: #9f1239;
  --destructive-foreground: #f5f3ff;
  --border: #2a1b4e;
  --input: #2a1b4e;
  --ring: #d946ef;
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
`;
  }

  if (themeOption === 'aurora') {
    return `
/* ═══════════════════════════════════════════════════════════════
   Kinetic UI — Design Tokens (CSS Variables) - Aurora Theme
   ═══════════════════════════════════════════════════════════════ */
:root {
  --background: #ffffff;
  --foreground: #064e3b;
  --muted: #e6fcf5;
  --muted-foreground: #047857;
  --popover: #ffffff;
  --popover-foreground: #064e3b;
  --card: #ffffff;
  --card-foreground: #064e3b;
  --primary: #059669;
  --primary-foreground: #ffffff;
  --secondary: #d1fae5;
  --secondary-foreground: #065f46;
  --accent: #10b981;
  --accent-foreground: #ffffff;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #a7f3d0;
  --input: #a7f3d0;
  --ring: #059669;
}

.dark {
  --background: #022c22;
  --foreground: #ecfdf5;
  --muted: #033f31;
  --muted-foreground: #059669;
  --popover: #023528;
  --popover-foreground: #ecfdf5;
  --card: #023528;
  --card-foreground: #ecfdf5;
  --primary: #34d399;
  --primary-foreground: #022c22;
  --secondary: #064e3b;
  --secondary-foreground: #34d399;
  --accent: #fbbf24;
  --accent-foreground: #022c22;
  --destructive: #9f1239;
  --destructive-foreground: #ecfdf5;
  --border: #065f46;
  --input: #065f46;
  --ring: #34d399;
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
`;
  }

  if (themeOption === 'rust') {
    return `
/* ═══════════════════════════════════════════════════════════════
   Kinetic UI — Design Tokens (CSS Variables) - Amber Rust Theme
   ═══════════════════════════════════════════════════════════════ */
:root {
  --background: #ffffff;
  --foreground: #451a03;
  --muted: #fffbeb;
  --muted-foreground: #b45309;
  --popover: #ffffff;
  --popover-foreground: #451a03;
  --card: #ffffff;
  --card-foreground: #451a03;
  --primary: #d97706;
  --primary-foreground: #ffffff;
  --secondary: #fef3c7;
  --secondary-foreground: #78350f;
  --accent: #f59e0b;
  --accent-foreground: #ffffff;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #fde68a;
  --input: #fde68a;
  --ring: #d97706;
}

.dark {
  --background: #1c1917;
  --foreground: #fafaf9;
  --muted: #292524;
  --muted-foreground: #d97706;
  --popover: #221f1d;
  --popover-foreground: #fafaf9;
  --card: #221f1d;
  --card-foreground: #fafaf9;
  --primary: #f59e0b;
  --primary-foreground: #1c1917;
  --secondary: #292524;
  --secondary-foreground: #f59e0b;
  --accent: #ea580c;
  --accent-foreground: #ffffff;
  --destructive: #9f1239;
  --destructive-foreground: #fafaf9;
  --border: #3c3633;
  --input: #3c3633;
  --ring: #f59e0b;
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
`;
  }

  if (themeOption === 'custom') {
    const pri = customPrimary || '#6366f1';
    const bg = customBg || '#09090b';

    const darkBg = bg;
    const darkFg = '#fafaf9';
    const darkBorder = blend(darkBg, '#ffffff', 0.12);
    const darkCard = blend(darkBg, '#ffffff', 0.06);
    const darkMuted = blend(darkBg, '#ffffff', 0.08);
    const darkPrimary = pri;
    const darkPrimaryFg = getBrightness(pri) > 130 ? '#000000' : '#ffffff';
    const darkSecondary = blend(darkBg, '#ffffff', 0.08);
    const darkSecondaryFg = '#ffffff';

    const lightBg = '#ffffff';
    const lightFg = blend(pri, '#000000', 0.85);
    const lightBorder = blend(pri, '#ffffff', 0.85);
    const lightCard = '#ffffff';
    const lightMuted = blend(pri, '#ffffff', 0.93);
    const lightPrimary = pri;
    const lightPrimaryFg = darkPrimaryFg;
    const lightSecondary = blend(pri, '#ffffff', 0.9);
    const lightSecondaryFg = pri;

    return `
/* ═══════════════════════════════════════════════════════════════
   Kinetic UI — Design Tokens (CSS Variables) - Custom Theme
   ═══════════════════════════════════════════════════════════════ */
:root {
  --background: ${lightBg};
  --foreground: ${lightFg};
  --muted: ${lightMuted};
  --muted-foreground: ${blend(pri, '#000000', 0.6)};
  --popover: ${lightBg};
  --popover-foreground: ${lightFg};
  --card: ${lightCard};
  --card-foreground: ${lightFg};
  --primary: ${lightPrimary};
  --primary-foreground: ${lightPrimaryFg};
  --secondary: ${lightSecondary};
  --secondary-foreground: ${lightSecondaryFg};
  --accent: ${lightSecondary};
  --accent-foreground: ${lightSecondaryFg};
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: ${lightBorder};
  --input: ${lightBorder};
  --ring: ${lightPrimary};
}

.dark {
  --background: ${darkBg};
  --foreground: ${darkFg};
  --muted: ${darkMuted};
  --muted-foreground: ${blend(pri, '#ffffff', 0.7)};
  --popover: ${darkCard};
  --popover-foreground: ${darkFg};
  --card: ${darkCard};
  --card-foreground: ${darkFg};
  --primary: ${darkPrimary};
  --primary-foreground: ${darkPrimaryFg};
  --secondary: ${darkSecondary};
  --secondary-foreground: ${darkSecondaryFg};
  --accent: ${darkSecondary};
  --accent-foreground: ${darkSecondaryFg};
  --destructive: #7f1d1d;
  --destructive-foreground: ${darkFg};
  --border: ${darkBorder};
  --input: ${darkBorder};
  --ring: ${darkPrimary};
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
`;
  }
}

// ── Tailwind config content ─────────────────────────────────────────────────
const TAILWIND_CONFIG_CONTENT = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
    },
  },
  plugins: [],
};
`;

program
  .name('kinetic-ui')
  .description('CLI to add Kinetic UI components to your project')
  .version('1.1.0');

program
  .command('init')
  .description('initialize your project with Kinetic UI design tokens and dependencies')
  .action(async () => {
    console.log(chalk.bold.blue('\n✨ Initializing Kinetic UI\n'));

    // Auto-detect the CSS file path
    let defaultCssPath = 'src/index.css';
    if (fs.existsSync(path.join(process.cwd(), 'app/globals.css'))) {
      defaultCssPath = 'app/globals.css';
    } else if (fs.existsSync(path.join(process.cwd(), 'src/index.css'))) {
      defaultCssPath = 'src/index.css';
    } else if (fs.existsSync(path.join(process.cwd(), 'styles/globals.css'))) {
      defaultCssPath = 'styles/globals.css';
    }

    const response = await prompts([
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Would you like to use TypeScript (recommended)?',
        initial: true
      },
      {
        type: 'text',
        name: 'globalCss',
        message: 'Where is your global CSS file?',
        initial: defaultCssPath
      },
      {
        type: 'text',
        name: 'componentAlias',
        message: 'Configure the import alias for components:',
        initial: '@/components'
      },
      {
        type: 'text',
        name: 'utilsAlias',
        message: 'Configure the import alias for utils:',
        initial: '@/lib/utils'
      },
      {
        type: 'select',
        name: 'themeOption',
        message: 'Choose a design token theme:',
        choices: [
          { title: 'Default Slate (Clean & Modern)', value: 'default' },
          { title: 'Cyberpunk Neon (Vibrant Pink/Cyan/Purple)', value: 'cyberpunk' },
          { title: 'Aurora Emerald (Deep Forest & Mint)', value: 'aurora' },
          { title: 'Amber Rust (Warm Charcoal & Amber)', value: 'rust' },
          { title: 'Custom Theme (Enter your own colors)', value: 'custom' }
        ],
        initial: 0
      },
      {
        type: (prev, values) => values.themeOption === 'custom' ? 'text' : null,
        name: 'customPrimary',
        message: 'Enter your primary brand color (hex, e.g. #6366f1):',
        initial: '#6366f1',
        validate: val => /^#[0-9a-fA-F]{6}$/.test(val) ? true : 'Please enter a valid 6-character hex code starting with #'
      },
      {
        type: (prev, values) => values.themeOption === 'custom' ? 'text' : null,
        name: 'customBg',
        message: 'Enter your dark background color (hex, e.g. #09090b):',
        initial: '#09090b',
        validate: val => /^#[0-9a-fA-F]{6}$/.test(val) ? true : 'Please enter a valid 6-character hex code starting with #'
      }
    ]);

    // Handle cancellation
    if (!response.utilsAlias || response.themeOption === undefined || (response.themeOption === 'custom' && (!response.customPrimary || !response.customBg))) {
      console.log(chalk.yellow('\nInitialization cancelled.'));
      process.exit(0);
    }

    const spinner = ora('Initializing project...').start();

    try {
      // 1. Write components.json
      const configPath = path.join(process.cwd(), 'components.json');
      const config = {
        style: 'default',
        typescript: response.typescript,
        tailwind: {
          config: 'tailwind.config.js',
          css: response.globalCss,
          baseColor: 'slate',
          cssVariables: true
        },
        aliases: {
          components: response.componentAlias,
          utils: response.utilsAlias
        }
      };
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
      console.log(`\n${chalk.green('CREATED')} components.json`);

      // 2. Install dependencies
      spinner.text = 'Installing dependencies...';
      const deps = ['clsx', 'tailwind-merge', 'lucide-react', 'class-variance-authority', 'tailwindcss', 'postcss', 'autoprefixer'];
      // Use ignore to not spam the console
      execSync(`npm install ${deps.join(' ')}`, { stdio: 'ignore' });
      console.log(`${chalk.green('INSTALLED')} ${deps.join(', ')}`);

      // 3. Create utils file
      spinner.text = 'Creating utils file...';
      let utilsPathStr = response.utilsAlias;
      if (utilsPathStr.startsWith('@/') || utilsPathStr.startsWith('~/')) {
        const baseDir = utilsPathStr.substring(2);
        const hasSrcDir = fs.existsSync(path.join(process.cwd(), 'src'));
        utilsPathStr = hasSrcDir ? `src/${baseDir}` : baseDir;
      }
      
      const ext = response.typescript ? '.ts' : '.js';
      const fullUtilsPath = path.join(process.cwd(), utilsPathStr + ext);
      
      fs.ensureDirSync(path.dirname(fullUtilsPath));
      
      const utilsContentTs = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

      const utilsContentJs = `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`;

      fs.writeFileSync(fullUtilsPath, response.typescript ? utilsContentTs : utilsContentJs, 'utf8');
      console.log(`${chalk.green('CREATED')} ${utilsPathStr}${ext}`);

      // 4. Inject CSS variables into global CSS file
      spinner.text = 'Injecting Kinetic UI design tokens...';
      const cssFilePath = path.join(process.cwd(), response.globalCss);
      fs.ensureDirSync(path.dirname(cssFilePath));

      let existingCss = '';
      if (fs.existsSync(cssFilePath)) {
        existingCss = fs.readFileSync(cssFilePath, 'utf8');
      }

      // Prepend Tailwind directives if not already present
      let newCss = '';
      if (!existingCss.includes('@tailwind base')) {
        newCss += '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n';
      }

      // Only add variables if they aren't already there
      if (!existingCss.includes('--background')) {
        const generatedCssVariables = getThemeCss(response.themeOption, response.customPrimary, response.customBg);
        newCss += generatedCssVariables;
      }

      if (newCss) {
        // Prepend new content before existing content
        const finalCss = newCss + existingCss;
        fs.writeFileSync(cssFilePath, finalCss, 'utf8');
        console.log(`${chalk.green('UPDATED')} ${response.globalCss} — injected design tokens`);
      } else {
        console.log(`${chalk.yellow('SKIPPED')} ${response.globalCss} — design tokens already present`);
      }

      // 5. Create or patch tailwind.config.js
      spinner.text = 'Configuring Tailwind CSS...';
      const twConfigPath = path.join(process.cwd(), 'tailwind.config.js');
      
      if (fs.existsSync(twConfigPath)) {
        const existingConfig = fs.readFileSync(twConfigPath, 'utf8');
        // Only overwrite if it doesn't already have our color mappings
        if (!existingConfig.includes('var(--background)')) {
          // Back up the existing config
          fs.copyFileSync(twConfigPath, twConfigPath + '.bak');
          console.log(`${chalk.yellow('BACKUP')} tailwind.config.js.bak`);
          fs.writeFileSync(twConfigPath, TAILWIND_CONFIG_CONTENT, 'utf8');
          console.log(`${chalk.green('UPDATED')} tailwind.config.js — added semantic color mappings`);
        } else {
          console.log(`${chalk.yellow('SKIPPED')} tailwind.config.js — already configured`);
        }
      } else {
        fs.writeFileSync(twConfigPath, TAILWIND_CONFIG_CONTENT, 'utf8');
        console.log(`${chalk.green('CREATED')} tailwind.config.js`);
      }

      // 6. Create postcss.config.js if missing
      const postcssPath = path.join(process.cwd(), 'postcss.config.js');
      if (!fs.existsSync(postcssPath)) {
        const postcssContent = `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n`;
        fs.writeFileSync(postcssPath, postcssContent, 'utf8');
        console.log(`${chalk.green('CREATED')} postcss.config.js`);
      }

      spinner.succeed(chalk.green('Project initialized successfully!'));
      
      console.log(chalk.blue('\n─────────────────────────────────────────'));
      console.log(chalk.bold.white('  What was set up:'));
      console.log(chalk.gray('  ✓ CSS design tokens (light + dark mode)'));
      console.log(chalk.gray('  ✓ Tailwind CSS color mappings'));
      console.log(chalk.gray('  ✓ PostCSS configuration'));
      console.log(chalk.gray('  ✓ Utility function (cn)'));
      console.log(chalk.gray('  ✓ Core dependencies'));
      console.log(chalk.blue('─────────────────────────────────────────\n'));

      console.log(chalk.blue('You can now add components using:'));
      console.log(chalk.cyan('  npx @kinetic-ui/cli add <component>\n'));
      
    } catch (err) {
      spinner.fail(chalk.red('Failed to initialize project.'));
      console.error(err);
      process.exit(1);
    }
  });

program
  .command('add')
  .description('add a component to your project')
  .argument('[component]', 'the component to add (e.g. magnetic-button)')
  .action(async (componentName) => {
    console.log(chalk.bold.blue('\n✨ Kinetic UI CLI\n'));

    const spinner = ora('Fetching component registry...').start();
    let registry;
    try {
      registry = await fetchRegistry();
      spinner.succeed('Registry fetched successfully.');
    } catch (err) {
      spinner.fail(err.message);
      process.exit(1);
    }

    // If no component provided, prompt the user with two-stage category filter
    if (!componentName) {
      // Group components by their registered category
      const categoriesMap = {};
      Object.keys(registry).forEach((key) => {
        const item = registry[key];
        const catName = item.category || 'Other';
        if (!categoriesMap[catName]) {
          categoriesMap[catName] = [];
        }
        categoriesMap[catName].push({ title: item.title || item.name, value: key });
      });

      // 1. Prompt for Category selection
      const categoryChoices = Object.keys(categoriesMap).map((cat) => ({ title: cat, value: cat }));
      const catResponse = await prompts({
        type: 'select',
        name: 'category',
        message: 'Select component category:',
        choices: categoryChoices
      });

      if (!catResponse.category) {
        console.log(chalk.yellow('Operation cancelled.'));
        process.exit(0);
      }

      // 2. Prompt for Component within selected Category
      const componentChoices = categoriesMap[catResponse.category];
      const compResponse = await prompts({
        type: 'select',
        name: 'component',
        message: `Select component from [${catResponse.category}]:`,
        choices: componentChoices
      });

      if (!compResponse.component) {
        console.log(chalk.yellow('Operation cancelled.'));
        process.exit(0);
      }
      componentName = compResponse.component;
    }

    const componentData = registry[componentName];
    if (!componentData) {
      console.log(chalk.red(`\nComponent "${componentName}" not found in registry.`));
      process.exit(1);
    }

    // Install Dependencies
    if (componentData.dependencies && componentData.dependencies.length > 0) {
      let missingDeps = [];
      try {
        const pkgJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
        const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
        missingDeps = componentData.dependencies.filter(dep => !allDeps[dep]);
      } catch (e) {
        missingDeps = componentData.dependencies; // Fallback if no package.json
      }

      if (missingDeps.length > 0) {
        const res = await prompts({
          type: 'confirm',
          name: 'install',
          message: `This component requires ${missingDeps.join(', ')}. Install them now?`,
          initial: true
        });

        if (res.install) {
          console.log(chalk.blue(`\n📦 Installing missing dependencies: ${missingDeps.join(', ')}...`));
          try {
            execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
            console.log(chalk.green('Dependencies installed.'));
          } catch (err) {
            console.log(chalk.red('Failed to install dependencies.'));
          }
        } else {
          console.log(chalk.yellow('Skipping dependency installation. You may need to install them manually.'));
        }
      }
    }

    // Read components.json if it exists
    let componentsConfig = null;
    try {
      const configPath = path.join(process.cwd(), 'components.json');
      if (fs.existsSync(configPath)) {
        componentsConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      }
    } catch (err) {
      console.log(chalk.yellow('\nWarning: Could not read components.json. Using default paths.'));
    }

    // Write files
    console.log(chalk.blue(`\n📝 Writing component files...`));
    for (const file of componentData.files) {
      let targetPath = file.path;
      let content = file.content;

      if (componentsConfig && componentsConfig.aliases) {
        // Adjust component file path based on alias
        const compAlias = componentsConfig.aliases.components;
        if (compAlias && targetPath.startsWith('components/')) {
          let aliasPath = compAlias;
          // Strip the @/ or ~/ prefix to get the actual directory path
          if (aliasPath.startsWith('@/') || aliasPath.startsWith('~/')) {
            const baseDir = aliasPath.substring(2);
            // Auto-detect src directory
            const hasSrcDir = fs.existsSync(path.join(process.cwd(), 'src'));
            aliasPath = hasSrcDir ? `src/${baseDir}` : baseDir;
          }
          targetPath = targetPath.replace('components/', aliasPath + '/');
        }

        // Adjust utility imports based on utils alias
        const utilsAlias = componentsConfig.aliases.utils;
        if (utilsAlias) {
          // Assume the registry uses @/lib/utils standard
          content = content.replace(/@\/lib\/utils/g, utilsAlias);
        }
      }

      const fullPath = path.join(process.cwd(), targetPath);
      fs.ensureDirSync(path.dirname(fullPath));
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`${chalk.green('CREATED')} ${targetPath}`);
    }

    console.log(chalk.bold.green(`\n✅ Successfully added ${componentName} to your project!\n`));
  });

program
  .command('update')
  .description('update an existing component to the latest version')
  .argument('[component]', 'the component to update (e.g. magnetic-button)')
  .action(async (componentName) => {
    console.log(chalk.bold.blue('\n✨ Kinetic UI CLI (Update)\n'));

    const spinner = ora('Fetching component registry...').start();
    let registry;
    try {
      registry = await fetchRegistry();
      spinner.succeed('Registry fetched successfully.');
    } catch (err) {
      spinner.fail(err.message);
      process.exit(1);
    }

    if (!componentName) {
      console.log(chalk.yellow('\nPlease specify a component to update: npx @kinetic-ui/cli update <component>'));
      process.exit(1);
    }

    const componentData = registry[componentName];
    if (!componentData) {
      console.log(chalk.red(`\nComponent "${componentName}" not found in registry.`));
      process.exit(1);
    }

    // Install Dependencies (same as add)
    if (componentData.dependencies && componentData.dependencies.length > 0) {
      let missingDeps = [];
      try {
        const pkgJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
        const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
        missingDeps = componentData.dependencies.filter(dep => !allDeps[dep]);
      } catch (e) {
        missingDeps = componentData.dependencies; 
      }

      if (missingDeps.length > 0) {
        const res = await prompts({
          type: 'confirm',
          name: 'install',
          message: `This component requires ${missingDeps.join(', ')}. Install them now?`,
          initial: true
        });

        if (res.install) {
          console.log(chalk.blue(`\n📦 Installing missing dependencies: ${missingDeps.join(', ')}...`));
          try {
            execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
            console.log(chalk.green('Dependencies installed.'));
          } catch (err) {
            console.log(chalk.red('Failed to install dependencies.'));
          }
        }
      }
    }

    let componentsConfig = null;
    try {
      const configPath = path.join(process.cwd(), 'components.json');
      if (fs.existsSync(configPath)) {
        componentsConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      }
    } catch (err) {}

    console.log(chalk.blue(`\n📝 Updating component files...`));
    for (const file of componentData.files) {
      let targetPath = file.path;
      let content = file.content;

      if (componentsConfig && componentsConfig.aliases) {
        const compAlias = componentsConfig.aliases.components;
        if (compAlias && targetPath.startsWith('components/')) {
          let aliasPath = compAlias;
          if (aliasPath.startsWith('@/') || aliasPath.startsWith('~/')) {
            const baseDir = aliasPath.substring(2);
            const hasSrcDir = fs.existsSync(path.join(process.cwd(), 'src'));
            aliasPath = hasSrcDir ? `src/${baseDir}` : baseDir;
          }
          targetPath = targetPath.replace('components/', aliasPath + '/');
        }

        const utilsAlias = componentsConfig.aliases.utils;
        if (utilsAlias) {
          content = content.replace(/@\/lib\/utils/g, utilsAlias);
        }
      }

      const fullPath = path.join(process.cwd(), targetPath);
      
      // Create backup if file exists
      if (fs.existsSync(fullPath)) {
        const backupPath = fullPath + '.bak';
        fs.copyFileSync(fullPath, backupPath);
        console.log(`${chalk.yellow('BACKUP')} ${targetPath}.bak`);
      }

      fs.ensureDirSync(path.dirname(fullPath));
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`${chalk.green('UPDATED')} ${targetPath}`);
    }

    console.log(chalk.bold.green(`\n✅ Successfully updated ${componentName}!\n`));
  });

program.parse();
