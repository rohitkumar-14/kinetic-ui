"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string | number;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  icon?: React.ReactNode;
}

export interface NotificationCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  notifications: Notification[];
  onMarkAllRead?: () => void;
  onNotificationClick?: (id: string | number) => void;
}

export function NotificationCenter({
  notifications = [],
  onMarkAllRead,
  onNotificationClick,
  className,
  ...props
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef} {...props}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Notifications (${unreadCount} unread)`}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-6 h-6 text-zinc-300" />
        ) : (
          <Bell className="w-6 h-6 text-zinc-400" />
        )}
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-zinc-950"
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 origin-top-right"
            role="dialog"
            aria-label="Notifications"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={onMarkAllRead}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <Check className="w-3 h-3" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((notification, i) => (
                    <button
                      key={notification.id}
                      onClick={() => {
                        onNotificationClick?.(notification.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full text-left p-4 flex gap-4 transition-colors hover:bg-white/5 border-b border-white/5 last:border-0 focus:outline-none focus:bg-white/10",
                        notification.unread ? "bg-indigo-500/5" : ""
                      )}
                      aria-label={`${notification.title} - ${notification.description}`}
                    >
                      {/* Icon */}
                      <div className={cn(
                        "shrink-0 w-10 h-10 rounded-full flex items-center justify-center border",
                        notification.unread 
                          ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" 
                          : "bg-zinc-800 border-zinc-700 text-zinc-400"
                      )}>
                        {notification.icon || <Bell className="w-4 h-4" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={cn(
                            "text-sm font-semibold truncate",
                            notification.unread ? "text-white" : "text-zinc-300"
                          )}>
                            {notification.title}
                          </p>
                          {notification.unread && (
                            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 mb-2 leading-relaxed">
                          {notification.description}
                        </p>
                        <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center text-zinc-500">
                  <Bell className="w-8 h-8 mb-3 opacity-20" />
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-2 border-t border-white/10 bg-zinc-950">
                <button className="w-full py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
