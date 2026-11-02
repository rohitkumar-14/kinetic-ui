import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Animation Architecture & Physics Springs',
  description: 'Deep dive into organic physics equations, spring mechanics, and hardware-accelerated transforms powering Kinetic UI.',
  alternates: {
    canonical: '/docs/animations',
  },
};

export default function AnimationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
