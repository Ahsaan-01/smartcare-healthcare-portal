import React from 'react';
import {
  X,
  AlertTriangle,
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DoctorPatientRecord } from '../../types/doctorPortal';
import { Button } from '../common/Button';

interface PatientDrawerProps {
  patient: DoctorPatientRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onViewPrescription?: (prescriptionId: string) => void;
  onStartConsultation?: (patientId: string) => void;
}

export const PatientDrawer: React.FC<PatientDrawerProps> = ({
  patient,
  isOpen,
  onClose,
  onViewPrescription,
  onStartConsultation
}) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#E6F4F1] text-[#0D7A5F] rounded-lg">
              <HeartPulse className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Medical Patient File</h3>
              <p className="text-[11px] font-mono text-slate-500">{patient.mrn}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Patient Profile Card */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">{patient.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                  <span>{patient.age} Yrs &bull; {patient.gender}</span>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded-md border border-rose-100 text-[10px]">
                    Blood: {patient.bloodGroup}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-[#0D7A5F] rounded-full border border-emerald-200">
                {patient.totalVisits} Visits
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.city}, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last: {patient.lastVisitDate}</span>
              </div>
            </div>
          </div>

          {/* High-Risk Allergy Alert Banner */}
          {patient.allergies.length > 0 ? (
            <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600 animate-bounce" />
                <span>Clinical Allergy Alert</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {patient.allergies.map((allergy, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white text-rose-800 font-bold text-xs rounded-lg border border-rose-200 shadow-2xs"
                  >
                    Contraindicated: {allergy}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-rose-700 mt-1">
                Caution: Do not prescribe cross-reactive medications without alternative allergy prophylaxis.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Known Drug Allergies (NKDA) reported by patient.</span>
            </div>
          )}

          {/* Chronic Conditions */}
          <div>
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Chronic Medical Conditions
            </h5>
            {patient.chronicConditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patient.chronicConditions.map((cond, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200"
                  >
                    {cond}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No chronic medical conditions recorded.</p>
            )}
          </div>

          {/* Last Clinical Diagnosis */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Most Recent Clinical Diagnosis
            </span>
            <p className="text-xs font-bold text-slate-900">
              {patient.lastDiagnosis}
            </p>
          </div>

          {/* Visit & Consultation History */}
          <div>
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Consultation & Prescription History
            </h5>
            <div className="space-y-3">
              {patient.visitHistory.length > 0 ? (
                patient.visitHistory.map((visit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-800">{visit.date}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium capitalize text-[10px]">
                        {visit.consultationType}
                      </span>
                    </div>

                    <p className="text-slate-700">
                      <strong>Diagnosis:</strong> {visit.diagnosis}
                    </p>

                    {visit.prescriptionId && onViewPrescription && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onViewPrescription(visit.prescriptionId!)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D7A5F] hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Official Prescription &rarr;</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No previous consultation records for this patient.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close File
          </Button>

          {onStartConsultation && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onStartConsultation(patient.id)}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            >
              Start Consultation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
