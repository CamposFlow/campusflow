import nodemailer from 'nodemailer'
import { configDotenv } from 'dotenv'
configDotenv();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: '://gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS
  }
});