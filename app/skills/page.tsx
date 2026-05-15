"use client";
// ============================================================
// SKILLS/PAGE.TSX — v3
// Changes vs v2:
//   • Docker, Figma removed — Git and GitHub now separate
//   • Each skill tag is CLICKABLE → opens official docs
//   • Prisma ORM replaced with Mongoose in data
//   • Better mobile grid layout
//   • Orbit section simplified for performance
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    ResponsiveContainer, Tooltip,
} from "recharts";
import { SKILL_GROUPS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SkillCategory, Skill } from "@/types";
import { FiExternalLink } from "react-icons/fi";

// Radar overview data
const RADAR_DATA = SKILL_GROUPS.map((g) => ({
    category: g.category,
    level: Math.round(g.skills.reduce((s, sk) => s + sk.level, 0) / g.skills.length),
}));

// ── Single skill bar with click-to-docs ───────────────────
function SkillBar({ skill, inView, delay = 0 }: {
    skill: Skill; inView: boolean; delay?: number;
}) {
    const handleClick = () => {
        if (skill.url) window.open(skill.url, "_blank", "noopener,noreferrer");
    };

    return (
        <motion.div
            className={`space-y-1.5 group ${skill.url ? "cursor-pointer" : ""}`}
            onClick={handleClick}
            whileHover={skill.url ? { scale: 1.02 } : {}}
            title={skill.url ? `Open ${skill.name} docs ↗` : skill.name}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {/* Color dot */}
                    <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: skill.color ?? "#a855f7" }}
                    />
                    <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors">
                        {skill.name}
                    </span>
                    {/* External link icon on hover */}
                    {skill.url && (
                        <FiExternalLink
                            size={11}
                            className="text-slate-700 group-hover:text-purple-400 transition-colors opacity-0 group-hover:opacity-100"
                        />
                    )}
                </div>
                <span className="font-mono text-xs text-slate-600">{skill.level}%</span>
            </div>

            {/* Bar */}
            <div className="h-1.5 w-full rounded-full overflow-hidden bg-white/[0.05]">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: skill.color ?? "#a855f7" }}
                    initial={{ width: "0%" }}
                    animate={inView ? { width: `${skill.level}%` } : { width: "0%" }}
                    transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay }}
                />
            </div>
        </motion.div>
    );
}

// ── Clickable tech pill (used in hero preview too) ────────
function TechPill({ skill }: { skill: Skill }) {
    const handleClick = () => {
        if (skill.url) window.open(skill.url, "_blank", "noopener,noreferrer");
    };

    return (
        <motion.button
            onClick={handleClick}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass neon-border group hover:border-purple-400/50 transition-all duration-200 focus:outline-none"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            title={skill.url ? `View ${skill.name} →` : skill.name}
        >
            <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: skill.color ?? "#a855f7" }}
            />
            <span className="font-mono text-sm text-slate-400 group-hover:text-white transition-colors whitespace-nowrap">
                {skill.name}
            </span>
            {skill.url && (
                <FiExternalLink
                    size={10}
                    className="text-slate-700 group-hover:text-purple-400 transition-colors"
                />
            )}
        </motion.button>
    );
}

type Filter = SkillCategory | "All";

export default function SkillsPage() {
    const [active, setActive] = useState<Filter>("All");
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    const groups = active === "All"
        ? SKILL_GROUPS
        : SKILL_GROUPS.filter((g) => g.category === active);

    const filters: Filter[] = ["All", ...SKILL_GROUPS.map((g) => g.category as SkillCategory)];

    return (
        <div className="min-h-screen pt-24">
            <section className="section-pad" ref={ref}>
                <div className="container-custom space-y-14">

                    <SectionHeader
                        tag="EXPERTISE"
                        title="Skills & Technologies"
                        description="Click any skill to open its official documentation."
                        inView={inView}
                    />

                    {/* ── Radar chart ─────────────────────── */}
                    <motion.div
                        className="glass neon-border rounded-3xl p-6 md:p-8 max-w-lg mx-auto"
                        initial={{ opacity: 0, scale: 0.93 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.65, delay: 0.2 }}
                    >
                        <h3 className="font-display font-bold text-white text-center mb-5 text-lg">
                            Skill Radar Overview
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <RadarChart data={RADAR_DATA} margin={{ top: 0, right: 24, bottom: 0, left: 24 }}>
                                <PolarGrid stroke="rgba(168,85,247,0.15)" />
                                <PolarAngleAxis
                                    dataKey="category"
                                    tick={{ fill: "#64748b", fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}
                                />
                                <Tooltip
                                    formatter={(v: number) => [`${v}%`, "Avg"]}
                                    contentStyle={{
                                        background: "rgba(10,10,20,0.95)",
                                        border: "1px solid rgba(168,85,247,0.3)",
                                        borderRadius: "12px", color: "#e2e8f0",
                                        fontSize: "12px",
                                        fontFamily: "'JetBrains Mono',monospace",
                                    }}
                                />
                                <Radar
                                    dataKey="level"
                                    stroke="#a855f7"
                                    fill="rgba(168,85,247,0.18)"
                                    strokeWidth={1.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* ── Category filter tabs ─────────────── */}
                    <motion.div
                        className="flex flex-wrap gap-2 justify-center"
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        {filters.map((f) => {
                            const grp = SKILL_GROUPS.find((g) => g.category === f);
                            return (
                                <button
                                    key={f}
                                    onClick={() => setActive(f)}
                                    className={`px-4 py-2 rounded-xl font-mono text-sm transition-all duration-200 border ${
                                        active === f
                                            ? "bg-purple-600/75 border-purple-500/70 text-white shadow-lg shadow-purple-600/15"
                                            : "glass border-purple-900/25 text-slate-500 hover:text-slate-200 hover:border-purple-700/35"
                                    }`}
                                >
                                    {grp ? `${grp.icon} ` : "✦ "}{f}
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* ── Skill bar groups ─────────────────── */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35 }}
                        >
                            {groups.map((group, gi) => (
                                <motion.div
                                    key={group.category}
                                    className="glass neon-border rounded-2xl p-5 space-y-4"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: gi * 0.07 }}
                                >
                                    {/* Group header */}
                                    <div className="flex items-center gap-3 pb-3 border-b border-purple-900/20">
                                        <span className="text-xl">{group.icon}</span>
                                        <h3 className="font-display font-semibold text-white">{group.category}</h3>
                                        <div className="ml-auto w-2 h-2 rounded-full" style={{ background: group.color }} />
                                    </div>

                                    {/* Skills */}
                                    <div className="space-y-3.5">
                                        {group.skills.map((skill, si) => (
                                            <SkillBar
                                                key={skill.name}
                                                skill={skill}
                                                inView={inView}
                                                delay={0.25 + gi * 0.05 + si * 0.055}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* ── Tech pill cloud with click ────────── */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.7 }}
                    >
                        <p className="font-mono text-xs text-slate-700 uppercase tracking-widest text-center">
                            All Technologies · Click to Explore
                        </p>
                        <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
                            {SKILL_GROUPS.flatMap((g) => g.skills).map((skill) => (
                                <TechPill key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Orbit decoration ─────────────────── */}
                    <motion.div
                        className="relative flex items-center justify-center overflow-hidden"
                        style={{ height: 320 }}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.85 }}
                    >
                        <p className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-slate-800 uppercase tracking-widest">
                            Tech Orbit
                        </p>
                        {/* Center node */}
                        <div className="absolute z-10 w-14 h-14 rounded-full glass neon-border flex items-center justify-center">
                            <span className="gradient-text font-display font-black text-base">KP</span>
                        </div>
                        {/* Rings */}
                        {[90, 130].map((r) => (
                            <div key={r} className="absolute rounded-full border border-purple-900/25 pointer-events-none"
                                style={{ width: r * 2, height: r * 2 }} />
                        ))}
                        {/* Orbiting icons */}
                        {[
                            { emoji: "⚛️", r: 90,  dur: 7,  startDeg: 0   },
                            { emoji: "🟢", r: 130, dur: 10, startDeg: 60  },
                            { emoji: "🔷", r: 90,  dur: 8,  startDeg: 120 },
                            { emoji: "🐍", r: 130, dur: 11, startDeg: 180 },
                            { emoji: "☕", r: 90,  dur: 9,  startDeg: 240 },
                            { emoji: "🗄️", r: 130, dur: 12, startDeg: 300 },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: item.r * 2, height: item.r * 2,
                                    animation: `orbitSpin ${item.dur}s linear infinite`,
                                    animationDelay: `-${item.dur * (item.startDeg / 360)}s`,
                                }}
                            >
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 glass neon-border rounded-xl flex items-center justify-center text-sm"
                                    style={{
                                        animation: `orbitCounterSpin ${item.dur}s linear infinite`,
                                        animationDelay: `-${item.dur * (item.startDeg / 360)}s`,
                                    }}
                                >
                                    {item.emoji}
                                </div>
                            </div>
                        ))}
                        <style>{`
                          @keyframes orbitSpin        { to { transform: rotate(360deg);  } }
                          @keyframes orbitCounterSpin { from { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
                                                        to   { transform: translateX(-50%) translateY(-50%) rotate(-360deg); } }
                        `}</style>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
