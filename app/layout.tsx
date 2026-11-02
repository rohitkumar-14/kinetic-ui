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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kinetic-ui.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kinetic UI — Creative Motion & UI Component Library for React & Tailwind",
    template: "%s | Kinetic UI",
  },
  description: "Open-source motion design system and copy-paste component library for React & Tailwind CSS. Build websites people remember with 300+ physics animations, 3D Canvas, WebGL shaders, interactive studio, and zero npm setup.",
  applicationName: "Kinetic UI",
  keywords: [
    "React components",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP animations",
    "UI library",
    "copy paste components",
    "web animations",
    "shadcn motion",
    "micro-interactions",
    "WebGL UI",
    "Three.js React",
    "interactive studio",
    "modern web design",
    "free UI components",
    "CRM components",
    "dashboard UI",
    "Kinetic UI",
    "motion design system"
  ],
  authors: [{ name: "Kinetic Studio", url: SITE_URL }],
  creator: "Kinetic Studio",
  publisher: "Kinetic Studio",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Kinetic UI — Creative Motion & UI Component Library",
    description: "Build websites people remember with 300+ motion components, interactive studio, 3D physics, and zero-setup HTML/CSS/JS downloads.",
    siteName: "Kinetic UI",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kinetic UI — The Creative Motion Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic UI — Creative Motion & UI Component Library",
    description: "Open-source motion design system for React developers. 300+ physics animations, 3D Canvas, and interactive studio customizer.",
    images: ["/logo.png"],
    creator: "@kineticui",
    site: "@kineticui",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};


import { CustomCursor } from "@/components/creative/custom-cursor";
import { GlobalLoader } from "@/components/global-loader";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { FilmGrain } from "@/components/creative/film-grain";
import { ThreeConfig } from "@/components/three-config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kinetic UI",
      "url": SITE_URL,
      "description": "Creative motion component library for React and Tailwind CSS",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/docs?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kinetic UI",
      "url": SITE_URL,
      "logo": `${SITE_URL}/logo.png`,
      "sameAs": [
        "https://github.com",
        "https://twitter.com/kineticui"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Kinetic UI",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 min-h-screen overflow-x-hidden flex flex-col bg-background text-foreground cursor-none`}
      >
        <ThreeConfig />
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
