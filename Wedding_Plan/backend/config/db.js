const mongoose = require('mongoose');

// Database connection function
const connectDB = async () => {
  try {
    // Define Mongoose options for a robust connection
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s by default
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, options);

    console.log(`💾 MongoDB connected: ${conn.connection.host}`.green.bold);

    // Event listeners for additional tracking and error handling
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB connection lost. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected successfully');
    });

  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);  // Exit process with failure
  }
};

// Graceful shutdown and cleanup on server termination
const handleShutdown = (signal) => {
  console.log(`Received ${signal}. Closing MongoDB connection...`.yellow);
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed gracefully.'.green);
    process.exit(0);
  });
};

// Attach graceful shutdown events for various termination signals
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

module.exports = connectDB;
