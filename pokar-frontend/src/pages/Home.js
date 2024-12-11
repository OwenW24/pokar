// Import React and routing components
import React from 'react';
import { Link } from 'react-router-dom';

// Home component - landing page
function Home() {
  return (
    <div>
      <h1>welcome</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
