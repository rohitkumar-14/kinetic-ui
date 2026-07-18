import * as React from 'react';
import { CopyButton } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', className, ...props }: CodeBlockProps) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-border/50 bg-muted/50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-muted/80">
        <span className="text-xs font-medium text-muted-foreground">{language}</span>
        <CopyButton value={code} className="h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" />
      </div>
      <div className="p-4 overflow-x-auto text-sm">
        <pre className={cn("font-mono block whitespace-pre", className)} {...props}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
