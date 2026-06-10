const connectDB = async () => {
  try {
    // Placeholder for database connection logic (e.g., MongoDB/Mongoose)
    console.log("-----------------------------------------");
    console.log("Database connection established.");
    console.log("-----------------------------------------");
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;