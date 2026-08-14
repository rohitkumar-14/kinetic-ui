"use client";

import { TextShatter } from "@/components/creative/text-shatter";

export default function TextShatterDemo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-xl border border-white/10 overflow-hidden relative">
      <TextShatter text="SHATTER" />
    </div>
  );
}
