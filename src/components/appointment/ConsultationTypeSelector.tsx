import React from 'react';
import { Building2, Video, CheckCircle2 } from 'lucide-react';
import { AppointmentConsultationType } from '../../types/appointment';
import { ConsultationType } from '../../types/doctor';
import { formatPKR } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface ConsultationTypeSelectorProps {
  doctorConsultationType: ConsultationType; // 'in-clinic' | 'online' | 'both'
  selected: AppointmentConsultationType | null;
  onSelect: (type: AppointmentConsultationType) => void;
  consultationFee: number;
}

export const ConsultationTypeSelector: React.FC<ConsultationTypeSelectorProps> = ({
  doctorConsultationType,
  selected,
  onSelect,
  consultationFee,
}) => {
  const canInClinic = doctorConsultationType === 'in-clinic' || doctorConsultationType === 'both';
  const canOnline = doctorConsultationType === 'online' || doctorConsultationType === 'both';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* In-Clinic Option */}
      <button
        type="button"
        disabled={!canInClinic}
        onClick={() => canInClinic && onSelect('in-clinic')}
        className={cn(
          'relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-200 focus:outline-none',
          !canInClinic
            ? 'border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed'
            : selected === 'in-clinic'
            ? 'border-[#0D7A5F] bg-[#E6F4F1]/60 shadow-md shadow-[#0D7A5F]/10'
            : 'border-slate-200 bg-white hover:border-[#0D7A5F]/50 cursor-pointer'
        )}
      >
        {selected === 'in-clinic' && (
          <div className="absolute top-3 right-3 text-[#0D7A5F]">
            <CheckCircle2 className="w-5 h-5 fill-[#0D7A5F] text-white" />
          </div>
        )}
        <div className="w-11 h-11 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0D7A5F]">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900">In-Clinic Visit</div>
          <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Physical consultation at the doctor's clinic. Bring all previous reports and prescriptions.
          </div>
        </div>
        <div className="pt-1 border-t border-slate-200/80 w-full">
          <span className="text-base font-extrabold text-slate-900">{formatPKR(consultationFee)}</span>
          <span className="text-xs text-slate-400 ml-1.5">/ visit — Payable at clinic</span>
        </div>
      </button>

      {/* Video Consultation Option */}
      <button
        type="button"
        disabled={!canOnline}
        onClick={() => canOnline && onSelect('online')}
        className={cn(
          'relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-200 focus:outline-none',
          !canOnline
            ? 'border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed'
            : selected === 'online'
            ? 'border-sky-500 bg-sky-50/60 shadow-md shadow-sky-500/10'
            : 'border-slate-200 bg-white hover:border-sky-400/50 cursor-pointer'
        )}
      >
        {selected === 'online' && (
          <div className="absolute top-3 right-3 text-sky-600">
            <CheckCircle2 className="w-5 h-5 fill-sky-600 text-white" />
          </div>
        )}
        <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
          <Video className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900">Video Consultation</div>
          <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Secure encrypted video call. Meeting link will be sent to your registered email before the session.
          </div>
        </div>
        <div className="pt-1 border-t border-slate-200/80 w-full">
          <span className="text-base font-extrabold text-slate-900">
            {formatPKR(Math.round(consultationFee * 0.9))}
          </span>
          <span className="text-xs text-slate-400 ml-1.5">/ session — 10% online discount</span>
        </div>
      </button>
    </div>
  );
};
