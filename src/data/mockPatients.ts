import { PatientProfile } from '../types/user';
import { Appointment } from '../types/appointment';

export const MOCK_PATIENT_PROFILE: PatientProfile = {
  id: 'patient-1',
  name: 'Muhammad Tariq',
  email: 'patient@smartcare.pk',
  phone: '+92 300 4567890',
  role: 'patient',
  city: 'Karachi',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
  dateOfBirth: '1988-06-14',
  gender: 'Male',
  bloodGroup: 'B+',
  allergies: ['Penicillin', 'Dust / Pollen'],
  emergencyContact: {
    name: 'Farida Tariq (Spouse)',
    relationship: 'Spouse',
    phone: '+92 321 9876543'
  },
  chronicConditions: ['Mild Hypertension'],
  createdAt: '2025-11-10'
};

export const MOCK_UPCOMING_APPOINTMENT: Appointment = {
  id: 'appt-101',
  referenceNumber: 'SC-2026-8941',
  doctorId: 'doc-1',
  doctorName: 'Dr. Ayesha Khan',
  doctorSpecialization: 'Cardiology',
  doctorAvatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
  clinicName: 'SmartCare Heart & Vascular Institute',
  clinicAddress: 'Plot 12-C, Khayaban-e-Iqbal, Clifton Block 4, Karachi',
  city: 'Karachi',
  patientId: 'patient-1',
  patientName: 'Muhammad Tariq',
  patientPhone: '+92 300 4567890',
  patientEmail: 'patient@smartcare.pk',
  date: '2026-08-28',
  time: '04:30 PM',
  consultationType: 'in-clinic',
  consultationFee: 2500,
  status: 'confirmed',
  notes: 'Routine blood pressure review & cholesterol lipid panel follow-up.',
  createdAt: '2026-08-24'
};
