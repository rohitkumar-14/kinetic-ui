"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface CardDemoProps {
  variant?: "default" | "interactive" | "minimal";
}

export function CardDemo({ variant = "default" }: CardDemoProps) {
  const isInteractive = variant === "interactive";
  const isMinimal = variant === "minimal";

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
      <Card 
        className={
          isInteractive 
            ? "hover:border-indigo-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer group"
            : isMinimal
            ? "border-none shadow-none bg-zinc-950/40"
            : ""
        }
      >
        <CardHeader className={isMinimal ? "pb-4" : ""}>
          <CardTitle className={isInteractive ? "group-hover:text-indigo-400 transition-colors" : ""}>
            {isInteractive ? "Interactive Project" : isMinimal ? "Minimal Structure" : "Create project"}
          </CardTitle>
          <CardDescription>
            {isMinimal ? "Clean layout without borders." : "Deploy your new project in one-click."}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isInteractive || isMinimal ? (
            <p className="text-sm text-muted-foreground">
              {isInteractive 
                ? "This card features enhanced hover states with colored borders and glowing shadows, perfect for clickable lists."
                : "Sometimes less is more. This layout removes the heavy borders and shadows for a flat, modern aesthetic."}
            </p>
          ) : (
            <div className="flex flex-col space-y-1.5">
              <span className="text-sm font-medium">Framework</span>
              <span className="text-sm text-muted-foreground">Next.js</span>
            </div>
          )}
        </CardContent>
        
        {!isInteractive && !isMinimal && (
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
