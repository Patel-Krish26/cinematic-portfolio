"use client";
// ============================================================
// PROJECTCARD.TSX — Final — 3D tilt, live badge, fix sizes
// ============================================================

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const STATUS = {
    "completed":   { text:"Completed",   dot:"bg-green-400",  pill:"text-green-400 border-green-500/22 bg-green-500/7"  },
    "in-progress": { text:"In Progress", dot:"bg-yellow-400", pill:"text-yellow-400 border-yellow-500/22 bg-yellow-500/7" },
    "planned":     { text:"Planned",     dot:"bg-slate-500",  pill:"text-slate-500 border-slate-600/22 bg-slate-500/7"   },
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref   = useRef<HTMLDivElement>(null);
    const [tilt, setTilt]     = useState({ x:0, y:0 });
    const [glow, setGlow]     = useState({ x:50, y:50 });
    const [hov,  setHov]      = useState(false);
    const s = STATUS[project.status];

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = ref.current; if (!card) return;
        const { left,top,width,height } = card.getBoundingClientRect();
        const x = e.clientX-left, y = e.clientY-top;
        setTilt({ x:((y-height/2)/(height/2))*-6, y:((x-width/2)/(width/2))*6 });
        setGlow({ x:(x/width)*100, y:(y/height)*100 });
    };

    return (
        <div style={{ perspective:"900px" }} className="h-full">
            <div ref={ref} onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setTilt({x:0,y:0});setHov(false);}}
                className="relative h-full rounded-2xl overflow-hidden transition-all duration-150"
                style={{
                    transform:`rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    background:"rgba(10,10,20,0.55)", backdropFilter:"blur(16px)",
                    border: hov ? "1px solid rgba(168,85,247,0.35)" : "1px solid rgba(168,85,247,0.12)",
                    boxShadow: hov ? "0 20px 55px rgba(0,0,0,0.32), 0 0 0 1px rgba(168,85,247,0.08) inset" : "0 4px 22px rgba(0,0,0,0.22)",
                    willChange:"transform",
                }}>
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
                    style={{ opacity:hov?1:0, background:`radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(168,85,247,0.11) 0%, transparent 55%)` }} />

                {/* Index */}
                <span className="absolute top-4 right-4 font-mono text-[11px] text-purple-900/55 font-bold select-none">
                    {String(index+1).padStart(2,"0")}
                </span>

                <div className="relative p-5 flex flex-col h-full gap-4">
                    <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background:"rgba(168,85,247,0.1)", border:"1px solid rgba(168,85,247,0.2)" }}>
                                <FiCode  size={15} className="text-purple-400" />
                            </div>
                            <span className={cn("flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border flex-shrink-0", s.pill)}>
                                <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dot)} />
                                {s.text}
                            </span>
                        </div>
                        <h3 className="font-display text-[1.05rem] font-bold text-white leading-snug">{project.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    </div>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                        {project.techStack.slice(0,5).map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-md font-mono text-[11px]"
                                style={{ background:"rgba(168,85,247,0.07)", border:"1px solid rgba(168,85,247,0.17)", color:"#c084fc" }}>
                                {t}
                            </span>
                        ))}
                        {project.techStack.length>5 && (
                            <span className="px-2 py-0.5 rounded-md font-mono text-[11px] text-slate-700">+{project.techStack.length-5}</span>
                        )}
                    </div>

                    {/* Footer links */}
                    <div className="flex items-center gap-4 pt-3 border-t border-purple-900/14">
                        {project.githubUrl && (
                            <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-300 text-sm transition-colors"
                                whileHover={{ x:2 }}>
                                <FiGithub size={13} />
                                <span className="font-mono text-xs">Code</span>
                            </motion.a>
                        )}
                        {project.liveUrl && (
                            <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 font-mono text-xs transition-colors"
                                style={{ color:"#10b981" }}
                                whileHover={{ x:2 }}>
                                <FiExternalLink size={12} /> Live ↗
                            </motion.a>
                        )}
                        <span className="ml-auto font-mono text-[11px] text-slate-800">{project.year}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
