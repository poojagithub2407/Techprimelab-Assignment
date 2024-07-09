import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectList from './pages/ProjectList';
import CreateProject from './components/CreateProject';
import Login from './components/Login';
import Navbar from './layout/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (token) => {
    // Store token in localStorage
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* Project List */}
        <Route
          path="/project-list"
          element={isAuthenticated ? <ProjectList /> : <Navigate to="/login" replace />}
        />

        {/* Create Project */}
        <Route
          path="/create-project"
          element={isAuthenticated ? <CreateProject /> : <Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />}
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
