"use client";
// ============================================================
// HERO.TSX — v4
// Fixes:
//   • Image sizes prop added (stops Next.js warning)
//   • suppressHydrationWarning on elements with client-only data
//   • WhatsApp, email quick links
//   • Hydration-safe role cycling (starts server-safe)
// ============================================================

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiGithub, FiLinkedin, FiDownload, FiMail } from "react-icons/fi";
import { SiLeetcode, SiWhatsapp } from "react-icons/si";
import { PERSONAL } from "@/lib/data";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false, loading: () => null });

function Reveal({ children, delay = 0, className = "" }: {
    children: React.ReactNode; delay?: number; className?: string;
}) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}

function Fade({ children, delay = 0, className = "" }: {
    children: React.ReactNode; delay?: number; className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.7, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

const ROLES = [
    "Full Stack Developer",
    "React & Next.js Engineer",
    "Node.js Backend Dev",
    "CS @ GEC Gandhinagar",
];

export default function Hero() {
    const [roleIdx, setRoleIdx]   = useState(0);
    // Hydration-safe: only show after mount on client
    const [mounted,  setMounted]  = useState(false);

    useEffect(() => {
        setMounted(true);
        const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="hero-section relative min-h-screen flex items-center overflow-hidden">

            {/* Full-bg 3D scene */}
            <div className="absolute inset-0 z-0">
                <HeroScene />
            </div>

            {/* Left-side gradient keeps text readable */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: "linear-gradient(105deg,rgba(5,5,8,0.97) 0%,rgba(5,5,8,0.82) 38%,rgba(5,5,8,0.28) 65%,rgba(5,5,8,0.08) 100%)",
                }}
            />
            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-44 z-[1] pointer-events-none"
                style={{ background: "linear-gradient(to bottom,transparent,#050508)" }}
            />

            {/* Content */}
            <div className="hero-content relative z-10 container-custom w-full pt-28 pb-14">
                <div className="max-w-2xl lg:max-w-3xl space-y-6">

                    {/* Status badge */}
                    <Fade delay={0.1}>
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass neon-border">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="font-mono text-xs text-green-400 tracking-wide">
                                Open to work · Jan 2026 Intern
                            </span>
                        </div>
                    </Fade>

                    {/* Name */}
                    <div>
                        <Reveal delay={0.22}>
                            <h1 style={{ fontSize: "clamp(3rem,9vw,6.5rem)" }}
                                className="font-display font-black leading-[0.93] tracking-tight text-white">
                                Krish
                            </h1>
                        </Reveal>
                        <Reveal delay={0.34}>
                            <h1 style={{ fontSize: "clamp(3rem,9vw,6.5rem)" }}
                                className="font-display font-black leading-[0.93] tracking-tight gradient-text">
                                Patel.
                            </h1>
                        </Reveal>
                    </div>

                    {/* Cycling role — suppressed until mounted to prevent hydration mismatch */}
                    <Fade delay={0.52}>
                        <div className="flex items-center gap-3 h-6" suppressHydrationWarning>
                            <div className="w-8 h-px bg-purple-500 flex-shrink-0" />
                            <div className="overflow-hidden h-6 flex items-center">
                                {mounted && (
                                    <motion.p
                                        key={roleIdx}
                                        className="font-mono text-[0.88rem] text-purple-300 whitespace-nowrap"
                                        initial={{ y: 24, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -24, opacity: 0 }}
                                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {ROLES[roleIdx]}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </Fade>

                    {/* Description */}
                    <Fade delay={0.62}>
                        <p className="text-slate-400 text-base md:text-[1.05rem] leading-relaxed max-w-lg">
                            Building scalable web apps with React, Next.js &amp; Node.js.
                            Computer Engineering @ GEC Gandhinagar.{" "}
                            <span className="text-slate-300">Codes best with music playing 🎵</span>
                        </p>
                    </Fade>

                    {/* CTA buttons */}
                    <Fade delay={0.72}>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/projects">
                                <motion.button
                                    className="btn-glow flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm"
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                >
                                    View Projects →
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <motion.button
                                    className="glass neon-border flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm hover:border-purple-400/50 transition-colors"
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                >
                                    Hire Me
                                </motion.button>
                            </Link>
                            {/* Direct email */}
                            <motion.a
                                href="mailto:krishpr2004@gmail.com"
                                className="flex items-center gap-2 px-4 py-3 rounded-xl glass border border-purple-900/30 text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition-all text-sm font-mono"
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            >
                                <FiMail size={14} /> Email
                            </motion.a>
                            {/* WhatsApp */}
                            <motion.a
                                href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-3 rounded-xl glass border border-[#25D366]/25 text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/6 transition-all text-sm"
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            >
                                <SiWhatsapp size={15} /> Chat
                            </motion.a>
                        </div>
                    </Fade>

                    {/* Social row */}
                    <Fade delay={0.82}>
                        <div className="flex items-center gap-5 pt-1">
                            <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest hidden sm:block">
                                Find me
                            </span>
                            {[
                                { icon: <FiGithub size={17} />,   href: PERSONAL.github,  label: "GitHub"   },
                                { icon: <FiLinkedin size={17} />, href: PERSONAL.linkedin,label: "LinkedIn" },
                                { icon: <SiLeetcode size={15} />, href: PERSONAL.leetcode,label: "LeetCode" },
                            ].map((s) => (
                                <motion.a
                                    key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    title={s.label}
                                    className="text-slate-600 hover:text-purple-400 transition-colors"
                                    whileHover={{ y: -3, scale: 1.18 }} whileTap={{ scale: 0.9 }}
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                            <a
                                href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-slate-600 hover:text-purple-400 transition-colors font-mono text-[11px] ml-1"
                            >
                                <FiDownload size={12} /> Resume
                            </a>
                        </div>
                    </Fade>

                    {/* Stats */}
                    <Fade delay={1.0}>
                        <div className="flex flex-wrap gap-6 pt-5 mt-1 border-t border-white/[0.05]">
                            {[
                                { n: "3+",  label: "Yrs Coding"    },
                                { n: "10+", label: "Projects"      },
                                { n: "55",  label: "Contributions" },
                                { n: "7.83",label: "CGPA"          },
                            ].map((s) => (
                                <div key={s.label}>
                                    <p className="font-display font-black text-xl md:text-2xl text-white leading-none">{s.n}</p>
                                    <p className="font-mono text-[10px] text-slate-700 mt-1 tracking-wide">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </Fade>
                </div>
            </div>

            {/* Floating photo — right corner, desktop only */}
            <motion.div
                className="
        absolute
        bottom-24
        max-[465px]:bottom-44
        right-4
        sm:right-6
        lg:right-16
        z-10
        block
    "
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    delay: 1.2,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div
                        className="
                relative
                w-20 h-24
                sm:w-24 sm:h-28
                md:w-28 md:h-32
                rounded-2xl
                overflow-hidden
                border border-purple-500/30
            "
                        style={{
                            boxShadow: "0 0 28px rgba(168,85,247,0.22)",
                        }}
                    >
                        <Image
                            src="/krish.jpg"
                            alt="Krish Patel"
                            fill
                            sizes="(max-width:640px) 80px, (max-width:768px) 96px, 112px"
                            className="object-cover object-top"
                            priority
                        />
                    </div>

                    <div className="mt-1.5 text-center">
                        <p className="font-display font-bold text-white text-xs">
                            Krish Patel
                        </p>

                        <p className="font-mono text-[10px] text-purple-400">
                            Full Stack Dev
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
            >
                <motion.div
                    className="w-px h-10 bg-gradient-to-b from-purple-500/60 to-transparent"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                />
                <FiArrowDown className="text-purple-700" size={12} />
            </motion.div>
        </section>
    );
}
