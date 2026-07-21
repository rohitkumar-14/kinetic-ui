import { CodeBlock } from '@/components/code-block';

export default function InstallationPage() {
  const initCode = `npx kinetic-ui init`;
  const addCode = `npx kinetic-ui add hero-particles
npx kinetic-ui add floating-navbar
npx kinetic-ui add magnetic-button`;
  const updateCode = `npx kinetic-ui update hero-particles`;

  const manualDeps = `npm install lucide-react clsx tailwind-merge @radix-ui/react-slot
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs`;

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">Installation</h1>
        <p className="text-lg text-zinc-400 font-light leading-relaxed">
          Initialize Kinetic UI in your project using the official CLI or set up manually.
        </p>
      </div>

      {/* CLI Section (Recommended) */}
      <div className="space-y-6 pt-4 border-t border-white/5">
        <div>
          <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 rounded border border-indigo-500/20 mb-2">
            Recommended
          </span>
          <h2 id="cli-setup" className="text-2xl font-bold tracking-tight text-white">1. Initialize Project via CLI</h2>
          <p className="text-zinc-400 font-light leading-relaxed mt-1">
            Run the <code>init</code> command to automatically configure <code>components.json</code>, Tailwind CSS color variables, <code>lib/utils.ts</code>, and design tokens.
          </p>
        </div>
        <CodeBlock code={initCode} language="bash" />
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="cli-add" className="text-2xl font-bold tracking-tight text-white">2. Add Components</h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          Use the <code>add</code> command to install specific creative or UI components along with their dependencies:
        </p>
        <CodeBlock code={addCode} language="bash" />
        <p className="text-xs text-zinc-500 font-mono mt-1">
          Tip: Running <code>npx kinetic-ui add</code> without arguments opens an interactive category & component selector.
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="cli-update" className="text-2xl font-bold tracking-tight text-white">3. Update Components</h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          To update an existing component to the latest registry version (auto-backing up your existing files):
        </p>
        <CodeBlock code={updateCode} language="bash" />
      </div>

      {/* Manual Installation Section */}
      <div className="space-y-6 pt-8 border-t border-white/10">
        <div>
          <h2 id="manual-setup" className="text-2xl font-bold tracking-tight text-white">Manual Setup</h2>
          <p className="text-zinc-400 font-light leading-relaxed mt-1">
            If you prefer setting up components manually without the CLI:
          </p>
        </div>

        <div className="space-y-3">
          <h3 id="dependencies" className="text-lg font-semibold text-zinc-200">Install Dependencies</h3>
          <p className="text-zinc-400 font-light leading-relaxed text-sm">
            Install the required motion primitives and helpers used under the hood by Kinetic UI components:
          </p>
          <CodeBlock code={manualDeps} language="bash" />
        </div>

        <div className="space-y-3">
          <h3 id="utils" className="text-lg font-semibold text-zinc-200">Add Utils Helper</h3>
          <p className="text-zinc-400 font-light leading-relaxed text-sm">
            Create <code>lib/utils.ts</code> and paste the <code>cn</code> class merging utility:
          </p>
          <CodeBlock code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} language="typescript" />
        </div>

        <div className="space-y-3">
          <h3 id="adding-components" className="text-lg font-semibold text-zinc-200">Copy Component Code</h3>
          <p className="text-zinc-400 font-light leading-relaxed text-sm">
            Select components from the sidebar, click the <strong>Copy Code</strong> tab, and paste them directly into your <code>components/</code> directory.
          </p>
        </div>
      </div>
    </div>
  );
}

