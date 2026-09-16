'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { sidebarContent } from '@/components/docs-sidebar';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    setTimeout(() => {
      React.startTransition(() => {
        command();
      });
    }, 0);
  }, [setOpen]);

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={setOpen}
      filter={(value, search) => {
        if (!search) return 1;
        const searchTerms = search.toLowerCase().split(/\s+/).filter(Boolean);
        let matches = 0;
        
        // Remove common stop words for better "AI-like" natural language querying
        const stopWords = ['a', 'an', 'the', 'i', 'want', 'need', 'looking', 'for', 'type', 'of', 'component', 'that', 'with', 'like'];
        const meaningfulTerms = searchTerms.filter(term => !stopWords.includes(term));
        
        if (meaningfulTerms.length === 0) return 0;

        meaningfulTerms.forEach(term => {
          const valLower = value.toLowerCase();
          if (valLower.includes(term)) {
            matches += 1;
          } else {
            // allow partial/stem matches (e.g. "glowing" matches "glow")
            const valWords = valLower.split(/\s+/);
            if (valWords.some(w => (w.length > 3 && term.includes(w)) || (term.length > 3 && w.includes(term)))) {
              matches += 0.8;
            }
          }
        });
        
        // Return a score between 0 and 1
        return matches > 0 ? (matches / meaningfulTerms.length) : 0;
      }}
    >
      <CommandInput placeholder="What are you looking for? (e.g. 'a glowing button', '3d model')" />
      <CommandList
        data-lenis-prevent
        data-scroll-lock-ignore
        onWheel={(e) => e.stopPropagation()}
        className="bg-black/95 text-white border-t border-white/5 backdrop-blur-xl max-h-[360px] sm:max-h-[420px] overflow-y-auto overscroll-contain pointer-events-auto"
      >
        <CommandEmpty>No matches found. Try different keywords.</CommandEmpty>
        
        {sidebarContent.map((group, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {group.sections.map((section, secIdx) => (
              <CommandGroup key={`${groupIdx}-${secIdx}`} heading={section.title}>
                {section.items
                  .filter((item) => !item.soon)
                  .map((item) => {
                    const slug = item.href.replace('/docs/components/', '');
                    return (
                      <CommandItem
                        key={item.href}
                        value={`${item.title} ${slug} ${section.title} ${group.label} ${item.keywords || ''}`}
                        keywords={[item.title, slug, section.title, ...(item.keywords ? item.keywords.split(' ') : [])]}
                        onSelect={() => runCommand(() => router.push(item.href))}
                        className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg transition-colors text-zinc-300 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                      >
                        <div className="text-purple-400 [&>svg]:w-4 [&>svg]:h-4 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span>{item.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 ml-auto text-zinc-500" />
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            ))}
          </React.Fragment>
        ))}

        <CommandSeparator className="bg-white/5" />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => setTheme('light'))}
            className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg transition-colors text-zinc-300 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
          >
            <Sun className="h-4 w-4 text-amber-400" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme('dark'))}
            className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg transition-colors text-zinc-300 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
          >
            <Moon className="h-4 w-4 text-indigo-400" />
            <span>Dark Mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
