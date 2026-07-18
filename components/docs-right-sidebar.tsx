'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, Edit, ExternalLink, HelpCircle } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function DocsRightSidebar() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  
  // Track scroll progress of the page
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Extract headings from the page content dynamically on load or pathname changes
  useEffect(() => {
    const extractHeadings = () => {
      const mainContainer = document.querySelector('main');
      if (!mainContainer) return;

      const headingElements = mainContainer.querySelectorAll('h2, h3');
      const tocItems: TocItem[] = Array.from(headingElements).map((el) => {
        // Ensure element has an ID
        if (!el.id) {
          const text = el.textContent || '';
          el.id = text
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: el.tagName === 'H2' ? 2 : 3
        };
      });

      setHeadings(tocItems);
    };

    // Delay slightly to allow MDX content to fully hydrate
    const timer = setTimeout(extractHeadings, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Set up IntersectionObserver to track which heading is active
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Set active to the first visible entry
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) return null;

  return (
    <div className="w-full h-full py-8 pl-6 border-l border-border bg-background text-foreground relative transition-colors duration-300 overflow-y-auto overscroll-contain pb-10 sidebar-scrollbar">
      <div className="space-y-8">
        
        {/* Table of Contents List */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            On this page
          </h4>
          
          <div className="relative flex gap-3">
            {/* Scroll depth indicator line */}
            <div className="relative w-0.5 bg-muted rounded-full overflow-hidden self-stretch">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-indigo-500 origin-top h-full"
                style={{ scaleY }}
              />
            </div>

            <ul className="space-y-3.5 text-sm">
              {headings.map((heading, idx) => {
                const isActive = activeId === heading.id;
                return (
                  <li 
                    key={`${heading.id}-${idx}`} 
                    style={{ paddingLeft: heading.level === 3 ? '12px' : '0px' }}
                    className="relative"
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className={`text-left transition-colors duration-200 hover:text-foreground ${
                        isActive ? 'text-indigo-500 font-medium' : 'text-muted-foreground font-light'
                      }`}
                    >
                      {heading.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Quick Nav Actions */}
        <div className="space-y-3 pt-6 border-t border-border text-xs text-muted-foreground">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Scroll to top</span>
          </button>
          
          <a 
            href="https://github.com/kinetic/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit this page</span>
          </a>

          <a 
            href="#"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need help?</span>
          </a>
        </div>

      </div>
    </div>
  );
}
