/**
 * Kinetic UI - Vanilla HTML, CSS & JavaScript Code Generator & Standalone Downloader
 * Enables zero-dependency copy-paste and single-file downloads for all components.
 * Supports Dynamic Interactive Studio Customization: Style Presets & Industry Mock Datasets.
 */

import { DatasetType, StylePresetType, MOCK_DATASETS } from './mock-datasets';

export interface VanillaCodeBundle {
  html: string;
  css: string;
  js: string;
  standaloneHtml: string;
}

export interface VanillaOptions {
  stylePreset?: StylePresetType;
  dataset?: DatasetType;
  accentColor?: string;
}

export function downloadFile(filename: string, content: string, mimeType = 'text/html;charset=utf-8') {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getStylePresetCss(stylePreset: StylePresetType, accentColor: string): string {
  if (stylePreset === 'neon') {
    return `
/* Neon Cyberpunk Glow Preset */
.kinetic-style-neon {
  background: #09090f !important;
  border: 1px solid ${accentColor} !important;
  box-shadow: 0 0 30px ${accentColor}55, inset 0 0 12px ${accentColor}15 !important;
}
.kinetic-style-neon:hover {
  box-shadow: 0 0 45px ${accentColor}80, inset 0 0 20px ${accentColor}25 !important;
}`;
  }
  if (stylePreset === 'flat') {
    return `
/* Flat Clean Minimalist Preset */
.kinetic-style-flat {
  background: #18181b !important;
  border: 1px solid #27272a !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
}`;
  }
  if (stylePreset === 'borderless') {
    return `
/* Borderless Preset */
.kinetic-style-borderless {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}`;
  }
  // Glassmorphism default
  return `
/* Glassmorphism Frosted Blur Preset */
.kinetic-style-glass {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important;
}`;
}

// Generate dynamic CRM Table Vanilla HTML/CSS/JS based on selected dataset & style
function generateCrmTableVanilla(datasetKey: DatasetType, stylePreset: StylePresetType, accentColor: string) {
  const ds = MOCK_DATASETS[datasetKey] || MOCK_DATASETS.saas;
  const rowsHtml = ds.records.map((r, i) => `
        <tr class="crm-row border-b border-zinc-800/60 hover:bg-white/[0.03] transition-colors" data-badge="${r.badge}">
          <td class="p-4">
            <input type="checkbox" class="row-checkbox rounded border-zinc-700 bg-zinc-900 text-indigo-500 cursor-pointer" />
          </td>
          <td class="p-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
                ${r.avatarText}
              </div>
              <div>
                <div class="font-semibold text-white text-sm">${r.primary}</div>
                <div class="text-xs text-zinc-500 font-mono">${r.secondary}</div>
              </div>
            </div>
          </td>
          <td class="p-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              r.badgeType === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
              r.badgeType === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
              r.badgeType === 'info' ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' :
              'bg-zinc-800 border-zinc-700 text-zinc-300'
            }">
              ${r.badge}
            </span>
          </td>
          <td class="p-4 font-mono font-semibold text-white text-sm">
            ${r.value}
          </td>
          <td class="p-4 text-xs text-zinc-500 font-mono">
            ${r.timestamp}
          </td>
        </tr>`).join('\n');

  const html = `<!-- Kinetic UI: CRM Customer Pipeline Table (${ds.label} Dataset - ${stylePreset} Style) -->
<div class="crm-table-container kinetic-style-${stylePreset} w-full max-w-4xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl text-zinc-100 overflow-hidden">
  
  <!-- Header & Search Controls -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-bold tracking-tight text-white">${ds.label} Pipeline</h3>
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Live Data
        </span>
      </div>
      <p class="text-xs text-zinc-400 mt-1">${ds.description}</p>
    </div>

    <!-- Live Search -->
    <div class="relative w-full sm:w-64">
      <input 
        id="crm-search" 
        type="text" 
        placeholder="Filter records..." 
        class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
      />
    </div>
  </div>

  <!-- Data Table -->
  <div class="overflow-x-auto rounded-xl border border-zinc-800/80">
    <table class="w-full text-left text-sm">
      <thead class="bg-zinc-900/80 text-zinc-400 uppercase text-[11px] font-bold tracking-wider border-b border-zinc-800">
        <tr>
          <th class="p-4 w-10">
            <input id="select-all" type="checkbox" class="rounded border-zinc-700 bg-zinc-900 cursor-pointer" />
          </th>
          <th class="p-4">Account / Item</th>
          <th class="p-4">Status</th>
          <th class="p-4">Value / Metric</th>
          <th class="p-4">Updated</th>
        </tr>
      </thead>
      <tbody id="crm-table-body">
${rowsHtml}
      </tbody>
    </table>
  </div>
</div>`;

  const css = `/* CRM Pipeline Table Styles */
.crm-table-container {
  transition: all 0.3s ease;
}
${getStylePresetCss(stylePreset, accentColor)}`;

  const js = `// Vanilla Interactive Filtering & Row Checkbox Selection
const searchInput = document.getElementById('crm-search');
const tableRows = document.querySelectorAll('.crm-row');
const selectAll = document.getElementById('select-all');
const rowCheckboxes = document.querySelectorAll('.row-checkbox');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    tableRows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

if (selectAll) {
  selectAll.addEventListener('change', (e) => {
    rowCheckboxes.forEach((cb) => {
      cb.checked = e.target.checked;
    });
  });
}`;

  return { html, css, js };
}

// Generate dynamic Metric Cards Vanilla HTML/CSS/JS based on selected dataset & style
function generateMetricCardVanilla(datasetKey: DatasetType, stylePreset: StylePresetType, accentColor: string) {
  const ds = MOCK_DATASETS[datasetKey] || MOCK_DATASETS.saas;

  const cardsHtml = ds.metrics.map((m, i) => {
    const isUp = m.trend === 'up';
    const min = Math.min(...m.sparkline);
    const max = Math.max(...m.sparkline);
    const range = max - min || 1;
    const points = m.sparkline.map((val, idx) => {
      const x = (idx / (m.sparkline.length - 1)) * 90;
      const y = 28 - ((val - min) / range) * 28;
      return `${x},${y}`;
    }).join(' ');

    return `
  <!-- Metric Card ${i + 1} -->
  <div class="metric-card kinetic-style-${stylePreset} relative p-5 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-medium text-zinc-400 uppercase tracking-wider">${m.title}</span>
      <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}">
        ${m.change}
      </span>
    </div>

    <div class="flex items-baseline justify-between gap-2">
      <div class="text-3xl font-black tracking-tight text-white">${m.value}</div>
      <div class="w-20 h-7 opacity-80 group-hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 90 28" class="w-full h-full overflow-visible">
          <polyline
            fill="none"
            stroke="${isUp ? '#10b981' : '#f43f5e'}"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            points="${points}"
          />
        </svg>
      </div>
    </div>

    <div class="mt-3 pt-3 border-t border-zinc-800/60 text-[11px] text-zinc-500 font-light">
      ${m.period}
    </div>
  </div>`;
  }).join('\n');

  const html = `<!-- Kinetic UI: Metric Cards Grid (${ds.label} Dataset - ${stylePreset} Style) -->
<div class="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
${cardsHtml}
</div>`;

  const css = `/* Metric Cards Grid Styles */
.metric-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.metric-card:hover {
  transform: translateY(-2px);
}
${getStylePresetCss(stylePreset, accentColor)}`;

  const js = `// Metric Card Hover Animation
document.querySelectorAll('.metric-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = '${accentColor}';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '';
  });
});`;

  return { html, css, js };
}

// Curated high-fidelity vanilla implementations for popular kinetic UI components
const CURATED_VANILLA: Record<string, { html: string; css: string; js: string }> = {
  'magnetic-button': {
    html: `<!-- Kinetic UI: Magnetic Button -->
<button class="magnetic-btn group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-transform duration-200 ease-out rounded-full bg-zinc-900 border border-zinc-700/60 shadow-lg shadow-black/40 hover:border-indigo-500/50 hover:shadow-indigo-500/20 cursor-pointer overflow-hidden">
  <span class="relative z-10 flex items-center gap-2">
    <span>Explore Library</span>
    <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
  </span>
  <span class="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/20 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
</button>`,
    css: `/* Magnetic Button Styles */
.magnetic-btn {
  will-change: transform;
  user-select: none;
}
.magnetic-btn:active {
  transform: scale(0.96) !important;
}`,
    js: `// Vanilla JavaScript Magnetic Physics
document.querySelectorAll('.magnetic-btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    btn.style.transform = \`translate(\${x}px, \${y}px)\`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform 0.1s ease-out';
  });
});`
  },

  'spotlight-card': {
    html: `<!-- Kinetic UI: Spotlight Card -->
<div class="spotlight-card relative max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 overflow-hidden shadow-2xl backdrop-blur-xl group">
  <div class="relative z-10">
    <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:border-indigo-400/40 transition-all duration-300">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </div>
    <h3 class="text-xl font-bold text-white mb-2 tracking-tight">Kinetic Acceleration</h3>
    <p class="text-sm text-zinc-400 leading-relaxed">
      Hover across the card surface to witness dynamic radial spotlight reflection tracing your cursor position in real-time.
    </p>
  </div>
</div>`,
    css: `/* Spotlight Radial Glow */
.spotlight-card {
  --spotlight-x: -500px;
  --spotlight-y: -500px;
}
.spotlight-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: radial-gradient(400px circle at var(--spotlight-x) var(--spotlight-y), rgba(99, 102, 241, 0.25), transparent 70%);
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.3s ease;
  opacity: 0;
}
.spotlight-card:hover::before {
  opacity: 1;
}`,
    js: `// Dynamic Cursor Spotlight Follower
document.querySelectorAll('.spotlight-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', \`\${x}px\`);
    card.style.setProperty('--spotlight-y', \`\${y}px\`);
  });
});`
  },

  'tilt-card': {
    html: `<!-- Kinetic UI: 3D Tilt Card -->
<div class="tilt-card-wrapper perspective-1000 max-w-sm w-full">
  <div class="tilt-card relative p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl transition-transform duration-100 ease-out preserve-3d">
    <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    </div>
    <h3 class="text-xl font-bold text-white mb-2 tracking-tight">Perspective Physics</h3>
    <p class="text-sm text-zinc-400 leading-relaxed mb-4">
      Real-time mathematical rotation along X and Y axes responding to mouse distance vectors.
    </p>
    <div class="flex items-center gap-2 text-xs font-semibold text-purple-400">
      <span>Tilt to interact</span>
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
    </div>
  </div>
</div>`,
    css: `/* 3D Perspective Rules */
.perspective-1000 {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
  will-change: transform;
}`,
    js: `// Mathematical 3D Gyro/Tilt Simulation
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease-out';
  });
});`
  },

  'glow-button': {
    html: `<!-- Kinetic UI: Cyber Glow Button -->
<button class="glow-button relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-zinc-950 border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.65)] hover:border-indigo-400 transition-all duration-300 cursor-pointer overflow-hidden group">
  <span class="relative z-10 flex items-center gap-2">
    <span>Launch Console</span>
    <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
  </span>
  <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-75 transition duration-300 -z-10"></div>
</button>`,
    css: `/* Glow Pulse Keyframes */
.glow-button {
  user-select: none;
}`,
    js: `// Interactive Click Ripple Effect
document.querySelectorAll('.glow-button').forEach((btn) => {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = \`\${diameter}px\`;
    circle.style.left = \`\${e.clientX - rect.left - radius}px\`;
    circle.style.top = \`\${e.clientY - rect.top - radius}px\`;
    circle.classList.add('ripple');
    const existing = btn.querySelector('.ripple');
    if (existing) existing.remove();
    btn.appendChild(circle);
  });
});`
  },

  'shiny-text': {
    html: `<!-- Kinetic UI: Shiny Text Animation -->
<h1 class="shiny-text text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-500 inline-block">
  Next-Gen Motion Framework
</h1>`,
    css: `/* Metallic Shimmer Gradient Animation */
.shiny-text {
  background-size: 200% auto;
  animation: shine 4s linear infinite;
}
@keyframes shine {
  to {
    background-position: 200% center;
  }
}`,
    js: `// Shiny text is purely hardware accelerated CSS`
  },

  'kinetic-loader': {
    html: `<!-- Kinetic UI: Kinetic Spinner -->
<div class="relative w-16 h-16 flex items-center justify-center">
  <div class="spinner-ring absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500"></div>
  <div class="spinner-ring-inner absolute inset-2 rounded-full border-2 border-purple-500/20 border-b-purple-500"></div>
  <div class="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"></div>
</div>`,
    css: `/* Dual-axis Kinetic Spinner */
.spinner-ring {
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.spinner-ring-inner {
  animation: spin-reverse 0.8s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}`,
    js: `// No JavaScript required: Pure GPU accelerated animation`
  },

  'confetti-button': {
    html: `<!-- Kinetic UI: Confetti Popper Button -->
<button id="confetti-btn" class="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
  <span>Trigger Celebration</span>
  <span>🎉</span>
</button>
<canvas id="confetti-canvas" class="fixed inset-0 pointer-events-none z-50 w-full h-full"></canvas>`,
    css: `/* Confetti Canvas Overlay */
#confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}`,
    js: `// Self-contained Vanilla Canvas Confetti Physics
const cBtn = document.getElementById('confetti-btn');
const cCanvas = document.getElementById('confetti-canvas');
if (cBtn && cCanvas) {
  const ctx = cCanvas.getContext('2d');
  cCanvas.width = window.innerWidth;
  cCanvas.height = window.innerHeight;
  let particles = [];
  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  cBtn.addEventListener('click', (e) => {
    const rect = cBtn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.01
      });
    }
  });

  function render() {
    ctx.clearRect(0, 0, cCanvas.width, cCanvas.height);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    requestAnimationFrame(render);
  }
  render();
}`
  },

  'hero-particles': {
    html: `<!-- Kinetic UI: Interactive Particle Canvas -->
<div class="relative w-full h-[450px] rounded-2xl overflow-hidden bg-black border border-zinc-800">
  <canvas id="particle-canvas" class="w-full h-full block"></canvas>
  <div class="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-6">
    <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight">Interactive Particles</h2>
    <p class="text-sm text-zinc-400 mt-2 max-w-md">Move your cursor to repel particles with spring physics.</p>
  </div>
</div>`,
    css: `/* Particle Canvas Styling */
#particle-canvas {
  touch-action: none;
}`,
    js: `// Vanilla 2D Physics Particle Swarm
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  const particles = [];
  const count = 70;
  let mouse = { x: -1000, y: -1000, radius: 120 };

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#6366f1' : '#a855f7'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse repulsion
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        p.x -= (dx / dist) * force * 5;
        p.y -= (dy / dist) * force * 5;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();

      // Connect lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 100) {
          ctx.beginPath();
          ctx.strokeStyle = \`rgba(99, 102, 241, \${(1 - dist2 / 100) * 0.25})\`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}`
  }
};

/**
 * Universal Fallback Parser: Transforms JSX/TSX into clean HTML + CSS + JS
 */
function generateFallbackVanilla(slug: string, title: string, sourceCode?: string, jsxCode?: string, options?: VanillaOptions): { html: string; css: string; js: string } {
  const codeToParse = jsxCode || sourceCode || '';
  const stylePreset = options?.stylePreset || 'glass';
  const accentColor = options?.accentColor || '#6366f1';
  
  // Extract JSX elements or create semantic markup
  let html = '';
  if (codeToParse) {
    let innerJSX = codeToParse;
    const returnMatch = codeToParse.match(/return\s*\(\s*([\s\S]*?)\s*\);/);
    if (returnMatch) {
      innerJSX = returnMatch[1];
    }

    // Convert className to class
    innerJSX = innerJSX.replace(/className=(["'{])(.*?)(["'}])/g, 'class="$2"');
    
    // Replace <motion.div with <div etc.
    innerJSX = innerJSX.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
    innerJSX = innerJSX.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');

    // Remove React event handlers and hooks bindings
    innerJSX = innerJSX.replace(/\s*(?:onClick|onMouseEnter|onMouseLeave|onChange|ref)=\{.*?\}/g, '');
    innerJSX = innerJSX.replace(/\s*(?:initial|animate|exit|transition|whileHover|whileTap)=\{.*?\}/g, '');

    // Clean empty curly braces or comments
    innerJSX = innerJSX.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    
    html = `<!-- Kinetic UI: ${title} (${stylePreset.toUpperCase()} Style) -->\n<div class="kinetic-${slug} kinetic-style-${stylePreset} w-full flex items-center justify-center p-6">\n` +
      innerJSX.trim() +
      `\n</div>`;
  } else {
    html = `<!-- Kinetic UI: ${title} (${stylePreset.toUpperCase()} Style) -->
<div class="kinetic-${slug} kinetic-style-${stylePreset} relative p-8 rounded-2xl border border-zinc-800 bg-zinc-950 text-white max-w-md mx-auto shadow-2xl">
  <div class="flex items-center gap-3 mb-4">
    <div class="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
    <span class="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">${title}</span>
  </div>
  <p class="text-sm text-zinc-400 leading-relaxed">
    Integrated interactive kinetic component with physics response.
  </p>
</div>`;
  }

  const css = `/* Custom Styles for ${title} (${stylePreset.toUpperCase()} Preset) */
.kinetic-${slug} {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.kinetic-${slug}:hover {
  border-color: ${accentColor}80;
}
${getStylePresetCss(stylePreset, accentColor)}`;

  const js = `// Vanilla Interactive Controller for ${title}
document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.kinetic-${slug}');
  if (element) {
    element.addEventListener('click', () => {
      console.log('${title} interaction triggered');
    });
  }
});`;

  return { html, css, js };
}

/**
 * Generates the complete, standalone, runnable HTML file with Tailwind CDN & Lucide Icons.
 */
export function buildStandaloneHtmlFile(title: string, html: string, css: string, js: string, options?: VanillaOptions): string {
  const accentColor = options?.accentColor || '#6366f1';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Kinetic UI Standalone</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: '${accentColor}',
          }
        }
      }
    }
  </script>

  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    ${css}
  </style>
</head>
<body class="bg-[#09090b] text-zinc-100 min-h-screen flex flex-col items-center justify-center p-6 antialiased selection:bg-indigo-500 selection:text-white">
  
  <!-- Component Container -->
  <div class="w-full max-w-5xl flex items-center justify-center">
    ${html}
  </div>

  <!-- Lucide Icons Initialization & Interactivity -->
  <script>
    if (window.lucide) {
      lucide.createIcons();
    }
    ${js}
  </script>
</body>
</html>`;
}

/**
 * Main export: Retrieves or constructs a full Vanilla code bundle for any component
 */
export function getVanillaCodeBundle(
  slug: string, 
  title: string, 
  sourceCode?: string, 
  jsxCode?: string,
  options?: VanillaOptions
): VanillaCodeBundle {
  const dataset = options?.dataset || 'saas';
  const stylePreset = options?.stylePreset || 'glass';
  const accentColor = options?.accentColor || '#6366f1';

  let result: { html: string; css: string; js: string };

  if (slug === 'crm-table' || slug === 'table' || slug === 'data-table') {
    result = generateCrmTableVanilla(dataset, stylePreset, accentColor);
  } else if (slug === 'metric-card') {
    result = generateMetricCardVanilla(dataset, stylePreset, accentColor);
  } else if (CURATED_VANILLA[slug]) {
    const curated = CURATED_VANILLA[slug];
    result = {
      html: curated.html,
      css: curated.css + '\n' + getStylePresetCss(stylePreset, accentColor),
      js: curated.js
    };
  } else {
    result = generateFallbackVanilla(slug, title, sourceCode, jsxCode, options);
  }

  const standaloneHtml = buildStandaloneHtmlFile(title, result.html, result.css, result.js, options);

  return {
    html: result.html,
    css: result.css,
    js: result.js,
    standaloneHtml
  };
}
