import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  HeartPulse,
  Calendar,
  Phone,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useDoctorStore } from '../../store/useDoctorStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { PatientDrawer } from '../../components/doctor/PatientDrawer';
import { PrescriptionModal } from '../../components/doctor/PrescriptionModal';
import { DoctorPatientRecord, DigitalPrescription } from '../../types/doctorPortal';

export const DoctorPatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientRecords, getPrescriptionById } = useDoctorStore();
  const { appointments } = useAppointmentStore();
  const { addToast } = useToastStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
  const [allergyFilter, setAllergyFilter] = useState<'all' | 'allergic' | 'no-allergy'>('all');

  const [selectedPatient, setSelectedPatient] = useState<DoctorPatientRecord | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<DigitalPrescription | null>(null);

  // Filtered patients
  const filteredPatients = patientRecords.filter((patient) => {
    // Blood group filter
    if (bloodGroupFilter !== 'all' && patient.bloodGroup !== bloodGroupFilter) {
      return false;
    }

    // Allergy filter
    if (allergyFilter === 'allergic' && patient.allergies.length === 0) {
      return false;
    }
    if (allergyFilter === 'no-allergy' && patient.allergies.length > 0) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = patient.name.toLowerCase().includes(q);
      const matchMrn = patient.mrn.toLowerCase().includes(q);
      const matchPhone = patient.phone.toLowerCase().includes(q);
      const matchDiag = patient.lastDiagnosis.toLowerCase().includes(q);
      if (!matchName && !matchMrn && !matchPhone && !matchDiag) {
        return false;
      }
    }

    return true;
  });

  const handleStartConsultation = (patientId: string) => {
    const todayAppt = appointments.find(
      (a) => a.patientId === patientId && a.status === 'confirmed'
    );
    if (todayAppt) {
      navigate(`/doctor/consultations/${todayAppt.id}`);
    } else {
      addToast({
        type: 'info',
        message: 'No confirmed slot found for today. Navigating to queue...'
      });
      navigate('/doctor/appointments');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Patient Medical Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Comprehensive patient history, allergy warnings, chronic conditions, and previous clinical diagnoses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
            {patientRecords.length} Active Patients
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, MRN (MRN-KHI...), phone, or diagnosis..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Blood Group Filter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="all">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Allergy Filter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700">
            <select
              value={allergyFilter}
              onChange={(e) =>
                setAllergyFilter(e.target.value as 'all' | 'allergic' | 'no-allergy')
              }
              className="bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="all">All Allergy Statuses</option>
              <option value="allergic">Has Drug Allergies</option>
              <option value="no-allergy">No Known Allergies (NKDA)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
            >
              {/* Top Section */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {patient.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-mono text-[11px]">{patient.mrn}</span>
                      <span>&bull;</span>
                      <span>{patient.age} Yrs &bull; {patient.gender}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold text-xs rounded-lg border border-rose-100">
                    {patient.bloodGroup}
                  </span>
                </div>

                {/* Allergy Badge or Clean */}
                {patient.allergies.length > 0 ? (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="font-semibold line-clamp-1">
                      Allergy: {patient.allergies.join(', ')}
                    </span>
                  </div>
                ) : (
                  <div className="p-2 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center gap-1.5 text-xs text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>NKDA (No known drug allergies)</span>
                  </div>
                )}

                {/* Chronic Conditions */}
                <div className="flex flex-wrap gap-1.5">
                  {patient.chronicConditions.map((cond, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md"
                    >
                      {cond}
                    </span>
                  ))}
                </div>

                {/* Last Diagnosis */}
                <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl space-y-0.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Last Diagnosis
                  </span>
                  <p className="font-medium text-slate-800 line-clamp-2">
                    {patient.lastDiagnosis}
                  </p>
                </div>
              </div>

              {/* Bottom Details & Action */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {patient.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {patient.lastVisitDate}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedPatient(patient)}
                    leftIcon={<FileText className="w-3.5 h-3.5" />}
                  >
                    View File
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleStartConsultation(patient.id)}
                    leftIcon={<HeartPulse className="w-3.5 h-3.5" />}
                  >
                    Examine
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No Patient Records Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No patients match the specified search query or blood group filter.
            </p>
          </div>
        )}
      </div>

      {/* Patient Medical History Drawer */}
      <PatientDrawer
        patient={selectedPatient}
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onViewPrescription={(rxId) => {
          const rx = getPrescriptionById(rxId);
          if (rx) setSelectedPrescription(rx);
        }}
        onStartConsultation={handleStartConsultation}
      />

      {/* Official Prescription Pad Modal */}
      <PrescriptionModal
        prescription={selectedPrescription}
        isOpen={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
      />
    </div>
  );
};
