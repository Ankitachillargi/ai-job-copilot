"use client";

import { useState } from "react";
import { loginUser } from "@/lib/queries/auth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      // 🔴 IMPORTANT: based on your backend response
      const { user, token } = res.data;

      setAuth(user, token);

      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[380px] p-8 rounded-xl bg-zinc-900">
        <h1 className="text-xl mb-6">Welcome back</h1>

        <input
          className="w-full mb-4 p-3 bg-zinc-800 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 bg-zinc-800 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}