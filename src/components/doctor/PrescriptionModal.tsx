import React from 'react';
import {
  Printer,
  X,
  ShieldCheck,
  Calendar,
  Activity,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { DigitalPrescription } from '../../types/doctorPortal';
import { Button } from '../common/Button';

interface PrescriptionModalProps {
  prescription: DigitalPrescription | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  prescription,
  isOpen,
  onClose
}) => {
  if (!isOpen || !prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#E6F4F1] text-[#0D7A5F] rounded-lg">
              <FileCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-700">
              Official Digital Medical Prescription
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              Ref: {prescription.referenceNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-3.5 h-3.5" />}
            >
              Print / Save PDF
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prescription Pad Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white space-y-6 text-slate-800 font-sans">
          {/* Hospital / Clinic Header */}
          <div className="border-b-2 border-[#0D7A5F] pb-5">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#0D7A5F] tracking-tight">SmartCare</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Clinical Network
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {prescription.clinicName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {prescription.clinicAddress}
                </p>
                <p className="text-xs text-slate-400">
                  UAN: +92 21 111-762-782 &bull; emergency@smartcare.pk
                </p>
              </div>

              {/* Doctor Details & PMDC Stamp */}
              <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <h4 className="text-sm font-black text-slate-900">
                  {prescription.doctorName}
                </h4>
                <p className="text-xs font-semibold text-[#0D7A5F]">
                  MBBS, FCPS ({prescription.doctorSpecialization})
                </p>
                <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md text-[11px] font-bold text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D7A5F]" />
                  <span>PMDC Reg: {prescription.pmdcNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details & Vitals Strip */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                <span className="font-bold text-slate-900">{prescription.patientName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">MRN Number</span>
                <span className="font-mono font-semibold text-slate-700">{prescription.patientMrn}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Age / Gender</span>
                <span className="font-medium text-slate-800">
                  {prescription.patientAge} Yrs / {prescription.patientGender}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Prescription Date</span>
                <span className="font-medium text-slate-800">{prescription.date}</span>
              </div>
            </div>

            {/* Vitals Summary */}
            {prescription.vitals && Object.keys(prescription.vitals).length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-[#0D7A5F] font-bold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Vitals:</span>
                </div>
                {prescription.vitals.bloodPressure && (
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                    BP: <strong>{prescription.vitals.bloodPressure}</strong>
                  </span>
                )}
                {prescription.vitals.heartRate && (
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                    Pulse: <strong>{prescription.vitals.heartRate}</strong>
                  </span>
                )}
                {prescription.vitals.oxygenSaturation && (
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                    SpO2: <strong>{prescription.vitals.oxygenSaturation}</strong>
                  </span>
                )}
                {prescription.vitals.weight && (
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                    Wt: <strong>{prescription.vitals.weight}</strong>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Chief Complaint & Diagnosis */}
          <div className="space-y-3">
            {prescription.chiefComplaint && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Chief Complaint & Symptoms:
                </span>
                <p className="text-xs text-slate-700 mt-0.5 italic">
                  &ldquo;{prescription.chiefComplaint}&rdquo;
                </p>
              </div>
            )}

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Clinical Diagnosis:
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {prescription.diagnosis}
              </p>
            </div>
          </div>

          {/* Rx Medications Table */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-serif font-black text-[#0D7A5F]">Rx</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Prescribed Medications
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <th className="p-3 w-10">#</th>
                    <th className="p-3">Medicine & Strength</th>
                    <th className="p-3">Dosage / Frequency</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prescription.medications.map((med, idx) => (
                    <tr key={med.id || idx} className="hover:bg-slate-50/50">
                      <td className="p-3 text-slate-400 font-medium">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900">
                        {med.medicineName}
                        <span className="block text-[11px] font-normal text-slate-500">
                          {med.dosage}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-800 font-semibold rounded-md border border-emerald-100">
                          {med.frequency}
                        </span>
                        <span className="block text-[10px] text-slate-400 capitalize mt-0.5">
                          {med.timing.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-slate-700">{med.duration}</td>
                      <td className="p-3 text-slate-600 text-[11px]">{med.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Diagnostic Investigations Advised */}
          {prescription.labInvestigationsAdvised && prescription.labInvestigationsAdvised.length > 0 && (
            <div className="p-4 bg-amber-50/50 border border-amber-200/70 rounded-2xl space-y-1.5">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Laboratory / Diagnostic Investigations Advised:
              </span>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 ml-1">
                {prescription.labInvestigationsAdvised.map((test, i) => (
                  <li key={i}>{test}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Clinical Advice / Lifestyle Remarks */}
          {prescription.clinicalNotes && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Special Clinical Advice / Dietary Guidelines:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {prescription.clinicalNotes}
              </p>
            </div>
          )}

          {/* Footer: Follow Up & Digital Signature Stamp */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            {/* Follow up date */}
            <div>
              {prescription.followUpDate ? (
                <div className="inline-flex items-center gap-2 p-2.5 bg-[#E6F4F1] border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900">
                  <Calendar className="w-4 h-4 text-[#0D7A5F]" />
                  <span>Next Clinical Follow-up: <strong>{prescription.followUpDate}</strong></span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">Follow up as needed if symptoms persist.</span>
              )}
            </div>

            {/* Official Digital Signature & PMDC Stamp */}
            <div className="text-right space-y-1">
              <div className="border border-emerald-300 bg-emerald-50/30 p-3 rounded-xl inline-block text-center min-w-[200px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Digitally Verified & Signed
                </span>
                <span className="font-serif italic text-base font-bold text-slate-800 block">
                  {prescription.doctorSignature}
                </span>
                <span className="text-[10px] font-mono text-[#0D7A5F] font-bold block mt-0.5">
                  PMDC # {prescription.pmdcNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
