import { CodeBlock } from '@/components/code-block';
import { DocsPager } from '@/components/docs-pager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InstallationPage() {
  const initCode = `npx kinetic-ui-cli@latest init`;
  const addCode = `npx kinetic-ui-cli@latest add hero-particles
npx kinetic-ui-cli@latest add floating-navbar
npx kinetic-ui-cli@latest add magnetic-button`;
  const updateCode = `npx kinetic-ui-cli@latest update hero-particles`;

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
          Tip: Running <code>npx kinetic-ui-cli@latest add</code> without arguments opens an interactive category & component selector.
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

        <Tabs defaultValue="nextjs" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto rounded-none border-b border-border bg-transparent p-0 mb-6">
            <TabsTrigger value="nextjs" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground">Next.js</TabsTrigger>
            <TabsTrigger value="vite" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground">Vite + React</TabsTrigger>
            <TabsTrigger value="astro" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground">Astro + React</TabsTrigger>
            <TabsTrigger value="remix" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground">Remix</TabsTrigger>
          </TabsList>

          {/* NEXT.JS */}
          <TabsContent value="nextjs" className="space-y-6 outline-none">
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
              <CodeBlock code={`import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}`} language="typescript" />
            </div>
          </TabsContent>

          {/* VITE */}
          <TabsContent value="vite" className="space-y-6 outline-none">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Configure Path Aliases</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">
                Kinetic UI components use the <code>@/</code> alias. Configure it in <code>vite.config.ts</code> and <code>tsconfig.json</code>:
              </p>
              <CodeBlock code={`// vite.config.ts\nimport path from "path"\nimport { defineConfig } from "vite"\n\nexport default defineConfig({\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "./src"),\n    },\n  },\n})`} language="typescript" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Install Dependencies</h3>
              <CodeBlock code={manualDeps} language="bash" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Add Utils Helper</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">Create <code>src/lib/utils.ts</code> with the <code>cn</code> function.</p>
              <CodeBlock code={`import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}`} language="typescript" />
            </div>
          </TabsContent>

          {/* ASTRO */}
          <TabsContent value="astro" className="space-y-6 outline-none">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Astro Setup</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">
                Ensure you have the React and Tailwind integrations installed:
              </p>
              <CodeBlock code={`npx astro add react tailwind`} language="bash" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Install Dependencies</h3>
              <CodeBlock code={manualDeps} language="bash" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Add Utils Helper</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">Create <code>src/lib/utils.ts</code> with the <code>cn</code> function.</p>
              <CodeBlock code={`import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}`} language="typescript" />
            </div>
          </TabsContent>

          {/* REMIX */}
          <TabsContent value="remix" className="space-y-6 outline-none">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Install Dependencies</h3>
              <CodeBlock code={manualDeps} language="bash" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-200">Add Utils Helper</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">Create <code>app/lib/utils.ts</code> with the <code>cn</code> function.</p>
              <CodeBlock code={`import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}`} language="typescript" />
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-3 pt-6">
          <h3 id="adding-components" className="text-lg font-semibold text-zinc-200">Copy Component Code</h3>
          <p className="text-zinc-400 font-light leading-relaxed text-sm">
            Select components from the sidebar, click the <strong>Usage</strong> tab, and paste them directly into your project.
          </p>
        </div>
      </div>
      <DocsPager />
    </div>
  );
}
