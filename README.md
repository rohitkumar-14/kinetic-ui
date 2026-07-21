# Kinetic UI

**The ultimate motion design system for React developers.**  
Build websites people remember with advanced scroll animations, 3D interactions, and physics-powered components.

[![Netlify Status](https://api.netlify.com/api/v1/badges/kinetic-ui/deploy-status)](https://app.netlify.com/sites/kinetic-ui/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Kinetic UI provides copy-pasteable, highly interactive 3D and motion-driven components built on top of **Next.js**, **Framer Motion**, **GSAP**, **Matter.js**, and **Three.js**. It is designed specifically to help developers build Awwwards-winning websites and enterprise SaaS landing pages without fighting complex math or animations from scratch.

---

## 🚀 Getting Started

### 1. Installation

Use our CLI to instantly add components to your project without bloating your dependencies:

```bash
npx kinetic-ui-cli init
npx kinetic-ui-cli add <component-name>
```

Alternatively, you can browse the [Documentation](https://kinetic.studio/docs) and simply copy-paste the component code directly into your project.

### 2. Local Development

To run the documentation site and component playground locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to interact with the playground.

---

## 💎 Features

- **Physics Engines**: Components powered by `matter.js` for real-time gravity, collision, and bouncing elements.
- **WebGL & 3D**: Embedded shaders, fluid distortions, and particle systems via `@react-three/fiber`.
- **GSAP Scroll-triggers**: Silky smooth scroll-linked animations and parallax depths.
- **Zero Configuration**: Components drop right into your `components/` folder—fully typed and ready to customize.
- **100% Static**: The entire documentation and component library is serverless-friendly. Just run `next build` and deploy the `out/` folder to Netlify, Vercel, or AWS S3.

## 🛠️ Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion & GSAP
- **Physics**: Matter.js
- **3D Rendering**: Three.js & React Three Fiber

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.