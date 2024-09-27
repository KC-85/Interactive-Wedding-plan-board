// Import mongoose library
const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,   // Ensure that usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true,   // Ensure that emails are unique
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Password length validation
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model based on the schema
module.exports = mongoose.model('User', UserSchema);
