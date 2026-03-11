import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

import { upload } from "../config/multer";
import { uploadResume } from "../controllers/resume.controller";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("resume"),
  uploadResume
);

export default router;