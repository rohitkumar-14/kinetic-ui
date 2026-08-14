"use client";

import { PortalScroll } from "@/components/creative/portal-scroll";

export default function PortalScrollDemo() {
  return (
    <div className="w-full bg-background border border-border rounded-xl relative overflow-hidden">
      <PortalScroll src="https://en.wikipedia.org/wiki/React_(software)" />
    </div>
  );
}
