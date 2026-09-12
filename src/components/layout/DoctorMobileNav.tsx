import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppointmentStore } from '../../store/useAppointmentStore';

export const DoctorMobileNav: React.FC = () => {
  const { appointments } = useAppointmentStore();
  const todayStr = '2026-09-07';
  const todayCount = appointments.filter(
    (a) => a.doctorId === 'doc-1' && a.date === todayStr && a.status === 'confirmed'
  ).length;

  const navItems = [
    { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      to: '/doctor/appointments',
      label: 'Queue',
      icon: Calendar,
      badge: todayCount > 0 ? todayCount : undefined
    },
    { to: '/doctor/schedule', label: 'Schedule', icon: Clock },
    { to: '/doctor/patients', label: 'Patients', icon: Users },
    { to: '/doctor/analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative',
                isActive ? 'text-[#0D7A5F]' : 'text-slate-500 hover:text-slate-800'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={cn('text-[10px] mt-0.5', isActive ? 'font-bold' : 'font-medium')}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
