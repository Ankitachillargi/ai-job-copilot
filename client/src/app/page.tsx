"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar Contet will go here*/}
      <aside className="w-64 bg-zinc-900 p-5 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">AI Copilot</h2>

          <nav className="space-y-3 text-sm">
            <p className="hover:text-blue-400 cursor-pointer">Dashboard</p>
            <p className="hover:text-blue-400 cursor-pointer">Applications</p>
            <p className="hover:text-blue-400 cursor-pointer">Resume Lab</p>
            <p className="hover:text-blue-400 cursor-pointer">AI Copilot</p>
            <p className="hover:text-blue-400 cursor-pointer">Settings</p>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded mt-6"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <input
            placeholder="Search jobs or companies..."
            className="bg-zinc-800 px-3 py-2 rounded w-64 text-sm"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Applications", value: "12" },
            { label: "Interviews", value: "3" },
            { label: "Resume Score", value: "78%" },
            { label: "AI Suggestions", value: "5" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-zinc-900 p-4 rounded-xl shadow"
            >
              <p className="text-sm text-zinc-400">{item.label}</p>
              <h3 className="text-xl font-semibold">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* AI Copilot */}
        <div className="bg-zinc-900 p-5 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold">AI Copilot</h2>

          <textarea
            placeholder="Paste job description here..."
            className="w-full h-28 p-3 bg-zinc-800 rounded resize-none text-sm"
          />

          <div className="flex gap-3">
            <button className="bg-blue-500 px-4 py-2 rounded">
              Analyze Fit
            </button>
            <button className="bg-green-500 px-4 py-2 rounded">
              Generate Resume
            </button>
            <button className="bg-purple-500 px-4 py-2 rounded">
              Cover Letter
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-zinc-900 p-5 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Applications</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-zinc-400">
                <tr className="text-left">
                  <th className="pb-2">Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    company: "Google",
                    role: "Frontend Dev",
                    status: "Applied",
                    date: "2 days ago",
                  },
                  {
                    company: "Amazon",
                    role: "SDE Intern",
                    status: "Interview",
                    date: "Yesterday",
                  },
                ].map((app, i) => (
                  <tr key={i} className="border-t border-zinc-800">
                    <td className="py-2">{app.company}</td>
                    <td>{app.role}</td>
                    <td>
                      <span className="px-2 py-1 rounded bg-zinc-800 text-xs">
                        {app.status}
                      </span>
                    </td>
                    <td>{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
