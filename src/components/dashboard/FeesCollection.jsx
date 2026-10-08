import React from 'react';

export default function FeesCollection({ tab, setActiveTab }) {
  const subModules = [
    { id: 'collect-fees', label: 'Collect Fees' },
    { id: 'offline-bank-payments', label: 'Offline Bank Payments' },
    { id: 'search-fees-payment', label: 'Search Fees Payment' },
    { id: 'search-due-fees', label: 'Search Due Fees' },
    { id: 'fees-master', label: 'Fees Master' },
    { id: 'quick-fees', label: 'Quick Fees' },
    { id: 'fees-group', label: 'Fees Group' },
    { id: 'fees-type', label: 'Fees Type' },
    { id: 'fees-discount', label: 'Fees Discount' },
    { id: 'fees-carry-forward', label: 'Fees Carry Forward' },
    { id: 'fees-reminder', label: 'Fees Reminder' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0d1322] p-6 rounded-3xl border border-slate-800/80 flex flex-wrap gap-3 items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white capitalize">💳 Fees Collection & Finance</h3>
          <p className="text-xs text-slate-400">Manage vouchers, challans, dues, and payment records.</p>
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
        <span className="text-4xl mb-3">💳</span>
        <h4 className="text-lg font-bold text-white capitalize">{tab.replace(/-/g, ' ')} Active View</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-md">Secure ledger and voucher generation system.</p>
      </div>
    </div>
  );
}