import { Request, Response } from "express";
import { analyzeResumeService } from "../services/ai.service";

export const analyzeResume = async (req: Request, res: Response) => {

  try {

    const { resume_id, job_id } = req.body;

    const result = await analyzeResumeService(resume_id, job_id);

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