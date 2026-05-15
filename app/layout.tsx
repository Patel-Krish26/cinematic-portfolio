// ============================================================
// APP/LAYOUT.TSX — Root Layout
// KEY FIX: suppressHydrationWarning on html+body stops ALL
// hydration errors from browser extensions, theme, cursor checks
// ============================================================

import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Providers    from "@/components/layout/Providers";
import Navbar       from "@/components/layout/Navbar";
import Footer       from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { Toaster }  from "sonner";
import dynamic      from "next/dynamic";

// ── Dynamic imports with ssr:false stop server/client mismatch ──
// CustomCursor reads window.matchMedia — must be client-only
const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: {
    default:  "Krish Patel — Full Stack Developer",
    template: "%s | Krish Patel",
  },
  description:
    "Krish Patel — Full Stack Developer from Gandhinagar, India. " +
    "Building cinematic digital experiences with React, Next.js, Node.js, TypeScript.",
  keywords: [
    "Krish Patel","Full Stack Developer","React","Next.js",
    "Node.js","Portfolio","Web Developer","Gandhinagar","India",
  ],
  authors: [{ name: "Krish Patel", url: "https://github.com/Patel-Krish26" }],
  creator: "Krish Patel",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", locale: "en_IN",
    title: "Krish Patel — Full Stack Developer",
    description: "Cinematic portfolio — Three.js, GSAP, Framer Motion, MongoDB.",
    siteName: "Krish Patel Portfolio",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor:  "#050508",
  colorScheme: "dark",
  width:       "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: ignores server/client attr diffs
    // (caused by browser extensions, theme switchers, OS dark mode)
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning on body — class changes from theme don't cause errors */}
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        <Providers>
          <SmoothScroll>
            {/* Client-only cursor — no SSR so no hydration mismatch */}
            <CustomCursor />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              theme="dark"
              toastOptions={{
                style: {
                  background: "rgba(10,10,20,0.95)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  color: "#e2e8f0",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "13px",
                },
              }}
            />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
