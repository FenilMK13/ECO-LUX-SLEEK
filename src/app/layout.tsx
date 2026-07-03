import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { fraunces, inter } from "@/lib/fonts";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { SiteNav } from "@/components/layout/site-nav";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Luxury Modular Kitchens & Interiors | South Gujarat`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} · Luxury Modular Kitchens & Interiors`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · Luxury Modular Kitchens & Interiors`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScrollProvider>
          <CustomCursor />
          <SiteNav />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
