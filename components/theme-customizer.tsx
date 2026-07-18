"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Paintbrush, Check, Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const THEME_PRESETS = [
  {
    name: "slate",
    label: "Slate",
    color: "#0f172a",
    vars: {
      light: { "--primary": "#0f172a", "--primary-foreground": "#f8fafc", "--ring": "#0f172a" },
      dark: { "--primary": "#f8fafc", "--primary-foreground": "#0f172a", "--ring": "#f8fafc" }
    }
  },
  {
    name: "blue",
    label: "Blue",
    color: "#2563eb",
    vars: {
      light: { "--primary": "#2563eb", "--primary-foreground": "#ffffff", "--ring": "#2563eb" },
      dark: { "--primary": "#3b82f6", "--primary-foreground": "#ffffff", "--ring": "#3b82f6" }
    }
  },
  {
    name: "violet",
    label: "Violet",
    color: "#7c3aed",
    vars: {
      light: { "--primary": "#7c3aed", "--primary-foreground": "#ffffff", "--ring": "#7c3aed" },
      dark: { "--primary": "#8b5cf6", "--primary-foreground": "#ffffff", "--ring": "#8b5cf6" }
    }
  },
  {
    name: "emerald",
    label: "Emerald",
    color: "#059669",
    vars: {
      light: { "--primary": "#059669", "--primary-foreground": "#ffffff", "--ring": "#059669" },
      dark: { "--primary": "#10b981", "--primary-foreground": "#ffffff", "--ring": "#10b981" }
    }
  },
  {
    name: "rose",
    label: "Rose",
    color: "#e11d48",
    vars: {
      light: { "--primary": "#e11d48", "--primary-foreground": "#ffffff", "--ring": "#e11d48" },
      dark: { "--primary": "#f43f5e", "--primary-foreground": "#ffffff", "--ring": "#f43f5e" }
    }
  }
];

const RADII = ["0", "0.3rem", "0.5rem", "0.75rem", "1.0rem"];

export function ThemeCustomizer() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [activeColor, setActiveColor] = React.useState("slate");
  const [activeRadius, setActiveRadius] = React.useState("0.75rem");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Update CSS Variables when config changes
  React.useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const isDark = resolvedTheme === "dark";
    
    // Set Radius
    root.style.setProperty("--radius-lg", activeRadius);
    root.style.setProperty("--radius-md", `calc(${activeRadius} - 2px)`);
    root.style.setProperty("--radius-sm", `calc(${activeRadius} - 4px)`);

    // Set Colors
    const preset = THEME_PRESETS.find(p => p.name === activeColor);
    if (preset) {
      const vars = isDark ? preset.vars.dark : preset.vars.light;
      Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [activeColor, activeRadius, resolvedTheme, mounted]);

  const generateCSSCode = () => {
    const preset = THEME_PRESETS.find(p => p.name === activeColor);
    if (!preset) return "";

    return `/* Add this to your globals.css */
:root {
  --primary: ${preset.vars.light["--primary"]};
  --primary-foreground: ${preset.vars.light["--primary-foreground"]};
  --ring: ${preset.vars.light["--ring"]};
  
  --radius-lg: ${activeRadius};
  --radius-md: calc(${activeRadius} - 2px);
  --radius-sm: calc(${activeRadius} - 4px);
}

.dark {
  --primary: ${preset.vars.dark["--primary"]};
  --primary-foreground: ${preset.vars.dark["--primary-foreground"]};
  --ring: ${preset.vars.dark["--ring"]};
}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSSCode());
    alert("CSS copied to clipboard!");
  };

  if (!mounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl bg-background border-border/50 hover:scale-105 transition-all duration-300"
        >
          <Paintbrush className="w-6 h-6 text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[340px]">
        <SheetHeader>
          <SheetTitle>Theme Customizer</SheetTitle>
          <SheetDescription>
            Customize the look and feel of Kinetic UI.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-8">
          {/* Colors */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Color</h4>
            <div className="grid grid-cols-3 gap-2">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setActiveColor(preset.name)}
                  className={cn(
                    "flex items-center gap-2 justify-center rounded-md border-2 border-transparent p-2 transition-all hover:bg-muted text-xs font-medium",
                    activeColor === preset.name ? "border-primary bg-muted/50" : "border-border/40"
                  )}
                >
                  <span 
                    className="flex h-4 w-4 shrink-0 rounded-full items-center justify-center"
                    style={{ backgroundColor: preset.color }}
                  >
                    {activeColor === preset.name && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </span>
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Radius */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Radius</h4>
            <div className="flex items-center gap-2 flex-wrap">
              {RADII.map((radius) => (
                <button
                  key={radius}
                  onClick={() => setActiveRadius(radius)}
                  className={cn(
                    "flex items-center justify-center rounded-md border border-border/40 px-3 py-1.5 text-xs font-medium transition-all hover:bg-muted",
                    activeRadius === radius && "border-primary bg-primary text-primary-foreground hover:bg-primary"
                  )}
                >
                  {radius}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Mode</h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center justify-center rounded-md border border-border/40 p-2 text-xs font-medium hover:bg-muted transition-all",
                  theme === "light" && "border-primary bg-muted/50"
                )}
              >
                <Sun className="mr-2 h-4 w-4" /> Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center justify-center rounded-md border border-border/40 p-2 text-xs font-medium hover:bg-muted transition-all",
                  theme === "dark" && "border-primary bg-muted/50"
                )}
              >
                <Moon className="mr-2 h-4 w-4" /> Dark
              </button>
              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "flex items-center justify-center rounded-md border border-border/40 p-2 text-xs font-medium hover:bg-muted transition-all",
                  theme === "system" && "border-primary bg-muted/50"
                )}
              >
                <Monitor className="mr-2 h-4 w-4" /> System
              </button>
            </div>
          </div>

          {/* Copy Code */}
          <div className="pt-4 border-t border-border">
            <Button onClick={copyToClipboard} className="w-full font-bold">
              Copy CSS Code
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
