import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Routes
app.use('/', apiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handling middleware
// IMPORTANT: This middleware must be defined last, after all other app.use() and route calls.
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    // Optionally include stack in dev for debugging
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;