import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

// Import Modular Components
import Overview from './dashboard/Overview';
import StudentInformation from './dashboard/StudentInformation';
import FrontOffice from './dashboard/FrontOffice';
import FeesCollection from './dashboard/FeesCollection';
import Academics from './dashboard/Academics';
import AttendanceModule from './dashboard/AttendanceModule';
import Examinations from './dashboard/Examinations';
import HumanResource from './dashboard/HumanResource';
import IncomeExpenses from './dashboard/IncomeExpenses';
import LiveClassesCourses from './dashboard/LiveClassesCourses';
import CampusFacilities from './dashboard/CampusFacilities';
import SystemSettings from './dashboard/SystemSettings';

// Sidebar Menu Configuration Mapping to Sub-components & Granular Sub-items
const menuConfig = [
  {
    key: 'student',
    title: 'Student Information',
    icon: '🎓',
    items: ['Student Details', 'Student Admission', 'Online Admission', 'Disabled Students', 'Multi Class Student', 'Bulk Delete', 'Student Categories', 'Student House', 'Disable Reason']
  },
  {
    key: 'frontOffice',
    title: 'Front Office',
    icon: '🌐',
    items: ['Admission Enquiry', 'Visitor Book', 'Phone Call Log', 'Postal Dispatch', 'Postal Receive', 'Complain', 'Setup Front Office']
  },
  {
    key: 'fees',
    title: 'Fees Collection',
    icon: '💳',
    items: ['Collect Fees', 'Offline Bank Payments', 'Search Fees Payment', 'Search Due Fees', 'Fees Master', 'Quick Fees', 'Fees Group', 'Fees Type', 'Fees Discount', 'Fees Carry Forward', 'Fees Reminder']
  },
  {
    key: 'academics',
    title: 'Academics',
    icon: '📚',
    items: ['Class Timetable', 'Teachers Timetable', 'Assign Class Teacher', 'Promote Students', 'Subject Group', 'Subjects', 'Class', 'Sections']
  },
  {
    key: 'attendance',
    title: 'Attendance',
    icon: '📅',
    items: ['Student Attendance', 'Approve Leave', 'Attendance By Date', 'QR Code Attendance']
  },
  {
    key: 'exams',
    title: 'Examinations',
    icon: '📝',
    items: ['Exam Group', 'Exam Schedule', 'Exam Result', 'Design Admit Card', 'Print Admit Card', 'Design Marksheet', 'Print Marksheet', 'Marks Grade', 'Marks Division', 'Online Examinations']
  },
  {
    key: 'hr',
    title: 'Human Resource',
    icon: '👥',
    items: ['Staff Directory', 'Staff Attendance', 'Payroll', 'Approve Leave Request', 'Apply Leave', 'Leave Type', 'Teachers Rating', 'Department', 'Designation', 'Disabled Staff']
  },
  {
    key: 'finance',
    title: 'Income & Expenses',
    icon: '💰',
    items: ['Add Income', 'Search Income', 'Income Head', 'Add Expense', 'Search Expense', 'Expense Head']
  },
  {
    key: 'online',
    title: 'Live Classes & Courses',
    icon: '🎥',
    items: ['Online Course', 'Gmeet Live Classes', 'Zoom Live Classes', 'Question Bank']
  },
  {
    key: 'facilities',
    title: 'Campus Facilities',
    icon: '🚌',
    items: ['Library', 'Inventory', 'Transport', 'Hostel']
  },
  {
    key: 'settings',
    title: 'System Settings',
    icon: '⚙️',
    items: ['General Setting', 'Session Setting', 'Notification Setting', 'Whatsapp Messaging', 'SMS Setting', 'Email Setting', 'Payment Methods', 'Backup Restore', 'Users', 'Modules']
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Real live stats state (Purani Logic)
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    feeCollected: 0,
    attendanceRate: 0
  });

  // Role-wise permissions state for granular feature flags
  const [rolePermissions, setRolePermissions] = useState({});
  
  // Dynamic admin and school details from localStorage
  const [adminData] = useState({
    schoolId: localStorage.getItem('schoolId') || 'SCH-1310',
    role: (localStorage.getItem('role') || 'admin').toLowerCase(),
    academicYear: localStorage.getItem('academicYear') || '2026-2027',
    currency: localStorage.getItem('currency') || 'PKR'
  });
  
  const navigate = useNavigate();

  // Fetch real-time dashboard stats and role-wise module permissions concurrently
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const schoolId = localStorage.getItem('schoolId') || 'SCH-1310';

        const [statsRes, modulesRes] = await Promise.all([
          axiosInstance.get('/system/stats').catch(() => ({ data: {} })),
          axiosInstance.get(`/system/modules/${schoolId}`).catch(() => ({ data: { rolePermissions: {} } }))
        ]);

        if (statsRes.data) setStats(statsRes.data);
        if (modulesRes.data && modulesRes.data.rolePermissions) {
          setRolePermissions(modulesRes.data.rolePermissions);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Get current logged-in role's permissions matrix
  const currentRolePerms = rolePermissions[adminData.role] || {};

  // Filter main menu items dynamically based on role-wise granular feature flags
  const filteredMenuConfig = menuConfig.filter((menu) => {
    const modData = currentRolePerms[menu.key];
    if (modData && typeof modData === 'object' && 'main' in modData) {
      return modData.main !== false;
    }
    return true; // Default allow if not explicitly disabled
  });

  // Dynamic Module Mapping based on activeTab using exact sub-item transformations
  const renderActiveModule = () => {
    if (activeTab === 'overview') {
      return <Overview stats={stats} currency={adminData.currency} setActiveTab={setActiveTab} />;
    }
    
    const studentTabs = menuConfig.find(m => m.key === 'student').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (studentTabs.includes(activeTab)) return <StudentInformation tab={activeTab} setActiveTab={setActiveTab} />;

    const frontOfficeTabs = menuConfig.find(m => m.key === 'frontOffice').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (frontOfficeTabs.includes(activeTab)) return <FrontOffice tab={activeTab} setActiveTab={setActiveTab} />;

    const feesTabs = menuConfig.find(m => m.key === 'fees').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (feesTabs.includes(activeTab)) return <FeesCollection tab={activeTab} setActiveTab={setActiveTab} />;

    const academicsTabs = menuConfig.find(m => m.key === 'academics').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (academicsTabs.includes(activeTab)) return <Academics tab={activeTab} setActiveTab={setActiveTab} />;

    const attendanceTabs = menuConfig.find(m => m.key === 'attendance').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (attendanceTabs.includes(activeTab)) return <AttendanceModule tab={activeTab} setActiveTab={setActiveTab} />;

    const examTabs = menuConfig.find(m => m.key === 'exams').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (examTabs.includes(activeTab)) return <Examinations tab={activeTab} setActiveTab={setActiveTab} />;

    const hrTabs = menuConfig.find(m => m.key === 'hr').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (hrTabs.includes(activeTab)) return <HumanResource tab={activeTab} setActiveTab={setActiveTab} />;

    const financeTabs = menuConfig.find(m => m.key === 'finance').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (financeTabs.includes(activeTab)) return <IncomeExpenses tab={activeTab} setActiveTab={setActiveTab} />;

    const onlineTabs = menuConfig.find(m => m.key === 'online').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (onlineTabs.includes(activeTab)) return <LiveClassesCourses tab={activeTab} setActiveTab={setActiveTab} />;

    const facilityTabs = menuConfig.find(m => m.key === 'facilities').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (facilityTabs.includes(activeTab)) return <CampusFacilities tab={activeTab} setActiveTab={setActiveTab} />;

    const settingTabs = menuConfig.find(m => m.key === 'settings').items.map(s => s.toLowerCase().replace(/\s+/g, '-'));
    if (settingTabs.includes(activeTab)) return <SystemSettings tab={activeTab} setActiveTab={setActiveTab} />;

    return <Overview stats={stats} currency={adminData.currency} setActiveTab={setActiveTab} />;
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#0d1322] border-r border-slate-800/80 flex flex-col justify-between hidden md:flex select-none">
        <div>
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-700/40">
                Enterprise ERP
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Live DB
              </span>
            </div>
            <h1 className="text-base font-black text-white tracking-tight">School Command</h1>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">ID: {adminData.schoolId}</p>
          </div>

          <nav className="p-4 space-y-1.5 text-xs font-medium overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition font-semibold ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              <span>📊</span> Dashboard Overview
            </button>

            {/* Dynamically Filtered Sidebar Menu based on Role-Wise Granular Feature Flags */}
            {filteredMenuConfig.map((menu) => (
              <div key={menu.key}>
                <button 
                  onClick={() => toggleDropdown(menu.key)} 
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition"
                >
                  <span className="flex items-center gap-3">{menu.icon} {menu.title}</span>
                  <span className="text-[10px]">{openDropdown === menu.key ? '▼' : '▶'}</span>
                </button>
                {openDropdown === menu.key && (
                  <div className="pl-6 space-y-1 mt-1 border-l border-slate-800 ml-3">
                    {menu.items.filter((subItem) => {
                      const modData = currentRolePerms[menu.key];
                      if (modData && modData.subItems && typeof modData.subItems === 'object') {
                        return modData.subItems[subItem] !== false;
                      }
                      return true;
                    }).map((subItem) => {
                      const tabValue = subItem.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <button 
                          key={subItem} 
                          onClick={() => setActiveTab(tabValue)} 
                          className={`w-full text-left px-3 py-1.5 text-[11px] rounded-lg transition ${activeTab === tabValue ? 'text-indigo-400 font-bold bg-indigo-950/40' : 'text-slate-400 hover:text-white'}`}
                        >
                          • {subItem}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

          </nav>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-800/80 bg-[#090d16]">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-xs font-bold text-red-400 bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 rounded-xl transition text-center shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen bg-[#070a12]">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-[#0d1322]/80 backdrop-blur border-b border-slate-800/80 px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white capitalize">{activeTab.replace(/-/g, ' ')}</h2>
            <p className="text-xs text-slate-400">Live multi-tenant enterprise institutional command center</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                Session: {adminData.academicYear} ({adminData.currency})
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md border border-indigo-400/30">
              {adminData.role.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic Body Area */}
        <div className="p-8 space-y-8 flex-1">
          {renderActiveModule()}
        </div>
      </main>

    </div>
  );
}