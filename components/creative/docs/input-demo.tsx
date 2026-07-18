"use client";

import React from "react";
import { Input } from "@/components/ui/input";

export interface InputDemoProps {
  variant?: "default" | "error" | "helper" | "file";
}

export function InputDemo({ variant }: InputDemoProps) {
  if (variant === "error") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
        <Input 
          type="email" 
          placeholder="Email address" 
          error="Please enter a valid email address."
        />
      </div>
    );
  }

  if (variant === "helper") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
        <Input 
          label="Password"
          type="password" 
          placeholder="Password" 
          helperText="Must be at least 8 characters long."
        />
      </div>
    );
  }

  if (variant === "file") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
        <Input 
          label="Upload Document"
          type="file" 
        />
      </div>
    );
  }

  // Default variant
  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
      <Input 
        type="email" 
        placeholder="Email address" 
      />
    </div>
  );
}
