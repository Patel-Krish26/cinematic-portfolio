"use client";
import { motion } from "framer-motion";

interface Props {
    tag: string; title: string; description?: string; inView?: boolean; center?: boolean;
}
export default function SectionHeader({ tag, title, description, inView=true, center=true }: Props) {
    const a = center ? "items-center text-center" : "items-start text-left";
    return (
        <div className={`flex flex-col ${a} gap-3.5`}>
            <motion.span className="tag" initial={{ opacity:0, y:8 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.45 }}>
                {tag}
            </motion.span>
            <motion.h2 className="text-3xl md:text-[2.6rem] font-display font-bold text-white leading-tight"
                initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.55, delay:0.07 }}>
                {title}
            </motion.h2>
            <motion.div className={`h-[2px] w-12 rounded-full ${center?"mx-auto":""}`}
                style={{ background:"linear-gradient(90deg,#7c3aed,#22d3ee)" }}
                initial={{ scaleX:0 }} animate={inView?{scaleX:1}:{}} transition={{ duration:0.5, delay:0.15 }} />
            {description && (
                <motion.p className="text-slate-500 text-[1rem] leading-relaxed max-w-lg"
                    initial={{ opacity:0, y:8 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.45, delay:0.22 }}>
                    {description}
                </motion.p>
            )}
        </div>
    );
}
