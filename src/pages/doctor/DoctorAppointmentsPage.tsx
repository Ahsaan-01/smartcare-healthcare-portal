import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Search,
  Filter,
  Clock,
  Radio,
  FileText,
  HeartPulse,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useDoctorStore } from '../../store/useDoctorStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { PrescriptionModal } from '../../components/doctor/PrescriptionModal';
import { PatientDrawer } from '../../components/doctor/PatientDrawer';
import { ConsultationCancelModal } from '../../components/doctor/ConsultationCancelModal';
import { DigitalPrescription, DoctorPatientRecord } from '../../types/doctorPortal';
import { AppointmentConsultationType } from '../../types/appointment';

export const DoctorAppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'all' | 'today' | 'upcoming' | 'completed' | 'cancelled') || 'today';

  const { user } = useAuthStore();
  const { appointments, cancelAppointment } = useAppointmentStore();
  const {
    patientRecords,
    prescriptions,
    getPatientById,
    getPrescriptionByAppointmentId,
    getPrescriptionById
  } = useDoctorStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'upcoming' | 'completed' | 'cancelled'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | AppointmentConsultationType>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<DigitalPrescription | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatientRecord | null>(null);
  const [cancelModalData, setCancelModalData] = useState<{ id: string; name: string } | null>(null);

  const doctorId = user?.id || 'doc-1';
  const todayStr = '2026-09-07';

  // Doctor's appointments
  const doctorAppts = appointments.filter((a) => a.doctorId === doctorId);

  // Tab counts
  const counts = {
    all: doctorAppts.length,
    today: doctorAppts.filter((a) => a.date === todayStr && a.status === 'confirmed').length,
    upcoming: doctorAppts.filter((a) => a.date > todayStr && a.status === 'confirmed').length,
    completed: doctorAppts.filter((a) => a.status === 'completed').length,
    cancelled: doctorAppts.filter((a) => a.status === 'cancelled').length
  };

  // Filter appointments
  const filteredAppointments = doctorAppts.filter((appt) => {
    // Tab filter
    if (activeTab === 'today') {
      if (!(appt.date === todayStr && appt.status === 'confirmed')) return false;
    } else if (activeTab === 'upcoming') {
      if (!(appt.date > todayStr && appt.status === 'confirmed')) return false;
    } else if (activeTab === 'completed') {
      if (appt.status !== 'completed') return false;
    } else if (activeTab === 'cancelled') {
      if (appt.status !== 'cancelled') return false;
    }

    // Type filter
    if (typeFilter !== 'all' && appt.consultationType !== typeFilter) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = appt.patientName.toLowerCase().includes(q);
      const matchPhone = appt.patientPhone.toLowerCase().includes(q);
      const matchRef = appt.referenceNumber.toLowerCase().includes(q);
      const matchNotes = appt.notes?.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchRef && !matchNotes) {
        return false;
      }
    }

    return true;
  });

  const handleOpenPatientFile = (patientId: string) => {
    const p = getPatientById(patientId) || patientRecords.find((rec) => rec.id === patientId);
    if (p) {
      setSelectedPatient(p);
    } else {
      addToast({ type: 'info', message: 'Preparing patient medical record...' });
    }
  };

  const handleOpenPrescription = (appointmentId: string) => {
    const rx = getPrescriptionByAppointmentId(appointmentId);
    if (rx) {
      setSelectedPrescription(rx);
    } else if (prescriptions.length > 0) {
      setSelectedPrescription(prescriptions[0]);
    } else {
      addToast({ type: 'info', message: 'No prescription found for this record.' });
    }
  };

  const handleConfirmCancel = (appointmentId: string, reason: string) => {
    cancelAppointment(appointmentId, reason);
    addToast({ type: 'success', message: 'Consultation cancelled and patient notified.' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Consultation Queue & Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your daily clinic patient flow, in-clinic visits, and tele-health sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/doctor/schedule')}
            leftIcon={<Clock className="w-4 h-4" />}
          >
            Manage Slots
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/doctor/patients')}
            leftIcon={<HeartPulse className="w-4 h-4" />}
          >
            Patient Records
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-1.5">
        {(
          [
            { id: 'today', label: "Today's Queue", count: counts.today },
            { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
            { id: 'all', label: 'All Sessions', count: counts.all },
            { id: 'completed', label: 'Completed', count: counts.completed },
            { id: 'cancelled', label: 'Cancelled', count: counts.cancelled }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-[#0D7A5F] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Secondary Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, phone (+92...), or reference (SC-2026)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as 'all' | AppointmentConsultationType)
              }
              className="bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="all">All Consultation Types</option>
              <option value="in-clinic">In-Clinic Visits Only</option>
              <option value="online">Online Video Consults Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-base text-slate-900 truncate">
                    {appt.patientName}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Ref: {appt.referenceNumber}
                  </span>
                  <Badge
                    variant={
                      appt.status === 'completed'
                        ? 'success'
                        : appt.status === 'confirmed'
                        ? 'primary'
                        : 'error'
                    }
                  >
                    {appt.status}
                  </Badge>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                    {appt.consultationType === 'online' ? 'Online Video' : 'In-Clinic'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{appt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{appt.time} (PKT)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span>Phone: <strong>{appt.patientPhone}</strong></span>
                  </div>
                  <div className="text-[#0D7A5F] font-bold">
                    Fee: Rs. {appt.consultationFee.toLocaleString()}
                  </div>
                </div>

                {appt.notes && (
                  <p className="text-xs text-slate-500 italic line-clamp-1">
                    Chief Complaint: &ldquo;{appt.notes}&rdquo;
                  </p>
                )}

                {appt.cancellationReason && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Cancelled: {appt.cancellationReason}</span>
                  </div>
                )}
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenPatientFile(appt.patientId)}
                  leftIcon={<HeartPulse className="w-4 h-4" />}
                >
                  Medical File
                </Button>

                {appt.status === 'confirmed' && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/doctor/consultations/${appt.id}`)}
                      leftIcon={<Radio className="w-4 h-4" />}
                    >
                      Start Session
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCancelModalData({ id: appt.id, name: appt.patientName })
                      }
                      className="text-rose-600 hover:bg-rose-50 border-rose-200"
                    >
                      Cancel
                    </Button>
                  </>
                )}

                {appt.status === 'completed' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenPrescription(appt.id)}
                    leftIcon={<FileText className="w-4 h-4" />}
                  >
                    View Prescription
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No Consultations Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No appointments matching the selected tab or search query.
            </p>
          </div>
        )}
      </div>

      {/* Official Prescription Pad Modal */}
      <PrescriptionModal
        prescription={selectedPrescription}
        isOpen={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
      />

      {/* Patient Medical History Drawer */}
      <PatientDrawer
        patient={selectedPatient}
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onViewPrescription={(rxId) => {
          const rx = getPrescriptionById(rxId);
          if (rx) setSelectedPrescription(rx);
        }}
        onStartConsultation={(patId) => {
          const appt = appointments.find(
            (a) => a.patientId === patId && a.status === 'confirmed'
          );
          if (appt) {
            navigate(`/doctor/consultations/${appt.id}`);
          } else {
            addToast({ type: 'info', message: 'No active booked slot found for this patient today.' });
          }
        }}
      />

      {/* Cancellation Modal */}
      <ConsultationCancelModal
        isOpen={!!cancelModalData}
        appointmentId={cancelModalData?.id || null}
        patientName={cancelModalData?.name || ''}
        onClose={() => setCancelModalData(null)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};
