import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const menuConfig = [
  { key: 'student', title: 'Student Information', items: ['Student Details', 'Student Admission', 'Online Admission', 'Disabled Students', 'Multi Class Student', 'Bulk Delete', 'Student Categories', 'Student House', 'Disable Reason'] },
  { key: 'frontOffice', title: 'Front Office', items: ['Admission Enquiry', 'Visitor Book', 'Phone Call Log', 'Postal Dispatch', 'Postal Receive', 'Complain', 'Setup Front Office'] },
  { key: 'fees', title: 'Fees Collection', items: ['Collect Fees', 'Offline Bank Payments', 'Search Fees Payment', 'Search Due Fees', 'Fees Master', 'Quick Fees', 'Fees Group', 'Fees Type', 'Fees Discount', 'Fees Carry Forward', 'Fees Reminder'] },
  { key: 'academics', title: 'Academics', items: ['Class Timetable', 'Teachers Timetable', 'Assign Class Teacher', 'Promote Students', 'Subject Group', 'Subjects', 'Class', 'Sections'] },
  { key: 'attendance', title: 'Attendance', items: ['Student Attendance', 'Approve Leave', 'Attendance By Date', 'QR Code Attendance'] },
  { key: 'exams', title: 'Examinations', items: ['Exam Group', 'Exam Schedule', 'Exam Result', 'Design Admit Card', 'Print Admit Card', 'Design Marksheet', 'Print Marksheet', 'Marks Grade', 'Marks Division', 'Online Examinations'] },
  { key: 'hr', title: 'Human Resource', items: ['Staff Directory', 'Staff Attendance', 'Payroll', 'Approve Leave Request', 'Apply Leave', 'Leave Type', 'Teachers Rating', 'Department', 'Designation', 'Disabled Staff'] },
  { key: 'finance', title: 'Income & Expenses', items: ['Add Income', 'Search Income', 'Income Head', 'Add Expense', 'Search Expense', 'Expense Head'] },
  { key: 'online', title: 'Live Classes & Courses', items: ['Online Course', 'Gmeet Live Classes', 'Zoom Live Classes', 'Question Bank'] },
  { key: 'facilities', title: 'Campus Facilities', items: ['Library', 'Inventory', 'Transport', 'Hostel'] },
  { key: 'settings', title: 'System Settings', items: ['General Setting', 'Session Setting', 'Notification Setting', 'Whatsapp Messaging', 'SMS Setting', 'Email Setting', 'Payment Methods', 'Backup Restore', 'Users', 'Modules'] }
];

const availableRoles = [
  { key: 'admin', label: 'Admin' },
  { key: 'accountant', label: 'Accountant' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'student', label: 'Student' }
];

export default function SystemSettings() {
  const [selectedRole, setSelectedRole] = useState('accountant');
  const [rolePermissions, setRolePermissions] = useState({});
  const [expandedModule, setExpandedModule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const schoolId = localStorage.getItem('schoolId') || 'SCH-1310';

  useEffect(() => {
    const fetchRoleModules = async () => {
      try {
        const res = await axiosInstance.get(`/system/modules/${schoolId}`);
        if (res.data && res.data.rolePermissions) {
          setRolePermissions(res.data.rolePermissions);
        }
      } catch (err) {
        console.error("Error fetching role-wise modules:", err);
      }
    };
    fetchRoleModules();
  }, [schoolId]);

  const currentRoleModules = rolePermissions[selectedRole] || {};

  const handleMainToggle = (moduleKey) => {
    setRolePermissions(prev => {
      const roleData = prev[selectedRole] || {};
      const moduleData = roleData[moduleKey] || { main: true, subItems: {} };
      
      return {
        ...prev,
        [selectedRole]: {
          ...roleData,
          [moduleKey]: {
            ...moduleData,
            main: !(moduleData.main ?? true)
          }
        }
      };
    });
  };

  const handleSubToggle = (moduleKey, subItem) => {
    setRolePermissions(prev => {
      const roleData = prev[selectedRole] || {};
      const moduleData = roleData[moduleKey] || { main: true, subItems: {} };
      const subItemsData = moduleData.subItems || {};

      return {
        ...prev,
        [selectedRole]: {
          ...roleData,
          [moduleKey]: {
            ...moduleData,
            subItems: {
              ...subItemsData,
              [subItem]: !(subItemsData[subItem] ?? true)
            }
          }
        }
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axiosInstance.put(`/system/modules/${schoolId}`, { rolePermissions });
      setMessage(res.data.message || `Permissions updated successfully for ${selectedRole.toUpperCase()}`);
    } catch (err) {
      console.error("Error updating role permissions:", err);
      setMessage(err.response?.data?.message || 'Failed to update configurations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 shadow-xl text-slate-100 max-h-[85vh] overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Role-Based Granular Feature Flag Matrix</h3>
          <p className="text-xs text-slate-400">Configure separate module access and sub-features per user role.</p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#090d16] p-1 rounded-xl border border-slate-800">
          {availableRoles.map(role => (
            <button
              key={role.key}
              type="button"
              onClick={() => setSelectedRole(role.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${selectedRole === role.key ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className={`p-3 mb-4 rounded-xl text-xs font-semibold ${message.includes(' successfully') ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-red-950/60 text-red-400 border border-red-800/40'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-3">
          {menuConfig.map((menu) => {
            const modData = currentRoleModules[menu.key] || { main: true, subItems: {} };
            const isMainActive = modData.main ?? true;
            const isExpanded = expandedModule === menu.key;

            return (
              <div key={menu.key} className="bg-[#090d16] border border-slate-800/80 rounded-xl p-4 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      type="button" 
                      onClick={() => setExpandedModule(isExpanded ? null : menu.key)}
                      className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>{isExpanded ? '▼' : '▶'}</span> Manage Sub-Features ({menu.items.length})
                    </button>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {menu.title}
                    </span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isMainActive} 
                      onChange={() => handleMainToggle(menu.key)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {menu.items.map((subItem) => {
                      const isSubActive = modData.subItems?.[subItem] ?? true;
                      return (
                        <div key={subItem} className="flex items-center justify-between p-2.5 bg-[#0d1322] border border-slate-800/80 rounded-lg">
                          <span className="text-[11px] text-slate-300 font-medium">{subItem}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={isSubActive} 
                              onChange={() => handleSubToggle(menu.key, subItem)}
                              className="sr-only peer"
                            />
                            <div className="w-7 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex justify-between items-center sticky bottom-0 bg-[#0d1322] py-3 border-t border-slate-800">
          <p className="text-[11px] text-slate-400">
            Editing permissions for role: <span className="text-indigo-400 font-bold uppercase">{selectedRole}</span>
          </p>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? 'Saving Matrix...' : `Save ${selectedRole.toUpperCase()} Permissions`}
          </button>
        </div>
      </form>
    </div>
  );
}