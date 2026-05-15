"use client";
// ============================================================
// CUSTOMCURSOR.TSX — nareshkhatri.site style
// - Outer bubble ring (40px) with spring lag
// - Inner precise dot (7px)
// - On hover links/buttons: ring shrinks+fills, dot hides
// - On click: both scale down
// - Auto-hidden on touch devices (no SSR issues)
// ============================================================

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [mounted,  setMounted]  = useState(false);
    const [isTouch,  setIsTouch]  = useState(false);
    const [visible,  setVisible]  = useState(false);
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);

    const mx = useMotionValue(-200);
    const my = useMotionValue(-200);

    // Ring follows with spring — creates the lag effect
    const rx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.6 });
    const ry = useSpring(my, { stiffness: 150, damping: 18, mass: 0.6 });

    useEffect(() => {
        setMounted(true);
        // Detect touch device — hide cursor entirely on phones/tablets
        const touch = window.matchMedia("(pointer: coarse)").matches;
        setIsTouch(touch);
        if (touch) return; // Don't attach any listeners on touch

        const TAGS = new Set(["A","BUTTON","INPUT","TEXTAREA","SELECT","LABEL","SUMMARY"]);

        const move = (e: MouseEvent) => {
            mx.set(e.clientX);
            my.set(e.clientY);
            setVisible(true);

            const el = e.target as HTMLElement;
            const isInteractive =
                TAGS.has(el.tagName) ||
                !!el.closest("a") ||
                !!el.closest("button") ||
                el.getAttribute("role") === "button" ||
                !!el.closest("[role='button']");
            setHovering(isInteractive);
        };

        const leave = () => setVisible(false);
        const enter = () => setVisible(true);
        const down  = () => setClicking(true);
        const up    = () => setClicking(false);

        document.addEventListener("mousemove",  move,  { passive: true });
        document.addEventListener("mouseleave", leave);
        document.addEventListener("mouseenter", enter);
        document.addEventListener("mousedown",  down);
        document.addEventListener("mouseup",    up);

        return () => {
            document.removeEventListener("mousemove",  move);
            document.removeEventListener("mouseleave", leave);
            document.removeEventListener("mouseenter", enter);
            document.removeEventListener("mousedown",  down);
            document.removeEventListener("mouseup",    up);
        };
    }, [mx, my]);

    // Don't render on server or touch devices
    if (!mounted || isTouch) return null;

    return (
        <>
            {/* ── OUTER RING (nareshkhatri style bubble) ─── */}
            <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                    style={{
                        x: rx,
                        y: ry,
                        translateX: "-50%",
                        translateY: "-50%",
                        border: "1px solid rgba(168,85,247,0.55)",
                    }}
                    animate={{
                        opacity: visible ? 1 : 0,
                        width: clicking ? 28 : hovering ? 48 : 40,
                        height: clicking ? 28 : hovering ? 48 : 40,
                        background: hovering
                            ? "rgba(168,85,247,0.18)"
                            : "transparent",
                        borderColor: hovering
                            ? "rgba(168,85,247,0.8)"
                            : "rgba(168,85,247,0.55)",
                        borderWidth: hovering ? "1.5px" : "1px",
                        scale: clicking ? 0.85 : 1,
                    }}
                    transition={{
                        opacity: { duration: 0.2 },
                        width: { type: "spring", stiffness: 300, damping: 24 },
                        height: { type: "spring", stiffness: 300, damping: 24 },
                        background: { duration: 0.25 },
                        borderColor: { duration: 0.2 },
                        scale: { duration: 0.1 },
                    }}
                >
                    {/* Inner glow fill */}
                    <div
                        className="absolute inset-0 rounded-full transition-all duration-300"
                        style={{
                            background: hovering
                                ? "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)"
                                : "transparent",
                        }}
                    />
            </motion.div>

            {/* ── INNER DOT ─────────────────────────────── */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
                style={{
                    x: mx,
                    y: my,
                    translateX: "-50%",
                    translateY: "-50%",
                    width:  7,
                    height: 7,
                    background: hovering ? "#c084fc" : "#a855f7",
                }}
                animate={{
                    opacity: visible ? (hovering ? 0.6 : 1) : 0,
                    scale:   clicking ? 0.4 : hovering ? 0.5 : 1,
                }}
                transition={{ duration: 0.1 }}
            />
        </>
    );
}
