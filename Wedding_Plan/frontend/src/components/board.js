// src/components/Board.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';  // Import Socket.IO client
import axios from 'axios';  // Import Axios for API calls
import { sanitizeHTML } from '../utils/sanitize';  // Import sanitizer

// Set the API URL (change this if deploying or using environment variables)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Board = () => {
  const [content, setContent] = useState('<b>Loading...</b>');  // Board content state
  const [socket, setSocket] = useState(null);  // Socket.IO instance state

  // Step 1: Initial data fetching using Axios
  const fetchInitialData = async () => {
    try {
      const response = await axios.get(`${API_URL}/boards/latest`);  // Fetch initial board content
      setContent(response.data.content);  // Set the initial board content
    } catch (error) {
      console.error('Error fetching initial board data:', error);
    }
  };

  // Step 2: Set up WebSocket connection and event listeners
  useEffect(() => {
    fetchInitialData();  // Load initial data on component mount

    const newSocket = io('http://localhost:5000');  // Connect to WebSocket server (adjust URL for production)
    setSocket(newSocket);

    // Listen for board updates from the server
    newSocket.on('boardUpdated', (data) => {
      setContent(data.newContent);  // Update the board content in real-time
    });

    // Clean up socket connection on component unmount
    return () => newSocket.close();
  }, []);

  // Step 3: Emit event to update the board through WebSocket
  const updateBoardContent = (newContent) => {
    setContent(newContent);  // Update local state

    // Emit event to the server for real-time synchronization
    if (socket) {
      socket.emit('updateBoard', { newContent, room: 'wedding-board-1' });  // Broadcast the change
    }
  };

  // Step 4: Handle manual updates (e.g., button clicks)
  const handleContentChange = () => {
    const updatedContent = '<b>Updated Planning Content</b>';
    updateBoardContent(updatedContent);  // Emit WebSocket event and update state

    // Optional: Make an Axios call to update the server for persistent storage
    axios.put(`${API_URL}/boards/update`, { content: updatedContent })
      .then(response => console.log('Board updated successfully via Axios'))
      .catch(error => console.error('Error updating board via Axios:', error));
  };

  // Sanitize the content before rendering to prevent XSS attacks
  const safeContent = sanitizeHTML(content);

  return (
    <div>
      <h2>Wedding Planning Board</h2>
      <div dangerouslySetInnerHTML={{ __html: safeContent }} />  {/* Render sanitized content */}
      {/* Trigger updates manually */}
      <button onClick={handleContentChange}>Update Board</button>
    </div>
  );
};

export default Board;
