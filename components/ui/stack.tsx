import * as React from "react"
import { cn } from "@/lib/utils"

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  spacing?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16"
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "col",
      align = "stretch",
      justify = "start",
      spacing = "4",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "col" ? "flex-col" : "flex-row",
          {
            "items-start": align === "start",
            "items-center": align === "center",
            "items-end": align === "end",
            "items-stretch": align === "stretch",
            "items-baseline": align === "baseline",
            "justify-start": justify === "start",
            "justify-center": justify === "center",
            "justify-end": justify === "end",
            "justify-between": justify === "between",
            "justify-around": justify === "around",
            "justify-evenly": justify === "evenly",
            "gap-0": spacing === "0",
            "gap-1": spacing === "1",
            "gap-2": spacing === "2",
            "gap-3": spacing === "3",
            "gap-4": spacing === "4",
            "gap-5": spacing === "5",
            "gap-6": spacing === "6",
            "gap-8": spacing === "8",
            "gap-10": spacing === "10",
            "gap-12": spacing === "12",
            "gap-16": spacing === "16",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

export const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>((props, ref) => (
  <Stack ref={ref} direction="row" align="center" {...props} />
))
HStack.displayName = "HStack"

export const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>((props, ref) => (
  <Stack ref={ref} direction="col" {...props} />
))
VStack.displayName = "VStack"
