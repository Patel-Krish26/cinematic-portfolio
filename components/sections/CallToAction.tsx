"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { PERSONAL } from "@/lib/data";

export default function CallToAction() {
    const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 });
    return (
        <section className="section-pad relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 opacity-[0.028] pointer-events-none"
                style={{ backgroundImage:`linear-gradient(rgba(168,85,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,1) 1px,transparent 1px)`, backgroundSize:"48px 48px" }} />
            <div className="container-custom text-center relative z-10">
                <motion.div className="space-y-7 max-w-xl mx-auto"
                    initial={{ opacity:0, y:32 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.75 }}>
                    <span className="tag">LET&apos;S CONNECT</span>
                    <h2 className="text-4xl md:text-5xl font-display font-black leading-tight">
                        Got a <span className="gradient-text">project</span> in mind?
                    </h2>
                    <p className="text-slate-500 text-base leading-relaxed">
                        Open to freelance, internships, and full-time roles. Let&apos;s build something awesome.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                        <Link href="/contact">
                            <motion.button className="group btn-glow flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-medium"
                                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                                <FiMail size={16} /> Send a Message
                                <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <motion.a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-[#25D366]/25 text-[#25D366] font-medium hover:border-[#25D366]/50 transition-all"
                            whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                            <SiWhatsapp size={16} /> WhatsApp
                        </motion.a>
                        <motion.a href={`mailto:${PERSONAL.email}`}
                            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass neon-border text-slate-400 hover:text-white font-mono text-sm hover:border-purple-400/40 transition-all"
                            whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                            {PERSONAL.email}
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
