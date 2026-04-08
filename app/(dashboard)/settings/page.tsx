"use client";

import { Sun, Moon } from "lucide-react";
import { SectionHeader, DashCard } from "@/components/ui";
import { useTheme } from "@/providers";

export default function SettingsPage() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="animate-fade-in max-w-2xl">
      <SectionHeader title="Settings" subtitle="Configure your dashboard" />

      {/* Appearance */}
      <DashCard title="Appearance" className="mb-6">
        <p className="text-sm text-muted mb-4">
          Choose how the dashboard looks. Your preference is saved automatically.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { if (dark) toggleTheme(); }}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium
              border transition-all duration-150 cursor-pointer
              ${!dark
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card border-border text-muted hover:text-heading hover:border-border-strong"
              }
            `}
          >
            <Sun size={16} />
            Light
          </button>
          <button
            onClick={() => { if (!dark) toggleTheme(); }}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium
              border transition-all duration-150 cursor-pointer
              ${dark
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card border-border text-muted hover:text-heading hover:border-border-strong"
              }
            `}
          >
            <Moon size={16} />
            Dark
          </button>
        </div>
      </DashCard>

      {/* API Configuration */}
      <DashCard title="GitHub API" className="mb-6">
        <p className="text-sm text-muted mb-3">
          Without a personal access token, the GitHub API allows 60 requests per hour.
          With a token, the limit increases to 5,000 per hour.
        </p>
        <p className="text-sm text-muted">
          To configure a token, add <code className="text-xs px-1.5 py-0.5 rounded bg-card-elevated border border-border text-heading font-mono">GITHUB_TOKEN</code> to
          your <code className="text-xs px-1.5 py-0.5 rounded bg-card-elevated border border-border text-heading font-mono">.env.local</code> file and restart the server.
        </p>
      </DashCard>

      {/* About */}
      <DashCard title="About">
        <div className="space-y-2 text-sm text-muted">
          <p>GitHub Analytics Dashboard v1.0.0</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS, and Chart.js.</p>
          <p>Data sourced from the GitHub REST API.</p>
        </div>
      </DashCard>
    </div>
  );
}
