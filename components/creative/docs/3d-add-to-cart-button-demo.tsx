"use client";

import React from "react";
import { ThreeDAddToCartButton } from "@/components/creative/3d-add-to-cart-button";

export function ThreeDAddToCartButtonDemo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center bg-zinc-950 rounded-xl border border-border">
      <ThreeDAddToCartButton productColor="#ec4899" />
    </div>
  );
}
