import Link from 'next/link';
import { getAllComponentDocs } from '@/lib/mdx';
import { Component, Type, MousePointer2, Layers, Image as ImageIcon, Sparkles } from 'lucide-react';
import { SpotlightCard } from '@/components/creative/spotlight-card';

export default function ComponentsOverview() {
  const docs = getAllComponentDocs();

  // Group by category
  const groupedDocs = docs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof docs>);

  // Pre-define the layout of categories to match the homepage
  const categoryOrder = [
    { name: "Cursor Interactions", icon: <MousePointer2 className="h-5 w-5 text-purple-500" /> },
    { name: "Text Animations", icon: <Type className="h-5 w-5 text-indigo-500" /> },
    { name: "Scroll Effects", icon: <Sparkles className="h-5 w-5 text-pink-500" /> },
    { name: "Premium Cards", icon: <Layers className="h-5 w-5 text-blue-500" /> },
    { name: "Motion Galleries", icon: <ImageIcon className="h-5 w-5 text-orange-500" /> }
  ];

  return (
    <div className="container mx-auto px-6 max-w-6xl space-y-16 py-16 mb-16">
      <div>
        <h1 className="text-5xl font-medium tracking-tight mb-6">Component Ecosystem</h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl">
          Browse our collection of production-ready motion components. Everything you need to build award-winning experiences.
        </p>
      </div>

      <div className="space-y-16">
        {categoryOrder.map((section, idx) => {
          const items = groupedDocs[section.name] || [];
          
          return (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                <div className="p-2 bg-muted/20 border border-border/50 rounded-lg">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-medium tracking-tight">
                  {section.name}
                </h2>
                <span className="ml-auto text-sm text-muted-foreground bg-muted/20 px-3 py-1 rounded-full border border-border/50">
                  {items.length} Available
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.length > 0 ? (
                  items.map((component) => (
                    <Link
                      key={component.slug}
                      href={`/docs/components/${component.slug}`}
                      className="block group"
                    >
                      <SpotlightCard className="h-full p-6 bg-muted/5 border-border/50 hover:bg-muted/10 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-background border border-border/50 rounded-lg group-hover:scale-110 transition-transform">
                            <Component className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                        </div>
                        <h3 className="font-medium text-xl tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">
                          {component.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {component.description}
                        </p>
                      </SpotlightCard>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center border border-dashed border-border/50 rounded-2xl bg-muted/5">
                    <p className="text-muted-foreground text-sm font-light">More components for this category are being added soon.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
