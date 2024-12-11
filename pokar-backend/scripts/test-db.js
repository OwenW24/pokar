require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const testUsers = [
  {
    username: 'testuser1',
    email: 'test1@example.com',
    password: 'password123'
  },
  {
    username: 'testuser2',
    email: 'test2@example.com',
    password: 'password456'
  }
];

async function cleanDatabase() {
  try {
    await User.deleteMany({});
    console.log('Database cleaned');
  } catch (error) {
    console.error('Error cleaning database:', error);
  }
}

async function testUserOperations() {
  try {
    // Test user creation
    const user = await User.create(testUsers[0]);
    console.log('Test user created:', user.username);

    // Test user query
    const foundUser = await User.findOne({ email: testUsers[0].email });
    console.log('User found:', foundUser.username);

    // Test user update
    const updated = await User.findByIdAndUpdate(
      user._id,
      { username: 'updated_username' },
      { new: true }
    );
    console.log('User updated:', updated.username);

    // Test user deletion
    await User.findByIdAndDelete(user._id);
    console.log('User deleted successfully');

    return true;
  } catch (error) {
    console.error('Error in user operations:', error);
    return false;
  }
}

async function runTests() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected successfully');

    await cleanDatabase();
    const success = await testUserOperations();
    
    console.log('\nTest Summary:');
    console.log('Database connection: ✅');
    console.log(`User operations: ${success ? '✅' : '❌'}`);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

runTests();
