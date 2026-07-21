# Kinetic UI

**The ultimate motion design system for React developers.**  
Build websites people remember with advanced scroll animations, 3D interactions, and physics-powered components.

[![Netlify Status](https://api.netlify.com/api/v1/badges/kinetic-ui/deploy-status)](https://app.netlify.com/sites/kinetic-ui/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Kinetic UI provides copy-pasteable, highly interactive 3D and motion-driven components built on top of **Next.js**, **Framer Motion**, **GSAP**, **Matter.js**, and **Three.js**. It is designed specifically to help developers build Awwwards-winning websites and enterprise SaaS landing pages without fighting complex math or animations from scratch.

---

## 🚀 Getting Started with Kinetic UI CLI

Use our official CLI to instantly initialize design tokens and add components directly to your project without unnecessary bloat:

### 1. Initialize Your Project

Run `init` to automatically set up `components.json`, Tailwind CSS design tokens (CSS variables), `lib/utils.ts`, and core dependencies:

```bash
npx kinetic-ui init
```

### 2. Add Components

Install specific creative or UI components along with their dependencies:

```bash
# Add specific component
npx kinetic-ui add hero-particles
npx kinetic-ui add floating-navbar
npx kinetic-ui add magnetic-button

# Or run interactive selector
npx kinetic-ui add
```

### 3. Update Components

Update existing components to the latest registry version (with automated file backup):

```bash
npx kinetic-ui update hero-particles
```

---

## 📖 Manual Installation

If you prefer manual setup without using the CLI:

1. **Install Core Dependencies**:
   ```bash
   npm install lucide-react clsx tailwind-merge @radix-ui/react-slot
   npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs
   ```

2. **Add Utils Helper (`lib/utils.ts`)**:
   ```typescript
   import { clsx, type ClassValue } from "clsx"
   import { twMerge } from "tailwind-merge"

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }
   ```

3. **Copy Code**: Browse the [Kinetic UI Documentation](https://kinetiic-ui.netlify.app/docs/installation) and copy components directly into your `components/` folder.

---

## 💻 Local Development & Registry Build

To run the documentation site and component registry locally:

```bash
# Install dependencies
npm install

# Rebuild component registry
npm run registry:build

# Run local dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to inspect component previews and documentation.

---

## 💎 Features

- **CLI-First Workflow**: Initialize design tokens (`init`), install components (`add`), and update to latest versions (`update`).
- **Physics Engines**: Components powered by `matter.js` for real-time gravity, collision, and bouncing elements.
- **WebGL & 3D**: Embedded shaders, fluid distortions, and particle systems via `@react-three/fiber`.
- **GSAP Scroll-triggers**: Silky smooth scroll-linked animations and parallax depths.
- **Zero Lock-in**: Components are written directly into your project's `components/` folder—fully typed and customizable.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion & GSAP
- **Physics**: Matter.js
- **3D Rendering**: Three.js & React Three Fiber

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.