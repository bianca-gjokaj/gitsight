"use client";

import { DashboardLayout } from "@/components/layout";
import { useGitHub } from "@/providers";
import { useEffect } from "react";


const DEFAULT_USERNAME = "torvalds";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loadUser } = useGitHub();

  // Load default user if no data yet
  useEffect(() => {
    if (!data) {
      loadUser(DEFAULT_USERNAME);
    }
  }, [data, loadUser]);

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}