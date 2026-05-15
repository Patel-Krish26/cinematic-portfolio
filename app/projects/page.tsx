"use client";
// ============================================================
// PROJECTS/PAGE.TSX — Final
// Shows all projects including gallops + githubinsights
// Filter tabs + 3D tilt cards + live/github links
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";

type Filter = "All" | "completed" | "in-progress" | "planned";

const TABS: { label: string; value: Filter }[] = [
    { label: "All",         value: "All"         },
    { label: "Completed",   value: "completed"   },
    { label: "In Progress", value: "in-progress" },
    { label: "Planned",     value: "planned"     },
];

export default function ProjectsPage() {
    const [filter, setFilter] = useState<Filter>("All");
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const filtered = filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.status === filter);

    const count = (f: Filter) =>
        f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.status === f).length;

    return (
        <div className="min-h-screen pt-24">
            <section className="section-pad" ref={ref}>
                <div className="container-custom">
                    <SectionHeader
                        tag="PORTFOLIO"
                        title="My Projects"
                        description="Things I've built — from GitHub analytics tools to full e-commerce platforms. Two live on Netlify."
                        inView={inView}
                    />

                    {/* Live deploy badges */}
                    <motion.div
                        className="flex flex-wrap gap-3 justify-center mt-8"
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        {[
                            { label: "gallops.netlify.app",         href: "https://gallops.netlify.app"         },
                            { label: "githubinsights08.netlify.app", href: "https://githubinsights08.netlify.app" },
                        ].map((site) => (
                            <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-green-500/25 text-green-400 font-mono text-xs hover:border-green-400/50 transition-colors">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                                </span>
                                {site.label} ↗
                            </a>
                        ))}
                    </motion.div>

                    {/* Filter tabs */}
                    <motion.div
                        className="flex flex-wrap gap-2 justify-center mt-8"
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.28 }}
                    >
                        {TABS.map((tab) => (
                            <button key={tab.value} onClick={() => setFilter(tab.value)}
                                className={`px-4 py-2.5 rounded-xl font-mono text-sm transition-all duration-200 border ${
                                    filter === tab.value
                                        ? "bg-purple-600/75 border-purple-500/70 text-white shadow-lg shadow-purple-600/15"
                                        : "glass border-purple-900/25 text-slate-500 hover:text-slate-200 hover:border-purple-700/35"
                                }`}>
                                {tab.label}
                                <span className="ml-2 opacity-40 text-[11px]">({count(tab.value)})</span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.32 }}
                        >
                            {filtered.map((project, i) => (
                                <motion.div key={project.id}
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-full">
                                    <ProjectCard project={project} index={i} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <motion.p className="text-center py-20 font-mono text-slate-700"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            No projects in this category yet.
                        </motion.p>
                    )}
                </div>
            </section>
        </div>
    );
}
