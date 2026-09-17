import React, { useState } from 'react';
import {
  ShieldCheck,
  X,
  Building2,
  GraduationCap,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { AdminDoctorRecord } from '../../types/admin';
import { Button } from '../common/Button';

interface VerifyDoctorModalProps {
  doctor: AdminDoctorRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export const VerifyDoctorModal: React.FC<VerifyDoctorModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onVerify,
  onReject
}) => {
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  if (!isOpen || !doctor) return null;

  const handleApprove = () => {
    onVerify(doctor.id);
    onClose();
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) return;
    onReject(doctor.id, rejectReason.trim());
    setRejectReason('');
    setRejectMode(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                PMDC Credential Audit & Verification
              </h3>
              <p className="text-xs text-slate-400">
                Review applicant medical license against official PMDC registry records.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Summary Card */}
        <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4">
          <img
            src={doctor.avatarUrl}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400/30"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">{doctor.name}</h4>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {doctor.verificationStatus.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-300">{doctor.title}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span>City: <strong className="text-white font-semibold">{doctor.city}</strong></span>
              <span>&bull;</span>
              <span>Exp: <strong className="text-white font-semibold">{doctor.experienceYears} Years</strong></span>
              <span>&bull;</span>
              <span>Fee: <strong className="text-amber-400 font-semibold">Rs. {doctor.consultationFee}</strong></span>
            </div>
          </div>
        </div>

        {/* Verification Checkpoint Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              PMDC Registration Number
            </span>
            <p className="text-sm font-mono font-bold text-white">{doctor.pmdcNumber}</p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Format compliant with Pakistan Medical Commission
            </span>
          </div>

          <div className="p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Hospital / Clinic Facility
            </span>
            <p className="font-semibold text-white truncate">{doctor.clinicName}</p>
            <p className="text-[11px] text-slate-400 truncate">{doctor.clinicAddress}</p>
          </div>

          <div className="sm:col-span-2 p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#0D7A5F]" />
              Academic Credentials & Fellowships
            </span>
            <div className="space-y-1">
              {doctor.education.map((edu, i) => (
                <div key={i} className="text-slate-300 flex items-center justify-between text-[11px]">
                  <span><strong>{edu.degree}</strong> &bull; {edu.institution}</span>
                  <span className="text-slate-500 font-mono">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rejection Input Box if rejectMode is on */}
        {rejectMode && (
          <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-2">
            <label className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Specify Rejection Reason (Notified to Doctor):
            </label>
            <textarea
              rows={2}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. PMDC registration number mismatch with official registry, or missing degree verification..."
              className="w-full text-xs p-3 bg-slate-900 border border-rose-700/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Window
          </Button>

          <div className="flex items-center gap-2">
            {!rejectMode ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRejectMode(true)}
                  className="text-rose-400 hover:bg-rose-950/40 border-rose-800/60"
                  leftIcon={<XCircle className="w-4 h-4" />}
                >
                  Reject Application
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApprove}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Approve PMDC & Activate
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRejectMode(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleConfirmReject}
                  disabled={!rejectReason.trim()}
                >
                  Confirm Rejection
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
