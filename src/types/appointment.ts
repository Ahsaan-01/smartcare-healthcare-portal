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
  createdAt: string;
}
