import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Radio,
  FileText
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useDoctorStore } from '../../store/useDoctorStore';

export const DoctorSidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { appointments } = useAppointmentStore();
  const { scheduleConfig, setEmergencyOff } = useDoctorStore();

  const doctorId = user?.id || 'doc-1';
  const todayStr = '2026-09-07'; // Match current demo simulated date

  // Calculate today's confirmed appointments for this doctor
  const todayAppointments = appointments.filter(
    (a) => a.doctorId === doctorId && a.date === todayStr && a.status === 'confirmed'
  );

  const navItems = [
    {
      to: '/doctor/dashboard',
      label: 'Overview',
      icon: LayoutDashboard
    },
    {
      to: '/doctor/appointments',
      label: 'Appointments & Queue',
      icon: Calendar,
      badge: todayAppointments.length > 0 ? todayAppointments.length : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      to: '/doctor/schedule',
      label: 'Schedule & Slots',
      icon: Clock
    },
    {
      to: '/doctor/patients',
      label: 'Patient Records',
      icon: Users
    },
    {
      to: '/doctor/analytics',
      label: 'Practice Analytics',
      icon: TrendingUp
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-slate-200/90 bg-white p-5 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Doctor Credential Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#0D7A5F]/10 via-emerald-50/50 to-slate-50 border border-emerald-100 rounded-2xl">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.avatarUrl ||
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'
              }
              alt={user?.name || 'Dr. Ayesha Khan'}
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/20"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {user?.name || 'Dr. Ayesha Khan'}
              </h4>
              <p className="text-[11px] text-[#0D7A5F] font-semibold truncate">
                MBBS, FCPS (Cardiology)
              </p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3 h-3 text-[#0D7A5F]" />
                <span>PMDC # 48291-S</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-emerald-200/50 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Today's Patients:</span>
            <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              {todayAppointments.length} in queue
            </span>
          </div>
        </div>

        {/* Navigation Group */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Practice Management
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group',
                    isActive
                      ? 'bg-[#0D7A5F] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          'px-2 py-0.5 text-[10px] font-bold rounded-full',
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Quick Consultation Shortcut */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Radio className="w-3.5 h-3.5 text-[#0D7A5F] animate-pulse" />
            <span>Tele-Health Room</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Directly open high-definition encrypted video consultation for online patients.
          </p>
          <NavLink
            to="/doctor/appointments?tab=today"
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#E6F4F1] hover:bg-[#d6ede8] text-[#0D7A5F] text-xs font-bold rounded-xl transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Launch Queue
          </NavLink>
        </div>

        {/* Out of Office / Emergency Mode Widget */}
        <div
          className={cn(
            'p-3.5 rounded-2xl border transition-all',
            scheduleConfig.isEmergencyOff
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          )}
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle
              className={cn(
                'w-4 h-4 shrink-0 mt-0.5',
                scheduleConfig.isEmergencyOff ? 'text-rose-600' : 'text-slate-400'
              )}
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold">
                {scheduleConfig.isEmergencyOff ? 'Emergency Off Active' : 'Emergency Day-Off'}
              </h5>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {scheduleConfig.isEmergencyOff
                  ? 'Clinic slots temporarily paused.'
                  : 'Pause today bookings for hospital emergencies.'}
              </p>
              <button
                type="button"
                onClick={() => setEmergencyOff(!scheduleConfig.isEmergencyOff, 'Emergency bypass duty')}
                className={cn(
                  'mt-2.5 w-full py-1.5 px-2.5 rounded-lg text-[11px] font-semibold transition-all',
                  scheduleConfig.isEmergencyOff
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                )}
              >
                {scheduleConfig.isEmergencyOff ? 'Resume Practice' : 'Trigger Emergency Off'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
