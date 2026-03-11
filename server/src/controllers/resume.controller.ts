import { Request, Response } from "express";
import { uploadResumeService } from "../services/resume.service";


export const uploadResume = async (req: Request, res: Response) => {
  try {

    const user = (req as any).user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const result = await uploadResumeService(user.id, file);

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