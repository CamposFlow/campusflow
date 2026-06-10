import bcrypt from 'bcrypt';
import User from '../config/userModel.js'; // Path updated to match src/config location
import passport from 'passport';

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
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
    const newUser = await User.create(username.toLowerCase(), email.toLowerCase(), passwordHash);

    // Log in the user after successful registration
    req.logIn(newUser, (err) => {
      if (err) {
        console.error('Login after register error:', err);
        return next(err);
      }
      res.status(201).json({ message: 'User registered and logged in successfully', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    });
  } catch (err) {
    console.error('Register error:', err);
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
      return res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, username: user.username, email: user.email } });
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
      res.clearCookie('connect.sid'); // Clear session cookie
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
};


// getMe endpoint to return current authenticated user's info
export const getMe = (req, res) => {
  // req.user is populated by Passport's deserializeUser after successful session check
  if (req.isAuthenticated()) {
    // Return sanitized user data
    const { id, username, email } = req.user;
    res.status(200).json({ user: { id, username, email } });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};