import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Commercial Licensing',
  description: 'Flexible licensing for developers, agencies, and enterprise teams. 100% open-source core with commercial pro tiers and team permissions.',
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
