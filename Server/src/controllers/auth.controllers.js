import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { transporter } from '../configs/mailer.js';
import { requestPasswordReset, resetPasswordWithOTP } from '../services/auth.service.js';

// Helper function for token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const register = async (req, res, next) => {
  const { fullname, email, role, university, password } = req.body;
  console.log(req.body);

  
  const testCases = [ fullname, email, role, university, password ];

  testCases.forEach(e => {
    if (!e) console.log(e + " is not defined.")
  })



  if (!fullname || !email || !role || !university || !password) {
    return res.status(400).json({ message: 'Fields not completely filled.' });
  }

  try {
    let user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User with email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create(fullname.toLowerCase(), email.toLowerCase(), role, university, passwordHash);
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token: `Bearer ${token}`,
      user: { id: newUser.id, fullname: newUser.fullname, email: newUser.email, role: newUser.role, university: newUser.university }
    });
  } catch (err) {
    console.error('Registration error:', err);
    next(err);
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || 'Authentication failed' });
    }
    const token = generateToken(user);

    return res.status(200).json({
      message: 'Logged in successfully',
      token: `Bearer ${token}`,
      user: { id: user.id, email: user.email, role: user.role }
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully. Please delete the token from client storage.' });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email field is required.' });
  }

  try {
    await requestPasswordReset(email);
    return res.status(200).json({
      message: 'If that email address exists in our system, an OTP code has been sent.'
    });
  } catch (err) {
    console.error('Forgot password controller error:', err);
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Fields not completely filled.' });
  }
  try {
    await resetPasswordWithOTP(email, otp, newPassword);

    return res.status(200).json({
      message: 'Password reset successful. You can now log in with your new password.'
    });
  } catch (err) {
    console.error('Reset password controller error:', err);
    return res.status(400).json({ error: err.message || 'Failed to reset password.' });
  }
};

export const getMe = (req, res) => {
  if (req.user) {
    const { id, fullname, email } = req.user;
    res.status(200).json({ user: { id, fullname, email } });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};
