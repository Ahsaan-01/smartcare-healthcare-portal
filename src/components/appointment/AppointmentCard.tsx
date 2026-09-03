import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Building2,
  ShieldCheck,
  FileText,
  XCircle
} from 'lucide-react';
import { Appointment } from '../../types/appointment';
import { Button } from '../common/Button';
import { formatPKR } from '../../utils/formatters';
import { appointmentService } from '../../services/appointmentService';
import { cn } from '../../utils/cn';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
}

const statusConfig = {
  confirmed: { label: 'Confirmed', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  pending: { label: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  completed: { label: 'Completed', className: 'bg-sky-50 text-sky-700 border-sky-200' },
  cancelled: { label: 'Cancelled', className: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel }) => {
  const { label: statusLabel, className: statusClass } = statusConfig[appointment.status];
  const countdown = appointmentService.getCountdownLabel(appointment.date);
  const isUpcoming = appointment.status === 'confirmed' || appointment.status === 'pending';
  const isCompleted = appointment.status === 'completed';
  const isCancelled = appointment.status === 'cancelled';

  return (
    <div className={cn(
      'bg-white rounded-2xl border shadow-soft p-5 sm:p-6 space-y-4 transition-all duration-200',
      isCancelled ? 'border-rose-100 opacity-80' : 'border-slate-200 hover:border-slate-300'
    )}>
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={appointment.doctorAvatarUrl}
            alt={appointment.doctorName}
            className="w-12 h-12 rounded-xl object-cover object-top border border-slate-100 shrink-0"
          />
          <div>
            <div className="text-sm font-bold text-slate-900">{appointment.doctorName}</div>
            <div className="text-xs text-[#0D7A5F] font-semibold">{appointment.doctorSpecialization}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ref: {appointment.referenceNumber}</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border', statusClass)}>
            <ShieldCheck className="w-3 h-3" />
            {statusLabel}
          </span>
          {isUpcoming && (
            <span className={cn(
              'text-[10px] font-bold px-2 py-0.5 rounded-md',
              countdown.urgency === 'today' ? 'bg-red-50 text-red-600' :
              countdown.urgency === 'soon' ? 'bg-amber-50 text-amber-700' :
              'bg-slate-50 text-slate-500'
            )}>
              {countdown.label}
            </span>
          )}
        </div>
      </div>

      {/* Appointment Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-[#0D7A5F] shrink-0" />
          <span className="font-semibold">{appointmentService.formatAppointmentDate(appointment.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-[#0D7A5F] shrink-0" />
          <span className="font-semibold">{appointment.time} (PKT)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          {appointment.consultationType === 'online' ? (
            <Video className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          ) : (
            <Building2 className="w-3.5 h-3.5 text-[#0D7A5F] shrink-0" />
          )}
          <span>{appointment.consultationType === 'online' ? 'Video Consultation' : 'In-Clinic Visit'}</span>
        </div>
        {appointment.consultationType === 'in-clinic' && (
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{appointment.clinicName}, {appointment.city}</span>
          </div>
        )}
      </div>

      {/* Cancellation reason */}
      {isCancelled && appointment.cancellationReason && (
        <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-100 p-3 rounded-xl">
          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Cancellation Reason:</div>
            <div className="text-rose-600">{appointment.cancellationReason}</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold block">Fee</span>
          <span className="text-base font-extrabold text-slate-900">{formatPKR(appointment.consultationFee)}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Doctor Profile */}
          <Link to={`/doctors/${appointment.doctorId}`}>
            <Button variant="outline" size="sm">
              View Doctor
            </Button>
          </Link>

          {/* Prescription button for completed */}
          {isCompleted && appointment.prescriptionUrl && (
            <a href={appointment.prescriptionUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" leftIcon={<FileText className="w-3.5 h-3.5" />}>
                Prescription
              </Button>
            </a>
          )}

          {/* Cancel button for upcoming */}
          {isUpcoming && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCancel(appointment.id)}
              className="text-rose-600 hover:bg-rose-50"
            >
              Cancel
            </Button>
          )}

          {/* Book again for cancelled */}
          {isCancelled && (
            <Link to={`/patient/book/${appointment.doctorId}`}>
              <Button variant="primary" size="sm">
                Book Again
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
