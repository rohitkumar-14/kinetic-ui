'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sparkles, Sun, Moon, Github, Search, Command as CommandIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CommandPalette } from '@/components/command-palette';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDocs = pathname.startsWith('/docs');
  
  // Hide global navbar on specific template pages
  if (pathname.startsWith('/templates/') && pathname !== '/templates') {
    return null;
  }

  // Full-width docs header layout
  if (isDocs) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md text-foreground select-none transition-colors duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-white/10">
                <img src="/logo.png" alt="Kinetic Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-foreground">KINETIC</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end max-w-xl">
            {/* Command Palette Button */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden md:flex items-center justify-between w-64 px-3 py-1.5 rounded-xl bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors hover:border-border/80 text-xs"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search docs...</span>
              </span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[9px] font-medium text-muted-foreground opacity-100">
                <CommandIcon className="w-2.5 h-2.5" />K
              </kbd>
            </button>
            
            {/* Mobile search button */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="md:hidden p-2 rounded-xl bg-muted border border-border text-muted-foreground hover:text-foreground"
            >
              <Search className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="rounded-xl hover:bg-muted"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Theme Toggle</TooltipContent>
              </Tooltip>

              <Link href="https://github.com/kinetic/ui" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Global Command Palette dialog */}
        <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      </header>
    );
  }

  // Floating menu header layout (default landing page)
  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl border border-border bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30 rounded-full shadow-2xl text-foreground transition-colors duration-300">
        <div className="flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-white/10">
              <img src="/logo.png" alt="Kinetic Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold tracking-tighter">KINETIC</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full hover:bg-accent">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Theme</TooltipContent>
            </Tooltip>
            
            <Link href="https://github.com/kinetic/ui" target="_blank" rel="noreferrer" className="hidden sm:inline-block">
               <Button variant="ghost" className="rounded-full h-9 flex items-center gap-2 hover:bg-accent">
                 <Github className="h-4 w-4" />
               </Button>
            </Link>

            <Link href="/docs">
               <Button className="rounded-full h-9 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 px-6">
                 Explore
               </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Make sure we can trigger command palette via keyboard shortcuts even on landing page */}
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
