import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './components/Login';
import AdminLogin from './components/AdminLogin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ClaimSubmission from './components/ClaimSubmission';
import PolicyPurchase from './components/PolicyPurchase';
import Home from './components/Home';
import useAuthStore from './store/useAuthStore';
import Navbar from './components/Navbar';
import ErrorBoundary from './ErrorBoundary';

function App() {

  const { user, isLoggedIn, company, isCompanyLoggedIn } = useAuthStore();
  useEffect(() => {
    if (isLoggedIn) {
      console.log('User is logged in:', user);
    }
    if (isCompanyLoggedIn) {
      console.log('Company is logged in:', company);
    }
  }, [isLoggedIn, user, company, isCompanyLoggedIn]);
  return (

    <Router>
      <ErrorBoundary>
        <div className="App" style={{
          width: '100vw',
        }} >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/submit-claim" element={<ClaimSubmission />} />
            <Route path="/purchase-policy" element={<PolicyPurchase />} />
          </Routes>
        </div>
      </ErrorBoundary>

    </Router>

  );
}

export default App;
