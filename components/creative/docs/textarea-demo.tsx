"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";

export interface TextareaDemoProps {
  variant?: "default" | "error" | "label";
}

export function TextareaDemo({ variant }: TextareaDemoProps) {
  if (variant === "error") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
        <Textarea 
          placeholder="Type your message here." 
          error="Message cannot be empty." 
        />
      </div>
    );
  }

  if (variant === "label") {
    return (
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
        <Textarea 
          label="Your Message" 
          placeholder="Type your message here." 
          helperText="Your message will be copied to the support team."
        />
      </div>
    );
  }

  // Default variant
  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4">
      <Textarea placeholder="Type your message here." />
    </div>
  );
}
