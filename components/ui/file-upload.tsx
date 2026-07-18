"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploadProps extends DropzoneOptions {
  className?: string;
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  label?: string;
  description?: string;
}

export function FileUpload({
  className,
  onFilesChange,
  maxFiles = 5,
  label = "Drag & drop files here",
  description = "or click to select files",
  ...dropzoneProps
}: FileUploadProps) {
  const [files, setFiles] = useState<(File & { preview?: string })[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreviews = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        })
      );
      const newFiles = [...files, ...filesWithPreviews].slice(0, maxFiles);
      setFiles(newFiles);
      if (onFilesChange) onFilesChange(newFiles);
    },
    [files, maxFiles, onFilesChange]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const removedFile = newFiles.splice(index, 1)[0];
    if (removedFile.preview) {
      URL.revokeObjectURL(removedFile.preview);
    }
    setFiles(newFiles);
    if (onFilesChange) onFilesChange(newFiles);
  };

  // Clean up previews on unmount
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    ...dropzoneProps,
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ease-in-out",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border bg-card/50 hover:bg-card hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-foreground">
            Selected Files ({files.length}/{maxFiles})
          </p>
          <div className="grid gap-2">
            {files.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  {file.preview ? (
                    <div className="relative shrink-0 w-10 h-10 rounded-md overflow-hidden border border-border">
                      <img 
                        src={file.preview} 
                        alt={file.name} 
                        className="w-full h-full object-cover" 
                        onLoad={() => {
                          // Prevent memory leaks if component mounts/unmounts rapidly
                          // URL.revokeObjectURL(file.preview!) is handled by unmount effect
                        }}
                      />
                    </div>
                  ) : (
                    <div className="p-2 bg-primary/10 text-primary rounded-md shrink-0 w-10 h-10 flex items-center justify-center">
                      <FileIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
