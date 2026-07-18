"use client";

import React from "react";
import { Check, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Plan {
  id: string;
  name: string;
  price: string;
  description?: string;
  isPopular?: boolean;
}

export interface Feature {
  name: string;
  tooltip?: string;
  values: Record<string, boolean | string>;
}

export interface FeatureCategory {
  category: string;
  items: Feature[];
}

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: Plan[];
  features: FeatureCategory[];
}

export function ComparisonTable({ plans, features, className, ...props }: ComparisonTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)} {...props}>
      <div className="min-w-[800px] w-full">
        {/* Header Row (Sticky) */}
        <div className="sticky top-0 z-20 grid grid-cols-[1.5fr_repeat(auto-fit,minmax(0,1fr))] bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 pb-6 pt-6">
          <div className="flex items-end pb-4 px-6">
            <h3 className="text-xl font-bold text-white">Compare Features</h3>
          </div>
          
          {/* Plan Headers */}
          <div 
            className="col-span-1 grid gap-4 px-2"
            style={{ gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))` }}
          >
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={cn(
                  "flex flex-col items-center text-center p-4 rounded-xl border relative",
                  plan.isPopular 
                    ? "bg-indigo-500/10 border-indigo-500/50" 
                    : "bg-white/5 border-white/10"
                )}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h4 className="text-lg font-bold text-white mb-1">{plan.name}</h4>
                <div className="text-2xl font-black text-white mb-2">{plan.price}</div>
                {plan.description && (
                  <p className="text-xs text-zinc-400 font-medium">{plan.description}</p>
                )}
                <button 
                  className={cn(
                    "mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-colors",
                    plan.isPopular 
                      ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                      : "bg-white text-black hover:bg-zinc-200"
                  )}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Rows */}
        <div className="mt-8">
          {features.map((category, catIdx) => (
            <div key={catIdx} className="mb-12">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest bg-white/5 py-3 px-6 rounded-lg mb-4">
                {category.category}
              </h4>
              
              <div className="flex flex-col">
                {category.items.map((feature, featIdx) => (
                  <div 
                    key={featIdx}
                    className="grid grid-cols-[1.5fr_repeat(auto-fit,minmax(0,1fr))] border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Feature Name */}
                    <div className="flex items-center gap-2 py-4 px-6">
                      <span className="text-sm font-medium text-zinc-300">{feature.name}</span>
                      {feature.tooltip && (
                        <div className="relative group flex items-center">
                          <HelpCircle className="w-4 h-4 text-zinc-600 hover:text-zinc-400 cursor-help transition-colors" />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-zinc-800 text-xs text-zinc-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                            {feature.tooltip}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-zinc-800" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Feature Values per Plan */}
                    <div 
                      className="col-span-1 grid px-2"
                      style={{ gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))` }}
                    >
                      {plans.map((plan) => {
                        const val = feature.values[plan.id];
                        return (
                          <div 
                            key={`${plan.id}-${featIdx}`} 
                            className={cn(
                              "flex items-center justify-center py-4 text-sm font-medium",
                              plan.isPopular ? "bg-indigo-500/[0.02]" : ""
                            )}
                          >
                            {typeof val === 'boolean' ? (
                              val ? (
                                <Check className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <Minus className="w-5 h-5 text-zinc-700" />
                              )
                            ) : (
                              <span className="text-zinc-300">{val}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
