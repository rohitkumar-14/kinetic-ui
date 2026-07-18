import * as React from "react"
import { cn } from "@/lib/utils"

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("relative border-l border-border ml-3 md:ml-0", className)} {...props} />
))
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("mb-10 ml-6", className)} {...props} />
))
TimelineItem.displayName = "TimelineItem"

const TimelineDot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-background",
      className
    )}
    {...props}
  />
))
TimelineDot.displayName = "TimelineDot"

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
TimelineContent.displayName = "TimelineContent"

const TimelineTime = React.forwardRef<HTMLTimeElement, React.TimeHTMLAttributes<HTMLTimeElement>>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn("mb-1 text-sm font-normal leading-none text-muted-foreground", className)}
    {...props}
  />
))
TimelineTime.displayName = "TimelineTime"

const TimelineTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
))
TimelineTitle.displayName = "TimelineTitle"

const TimelineDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-base font-normal text-muted-foreground", className)} {...props} />
))
TimelineDescription.displayName = "TimelineDescription"

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineTime,
  TimelineTitle,
  TimelineDescription,
}
