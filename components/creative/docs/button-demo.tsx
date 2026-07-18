"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MailOpen, ChevronRight, Loader2, Play } from "lucide-react";

export interface ButtonDemoProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "premium";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

export function ButtonDemo({ variant = "default", size = "default", isLoading = false }: ButtonDemoProps) {
  return (
    <div className="w-full h-[200px] flex items-center justify-center p-4">
      {size === "icon" ? (
        <Button variant={variant} size={size} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      ) : (
        <Button variant={variant} size={size} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              {variant === "premium" && <MailOpen className="mr-2 h-4 w-4" />}
              Click Me
            </>
          )}
        </Button>
      )}
    </div>
  );
}
