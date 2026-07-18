import { CodeBlock } from '@/components/code-block';

export default function InstallationPage() {
  const code = `npm install lucide-react clsx tailwind-merge @radix-ui/react-slot
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs`;

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">Installation</h1>
        <p className="text-lg text-zinc-400 font-light leading-relaxed">
          How to install dependencies and structure your application.
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="dependencies" className="text-2xl font-bold tracking-tight text-white">Dependencies</h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          Install the required motion primitives and helpers used under the hood by the component registry.
        </p>
        <CodeBlock code={code} language="bash" />
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="utils" className="text-2xl font-bold tracking-tight text-white">Utils</h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          Add the following <code>cn</code> class merging utility to your <code>lib/utils.ts</code>:
        </p>
        <CodeBlock code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} language="typescript" />
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h2 id="adding-components" className="text-2xl font-bold tracking-tight text-white">Adding Components</h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          Select components from the left sidebar, click the copy action tab, and paste them directly into your project.
        </p>
      </div>
    </div>
  );
}
