export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled' | 'pending';
export type AppointmentConsultationType = 'in-clinic' | 'online';

export interface Appointment {
  id: string;
  referenceNumber: string; // e.g. "SC-2026-8941"
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorAvatarUrl: string;
  clinicName: string;
  clinicAddress: string;
  city: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "04:30 PM"
  consultationType: AppointmentConsultationType;
  consultationFee: number;
  status: AppointmentStatus;
  notes?: string;
  cancellationReason?: string;
  videoCallLink?: string; // for online consultations
  prescriptionUrl?: string;
  followUpDate?: string; // YYYY-MM-DD
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  time: string; // e.g. "09:00 AM"
  period: 'morning' | 'afternoon' | 'evening';
  available: boolean;
}

export interface DoctorSlotDay {
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g. "Mon", "Tue"
  dateLabel: string; // e.g. "1 Sep"
  isToday: boolean;
  availableCount: number;
  slots: TimeSlot[];
}

export interface AppointmentNotification {
  id: string;
  type: 'confirmed' | 'reminder' | 'completed' | 'cancelled' | 'prescription' | 'system';
  title: string;
  message: string;
  appointmentId?: string;
  doctorId?: string;
  read: boolean;
  createdAt: string; // ISO timestamp
}

