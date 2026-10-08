import React from 'react';

export default function LiveClassesCourses({ tab, setActiveTab }) {
  const subModules = [
    { id: 'online-course', label: 'Online Course' },
    { id: 'gmeet-live-classes', label: 'Gmeet Live Classes' },
    { id: 'zoom-live-classes', label: 'Zoom Live Classes' },
    { id: 'question-bank', label: 'Question Bank' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 flex flex-wrap gap-3 items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white capitalize">🎥 Live Classes & Courses</h3>
          <p className="text-xs text-slate-400">Manage virtual classrooms, courses, and question banks.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {subModules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${tab === m.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0d1322] p-8 rounded-3xl border border-slate-800/80 min-h-[400px] flex flex-col items-center justify-center text-center">
        <span className="text-4xl mb-3">🎥</span>
        <h4 className="text-lg font-bold text-white capitalize">{tab.replace(/-/g, ' ')} Active View</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-md">Virtual course integration and streaming dashboard.</p>
      </div>
    </div>
  );
}