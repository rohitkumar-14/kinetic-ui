const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../registry/components.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const newComponents = {
  layout: [
    {
      name: "SplitScreenLayout",
      description: "Dual-pane layout where one side stays pinned while the other scrolls.",
      dependencies: ["clsx", "tailwind-merge"],
      files: ["components/creative/split-screen-layout.tsx"]
    },
    {
      name: "MasonryGrid",
      description: "Pinterest-style grid for galleries and portfolios.",
      dependencies: ["framer-motion", "clsx", "tailwind-merge"],
      files: ["components/creative/masonry-grid.tsx"]
    },
    {
      name: "BrokenGrid",
      description: "Editorial, asymmetrical, overlapping grid layout.",
      dependencies: ["framer-motion", "clsx", "tailwind-merge"],
      files: ["components/creative/broken-grid.tsx"]
    }
  ],
  "scroll-systems": [
    {
      name: "SmoothScroll",
      description: "A global smooth scrolling provider powered by Lenis.",
      dependencies: ["lenis"],
      files: ["components/creative/smooth-scroll.tsx"]
    },
    {
      name: "ScrollLinkedSplit",
      description: "Cinematic split reveal on scroll.",
      dependencies: ["framer-motion", "clsx", "tailwind-merge"],
      files: ["components/creative/scroll-linked-split.tsx"]
    }
  ],
  "background-effects": [
    {
      name: "NoiseOverlay",
      description: "Adds an organic, tactile feel to the page with SVG noise.",
      dependencies: ["clsx", "tailwind-merge"],
      files: ["components/creative/noise-overlay.tsx"]
    }
  ],
  "page-transitions": [
    {
      name: "ScrollReveal",
      description: "Foundational wrapper for entrance animations.",
      dependencies: ["framer-motion", "clsx", "tailwind-merge"],
      files: ["components/creative/scroll-reveal.tsx"]
    }
  ],
  navigation: [
    {
      name: "SmartNavbar",
      description: "A navigation bar that hides when scrolling down and reveals when scrolling up.",
      dependencies: ["framer-motion", "clsx", "tailwind-merge"],
      files: ["components/creative/smart-navbar.tsx"]
    }
  ],
  "text-effects": [
    {
      name: "AnimatedCounter",
      description: "Numbers that count up when scrolled into view.",
      dependencies: ["framer-motion", "clsx", "tailwind-merge"],
      files: ["components/creative/animated-counter.tsx"]
    }
  ]
};

// Insert new components into their respective categories
for (const [category, components] of Object.entries(newComponents)) {
  if (registry[category] && registry[category].items) {
    for (const comp of components) {
      // Use kebab-case name for the key
      const key = comp.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      registry[category].items[key] = comp;
    }
  }
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log('Successfully updated registry/components.json');
