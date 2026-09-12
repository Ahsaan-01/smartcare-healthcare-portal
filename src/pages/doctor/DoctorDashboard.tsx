import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  Clock,
  TrendingUp,
  Radio,
  ArrowRight,
  ShieldCheck,
  FileText,
  HeartPulse,
  CheckCircle2
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
import { Appointment } from '../../types/appointment';

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
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

  const [queueFilter, setQueueFilter] = useState<'all' | 'waiting' | 'completed'>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<DigitalPrescription | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatientRecord | null>(null);
  const [cancelModalData, setCancelModalData] = useState<{ id: string; name: string } | null>(null);

  const doctorId = user?.id || 'doc-1';
  const todayStr = '2026-09-07';

  // Filter today's appointments for Dr. Ayesha Khan
  const todayAppointments = appointments.filter(
    (a) => a.doctorId === doctorId && a.date === todayStr
  );

  const confirmedToday = todayAppointments.filter((a) => a.status === 'confirmed');
  const completedToday = todayAppointments.filter((a) => a.status === 'completed');

  // Next patient in queue
  const nextPatientAppt: Appointment | undefined = confirmedToday[0];

  // Calculate today's revenue in PKR
  const todayGrossPKR = todayAppointments.reduce(
    (sum, a) => (a.status !== 'cancelled' ? sum + a.consultationFee : sum),
    0
  );

  const filteredQueue = todayAppointments.filter((a) => {
    if (queueFilter === 'waiting') return a.status === 'confirmed';
    if (queueFilter === 'completed') return a.status === 'completed';
    return true;
  });

  const handleOpenPatientFile = (patientId: string) => {
    const patient = getPatientById(patientId) || patientRecords.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
    } else {
      addToast({ type: 'info', message: 'Patient profile record is being prepared.' });
    }
  };

  const handleOpenPrescription = (appointmentId: string) => {
    const rx = getPrescriptionByAppointmentId(appointmentId);
    if (rx) {
      setSelectedPrescription(rx);
    } else if (prescriptions.length > 0) {
      setSelectedPrescription(prescriptions[0]);
    } else {
      addToast({ type: 'info', message: 'No prescription attached for this appointment.' });
    }
  };

  const handleConfirmCancel = (appointmentId: string, reason: string) => {
    cancelAppointment(appointmentId, reason);
    addToast({ type: 'success', message: 'Appointment cancelled and patient notified.' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0D7A5F] via-[#084E3D] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md font-semibold text-white">
                PMDC Verified Practice
              </span>
              <span className="text-emerald-200">
                Monday, 7 September 2026 &bull; Pakistan Standard Time (PKT)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Good afternoon, {user?.name || 'Dr. Ayesha Khan'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl">
              Consultant Cardiologist at SmartCare Heart & Vascular Institute, Clifton. You have{' '}
              <strong className="text-white underline">{confirmedToday.length} patients waiting</strong> in today&apos;s queue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/doctor/schedule')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
              leftIcon={<Clock className="w-4 h-4" />}
            >
              Slot Manager
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (nextPatientAppt) {
                  navigate(`/doctor/consultations/${nextPatientAppt.id}`);
                } else {
                  navigate('/doctor/appointments');
                }
              }}
              leftIcon={<Radio className="w-4 h-4 animate-pulse text-[#0D7A5F]" />}
            >
              Open Consultation Room
            </Button>
          </div>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Today's Patients
            </span>
            <div className="p-2 bg-emerald-50 text-[#0D7A5F] rounded-xl">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{todayAppointments.length}</div>
          <p className="text-[11px] text-slate-500">
            {confirmedToday.length} upcoming &bull; {completedToday.length} completed
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active Queue
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{confirmedToday.length} Waiting</div>
          <p className="text-[11px] text-slate-500">
            Avg. wait time: <strong className="text-slate-700 font-semibold">12 mins</strong>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Today's Earnings (PKR)
            </span>
            <div className="p-2 bg-emerald-50 text-[#0D7A5F] rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800">
            Rs. {todayGrossPKR.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            +18% compared to last Monday
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Patient Satisfaction
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">4.9 / 5.0</div>
          <p className="text-[11px] text-slate-500">
            Based on <strong className="text-slate-700 font-semibold">124 verified reviews</strong>
          </p>
        </div>
      </div>

      {/* Next Up Hero Card */}
      {nextPatientAppt ? (
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  NEXT PATIENT READY
                </span>
                <Badge variant={nextPatientAppt.consultationType === 'online' ? 'primary' : 'outline'}>
                  {nextPatientAppt.consultationType === 'online' ? 'Online Video Call' : 'In-Clinic Consultation'}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Ref: {nextPatientAppt.referenceNumber}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {nextPatientAppt.patientName}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Scheduled for <strong className="text-slate-900 font-semibold">{nextPatientAppt.time}</strong> today &bull; Fee: <strong className="text-[#0D7A5F] font-bold">Rs. {nextPatientAppt.consultationFee.toLocaleString()}</strong>
                </p>
                {nextPatientAppt.notes && (
                  <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded-xl border border-slate-200 inline-block">
                    &ldquo;{nextPatientAppt.notes}&rdquo;
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenPatientFile(nextPatientAppt.patientId)}
                leftIcon={<HeartPulse className="w-4 h-4" />}
              >
                View Medical File
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(`/doctor/consultations/${nextPatientAppt.id}`)}
                leftIcon={<Radio className="w-4 h-4" />}
              >
                Start Consultation Now &rarr;
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Waiting Patients in Current Queue</h4>
          <p className="text-xs text-slate-500">
            All appointments for this session are currently completed or not yet checked in.
          </p>
        </div>
      )}

      {/* Main Grid: Today's Queue & Quick Actions Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointment Queue (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Today's Patient Queue
              </h3>
              <p className="text-xs text-slate-500">
                Manage consultations, examine medical history, and issue digital prescriptions.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setQueueFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  queueFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All ({todayAppointments.length})
              </button>
              <button
                type="button"
                onClick={() => setQueueFilter('waiting')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  queueFilter === 'waiting'
                    ? 'bg-white text-[#0D7A5F] shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Waiting ({confirmedToday.length})
              </button>
              <button
                type="button"
                onClick={() => setQueueFilter('completed')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  queueFilter === 'completed'
                    ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Completed ({completedToday.length})
              </button>
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-3">
            {filteredQueue.length > 0 ? (
              filteredQueue.map((appt) => (
                <div
                  key={appt.id}
                  className="p-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {appt.patientName}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        ({appt.referenceNumber})
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
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {appt.time}
                      </span>
                      <span>&bull;</span>
                      <span className="capitalize">{appt.consultationType}</span>
                      <span>&bull;</span>
                      <span className="text-[#0D7A5F] font-bold">
                        Rs. {appt.consultationFee.toLocaleString()}
                      </span>
                    </div>

                    {appt.notes && (
                      <p className="text-xs text-slate-600 line-clamp-1">
                        Reason: {appt.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenPatientFile(appt.patientId)}
                    >
                      File
                    </Button>

                    {appt.status === 'confirmed' && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/doctor/consultations/${appt.id}`)}
                        >
                          Examine
                        </Button>
                        <button
                          type="button"
                          onClick={() =>
                            setCancelModalData({ id: appt.id, name: appt.patientName })
                          }
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs font-semibold"
                          title="Cancel consultation"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {appt.status === 'completed' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenPrescription(appt.id)}
                        leftIcon={<FileText className="w-3.5 h-3.5" />}
                      >
                        Prescription
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No appointments found for this filter tab.
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Practice Tools & Recent Prescriptions */}
        <div className="space-y-6">
          {/* Quick Practice Actions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quick Practice Tools
            </h4>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => navigate('/doctor/schedule')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#0D7A5F]" />
                  <span>Configure Shift & Break Times</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/doctor/patients')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Browse Patient Medical Records</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/doctor/analytics')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Monthly Revenue & Payouts</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Recently Issued Digital Prescriptions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Issued Prescriptions
              </h4>
              <span className="text-[11px] font-bold text-[#0D7A5F]">
                {prescriptions.length} Total
              </span>
            </div>

            <div className="space-y-2.5">
              {prescriptions.slice(0, 3).map((rx) => (
                <div
                  key={rx.id}
                  onClick={() => setSelectedPrescription(rx)}
                  className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{rx.patientName}</span>
                    <span className="text-[10px] text-slate-400">{rx.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">
                    Dx: {rx.diagnosis}
                  </p>
                  <p className="text-[10px] text-[#0D7A5F] font-semibold">
                    {rx.medications.length} Medications &bull; Click to View Pad
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pakistan Clinical Support Hotline */}
          <div className="p-4 bg-[#E6F4F1] border border-emerald-200 rounded-2xl space-y-1 text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-bold text-[#0D7A5F]">
              <ShieldCheck className="w-4 h-4" />
              <span>SmartCare Doctor Desk (Pakistan)</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              For urgent hospital slot transfers or emergency surgical on-call support, dial{' '}
              <strong className="font-mono font-bold">+92 21 111-762-782</strong>.
            </p>
          </div>
        </div>
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
