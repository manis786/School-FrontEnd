import React from 'react';

export default function StudentInformation({ tab, setActiveTab }) {
  const subModules = [
    { id: 'student-details', label: 'Student Details' },
    { id: 'student-admission', label: 'Student Admission' },
    // { id: 'online-admission', label: 'Online Admission' },
    { id: 'disabled-students', label: 'Disabled Students' },
    // { id: 'multi-class-student', label: 'Multi Class Student' },
    { id: 'bulk-delete', label: 'Bulk Delete' },
    { id: 'student-categories', label: 'Student Categories' },
    // { id: 'student-house', label: 'Student House' },
    // { id: 'disable-reason', label: 'Disable Reason' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 flex flex-wrap gap-3 items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white capitalize">🎓 Student Information Module</h3>
          <p className="text-xs text-slate-400">Manage all student records, admissions, and categorical filters.</p>
        </div>
        {/* <div className="flex flex-wrap gap-2">
          {subModules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${tab === m.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            >
              {m.label}
            </button>
          ))}
        </div> */}
      </div>

      <div className="bg-[#0d1322] p-8 rounded-3xl border border-slate-800/80 min-h-[400px] flex flex-col items-center justify-center text-center">
        <span className="text-4xl mb-3">🎓</span>
        <h4 className="text-lg font-bold text-white capitalize">{tab.replace(/-/g, ' ')} Active View</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-md">
          Connected to secure database collection for student lifecycle tracking.
        </p>
      </div>
    </div>
  );
}