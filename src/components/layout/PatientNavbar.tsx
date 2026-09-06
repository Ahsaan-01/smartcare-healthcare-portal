import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Heart,
  Calendar,
  LogOut,
  ChevronDown,
  User,
  CheckCheck,
  ArrowRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { useFavouritesStore } from '../../store/useFavouritesStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useToastStore } from '../../store/useToastStore';
import { NotificationItem } from '../appointment/NotificationItem';

export const PatientNavbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { favouriteDoctorIds } = useFavouritesStore();
  const { notifications, getUnreadCount, markAllNotificationsRead, markNotificationRead } = useAppointmentStore();
  const { addToast } = useToastStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadCount = getUnreadCount();
  const recentNotifications = notifications.slice(0, 3);

  const handleLogout = () => {
    logout();
    addToast({ type: 'info', message: 'You have been logged out successfully.' });
    navigate('/login');
  };

  const handleNotificationClick = (notifId: string, appointmentId?: string) => {
    markNotificationRead(notifId);
    setShowNotifications(false);
    if (appointmentId) {
      navigate('/patient/appointments');
    } else {
      navigate('/patient/notifications');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Tag */}
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E6F4F1] text-[#0D7A5F]">
              Patient Portal
            </span>
          </div>

          {/* Quick Search Shortcut */}
          <div className="hidden md:flex items-center max-w-md w-full mx-8">
            <Link
              to="/find-doctors"
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search doctors by name, specialty, or clinic...</span>
              </div>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-md">
                Find
              </kbd>
            </Link>
          </div>

          {/* Right Actions: Favourites, Notifications, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Appointments Link */}
            <Link
              to="/patient/appointments"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              title="My Appointments"
            >
              <Calendar className="w-4 h-4 text-[#0D7A5F]" />
              <span>Appointments</span>
            </Link>

            {/* Favourites Quick Link */}
            <Link
              to="/patient/favourites"
              className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-50 transition-colors"
              title="Saved Doctors"
            >
              <Heart className="w-5 h-5" />
              {favouriteDoctorIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favouriteDoctorIds.length}
                </span>
              )}
            </Link>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-[#0D7A5F] hover:bg-slate-50 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-extrabold flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white p-3 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-[#0D7A5F] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {recentNotifications.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        notification={notif}
                        onClick={() => handleNotificationClick(notif.id, notif.appointmentId)}
                      />
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                    <Link
                      to="/patient/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-[#0D7A5F] hover:underline flex items-center justify-center gap-1"
                    >
                      <span>View All Notifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0D7A5F] text-white font-bold flex items-center justify-center text-xs">
                  {user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'PT'}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-slate-800">{user?.name || 'Patient'}</span>
                  <span className="text-[10px] text-slate-400">Karachi, PK</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white p-2 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <div className="text-xs font-bold text-slate-900">{user?.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user?.email}</div>
                  </div>
                  <Link
                    to="/patient/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    to="/patient/appointments"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> My Appointments
                  </Link>
                  <Link
                    to="/find-doctors"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl transition-colors"
                  >
                    <Search className="w-4 h-4" /> Find Doctors
                  </Link>
                  <Link
                    to="/patient/favourites"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl transition-colors"
                  >
                    <Heart className="w-4 h-4" /> Saved Favourites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
