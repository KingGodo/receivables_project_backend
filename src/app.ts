import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import healthRoutes from "./modules/health/health.routes";

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRoutes);


export default app;
