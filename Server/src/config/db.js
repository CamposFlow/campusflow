import { Pool } from 'pg';
import { configDotenv } from 'dotenv';
configDotenv();

export const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function connectDB() {
  try {
    console.log('PostgreSQL Database connected successfully!');
  } catch (err) {
    console.error(err.message);
  }
}

export default pool;
