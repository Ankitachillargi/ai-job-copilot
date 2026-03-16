import OpenAI from "openai";
import { pool } from "../db/db";
import { env } from "../config/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});



export const analyzeResumeService = async (resumeId: number, jobId: number) => {

  // 1️⃣ Check if analysis already exists (CACHE)
  const [existing]: any = await pool.execute(
    "SELECT * FROM ai_analyses WHERE resume_id = ? AND job_id = ?",
    [resumeId, jobId]
  );

  if (existing.length > 0) {
    return existing[0];
  }

  // 2️⃣ Fetch resume text
  const [resumeRows]: any = await pool.execute(
    "SELECT parsed_text FROM resumes WHERE id = ?",
    [resumeId]
  );

  const resumeText = resumeRows[0]?.parsed_text;

  // 3️⃣ Fetch job description
  const [jobRows]: any = await pool.execute(
    "SELECT description FROM jobs WHERE id = ?",
    [jobId]
  );

  const jobDescription = jobRows[0]?.description;

  if (!resumeText || !jobDescription) {
    throw new Error("Resume or Job not found");
  }

  // 4️⃣ Limit text length (TOKEN CONTROL)
  const MAX_RESUME_LENGTH = 4000;
  const MAX_JD_LENGTH = 2000;

  const trimmedResume = resumeText.slice(0, MAX_RESUME_LENGTH);
  const trimmedJD = jobDescription.slice(0, MAX_JD_LENGTH);

  // 5️⃣ Prompt
  const prompt = `
Compare the resume with the job description.

Return ONLY JSON in this format:
{
  "match_score": number,
  "missing_skills": [],
  "recommendations": []
}

Resume:
${trimmedResume}

Job Description:
${trimmedJD}
`;

  // 6️⃣ Call OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const aiText = response.choices[0].message.content;

  // 7️⃣ Parse AI JSON
  const aiResult = JSON.parse(aiText as string);

  // 8️⃣ Store in database
  await pool.execute(
    `INSERT INTO ai_analyses
     (resume_id, job_id, match_score, missing_skills, recommendations)
     VALUES (?, ?, ?, ?, ?)`,
    [
      resumeId,
      jobId,
      aiResult.match_score,
      JSON.stringify(aiResult.missing_skills),
      JSON.stringify(aiResult.recommendations)
    ]
  );

  // 9️⃣ Return structured result
  return {
    resume_id: resumeId,
    job_id: jobId,
    match_score: aiResult.match_score,
    missing_skills: aiResult.missing_skills,
    recommendations: aiResult.recommendations
  };

};