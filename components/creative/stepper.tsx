"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string | number;
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number; // 0-indexed
  direction?: "horizontal" | "vertical";
}

export function Stepper({
  steps,
  currentStep,
  direction = "horizontal",
  className,
  ...props
}: StepperProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        direction === "horizontal" ? "flex-row items-start justify-between" : "flex-col gap-8",
        className
      )}
      role="list"
      aria-label="Progress"
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;
        const isUpcoming = currentStep < index;

        return (
          <div
            key={step.id}
            className={cn(
              "relative flex",
              direction === "horizontal" 
                ? "flex-col items-center flex-1 text-center" 
                : "flex-row items-start gap-4"
            )}
            role="listitem"
            aria-current={isActive ? "step" : undefined}
          >
            {/* Connecting Line (except for last item) */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute bg-white/10 transition-colors duration-500",
                  direction === "horizontal"
                    ? "top-5 left-1/2 w-full h-[2px] -translate-y-1/2 ml-4"
                    : "top-10 left-5 w-[2px] h-full -ml-[1px]"
                )}
              >
                {/* Active portion of the line */}
                <motion.div
                  className="bg-indigo-500 w-full h-full origin-left top-0 left-0"
                  initial={{ scaleX: 0, scaleY: 0 }}
                  animate={{
                    scaleX: direction === "horizontal" ? (isCompleted ? 1 : 0) : 1,
                    scaleY: direction === "vertical" ? (isCompleted ? 1 : 0) : 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}

            {/* Step Indicator */}
            <div className="relative z-10 flex shrink-0 items-center justify-center w-10 h-10 rounded-full border-2 bg-zinc-950 transition-colors duration-300"
              style={{
                borderColor: isActive ? "#6366f1" : isCompleted ? "#10b981" : "rgba(255,255,255,0.1)"
              }}
            >
              {isCompleted ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <span className={cn("text-sm font-semibold", isActive ? "text-indigo-400" : "text-zinc-500")}>
                  {index + 1}
                </span>
              )}
              
              {/* Active Pulse Effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-indigo-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>

            {/* Step Content */}
            <div className={cn(
              "flex flex-col",
              direction === "horizontal" ? "mt-4 items-center" : "mt-1"
            )}>
              <h4 className={cn(
                "text-sm font-bold transition-colors duration-300",
                isActive ? "text-white" : isCompleted ? "text-zinc-300" : "text-zinc-600"
              )}>
                {step.label}
              </h4>
              {step.description && (
                <p className={cn(
                  "text-xs mt-1 transition-colors duration-300",
                  isActive ? "text-zinc-400" : "text-zinc-600"
                )}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
