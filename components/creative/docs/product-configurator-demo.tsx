"use client";

import React from "react";
import { ProductConfigurator } from "@/components/creative/product-configurator";

export function ProductConfiguratorDemo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <ProductConfigurator />
    </div>
  );
}
