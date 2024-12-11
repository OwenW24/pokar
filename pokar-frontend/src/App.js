import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Update imports to match new file structure
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Update CSS import
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>pokar</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
