import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Heart,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useFavouritesStore } from '../../store/useFavouritesStore';

export const PatientSidebar: React.FC = () => {
  const { favouriteDoctorIds } = useFavouritesStore();

  const navItems = [
    { to: '/patient/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/find-doctors', label: 'Find Doctors', icon: Search },
    {
      to: '/patient/favourites',
      label: 'Saved Doctors',
      icon: Heart,
      badge: favouriteDoctorIds.length > 0 ? favouriteDoctorIds.length : undefined
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-slate-200/90 bg-white p-5 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Patient Portal
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/patient/dashboard'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all',
                      isActive
                        ? 'bg-[#E6F4F1] text-[#0D7A5F] shadow-2xs font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Future Modules Teaser Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-[#E6F4F1]/30 border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D7A5F]">
            <ShieldCheck className="w-4 h-4" /> PMDC Verification
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
            All registered physicians in Karachi, Lahore & Islamabad are verified against PMDC medical credentials.
          </p>
        </div>

        {/* 24/7 Helpline */}
        <div className="p-3.5 rounded-2xl bg-emerald-950 text-white text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <PhoneCall className="w-4 h-4" /> Need Urgent Care?
          </div>
          <p className="text-[11px] text-emerald-100/70 mt-1">
            24/7 SmartCare Telehealth Helpline:
          </p>
          <div className="text-sm font-bold text-white mt-1">
            021-111-762-782
          </div>
        </div>
      </div>
    </aside>
  );
};
