import type { Metadata } from "next";

import { fraunces, inter } from "@/lib/fonts";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sleek by [Business Name] | Luxury Modular Kitchens, South Gujarat",
    template: "%s | Sleek by [Business Name]",
  },
  description:
    "Official Sleek (Asian Paints) distributor serving Surat, Bharuch, Navsari, Valsad & Vapi. Premium modular kitchens, wardrobes and interior hardware, crafted with 25+ years of dealership expertise.",
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
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
