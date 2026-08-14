"use client";

import { ConferenceTicket } from "@/components/creative/conference-ticket";

export default function ConferenceTicketDemo() {
  return (
    <div className="w-full min-h-[700px] bg-black rounded-xl overflow-hidden relative flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]">
      <ConferenceTicket 
        name="SATOSHI NAKAMOTO" 
        ticketNumber="#000001"
        date="JAN 03, 2009"
        type="GENESIS PASS"
      />
      <p className="mt-8 text-zinc-500 font-mono text-xs tracking-widest text-center max-w-xs">
        Move your mouse over the ticket to interact with the 3D physics and holographic foil.
      </p>
    </div>
  );
}
