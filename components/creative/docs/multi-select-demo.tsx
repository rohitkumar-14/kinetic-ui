"use client";

import { useState } from "react";
import { MultiSelect, Option } from "@/components/ui/multi-select";

const frameworks: Option[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
];

export function MultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <MultiSelect 
        options={frameworks} 
        selected={selected} 
        onChange={setSelected} 
        placeholder="Select frameworks..." 
      />
    </div>
  );
}
