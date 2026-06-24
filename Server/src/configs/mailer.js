import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';

configDotenv();

const isDev = process.env.NODE_ENV === 'development';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS
  },
  // Automatically apply the bypass ONLY in development mode
  tls: isDev ? { rejectUnauthorized: false } : undefined
});
