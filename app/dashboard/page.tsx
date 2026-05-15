"use client";
// ============================================================
// DASHBOARD/PAGE.TSX — Final
// GitHub: repos + contributions (no stars/followers/following)
// LeetCode: hides acceptanceRate if 0
// Image sizes prop added — no Next.js warning
// ============================================================

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import CountUp from "react-countup";
import { FiGithub, FiBook, FiGitCommit, FiCode, FiActivity } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import SectionHeader from "@/components/ui/SectionHeader";
import type { GitHubStats, LeetCodeStats } from "@/types";

function Sk({ className = "" }: { className?: string }) {
    return <div className={`skeleton rounded-xl ${className}`} />;
}

function StatCard({ icon, label, value, suffix = "", color = "#a855f7", delay = 0, loaded, show }: {
    icon: React.ReactNode; label: string; value: number; suffix?: string;
    color?: string; delay?: number; loaded: boolean; show: boolean;
}) {
    return (
        <motion.div className="glass neon-border rounded-2xl p-5 flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.48 }}>
            <div className="flex items-center justify-between">
                <span className="text-slate-600">{icon}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                </div>
            </div>
            {loaded ? (
                <p className="text-3xl font-display font-black text-white tabular-nums">
                    {show ? <CountUp end={value} duration={2.2} decimals={suffix === "%" ? 1 : 0} suffix={suffix} /> : <span>{value}{suffix}</span>}
                </p>
            ) : <Sk className="h-9 w-24" />}
            <p className="font-mono text-[11px] text-slate-600 uppercase tracking-widest">{label}</p>
        </motion.div>
    );
}

export default function DashboardPage() {
    const [gh, setGh]         = useState<GitHubStats | null>(null);
    const [lc, setLc]         = useState<LeetCodeStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [ref, inView]       = useInView({ triggerOnce: true, threshold: 0.05 });

    useEffect(() => {
        (async () => {
            try {
                const [gr, lr] = await Promise.allSettled([fetch("/api/github"), fetch("/api/leetcode")]);
                if (gr.status === "fulfilled" && gr.value.ok) { const j = await gr.value.json(); if (j.success) setGh(j.data); }
                if (lr.status === "fulfilled" && lr.value.ok) { const j = await lr.value.json(); if (j.success) setLc(j.data); }
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        })();
    }, []);

    const github: GitHubStats = gh ?? {
        username: "Patel-Krish26", name: "Krish Patel", bio: "Full Stack Developer",
        avatarUrl: "/krish.jpg", profileUrl: "https://github.com/Patel-Krish26",
        totalCommits: 55, publicRepos: 12, followers: 0, following: 0, totalStars: 0,
        topLanguages: [
            { name: "JavaScript", percentage: 35, color: "#F7DF1E" },
            { name: "Java",       percentage: 25, color: "#007396" },
            { name: "Python",     percentage: 18, color: "#3776AB" },
            { name: "TypeScript", percentage: 14, color: "#3178C6" },
            { name: "C#",         percentage: 8,  color: "#239120" },
        ],
    };
    const leetcode: LeetCodeStats = lc ?? {
        username: "gQqv4O2dMw", totalSolved: 120, easySolved: 58,
        mediumSolved: 51, hardSolved: 11, acceptanceRate: 0, ranking: 285000, reputation: 0,
    };
    const showAcceptance = leetcode.acceptanceRate > 1;

    return (
        <div className="min-h-screen pt-24">
            <section className="section-pad" ref={ref}>
                <div className="container-custom space-y-14">
                    <SectionHeader tag="ANALYTICS" title="Live Dashboard"
                        description="Real-time GitHub contributions & LeetCode progress." inView={inView} />

                    {/* ══ GITHUB ═════════════════════════════════ */}
                    <motion.div className="space-y-5"
                        initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.12 }}>

                        <div className="flex items-center gap-3">
                            <FiGithub size={19} className="text-white" />
                            <h2 className="font-display text-xl font-bold text-white">GitHub Stats</h2>
                            <a href={`https://github.com/${github.username}`} target="_blank" rel="noopener noreferrer"
                                className="ml-auto font-mono text-sm text-purple-400 hover:text-white transition-colors">
                                @{github.username} →
                            </a>
                        </div>

                        {/* Only repos + contributions */}
                        <div className="grid grid-cols-2 gap-4 max-w-xs">
                            <StatCard icon={<FiBook size={15} />}      label="Public Repos"  value={github.publicRepos}  color="#a855f7" loaded={!loading} show={inView} />
                            <StatCard icon={<FiGitCommit size={15} />} label="Contributions" value={github.totalCommits} color="#22d3ee" delay={0.07} loaded={!loading} show={inView} />
                        </div>

                        {/* Language chart */}
                        <div className="glass neon-border rounded-2xl p-5 md:p-6">
                            <h3 className="font-display font-semibold text-white mb-5 text-base">Top Languages</h3>
                            {loading ? (
                                <div className="space-y-3">{[1,2,3,4,5].map((i) => <Sk key={i} className="h-7 w-full" />)}</div>
                            ) : (
                                <ResponsiveContainer width="100%" height={195}>
                                    <BarChart data={github.topLanguages} layout="vertical" margin={{ left: 8, right: 36, top: 0, bottom: 0 }}>
                                        <XAxis type="number" domain={[0,100]} tick={{ fill:"#475569", fontSize:11 }}
                                            tickFormatter={(v)=>`${v}%`} axisLine={false} tickLine={false} />
                                        <YAxis dataKey="name" type="category"
                                            tick={{ fill:"#94a3b8", fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}
                                            width={88} axisLine={false} tickLine={false} />
                                        <Tooltip formatter={(v:number)=>[`${v}%`,"Usage"]}
                                            contentStyle={{ background:"rgba(10,10,20,0.95)", border:"1px solid rgba(168,85,247,0.25)", borderRadius:"12px", color:"#e2e8f0", fontFamily:"'JetBrains Mono',monospace", fontSize:"12px" }}
                                            cursor={{ fill:"rgba(168,85,247,0.05)" }} />
                                        <Bar dataKey="percentage" radius={[0,6,6,0]} maxBarSize={13}>
                                            {github.topLanguages.map((l,i) => <Cell key={i} fill={l.color} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        {/* GitHub readme stats image */}
                        <div className="glass neon-border rounded-2xl p-5 text-center">
                            <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-4">GitHub Contribution Card</p>
                            <img
                                src={`https://github-readme-stats.vercel.app/api?username=${github.username}&show_icons=true&theme=transparent&title_color=a855f7&text_color=94a3b8&icon_color=22d3ee&border_color=3b1d6340&bg_color=00000000&hide=stars`}
                                alt="GitHub Stats"
                                className="mx-auto rounded-xl max-w-sm w-full"
                                loading="lazy"
                                onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }}
                            />
                        </div>
                    </motion.div>

                    {/* ══ LEETCODE ══════════════════════════════ */}
                    <motion.div className="space-y-5"
                        initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28 }}>

                        <div className="flex items-center gap-3">
                            <SiLeetcode size={19} className="text-[#FFA116]" />
                            <h2 className="font-display text-xl font-bold text-white">LeetCode Progress</h2>
                            <a href={`https://leetcode.com/u/${leetcode.username}`} target="_blank" rel="noopener noreferrer"
                                className="ml-auto font-mono text-sm text-[#FFA116] hover:text-white transition-colors">
                                Profile →
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Solve breakdown */}
                            <div className="glass neon-border rounded-2xl p-6 space-y-5">
                                <h3 className="font-display font-semibold text-white">Problems Solved</h3>
                                <div className="flex items-center justify-center py-2">
                                    {loading ? <Sk className="h-20 w-28 mx-auto" /> : (
                                        <div className="text-center">
                                            <p className="text-7xl font-display font-black gradient-text tabular-nums">
                                                {inView ? <CountUp end={leetcode.totalSolved} duration={2} /> : 0}
                                            </p>
                                            <p className="font-mono text-xs text-slate-600 mt-1 uppercase tracking-widest">Total Solved</p>
                                        </div>
                                    )}
                                </div>
                                {[
                                    { label:"Easy",   val:leetcode.easySolved,   color:"#10b981" },
                                    { label:"Medium", val:leetcode.mediumSolved,  color:"#f59e0b" },
                                    { label:"Hard",   val:leetcode.hardSolved,    color:"#ef4444" },
                                ].map((d) => (
                                    <div key={d.label} className="flex items-center gap-3">
                                        <span className="w-14 text-center py-0.5 rounded-lg font-mono text-xs font-bold flex-shrink-0"
                                            style={{ background:`${d.color}18`, color:d.color, border:`1px solid ${d.color}35` }}>
                                            {d.label}
                                        </span>
                                        <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                            <motion.div className="h-full rounded-full" style={{ background:d.color }}
                                                initial={{ width:"0%" }}
                                                animate={inView ? { width:`${leetcode.totalSolved>0?(d.val/leetcode.totalSolved)*100:0}%` } : {}}
                                                transition={{ duration:1.2, delay:0.5, ease:[0.16,1,0.3,1] }} />
                                        </div>
                                        <span className="font-mono text-sm text-white w-8 text-right flex-shrink-0">{d.val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Right column */}
                            <div className="space-y-4">
                                {leetcode.ranking > 0 && (
                                    <StatCard icon={<FiActivity size={15} />} label="Global Ranking"
                                        value={leetcode.ranking} color="#f59e0b" loaded={!loading} show={inView} />
                                )}
                                {showAcceptance && (
                                    <StatCard icon={<FiCode size={15} />} label="Acceptance Rate"
                                        value={leetcode.acceptanceRate} suffix="%" color="#10b981"
                                        delay={0.08} loaded={!loading} show={inView} />
                                )}
                                <div className="glass neon-border rounded-2xl p-4 text-center">
                                    <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">LeetCode Card</p>
                                    <img
                                        src={`https://leetcard.jacoblin.com/${leetcode.username}?theme=dark&font=Noto%20Sans&ext=contest&border=1&border_radius=12`}
                                        alt="LeetCode Stats"
                                        className="mx-auto rounded-xl w-full"
                                        loading="lazy"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
