"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxDemoProps {
  variant?: "default" | "checked" | "disabled" | "text";
}

export function CheckboxDemo({ variant }: CheckboxDemoProps) {
  if (variant === "checked") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center gap-2">
        <Checkbox id="terms-checked" defaultChecked />
        <label
          htmlFor="terms-checked"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    );
  }

  if (variant === "disabled") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center gap-2">
        <Checkbox id="terms-disabled" disabled />
        <label
          htmlFor="terms-disabled"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 opacity-50"
        >
          Accept terms and conditions
        </label>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex items-start space-x-2">
        <Checkbox id="terms-text" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms-text"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}
