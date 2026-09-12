import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  ShieldCheck,
  Plus,
  Trash2,
  FileCheck,
  Calendar,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useDoctorStore } from '../../store/useDoctorStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { PrescriptionModal } from '../../components/doctor/PrescriptionModal';
import { MedicationItem, PatientVitals, DigitalPrescription } from '../../types/doctorPortal';

const COMMON_PAKISTANI_MEDS = [
  { name: 'Tab. Concor (Bisoprolol)', dosage: '2.5 mg', freq: '1-0-0', timing: 'after-meal' as const, dur: '30 Days', inst: 'Take once daily after breakfast.' },
  { name: 'Tab. Lipitor (Atorvastatin)', dosage: '10 mg', freq: '0-0-1', timing: 'after-meal' as const, dur: '30 Days', inst: 'Take at bedtime.' },
  { name: 'Tab. Eziday (Losartan)', dosage: '50 mg', freq: '1-0-0', timing: 'after-meal' as const, dur: '30 Days', inst: 'Take every morning for blood pressure.' },
  { name: 'Tab. Glucophage (Metformin)', dosage: '500 mg', freq: '1-0-1', timing: 'with-meal' as const, dur: '30 Days', inst: 'Take with main meals.' },
  { name: 'Tab. Panadol (Paracetamol)', dosage: '500 mg', freq: 'SOS', timing: 'after-meal' as const, dur: '5 Days', inst: 'Take if headache or mild fever occurs.' },
  { name: 'Cap. Risek (Omeprazole)', dosage: '20 mg', freq: '1-0-0', timing: 'before-meal' as const, dur: '14 Days', inst: 'Take 30 mins before breakfast.' },
  { name: 'Tab. Angisid (Nitroglycerin)', dosage: '0.5 mg', freq: 'SOS', timing: 'with-meal' as const, dur: 'As needed', inst: 'Sublingual if acute chest pain occurs.' }
];

const COMMON_LAB_TESTS = [
  'Fasting Lipid Profile (Cholesterol, HDL, LDL)',
  '12-Lead Standard Electrocardiogram (ECG)',
  'Serum Creatinine & Electrolytes',
  'HbA1c Glycated Hemoglobin',
  '2D Color Doppler Echocardiogram',
  'Complete Blood Count (CBC & ESR)',
  'Liver Function Tests (ALT, AST, Bilirubin)'
];

export const DoctorConsultationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { appointments } = useAppointmentStore();
  const {
    patientRecords,
    issuePrescription,
    getPrescriptionByAppointmentId
  } = useDoctorStore();
  const { addToast } = useToastStore();

  const appointment = appointments.find((a) => a.id === id);
  const patient = appointment
    ? patientRecords.find(
        (p) => p.id === appointment.patientId || p.name.toLowerCase() === appointment.patientName.toLowerCase()
      )
    : null;

  // Video call simulation states
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callActive, setCallActive] = useState(true);

  // Clinical Examination states
  const [chiefComplaint, setChiefComplaint] = useState(
    appointment?.notes || 'Patient reporting for routine cardiovascular evaluation and medication review.'
  );
  const [diagnosis, setDiagnosis] = useState(
    patient?.lastDiagnosis || 'Essential Primary Hypertension with Borderline Dyslipidemia'
  );

  // Vitals
  const [vitals, setVitals] = useState<PatientVitals>({
    bloodPressure: '128/84 mmHg',
    heartRate: '74 bpm',
    temperature: '98.4 °F',
    oxygenSaturation: '99%',
    weight: '75 kg'
  });

  // Medications
  const [medications, setMedications] = useState<MedicationItem[]>([
    {
      id: 'med-1',
      medicineName: 'Tab. Concor (Bisoprolol)',
      dosage: '2.5 mg',
      frequency: '1-0-0 (Morning)',
      timing: 'after-meal',
      duration: '30 Days',
      instructions: 'Take once daily in the morning after breakfast.'
    },
    {
      id: 'med-2',
      medicineName: 'Tab. Lipitor (Atorvastatin)',
      dosage: '10 mg',
      frequency: '0-0-1 (Night)',
      timing: 'after-meal',
      duration: '30 Days',
      instructions: 'Take at night before sleep.'
    }
  ]);

  // Lab Tests selected
  const [selectedLabs, setSelectedLabs] = useState<string[]>([
    'Fasting Lipid Profile (Cholesterol, HDL, LDL)',
    '12-Lead Standard Electrocardiogram (ECG)'
  ]);

  // Clinical Notes & Advice
  const [clinicalNotes, setClinicalNotes] = useState(
    'Salt-restricted diet (< 3g sodium/day). Daily 30-minute brisk walk. Avoid high-caffeine energy drinks. Monitor home blood pressure log twice weekly.'
  );
  const [followUpDate, setFollowUpDate] = useState('2026-10-07');

  // Preview Modal
  const [previewPrescription, setPreviewPrescription] = useState<DigitalPrescription | null>(null);

  if (!appointment) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-lg mx-auto">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-900">Consultation Session Not Found</h3>
        <p className="text-xs text-slate-500">
          The requested consultation appointment does not exist or has been removed.
        </p>
        <Button variant="primary" size="sm" onClick={() => navigate('/doctor/appointments')}>
          Back to Appointments
        </Button>
      </div>
    );
  }

  // Medication handlers
  const handleAddMedication = () => {
    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      medicineName: '',
      dosage: '10 mg',
      frequency: '1-0-0',
      timing: 'after-meal',
      duration: '14 Days',
      instructions: 'Take after meal with water'
    };
    setMedications([...medications, newMed]);
  };

  const handleQuickAddMed = (preset: (typeof COMMON_PAKISTANI_MEDS)[0]) => {
    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      medicineName: preset.name,
      dosage: preset.dosage,
      frequency: preset.freq,
      timing: preset.timing,
      duration: preset.dur,
      instructions: preset.inst
    };
    setMedications([...medications, newMed]);
    addToast({ type: 'info', message: `Added ${preset.name} to prescription.` });
  };

  const handleUpdateMedication = (id: string, field: keyof MedicationItem, value: string) => {
    setMedications(
      medications.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const handleToggleLab = (test: string) => {
    if (selectedLabs.includes(test)) {
      setSelectedLabs(selectedLabs.filter((t) => t !== test));
    } else {
      setSelectedLabs([...selectedLabs, test]);
    }
  };

  // Finalize consultation
  const handleFinalize = () => {
    if (!diagnosis.trim()) {
      addToast({ type: 'error', message: 'Please enter a clinical diagnosis before finalizing.' });
      return;
    }

    if (medications.length === 0) {
      addToast({ type: 'error', message: 'Please prescribe at least one medication.' });
      return;
    }

    const prescriptionData: Omit<DigitalPrescription, 'id' | 'createdAt'> = {
      appointmentId: appointment.id,
      referenceNumber: appointment.referenceNumber,
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      patientAge: patient?.age || 38,
      patientGender: patient?.gender || 'Male',
      patientMrn: patient?.mrn || 'MRN-KHI-1049',
      doctorId: appointment.doctorId,
      doctorName: appointment.doctorName,
      doctorSpecialization: appointment.doctorSpecialization,
      pmdcNumber: '48291-S',
      clinicName: appointment.clinicName,
      clinicAddress: appointment.clinicAddress,
      date: appointment.date,
      chiefComplaint,
      diagnosis,
      vitals,
      medications,
      labInvestigationsAdvised: selectedLabs,
      clinicalNotes,
      followUpDate,
      doctorSignature: `${user?.name || 'Dr. Ayesha Khan'}, MBBS, FCPS`
    };

    const created = issuePrescription(prescriptionData);

    // Sync with useAppointmentStore by updating status
    useAppointmentStore.setState((state) => {
      const updatedAppointments = state.appointments.map((a) =>
        a.id === appointment.id
          ? {
              ...a,
              status: 'completed' as const,
              prescriptionUrl: '#',
              followUpDate
            }
          : a
      );

      const patientNotification = {
        id: `notif-rx-${Date.now()}`,
        type: 'prescription' as const,
        title: 'Prescription Issued',
        message: `${appointment.doctorName} has finalized your consultation and issued an official digital prescription.`,
        appointmentId: appointment.id,
        doctorId: appointment.doctorId,
        read: false,
        createdAt: new Date().toISOString()
      };

      const updatedNotifs = [patientNotification, ...state.notifications];

      try {
        localStorage.setItem('smartcare_appointments', JSON.stringify(updatedAppointments));
        localStorage.setItem('smartcare_notifications', JSON.stringify(updatedNotifs));
      } catch {
        // storage fallback
      }

      return {
        appointments: updatedAppointments,
        notifications: updatedNotifs
      };
    });

    addToast({
      type: 'success',
      message: `Consultation completed! Digital Prescription issued for ${appointment.patientName}.`
    });

    setPreviewPrescription(created);
  };

  const handlePreviewPad = () => {
    const existing = getPrescriptionByAppointmentId(appointment.id);
    if (existing) {
      setPreviewPrescription(existing);
      return;
    }

    // Build draft preview
    const draft: DigitalPrescription = {
      id: 'preview-draft',
      appointmentId: appointment.id,
      referenceNumber: appointment.referenceNumber,
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      patientAge: patient?.age || 38,
      patientGender: patient?.gender || 'Male',
      patientMrn: patient?.mrn || 'MRN-KHI-1049',
      doctorId: appointment.doctorId,
      doctorName: appointment.doctorName,
      doctorSpecialization: appointment.doctorSpecialization,
      pmdcNumber: '48291-S',
      clinicName: appointment.clinicName,
      clinicAddress: appointment.clinicAddress,
      date: appointment.date,
      chiefComplaint,
      diagnosis,
      vitals,
      medications,
      labInvestigationsAdvised: selectedLabs,
      clinicalNotes,
      followUpDate,
      doctorSignature: `${user?.name || 'Dr. Ayesha Khan'}, MBBS, FCPS`,
      createdAt: new Date().toISOString()
    };
    setPreviewPrescription(draft);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/doctor/appointments')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0D7A5F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Consultation Queue</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant={appointment.status === 'completed' ? 'success' : 'primary'}>
            Session: {appointment.status.toUpperCase()}
          </Badge>
          <span className="text-xs font-mono text-slate-500">
            {appointment.referenceNumber}
          </span>
        </div>
      </div>

      {/* Patient Clinical Profile & High-Risk Allergy Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{appointment.patientName}</h2>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-mono rounded-lg">
                {patient?.mrn || 'MRN-KHI-1049'}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                Blood: {patient?.bloodGroup || 'B+'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {patient?.age || 38} Yrs &bull; {patient?.gender || 'Male'} &bull; Phone:{' '}
              <strong className="text-slate-700">{appointment.patientPhone}</strong> &bull; City:{' '}
              <strong className="text-slate-700">{patient?.city || 'Karachi'}</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Consultation Mode</span>
            <span className="text-xs font-bold text-[#0D7A5F] capitalize">
              {appointment.consultationType === 'online' ? 'Online Video Tele-Consult' : 'In-Clinic Physical Visit'}
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">
              Fee: Rs. {appointment.consultationFee.toLocaleString()}
            </span>
          </div>
        </div>

        {/* High-Risk Clinical Allergy Banner */}
        {patient && patient.allergies.length > 0 ? (
          <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-rose-900 block">
                  ALLERGY ALERT: Contraindicated Medications
                </span>
                <span className="text-xs text-rose-800">
                  Patient is allergic to: <strong>{patient.allergies.join(', ')}</strong>. Exercise extreme caution.
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-rose-200/80 text-rose-900 text-[10px] font-bold rounded-md uppercase">
              Strict Contraindication
            </span>
          </div>
        ) : (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>No known drug allergies reported.</span>
          </div>
        )}
      </div>

      {/* Online Video Consultation Room Simulation (if type is online) */}
      {appointment.consultationType === 'online' && (
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold tracking-wide">SmartCare Encrypted Tele-Health Room</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded-md text-[11px] font-mono text-emerald-400">
                256-Bit SSL Encrypted
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Live Duration: <strong>14:28</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64 sm:h-72">
            {/* Patient Video Stream */}
            <div className="md:col-span-2 bg-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-700">
              {callActive ? (
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-emerald-500 mx-auto flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {appointment.patientName.charAt(0)}
                  </div>
                  <p className="text-xs font-semibold text-slate-300">
                    {appointment.patientName} (Live Video Feed)
                  </p>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    Audio / Video Sync HD 1080p
                  </p>
                </div>
              ) : (
                <div className="text-center text-slate-500 text-xs">
                  Video Call Ended / Paused
                </div>
              )}

              {/* Doctor PiP Preview */}
              <div className="absolute bottom-3 right-3 w-28 h-20 bg-slate-900/90 rounded-xl border border-slate-700 p-1 flex flex-col justify-between text-[10px] text-slate-300">
                <span>Dr. Ayesha (You)</span>
                <span className="text-emerald-400 self-end">Live</span>
              </div>
            </div>

            {/* Video Controls & Diagnostics */}
            <div className="bg-slate-800/80 rounded-2xl p-4 flex flex-col justify-between border border-slate-700 text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">Patient Signal Quality</h4>
                <p className="text-[11px] text-slate-400">Latency: 28ms &bull; Clifton Fiber Optic</p>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-11/12" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className={`p-3 rounded-2xl transition-all ${
                    isVideoMuted ? 'bg-rose-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                  title={isVideoMuted ? 'Unmute' : 'Mute'}
                >
                  {isVideoMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsCameraOff(!isCameraOff)}
                  className={`p-3 rounded-2xl transition-all ${
                    isCameraOff ? 'bg-rose-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                  title={isCameraOff ? 'Start Video' : 'Stop Video'}
                >
                  {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setCallActive(!callActive)}
                  className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl transition-all"
                  title="Disconnect Call"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clinical Notes & Vitals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Clinical Vitals & Diagnosis */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0D7A5F]" />
              <span>Clinical Examination & Vitals</span>
            </h3>
            <span className="text-[11px] text-slate-400">Date: {appointment.date}</span>
          </div>

          {/* Vitals Form */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Recorded Vital Signs:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Blood Pressure</span>
                <input
                  type="text"
                  value={vitals.bloodPressure || ''}
                  onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                  placeholder="120/80"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Pulse (Heart Rate)</span>
                <input
                  type="text"
                  value={vitals.heartRate || ''}
                  onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                  placeholder="72 bpm"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">SpO2</span>
                <input
                  type="text"
                  value={vitals.oxygenSaturation || ''}
                  onChange={(e) => setVitals({ ...vitals, oxygenSaturation: e.target.value })}
                  placeholder="99%"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Temperature</span>
                <input
                  type="text"
                  value={vitals.temperature || ''}
                  onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                  placeholder="98.6 °F"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Weight</span>
                <input
                  type="text"
                  value={vitals.weight || ''}
                  onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                  placeholder="75 kg"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
                />
              </div>
            </div>
          </div>

          {/* Chief Complaint */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Chief Complaint & Symptoms:
            </label>
            <textarea
              rows={2}
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
            />
          </div>

          {/* Diagnosis */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Clinical Diagnosis & Assessment:
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Essential Hypertension, CAD, Arrhythmia..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
            />
          </div>

          {/* Lab Investigations */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Order Diagnostic Tests & Lab Investigations:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {COMMON_LAB_TESTS.map((test) => (
                <label
                  key={test}
                  className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                    selectedLabs.includes(test)
                      ? 'border-[#0D7A5F] bg-[#E6F4F1] font-semibold text-emerald-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedLabs.includes(test)}
                    onChange={() => handleToggleLab(test)}
                    className="text-[#0D7A5F] rounded-md focus:ring-[#0D7A5F]"
                  />
                  <span>{test}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Presets */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick Medication Presets (Pakistan)
          </h4>
          <p className="text-[11px] text-slate-500">
            Click to instantly append standardized dosage to the digital prescription pad:
          </p>

          <div className="space-y-2">
            {COMMON_PAKISTANI_MEDS.map((med, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickAddMed(med)}
                className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs text-left transition-all"
              >
                <div>
                  <span className="font-bold text-slate-800 block">{med.name}</span>
                  <span className="text-[10px] text-slate-500">
                    {med.dosage} &bull; {med.freq}
                  </span>
                </div>
                <Plus className="w-4 h-4 text-[#0D7A5F]" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Prescription Writer Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-black text-[#0D7A5F]">Rx</span>
            <h3 className="text-base font-bold text-slate-900">
              Digital Medical Prescription Writer
            </h3>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAddMedication}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Custom Medicine
          </Button>
        </div>

        {/* Medications Editor Table */}
        <div className="space-y-3">
          {medications.map((med) => (
            <div
              key={med.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs"
            >
              <div className="sm:col-span-4 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Medicine Name & Strength
                </span>
                <input
                  type="text"
                  value={med.medicineName}
                  onChange={(e) =>
                    handleUpdateMedication(med.id, 'medicineName', e.target.value)
                  }
                  placeholder="e.g. Tab. Concor 2.5mg"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Frequency</span>
                <input
                  type="text"
                  value={med.frequency}
                  onChange={(e) =>
                    handleUpdateMedication(med.id, 'frequency', e.target.value)
                  }
                  placeholder="1-0-1 / SOS"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Timing</span>
                <select
                  value={med.timing}
                  onChange={(e) =>
                    handleUpdateMedication(med.id, 'timing', e.target.value as MedicationItem['timing'])
                  }
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none"
                >
                  <option value="after-meal">After Meal</option>
                  <option value="before-meal">Before Meal</option>
                  <option value="with-meal">With Meal</option>
                </select>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Instructions</span>
                <input
                  type="text"
                  value={med.instructions}
                  onChange={(e) =>
                    handleUpdateMedication(med.id, 'instructions', e.target.value)
                  }
                  placeholder="Take with warm water..."
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveMedication(med.id)}
                  disabled={medications.length <= 1}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-30"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Advice & Follow-Up Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Dietary & Lifestyle Advice:
            </label>
            <textarea
              rows={2}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Advised Follow-Up Date:
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0D7A5F]" />
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Final Action Buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#0D7A5F]" />
            <span>Digital stamp with PMDC # 48291-S will be attached automatically.</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handlePreviewPad}
              leftIcon={<FileCheck className="w-4 h-4" />}
            >
              Preview Official Pad
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleFinalize}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Finalize Consultation & Sign Rx
            </Button>
          </div>
        </div>
      </div>

      {/* Official Prescription Pad Modal */}
      <PrescriptionModal
        prescription={previewPrescription}
        isOpen={!!previewPrescription}
        onClose={() => setPreviewPrescription(null)}
      />
    </div>
  );
};
