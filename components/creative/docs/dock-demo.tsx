"use client";

import React, { useState } from "react";
import { Dock, DockItem, DockVariant } from "@/components/creative/dock";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpToLine, MonitorSmartphone, Mail, Map, MessagesSquare, Settings, User } from "lucide-react";

export function DockDemo({
  variant = "floating"
}: {
  variant?: "bottom" | "top" | "floating";
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[400px] flex items-center justify-center bg-grid-white/[0.02]">
          
          <Dock variant={variant}>
            <DockItem label="Mail">
              <Mail className="w-full h-full" />
            </DockItem>
            <DockItem label="Messages">
              <MessagesSquare className="w-full h-full" />
            </DockItem>
            <DockItem label="Maps">
              <Map className="w-full h-full" />
            </DockItem>
            <DockItem label="Profile">
              <User className="w-full h-full" />
            </DockItem>
            <DockItem label="Settings">
              <Settings className="w-full h-full" />
            </DockItem>
          </Dock>

          {/* Helper hint for sticky variants */}
          {variant !== "floating" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <span className="text-zinc-600 text-sm font-medium bg-black/40 px-4 py-2 rounded-full border border-white/5">
                Look at the {variant} of the viewport!
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
