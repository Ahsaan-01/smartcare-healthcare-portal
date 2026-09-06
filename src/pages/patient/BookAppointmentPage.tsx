import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  FileCheck
} from 'lucide-react';
import { BookingStepIndicator } from '../../components/appointment/BookingStepIndicator';
import { ConsultationTypeSelector } from '../../components/appointment/ConsultationTypeSelector';
import { DatePicker } from '../../components/appointment/DatePicker';
import { TimeSlotGrid } from '../../components/appointment/TimeSlotGrid';
import { BookingConfirmCard } from '../../components/appointment/BookingConfirmCard';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from '../../store/useToastStore';
import { Doctor } from '../../types/doctor';
import { DoctorSlotDay } from '../../types/appointment';
import { formatPKR } from '../../utils/formatters';

export const BookAppointmentPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    booking,
    initBooking,
    setConsultationType,
    setSelectedDate,
    setSelectedSlot,
    setPatientNotes,
    goToStep,
    confirmBooking,
    resetBooking
  } = useAppointmentStore();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [slotDays, setSlotDays] = useState<DoctorSlotDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize doctor & slots
  useEffect(() => {
    if (!doctorId) return;
    setIsLoading(true);
    doctorService.getDoctorById(doctorId).then((doc) => {
      setDoctor(doc || null);
      if (doc) {
        initBooking(doc.id);
        const days = appointmentService.getSlotsForDoctor(doc.id);
        setSlotDays(days);
        // Preselect today if available
        if (days.length > 0) {
          setSelectedDate(days[0].date);
        }
      }
      setIsLoading(false);
    });

    return () => {
      resetBooking();
    };
  }, [doctorId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading doctor booking engine...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          title="Doctor Not Found"
          description="The doctor you are trying to book an appointment with does not exist or has been relocated."
          actionLabel="Browse Available Doctors"
          onAction={() => navigate('/find-doctors')}
        />
      </div>
    );
  }

  // Selected date slot day
  const currentSlotDay = slotDays.find((d) => d.date === booking.selectedDate);

  // Consultation mode fee
  const effectiveFee =
    booking.consultationType === 'online'
      ? Math.round(doctor.consultationFee * 0.9)
      : doctor.consultationFee;

  const handleNextStep = () => {
    if (booking.step === 1) {
      if (!booking.consultationType) {
        toast.error('Please choose In-Clinic or Video Consultation');
        return;
      }
      goToStep(2);
    } else if (booking.step === 2) {
      if (!booking.selectedDate) {
        toast.error('Please pick a consultation date');
        return;
      }
      goToStep(3);
    } else if (booking.step === 3) {
      if (!booking.selectedSlotId || !booking.selectedTime) {
        toast.error('Please select an available time slot');
        return;
      }
      goToStep(4);
    }
  };

  const handleConfirmSubmit = async () => {
    if (!booking.consultationType || !booking.selectedDate || !booking.selectedTime) {
      toast.error('Please complete all booking steps');
      return;
    }

    const patientId = user?.id || 'patient-1';
    const patientName = user?.name || 'Muhammad Tariq';
    const patientPhone = user?.phone || '+92 300 4567890';
    const patientEmail = user?.email || 'patient@smartcare.pk';

    try {
      const refNumber = await confirmBooking({
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialization: doctor.specialization,
        doctorAvatarUrl: doctor.avatarUrl,
        clinicName: doctor.clinicName,
        clinicAddress: doctor.clinicAddress,
        city: doctor.city,
        patientId,
        patientName,
        patientPhone,
        patientEmail,
        date: booking.selectedDate,
        time: booking.selectedTime,
        consultationType: booking.consultationType,
        consultationFee: effectiveFee,
        notes: booking.patientNotes.trim() || undefined,
        videoCallLink:
          booking.consultationType === 'online'
            ? `https://meet.smartcare.pk/${Math.random().toString(36).slice(2, 8)}`
            : undefined
      });

      toast.success(`Appointment confirmed! Reference: ${refNumber}`);
    } catch {
      toast.error('Failed to confirm booking. Please try again.');
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (booking.isSuccess && booking.confirmedReferenceNumber) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-in fade-in zoom-in-95">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 text-[#0D7A5F] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 fill-[#0D7A5F] text-white" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#E6F4F1] text-[#0D7A5F] text-xs font-bold uppercase tracking-wider">
              Booking Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Appointment Scheduled Successfully!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Your consultation has been registered in the clinic's schedule. A confirmation SMS & email notification have been dispatched.
            </p>
          </div>

          {/* Reference Badge */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              Appointment Reference Number
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#0D7A5F]">
              {booking.confirmedReferenceNumber}
            </div>
          </div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-slate-400 block font-medium">Doctor:</span>
              <span className="font-bold text-slate-900">{doctor.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Mode:</span>
              <span className="font-bold text-slate-900">
                {booking.consultationType === 'online' ? 'Online Video Call' : 'In-Clinic Consultation'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Date & Time:</span>
              <span className="font-bold text-slate-900">
                {appointmentService.formatAppointmentDate(booking.selectedDate!)} at {booking.selectedTime} (PKT)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Payable Fee:</span>
              <span className="font-bold text-[#0D7A5F]">{formatPKR(effectiveFee)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/patient/appointments" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full" leftIcon={<Calendar className="w-4 h-4" />}>
                View My Appointments
              </Button>
            </Link>
            <Link to="/patient/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Find Doctors', to: '/find-doctors' },
          { label: doctor.name, to: `/doctors/${doctor.id}` },
          { label: 'Book Appointment' }
        ]}
      />

      {/* Doctor Summary Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <img
            src={doctor.avatarUrl}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover object-top border border-slate-100 shadow-sm shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <h2 className="text-lg font-bold text-slate-900">{doctor.name}</h2>
              {doctor.pmdcVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3" /> PMDC
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-[#0D7A5F]">{doctor.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{doctor.clinicName}, {doctor.city}</span>
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Base Fee
          </span>
          <span className="text-xl font-extrabold text-slate-900">
            {formatPKR(doctor.consultationFee)}
          </span>
        </div>
      </div>

      {/* 4-Step Progress Indicator */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6">
        <BookingStepIndicator currentStep={booking.step} />
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
        {/* STEP 1: Consultation Type */}
        {booking.step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">
                Step 1: Choose Consultation Type
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Select whether you would like to visit the doctor's clinic in person or consult via high-definition video call.
              </p>
            </div>

            <ConsultationTypeSelector
              doctorConsultationType={doctor.consultationType}
              selected={booking.consultationType}
              onSelect={(type) => setConsultationType(type)}
              consultationFee={doctor.consultationFee}
            />
          </div>
        )}

        {/* STEP 2: Select Date */}
        {booking.step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">
                Step 2: Select Consultation Date
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose an available consultation day over the next 7 days in Pakistan Standard Time (PKT).
              </p>
            </div>

            <DatePicker
              days={slotDays}
              selectedDate={booking.selectedDate}
              onSelectDate={(date) => setSelectedDate(date)}
            />
          </div>
        )}

        {/* STEP 3: Choose Time Slot */}
        {booking.step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">
                Step 3: Select Time Slot (PKT)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Showing available morning, afternoon, and evening clinic slots for{' '}
                <strong className="text-slate-800">
                  {booking.selectedDate ? appointmentService.formatAppointmentDate(booking.selectedDate) : ''}
                </strong>
                .
              </p>
            </div>

            {currentSlotDay && currentSlotDay.slots.length > 0 ? (
              <TimeSlotGrid
                slots={currentSlotDay.slots}
                selectedSlotId={booking.selectedSlotId}
                onSelectSlot={(slotId, time) => setSelectedSlot(slotId, time)}
              />
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No time slots available on this date.
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Clinical Notes & Final Confirmation */}
        {booking.step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">
                Step 4: Clinical Details & Confirmation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Review your appointment summary and optionally add medical symptoms or previous notes for the doctor.
              </p>
            </div>

            {/* Optional Notes Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Reason for Visit / Symptoms (Optional):
              </label>
              <textarea
                rows={3}
                value={booking.patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                placeholder="e.g., Follow-up for blood pressure medication, rash on forehead, chronic chest tightness..."
                className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
              />
            </div>

            {/* Confirmation Card */}
            {booking.consultationType && booking.selectedDate && booking.selectedTime && (
              <BookingConfirmCard
                doctor={doctor}
                consultationType={booking.consultationType}
                date={booking.selectedDate}
                time={booking.selectedTime}
                notes={booking.patientNotes}
              />
            )}
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div>
            {booking.step > 1 && (
              <Button
                variant="outline"
                size="md"
                onClick={() => goToStep((booking.step - 1) as any)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>
            )}
          </div>

          <div>
            {booking.step < 4 ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNextStep}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmSubmit}
                isLoading={booking.isSubmitting}
                leftIcon={<FileCheck className="w-4 h-4" />}
                className="bg-[#0D7A5F] hover:bg-[#084E3D] px-8"
              >
                Confirm & Book Appointment
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
