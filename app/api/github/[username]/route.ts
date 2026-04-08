import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

// Server side proxy for Github API requests

export async function GET(
  _req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username || username.length > 39) {
    return NextResponse.json(
      { error: "Invalid username" },
      { status: 400 }
    );
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  // Attach token if available (server-side only)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${username}`, { headers, next: { revalidate: 300 } }),
      fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 300 },
      }),
    ]);

    if (userRes.status === 404) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (userRes.status === 403 || reposRes.status === 403) {
      const reset = userRes.headers.get("X-RateLimit-Reset");
      const resetTime = reset
        ? new Date(Number(reset) * 1000).toLocaleTimeString()
        : "soon";
      return NextResponse.json(
        { error: `Rate limit exceeded. Resets at ${resetTime}.` },
        { status: 429 }
      );
    }

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(
        { error: "GitHub API error" },
        { status: 502 }
      );
    }

    const [user, repos] = await Promise.all([
      userRes.json(),
      reposRes.json(),
    ]);

    // Return remaining rate limit info in headers
    const remaining = userRes.headers.get("X-RateLimit-Remaining");

    return NextResponse.json(
      { user, repos },
      {
        headers: {
          "X-RateLimit-Remaining": remaining ?? "unknown",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("GitHub API proxy error:", err);
    return NextResponse.json(
      { error: "Failed to reach GitHub API" },
      { status: 502 }
    );
  }
}
