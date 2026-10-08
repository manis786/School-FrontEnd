import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Make sure path theek ho

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Updated backend login API endpoint (/users/login)
      const response = await axiosInstance.post('/users/login', {
        email,
        password
      });

      console.log("Backend Response:", response.data);

      // Backend response se data extract karna (chahe root pe ho ya user object ke andar)
      const resData = response.data;
      const token = resData.token;
      
      // Role aur SchoolID ko safely nikalna (agar nested user object mein hon ya direct)
      const role = resData.role || resData.user?.role;
      const schoolId = resData.schoolId || resData.school_id || resData.user?.schoolId || resData.user?.school_id;

      if (!token) {
        throw new Error('Token موصول nahi hua!');
      }

      // LocalStorage mein data save karna
      localStorage.setItem('token', token);
      localStorage.setItem('role', role || 'Admin');
      localStorage.setItem('schoolId', schoolId || 'SCH001');

      // Role ke mutabiq automatic routing
      if (role === 'Teacher') {
        navigate('/teacher/dashboard');
      } else if (role === 'Accountant') {
        navigate('/accountant/dashboard');
      } else if (role === 'Student') {
        navigate('/student/dashboard');
      } else {
        navigate('/admin/dashboard');
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.error || err.message || 'Login fail ho gaya. Apne credentials check karein!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">School Management System</h2>
          <p className="text-sm text-gray-500 mt-1">Apne account mein login karein</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@school.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}