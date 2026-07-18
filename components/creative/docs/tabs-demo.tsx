"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings, User, Key, Bell } from "lucide-react";

export interface TabsDemoProps {
  variant?: "default" | "underline" | "pills" | "vertical";
}

export function TabsDemo({ variant }: TabsDemoProps) {
  // 1. Underline Minimal Variant
  if (variant === "underline") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="flex w-full justify-start rounded-none border-b border-white/5 bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="profile" 
              className="relative rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 text-xs font-semibold text-zinc-400 data-[state=active]:border-indigo-500 data-[state=active]:text-white data-[state=active]:bg-transparent shadow-none"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="relative rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 text-xs font-semibold text-zinc-400 data-[state=active]:border-indigo-500 data-[state=active]:text-white data-[state=active]:bg-transparent shadow-none"
            >
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6 text-xs text-zinc-400 leading-relaxed font-light">
            Update your public profile details. Changes take effect globally on save.
          </TabsContent>
          <TabsContent value="security" className="mt-6 text-xs text-zinc-400 leading-relaxed font-light">
            Manage authentication keys, credentials, and API access sessions.
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // 2. Glass Pills Variant
  if (variant === "pills") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="inline-flex gap-1.5 p-1 bg-zinc-900 border border-white/5 rounded-full">
            <TabsTrigger 
              value="profile" 
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-400 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-400 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4 p-4 border border-white/5 bg-white/[0.02] rounded-2xl text-xs text-zinc-400 leading-relaxed font-light">
            Capsule pill-shaped triggers offer a modern, mobile-friendly touch interface.
          </TabsContent>
          <TabsContent value="security" className="mt-4 p-4 border border-white/5 bg-white/[0.02] rounded-2xl text-xs text-zinc-400 leading-relaxed font-light">
            Fully responsive sliding container with smooth transition filters.
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // 3. Vertical Sidebar Variant
  if (variant === "vertical") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Tabs defaultValue="profile" className="w-full flex gap-6">
          <TabsList className="flex flex-col h-auto w-40 justify-start items-stretch bg-zinc-900/40 border border-white/5 p-1.5 rounded-xl shrink-0">
            <TabsTrigger 
              value="profile" 
              className="justify-start px-3 py-2 text-left text-xs font-semibold rounded-lg text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
            >
              Profile Settings
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="justify-start px-3 py-2 text-left text-xs font-semibold rounded-lg text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
            >
              Security Keys
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 min-h-[100px]">
            <TabsContent value="profile" className="mt-0 text-xs text-zinc-400 leading-relaxed font-light">
              <h5 className="font-semibold text-zinc-200 mb-2">Vertical Navigation</h5>
              Vertical layouts are excellent for secondary settings or content-heavy administration interfaces.
            </TabsContent>
            <TabsContent value="security" className="mt-0 text-xs text-zinc-400 leading-relaxed font-light">
              <h5 className="font-semibold text-zinc-200 mb-2">Key Management</h5>
              Keep configuration actions grouped on the left for standard grid-flow scanning.
            </TabsContent>
          </div>
        </Tabs>
      </div>
    );
  }

  // Fallback: Default grid block layout
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border border-white/5 p-1 rounded-xl">
          <TabsTrigger value="account" className="flex items-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
            <User className="w-3.5 h-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
            <Key className="w-3.5 h-3.5" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
            <Bell className="w-3.5 h-3.5" />
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-4 p-4 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-zinc-100">Profile Settings</h4>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Update your public name, primary email address, and avatar options.
          </p>
        </TabsContent>

        <TabsContent value="password" className="mt-4 p-4 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-zinc-100">Security Parameters</h4>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Change your password, enable two-factor token authentication, and view active sessions.
          </p>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 p-4 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-zinc-100">System Notification Feeds</h4>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Choose which email, push, and SMS logs you receive.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
