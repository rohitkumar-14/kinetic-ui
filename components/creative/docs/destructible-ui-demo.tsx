"use client";

import React, { useState } from "react";
import { DestructibleUI } from "@/components/creative/destructible-ui";
import { Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DestructibleUIDemo({ force = 1 }: { force?: number }) {
  const [isDestroyed, setIsDestroyed] = useState(false);

  return (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-center p-8 bg-zinc-950/50 rounded-xl border border-white/10 relative overflow-hidden">
      
      {/* Background Grid for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

      <div className="z-10 flex flex-col items-center gap-12">
        <DestructibleUI isDestroyed={isDestroyed} force={force}>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 w-72 flex flex-col items-center gap-4 text-center backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Delete Project</h3>
              <p className="text-sm text-zinc-400 mt-1">This action cannot be undone and will permanently shatter this component.</p>
            </div>
            <button 
              onClick={() => setIsDestroyed(true)}
              className="mt-2 w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Confirm Deletion
            </button>
          </div>
        </DestructibleUI>

        {isDestroyed && (
          <Button 
            variant="outline" 
            onClick={() => setIsDestroyed(false)}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Restore Component
          </Button>
        )}
      </div>
    </div>
  );
}
