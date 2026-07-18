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
    command();
  }, [setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search documentation, components, actions..." />
      <CommandList className="bg-black/95 text-white border-t border-white/5 backdrop-blur-xl">
        <CommandEmpty>No results found.</CommandEmpty>
        
        {sidebarContent.map((group, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {group.sections.map((section, secIdx) => (
              <CommandGroup key={`${groupIdx}-${secIdx}`} heading={section.title}>
                {section.items
                  .filter((item) => !item.soon)
                  .map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.title + " " + section.title + " " + group.label}
                      onSelect={() => runCommand(() => router.push(item.href))}
                      className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg transition-colors text-zinc-300 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                    >
                      <div className="text-purple-400 [&>svg]:w-4 [&>svg]:h-4 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span>{item.title}</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-auto text-zinc-500" />
                    </CommandItem>
                  ))}
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
