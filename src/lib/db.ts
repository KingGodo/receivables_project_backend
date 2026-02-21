import { Pool } from "pg";
import { env } from "../config/env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

/*
 Test connection when server starts
*/
pool.connect()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection error", err));

export default pool;
