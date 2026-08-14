"use client";

import React from "react";
import { ConfettiButton } from "@/components/creative/confetti-button";

export default function ConfettiButtonDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-background border border-border rounded-xl gap-8">
      
      <div className="flex flex-col sm:flex-row gap-6">
        <ConfettiButton>
          Celebrate! 🎉
        </ConfettiButton>
        
        <ConfettiButton 
          className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 bg-none hover:shadow-none hover:from-transparent hover:to-transparent"
          options={{
            particleCount: 200,
            spread: 160,
            colors: ["#ffffff", "#cccccc", "#999999"]
          }}
        >
          Winter Blast ❄️
        </ConfettiButton>
      </div>

    </div>
  );
}
