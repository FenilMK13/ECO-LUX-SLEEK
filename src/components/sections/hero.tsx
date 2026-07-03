"use client";

import { motion, type Easing } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

const EASE_LUXURY: Easing = [0.16, 1, 0.3, 1];

import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { KitchenSceneClient } from "@/components/three/kitchen-scene-client";

const eyebrow = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_LUXURY } },
};

const wordStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordUp = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_LUXURY },
  },
};

const HEADLINE_1 = ["Sleek", "Interiors,"];
const HEADLINE_2 = ["Engineered", "for", "Luxury", "Living."];

export function Hero() {
  return (
    <section
      id="experience"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden pt-28 md:pt-32"
    >
      {/* Soft ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 30%, rgba(205, 220, 232, 0.35), transparent 70%), radial-gradient(50% 50% at 15% 80%, rgba(215, 193, 156, 0.22), transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        {/* Left — copy */}
        <div className="flex flex-col justify-center py-10">
          <motion.p
            variants={eyebrow}
            initial="hidden"
            animate="show"
            className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted"
          >
            <span className="h-px w-8 bg-border-strong" />
            South Gujarat · Est. {siteConfig.yearsOfExperience}+ Years
          </motion.p>

          <motion.h1
            variants={wordStagger}
            initial="hidden"
            animate="show"
            className="font-display text-[clamp(2.6rem,6vw,5.4rem)] font-light leading-[1.02] tracking-[-0.02em] text-foreground"
          >
            <span className="block overflow-hidden">
              <span className="flex flex-wrap gap-x-4">
                {HEADLINE_1.map((word, i) => (
                  <motion.span key={`h1-${i}`} variants={wordUp} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="flex flex-wrap gap-x-4">
                {HEADLINE_2.map((word, i) => (
                  <motion.span
                    key={`h2-${i}`}
                    variants={wordUp}
                    className={
                      word === "Engineered"
                        ? "inline-block italic text-gold"
                        : "inline-block"
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={eyebrow}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.9 }}
            className="mt-8 max-w-lg text-balance text-base leading-relaxed text-muted"
          >
            Official Sleek (Asian Paints) distributor for Surat, Bharuch, Navsari, Valsad & Vapi.
            Modular kitchens, wardrobes and interior hardware — designed, delivered and installed
            with the precision of a 25-year atelier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXURY }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-graphite px-8 text-sm font-medium tracking-wide text-background-secondary transition-colors duration-500 hover:bg-foreground"
              data-cursor-hover
            >
              Book a Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" strokeWidth={1.5} />
            </MagneticButton>

            <MagneticButton
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-border-strong bg-background-secondary/60 px-8 text-sm font-medium tracking-wide text-foreground backdrop-blur-md transition-colors duration-500 hover:bg-background-secondary"
              data-cursor-hover
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              Explore Products
            </MagneticButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-8"
          >
            {[
              ["25+", "Years of dealership"],
              ["5", "Cities served"],
              ["₹5L–50L+", "Projects delivered"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-2xl font-light text-foreground">{value}</span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D scene */}
        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-full">
          <div className="absolute inset-0 lg:-inset-6">
            <KitchenSceneClient />
          </div>

          {/* Floating spec chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: EASE_LUXURY }}
            className="glass pointer-events-none absolute bottom-8 left-4 hidden rounded-2xl px-5 py-4 shadow-[--shadow-luxury-md] md:block lg:left-0"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Interactive Model</p>
            <p className="mt-1 font-display text-sm text-foreground">Move cursor to explore</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-border-strong">
            <motion.span
              className="absolute inset-x-0 top-0 block h-4 bg-graphite"
              animate={{ y: ["-100%", "260%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
