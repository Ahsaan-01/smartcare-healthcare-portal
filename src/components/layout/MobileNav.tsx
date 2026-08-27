import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Heart } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useFavouritesStore } from '../../store/useFavouritesStore';

export const MobileNav: React.FC = () => {
  const { favouriteDoctorIds } = useFavouritesStore();

  const navItems = [
    { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/find-doctors', label: 'Find Doctors', icon: Search },
    {
      to: '/patient/favourites',
      label: 'Saved',
      icon: Heart,
      badge: favouriteDoctorIds.length > 0 ? favouriteDoctorIds.length : undefined
    }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-6 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/patient/dashboard'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-3 rounded-xl transition-colors relative',
                  isActive ? 'text-[#0D7A5F]' : 'text-slate-500 hover:text-slate-800'
                )
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
