import { Pool } from 'pg';
import { configDotenv } from 'dotenv';
configDotenv();

const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
