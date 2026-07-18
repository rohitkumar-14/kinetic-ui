"use client";

import React, { useState } from "react";
import { AIStreamWrapper } from "@/components/creative/ai-stream-wrapper";
import { BarChart3, Users, TrendingUp, Activity, RefreshCw } from "lucide-react";

export function AIStreamWrapperDemo({ 
  staggerDelay = 350,
  dissolveDuration = 500,
  statusText = "Compiling dashboard components",
  glowColor = "99, 102, 241"
}: { 
  staggerDelay?: number, 
  dissolveDuration?: number, 
  statusText?: string, 
  glowColor?: string 
}) {
  const [key, setKey] = useState(0);

  return (
    <div className="w-full space-y-6">
      {/* Re-trigger button */}
      <div className="flex justify-center">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-full transition-colors text-sm shadow-lg shadow-indigo-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          Re-generate UI
        </button>
      </div>

      {/* The AI-generated dashboard */}
      <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">
        <AIStreamWrapper
          key={key}
          staggerDelay={staggerDelay}
          dissolveDuration={dissolveDuration}
          startDelay={600}
          statusText={statusText}
          glowColor={glowColor}
        >
          {/* Row 1: Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight">Analytics Overview</h2>
            <p className="text-zinc-500 text-sm mt-1">Real-time metrics for your SaaS platform.</p>
          </div>

          {/* Row 2: Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Revenue", value: "$48.2k", icon: TrendingUp, change: "+12.5%", color: "text-emerald-400" },
              { label: "Users", value: "2,847", icon: Users, change: "+8.1%", color: "text-blue-400" },
              { label: "Sessions", value: "14.3k", icon: Activity, change: "+23.7%", color: "text-purple-400" },
              { label: "Conversion", value: "3.24%", icon: BarChart3, change: "+1.2%", color: "text-amber-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-xs font-mono text-emerald-400">{stat.change}</span>
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Row 3: Chart placeholder */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
            <h3 className="text-sm font-bold text-zinc-300 mb-4">Revenue Over Time</h3>
            <div className="flex items-end gap-2 h-32">
              {[35, 50, 45, 70, 55, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[10px] font-mono text-zinc-600">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>

          {/* Row 4: Recent activity */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-zinc-300 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { user: "Sarah K.", action: "upgraded to Pro plan", time: "2 min ago", dot: "bg-emerald-400" },
                { user: "James R.", action: "submitted support ticket", time: "8 min ago", dot: "bg-amber-400" },
                { user: "Maria L.", action: "invited 3 team members", time: "15 min ago", dot: "bg-blue-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                  <span className="text-white font-medium">{item.user}</span>
                  <span className="text-zinc-500">{item.action}</span>
                  <span className="text-zinc-600 text-xs ml-auto font-mono">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </AIStreamWrapper>
      </div>
    </div>
  );
}
