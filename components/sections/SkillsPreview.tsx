"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { SKILL_GROUPS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { FiArrowRight } from "react-icons/fi";

export default function SkillsPreview() {
    const [ref, inView] = useInView({ triggerOnce:true, threshold:0.07 });
    const allSkills = SKILL_GROUPS.flatMap((g) => g.skills);

    return (
        <section className="section-pad relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 pointer-events-none"
                style={{ background:"radial-gradient(ellipse 55% 55% at 50% 50%,rgba(168,85,247,0.06),transparent)" }} />
            <div className="container-custom relative z-10">
                <SectionHeader tag="SKILLS" title="My Tech Stack"
                    description="Click any skill to open its official documentation." inView={inView} />
                <motion.div className="flex flex-wrap gap-2.5 justify-center mt-12 max-w-3xl mx-auto"
                    initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:0.5,delay:0.22 }}>
                    {allSkills.map((skill, i) => (
                        <motion.button key={skill.name}
                            onClick={() => skill.url && window.open(skill.url,"_blank","noopener,noreferrer")}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass neon-border group hover:border-purple-400/40 transition-all duration-200"
                            initial={{ opacity:0, scale:0.88 }}
                            animate={inView ? { opacity:1, scale:1 } : {}}
                            transition={{ duration:0.32, delay:0.1+i*0.022 }}
                            whileHover={{ scale:1.06, y:-2 }} whileTap={{ scale:0.95 }}
                            title={skill.url ? `Open ${skill.name} docs` : skill.name}>
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:skill.color??"#a855f7" }} />
                            <span className="font-mono text-sm text-slate-400 group-hover:text-white transition-colors whitespace-nowrap">{skill.name}</span>
                        </motion.button>
                    ))}
                </motion.div>
                <motion.div className="flex justify-center mt-8"
                    initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.95 }}>
                    <Link href="/skills">
                        <motion.button className="group flex items-center gap-2 text-slate-600 hover:text-purple-400 font-mono text-sm transition-colors"
                            whileHover={{ x:3 }}>
                            Full skills page
                            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
