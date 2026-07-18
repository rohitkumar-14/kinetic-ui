"use client";

import { Filter } from "@/components/ui/filter";
import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";

export function FilterDemo() {
  return (
    <div className="w-full min-h-[300px] flex items-start justify-center p-8 bg-zinc-950/20 rounded-2xl border border-white/5 backdrop-blur-md">
      <Filter
        title="Status"
        options={[
          { label: "Done", value: "done", icon: CheckCircle2 },
          { label: "In Progress", value: "in-progress", icon: CircleDashed },
          { label: "Canceled", value: "canceled", icon: XCircle },
        ]}
      />
    </div>
  );
}
