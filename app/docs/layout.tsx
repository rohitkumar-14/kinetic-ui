'use client';
// Trigger rebuild

import * as React from 'react';
import { DocsSidebar } from '@/components/docs-sidebar';
import { DocsRightSidebar } from '@/components/docs-right-sidebar';
import { ThemeCustomizer } from '@/components/theme-customizer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { SmoothScroll } from '@/components/creative/smooth-scroll';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const mainRef = React.useRef<HTMLElement>(null);

  // Lock body scroll while on docs pages so only the panels scroll
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="docs-shell flex flex-col h-screen">
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-background z-50">
        <span className="font-semibold text-sm">Kinetic UI</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 pt-10 w-72" data-lenis-prevent>
            <DocsSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="docs-grid flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="docs-sidebar" data-lenis-prevent>
          <DocsSidebar />
        </aside>

        {/* Main Content */}
        <main ref={mainRef} className="docs-main overflow-y-auto" data-lenis-prevent>
          <SmoothScroll containerRef={mainRef as React.RefObject<any>}>
            <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8">
              {children}
            </div>
          </SmoothScroll>
        </main>

        {/* Right Sidebar — Table of Contents */}
        <aside className="docs-toc" data-lenis-prevent>
          <DocsRightSidebar />
        </aside>
      </div>
      <ThemeCustomizer />
    </div>
  );
}
