// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');  // Use native HTTP module
const { Server } = require('socket.io');  // Import Socket.IO
const connectDB = require('./config/db');  // MongoDB connection

// Load environment variables
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration based on environment
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(process.env.NODE_ENV === 'production' ? corsOptions : {}));  // Apply only in production

// Sample data to represent a board state (in place of DB for now)
let boardContent = '<b>Initial Planning Content</b>';

// Route to fetch the latest board content
app.get('/api/boards/latest', (req, res) => {
  res.json({ content: boardContent });
});

// Route to update board content
app.put('/api/boards/update', (req, res) => {
  const { content } = req.body;
  if (!content || content.trim() === '') {
    return res.status(400).json({ message: 'Invalid content data' });
  }
  boardContent = content;
  res.json({ message: 'Board content updated successfully!' });
});

// Catch 404 for unhandled routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: process.env.NODE_ENV === 'development' ? err.message : 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
});

// Create a new HTTP server instance from the Express app
const server = http.createServer(app);

// Initialize `socket.io` on the server instance
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,  // Use allowed origins for CORS configuration
  },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log(`⚡️ [Socket] New client connected: ${socket.id}`);

  // Event when a user joins a specific wedding plan board room
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  // Handle board update events
  socket.on('updateBoard', (data) => {
    if (!data.newContent || data.newContent.trim() === '') {
      return socket.emit('errorMessage', 'Content cannot be empty');  // Emit error to the socket client
    }
    boardContent = data.newContent;
    console.log(`⚡️ [Socket] Board updated: ${data.newContent}`);
    io.to(data.room).emit('boardUpdated', { newContent: data.newContent });
  });

  // Event when client disconnects
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Use the `server` instance to listen instead of `app`
server.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));
