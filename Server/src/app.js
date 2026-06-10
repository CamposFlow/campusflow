import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';

// Commented out authRoutes for now since we haven't implemented database and authentication yet.
// import authRoutes from './routes/authRoutes.js';

const app = express();

const isDev = process.env.NODE_ENV === 'development';
// Middleware
app.use(cors({
  origin: isDev ? '*' : 'https://camposflow.github.io/campusflow/', // Adjust origin for production and development.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests on the server side console
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
app.use((err, req, res, next) => {
  console.error(err?.stack || err);

  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === 'development'
      ? err.message || err
      : 'Internal Server Error';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack
    })
  });
});

export default app;