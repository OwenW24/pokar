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

// Enhanced CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Debug environment variables
console.log('MONGO_URI:', process.env.MONGO_URI);

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}

// Enhanced MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: false,
  retryWrites: true,
};

// Connect to MongoDB with enhanced error handling
mongoose.connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    if (err.message.includes('ECONNREFUSED')) {
      console.error('Error: Unable to connect to MongoDB. Please check if:\n' +
        '1. Your IP address is whitelisted in MongoDB Atlas\n' +
        '2. Your username and password are correct\n' +
        '3. Your network allows outbound connections to MongoDB Atlas');
    } else if (err.message.includes('SSL')) {
      console.error('SSL Connection Error. Please check:\n' +
        '1. Your MongoDB connection string includes ssl=true\n' +
        '2. Your system has valid SSL certificates\n' +
        '3. Network security settings are not blocking SSL connections');
    }
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Health check endpoints
app.get('/api/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    res.json({
      status: 'ok',
      mongodb: states[dbState],
      timestamp: new Date(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test database query endpoint
app.get('/api/health/db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'ok', message: 'Database responding' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));