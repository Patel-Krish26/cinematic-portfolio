"use client";
// ============================================================
// NAVBAR.TSX — Final
// WhatsApp + Resume buttons, mobile drawer, scroll hide
// ============================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, PERSONAL } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled,   setScrolled]   = useState(false);
    const [hidden,     setHidden]     = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        let last = 0;
        const fn = () => {
            const curr = window.scrollY;
            setScrolled(curr > 24);
            setHidden(curr > last + 5 && curr > 80);
            last = curr;
        };
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    return (
        <>
            <motion.header
                className={cn("fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
                    scrolled ? "glass-strong" : "bg-transparent")}
                style={{ paddingBlock: scrolled ? "0.65rem" : "1.15rem" }}
                animate={{ y: hidden ? -90 : 0 }}
                transition={{ duration: 0.36, ease: [0.4,0,0.2,1] }}
            >
                <div className="container-custom flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <motion.span className="w-2 h-2 rounded-full bg-purple-500"
                            animate={{ scale:[1,1.5,1] }} transition={{ duration:2.5,repeat:Infinity }} />
                        <span className="font-display text-[1.12rem] font-black text-white tracking-tight">
                            KP<span className="gradient-text">.</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden min-[933px]:flex items-center gap-0.5">
                        {NAV_ITEMS.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}
                                    className={cn("relative px-3.5 py-2 rounded-lg font-body text-[0.85rem] font-medium transition-colors duration-200",
                                        active ? "text-white" : "text-slate-500 hover:text-slate-200")}>
                                    {active && (
                                        <motion.span className="absolute inset-0 rounded-lg bg-purple-500/10 border border-purple-500/20"
                                            layoutId="nav-pill" transition={{ type:"spring",stiffness:420,damping:34 }} />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right actions */}
                    <div className="hidden min-[933px]:flex items-center gap-2.5 flex-shrink-0">
                        {/* Available */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-green-500/20">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                            </span>
                            <span className="font-mono text-[11px] text-green-400">Available</span>
                        </div>
                        {/* WhatsApp */}
                        <motion.a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg glass border border-[#25D366]/22 text-[#25D366] text-[0.84rem] font-medium hover:border-[#25D366]/45 hover:bg-[#25D366]/6 transition-all"
                            whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
                            <SiWhatsapp size={14} /> WhatsApp
                        </motion.a>
                        {/* Resume */}
                        <motion.a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                            className="btn-glow flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-[0.84rem] font-medium"
                            whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
                            <FiDownload size={13} /> Resume
                        </motion.a>
                    </div>

                    {/* Mobile toggle */}
                    <button className="min-[933px]:hidden p-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
                        <AnimatePresence mode="wait">
                            {mobileOpen ? (
                                <motion.div key="x" initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.16 }}>
                                    <FiX size={22} />
                                </motion.div>
                            ) : (
                                <motion.div key="m" initial={{ rotate:90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }} transition={{ duration:0.16 }}>
                                    <FiMenu size={22} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm min-[933px]:hidden"
                            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                            onClick={() => setMobileOpen(false)} />
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-strong flex flex-col pt-20 pb-8 px-6 gap-1.5 min-[933px]:hidden"
                            initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
                            transition={{ type:"spring",stiffness:280,damping:28 }}>
                            {NAV_ITEMS.map((item, i) => {
                                const active = pathname === item.href;
                                return (
                                    <motion.div key={item.href} initial={{ opacity:0,x:28 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.04 }}>
                                        <Link href={item.href}
                                            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-[0.93rem] font-medium transition-all",
                                                active ? "bg-purple-500/14 text-purple-300 border border-purple-500/22" : "text-slate-500 hover:text-white hover:bg-white/4")}>
                                            <span className={cn("w-4 h-px flex-shrink-0", active?"bg-purple-400":"bg-slate-700")} />
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <div className="mt-auto space-y-2.5 pt-4">
                                <motion.a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glass border border-[#25D366]/28 text-[#25D366] font-medium text-sm"
                                    initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.26 }}>
                                    <SiWhatsapp size={15} /> WhatsApp
                                </motion.a>
                                <motion.a href="/resume.pdf" target="_blank"
                                    className="btn-glow flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-medium text-sm"
                                    initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.32 }}>
                                    <FiDownload size={14} /> Download Resume
                                </motion.a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
