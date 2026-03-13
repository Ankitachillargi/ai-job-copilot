import OpenAI from "openai";
import { pool } from "../db/db";
import { env } from "../config/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

export const analyzeResumeService = async (resumeId: number, jobId: number) => {

  const [resumeRows]: any = await pool.execute(
    "SELECT parsed_text FROM resumes WHERE id = ?",
    [resumeId]
  );

  const resumeText = resumeRows[0]?.parsed_text;

  const [jobRows]: any = await pool.execute(
    "SELECT description FROM jobs WHERE id = ?",
    [jobId]
  );

  const jobDescription = jobRows[0]?.description;

  if (!resumeText || !jobDescription) {
    throw new Error("Resume or Job not found");
  }

  const prompt = `
Compare the resume with the job description.

Return JSON only with:
{
  "match_score": number (0-100),
  "missing_skills": [],
  "recommendations": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const aiText = response.choices[0].message.content;

  return aiText;
};