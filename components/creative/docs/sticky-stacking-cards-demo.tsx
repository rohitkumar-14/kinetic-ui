import React from 'react';
import { StickyStackingCards } from '@/components/creative/sticky-stacking-cards';

export function StickyStackingCardsDemo() {
  const cards = [
    { id: '1', title: 'The Genesis', description: 'It begins here.', color: '#000000', content: <div className="h-full w-full bg-zinc-900 border border-white/10 rounded-3xl p-12 text-white text-2xl font-bold">Card 1</div> },
    { id: '2', title: 'The Expansion', description: 'Growing further.', color: '#000000', content: <div className="h-full w-full bg-indigo-900 border border-indigo-500/50 rounded-3xl p-12 text-white text-2xl font-bold">Card 2</div> },
    { id: '3', title: 'The Zenith', description: 'The peak.', color: '#000000', content: <div className="h-full w-full bg-fuchsia-900 border border-fuchsia-500/50 rounded-3xl p-12 text-white text-2xl font-bold">Card 3</div> },
  ];
  return (
    <div className="w-full h-[600px] overflow-y-auto bg-black rounded-xl border border-white/10 relative">
      <div className="py-[10vh] max-w-2xl mx-auto">
        <StickyStackingCards cards={cards} cardHeight="400px" />
      </div>
    </div>
  );
}
