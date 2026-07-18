"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { FolderSearch, Ghost, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EmptyStateDemoProps {
  variant?: "default" | "404" | "action";
}

export function EmptyStateDemo({ variant = "default" }: EmptyStateDemoProps) {
  if (variant === "404") {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <EmptyState
          icon={Ghost}
          title="Page Not Found"
          description="The page you are looking for doesn't exist or has been moved."
          action={
            <Button variant="outline">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          }
          className="bg-zinc-950/40 border-white/5 backdrop-blur-md"
        />
      </div>
    );
  }

  if (variant === "action") {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <EmptyState
          icon={FolderSearch}
          title="No Projects Found"
          description="You haven't created any projects yet. Start by creating a new project to see it here."
          action={
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
              Create Project
            </Button>
          }
          className="bg-zinc-950/40 border-white/5 backdrop-blur-md"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <EmptyState
        icon={FolderSearch}
        title="No Results Found"
        description="Try adjusting your search or filter to find what you're looking for."
        className="bg-zinc-950/40 border-white/5 backdrop-blur-md"
      />
    </div>
  );
}
