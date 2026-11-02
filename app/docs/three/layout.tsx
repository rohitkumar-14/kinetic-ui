import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Three.js & WebGL 3D Canvas Guide',
  description: 'How to build high-performance 3D scenes, shaders, and particle simulations using React Three Fiber and Three.js in Kinetic UI.',
  alternates: {
    canonical: '/docs/three',
  },
};

export default function ThreeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
