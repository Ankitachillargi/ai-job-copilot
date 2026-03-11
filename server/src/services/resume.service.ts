import fs from "fs";
import { pool } from "../db/db";

const pdfParse = require("pdf-parse");

// Clean junk characters from parsed PDF text
const cleanParsedText = (text: string): string => {
  return text
    .replace(/\|+/g, "")
    .replace(/[^\x20-\x7E\n]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export const uploadResumeService = async (userId: number, file: any) => {

  const filePath = file.path;

  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer);

  const parsedText = cleanParsedText(data.text);

  const [result]: any = await pool.execute(
    "INSERT INTO resumes (user_id, file_url, original_filename, parsed_text) VALUES (?, ?, ?, ?)",
    [
      userId,
      filePath.replace(/\\/g, "/"),   // normalized path
      file.originalname,              // original filename
      parsedText
    ]
  );

  return {
    resume_id: result.insertId,
    file_url: filePath,
    original_filename: file.originalname
  };
};