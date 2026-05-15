// ============================================================
// LIB/DATA.TS — All personal data for Krish Patel's portfolio
// Edit THIS file to update your info, projects, skills, etc.
// ============================================================

import type { Project, SkillGroup, TimelineItem, SocialLink, StatItem, NavItem } from "@/types";

// ── PERSONAL INFO ──────────────────────────────────────────
export const PERSONAL = {
    name:        "Krish Patel",
    title:       "Full Stack Developer",
    tagline:     "Crafting cinematic digital experiences",
    description: "A motivated computer engineering student with a solid background in web technologies, data structures, algorithms, and software development. I love writing code while listening to music — it's how I enter the flow state.",
    email:       "krishpr2004@gmail.com",
    phone:       "+91 8238775747",
    location:    "Gandhinagar, Gujarat, India",
    github:      "https://github.com/Patel-Krish26",
    linkedin:    "https://linkedin.com/in/krish-patel",
    leetcode:    "https://leetcode.com/u/gQqv4O2dMw/",
    instagram:   "https://instagram.com/kkrriisshh_8",
    snapchat:    "https://snapchat.com/add/krish_patel26",
    whatsapp:    "https://wa.me/918238775747?text=Hi%20Krish%2C%20I%20found%20your%20portfolio!",
    resume:      "/resume.pdf",
    photo:       "/krish.jpg",
    available:   true,
} as const;

// ── NAV ITEMS ──────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
    { label: "Home",      href: "/" },
    { label: "About",     href: "/about" },
    { label: "Projects",  href: "/projects" },
    { label: "Skills",    href: "/skills" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Contact",   href: "/contact" },
];

// ── SOCIAL LINKS (used in footer) ─────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
    { platform: "GitHub",    url: "https://github.com/Patel-Krish26",         icon: "FiGithub",    color: "#ffffff" },
    { platform: "LinkedIn",  url: "https://linkedin.com/in/krish-patel",      icon: "FiLinkedin",  color: "#0A66C2" },
    { platform: "LeetCode",  url: "https://leetcode.com/u/gQqv4O2dMw/",       icon: "SiLeetcode",  color: "#FFA116" },
    { platform: "Instagram", url: "https://instagram.com/krish_patel_26",     icon: "SiInstagram", color: "#E1306C" },
    { platform: "Snapchat",  url: "https://snapchat.com/add/krish_patel26",   icon: "SiSnapchat",  color: "#FFFC00" },
    { platform: "Email",     url: "mailto:krishpr2004@gmail.com",             icon: "FiMail",      color: "#a855f7" },
];

// ── HERO STATS ─────────────────────────────────────────────
export const HERO_STATS: StatItem[] = [
    { label: "Years Coding",   value: 3,    suffix: "+" },
    { label: "Projects Built", value: 10,   suffix: "+" },
    { label: "Technologies",   value: 15,   suffix: "+" },
    { label: "CGPA",           value: 7.83              },
];

// ── PROJECTS (includes deployed ones) ─────────────────────
export const PROJECTS: Project[] = [
    {
        id:          "github-insight",
        title:       "GitHub Insights",
        description: "Fetch and visualize any GitHub profile — contribution graphs, primary language, public repos, and bookmarking. Live on Netlify.",
        longDescription: "GitHub Insights lets you deep-dive into any GitHub profile with beautiful contribution heatmaps, language charts, repo stats, and a bookmark feature for tracking favourite developers.",
        techStack:   ["React JS", "JavaScript", "Clerk", "Chart.js", "HTML", "CSS"],
        githubUrl:   "https://github.com/Patel-Krish26/github-insight",
        liveUrl:     "https://githubinsights08.netlify.app",
        featured:    true,
        status:      "completed",
        year:        2024,
    },
    {
        id:          "gallops",
        title:       "Gallops",
        description: "A dynamic web application deployed live on Netlify. Built with modern web technologies for a seamless user experience.",
        longDescription: "Gallops is a fully deployed web application showcasing modern frontend development with responsive design, smooth animations, and optimized performance.",
        techStack:   ["React JS", "JavaScript", "HTML", "CSS", "Netlify"],
        githubUrl:   "https://github.com/Patel-Krish26/gallops",
        liveUrl:     "https://gallops.netlify.app",
        featured:    true,
        status:      "completed",
        year:        2024,
    },
    {
        id:          "tech-shop",
        title:       "Tech Shop",
        description: "E-commerce app — browse products, cart, orders with unique IDs. Being rebuilt in MERN, Spring Boot, and Django.",
        longDescription: "Tech Shop is a full-featured e-commerce platform. Users can register, browse products, add to cart, and place orders with unique tracking IDs. Currently being expanded with MERN, Spring Boot, and Django backends.",
        techStack:   [".NET", "C#", "MS SQL Server", "Bootstrap", "JavaScript"],
        githubUrl:   "https://github.com/Patel-Krish26/tech-shop",
        featured:    true,
        status:      "in-progress",
        year:        2024,
    },
    {
        id:          "portfolio-v3",
        title:       "Cinematic Portfolio",
        description: "This portfolio — Three.js 3D scenes, GSAP, Framer Motion, MongoDB contact system. Award-winning design.",
        longDescription: "This very portfolio — built with Next.js 14, Three.js for 3D backgrounds, GSAP scroll animations, Framer Motion page transitions, and MongoDB + Mongoose for the contact system.",
        techStack:   ["Next.js 14", "TypeScript", "Three.js", "GSAP", "Framer Motion", "MongoDB"],
        githubUrl:   "https://github.com/Patel-Krish26/portfolio",
        featured:    true,
        status:      "completed",
        year:        2025,
    },
    {
        id:          "mern-shop",
        title:       "Tech Shop — MERN",
        description: "MERN stack rewrite with JWT auth, Redux, and Stripe payments.",
        longDescription: "Modern rewrite of Tech Shop using MongoDB, Express.js, React, and Node.js. Features JWT authentication, Redux state management, and Stripe payment integration.",
        techStack:   ["MongoDB", "Express.js", "React", "Node.js", "Redux", "JWT"],
        githubUrl:   "https://github.com/Patel-Krish26/mern-shop",
        featured:    false,
        status:      "in-progress",
        year:        2025,
    },
    {
        id:          "spring-shop",
        title:       "Tech Shop — Spring Boot",
        description: "Java enterprise backend with Spring Security, JPA, and REST APIs.",
        longDescription: "Enterprise-grade Java backend using Spring Boot, Spring Security with JWT, Spring Data JPA, and MySQL. Full REST API with Swagger docs.",
        techStack:   ["Spring Boot", "Java", "MySQL", "Spring Security", "JPA"],
        githubUrl:   "https://github.com/Patel-Krish26/spring-shop",
        featured:    false,
        status:      "planned",
        year:        2025,
    },
];

// ── SKILLS (Docker/Figma removed, Git+GitHub separated) ───
export const SKILL_GROUPS: SkillGroup[] = [
    {
        category: "Languages",
        icon:     "💻",
        color:    "#a855f7",
        skills: [
            { name: "JavaScript", level: 88, category: "Languages", color: "#F7DF1E",    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
            { name: "TypeScript", level: 82, category: "Languages", color: "#3178C6",    url: "https://www.typescriptlang.org" },
            { name: "Java",       level: 80, category: "Languages", color: "#007396",    url: "https://www.java.com" },
            { name: "Python",     level: 75, category: "Languages", color: "#3776AB",    url: "https://www.python.org" },
            { name: "C#",         level: 72, category: "Languages", color: "#239120",    url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
            { name: "C",          level: 70, category: "Languages", color: "#A8B9CC",    url: "https://en.cppreference.com/w/c" },
        ],
    },
    {
        category: "Frontend",
        icon:     "🎨",
        color:    "#22d3ee",
        skills: [
            { name: "React JS",     level: 88, category: "Frontend", color: "#61DAFB",   url: "https://react.dev" },
            { name: "Next.js",      level: 82, category: "Frontend", color: "#ffffff",   url: "https://nextjs.org" },
            { name: "Tailwind CSS", level: 90, category: "Frontend", color: "#06B6D4",   url: "https://tailwindcss.com" },
            { name: "HTML / CSS",   level: 92, category: "Frontend", color: "#E34F26",   url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
            { name: "Angular",      level: 65, category: "Frontend", color: "#DD0031",   url: "https://angular.io" },
            { name: "Three.js",     level: 60, category: "Frontend", color: "#ffffff",   url: "https://threejs.org" },
        ],
    },
    {
        category: "Backend",
        icon:     "⚙️",
        color:    "#f97316",
        skills: [
            { name: "Node.js",       level: 80, category: "Backend", color: "#339933",   url: "https://nodejs.org" },
            { name: "Express.js",    level: 78, category: "Backend", color: "#ffffff",   url: "https://expressjs.com" },
            { name: ".NET / Web API",level: 72, category: "Backend", color: "#512BD4",   url: "https://dotnet.microsoft.com" },
            { name: "Spring Boot",   level: 65, category: "Backend", color: "#6DB33F",   url: "https://spring.io/projects/spring-boot" },
            { name: "Django",        level: 60, category: "Backend", color: "#092E20",   url: "https://www.djangoproject.com" },
            { name: "REST APIs",     level: 85, category: "Backend", color: "#a855f7",   url: "https://restfulapi.net" },
        ],
    },
    {
        category: "Database",
        icon:     "🗄️",
        color:    "#10b981",
        skills: [
            { name: "MongoDB",       level: 82, category: "Database", color: "#47A248",  url: "https://www.mongodb.com" },
            { name: "MySQL",         level: 78, category: "Database", color: "#4479A1",  url: "https://www.mysql.com" },
            { name: "MS SQL Server", level: 75, category: "Database", color: "#CC2927",  url: "https://www.microsoft.com/en-us/sql-server" },
            { name: "PostgreSQL",    level: 62, category: "Database", color: "#336791",  url: "https://www.postgresql.org" },
            { name: "Mongoose",      level: 78, category: "Database", color: "#880000",  url: "https://mongoosejs.com" },
        ],
    },
    {
        category: "Tools",
        icon:     "🛠️",
        color:    "#f59e0b",
        skills: [
            { name: "Git",      level: 85, category: "Tools", color: "#F05032",          url: "https://git-scm.com" },
            { name: "GitHub",   level: 87, category: "Tools", color: "#ffffff",          url: "https://github.com" },
            { name: "VS Code",  level: 92, category: "Tools", color: "#007ACC",          url: "https://code.visualstudio.com" },
            { name: "Postman",  level: 80, category: "Tools", color: "#FF6C37",          url: "https://www.postman.com" },
            { name: "Vercel",   level: 75, category: "Tools", color: "#ffffff",          url: "https://vercel.com" },
            { name: "Netlify",  level: 75, category: "Tools", color: "#00C7B7",          url: "https://netlify.com" },
        ],
    },
];

// ── TIMELINE / EXPERIENCE ──────────────────────────────────
export const TIMELINE: TimelineItem[] = [
    {
        id:           "internship-2026",
        type:         "experience",
        title:        "Full Stack Web Developer — Intern",
        organization: "Company (Internship)",
        period:       "Jan 2026 – May 2026",
        startDate:    "2026-01",
        endDate:      "2026-05",
        description:  "Built scalable web apps using the MERN stack and Next.js. Gained hands-on experience with production deployments, API design, database optimization, and Agile workflows.",
        tags:         ["Next.js", "React", "Node.js", "MongoDB", "REST API"],
        current:      true,
    },
    {
        id:           "degree",
        type:         "education",
        title:        "B.E. in Computer Engineering",
        organization: "Government Engineering College, Gandhinagar",
        period:       "July 2022 – July 2026",
        startDate:    "2022-07",
        endDate:      "2026-07",
        description:  "Pursuing B.E. Computer Engineering (CGPA 7.83, Sem 7). Core focus: DSA, web technologies, OOP, DBMS, and software engineering.",
        tags:         ["CGPA 7.83", "Computer Engineering", "DSA", "Web Dev"],
    },
    {
        id:           "hackathon-2024",
        type:         "achievement",
        title:        "Smart India Hackathon 2024",
        organization: "Government of India",
        period:       "2024",
        startDate:    "2024-01",
        description:  "Competed in India's largest national hackathon with a cross-functional team. Delivered a working prototype in 36 hours addressing a real government problem statement.",
        tags:         ["Hackathon", "Team Work", "Innovation", "36 hrs"],
    },
    {
        id:           "reliance-scholar",
        type:         "achievement",
        title:        "Reliance Foundation Scholar",
        organization: "Reliance Foundation",
        period:       "2023",
        startDate:    "2023-01",
        description:  "Awarded the Reliance Foundation Scholarship recognising academic excellence and engineering potential.",
        tags:         ["Scholarship", "Merit", "Excellence"],
    },
    {
        id:           "hsc",
        type:         "education",
        title:        "Higher Secondary Education",
        organization: "Super English School",
        period:       "Mar 2021 – Mar 2022",
        startDate:    "2021-03",
        endDate:      "2022-03",
        description:  "Completed HSC with 79.3% and achieved 94 percentile in GUJCET (Gujarat's engineering entrance exam).",
        tags:         ["79.3%", "GUJCET 94PR", "Mathematics", "Science"],
    },
];
