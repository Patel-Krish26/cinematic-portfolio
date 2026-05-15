"use client";
// ============================================================
// SMOOTHSCROLL.TSX — Lenis v1.x smooth scroll
// ============================================================

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        let lenis: import("lenis").default | null = null;
        let raf: number;

        // Dynamically import lenis to avoid SSR issues
        import("lenis").then(({ default: Lenis }) => {
            lenis = new Lenis({
                duration:       1.1,
                easing:         (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel:    true,
                touchMultiplier: 1.5,
            });

            function tick(time: number) {
                lenis!.raf(time);
                raf = requestAnimationFrame(tick);
            }
            raf = requestAnimationFrame(tick);
        });

        return () => {
            cancelAnimationFrame(raf);
            lenis?.destroy();
        };
    }, []);

    return <>{children}</>;
}
