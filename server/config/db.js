const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!connStr) {
      console.error(
        "MongoDB Connection Error: Neither MONGO_URI nor MONGODB_URI is set in environment variables."
      );
      return;
    }
    const conn = await mongoose.connect(connStr);
    console.log(
      `MongoDB Connected successfully to host: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;