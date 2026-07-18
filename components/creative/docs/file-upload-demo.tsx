"use client";

import React from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function FileUploadDemo({ maxFiles = 3 }: { maxFiles?: number }) {
  return (
    <div className="flex items-center justify-center p-6 w-full max-w-md mx-auto">
      <FileUpload maxFiles={maxFiles} />
    </div>
  );
}
