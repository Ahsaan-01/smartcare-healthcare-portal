import { Doctor } from './doctor';

export type DoctorVerificationStatus = 'verified' | 'pending' | 'rejected' | 'suspended';

export interface AdminDoctorRecord extends Doctor {
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: string;
  licenseExpiryDate?: string;
  totalPlatformConsultations: number;
  grossEarnedPKR: number;
  registeredAt: string;
}

export type ActivityCategory = 'doctor' | 'appointment' | 'system' | 'financial' | 'patient';

export interface PlatformActivityLog {
  id: string;
  timestamp: string;
  category: ActivityCategory;
  title: string;
  description: string;
  actorName: string;
  actorRole: 'admin' | 'doctor' | 'patient' | 'system';
  status: 'success' | 'warning' | 'info' | 'error';
  targetId?: string;
}

export interface BroadcastAnnouncement {
  enabled: boolean;
  message: string;
  type: 'info' | 'warning' | 'emergency';
  targetAudience: 'all' | 'patients' | 'doctors';
  createdAt: string;
}

export interface AdminSystemSettings {
  platformFeePercentage: number; // e.g. 10%
  teleHealthDiscountPercentage: number; // e.g. 10%
  maintenanceMode: boolean;
  maintenanceMessage: string;
  broadcastAnnouncement: BroadcastAnnouncement;
  autoPmdcVerification: boolean;
  emergencyHotline: string;
  maxDailyBookingPerPatient: number;
  payoutProcessingDay: string; // e.g. "Every Monday"
}

export interface CityDistribution {
  city: string;
  doctorCount: number;
  patientCount: number;
  appointmentCount: number;
  percentage: number;
}

export interface MonthlyGrowthRecord {
  month: string;
  consultations: number;
  gmvPKR: number;
  platformRevenuePKR: number;
}

export interface PlatformMetricsSummary {
  totalDoctors: number;
  verifiedDoctorsCount: number;
  pendingVerificationsCount: number;
  totalPatientsCount: number;
  totalAppointmentsCount: number;
  completedConsultationsCount: number;
  cancelledConsultationsCount: number;
  grossMerchandiseValuePKR: number;
  netPlatformRevenuePKR: number;
  averageConsultationFeePKR: number;
  cityBreakdown: CityDistribution[];
  monthlyGrowth: MonthlyGrowthRecord[];
}

export interface AdminDoctorFilterState {
  searchQuery: string;
  status: 'all' | DoctorVerificationStatus;
  city: string;
  specialtyId: string;
  featuredOnly: boolean;
}

export interface AdminAppointmentFilterState {
  searchQuery: string;
  status: 'all' | 'confirmed' | 'completed' | 'cancelled';
  consultationType: 'all' | 'in-clinic' | 'online';
  city: string;
}
