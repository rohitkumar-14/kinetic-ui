"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SwitchDemo() {
  return (
    <div className="w-full min-h-[300px] flex flex-col gap-6 items-center justify-center p-8 bg-zinc-950/20 rounded-2xl border border-white/5 backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Push Notifications</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled">Disabled Switch</Label>
      </div>
    </div>
  );
}
