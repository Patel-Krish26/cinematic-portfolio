"use client";
// ============================================================
// COMPONENTS/UI/BUTTON.TSX — REUSABLE BUTTON
// Variants: primary (purple glow), outline (glass), ghost
// ============================================================

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: "btn-glow text-white",
  outline: "glass neon-border text-white hover:border-purple-400/60",
  ghost: "text-slate-400 hover:text-white hover:bg-white/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={!disabled && !isLoading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : {}}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
