import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  CalendarCheck,
  Settings
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAdminStore } from '../../store/useAdminStore';

export const AdminMobileNav: React.FC = () => {
  const { doctors } = useAdminStore();
  const pendingCount = doctors.filter((d) => d.verificationStatus === 'pending').length;

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      to: '/admin/doctors',
      label: 'Doctors',
      icon: UserCheck,
      badge: pendingCount > 0 ? pendingCount : undefined
    },
    { to: '/admin/patients', label: 'Patients', icon: Users },
    { to: '/admin/appointments', label: 'Consults', icon: CalendarCheck },
    { to: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 px-2 py-1.5 shadow-lg text-white">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative',
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
