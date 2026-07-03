"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type NativeButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragEnd" | "onDragStart"
>;

interface MagneticButtonProps extends NativeButtonProps {
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 200, mass: 0.4 });
  const springY = useSpring(y, { damping: 18, stiffness: 200, mass: 0.4 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!prefersReduced && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set((event.clientX - rect.left - rect.width / 2) * strength);
      y.set((event.clientY - rect.top - rect.height / 2) * strength);
    }
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    x.set(0);
    y.set(0);
    onMouseLeave?.(event);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
