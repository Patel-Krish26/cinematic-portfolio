"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
            <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{ backgroundImage:`linear-gradient(rgba(168,85,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,1) 1px,transparent 1px)`, backgroundSize:"60px 60px" }} />
            <div className="text-center relative z-10 space-y-7 max-w-md mx-auto">
                <motion.h1
                    className="font-display font-black leading-none select-none"
                    style={{ fontSize:"clamp(7rem,22vw,14rem)", background:"linear-gradient(135deg,#7c3aed,#a855f7,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", filter:"drop-shadow(0 0 40px rgba(168,85,247,0.3))" }}
                    initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
                    transition={{ duration:0.65, ease:[0.16,1,0.3,1] }}>
                    404
                </motion.h1>
                <motion.div className="space-y-3"
                    initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22 }}>
                    <h2 className="text-2xl font-display font-bold text-white">Page not found</h2>
                    <p className="text-slate-500">You wandered into deep space. This page doesn&apos;t exist.</p>
                </motion.div>
                <motion.div className="flex flex-col sm:flex-row gap-3 justify-center"
                    initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.38 }}>
                    <Link href="/">
                        <motion.button className="btn-glow flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium w-full sm:w-auto"
                            whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
                            <FiHome size={15} /> Go Home
                        </motion.button>
                    </Link>
                    <button onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass neon-border text-slate-400 hover:text-white font-medium transition-colors">
                        <FiArrowLeft size={15} /> Go Back
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
