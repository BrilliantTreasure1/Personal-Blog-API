const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);

    process.exit(1);
  }
};

module.exports = connectDB;