import { pool, connectDB } from '../config/db.js'
connectDB();
export const getHome = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the CampusFlow API",
    timestamp: new Date().toISOString()
  });
};