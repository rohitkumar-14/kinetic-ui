"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Floating Input ─── */
export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, type = "text", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className={cn("relative flex items-center w-full rounded-xl border transition-colors duration-300 bg-black/40 backdrop-blur-md", 
        isFocused ? "border-indigo-500/50 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]" : "border-white/10",
        className
      )}>
        <div className="relative flex-1 px-4 py-2">
          <motion.label
            className="absolute left-4 text-zinc-500 pointer-events-none origin-left"
            initial={false}
            animate={{
              y: isFocused || hasValue ? -22 : 0,
              scale: isFocused || hasValue ? 0.75 : 1,
              color: isFocused ? "#818cf8" : "#71717a",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {label}
          </motion.label>
          <input
            ref={ref}
            type={type}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
            className="w-full bg-transparent outline-none text-white placeholder-transparent pt-1"
            placeholder={label}
            {...props}
          />
        </div>
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

/* ─── Floating Textarea ─── */
export interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className={cn("relative flex w-full rounded-xl border transition-colors duration-300 bg-black/40 backdrop-blur-md overflow-hidden", 
        isFocused ? "border-indigo-500/50 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]" : "border-white/10",
        className
      )}>
        <div className="relative flex-1 px-4 py-3">
          <motion.label
            className="absolute left-4 top-3 text-zinc-500 pointer-events-none origin-left"
            initial={false}
            animate={{
              y: isFocused || hasValue ? -24 : 0,
              scale: isFocused || hasValue ? 0.75 : 1,
              color: isFocused ? "#818cf8" : "#71717a",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {label}
          </motion.label>
          <textarea
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
            className="w-full bg-transparent outline-none text-white placeholder-transparent pt-1 resize-none min-h-[100px]"
            placeholder={label}
            {...props}
          />
        </div>
      </div>
    );
  }
);
FloatingTextarea.displayName = "FloatingTextarea";

/* ─── Floating Checkbox ─── */
export interface FloatingCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingCheckbox = React.forwardRef<HTMLInputElement, FloatingCheckboxProps>(
  ({ className, label, ...props }, ref) => {
    // We use local state for uncontrolled usage visual feedback, 
    // but typically these are managed by a form library.
    const [isChecked, setIsChecked] = useState(props.defaultChecked || !!props.checked);

    return (
      <label className={cn("relative flex items-center gap-3 w-full rounded-xl border transition-colors duration-300 bg-black/40 backdrop-blur-md px-4 py-3 cursor-pointer select-none", 
        isChecked ? "border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.2)]" : "border-white/10 hover:bg-white/5",
        className
      )}>
        <div className={cn("relative w-5 h-5 flex items-center justify-center rounded border transition-colors duration-200",
          isChecked ? "bg-indigo-500 border-indigo-500" : "bg-black/50 border-white/20"
        )}>
          <input
            type="checkbox"
            ref={ref}
            className="sr-only"
            onChange={(e) => {
              setIsChecked(e.target.checked);
              props.onChange?.(e);
            }}
            {...props}
          />
          <motion.svg
            initial={false}
            animate={{ 
              scale: isChecked ? 1 : 0, 
              opacity: isChecked ? 1 : 0 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-3.5 h-3.5 text-white pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        </div>
        <span className={cn("text-sm transition-colors duration-200", isChecked ? "text-white" : "text-zinc-400")}>
          {label}
        </span>
      </label>
    );
  }
);
FloatingCheckbox.displayName = "FloatingCheckbox";

/* ─── Floating Radio ─── */
export interface FloatingRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingRadio = React.forwardRef<HTMLInputElement, FloatingRadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className={cn("relative flex items-center gap-3 w-full rounded-xl border transition-colors duration-300 bg-black/40 backdrop-blur-md px-4 py-3 cursor-pointer select-none group", 
        props.checked ? "border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.2)]" : "border-white/10 hover:bg-white/5",
        className
      )}>
        <div className={cn("relative w-5 h-5 flex items-center justify-center rounded-full border transition-colors duration-200",
          props.checked ? "border-indigo-500" : "bg-black/50 border-white/20 group-hover:border-white/40"
        )}>
          <input
            type="radio"
            ref={ref}
            className="sr-only"
            {...props}
          />
          <motion.div
            initial={false}
            animate={{ 
              scale: props.checked ? 1 : 0, 
              opacity: props.checked ? 1 : 0 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-2.5 h-2.5 rounded-full bg-indigo-500"
          />
        </div>
        <span className={cn("text-sm transition-colors duration-200", props.checked ? "text-white" : "text-zinc-400")}>
          {label}
        </span>
      </label>
    );
  }
);
FloatingRadio.displayName = "FloatingRadio";
