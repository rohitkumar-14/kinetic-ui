'use client';

import React, { useState } from 'react';
import { AiPromptInput } from '@/components/creative/ai-prompt-input';

export function AiPromptInputDemo() {
  const [submittedText, setSubmittedText] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-8 bg-zinc-950 rounded-3xl border border-zinc-800 space-y-6">
      <AiPromptInput
        onSubmit={(text) => setSubmittedText(text)}
      />
      {submittedText && (
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
          <strong>Submitted Prompt:</strong> {submittedText}
        </div>
      )}
    </div>
  );
}
