"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { id: "bar", label: "Bar Chart", accent: "#6366f1" },
  { id: "line", label: "Line Chart", accent: "#10b981" },
  { id: "area", label: "Area Chart", accent: "#f97316" },
  { id: "pie", label: "Pie Chart", accent: "#0ea5e9" },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80, tablet: 40 },
  { month: "Feb", desktop: 305, mobile: 200, tablet: 120 },
  { month: "Mar", desktop: 237, mobile: 120, tablet: 150 },
  { month: "Apr", desktop: 73, mobile: 190, tablet: 60 },
  { month: "May", desktop: 209, mobile: 130, tablet: 90 },
  { month: "Jun", desktop: 214, mobile: 140, tablet: 110 },
];

const pieData = [
  { name: "Desktop", value: 1224, fill: "var(--color-desktop)" },
  { name: "Mobile", value: 860, fill: "var(--color-mobile)" },
  { name: "Tablet", value: 570, fill: "var(--color-tablet)" },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "#6366f1" },
  mobile: { label: "Mobile", color: "#10b981" },
  tablet: { label: "Tablet", color: "#f97316" },
};

export function ChartDemo() {
  const [activeVariant, setActiveVariant] = useState<VariantId>("bar");

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ── Variant Tab Bar ── */}
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(v.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
              activeVariant === v.id
                ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: v.accent }}
              />
              {v.label}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-10 min-h-[350px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl h-[300px]"
          >
            {activeVariant === "bar" && (
              <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            )}

            {activeVariant === "line" && (
              <ChartContainer config={chartConfig} className="w-full h-full">
                <LineChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-desktop)" }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-mobile)" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ChartContainer>
            )}

            {activeVariant === "area" && (
              <ChartContainer config={chartConfig} className="w-full h-full">
                <AreaChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
                  <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillTablet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-tablet)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-tablet)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="desktop" stroke="var(--color-desktop)" fill="url(#fillDesktop)" strokeWidth={2} />
                  <Area type="monotone" dataKey="tablet" stroke="var(--color-tablet)" fill="url(#fillTablet)" strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            )}

            {activeVariant === "pie" && (
              <ChartContainer config={chartConfig} className="w-full h-full flex justify-center pb-8">
                <PieChart margin={{ top: 20 }}>
                  <Tooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={2}
                    paddingAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
