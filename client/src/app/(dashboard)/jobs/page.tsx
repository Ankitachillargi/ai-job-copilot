"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function JobsPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
    </div>
  );
}