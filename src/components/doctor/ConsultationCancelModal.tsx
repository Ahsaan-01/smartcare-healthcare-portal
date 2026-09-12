import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../common/Button';

interface ConsultationCancelModalProps {
  isOpen: boolean;
  appointmentId: string | null;
  patientName: string;
  onClose: () => void;
  onConfirm: (appointmentId: string, reason: string) => void;
}

const PRESET_REASONS = [
  'Hospital on-call emergency / urgent OT surgery (NICVD)',
  'Doctor medical emergency / sudden indisposition',
  'Patient requested cancellation via phone call',
  'Severe power / internet disruption for tele-consultation',
  'Clinic infrastructure maintenance in Clifton',
  'Other operational / clinical conflict'
];

export const ConsultationCancelModal: React.FC<ConsultationCancelModalProps> = ({
  isOpen,
  appointmentId,
  patientName,
  onClose,
  onConfirm
}) => {
  const [selectedReason, setSelectedReason] = useState(PRESET_REASONS[0]);
  const [customNote, setCustomNote] = useState('');

  if (!isOpen || !appointmentId) return null;

  const handleConfirm = () => {
    const fullReason = customNote.trim()
      ? `${selectedReason}: ${customNote.trim()}`
      : selectedReason;
    onConfirm(appointmentId, fullReason);
    setCustomNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cancel Consultation
              </h3>
              <p className="text-xs text-slate-500">
                Patient: <span className="font-semibold text-slate-800">{patientName}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Cancelling this appointment will immediately notify the patient via their SmartCare portal notification feed and SMS. Please specify the clinical reason:
        </p>

        {/* Reason Presets */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Reason for Cancellation:
          </label>
          <div className="space-y-1.5">
            {PRESET_REASONS.map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedReason === reason
                    ? 'border-rose-300 bg-rose-50/50 font-semibold text-rose-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="cancelReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="text-rose-600 focus:ring-rose-500"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Note */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Additional Patient Advice or Reschedule Instructions (Optional):
          </label>
          <textarea
            rows={2}
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="e.g. Please book for tomorrow evening session or contact receptionist..."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0D7A5F] focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Keep Appointment
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleConfirm}
          >
            Confirm Cancellation
          </Button>
        </div>
      </div>
    </div>
  );
};
