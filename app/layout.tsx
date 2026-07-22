import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kinetiic-ui.netlify.app"),
  title: "Kinetic UI | The Creative Motion Component Library",
  description: "The ultimate motion design system for React developers. Build websites people remember with advanced scroll animations, 3D interactions, and GSAP powered components.",
  keywords: [
    "React", "Tailwind CSS", "Framer Motion", "GSAP", "UI Library", 
    "Web Design", "Frontend Components", "Motion Design", "Kinetic UI"
  ],
  authors: [{ name: "Kinetic Studio" }],
  creator: "Kinetic Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kinetic.studio",
    title: "Kinetic UI | The Creative Motion Component Library",
    description: "The ultimate motion design system for React developers. Build websites people remember with advanced scroll animations.",
    siteName: "Kinetic UI",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kinetic UI Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic UI | The Creative Motion Component Library",
    description: "The ultimate motion design system for React developers. Build websites people remember with advanced scroll animations.",
    images: ["/logo.png"],
    creator: "@kineticui",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};


import { CustomCursor } from "@/components/creative/custom-cursor";
import { GlobalLoader } from "@/components/global-loader";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { FilmGrain } from "@/components/creative/film-grain";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 min-h-screen overflow-x-hidden flex flex-col bg-background text-foreground cursor-none`}
      >
        <FilmGrain />
        <SmoothScrollProvider>
          <GlobalLoader />
          <CustomCursor />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={100}>
              <Navbar />
              <div className="flex-1 flex flex-col relative">
                {children}
              </div>
              <Footer />
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
