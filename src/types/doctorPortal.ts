export type DutyStatus = 'available' | 'in-consultation' | 'break' | 'emergency-off';

export interface MedicationItem {
  id: string;
  medicineName: string;
  dosage: string; // e.g. "500 mg", "10 mg"
  frequency: string; // e.g. "1-0-1", "1-0-0", "0-0-1", "SOS"
  timing: 'before-meal' | 'after-meal' | 'with-meal';
  duration: string; // e.g. "7 Days", "1 Month"
  instructions: string; // e.g. "Take with warm water"
}

export interface PatientVitals {
  bloodPressure?: string; // e.g. "120/80 mmHg"
  heartRate?: string; // e.g. "72 bpm"
  temperature?: string; // e.g. "98.6 °F"
  oxygenSaturation?: string; // e.g. "99%"
  weight?: string; // e.g. "74 kg"
}

export interface DigitalPrescription {
  id: string;
  appointmentId: string;
  referenceNumber: string; // e.g. "SC-2026-8941"
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientMrn: string; // e.g. "MRN-KHI-1049"
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  pmdcNumber: string;
  clinicName: string;
  clinicAddress: string;
  date: string; // YYYY-MM-DD
  chiefComplaint: string;
  diagnosis: string;
  vitals: PatientVitals;
  medications: MedicationItem[];
  labInvestigationsAdvised?: string[];
  clinicalNotes?: string;
  followUpDate?: string;
  doctorSignature: string;
  createdAt: string;
}

export interface DayShiftConfig {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  enabled: boolean;
  morningStart: string; // "09:00 AM"
  morningEnd: string; // "01:00 PM"
  eveningStart: string; // "04:30 PM"
  eveningEnd: string; // "09:00 PM"
  breakStart: string; // "01:00 PM"
  breakEnd: string; // "02:30 PM"
  acceptsInClinic: boolean;
  acceptsOnline: boolean;
}

export interface BlockedDateRange {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reason: string;
}

export interface DoctorScheduleConfig {
  doctorId: string;
  consultationDuration: 15 | 20 | 30 | 45; // in minutes
  bufferMinutes: 0 | 5 | 10;
  maxDailyPatients: number;
  isEmergencyOff: boolean;
  emergencyOffReason?: string;
  weeklyWorkingDays: DayShiftConfig[];
  blockedDateRanges: BlockedDateRange[];
  slotOverrides: Record<string, boolean>; // key: `${date}_${time}` => boolean
}

export interface PatientVisitHistory {
  appointmentId: string;
  date: string;
  consultationType: 'in-clinic' | 'online';
  diagnosis: string;
  prescriptionId?: string;
}

export interface DoctorPatientRecord {
  id: string;
  mrn: string; // Medical Record Number (e.g. "MRN-KHI-1049")
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  city: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string[];
  chronicConditions: string[];
  totalVisits: number;
  lastVisitDate: string;
  lastDiagnosis: string;
  visitHistory: PatientVisitHistory[];
}

export interface RevenueTrendMonth {
  month: string;
  inClinic: number;
  online: number;
  total: number;
}

export interface ConditionStat {
  condition: string;
  patientCount: number;
  percentage: number;
}

export interface PeakHourStat {
  timeLabel: string;
  patientCount: number;
  percentage: number;
}

export interface DoctorAnalyticsSummary {
  totalGrossRevenuePKR: number;
  platformFeePercent: number; // 10%
  netPayoutPKR: number;
  totalConsultations: number;
  inClinicConsultations: number;
  onlineConsultations: number;
  averageConsultationFeePKR: number;
  ratingScore: number;
  totalReviews: number;
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  revenueTrend: RevenueTrendMonth[];
  topConditions: ConditionStat[];
  peakHours: PeakHourStat[];
  monthlyTargetPKR: number;
}
