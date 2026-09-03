import React from 'react';
import { Building2, Video, Calendar, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { Doctor } from '../../types/doctor';
import { AppointmentConsultationType } from '../../types/appointment';
import { formatPKR } from '../../utils/formatters';
import { appointmentService } from '../../services/appointmentService';

interface BookingConfirmCardProps {
  doctor: Doctor;
  consultationType: AppointmentConsultationType;
  date: string;
  time: string;
  notes: string;
}

export const BookingConfirmCard: React.FC<BookingConfirmCardProps> = ({
  doctor,
  consultationType,
  date,
  time,
  notes,
}) => {
  const isOnline = consultationType === 'online';
  const fee = isOnline ? Math.round(doctor.consultationFee * 0.9) : doctor.consultationFee;
  const formattedDate = appointmentService.formatAppointmentDate(date);

  return (
    <div className="bg-white rounded-3xl border-2 border-[#0D7A5F]/30 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D7A5F] to-[#084E3D] px-6 py-4 text-white">
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-200">
          Booking Summary
        </div>
        <div className="text-lg font-extrabold mt-0.5">SmartCare Appointment</div>
      </div>

      {/* Doctor Info */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100">
        <img
          src={doctor.avatarUrl}
          alt={doctor.name}
          className="w-14 h-14 rounded-2xl object-cover object-top border border-slate-200 shrink-0"
        />
        <div>
          <div className="text-sm font-bold text-slate-900">{doctor.name}</div>
          <div className="text-xs text-[#0D7A5F] font-semibold">{doctor.title}</div>
          <div className="flex items-center gap-1 mt-1">
            {doctor.pmdcVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3" /> PMDC Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="px-6 py-5 space-y-3.5 border-b border-slate-100">
        <div className="flex items-start gap-3 text-xs">
          <div className="flex items-center gap-2 w-40 text-slate-500 shrink-0">
            {isOnline ? (
              <Video className="w-4 h-4 text-sky-500 shrink-0" />
            ) : (
              <Building2 className="w-4 h-4 text-[#0D7A5F] shrink-0" />
            )}
            <span className="font-semibold">Consultation:</span>
          </div>
          <span className="font-bold text-slate-900">
            {isOnline ? 'Online Video Call' : 'In-Clinic Visit'}
          </span>
        </div>

        <div className="flex items-start gap-3 text-xs">
          <div className="flex items-center gap-2 w-40 text-slate-500 shrink-0">
            <Calendar className="w-4 h-4 text-[#0D7A5F] shrink-0" />
            <span className="font-semibold">Date:</span>
          </div>
          <span className="font-bold text-slate-900">{formattedDate}</span>
        </div>

        <div className="flex items-start gap-3 text-xs">
          <div className="flex items-center gap-2 w-40 text-slate-500 shrink-0">
            <Clock className="w-4 h-4 text-[#0D7A5F] shrink-0" />
            <span className="font-semibold">Time (PKT):</span>
          </div>
          <span className="font-bold text-slate-900">{time}</span>
        </div>

        {!isOnline && (
          <div className="flex items-start gap-3 text-xs">
            <div className="flex items-center gap-2 w-40 text-slate-500 shrink-0">
              <MapPin className="w-4 h-4 text-[#0D7A5F] shrink-0" />
              <span className="font-semibold">Location:</span>
            </div>
            <div>
              <div className="font-bold text-slate-900">{doctor.clinicName}</div>
              <div className="text-slate-500">{doctor.clinicAddress}</div>
            </div>
          </div>
        )}

        {isOnline && (
          <div className="flex items-start gap-3 text-xs">
            <div className="flex items-center gap-2 w-40 text-slate-500 shrink-0">
              <Video className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="font-semibold">Meeting Link:</span>
            </div>
            <span className="text-sky-700 font-semibold">Will be sent to your email before the session</span>
          </div>
        )}

        {notes && (
          <div className="flex items-start gap-3 text-xs">
            <div className="flex items-center gap-2 w-40 text-slate-500 shrink-0">
              <span className="font-semibold pl-6">Your Notes:</span>
            </div>
            <span className="text-slate-600 italic">"{notes}"</span>
          </div>
        )}
      </div>

      {/* Fee Summary */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Consultation Fee</span>
          <span>{formatPKR(doctor.consultationFee)}</span>
        </div>
        {isOnline && (
          <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold mb-1">
            <span>Online Discount (10%)</span>
            <span>- {formatPKR(doctor.consultationFee - fee)}</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
          <span className="text-sm font-bold text-slate-900">Total Payable</span>
          <span className="text-lg font-extrabold text-[#0D7A5F]">{formatPKR(fee)}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-2">
          {isOnline
            ? 'Payment via EasyPaisa, JazzCash, or bank transfer before the session.'
            : 'Payable directly at the clinic reception on the day of your visit.'}
        </p>
      </div>
    </div>
  );
};
