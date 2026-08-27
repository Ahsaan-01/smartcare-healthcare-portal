import React from 'react';
import { Outlet } from 'react-router-dom';
import { PatientNavbar } from '../components/layout/PatientNavbar';
import { PatientSidebar } from '../components/layout/PatientSidebar';
import { MobileNav } from '../components/layout/MobileNav';
import { ToastContainer } from '../components/common/ToastContainer';

export const PatientLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans pb-16 lg:pb-0">
      <PatientNavbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <PatientSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <ToastContainer />
    </div>
  );
};
