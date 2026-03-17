import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resumeRoutes";
import jobRoutes from "./routes/job.routes";
import aiRoutes from "./routes/ai.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);
app.use("/jobs", jobRoutes);
// app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("AI Job Copilot API running");
});

export default app;