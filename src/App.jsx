import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SetupWizard from './components/SetupWizard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import axiosInstance from './utils/axiosInstance';

function App() {
  const [isSetupDone, setIsSetupDone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/system/status')
      .then((res) => {
        setIsSetupDone(res.data.isSetupDone);
        setLoading(false);
      })
      .catch((err) => {
        console.error('System status check error:', err);
        setIsSetupDone(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white font-medium">
        Loading system architecture...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {!isSetupDone ? (
          <>
            {/* Jab tak setup nahi hota, har route redirect ho kar /setup par jayega */}
            <Route path="/setup" element={<SetupWizard />} />
            <Route path="*" element={<Navigate to="/setup" replace />} />
          </>
        ) : (
          <>
            {/* Jab setup ho chuka ho, tab /setup block ho jayega aur login khulega */}
            <Route path="/login" element={<Login />} />
            <Route path="/setup" element={<Navigate to="/login" replace />} />
            
            {/* Protected Admin Route */}
            <Route element={<ProtectedRoute allowedRole="Admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;