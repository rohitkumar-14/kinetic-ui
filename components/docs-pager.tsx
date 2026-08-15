"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sidebarContent, SidebarItem } from "@/components/docs-sidebar";

export function DocsPager() {
  const pathname = usePathname();

  // Flatten the sidebar content to get a linear list of links
  const flattenedLinks: SidebarItem[] = React.useMemo(() => {
    const links: SidebarItem[] = [];
    sidebarContent.forEach((group) => {
      group.sections.forEach((section) => {
        section.items.forEach((item) => {
          if (!item.soon) {
            links.push(item);
          }
        });
      });
    });
    return links;
  }, []);

  const currentIndex = flattenedLinks.findIndex((link) => link.href === pathname);

  if (currentIndex === -1) {
    return null;
  }

  const prev = currentIndex > 0 ? flattenedLinks[currentIndex - 1] : null;
  const next = currentIndex < flattenedLinks.length - 1 ? flattenedLinks[currentIndex + 1] : null;

  return (
    <div className="flex flex-row items-center justify-between mt-20 pt-8 border-t border-border/50">
      <div className="flex-1">
        {prev && (
          <Link
            href={prev.href}
            className="group flex flex-col gap-1 items-start w-fit text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="text-sm font-medium text-foreground">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="flex-1 flex justify-end">
        {next && (
          <Link
            href={next.href}
            className="group flex flex-col gap-1 items-end w-fit text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1">
              Next
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-sm font-medium text-foreground">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
