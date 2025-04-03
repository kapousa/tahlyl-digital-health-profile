import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ReportList from './components/ReportList';
import HealthChart from './components/HealthChart';
import ApiServices from './components/ApiServices';
import Profile from './components/Profile'; // Import the profile component

function App() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = (username) => {
    setUser(username);
    setIsMenuOpen(true); // Open the menu after login
  };

  const handleLogout = () => {
    setUser(null);
    setIsMenuOpen(false); // close the menu after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={user ? <Dashboard isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} onLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route index element={<HealthChart />} />
          <Route path="services" element={<ApiServices />} />
          <Route path="reports" element={<ReportList />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;