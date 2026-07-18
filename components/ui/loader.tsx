import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const loaderVariants = cva("inline-flex items-center justify-center text-muted-foreground", {
  variants: {
    variant: {
      spinner: "",
      dots: "",
      pulse: "",
      ring: "",
      bars: "",
      grid: "",
    },
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    variant: "spinner",
    size: "default",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {}

export function Loader({ className, variant, size, ...props }: LoaderProps) {
  if (variant === "dots") {
    return (
      <div
        className={cn("flex items-center justify-center space-x-1.5", className)}
        {...props}
      >
        <div className={cn("rounded-full bg-current animate-[bounce_1.4s_infinite_ease-in-out_both]", 
          size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-2.5 h-2.5' : size === 'xl' ? 'w-4 h-4' : 'w-2 h-2',
          "[-webkit-animation-delay:-0.32s]")} 
        />
        <div className={cn("rounded-full bg-current animate-[bounce_1.4s_infinite_ease-in-out_both]", 
          size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-2.5 h-2.5' : size === 'xl' ? 'w-4 h-4' : 'w-2 h-2',
          "[-webkit-animation-delay:-0.16s]")} 
        />
        <div className={cn("rounded-full bg-current animate-[bounce_1.4s_infinite_ease-in-out_both]", 
          size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-2.5 h-2.5' : size === 'xl' ? 'w-4 h-4' : 'w-2 h-2')} 
        />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={cn(
          "rounded-full bg-current animate-ping opacity-75",
          loaderVariants({ size, className })
        )}
        {...props}
      />
    );
  }

  if (variant === "ring") {
    return (
      <div className={cn("relative", loaderVariants({ size, className }))} {...props}>
        <div className="absolute inset-0 rounded-full border-[3px] border-current opacity-20" />
        <div className="absolute inset-0 rounded-full border-[3px] border-current border-t-transparent animate-spin" />
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-center justify-center space-x-1", className)} {...props}>
        <div className={cn("bg-current animate-[pulse_1s_ease-in-out_infinite]", size === 'sm' ? 'w-1 h-3' : size === 'lg' ? 'w-2 h-8' : size === 'xl' ? 'w-3 h-12' : 'w-1.5 h-5')} />
        <div className={cn("bg-current animate-[pulse_1s_ease-in-out_infinite_0.2s]", size === 'sm' ? 'w-1 h-3' : size === 'lg' ? 'w-2 h-8' : size === 'xl' ? 'w-3 h-12' : 'w-1.5 h-5')} />
        <div className={cn("bg-current animate-[pulse_1s_ease-in-out_infinite_0.4s]", size === 'sm' ? 'w-1 h-3' : size === 'lg' ? 'w-2 h-8' : size === 'xl' ? 'w-3 h-12' : 'w-1.5 h-5')} />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid grid-cols-2 gap-1", size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : size === 'xl' ? 'w-12 h-12' : 'w-6 h-6', className)} {...props}>
        <div className="bg-current rounded-sm animate-[pulse_1.5s_ease-in-out_infinite]" />
        <div className="bg-current rounded-sm animate-[pulse_1.5s_ease-in-out_infinite_0.3s]" />
        <div className="bg-current rounded-sm animate-[pulse_1.5s_ease-in-out_infinite_0.6s]" />
        <div className="bg-current rounded-sm animate-[pulse_1.5s_ease-in-out_infinite_0.9s]" />
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn("inline-flex items-center justify-center", className)} {...props}>
      <Loader2
        className={cn("animate-spin", loaderVariants({ size }))}
      />
    </div>
  );
}
