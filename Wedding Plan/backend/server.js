// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');  // Use native HTTP module
const { Server } = require('socket.io');  // Import Socket.IO
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Set up basic testing route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sample data to represent a board state (in place of DB for now)
let boardContent = '<b>Initial Planning Content</b>';

// Route to fetch the latest board content using Axios
app.get('/api/boards/latest', (req, res) => {
  res.json({ content: boardContent });
});

// Route to update board content using Axios (PUT request)
app.put('/api/boards/update', (req, res) => {
  const { content } = req.body;
  boardContent = content;  // Update the server-side board content
  res.json({ message: 'Board content updated successfully!' });
});

// Create a new HTTP server instance from the Express app
const server = http.createServer(app);

// Initialize `socket.io` on the server instance
const io = new Server(server, {
  cors: {
    origin: "*",  // Allow CORS from any origin (adjust for production)
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
    boardContent = data.newContent;  // Update the server-side content
    console.log(`⚡️ [Socket] Board updated: ${data.newContent}`);
    // Broadcast the updated content to all clients in the same room
    io.to(data.room).emit('boardUpdated', { newContent: data.newContent });
  });

  // Event when client disconnects
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Use the `server` instance to listen instead of `app`
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
