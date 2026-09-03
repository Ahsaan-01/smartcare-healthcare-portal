import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface CancellationModalProps {
  isOpen: boolean;
  appointmentRef: string;
  doctorName: string;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

const CANCELLATION_REASONS = [
  'Schedule conflict — work or family emergency',
  'Feeling better — no longer need consultation',
  'Found a closer / preferred doctor',
  'Doctor unavailable / rescheduled by clinic',
  'Financial reasons',
  'Other reason',
];

export const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  appointmentRef,
  doctorName,
  onConfirm,
  onClose,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalReason = selectedReason === 'Other reason' && customReason.trim()
    ? customReason.trim()
    : selectedReason;

  const handleConfirm = async () => {
    if (!finalReason) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    onConfirm(finalReason);
    setIsSubmitting(false);
    setSelectedReason('');
    setCustomReason('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Appointment">
      <div className="space-y-5">
        {/* Warning Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800">
            <div className="font-bold mb-0.5">Are you sure?</div>
            <div className="text-amber-700">
              You are cancelling appointment <strong>{appointmentRef}</strong> with{' '}
              <strong>{doctorName}</strong>. This action cannot be undone.
            </div>
          </div>
        </div>

        {/* Reason Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Please select a cancellation reason: *
          </label>
          <div className="space-y-2">
            {CANCELLATION_REASONS.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="cancellation-reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="text-[#0D7A5F] focus:ring-[#0D7A5F]"
                />
                <span className="text-xs font-medium text-slate-700">{reason}</span>
              </label>
            ))}
          </div>

          {/* Custom reason textarea */}
          {selectedReason === 'Other reason' && (
            <textarea
              rows={3}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Please describe your reason..."
              className="w-full mt-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onClose}
            leftIcon={<X className="w-3.5 h-3.5" />}
          >
            Keep Appointment
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1 bg-rose-600 hover:bg-rose-700 focus:ring-rose-500"
            disabled={!finalReason}
            isLoading={isSubmitting}
            onClick={handleConfirm}
          >
            Confirm Cancellation
          </Button>
        </div>
      </div>
    </Modal>
  );
};
