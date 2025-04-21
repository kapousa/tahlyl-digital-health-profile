import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ReportList from './components/ReportList';
import HealthChart from './components/HealthChart';
import ApiServices from './components/ApiServices';
import Profile from './components/Profile';
import BloodTestPage from './pages/BloodTestPage';
import CompareReportsPage from './pages/CompareReportsPage';
import ServiceFormPage from './pages/ServiceFormPage';
import Register from './components/Register';
import { UserContext, UserProvider } from './contexts/UserContext'; // Import UserContext and UserProvider

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
      return <div>Loading...</div>; // Or a loading spinner
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const AuthRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
      return <div>Loading...</div>; // Or a loading spinner
    }

    if (user) {
      return <Navigate to="/dashboard" />;
    }

    return children;
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} /></ProtectedRoute>}>
            <Route index element={<HealthChart />} />
            <Route path="services" element={<ApiServices />} />
            <Route path="reports" element={<ReportList />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/analysis" element={<ProtectedRoute><ServiceFormPage /></ProtectedRoute>} />
          <Route path="/bloodtest" element={<ProtectedRoute><BloodTestPage /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><CompareReportsPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;