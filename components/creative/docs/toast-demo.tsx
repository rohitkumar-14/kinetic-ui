"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ToastDemo() {
  return (
    <div className="w-full min-h-[300px] flex flex-wrap gap-4 items-center justify-center p-8 bg-zinc-950/20 rounded-2xl border border-white/5 backdrop-blur-md">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
      
      <Button
        variant="outline"
        onClick={() => toast.success("Project deployed successfully!")}
      >
        Success Toast
      </Button>
      
      <Button
        variant="outline"
        className="text-red-400 border-red-500/20 hover:bg-red-500/10"
        onClick={() => toast.error("Failed to delete project.")}
      >
        Error Toast
      </Button>
    </div>
  );
}
