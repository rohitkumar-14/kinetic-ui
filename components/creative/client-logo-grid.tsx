"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ClientLogo {
  id: string | number;
  name: string;
  src: string;
  href?: string;
}

export interface ClientLogoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: ClientLogo[];
}

export function ClientLogoGrid({ logos, className, ...props }: ClientLogoGridProps) {
  return (
    <div 
      className={cn("grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 items-center justify-items-center", className)}
      {...props}
    >
      {logos.map((logo) => {
        const content = (
          <div className="relative group w-full flex items-center justify-center p-4">
            <img
              src={logo.src}
              alt={logo.name}
              className="max-w-[120px] w-full max-h-12 object-contain filter grayscale opacity-50 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:opacity-100"
            />
            {/* Optional Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {logo.name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-zinc-800" />
            </div>
          </div>
        );

        if (logo.href) {
          return (
            <a 
              key={logo.id} 
              href={logo.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            >
              {content}
            </a>
          );
        }

        return <div key={logo.id} className="w-full">{content}</div>;
      })}
    </div>
  );
}
