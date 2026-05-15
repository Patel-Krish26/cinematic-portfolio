"use client";
// ============================================================
// CONTACT/PAGE.TSX — No database version
// How it works:
//   1. User fills the form (name, email, subject, message)
//   2. Clicks "Send via Email"   → opens their email app with
//      everything pre-filled in mailto: link
//   3. OR clicks "Send via WhatsApp" → opens WhatsApp chat
//      with the message pre-filled
//   No server, no database, no API — just pure frontend links
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import {
    FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
    FiCopy, FiCheck,
} from "react-icons/fi";
import { SiLeetcode, SiInstagram, SiSnapchat, SiWhatsapp } from "react-icons/si";
import SectionHeader from "@/components/ui/SectionHeader";
import { PERSONAL } from "@/lib/data";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const EMPTY: FormData = { name: "", email: "", subject: "", message: "" };

// ── Simple input/textarea field ────────────────────────────
function Field({
    label, name, type = "text", value, onChange,
    placeholder, multiline = false, required = true,
}: {
    label: string; name: keyof FormData; type?: string;
    value: string; onChange: (n: keyof FormData, v: string) => void;
    placeholder?: string; multiline?: boolean; required?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const base =
        `w-full bg-transparent text-white text-sm font-body outline-none ` +
        `placeholder:text-slate-700 transition-colors duration-200 px-4 py-3 ` +
        (multiline ? "resize-none min-h-[130px]" : "");

    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-slate-600 uppercase tracking-widest">
                {label}{required && <span className="text-purple-500 ml-0.5">*</span>}
            </label>
            <div
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                    background: "rgba(10,10,20,0.5)",
                    border: `1px solid ${focused ? "rgba(168,85,247,0.55)" : "rgba(168,85,247,0.14)"}`,
                    boxShadow: focused ? "0 0 0 3px rgba(168,85,247,0.07)" : "none",
                }}
            >
                {multiline ? (
                    <textarea value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder} required={required}
                        className={base} />
                ) : (
                    <input type={type} value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder} required={required}
                        className={base} />
                )}
            </div>
        </div>
    );
}

// ── Copy-to-clipboard button ───────────────────────────────
function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handle = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Copied!");
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={handle}
            className="text-slate-600 hover:text-purple-400 transition-colors ml-auto flex-shrink-0"
            title="Copy">
            {copied ? <FiCheck size={13} className="text-green-400" /> : <FiCopy size={13} />}
        </button>
    );
}

export default function ContactPage() {
    const [form, setForm] = useState<FormData>(EMPTY);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    const set = (n: keyof FormData, v: string) => setForm((p) => ({ ...p, [n]: v }));

    // Validation helper
    const validate = (): string | null => {
        if (!form.name.trim()) return "Please enter your name.";
        if (!form.email.trim()) return "Please enter your email.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email.";
        if (!form.message.trim()) return "Please enter a message.";
        return null;
    };

    // ── Send via Email (mailto link) ───────────────────────
    // Opens the user's default email client (Gmail, Outlook, etc.)
    // with To, Subject and Body pre-filled from the form
    const sendEmail = () => {
        const err = validate();
        if (err) { toast.error(err); return; }

        const subject = encodeURIComponent(
            form.subject.trim() || `Portfolio message from ${form.name.trim()}`
        );
        const body = encodeURIComponent(
            `Name: ${form.name.trim()}\n` +
            `Email: ${form.email.trim()}\n\n` +
            `${form.message.trim()}`
        );

        // mailto: opens the user's email app with everything filled in
        window.location.href =
            `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
    };

    // ── Send via WhatsApp ──────────────────────────────────
    // Opens WhatsApp with the message pre-typed
    const sendWhatsApp = () => {
        const err = validate();
        if (err) { toast.error(err); return; }

        const text = encodeURIComponent(
            `Hi Krish! I found your portfolio.\n\n` +
            `Name: ${form.name.trim()}\n` +
            `Email: ${form.email.trim()}\n` +
            (form.subject.trim() ? `Subject: ${form.subject.trim()}\n` : "") +
            `\n${form.message.trim()}`
        );

        // wa.me link with India country code (+91)
        window.open(`https://wa.me/918238775747?text=${text}`, "_blank", "noopener,noreferrer");
    };

    const socials = [
        { icon: <FiGithub size={16} />, href: PERSONAL.github, col: "#ffffff", label: "GitHub" },
        { icon: <FiLinkedin size={16} />, href: PERSONAL.linkedin, col: "#0A66C2", label: "LinkedIn" },
        { icon: <SiLeetcode size={14} />, href: PERSONAL.leetcode, col: "#FFA116", label: "LeetCode" },
        { icon: <SiInstagram size={14} />, href: PERSONAL.instagram, col: "#E1306C", label: "Instagram" },
        { icon: <SiSnapchat size={14} />, href: PERSONAL.snapchat, col: "#FFFC00", label: "Snapchat" },
        { icon: <SiWhatsapp size={14} />, href: PERSONAL.whatsapp, col: "#25D366", label: "WhatsApp" },
    ];

    return (
        <div className="min-h-screen pt-24">
            <section className="section-pad" ref={ref}>
                <div className="container-custom">

                    <SectionHeader
                        tag="CONTACT"
                        title="Let's Work Together"
                        description="Fill the form and send directly via Email or WhatsApp — no sign-up, instant delivery."
                        inView={inView}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 mt-14">

                        {/* ── Left panel — info ─────────────── */}
                        <motion.div
                            className="lg:col-span-2 flex flex-col gap-4"
                            initial={{ opacity: 0, x: -28 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.62, delay: 0.12 }}
                        >
                            <div className="glass neon-border rounded-2xl p-6 space-y-5 flex-1">
                                <h3 className="font-display font-bold text-white text-lg">Get in touch</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Available for freelance, internships, and full-time roles.
                                    Reach me directly — no forms that disappear into the void.
                                </p>

                                {/* Contact details with copy buttons */}
                                <div className="space-y-4">
                                    {/* Email — most important */}
                                    <div>
                                        <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-1.5">
                                            Email (fastest reply)
                                        </p>
                                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                                            style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)" }}>
                                            <FiMail size={14} className="text-purple-400 flex-shrink-0" />
                                            <a href={`mailto:${PERSONAL.email}`}
                                                className="font-mono text-sm text-slate-300 hover:text-purple-400 transition-colors truncate">
                                                {PERSONAL.email}
                                            </a>
                                            <CopyButton text={PERSONAL.email} />
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div>
                                        <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-1.5">
                                            WhatsApp
                                        </p>
                                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                                            style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.18)" }}>
                                            <SiWhatsapp size={14} className="text-[#25D366] flex-shrink-0" />
                                            <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer"
                                                className="font-mono text-sm text-slate-300 hover:text-[#25D366] transition-colors">
                                                {PERSONAL.phone}
                                            </a>
                                            <CopyButton text={PERSONAL.phone} />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <FiMapPin size={14} className="text-purple-800 flex-shrink-0" />
                                        <span className="font-mono text-sm">{PERSONAL.location}</span>
                                    </div>
                                </div>

                                {/* Social links */}
                                <div className="pt-3 border-t border-purple-900/20 space-y-2.5">
                                    <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
                                        Also find me on
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {socials.map((s) => (
                                            <motion.a key={s.label} href={s.href}
                                                target="_blank" rel="noopener noreferrer" title={s.label}
                                                className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center hover:border-purple-400/40 transition-colors"
                                                style={{ color: s.col }}
                                                whileHover={{ scale: 1.12, y: -2 }}
                                                whileTap={{ scale: 0.9 }}>
                                                {s.icon}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Response time card */}
                            <div className="glass neon-border rounded-2xl p-4 flex items-center gap-4">
                                <div className="relative flex-shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">Usually replies within</p>
                                    <p className="font-mono text-green-400 font-bold text-sm">24 hours</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Right panel — form ────────────── */}
                        <motion.div
                            className="lg:col-span-3 glass neon-border rounded-2xl p-6 md:p-7 flex flex-col gap-5"
                            initial={{ opacity: 0, x: 28 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.62, delay: 0.22 }}
                        >
                            {/* How it works note */}
                            <div className="flex items-start gap-3 px-4 py-3 rounded-xl"
                                style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.16)" }}>
                                <span className="text-lg">💡</span>
                                <p className="text-slate-400 text-xs leading-relaxed font-mono">
                                    Fill the form → click <span className="text-purple-400">Send via Email</span> or{" "}
                                    <span className="text-[#25D366]">Send via WhatsApp</span>.
                                    Your message opens pre-filled in the app — just hit send!
                                </p>
                            </div>

                            {/* Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Your Name" name="name" value={form.name} onChange={set} placeholder="Krish Patel" />
                                <Field label="Your Email" name="email" value={form.email} onChange={set} placeholder="you@example.com" type="email" />
                            </div>
                            <Field label="Subject" name="subject" value={form.subject} onChange={set}
                                placeholder="Project idea, job offer, collab..." required={false} />
                            <Field label="Message" name="message" value={form.message} onChange={set}
                                placeholder="Hi Krish, I'd love to work with you on..." multiline />

                            {/* ── TWO ACTION BUTTONS ─────────────
                                Email button  → mailto: link
                                WhatsApp btn  → wa.me link
                            ──────────────────────────────────── */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">

                                {/* Send via Email */}
                                <motion.button
                                    onClick={sendEmail}
                                    className="btn-glow flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-medium text-[0.93rem]"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <FiMail size={17} />
                                    Send via Email
                                </motion.button>

                                {/* Send via WhatsApp */}
                                <motion.button
                                    onClick={sendWhatsApp}
                                    className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-medium text-[0.93rem] transition-all"
                                    style={{
                                        background: "rgba(37,211,102,0.12)",
                                        border: "1px solid rgba(37,211,102,0.35)",
                                        color: "#25D366",
                                    }}
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(37,211,102,0.18)" }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <SiWhatsapp size={17} />
                                    Send via WhatsApp
                                </motion.button>
                            </div>

                            <p className="text-center font-mono text-[11px] text-slate-700">
                                No data stored · Opens your Email / WhatsApp app directly
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
}