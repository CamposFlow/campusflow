import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken'; // 1. Imported JWT
import User from '../configs/userModel.js';
import { transporter } from '../configs/mailer.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const register = async (req, res, next) => {
  const { username, email, role, password } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Fields not completely filled.' });
  }
  try {
    let user = await User.findByUsername(username);
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create(username.toLowerCase(), email.toLowerCase(), role, passwordHash);
    const token = generateToken(newUser);

    res.status(201).json({ 
      message: 'User registered successfully', 
      token: `Bearer ${token}`,
      user: { id: newUser.id, username: newUser.username, role: newUser.role } 
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
      user: { id: user.id, username: user.username, role: user.role } 
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully. Please delete the token from client storage.' });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findByEmail(email);
  if (!user) {
    // Logic for forgot password
  }
};

export const resetPassword = async (req, res, next) => {
  // Logic for reset password
};

export const getMe = (req, res) => {
  if (req.user) {
    const { id, username, email } = req.user;
    res.status(200).json({ user: { id, username, email } });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};
