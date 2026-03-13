import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { analyzeResume } from "../controllers/ai.controller";

const router = Router();

router.post("/analyze", authenticate, analyzeResume);

export default router;