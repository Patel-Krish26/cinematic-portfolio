// ============================================================
// TYPES/INDEX.TS — All TypeScript interfaces
// ============================================================

export interface ContactFormData {
    name:    string;
    email:   string;
    subject: string;
    message: string;
}

export interface Project {
    id:              string;
    title:           string;
    description:     string;
    longDescription?: string;
    techStack:       string[];
    githubUrl?:      string;
    liveUrl?:        string;
    imageUrl?:       string;
    featured:        boolean;
    status:          "completed" | "in-progress" | "planned";
    year:            number;
}

export interface Skill {
    name:      string;
    level:     number;
    category:  SkillCategory;
    icon?:     string;
    color?:    string;
    url?:      string;        // ← link to official docs/site
}

export type SkillCategory = "Languages" | "Frontend" | "Backend" | "Database" | "Tools" | "Other";

export interface SkillGroup {
    category: SkillCategory;
    skills:   Skill[];
    icon:     string;
    color:    string;
}

export interface TimelineItem {
    id:           string;
    type:         "education" | "experience" | "achievement";
    title:        string;
    organization: string;
    period:       string;
    startDate:    string;
    endDate?:     string;
    description:  string;
    tags?:        string[];
    icon?:        string;
    current?:     boolean;
}

export interface GitHubStats {
    username:     string;
    name:         string;
    bio:          string;
    followers:    number;
    following:    number;
    publicRepos:  number;
    totalStars:   number;
    totalCommits: number;
    avatarUrl:    string;
    profileUrl:   string;
    topLanguages: LanguageStat[];
}

export interface LanguageStat {
    name:       string;
    percentage: number;
    color:      string;
}

export interface LeetCodeStats {
    username:       string;
    totalSolved:    number;
    easySolved:     number;
    mediumSolved:   number;
    hardSolved:     number;
    acceptanceRate: number;
    ranking:        number;
    reputation:     number;
}

export interface NavItem {
    label: string;
    href:  string;
}

export interface SocialLink {
    platform: string;
    url:      string;
    icon:     string;
    color?:   string;
}

export interface StatItem {
    label:   string;
    value:   number | string;
    suffix?: string;
    prefix?: string;
    icon?:   string;
    color?:  string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?:   T;
    error?:  string;
    message?: string;
}
