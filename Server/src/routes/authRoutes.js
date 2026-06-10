import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';

const router = express.Router();

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', ensureAuthenticated, getMe);

export default router;