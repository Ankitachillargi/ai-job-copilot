import { Request, Response } from "express";
import {
  createJobService,
  getJobsService,
  getJobByIdService,
  deleteJobService
} from "../services/job.service";

export const createJob = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { title, company, description } = req.body;

    const job = await createJobService(
      user.id,
      title,
      company,
      description
    );

    res.status(201).json({
      success: true,
      data: job
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const jobs = await getJobsService(user.id);

    res.json({
      success: true,
      data: jobs
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const job = await getJobByIdService(Number(id));

    res.json({
      success: true,
      data: job
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await deleteJobService(Number(id));

    res.json({
      success: true,
      message: "Job deleted"
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};