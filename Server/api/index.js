import dotenv from 'dotenv';
import connectDB from '../src/config/db.js';
import app from '../src/app.js';

dotenv.config();

const port = process.env.PORT || 5000;

// Start the server after DB initialization
const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
};

startServer();