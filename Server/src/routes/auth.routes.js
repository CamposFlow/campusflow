import express from 'express';
import { register, login, logout, forgotPassword, resetPassword, getMe } from '../controllers/auth.controllers.js';

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
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/logout', logout);
router.get('/me', ensureAuthenticated, getMe);
router.get('/', getMe);

export default router;