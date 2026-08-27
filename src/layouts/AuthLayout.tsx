import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from '../components/common/ToastContainer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <Outlet />
      <ToastContainer />
    </div>
  );
};
