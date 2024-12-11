require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testUser = {
  username: 'testuser' + Math.floor(Math.random() * 10000),
  email: `test${Math.floor(Math.random() * 10000)}@example.com`,
  password: 'test123'
};

async function testAuth() {
  try {
    console.log('Using test credentials:', {
      username: testUser.username,
      email: testUser.email,
      password: testUser.password
    });

    // Test registration
    console.log('\n1. Testing registration...');
    const registerRes = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✓ Registration successful:', registerRes.data);

    // Test login
    console.log('\n2. Testing login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✓ Login successful:', loginRes.data);

    // Test invalid login
    console.log('\n3. Testing invalid password...');
    try {
      await axios.post(`${API_URL}/auth/login`, {
        email: testUser.email,
        password: 'wrongpassword'
      });
    } catch (error) {
      console.log('✓ Invalid password correctly rejected:', error.response.data);
    }

  } catch (error) {
    console.error('✗ Test failed:', error.response?.data || error.message);
  }
}

testAuth();