"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useEffect } from "react";

export default function JobsPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  const handleAddJob = async () => {
    if (!title || !company || !description) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/jobs", {
        title,
        company,
        description,
      });

      console.log("Job created:", res.data);

      alert("Job added successfully");

      // reset form
      setTitle("");
      setCompany("");
      setDescription("");
    } catch (err: any) {
      console.error(err);
      alert("Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.data); // adjust if needed
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  fetchJobs();
}, []);

return (
  <div className="min-h-screen bg-zinc-950 text-white p-8">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <p className="text-zinc-400 mt-2">
          Manage job descriptions and prepare them for AI analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Add Job Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Add New Job
          </h2>

          <div className="space-y-4">
            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <textarea
              rows={8}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Paste Job Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={handleAddJob}
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-zinc-200 transition"
            >
              {loading ? "Adding Job..." : "Add Job"}
            </button>
          </div>
        </div>

        {/* Job List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Your Jobs
          </h2>

          {jobs.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-zinc-500 border border-dashed border-zinc-700 rounded-xl">
              No jobs added yet
            </div>
          ) : (
            <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {job.title}
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        {job.company}
                      </p>
                    </div>

                    <span className="text-xs bg-zinc-700 px-2 py-1 rounded">
                      Job
                    </span>
                  </div>

                  <p className="text-zinc-300 text-sm mt-4 line-clamp-4">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  </div>
);
}
