import React from 'react';

export default function OverviewContent({ stats, currency, setActiveTab }) {
  return (
    <div className="space-y-8">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Enrolled Students</p>
          <h3 className="text-3xl font-black mt-2 text-white font-mono">{stats.totalStudents}</h3>
          <span className="text-xs text-indigo-400 mt-2 inline-block font-medium">Real-time Database Active</span>
        </div>
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Staff & Teachers</p>
          <h3 className="text-3xl font-black mt-2 text-white font-mono">{stats.totalTeachers}</h3>
          <span className="text-xs text-emerald-400 mt-2 inline-block font-medium">Master Admin Online</span>
        </div>
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Fee Collection (MTD)</p>
          <h3 className="text-3xl font-black mt-2 text-white font-mono">{currency} {stats.feeCollected}</h3>
          <span className="text-xs text-emerald-400 mt-2 inline-block font-medium">Ledger Synchronized</span>
        </div>
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Today's Attendance</p>
          <h3 className="text-3xl font-black mt-2 text-white font-mono">{stats.attendanceRate}%</h3>
          <span className="text-xs text-amber-400 mt-2 inline-block font-medium">Pending logs</span>
        </div>
      </div>

      {/* Dynamic Analytics Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Collection Chart Widget */}
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-base text-white">Fee Collection & Revenue Trend</h4>
              <p className="text-xs text-slate-400">Monthly financial influx for current session</p>
            </div>
            <span className="text-xs bg-indigo-950 text-indigo-400 px-3 py-1 rounded-full border border-indigo-800/50 font-semibold">Live Analytics</span>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((mon) => (
              <div key={mon} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full bg-indigo-600/80 group-hover:bg-indigo-500 rounded-t-lg transition-all duration-300" style={{ height: '10%' }}></div>
                <span className="text-[10px] text-slate-400 font-mono">{mon}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 text-xs text-slate-400">
            <span>Target: {currency} 5.0M</span>
            <span className="text-emerald-400 font-semibold">Synchronized with Ledger</span>
          </div>
        </div>

        {/* Student Attendance Analytics Widget */}
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-base text-white">Attendance Analytics</h4>
            <p className="text-xs text-slate-400">Overall institutional presence ratio</p>
          </div>
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="w-36 h-36 rounded-full border-8 border-indigo-600/30 border-t-indigo-500 border-r-emerald-500 flex items-center justify-center shadow-xl">
              <div className="text-center">
                <span className="text-2xl font-black text-white font-mono">{stats.attendanceRate}%</span>
                <span className="block text-[10px] text-slate-400">Present Rate</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-900/60 px-3 py-2 rounded-xl">
              <span className="text-slate-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Present Students</span>
              <span className="font-bold text-white font-mono">{stats.totalStudents}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900/60 px-3 py-2 rounded-xl">
              <span className="text-slate-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Absent / Leave</span>
              <span className="font-bold text-white font-mono">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 space-y-4">
          <h4 className="font-bold text-base text-white">🎓 Student Information</h4>
          <p className="text-xs text-slate-400">Manage student admissions, profiles, and directory records directly from database.</p>
          <button onClick={() => setActiveTab('student-admission')} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/30">
            Open Student Admission →
          </button>
        </div>
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 space-y-4">
          <h4 className="font-bold text-base text-white">💳 Fees Collection</h4>
          <p className="text-xs text-slate-400">Generate fee vouchers, track outstanding dues, and record financial transactions.</p>
          <button onClick={() => setActiveTab('collect-fees')} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/30">
            Manage Fees →
          </button>
        </div>
        <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 space-y-4">
          <h4 className="font-bold text-base text-white">📅 Daily Attendance</h4>
          <p className="text-xs text-slate-400">Record attendance registers and trigger automated SMS or WhatsApp notifications.</p>
          <button onClick={() => setActiveTab('student-attendance')} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/30">
            View Attendance →
          </button>
        </div>
      </div>
    </div>
  );
}