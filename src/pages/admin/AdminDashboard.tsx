import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  CalendarCheck,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Megaphone,
  UserPlus,
  ArrowRight,
  Clock,
  Activity
} from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { VerifyDoctorModal } from '../../components/admin/VerifyDoctorModal';
import { AddDoctorModal } from '../../components/admin/AddDoctorModal';
import { BroadcastModal } from '../../components/admin/BroadcastModal';
import { AdminDoctorRecord } from '../../types/admin';
import { MOCK_PLATFORM_METRICS } from '../../data/mockAdminData';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    doctors,
    settings,
    auditLogs,
    verifyDoctor,
    rejectDoctor,
    addDoctor,
    setBroadcast
  } = useAdminStore();
  const { addToast } = useToastStore();

  const [verifyModalDoctor, setVerifyModalDoctor] = useState<AdminDoctorRecord | null>(null);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  const pendingDoctors = doctors.filter((d) => d.verificationStatus === 'pending');
  const verifiedCount = doctors.filter((d) => d.verificationStatus === 'verified').length;

  const metrics = MOCK_PLATFORM_METRICS;

  const handleVerifySuccess = (id: string) => {
    verifyDoctor(id);
    addToast({ type: 'success', message: 'Doctor credentials verified and PMDC badge issued.' });
  };

  const handleRejectSuccess = (id: string, reason: string) => {
    rejectDoctor(id, reason);
    addToast({ type: 'warning', message: 'Doctor application rejected and notice sent.' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Executive Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              Pakistan National Network Ops
            </span>
            <span className="text-slate-400">
              Islamabad HQ &bull; PKT Timezone
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            SmartCare Master Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time platform oversight across <strong className="text-white">Karachi, Lahore, and Islamabad</strong>. Currently supervising {verifiedCount} verified specialists and {metrics.totalPatientsCount} registered patients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBroadcastOpen(true)}
            className="border-slate-700 hover:bg-slate-800 text-slate-200"
            leftIcon={<Megaphone className="w-4 h-4 text-blue-400" />}
          >
            Announcement
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddDoctorOpen(true)}
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Onboard Specialist
          </Button>
        </div>
      </div>

      {/* 5 Macro Financial & Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* GMV */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Gross Volume (GMV)
            </span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            Rs. {(metrics.grossMerchandiseValuePKR / 1000000).toFixed(2)}M
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold">+18.5% MoM Growth</p>
        </div>

        {/* Platform Revenue */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Net Commission (10%)
            </span>
            <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-amber-400">
            Rs. {metrics.netPlatformRevenuePKR.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400">SmartCare net take rate</p>
        </div>

        {/* Verified Specialists */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              PMDC Specialists
            </span>
            <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            {verifiedCount} Doctors
          </div>
          <p className="text-[10px] text-amber-400 font-semibold">
            {pendingDoctors.length} Awaiting Verification
          </p>
        </div>

        {/* Registered Patients */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Registered Patients
            </span>
            <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            {metrics.totalPatientsCount.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400">Nationwide active users</p>
        </div>

        {/* Consultations */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Consults
            </span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            {metrics.totalAppointmentsCount}
          </div>
          <p className="text-[10px] text-slate-400">
            {metrics.completedConsultationsCount} completed ({Math.round((metrics.completedConsultationsCount / metrics.totalAppointmentsCount) * 100)}%)
          </p>
        </div>
      </div>

      {/* Pending PMDC Verification Queue (High-Priority Alert Card) */}
      {pendingDoctors.length > 0 && (
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  PMDC Credential Verification Queue ({pendingDoctors.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Specialists awaiting official Pakistan Medical Commission license check before being published.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/doctors?tab=pending')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View Directory Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingDoctors.map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-400/40"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{doc.name}</h4>
                    <p className="text-[11px] text-slate-300 truncate">{doc.specialization}</p>
                    <p className="text-[10px] font-mono text-amber-400 font-bold">{doc.pmdcNumber}</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setVerifyModalDoctor(doc)}
                  leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
                >
                  Audit License
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Activity Feed (2 cols) & City / Ops Breakdown (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Platform Activity Feed */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Live Platform Audit & Telemetry Feed
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Showing recent events
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/70 rounded-2xl transition-all space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{log.title}</span>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-slate-700 text-slate-300 uppercase">
                      {log.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {log.description}
                </p>
                <p className="text-[10px] text-slate-400 pt-0.5">
                  Actor: <strong className="text-slate-200">{log.actorName}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: City Volume Breakdown & Quick Shortcuts */}
        <div className="space-y-6">
          {/* City Distribution */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0D7A5F]" />
              <span>City Volume Distribution</span>
            </h4>

            <div className="space-y-3">
              {metrics.cityBreakdown.map((city) => (
                <div key={city.city} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{city.city}</span>
                    <span className="font-bold text-white">
                      {city.appointmentCount} consults ({city.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      style={{ width: `${city.percentage}%` }}
                      className="bg-amber-400 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {city.doctorCount} Specialists &bull; {city.patientCount} Patients
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Operations Shortcuts */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Management Portals
            </h4>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => navigate('/admin/doctors')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Doctors Registry & PMDC</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/appointments')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="w-4 h-4 text-blue-400" />
                  <span>Consultations & Clinical Audit</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/analytics')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Platform Financial Report</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verify Doctor Modal */}
      <VerifyDoctorModal
        doctor={verifyModalDoctor}
        isOpen={!!verifyModalDoctor}
        onClose={() => setVerifyModalDoctor(null)}
        onVerify={handleVerifySuccess}
        onReject={handleRejectSuccess}
      />

      {/* Add Doctor Modal */}
      <AddDoctorModal
        isOpen={isAddDoctorOpen}
        onClose={() => setIsAddDoctorOpen(false)}
        onAddDoctor={(newDoc) => {
          addDoctor(newDoc);
          addToast({ type: 'success', message: `Specialist ${newDoc.name} registered on platform.` });
        }}
      />

      {/* Broadcast Modal */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        currentBroadcast={settings.broadcastAnnouncement}
        onClose={() => setIsBroadcastOpen(false)}
        onSave={(bc) => {
          setBroadcast(bc);
          addToast({ type: 'info', message: 'Platform broadcast announcement updated.' });
        }}
      />
    </div>
  );
};
