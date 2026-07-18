'use client';

import React, { useState } from 'react';
import { Stepper } from '@/components/creative/stepper';

export function StepperDemo({ direction = "horizontal" }: any) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Account Setup", description: "Enter your credentials" },
    { id: 2, label: "Team Details", description: "Invite your colleagues" },
    { id: 3, label: "Payment", description: "Add billing info" },
    { id: 4, label: "Complete", description: "You are ready to go!" }
  ];

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col items-center justify-center p-8">
      
      <div className="w-full max-w-3xl mb-16">
        <Stepper 
          steps={steps} 
          currentStep={currentStep} 
          direction={direction}
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-6 py-2 rounded-lg font-medium bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
          className="px-6 py-2 rounded-lg font-medium bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step
        </button>
      </div>

    </div>
  );
}
