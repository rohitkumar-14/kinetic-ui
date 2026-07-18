"use client";

import React, { useState } from "react";
import { ExpandableSidebar, SidebarItem, SidebarHeader, ExpandableSidebarVariant } from "@/components/creative/expandable-sidebar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Users, Settings, Bell, Search, Layers, MoveRight, MousePointerClick, AppWindow } from "lucide-react";

export function ExpandableSidebarDemo({
  variant = "hover"
}: {
  variant?: "hover" | "click" | "floating";
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[450px] flex bg-grid-white/[0.02]">
          
          <ExpandableSidebar variant={variant}>
            <SidebarHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-white">Workspace</span>
              </div>
            </SidebarHeader>

            <div className="flex-1 py-4 flex flex-col gap-2">
              <SidebarItem icon={<Search className="w-5 h-5" />} label="Search" />
              <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" isActive />
              <SidebarItem icon={<Users className="w-5 h-5" />} label="Team Members" />
              <SidebarItem icon={<Bell className="w-5 h-5" />} label="Notifications" />
            </div>

            <div className="pb-6">
              <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
            </div>
          </ExpandableSidebar>

          <div className="flex-1 p-8 relative z-0">
            <h3 className="text-xl font-semibold text-white mb-2">Main Content Area</h3>
            <p className="text-zinc-500 text-sm max-w-md">
              The sidebar interacts with this content. Depending on the variant, it will either push this content aside or float over it.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-24 rounded-xl bg-white/5 border border-white/5" />
              <div className="h-24 rounded-xl bg-white/5 border border-white/5" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
