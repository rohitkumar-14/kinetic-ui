'use client';

import React from 'react';
import { ComparisonTable } from '@/components/creative/comparison-table';

export function ComparisonTableDemo() {
  const plans = [
    { id: 'basic', name: 'Basic', price: '$0', description: 'For individuals.' },
    { id: 'pro', name: 'Pro', price: '$29', description: 'For professionals.', isPopular: true },
    { id: 'enterprise', name: 'Enterprise', price: '$99', description: 'For large teams.' },
  ];

  const features = [
    {
      category: 'Core Features',
      items: [
        { name: 'Projects', values: { basic: 'Up to 3', pro: 'Unlimited', enterprise: 'Unlimited' } },
        { name: 'Collaborators', tooltip: 'Number of users who can edit projects.', values: { basic: false, pro: 'Up to 5', enterprise: 'Unlimited' } },
        { name: 'Analytics', values: { basic: false, pro: true, enterprise: true } },
      ]
    },
    {
      category: 'Support & Security',
      items: [
        { name: 'Support', values: { basic: 'Community', pro: 'Email (24h)', enterprise: 'Dedicated (1h)' } },
        { name: 'SSO', tooltip: 'Single Sign-On integration.', values: { basic: false, pro: false, enterprise: true } },
        { name: 'Audit Logs', values: { basic: false, pro: false, enterprise: true } },
      ]
    }
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-4 md:p-8 flex items-center justify-center">
      <ComparisonTable plans={plans} features={features} />
    </div>
  );
}
