import { pool } from "../db/db";

export const createJobService = async (
  userId: number,
  title: string,
  company: string,
  description: string
) => {

  const [result]: any = await pool.execute(
    "INSERT INTO jobs (user_id, title, company, description) VALUES (?, ?, ?, ?)",
    [userId, title, company, description]
  );

  return {
    id: result.insertId,
    title,
    company
  };
};

export const getJobsService = async (userId: number) => {

  const [rows]: any = await pool.execute(
    "SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );

  return rows;
};

export const getJobByIdService = async (jobId: number) => {

  const [rows]: any = await pool.execute(
    "SELECT * FROM jobs WHERE id = ?",
    [jobId]
  );

  return rows[0];
};

export const deleteJobService = async (jobId: number) => {

  await pool.execute(
    "DELETE FROM jobs WHERE id = ?",
    [jobId]
  );

};