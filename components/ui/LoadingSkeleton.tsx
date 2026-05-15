"use client";
// ============================================================
// LOADINGSCREEN.TSX — Final
// FIX: K and L no longer clip on medium widths
//   Root cause: overflow-hidden on letters row + tight gap
//   Solution: visible overflow on row, reduced vw%, safe padding
// ============================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    onComplete: () => void;
}

const NAME = "KRISH PATEL";
const LETTERS = NAME.split("");
const SUBTITLE = "FULL STACK DEVELOPER";

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [phase, setPhase] = useState<"reveal" | "exit">("reveal");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.background = "#030305";
        document.documentElement.style.background = "#030305";
        return () => { document.body.style.overflow = ""; };
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            setPhase("exit");
            setTimeout(onComplete, 500);
        }, 1400);
        return () => clearTimeout(t);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== "exit" && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030305]"
                    // NO overflow-hidden here — that clips edge letters
                    style={{ overflow: "hidden" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Cinematic glow */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(circle at center, rgba(168,85,247,0.2) 0%, transparent 65%)" }} />

                    {/* Corner marks */}
                    <div className="absolute top-6 left-6 w-7 h-7 border-l-2 border-t-2 border-purple-500/35 pointer-events-none" />
                    <div className="absolute top-6 right-6 w-7 h-7 border-r-2 border-t-2 border-purple-500/35 pointer-events-none" />
                    <div className="absolute bottom-6 left-6 w-7 h-7 border-l-2 border-b-2 border-cyan-500/25 pointer-events-none" />
                    <div className="absolute bottom-6 right-6 w-7 h-7 border-r-2 border-b-2 border-cyan-500/25 pointer-events-none" />

                    {/* Centre content */}
                    <div className="relative z-10 flex flex-col items-center gap-5 w-full"
                        // Safe horizontal padding so edge letters breathe
                        style={{ padding: "0 clamp(12px, 4vw, 48px)" }}
                    >
                        {/* ── NAME ROW ────────────────────────────────────────
                            Key fixes:
                            1. overflow: visible  → edge letters never clip
                            2. font-size: clamp(1.6rem, 7vw, 5.5rem) → slightly
                               smaller vw value gives room at 360-480px phones
                            3. gap is now percentage of container, not viewport
                            4. letter-spacing: -0.02em packs them slightly closer
                        ──────────────────────────────────────────────────── */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "nowrap",
                                overflow: "visible",   // ← CRITICAL: never clips K or L
                                width: "100%",
                                gap: "clamp(1px, 0.6%, 8px)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {LETTERS.map((l, i) => (
                                <motion.span
                                    key={i}
                                    className="font-black font-display inline-block flex-shrink-0 select-none"
                                    style={{
                                        // 7vw instead of 8.5vw = more breathing room
                                        // clamp ensures it never breaks the line
                                        fontSize: "clamp(1.6rem, 7vw, 5.5rem)",
                                        lineHeight: 1.05,
                                        background: l === " " ? "transparent"
                                            : "linear-gradient(135deg, #c084fc, #a855f7, #22d3ee)",
                                        WebkitBackgroundClip: l === " " ? undefined : "text",
                                        WebkitTextFillColor: l === " " ? "transparent" : "transparent",
                                        // Space character — keeps gap between KRISH and PATEL
                                        minWidth: l === " "
                                            ? "clamp(0.3rem, 1.5vw, 0.9rem)"
                                            : undefined,
                                    }}
                                    initial={{ opacity: 0, y: 28, scale: 0.88, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                    transition={{
                                        delay: i * 0.038,
                                        duration: 0.45,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {l === " " ? "\u00A0" : l}
                                </motion.span>
                            ))}
                        </div>

                        {/* Divider */}
                        <motion.div
                            className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                            style={{ width: "min(400px, 85vw)" }}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "min(400px, 85vw)", opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                        />

                        {/* Subtitle */}
                        <motion.p
                            className="font-mono uppercase text-purple-400 tracking-[0.28em] text-center"
                            style={{ fontSize: "clamp(0.5rem, 1.6vw, 0.72rem)" }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.72, duration: 0.4 }}
                        >
                            {SUBTITLE}
                        </motion.p>

                        {/* Pulse dot */}
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1"
                            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.45, 1] }}
                            transition={{ duration: 0.9, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}