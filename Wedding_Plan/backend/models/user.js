// Import mongoose library and bcrypt for hashing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure that usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure that emails are unique
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

// Pre-save hook to hash the password before saving to the database
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();  // Call the next middleware
  } catch (error) {
    return next(error);  // Pass error to the next middleware
  }
});

// Add a method to compare entered password with hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model based on the schema
module.exports = mongoose.model('User', UserSchema);
