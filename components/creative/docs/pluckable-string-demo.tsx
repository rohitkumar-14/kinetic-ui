"use client";

import React from "react";
import { PluckableString } from "@/components/creative/pluckable-string";

export default function PluckableStringDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">Pluckable String Physics</h2>
        <p className="text-zinc-400">
          Drag your cursor across the lines below to pluck them like guitar strings.
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-0">
        <PluckableString strokeColor="#ec4899" />
        <PluckableString strokeColor="#8b5cf6" />
        <PluckableString strokeColor="#3b82f6" />
        <PluckableString strokeColor="#10b981" />
      </div>

    </div>
  );
}
