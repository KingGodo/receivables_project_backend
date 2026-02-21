"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const healthCheck = async (req, res) => {
    try {
        // Check database connection
        await db_1.default.query("SELECT 1");
        res.status(200).json({
            status: "OK",
            message: "Server is healthy",
            timestamp: new Date(),
            uptime: process.uptime(),
            database: "connected"
        });
    }
    catch (error) {
        res.status(500).json({
            status: "ERROR",
            message: "Database connection failed",
            database: "disconnected"
        });
    }
};
exports.healthCheck = healthCheck;
