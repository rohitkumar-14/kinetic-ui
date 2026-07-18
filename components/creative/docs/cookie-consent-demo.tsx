'use client';

import React, { useState } from 'react';
import { CookieConsent } from '@/components/creative/cookie-consent';

export function CookieConsentDemo({ variant = "modal" }: any) {
  // We use a key to force re-mount for the demo playground so it triggers the timeout again
  const [key, setKey] = useState(0);
  
  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col items-center justify-center">
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">GDPR Compliance</h3>
        <p className="text-zinc-400 mb-8 max-w-sm">
          A premium cookie consent banner that doesn't ruin your site's aesthetic.
        </p>
        <button 
          onClick={() => setKey(k => k + 1)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          Trigger Banner Again
        </button>
      </div>

      <CookieConsent 
        key={`${variant}-${key}`}
        variant={variant} 
        delay={500} 
        onAcceptAll={() => console.log('Accepted All')}
        onRejectAll={() => console.log('Rejected All')}
      />
    </div>
  );
}
