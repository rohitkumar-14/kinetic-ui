import React from 'react';
import { MagneticButton } from '@/components/creative/magnetic-button';
import { CreditCard, Bookmark, Settings, LogOut, ChevronRight, Component as ComponentIcon } from 'lucide-react';

// Mock data
const user = {
  name: 'Creative Dev',
  email: 'dev@example.com',
  plan: 'Pro',
};

const savedComponents = [
  { name: 'Magnetic Button', category: 'Cursor Interactions', addedAt: '2 days ago' },
  { name: 'Split Text Reveal', category: 'Text Animations', addedAt: '1 week ago' },
  { name: 'Parallax Section', category: 'Scroll Effects', addedAt: '2 weeks ago' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-medium tracking-tight mb-1">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <nav className="flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50 text-foreground font-medium">
            <Bookmark className="h-4 w-4" /> Saved Components
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors">
            <CreditCard className="h-4 w-4" /> Billing & Plan
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" /> Account Settings
          </a>
        </nav>

        <div className="mt-auto pt-8 border-t border-border">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-10">
        
        {/* Plan Overview */}
        <section className="p-8 rounded-3xl border border-border bg-gradient-to-br from-indigo-500/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CreditCard className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">Current Plan</h3>
            <div className="flex items-end gap-4 mb-6">
              <span className="text-5xl font-medium tracking-tighter">{user.plan}</span>
              <span className="text-sm text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider font-medium mb-1">Active</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-8">
              You have access to all premium components, commercial licensing, and priority support.
            </p>
            <div className="flex gap-4">
              <MagneticButton className="h-12 px-6 rounded-full bg-foreground text-background">
                Manage Billing
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Saved Components */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-medium tracking-tight">Saved Components</h3>
            <span className="text-sm text-muted-foreground">{savedComponents.length} items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedComponents.map((comp, i) => (
              <div key={i} className="group relative p-6 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-all duration-300">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-background border border-border/50 rounded-xl group-hover:scale-110 transition-transform duration-500">
                    <ComponentIcon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                    <Bookmark className="h-4 w-4 fill-current" />
                  </button>
                </div>
                
                <h4 className="text-xl font-medium mb-1 group-hover:text-indigo-400 transition-colors">{comp.name}</h4>
                <p className="text-xs text-muted-foreground mb-4">{comp.category}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-muted-foreground/70">Added {comp.addedAt}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
            
            {/* Explore More Card */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-border/50 bg-transparent hover:bg-muted/10 transition-colors cursor-pointer min-h-[220px]">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4">
                <ComponentIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="font-medium text-muted-foreground">Explore more components</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
