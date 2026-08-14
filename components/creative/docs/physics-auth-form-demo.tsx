"use client";

import React from "react";
import { PhysicsAuthForm } from "@/components/creative/physics-auth-form";

export function PhysicsAuthFormDemo() {
  return (
    <div className="w-full min-h-[600px] bg-zinc-950 relative flex items-center justify-center p-4 overflow-hidden border border-border rounded-xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative z-10 w-full flex justify-center">
        <PhysicsAuthForm />
      </div>
    </div>
  );
}
