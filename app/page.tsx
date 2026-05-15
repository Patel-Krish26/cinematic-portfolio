// ============================================================
// APP/PAGE.TSX — Home
// Sections: Hero → FeaturedProjects → SkillsPreview → CTA
// ============================================================

import Hero             from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsPreview    from "@/components/sections/SkillsPreview";
import CallToAction     from "@/components/sections/CallToAction";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Krish Patel — Full Stack Developer",
    description: "Cinematic portfolio of Krish Patel — Full Stack Developer building immersive digital experiences with React, Next.js, Three.js.",
};

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedProjects />
            <SkillsPreview />
            <CallToAction />
        </>
    );
}
