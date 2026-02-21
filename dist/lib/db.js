"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env_1 = require("../config/env");
const pool = new pg_1.Pool({
    connectionString: env_1.env.DATABASE_URL,
});
/*
 Test connection when server starts
*/
pool.connect()
    .then(() => console.log("✅ Database connected"))
    .catch(err => console.error("❌ DB connection error", err));
exports.default = pool;
