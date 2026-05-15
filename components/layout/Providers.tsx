"use client";
// ============================================================
// PROVIDERS.TSX — v3
// Fix: ThemeProvider defaultTheme="dark" with attribute="class"
// Fix: suppressHydrationWarning passed to avoid class mismatch
// ============================================================

import { ThemeProvider } from "next-themes";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { useState, useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [loaded,  setLoaded]  = useState(false);
    // Mounted flag prevents hydration mismatch on loading screen
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            {/* Show loading screen only on client (avoids SSR flash) */}
            {mounted && !loaded && (
                <LoadingScreen onComplete={() => setLoaded(true)} />
            )}

            <div
                style={{
                    opacity:    loaded ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    willChange: "opacity",
                }}
            >
                {children}
            </div>
        </ThemeProvider>
    );
}
