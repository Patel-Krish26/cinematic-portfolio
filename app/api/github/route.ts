// ============================================================
// API/GITHUB/ROUTE.TS
// Shows: publicRepos + contributions only
// Removed: followers, following, totalStars
// Fine-grained token: ✅ works perfectly
// ============================================================

import { NextResponse } from "next/server";
import type { GitHubStats, ApiResponse } from "@/types";

const GH_USERNAME = process.env.GITHUB_USERNAME ?? "Patel-Krish26";
const GH_TOKEN    = process.env.GITHUB_TOKEN    ?? "";

async function ghFetch(path: string) {
    const h: Record<string,string> = { Accept:"application/vnd.github.v3+json", "User-Agent":"krish-portfolio" };
    if (GH_TOKEN) h["Authorization"] = `Bearer ${GH_TOKEN}`;
    const res = await fetch(`https://api.github.com${path}`, { headers:h, next:{ revalidate:3600 } });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    return res.json();
}

async function fetchContributions(): Promise<number> {
    if (!GH_TOKEN) return 55;
    const q = `query($l:String!){user(login:$l){contributionsCollection{contributionCalendar{totalContributions}}}}`;
    const r = await fetch("https://api.github.com/graphql", {
        method:"POST",
        headers:{ Authorization:`Bearer ${GH_TOKEN}`, "Content-Type":"application/json" },
        body: JSON.stringify({ query:q, variables:{ l:GH_USERNAME } }),
        next:{ revalidate:3600 },
    });
    if (!r.ok) return 55;
    const j = await r.json();
    return j?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 55;
}

const LANG_COLORS: Record<string,string> = {
    JavaScript:"#F7DF1E",TypeScript:"#3178C6",Python:"#3776AB",
    Java:"#007396","C#":"#239120",HTML:"#E34F26",CSS:"#1572B6",Go:"#00ADD8",
};

export async function GET() {
    try {
        const [user, repos, contributions] = await Promise.all([
            ghFetch(`/users/${GH_USERNAME}`),
            ghFetch(`/users/${GH_USERNAME}/repos?per_page=100&sort=updated`),
            fetchContributions(),
        ]);
        const langCount: Record<string,number> = {};
        (repos as Array<{language:string|null}>).forEach((r) => { if (r.language) langCount[r.language] = (langCount[r.language]??0)+1; });
        const total = Object.values(langCount).reduce((a,b)=>a+b,0);
        const topLanguages = Object.entries(langCount).sort(([,a],[,b])=>b-a).slice(0,6)
            .map(([name,n]) => ({ name, percentage:Math.round((n/total)*100), color:LANG_COLORS[name]??"#a855f7" }));

        return NextResponse.json<ApiResponse<GitHubStats>>({ success:true, data:{
            username:user.login, name:user.name??user.login, bio:user.bio??"Full Stack Developer",
            avatarUrl:user.avatar_url, profileUrl:user.html_url,
            totalCommits:contributions, publicRepos:user.public_repos,
            followers:0, following:0, totalStars:0, topLanguages,
        }});
    } catch {
        return NextResponse.json<ApiResponse<GitHubStats>>({ success:true, data:{
            username:"Patel-Krish26", name:"Krish Patel", bio:"Full Stack Developer",
            avatarUrl:"/krish.jpg", profileUrl:"https://github.com/Patel-Krish26",
            totalCommits:55, publicRepos:12, followers:0, following:0, totalStars:0,
            topLanguages:[
                {name:"JavaScript",percentage:35,color:"#F7DF1E"},
                {name:"Java",percentage:25,color:"#007396"},
                {name:"Python",percentage:18,color:"#3776AB"},
                {name:"TypeScript",percentage:14,color:"#3178C6"},
                {name:"C#",percentage:8,color:"#239120"},
            ],
        }});
    }
}
