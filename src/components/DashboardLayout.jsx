import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white w-64 space-y-6 py-6 px-4 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wider">SMS Portal</h2>
          <span className="text-xs bg-blue-600 px-2 py-1 rounded-full uppercase">{role}</span>
        </div>

        <nav className="space-y-2 mt-6">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 font-medium">Dashboard</a>
          
          {role === 'Admin' && (
            <>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Manage Users</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">School Settings</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">HR & Payroll</a>
            </>
          )}

          {role === 'Teacher' && (
            <>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">My Classes</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Attendance</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Gradebook</a>
            </>
          )}

          {role === 'Accountant' && (
            <>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Fee Vouchers</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Collections</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Expenses</a>
            </>
          )}

          {role === 'Student' && (
            <>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">My Attendance</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Exam Results</a>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 text-gray-300">Fee Status</a>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex justify-between items-center bg-white shadow-sm py-4 px-6 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none md:hidden">
            ☰
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Welcome to School Management System</h1>
          
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
          >
            Logout
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}