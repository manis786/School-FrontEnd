import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolEmail: '',
    phone: '',
    address: '',
    currency: '',
    academicYear: '',
    adminName: '',
    adminEmail: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.schoolName || !formData.schoolEmail || !formData.phone || !formData.address || !formData.currency || !formData.academicYear) {
        setError('Please fill in all school profile, currency, and academic session fields.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.adminName || !formData.adminEmail || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all administrator credentials.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match. Please verify.');
        return;
      }
    }
    setError('');
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/system/setup', formData);
      const { token, role, schoolId } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('schoolId', schoolId);

      // Page reload ke sath dashboard par bhejo taake fresh state fetch ho aur loop na bane
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete system setup.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 py-12 px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        
        {/* Header & Stepper Bar */}
        <div className="bg-slate-900 px-8 py-6 text-white border-b border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800/50">
              System Installation Wizard
            </span>
            <span className="text-xs text-slate-400 font-semibold">Step {currentStep} of 3</span>
          </div>
          <h2 className="text-xl font-black">
            {currentStep === 1 && 'School Profile & Academic Setup'}
            {currentStep === 2 && 'Master Administrator Account'}
            {currentStep === 3 && 'Review & Final Launch'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {currentStep === 1 && 'Configure institutional details, currency, and academic session.'}
            {currentStep === 2 && 'Configure supreme administrative credentials with verification.'}
            {currentStep === 3 && 'Verify your tenant setup configuration before system initialization.'}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-5 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleFinalSubmit} className="space-y-5">
            {/* STEP 1: School Information & Academic Session */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">School Name</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                    placeholder="e.g. Al-Madina Public School"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Official Email</label>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={formData.schoolEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                    placeholder="info@school.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                      placeholder="0300-1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Address Location</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                      placeholder="City, Area"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Base Currency</label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                    >
                      <option value="">Select Currency</option>
                      <option value="PKR">PKR (Rs)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Academic Session</label>
                    <input
                      type="text"
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                      placeholder="e.g. 2026-2027"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Admin Account Setup with Password Confirmation */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Administrator Full Name</label>
                  <input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                    placeholder="Muhammad Anis"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Admin Login Email</label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                    placeholder="admin@school.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Secure Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm outline-none transition"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Summary */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">School Name:</span>
                    <span className="font-bold text-slate-800">{formData.schoolName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Official Email:</span>
                    <span className="font-semibold text-slate-800">{formData.schoolEmail}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Contact & Address:</span>
                    <span className="font-semibold text-slate-800">{formData.phone}, {formData.address}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Currency & Session:</span>
                    <span className="font-bold text-indigo-600">{formData.currency} | {formData.academicYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Master Admin:</span>
                    <span className="font-bold text-slate-800">{formData.adminEmail}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  By clicking launch, your tenant database will be initialized with a unique School ID and master privileges.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition"
                >
                  {loading ? 'Initializing...' : 'Launch System 🚀'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}