import React from 'react';
import { Outlet } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { DoctorNavbar } from '../components/layout/DoctorNavbar';
import { DoctorSidebar } from '../components/layout/DoctorSidebar';
import { DoctorMobileNav } from '../components/layout/DoctorMobileNav';
import { ToastContainer } from '../components/common/ToastContainer';
import { useDoctorStore } from '../store/useDoctorStore';

export const DoctorLayout: React.FC = () => {
  const { scheduleConfig, setEmergencyOff } = useDoctorStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans pb-16 lg:pb-0">
      {/* Emergency Mode Alert Banner */}
      {scheduleConfig.isEmergencyOff && (
        <div className="bg-rose-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
              <span>
                Emergency Out-of-Office Mode is ACTIVE. All new patient appointments are temporarily paused.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEmergencyOff(false)}
              className="px-2.5 py-1 bg-white text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-50 transition-colors"
            >
              Resume Clinic
            </button>
          </div>
        </div>
      )}

      <DoctorNavbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <DoctorSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>

      <DoctorMobileNav />
      <ToastContainer />
    </div>
  );
};
