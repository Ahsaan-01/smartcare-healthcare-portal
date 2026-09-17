import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Bell,
  LogOut,
  ChevronDown,
  UserCheck,
  HeartPulse,
  Activity,
  AlertTriangle,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';

export const AdminNavbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { settings, auditLogs } = useAdminStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPortalSwitcherOpen, setIsPortalSwitcherOpen] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const handleLogout = () => {
    logout();
    addToast({ type: 'info', message: 'Signed out of Super Admin Portal.' });
    navigate('/login');
  };

  const recentLogs = auditLogs.slice(0, 4);

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900 border-b border-slate-800 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Super Admin
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Root Governance
              </span>
            </div>
          </div>

          {/* System Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            {settings.maintenanceMode ? (
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
                <span>Maintenance Mode Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Platform Services Operational</span>
              </div>
            )}
          </div>

          {/* Right Actions: Cross-Portal Switcher, Audit Feed, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Portal Switcher (For Evaluators & Admins) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsPortalSwitcherOpen(!isPortalSwitcherOpen);
                  setShowLogs(false);
                  setIsProfileOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Switch Portal</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isPortalSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Live Portal Environments
                  </div>
                  <Link
                    to="/patient/dashboard"
                    onClick={() => setIsPortalSwitcherOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <HeartPulse className="w-4 h-4 text-[#0D7A5F]" />
                    <div>
                      <span className="font-bold block">Patient Portal</span>
                      <span className="text-[10px] text-slate-400">Appointments & Discovery</span>
                    </div>
                  </Link>
                  <Link
                    to="/doctor/dashboard"
                    onClick={() => setIsPortalSwitcherOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold block">Doctor Portal</span>
                      <span className="text-[10px] text-slate-400">Queue & Clinical Prescriptions</span>
                    </div>
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <Link
                    to="/"
                    onClick={() => setIsPortalSwitcherOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-slate-50 rounded-xl transition-all text-slate-600"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Public Website Homepage</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Audit Logs Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLogs(!showLogs);
                  setIsPortalSwitcherOpen(false);
                  setIsProfileOpen(false);
                }}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors relative"
                aria-label="Platform Activity Logs"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
              </button>

              {showLogs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-xs text-slate-800">
                        Platform Security & Event Feed
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Real-Time</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {recentLogs.map((log) => (
                      <div key={log.id} className="p-3 hover:bg-slate-50/70 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{log.title}</span>
                          <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {log.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setShowLogs(false)}
                      className="text-xs font-bold text-[#0D7A5F] hover:underline"
                    >
                      View All Platform Logs &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsPortalSwitcherOpen(false);
                  setShowLogs(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <img
                  src={
                    user?.avatarUrl ||
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
                  }
                  alt={user?.name || 'System Admin'}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-400/40"
                />
                <span className="hidden md:inline text-xs font-bold text-slate-200">
                  {user?.name || 'System Admin'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">{user?.name || 'System Admin'}</p>
                    <p className="text-[11px] text-amber-600 font-semibold">Master Administrator</p>
                    <p className="text-[10px] text-slate-400">HQ Islamabad, Pakistan</p>
                  </div>

                  <Link
                    to="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-slate-50 rounded-xl transition-all text-slate-700"
                  >
                    <span>System Settings & Health</span>
                  </Link>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
