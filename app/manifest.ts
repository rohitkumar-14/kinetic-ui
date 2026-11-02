import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kinetic UI — Creative Motion Component Library',
    short_name: 'Kinetic UI',
    description: 'The ultimate motion design system for React developers. 300+ physics animations and UI components.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['developer', 'design', 'utilities', 'productivity'],
  };
}
