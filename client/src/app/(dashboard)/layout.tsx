"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { token, isHydrated } = useAuthStore((s) => ({
    token: s.token,
    isHydrated: s.isHydrated,
  }));

  useEffect(() => {
    if (isHydrated && !token) {
      router.push("/login");
    }
  }, [isHydrated, token, router]);

  // ⏳ Wait until Zustand loads from localStorage
  if (!isHydrated) return null;

  // 🚫 Not logged in → don't render dashboard
  if (!token) return null;

  return <div>{children}</div>;
}