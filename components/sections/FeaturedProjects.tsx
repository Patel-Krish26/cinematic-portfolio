"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { FiArrowRight } from "react-icons/fi";

export default function FeaturedProjects() {
    const featured = PROJECTS.filter((p) => p.featured).slice(0,3);
    const [ref, inView] = useInView({ triggerOnce:true, threshold:0.07 });

    return (
        <section className="section-pad relative" ref={ref}>
            <div className="absolute inset-0 pointer-events-none opacity-25"
                style={{ background:"radial-gradient(ellipse 60% 50% at 50% 100%,rgba(168,85,247,0.12),transparent)" }} />
            <div className="container-custom relative z-10">
                <SectionHeader tag="WORK" title="Featured Projects"
                    description="Some things I've built — two of them are live on Netlify right now." inView={inView} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
                    {featured.map((project, i) => (
                        <motion.div key={project.id} className="h-full"
                            initial={{ opacity:0, y:36 }}
                            animate={inView ? { opacity:1, y:0 } : {}}
                            transition={{ duration:0.58, delay:0.12+i*0.11, ease:[0.16,1,0.3,1] }}>
                            <ProjectCard project={project} index={i} />
                        </motion.div>
                    ))}
                </div>
                <motion.div className="flex justify-center mt-10"
                    initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.65 }}>
                    <Link href="/projects">
                        <motion.button
                            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass neon-border text-white font-medium hover:border-purple-400/50 transition-colors"
                            whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                            View All Projects
                            <FiArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
