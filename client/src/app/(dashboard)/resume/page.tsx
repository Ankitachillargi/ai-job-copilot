"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await api.post("/resumes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      alert("Resume uploaded successfully");
    } catch (err: any) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  console.log("resume page rendereddddd")

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl mb-4">Upload Resume</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}