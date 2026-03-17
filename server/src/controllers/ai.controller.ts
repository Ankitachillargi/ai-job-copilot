import { Request, Response } from "express";
import { analyzeResumeService } from "../services/ai.service";

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.jobId);
    const { resume_id } = req.body;

    const result = await analyzeResumeService(resume_id, jobId);

    res.json({
      success: true,
      data: result
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};