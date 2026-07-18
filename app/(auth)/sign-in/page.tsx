'use client';

import React from 'react';
import Link from 'next/link';
import { MagneticButton } from '@/components/creative/magnetic-button';
import { Github, Mail } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side - Branding/Visual */}
      <div className="hidden md:flex flex-1 relative bg-muted overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_80%)]" />
        
        {/* Animated abstract geometric shapes could go here in the future */}
        <div className="relative z-10 p-12 text-center">
          <div className="w-20 h-20 bg-foreground text-background rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
             {/* Logo placeholder */}
             <span className="text-4xl font-bold tracking-tighter">A</span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight mb-4">Kinetic UI</h2>
          <p className="text-muted-foreground font-light max-w-sm mx-auto">
            The Shadcn UI for Creative Developers. Sign in to access your saved components and premium licenses.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Close button / Back to home */}
        <Link href="/" className="absolute top-8 right-8 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Back to website
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-medium tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground font-light">Enter your details to sign in to your account</p>
          </div>

          <div className="space-y-4">
            <MagneticButton className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors">
              <Github className="h-5 w-5" /> Continue with GitHub
            </MagneticButton>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full h-12 px-4 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                  <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                </div>
                <input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full h-12 px-4 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>

              <MagneticButton className="w-full h-12 mt-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Sign In
              </MagneticButton>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account? <a href="#" className="text-foreground hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
