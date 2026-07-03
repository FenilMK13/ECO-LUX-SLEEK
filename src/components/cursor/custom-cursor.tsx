"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor-hover], input, textarea, select";

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [isSupported, setIsSupported] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsSupported(supportsFinePointer);
    if (!supportsFinePointer) return;

    document.documentElement.classList.add("cursor-none");

    const handleMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
    };
    const handleLeave = () => setIsVisible(false);
    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      setIsHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [cursorX, cursorY]);

  if (!isSupported || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x, y, opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full border border-graphite bg-transparent"
        animate={{
          width: isHovering ? 56 : 16,
          height: isHovering ? 56 : 16,
          x: isHovering ? -28 : -8,
          y: isHovering ? -28 : -8,
        }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
      />
    </motion.div>
  );
}
