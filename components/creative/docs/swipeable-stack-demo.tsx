"use client";

import { SwipeableStack } from "@/components/creative/swipeable-stack";
import { useState } from "react";

export interface SwipeableStackDemoProps {
  deck?: "travel" | "abstract";
}

const travelCards = [
  {
    id: "1",
    title: "Tokyo Neon",
    subtitle: "Japan",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Alpine Lake",
    subtitle: "Switzerland",
    imageUrl: "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Desert Dunes",
    subtitle: "Morocco",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
  }
];

const abstractCards = [
  {
    id: "a1",
    title: "Liquid Metal",
    subtitle: "3D Render",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "a2",
    title: "Neon Geometry",
    subtitle: "Vector",
    imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "a3",
    title: "Dark Matter",
    subtitle: "Simulation",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"
  }
];

export function SwipeableStackDemo({ deck = "travel" }: SwipeableStackDemoProps) {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const activeDeck = deck === "abstract" ? abstractCards : travelCards;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[650px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <SwipeableStack 
            key={deck} // Force remount when deck changes to reset stack state
            cards={activeDeck} 
            onSwipeLeft={(card) => setLastAction(`Passed on ${card.title}`)}
            onSwipeRight={(card) => setLastAction(`Liked ${card.title}`)}
            className="w-full h-full"
          />
        </div>

        <div className="border-t border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
          <p className="text-sm text-zinc-400 max-w-lg">
            <span className="font-semibold mr-1.5 text-indigo-400">
              Interaction:
            </span>
            Drag the top card left or right to swipe.
          </p>

          <div className="h-6 flex items-center justify-center min-w-[120px]">
            {lastAction && (
              <span className="text-white font-mono text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20">
                {lastAction}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
