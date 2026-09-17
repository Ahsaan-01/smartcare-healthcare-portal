import React, { useState } from 'react';
import {
  AlertTriangle,
  Megaphone,
  ShieldCheck,
  RotateCcw,
  Activity,
  Server,
  Lock,
  Percent,
  Phone,
  Save
} from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { BroadcastModal } from '../../components/admin/BroadcastModal';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, toggleMaintenance, resetDemoData, setBroadcast } = useAdminStore();
  const { addToast } = useToastStore();

  const [platformFee, setPlatformFee] = useState(settings.platformFeePercentage);
  const [onlineDiscount, setOnlineDiscount] = useState(settings.teleHealthDiscountPercentage);
  const [emergencyPhone, setEmergencyPhone] = useState(settings.emergencyHotline);
  const [maxBookings, setMaxBookings] = useState(settings.maxDailyBookingPerPatient);
  const [payoutSchedule, setPayoutSchedule] = useState(settings.payoutProcessingDay);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      platformFeePercentage: Number(platformFee),
      teleHealthDiscountPercentage: Number(onlineDiscount),
      emergencyHotline: emergencyPhone.trim(),
      maxDailyBookingPerPatient: Number(maxBookings),
      payoutProcessingDay: payoutSchedule
    });
    addToast({ type: 'success', message: 'Platform operational parameters saved successfully.' });
  };

  const handleResetFactory = () => {
    if (window.confirm('Are you sure you want to reset all platform data (doctors, appointments, prescriptions) to factory defaults?')) {
      resetDemoData();
      addToast({ type: 'info', message: 'Platform demo data reset to default factory baseline.' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            System Settings & Platform Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Configure financial commission rates, operational toggles, maintenance mode, and emergency broadcasts.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetFactory}
          className="border-rose-800/60 text-rose-400 hover:bg-rose-950/40"
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset Demo Baseline
        </Button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Financial & Operational Parameters */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Percent className="w-4 h-4 text-amber-400" />
            <span>Financial & Booking Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase block">
                Platform Commission Fee (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={platformFee}
                  onChange={(e) => setPlatformFee(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                />
                <span className="text-slate-400 font-bold">%</span>
              </div>
              <p className="text-[10px] text-slate-400">Deducted automatically from clinic payouts.</p>
            </div>

            <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase block">
                Online Tele-Health Discount (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={25}
                  value={onlineDiscount}
                  onChange={(e) => setOnlineDiscount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                />
                <span className="text-slate-400 font-bold">%</span>
              </div>
              <p className="text-[10px] text-slate-400">Incentive for remote video appointments.</p>
            </div>

            <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase block">
                Max Daily Bookings / Patient
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={maxBookings}
                onChange={(e) => setMaxBookings(Number(e.target.value))}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
              />
              <p className="text-[10px] text-slate-400">Prevents bot / duplicate reservation flooding.</p>
            </div>

            <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase block">
                Weekly Payout Cycle
              </label>
              <select
                value={payoutSchedule}
                onChange={(e) => setPayoutSchedule(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium"
              >
                <option value="Every Monday">Every Monday (Standard)</option>
                <option value="Bi-Weekly (1st & 15th)">Bi-Weekly (1st & 15th)</option>
                <option value="Monthly End">Monthly End</option>
              </select>
              <p className="text-[10px] text-slate-400">Automated bank transfer batch frequency.</p>
            </div>

            <div className="sm:col-span-2 p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase block">
                National Clinical Emergency Hotline
              </label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="+92 21 111-762-782"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-400">Displayed in patient help drawers & prescription pad footers.</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" type="submit" leftIcon={<Save className="w-4 h-4" />}>
              Save Operational Changes
            </Button>
          </div>
        </div>
      </form>

      {/* Broadcast Alert & Maintenance Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Mode */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Platform Maintenance Mode</span>
            </h4>
            <span
              className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                settings.maintenanceMode
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {settings.maintenanceMode ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            When enabled, a warning banner is placed on public pages and patient slot booking is temporarily suspended.
          </p>

          <div className="pt-2">
            <Button
              variant={settings.maintenanceMode ? 'primary' : 'outline'}
              size="sm"
              onClick={() => toggleMaintenance(!settings.maintenanceMode)}
              className={settings.maintenanceMode ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' : 'border-slate-700'}
            >
              {settings.maintenanceMode ? 'Disable Maintenance (Go Live)' : 'Activate Maintenance Mode'}
            </Button>
          </div>
        </div>

        {/* Emergency Broadcast Announcement */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-blue-400" />
              <span>Broadcast Announcement Ticker</span>
            </h4>
            <span
              className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                settings.broadcastAnnouncement.enabled
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {settings.broadcastAnnouncement.enabled ? 'PUBLISHED' : 'OFF'}
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed truncate">
            {settings.broadcastAnnouncement.message}
          </p>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBroadcastOpen(true)}
              className="border-slate-700 hover:bg-slate-800 text-slate-200"
            >
              Edit Broadcast Message
            </Button>
          </div>
        </div>
      </div>

      {/* System Health Diagnostics */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Platform Infrastructure & Security Diagnostics</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Server className="w-4 h-4" />
              <span>Database Query Latency</span>
            </div>
            <p className="text-xl font-bold text-white">14 ms</p>
            <span className="text-[10px] text-slate-400">Karachi Edge Node &bull; 99.98% Uptime</span>
          </div>

          <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Lock className="w-4 h-4" />
              <span>Tele-Health Encryption</span>
            </div>
            <p className="text-xl font-bold text-white">256-Bit SSL</p>
            <span className="text-[10px] text-slate-400">WebRTC Encrypted Peer Tunnels</span>
          </div>

          <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>PMDC Compliance</span>
            </div>
            <p className="text-xl font-bold text-white">100% Verified</p>
            <span className="text-[10px] text-slate-400">All published doctors license checked</span>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        currentBroadcast={settings.broadcastAnnouncement}
        onClose={() => setIsBroadcastOpen(false)}
        onSave={(bc) => {
          setBroadcast(bc);
          addToast({ type: 'success', message: 'Platform announcement updated.' });
        }}
      />
    </div>
  );
};
