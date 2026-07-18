'use client';

import * as React from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { MagicTabs } from '@/components/ui/magic-tabs';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Mail, Lock } from 'lucide-react';

export function Auth01() {
  const [activeTab, setActiveTab] = React.useState('login');

  return (
    <div className="w-full max-w-md mx-auto">
      <GlassPanel intensity="heavy" className="p-8 relative z-10 w-full">
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/30 ring-1 ring-white/10">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-center text-muted-foreground mb-8 text-sm">
          Enter your details to access your premium account.
        </p>

        <MagicTabs 
          tabs={[
            { id: 'login', label: 'Log In' }, 
            { id: 'signup', label: 'Sign Up' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="mb-8"
        />

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {activeTab === 'signup' && (
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Full Name</label>
              <Input placeholder="John Doe" className="bg-background/50 h-11 border-white/10" />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input type="email" placeholder="you@example.com" className="pl-9 bg-background/50 h-11 border-white/10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium">Password</label>
              {activeTab === 'login' && <a href="#" className="text-xs text-indigo-500 hover:text-indigo-400 font-medium transition-colors">Forgot Password?</a>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="••••••••" className="pl-9 bg-background/50 h-11 border-white/10" />
            </div>
          </div>
          
          <div className="pt-2">
            <MagneticButton strength={0.15} className="w-full">
              <Button className="w-full h-11 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] font-semibold text-base">
                {activeTab === 'login' ? 'Sign In to Nova' : 'Create Nova Account'}
              </Button>
            </MagneticButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}
