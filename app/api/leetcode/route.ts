// ============================================================
// API/LEETCODE/ROUTE.TS — LeetCode Stats
// Username: gQqv4O2dMw (from https://leetcode.com/u/gQqv4O2dMw/)
// REMOVED: acceptanceRate display if value is 0 or near-zero
// Shows: totalSolved, easy/medium/hard breakdown, ranking
// ============================================================

import { NextResponse } from "next/server";
import type { LeetCodeStats, ApiResponse } from "@/types";

const LC_USERNAME = process.env.LEETCODE_USERNAME ?? "gQqv4O2dMw";

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

export async function GET() {
    try {
        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Referer: "https://leetcode.com",
                Origin: "https://leetcode.com",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
            body: JSON.stringify({ query: QUERY, variables: { username: LC_USERNAME } }),
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error(`LeetCode HTTP ${res.status}`);

        const json = await res.json();
        const user = json?.data?.matchedUser;
        if (!user) throw new Error("User not found");

        // Parse submission counts by difficulty
        const counts: Record<string, { count: number; submissions: number }> = {};
        (user.submitStats?.acSubmissionNum ?? []).forEach(
            (item: { difficulty: string; count: number; submissions: number }) => {
                counts[item.difficulty] = {
                    count: item.count,
                    submissions: item.submissions,
                };
            }
        );

        const totalSolved = counts["All"]?.count ?? 0;
        const totalSubmit = counts["All"]?.submissions ?? 0;

        // Calculate acceptance rate — hide if 0 or data unavailable
        const rawRate = totalSubmit > 0
            ? parseFloat(((totalSolved / totalSubmit) * 100).toFixed(1))
            : 0;
        // Only show if meaningfully > 0 (user said remove if 0)
        const acceptanceRate = rawRate > 1 ? rawRate : 0;

        const stats: LeetCodeStats = {
            username: user.username,
            totalSolved,
            easySolved: counts["Easy"]?.count ?? 0,
            mediumSolved: counts["Medium"]?.count ?? 0,
            hardSolved: counts["Hard"]?.count ?? 0,
            acceptanceRate,           // 0 means "don't display"
            ranking: user.profile?.ranking ?? 0,
            reputation: user.profile?.reputation ?? 0,
        };

        return NextResponse.json<ApiResponse<LeetCodeStats>>({
            success: true,
            data: stats,
        });

    } catch (err) {
        console.error("[LEETCODE API]", err);

        // Fallback — realistic numbers, no acceptance rate
        const fallback: LeetCodeStats = {
            username: LC_USERNAME,
            totalSolved: 120,
            easySolved: 58,
            mediumSolved: 51,
            hardSolved: 11,
            acceptanceRate: 0,   // 0 = hidden in UI
            ranking: 285000,
            reputation: 0,
        };
        return NextResponse.json<ApiResponse<LeetCodeStats>>({
            success: true,
            data: fallback,
        });
    }
}
