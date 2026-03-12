import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob
} from "../controllers/job.controller";

const router = Router();

router.post("/", authenticate, createJob);

router.get("/", authenticate, getJobs);

router.get("/:id", authenticate, getJobById);

router.delete("/:id", authenticate, deleteJob);

export default router;