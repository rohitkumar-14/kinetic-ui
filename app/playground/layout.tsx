import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Motion Studio & Sandbox',
  description: 'Interactive component customizer and playground. Test physics animations, toggle glassmorphism/neon styles, and generate mock datasets live.',
  alternates: {
    canonical: '/playground',
  },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
