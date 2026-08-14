"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface MultiStepIslandProps {
  className?: string;
}

export function MultiStepIsland({ className }: MultiStepIslandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            layoutId="island-container"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full text-black font-medium shadow-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span layoutId="island-title">Subscribe to Newsletter</motion.span>
          </motion.button>
        ) : (
          <motion.div
            layoutId="island-container"
            className="absolute z-50 w-[350px] bg-white rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => setStep(1), 500); // reset after close
              }}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <motion.h3 layoutId="island-title" className="text-xl font-bold text-black">
                    Subscribe to Newsletter
                  </motion.h3>
                  <p className="text-zinc-500 text-sm">
                    Get the latest UI components and design trends delivered to your inbox weekly.
                  </p>
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full px-4 py-2 bg-zinc-100 rounded-xl outline-none focus:ring-2 focus:ring-black text-black"
                  />
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-black text-white rounded-xl font-medium mt-2"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 mt-2 items-center text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black">You're on the list!</h3>
                  <p className="text-zinc-500 text-sm">
                    Keep an eye on your inbox for your first issue.
                  </p>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setStep(1), 500);
                    }}
                    className="w-full py-3 bg-zinc-100 text-black hover:bg-zinc-200 rounded-xl font-medium mt-4 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false);
              setTimeout(() => setStep(1), 500);
            }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
