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

// ── CSS Variables that power all Kinetic UI components ──────────────────────
const CSS_VARIABLES = `
/* ═══════════════════════════════════════════════════════════════
   Kinetic UI — Design Tokens (CSS Variables)
   These variables power all semantic Tailwind classes used by
   Kinetic UI components (bg-background, text-foreground, etc.)
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
  .version('1.0.0');

program
  .command('init')
  .description('initialize your project with Kinetic UI design tokens and dependencies')
  .action(async () => {
    console.log(chalk.bold.indigo || chalk.bold.blue('\n✨ Initializing Kinetic UI\n'));

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
      }
    ]);

    // Handle cancellation
    if (Object.keys(response).length < 4) {
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

      spinner.succeed(chalk.green('Project initialized successfully.'));
      console.log(chalk.blue('\nYou can now add components using:'));
      console.log(chalk.cyan('  npx kinetic-ui-cli add <component>\n'));
      
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
    console.log(chalk.bold.indigo || chalk.bold.blue('\n✨ Kinetic UI CLI\n'));

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
    console.log(chalk.bold.indigo || chalk.bold.blue('\n✨ Kinetic UI CLI (Update)\n'));

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
      console.log(chalk.yellow('\nPlease specify a component to update: npx kinetic-ui-cli update <component>'));
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
