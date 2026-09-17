import React from 'react';
import { Outlet } from 'react-router-dom';
import { AlertTriangle, Megaphone } from 'lucide-react';
import { AdminNavbar } from '../components/layout/AdminNavbar';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { AdminMobileNav } from '../components/layout/AdminMobileNav';
import { ToastContainer } from '../components/common/ToastContainer';
import { useAdminStore } from '../store/useAdminStore';

export const AdminLayout: React.FC = () => {
  const { settings, toggleMaintenance } = useAdminStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans pb-16 lg:pb-0">
      {/* Platform Maintenance Banner */}
      {settings.maintenanceMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                SYSTEM NOTICE: Platform maintenance mode is active. Public appointment creation is suspended.
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleMaintenance(false)}
              className="px-2.5 py-1 bg-slate-950 text-amber-400 text-xs font-bold rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Turn Off
            </button>
          </div>
        </div>
      )}

      {/* Broadcast Announcement Banner */}
      {settings.broadcastAnnouncement.enabled && (
        <div className="bg-blue-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            <Megaphone className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{settings.broadcastAnnouncement.message}</span>
          </div>
        </div>
      )}

      <AdminNavbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 bg-slate-950 text-slate-100">
          <Outlet />
        </main>
      </div>

      <AdminMobileNav />
      <ToastContainer />
    </div>
  );
};
