import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  CalendarCheck,
  Stethoscope,
  TrendingUp,
  Settings,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAdminStore } from '../../store/useAdminStore';

export const AdminSidebar: React.FC = () => {
  const { doctors, settings, toggleMaintenance } = useAdminStore();

  const pendingDoctorsCount = doctors.filter(
    (d) => d.verificationStatus === 'pending'
  ).length;

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Overview',
      icon: LayoutDashboard
    },
    {
      to: '/admin/doctors',
      label: 'Doctors & PMDC',
      icon: UserCheck,
      badge: pendingDoctorsCount > 0 ? `${pendingDoctorsCount} Pending` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
    },
    {
      to: '/admin/patients',
      label: 'Patient Directory',
      icon: Users
    },
    {
      to: '/admin/appointments',
      label: 'All Consultations',
      icon: CalendarCheck
    },
    {
      to: '/admin/specialties',
      label: 'Medical Specialties',
      icon: Stethoscope
    },
    {
      to: '/admin/analytics',
      label: 'Platform Analytics',
      icon: TrendingUp
    },
    {
      to: '/admin/settings',
      label: 'System Settings',
      icon: Settings
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-slate-800 bg-slate-900 p-5 min-h-[calc(100vh-4rem)] text-white">
      <div className="space-y-6">
        {/* Admin Credential Card */}
        <div className="p-3.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-sm">
              SA
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">
                Super Administrator
              </h4>
              <p className="text-[11px] text-slate-400 truncate">
                admin@smartcare.pk
              </p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Full System Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Group */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Governance & Ops
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
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          'px-2 py-0.5 text-[10px] font-bold rounded-full',
                          isActive
                            ? 'bg-slate-950 text-amber-400'
                            : item.badgeColor
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

        {/* Maintenance Mode Trigger */}
        <div
          className={cn(
            'p-3.5 rounded-2xl border transition-all text-xs',
            settings.maintenanceMode
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
          )}
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle
              className={cn(
                'w-4 h-4 shrink-0 mt-0.5',
                settings.maintenanceMode ? 'text-amber-400' : 'text-slate-400'
              )}
            />
            <div className="min-w-0 flex-1">
              <h5 className="font-bold text-white">
                {settings.maintenanceMode ? 'Maintenance Mode' : 'Platform Status'}
              </h5>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {settings.maintenanceMode
                  ? 'Public booking traffic paused.'
                  : 'All nationwide services live.'}
              </p>
              <button
                type="button"
                onClick={() => toggleMaintenance(!settings.maintenanceMode)}
                className={cn(
                  'mt-2.5 w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer',
                  settings.maintenanceMode
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                )}
              >
                {settings.maintenanceMode ? 'Restore Normal Ops' : 'Enable Maintenance'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
