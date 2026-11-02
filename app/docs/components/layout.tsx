import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Components Directory',
  description: 'Browse 300+ creative motion, CRM, dashboard, navigation, and interactive UI components for React and Tailwind CSS.',
  alternates: {
    canonical: '/docs/components',
  },
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
