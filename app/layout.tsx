import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider, GitHubProvider } from "@/providers";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitHub Analytics Dashboard",
  description:
    "Professional SaaS dashboard for visualizing GitHub repository statistics, language distribution, and contribution trends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeScript = `
    (function() {
      try {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = stored === 'dark' || (!stored && prefersDark);

        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;
  
  return (
    <html lang="en" suppressHydrationWarning className={dmSans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="font-sans">
        <ThemeProvider>
          <GitHubProvider>
            {children}
          </GitHubProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


