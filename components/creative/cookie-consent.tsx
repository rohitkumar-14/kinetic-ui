"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CookieConsentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: () => void;
  variant?: "modal" | "bottom-bar";
  delay?: number;
}

export function CookieConsent({
  onAcceptAll,
  onRejectAll,
  onCustomize,
  variant = "modal",
  delay = 1000,
  className,
  ...props
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // In a real app, check localStorage here to see if already consented
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 500); // Wait for exit animation
    onAcceptAll?.();
  };

  const handleReject = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 500);
    onRejectAll?.();
  };

  if (isDismissed) return null;

  if (variant === "bottom-bar") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6 bg-zinc-950 border-t border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4",
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-desc"
            {...props}
          >
            <div className="flex items-center gap-4 text-left">
              <div className="hidden md:flex p-3 bg-white/5 rounded-full">
                <Cookie className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 id="cookie-title" className="text-white font-semibold mb-1">We value your privacy</h4>
                <p id="cookie-desc" className="text-zinc-400 text-sm max-w-2xl">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => onCustomize?.()}
                className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
              >
                Customize
              </button>
              <button 
                onClick={handleReject}
                className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
              >
                Reject All
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Modal variant
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={cn(
            "fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[999] md:max-w-[400px] bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden",
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          aria-describedby="cookie-modal-desc"
          {...props}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-500/10 rounded-full">
                <Cookie className="w-6 h-6 text-indigo-400" />
              </div>
              <button 
                onClick={handleReject}
                aria-label="Close and reject cookies"
                className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h4 id="cookie-modal-title" className="text-lg font-bold text-white mb-2">Cookie Preferences</h4>
            <p id="cookie-modal-desc" className="text-zinc-400 text-sm mb-6 leading-relaxed">
              We use cookies to improve your experience and analyze site traffic. 
              Read our <a href="#" className="text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">Privacy Policy</a> to learn more.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleAccept}
                className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-colors"
              >
                Accept All
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={handleReject}
                  className="flex-1 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  Reject
                </button>
                <button 
                  onClick={() => onCustomize?.()}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Settings2 className="w-4 h-4" />
                  Customize
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
