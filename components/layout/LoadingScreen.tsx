"use client";
// ============================================================
// LOADINGSCREEN.TSX — User's cinematic version, mobile-fixed
// FIX: KRISH PATEL stays on ONE LINE on all screen sizes
// How: fluid font-size (clamp/vw) + nowrap + overflow-hidden
// ============================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    onComplete: () => void;
}

const NAME     = "KRISH PATEL";
const LETTERS  = NAME.split("");
const SUBTITLE = "FULL STACK DEVELOPER";

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [phase, setPhase] = useState<"reveal" | "exit">("reveal");

    // Lock bg color instantly — no flash
    useEffect(() => {
        document.body.style.overflow    = "hidden";
        document.body.style.background  = "#030305";
        document.documentElement.style.background = "#030305";
        return () => { document.body.style.overflow = ""; };
    }, []);

    // Fast timeline: reveal → exit
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
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030305] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Cinematic glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_65%)] animate-pulse pointer-events-none" />

                    {/* Corner decoration lines */}
                    <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-purple-500/40" />
                    <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-purple-500/40" />
                    <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-cyan-500/30" />
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30" />

                    <div className="relative z-10 flex flex-col items-center gap-5 px-4 w-full">

                        {/* ── NAME: fluid size keeps it on ONE LINE always ── */}
                        {/*  clamp(min, preferred, max):                        */}
                        {/*  min=28px (tiny phone), pref=9vw, max=96px (desktop)*/}
                        <div
                            className="flex justify-center items-center gap-[0.8%] overflow-hidden w-full"
                            style={{ flexWrap: "nowrap" }}
                        >
                            {LETTERS.map((l, i) => (
                                <motion.span
                                    key={i}
                                    className="font-black font-display inline-block flex-shrink-0 select-none"
                                    style={{
                                        fontSize: "clamp(1.15rem, 7vw, 6rem)",
                                        lineHeight: 1.05,
                                        whiteSpace: "nowrap",
                                        background:
                                            l === " "
                                                ? "transparent"
                                                : "linear-gradient(135deg,#c084fc,#a855f7,#22d3ee)",
                                        WebkitBackgroundClip: l === " " ? undefined : "text",
                                        WebkitTextFillColor: l === " " ? "transparent" : "transparent",
                                        minWidth: l === " " ? "clamp(0.3rem,1vw,0.8rem)" : undefined,
                                    }}
                                    initial={{ opacity: 0, y: 28, scale: 0.88, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)" }}
                                    transition={{
                                        delay:    i * 0.038,
                                        duration: 0.45,
                                        ease:     [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {l === " " ? "\u00A0" : l}
                                </motion.span>
                            ))}
                        </div>

                        {/* Divider line */}
                        <motion.div
                            className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                            style={{ width: "min(420px, 90vw)" }}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "min(420px, 90vw)", opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                        />

                        {/* Subtitle */}
                        <motion.p
                            className="font-mono uppercase text-purple-400 tracking-[0.3em] text-center"
                            style={{ fontSize: "clamp(0.55rem, 1.8vw, 0.75rem)" }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.72, duration: 0.4 }}
                        >
                            {SUBTITLE}
                        </motion.p>

                        {/* Pulsing dot */}
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
