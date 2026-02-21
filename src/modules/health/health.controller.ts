import { Request, Response } from "express";
import pool from "../../lib/db";

export const healthCheck = async (
  req: Request,
  res: Response
) => {
  try {
    // Check database connection
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "OK",
      message: "Server is healthy",
      timestamp: new Date(),
      uptime: process.uptime(),
      database: "connected"
    });

  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
      database: "disconnected"
    });
  }
};
