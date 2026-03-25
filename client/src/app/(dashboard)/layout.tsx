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

  // ✅ FIX: separate selectors
  const token = useAuthStore((s) => s.token);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  console.log("token:", token);
console.log("isHydrated:", isHydrated);

  useEffect(() => {
    if (isHydrated && !token) {
      router.push("/login");
    }
  }, [isHydrated, token, router]);

  if (!isHydrated) return null;
  if (!token) return null;

  return <div>{children}</div>;
}