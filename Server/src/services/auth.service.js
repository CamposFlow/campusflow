import bcrypt from 'bcrypt';
import pool from '../configs/db.js';
import { generateOTP, getOTPExpiry } from '../util/otp.util.js';
import { sendEmail } from './email.service.js';
import User from '../configs/userModel.js';

export const requestPasswordReset = async (email) => {
  const user = User.findByEmail(email);
  if (!user) return;

  const otp = generateOTP();
  const expiresAt = getOTPExpiry(10)

  // Save OTP to DB
  await pool.query(
    `UPDATE users SET reset_otp = $1, reset_otp_expires = $2 WHERE id = $3`, [otp, expiresAt, user.id]
  )
  await sendEmail(email, 'resetPassword', otp)
}

export const resetPassword = async (email, otp, newPassword) => {
  const { rows } = await pool.query(
    `SELECT id, reset_otp, reset_otp_expires FROM users WHERE email = $1`, [email]
  )
  const user = rows[0]
  if (!user || user.reset_otp !== otp) {
    throw new Error('Invalid OTP');
  }
  if (new Date() > new Date(user.reset_otp_expires)) {
    throw new Error('OTP Expired')
  }
  // Hash new password and update user
  const hash = await bcrypt.hash(newPassword, 10)
  await pool.query(`UPDATE users SET password_hash = $1, reset_otp = NULL, reset_otp_expires = NULL WHERE id = $2`, [hash, user.id]);
}