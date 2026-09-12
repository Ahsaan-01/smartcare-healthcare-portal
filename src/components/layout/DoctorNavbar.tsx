import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  ShieldCheck,
  Building2,
  ChevronDown,
  LogOut,
  ExternalLink,
  User,
  Radio,
  Coffee,
  AlertTriangle,
  CheckCircle2,
  CheckCheck
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { useDoctorStore } from '../../store/useDoctorStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useToastStore } from '../../store/useToastStore';
import { DutyStatus } from '../../types/doctorPortal';
import { NotificationItem } from '../appointment/NotificationItem';

const STATUS_CONFIG: Record<DutyStatus, { label: string; bg: string; text: string; dot: string; icon: React.ElementType }> = {
  'available': {
    label: 'Available for Consultations',
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
    icon: CheckCircle2
  },
  'in-consultation': {
    label: 'In Consultation',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-800',
    dot: 'bg-amber-500 animate-pulse',
    icon: Radio
  },
  'break': {
    label: 'On Break / Prayer',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    dot: 'bg-blue-500',
    icon: Coffee
  },
  'emergency-off': {
    label: 'Emergency Off-Duty',
    bg: 'bg-rose-50 border-rose-200',
    text: 'text-rose-800',
    dot: 'bg-rose-500',
    icon: AlertTriangle
  }
};

export const DoctorNavbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { dutyStatus, setDutyStatus, selectedClinic, setSelectedClinic } = useDoctorStore();
  const { notifications, getUnreadCount, markAllNotificationsRead, markNotificationRead } = useAppointmentStore();
  const { addToast } = useToastStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadCount = getUnreadCount();
  const recentNotifications = notifications.slice(0, 4);
  const currentStatusConfig = STATUS_CONFIG[dutyStatus];

  const handleLogout = () => {
    logout();
    addToast({ type: 'info', message: 'Logged out of Doctor Portal.' });
    navigate('/login');
  };

  const handleStatusSelect = (status: DutyStatus) => {
    setDutyStatus(status);
    setIsStatusOpen(false);
    addToast({
      type: 'success',
      message: `Practice status updated to: ${STATUS_CONFIG[status].label}`
    });
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0D7A5F] text-white">
                Doctor Portal
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D7A5F]" />
                PMDC # 48291-S
              </span>
            </div>
          </div>

          {/* Clinic Switcher (Hidden on small mobile) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-[#0D7A5F]" />
            <select
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-slate-800"
            >
              <option value="SmartCare Heart & Vascular Institute, Clifton">
                SmartCare Heart & Vascular Institute (Clifton, Karachi)
              </option>
              <option value="SmartCare TeleHealth Portal (Online)">
                SmartCare TeleHealth (Online Consultations)
              </option>
            </select>
          </div>

          {/* Right Area: Duty Status, Notifications, Doctor Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Duty Status Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setShowNotifications(false);
                  setIsProfileOpen(false);
                }}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${currentStatusConfig.bg} ${currentStatusConfig.text}`}
              >
                <span className={`w-2 h-2 rounded-full ${currentStatusConfig.dot}`} />
                <span className="hidden sm:inline">{currentStatusConfig.label}</span>
                <span className="sm:hidden">{dutyStatus === 'available' ? 'Available' : 'Busy'}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isStatusOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Change Consultation Status
                  </div>
                  {(['available', 'in-consultation', 'break', 'emergency-off'] as DutyStatus[]).map((st) => {
                    const cfg = STATUS_CONFIG[st];
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusSelect(st)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-all text-left ${
                          dutyStatus === st
                            ? 'bg-emerald-50 text-[#0D7A5F] font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="flex-1">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setIsStatusOpen(false);
                  setIsProfileOpen(false);
                }}
                aria-label="Notifications"
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">Clinic Alerts</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 rounded-full">
                          {unreadCount} unread
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsRead}
                        className="text-xs text-[#0D7A5F] hover:underline font-medium flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {recentNotifications.length > 0 ? (
                      recentNotifications.map((notif) => (
                        <NotificationItem
                          key={notif.id}
                          notification={notif}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            setShowNotifications(false);
                            navigate('/doctor/appointments');
                          }}
                        />
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No notifications right now.
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      to="/doctor/appointments"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-semibold text-[#0D7A5F] hover:underline"
                    >
                      View All Clinic Appointments &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Doctor Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsStatusOpen(false);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <img
                  src={
                    user?.avatarUrl ||
                    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'
                  }
                  alt={user?.name || 'Dr. Ayesha Khan'}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-500/30"
                />
                <span className="hidden md:inline-block text-xs font-bold text-slate-800">
                  {user?.name || 'Dr. Ayesha Khan'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">{user?.name || 'Dr. Ayesha Khan'}</p>
                    <p className="text-[11px] text-[#0D7A5F] font-medium">Consultant Cardiologist</p>
                    <p className="text-[10px] text-slate-400">PMDC # 48291-S &bull; Karachi</p>
                  </div>

                  <Link
                    to="/doctors/doc-1"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>Public Profile Preview</span>
                  </Link>

                  <Link
                    to="/patient/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Switch to Patient View</span>
                  </Link>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-left"
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
