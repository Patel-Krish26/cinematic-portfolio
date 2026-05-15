"use client";
// ============================================================
// ABOUT/PAGE.TSX — Fixed: Image sizes props, hydration
// ============================================================

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import CountUp from "react-countup";
import { PERSONAL, TIMELINE, HERO_STATS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { FiBook, FiBriefcase, FiAward, FiMusic, FiGlobe, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const TYPE_CONFIG = {
    education:   { icon: <FiBook size={14} />,     color: "#22d3ee", label: "Education"   },
    experience:  { icon: <FiBriefcase size={14} />, color: "#a855f7", label: "Experience"  },
    achievement: { icon: <FiAward size={14} />,     color: "#f59e0b", label: "Achievement" },
};

function TimelineItem({ item, i }: { item: typeof TIMELINE[0]; i: number }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
    const cfg    = TYPE_CONFIG[item.type];
    const isRight = i % 2 !== 0;

    return (
        <motion.div
            ref={ref}
            className={`relative flex gap-4 md:gap-0 ${isRight ? "md:flex-row-reverse" : "md:flex-row"}`}
            initial={{ opacity: 0, x: isRight ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Dot + line */}
            <div className="relative flex-shrink-0 w-8 flex flex-col items-center md:w-1/2 md:items-center md:pt-5">
                <div className="absolute top-7 bottom-0 left-[14px] md:left-1/2 w-px bg-gradient-to-b from-purple-700 to-transparent -translate-x-1/2" />
                <div
                    className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center border-2 mt-4 flex-shrink-0"
                    style={{ background: "#050508", borderColor: cfg.color, boxShadow: `0 0 10px ${cfg.color}40` }}
                >
                    <span style={{ color: cfg.color }}>{cfg.icon}</span>
                </div>
            </div>

            {/* Card */}
            <div className={`flex-1 pb-8 ${isRight ? "md:pr-8 md:pl-0 md:text-right" : "md:pl-8"}`}>
                <div className="glass neon-border rounded-2xl p-5 space-y-2.5 hover:border-purple-500/40 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border"
                            style={{ color: cfg.color, borderColor: `${cfg.color}35`, background: `${cfg.color}10` }}>
                            {cfg.icon} {cfg.label}
                        </span>
                        <span className="font-mono text-xs text-slate-600">{item.period}</span>
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-white text-base leading-snug">
                            {item.title}
                            {item.current && (
                                <span className="ml-2 align-middle text-[10px] font-mono text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                                    CURRENT
                                </span>
                            )}
                        </h3>
                        <p className="font-mono text-purple-400 text-xs mt-0.5">{item.organization}</p>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function AboutPage() {
    const [heroRef, heroInView]   = useInView({ triggerOnce: true, threshold: 0.1 });
    const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <div className="min-h-screen pt-24">

            {/* Bio */}
            <section className="section-pad" ref={heroRef}>
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Photo */}
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, x: -40 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.75 }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-5 rounded-[2.5rem] blur-2xl opacity-20 pointer-events-none"
                                    style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.4),rgba(34,211,238,0.3))" }} />
                                <div className="relative w-64 h-80 md:w-72 md:h-[360px] rounded-[2rem] overflow-hidden border border-purple-500/25">
                                    <Image
                                        src="/krish.jpg" alt="Krish Patel" fill
                                        sizes="(max-width:768px) 256px, 288px"
                                        className="object-cover object-top"
                                    />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(5,5,8,0.65) 0%,transparent 55%)" }} />
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-display font-bold text-white text-lg">Krish Patel</p>
                                        <p className="font-mono text-purple-400 text-xs">{PERSONAL.email}</p>
                                    </div>
                                </div>
                                <motion.div className="absolute -top-3 -right-3 glass neon-border px-3 py-2 rounded-xl flex items-center gap-2"
                                    animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                                    <FiMusic className="text-purple-400" size={14} />
                                    <span className="font-mono text-xs text-slate-400">Codes to music</span>
                                </motion.div>
                                <motion.div className="absolute -bottom-3 -left-3 glass neon-border px-3 py-2 rounded-xl flex items-center gap-2"
                                    animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
                                    <FiGlobe className="text-cyan-400" size={14} />
                                    <span className="font-mono text-xs text-slate-400">Gandhinagar, India</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Bio text */}
                        <motion.div
                            className="space-y-5"
                            initial={{ opacity: 0, x: 40 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.75, delay: 0.12 }}
                        >
                            <span className="tag">ABOUT ME</span>
                            <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                                The person behind<br />the <span className="gradient-text">code</span>
                            </h1>
                            <p className="text-slate-400 leading-relaxed">{PERSONAL.description}</p>
                            <p className="text-slate-400 leading-relaxed">
                                Pursuing B.E. Computer Engineering at{" "}
                                <span className="text-purple-400 font-medium">GEC Gandhinagar</span>{" "}
                                (CGPA 7.83), while working as a Full Stack intern since Jan 2026.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Shipped projects in React, Node.js, .NET, Spring Boot, and Django.
                                My philosophy:{" "}
                                <span className="text-cyan-400 italic">&ldquo;Clean code, fast ships, learn always.&rdquo;</span>
                            </p>
                            <div className="space-y-2.5 pt-1">
                                {[
                                    { icon: <FiMail size={13} />,  text: PERSONAL.email,    href: `mailto:${PERSONAL.email}` },
                                    { icon: <FiPhone size={13} />, text: PERSONAL.phone,    href: `tel:${PERSONAL.phone}` },
                                    { icon: <FiMapPin size={13} />,text: PERSONAL.location, href: "#" },
                                ].map((c) => (
                                    <a key={c.text} href={c.href}
                                        className="flex items-center gap-3 text-slate-500 hover:text-purple-400 transition-colors text-sm group w-fit">
                                        <span className="text-purple-600 group-hover:scale-110 transition-transform">{c.icon}</span>
                                        <span className="font-mono">{c.text}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12" ref={statsRef}>
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {HERO_STATS.map((s, i) => (
                            <motion.div key={s.label} className="glass neon-border rounded-2xl p-5 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.55, delay: i * 0.08 }}>
                                <p className="text-3xl font-display font-black gradient-text">
                                    {statsInView ? (
                                        <CountUp
                                            end={typeof s.value === "number" ? s.value : parseFloat(String(s.value))}
                                            duration={2}
                                            decimals={String(s.value).includes(".") ? 2 : 0}
                                            suffix={s.suffix ?? ""}
                                        />
                                    ) : "0"}
                                </p>
                                <p className="font-mono text-xs text-slate-600 mt-1 tracking-wide">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-pad">
                <div className="container-custom">
                    <SectionHeader tag="JOURNEY" title="My Story" description="Education, internship, and milestones." inView />
                    <div className="relative mt-12 space-y-0">
                        {TIMELINE.map((item, i) => <TimelineItem key={item.id} item={item} i={i} />)}
                    </div>
                </div>
            </section>
        </div>
    );
}
