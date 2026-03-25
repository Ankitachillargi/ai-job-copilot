"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);

  useEffect(() => {
    console.log("🔥 Running loadFromStorage");
    loadFromStorage();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}