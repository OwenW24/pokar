// Load environment variables first
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express application
const app = express();

// Set port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());    
app.use(cors());           

// Debug environment variables
console.log('MONGO_URI:', process.env.MONGO_URI);

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}

// Connect to MongoDB with error handling
mongoose.connect(encodeURI(process.env.MONGO_URI))
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));