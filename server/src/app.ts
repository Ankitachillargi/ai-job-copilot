import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resumeRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);

app.get("/", (req, res) => {
  res.send("AI Job Copilot API running");
});

export default app;