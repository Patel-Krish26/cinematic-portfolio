"use client";
// ============================================================
// COMPONENTS/ANIMATIONS/PAGETRANSITION.TSX
// Wraps page content with cinematic entry animation
// Usage: wrap any page content with <PageTransition>
// ============================================================

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Variants for the page reveal
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
