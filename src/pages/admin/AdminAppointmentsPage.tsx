import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Clock,
  CreditCard,
  AlertCircle,
  X,
  FileCheck
} from 'lucide-react';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { Appointment, AppointmentStatus } from '../../types/appointment';

export const AdminAppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment } = useAppointmentStore();
  const { addToast } = useToastStore();

  const [activeStatusTab, setActiveStatusTab] = useState<'all' | AppointmentStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'in-clinic' | 'online'>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Tab counts
  const counts = {
    all: appointments.length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter((appt) => {
    if (activeStatusTab !== 'all' && appt.status !== activeStatusTab) return false;
    if (typeFilter !== 'all' && appt.consultationType !== typeFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRef = appt.referenceNumber.toLowerCase().includes(q);
      const matchDoctor = appt.doctorName.toLowerCase().includes(q);
      const matchPatient = appt.patientName.toLowerCase().includes(q);
      const matchCity = appt.city.toLowerCase().includes(q);
      if (!matchRef && !matchDoctor && !matchPatient && !matchCity) return false;
    }

    return true;
  });

  const handleRefundSimulation = (refNumber: string, fee: number) => {
    addToast({
      type: 'success',
      message: `Simulated refund of Rs. ${fee.toLocaleString()} initiated for ${refNumber}. Reversal credited to patient payment method.`
    });
  };

  const handleAdminCancel = (id: string) => {
    cancelAppointment(id, 'Cancelled by Super Administrator during operational audit');
    addToast({ type: 'warning', message: 'Appointment cancelled by admin oversight.' });
    setSelectedAppointment(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Consultations Oversight & Clinical Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time audit log of physical in-clinic visits and encrypted tele-consultations across all Pakistani clinics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-xl border border-emerald-500/40">
            {counts.completed} Completed Sessions
          </span>
        </div>
      </div>

      {/* Status Tabs Bar */}
      <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 flex flex-wrap gap-1.5 text-xs">
        {(
          [
            { id: 'all', label: 'All Sessions', count: counts.all },
            { id: 'confirmed', label: 'Confirmed / Active', count: counts.confirmed },
            { id: 'completed', label: 'Completed', count: counts.completed },
            { id: 'cancelled', label: 'Cancelled / Refundable', count: counts.cancelled }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveStatusTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              activeStatusTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 text-[10px] rounded-full font-black ${
                activeStatusTab === tab.id
                  ? 'bg-slate-950 text-amber-400'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Modality Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by reference (SC-2026...), doctor name, patient name, or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'in-clinic' | 'online')}
            className="bg-transparent focus:outline-none cursor-pointer font-medium"
          >
            <option value="all">All Modalities</option>
            <option value="in-clinic">In-Clinic Visits Only</option>
            <option value="online">Online Video Consults Only</option>
          </select>
        </div>
      </div>

      {/* Appointments Audit Table / Cards */}
      <div className="space-y-3">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {appt.referenceNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${
                      appt.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : appt.status === 'confirmed'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {appt.status}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 rounded-md capitalize">
                    {appt.consultationType}
                  </span>
                  <span className="text-xs text-slate-400">City: {appt.city}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span>
                    Patient: <strong className="text-white">{appt.patientName}</strong>
                  </span>
                  <span>&bull;</span>
                  <span>
                    Physician: <strong className="text-amber-300">{appt.doctorName}</strong> ({appt.doctorSpecialization})
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {appt.date} at {appt.time} (PKT)
                  </span>
                  <span>&bull;</span>
                  <span className="text-emerald-400 font-bold">
                    Fee: Rs. {appt.consultationFee.toLocaleString()}
                  </span>
                  {appt.prescriptionUrl && (
                    <span className="text-blue-400 text-[11px] font-semibold flex items-center gap-1">
                      <FileCheck className="w-3 h-3" /> Digital Rx Attached
                    </span>
                  )}
                </div>

                {appt.cancellationReason && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/40 p-2 rounded-xl border border-rose-800/60 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Cancellation Reason: {appt.cancellationReason}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedAppointment(appt)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Audit Details
                </Button>

                {appt.status === 'cancelled' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleRefundSimulation(appt.referenceNumber, appt.consultationFee)}
                    leftIcon={<CreditCard className="w-3.5 h-3.5" />}
                  >
                    Simulate Refund
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <CalendarCheck className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Consultations Found</h3>
            <p className="text-xs text-slate-400">
              No records match your selected status tab or search query.
            </p>
          </div>
        )}
      </div>

      {/* Appointment Audit Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Consultation Audit Details</h3>
                <p className="text-xs font-mono text-amber-400 font-semibold">
                  Ref: {selectedAppointment.referenceNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Parties Involved</span>
                <p className="text-white">
                  Patient: <strong>{selectedAppointment.patientName}</strong> ({selectedAppointment.patientPhone})
                </p>
                <p className="text-amber-300">
                  Doctor: <strong>{selectedAppointment.doctorName}</strong> ({selectedAppointment.doctorSpecialization})
                </p>
                <p className="text-slate-400">Clinic: {selectedAppointment.clinicName} &bull; {selectedAppointment.city}</p>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Session Schedule & Payment</span>
                <p className="text-white">
                  {selectedAppointment.date} at {selectedAppointment.time} (PKT) &bull; Mode: <strong>{selectedAppointment.consultationType}</strong>
                </p>
                <p className="text-emerald-400 font-bold">
                  Gross Fee: Rs. {selectedAppointment.consultationFee.toLocaleString()} (Platform Commission: Rs. {Math.round(selectedAppointment.consultationFee * 0.1).toLocaleString()})
                </p>
              </div>

              {selectedAppointment.notes && (
                <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Chief Complaint Notes</span>
                  <p className="text-slate-300 italic">&ldquo;{selectedAppointment.notes}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              {selectedAppointment.status === 'confirmed' ? (
                <button
                  type="button"
                  onClick={() => handleAdminCancel(selectedAppointment.id)}
                  className="px-3 py-1.5 bg-rose-950/40 text-rose-400 border border-rose-800/60 rounded-xl font-bold hover:bg-rose-900/40"
                >
                  Cancel via Admin Override
                </button>
              ) : (
                <span className="text-xs text-slate-500 font-medium">No actions pending</span>
              )}

              <Button variant="outline" size="sm" onClick={() => setSelectedAppointment(null)}>
                Close Audit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
