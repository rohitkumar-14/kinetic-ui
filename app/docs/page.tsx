// Trigger rebuild
export default function DocsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Introduction</h1>
        <p className="text-lg text-zinc-400 font-light leading-relaxed">
          Welcome to the Kinetic UI documentation. A beautiful, high-performance set of motion components built on top of Tailwind CSS, Framer Motion, and GSAP.
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="features" className="text-2xl font-bold tracking-tight text-white">Features</h2>
        <ul className="list-disc pl-6 space-y-3.5 text-zinc-400 font-light">
          <li><strong>Creative Interactions</strong>: Touch and hover systems calibrated with organic physics vectors.</li>
          <li><strong>Extensible</strong>: Styled with pure Tailwind. Easily adjust constants, colors, and timing parameters.</li>
          <li><strong>High Performance</strong>: Hand-optimized drawing logic utilizing hardware-accelerated transforms.</li>
          <li><strong>Copy &amp; Paste</strong>: Complete ownership. Drag files straight into your codebase and shape them freely.</li>
        </ul>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="philosophy" className="text-2xl font-bold tracking-tight text-white">Philosophy</h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          We believe creative developers shouldn't be constrained by rigid, bloated component dependencies. By providing the raw code directly, you retain absolute authority to refine layouts, fine-tune timing, and evolve interactions to fit your application's unique visual style.
        </p>
      </div>
      
      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="getting-started" className="text-2xl font-bold tracking-tight text-white">Getting Started</h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          To start compiling the components, read our <a href="/docs/installation" className="font-semibold text-indigo-400 underline underline-offset-4 hover:text-indigo-300 transition-colors">Installation</a> guide or navigate straight to component previews in the left sidebar.
        </p>
      </div>
    </div>
  );
}
