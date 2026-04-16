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
    <div className="p-6 text-white">
      <h1 className="text-xl mb-4">Add Job</h1>

      <input
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <textarea
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleAddJob}
        disabled={loading}
        className="bg-green-500 px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Job"}
      </button>

      <div className="mt-8">
  <h2 className="text-lg mb-3">Your Jobs</h2>

  {jobs.length === 0 ? (
    <p>No jobs added yet</p>
  ) : (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="p-4 bg-zinc-800 rounded"
        >
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-400">{job.company}</p>
          <p className="text-sm mt-2 line-clamp-3">
            {job.description}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}