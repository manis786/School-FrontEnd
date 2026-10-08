import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // 1. Agar token nahi hai toh seedha login page par bhejo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Agar role match nahi karta, toh user ko uske apne role ke mutabiq dashboard par redirect karo
  if (allowedRole && userRole !== allowedRole) {
    if (userRole === 'Admin') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'Teacher') return <Navigate to="/teacher/dashboard" replace />;
    if (userRole === 'Accountant') return <Navigate to="/accountant/dashboard" replace />;
    if (userRole === 'Student') return <Navigate to="/student/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  // 3. Agar sab theek hai toh page render hone do
  return <Outlet />;
}