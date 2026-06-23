import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../configs/userModel.js';
import { transporter } from '../configs/mailer.js';

export const register = async (req, res, next) => {
  const { username, email, role, passworde } = req.body;

  // Basic validation
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Fields not completely filled.' });
  }

  try {
    // Check if user already exists
    let user = await User.findByUsername(username);
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create(username.toLowerCase(), email.toLowerCase(), role, passwordHash);

    // Log in the user after successful registration
    req.logIn(newUser, (err) => {
      if (err) {
        console.error('Login after register error:', err);
        return next(err);
      }
      res.status(201).json({ message: 'User registered and logged in successfully', user: { id: newUser.id, username: newUser.username, role: newUser.role } });
    });
  } catch (err) {
    console.error('Registration error:', err);
    next(err);
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, username: user.username, role: user.role } });
    });
  })(req, res, next);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
};

export const forgotPassword = async (req, res, next) => {
  const {email} = req.body;

  const user = await User.findByEmail(email);
  
  if(!user) {

  }
}

export const resetPassword = async (req, res, next) => {
  
}

// getMe endpoint to return current authenticated user's info
export const getMe = (req, res) => {
  if (req.isAuthenticated()) {
    const { id, username, email } = req.user;
    res.status(200).json({ user: { id, username, email } });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};