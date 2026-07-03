"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8 md:pt-6"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1400px] items-center justify-between rounded-full border border-transparent px-5 transition-all duration-500 md:px-7",
          scrolled && "glass border-border shadow-[--shadow-luxury-sm]",
        )}
      >
        <a
          href="#top"
          data-cursor-hover
          className="flex items-center gap-2 text-sm font-medium tracking-wide text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-graphite text-[11px] font-medium text-background-secondary">
            S
          </span>
          <span className="font-display text-base tracking-tight">{siteConfig.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor-hover
              className="text-xs uppercase tracking-[0.24em] text-muted transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={siteConfig.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="inline-flex h-10 items-center gap-2 rounded-full bg-graphite px-5 text-xs font-medium tracking-wide text-background-secondary transition-colors duration-500 hover:bg-foreground"
        >
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span className="hidden sm:inline">WhatsApp Us</span>
          <span className="sm:hidden">Chat</span>
        </a>
      </div>
    </motion.header>
  );
}
