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
  return (
    <html lang="en" suppressHydrationWarning className={dmSans.variable}>
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


