"use client";
// ============================================================
// FOOTER.TSX — v3
// Added: Instagram, Snapchat
// Added: direct email link (krishpr2004@gmail.com)
// Kept: existing cinematic design
// ============================================================

import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_ITEMS, PERSONAL } from "@/lib/data";
import {
    FiGithub, FiLinkedin, FiMail, FiHeart, FiPhone, FiMapPin,
} from "react-icons/fi";
import { SiLeetcode, SiInstagram, SiSnapchat, SiWhatsapp } from "react-icons/si";

// All social icons in one place
const SOCIALS = [
    { icon: <FiGithub size={17} />,    href: PERSONAL.github,    label: "GitHub",    color: "#ffffff"  },
    { icon: <FiLinkedin size={17} />,  href: PERSONAL.linkedin,  label: "LinkedIn",  color: "#0A66C2"  },
    { icon: <SiLeetcode size={15} />,  href: PERSONAL.leetcode,  label: "LeetCode",  color: "#FFA116"  },
    { icon: <SiInstagram size={15} />, href: PERSONAL.instagram, label: "Instagram", color: "#E1306C"  },
    { icon: <SiSnapchat size={15} />,  href: PERSONAL.snapchat,  label: "Snapchat",  color: "#FFFC00"  },
    { icon: <SiWhatsapp size={15} />,  href: PERSONAL.whatsapp,  label: "WhatsApp",  color: "#25D366"  },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-[#020203] border-t border-purple-900/20 overflow-hidden">

            {/* Animated top glow line */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg,transparent,#a855f7,#22d3ee,transparent)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.1),transparent_60%)] pointer-events-none" />

            <div className="container-custom py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* ── BRAND ──────────────────────────── */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 w-fit group">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-purple-500"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="font-display text-2xl font-bold text-white">
                                KP<span className="text-purple-400">.</span>
                            </span>
                        </Link>

                        <p className="text-slate-600 text-sm leading-relaxed max-w-[220px]">
                            Building cinematic digital experiences, one commit at a time.
                        </p>

                        {/* Social icons row */}
                        <div className="flex flex-wrap gap-2.5">
                            {SOCIALS.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={s.label}
                                    className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center text-slate-500 hover:border-purple-400/50 transition-colors"
                                    style={{ "--hover-color": s.color } as React.CSSProperties}
                                    whileHover={{ scale: 1.12, y: -2, color: s.color }}
                                    whileTap={{ scale: 0.92 }}
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* ── NAVIGATION ─────────────────────── */}
                    <div>
                        <h4 className="font-mono text-[11px] text-slate-700 uppercase tracking-widest mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-500 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group w-fit"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-purple-500 transition-all duration-300 flex-shrink-0" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── CONTACT INFO ───────────────────── */}
                    <div>
                        <h4 className="font-mono text-[11px] text-slate-700 uppercase tracking-widest mb-4">
                            Get in Touch
                        </h4>
                        <div className="space-y-3">
                            {/* Direct email link */}
                            <a
                                href={`mailto:${PERSONAL.email}`}
                                className="flex items-center gap-3 text-slate-500 hover:text-purple-400 transition-colors group w-fit"
                            >
                                <FiMail size={14} className="text-purple-600 flex-shrink-0" />
                                <span className="font-mono text-sm">{PERSONAL.email}</span>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={PERSONAL.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-slate-500 hover:text-[#25D366] transition-colors group w-fit"
                            >
                                <SiWhatsapp size={14} className="text-[#25D366] flex-shrink-0" />
                                <span className="font-mono text-sm">{PERSONAL.phone}</span>
                            </a>

                            {/* Location */}
                            <div className="flex items-center gap-3 text-slate-600">
                                <FiMapPin size={14} className="text-purple-800 flex-shrink-0" />
                                <span className="font-mono text-sm">{PERSONAL.location}</span>
                            </div>

                            {/* Available badge */}
                            <div className="flex items-center gap-2 mt-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span className="font-mono text-xs text-green-500">Available for opportunities</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-purple-900/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-slate-700 text-xs flex items-center gap-1.5 font-mono">
                        © {year} Krish Patel · Built with
                        <FiHeart className="text-red-600" size={11} />
                        using Next.js 14 &amp; Three.js
                    </p>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://gallops.netlify.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] text-slate-800 hover:text-purple-500 transition-colors"
                        >
                            gallops.netlify.app ↗
                        </a>
                        <span className="text-slate-800">·</span>
                        <a
                            href="https://githubinsights08.netlify.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] text-slate-800 hover:text-purple-500 transition-colors"
                        >
                            githubinsights08.netlify.app ↗
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
