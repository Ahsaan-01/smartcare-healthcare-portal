export type ConsultationType = 'in-clinic' | 'online' | 'both';

export interface DoctorReview {
  id: string;
  patientName: string;
  patientCity: string;
  rating: number;
  comment: string;
  date: string;
  consultationType: 'In-Clinic Consultation' | 'Online Video Consultation';
  verified: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ExperienceItem {
  role: string;
  hospital: string;
  period: string;
}

export interface ClinicTiming {
  days: string;
  hours: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string; // e.g. "Consultant Cardiologist"
  specialization: string;
  specializationId: string;
  avatarUrl: string;
  pmdcVerified: boolean;
  pmdcNumber: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number; // in PKR
  city: string;
  area: string; // e.g. "Clifton, Phase 5"
  clinicName: string;
  clinicAddress: string;
  consultationType: ConsultationType;
  languages: string[];
  gender: 'Male' | 'Female';
  nextAvailableSlot: string; // e.g. "Today at 04:30 PM", "Tomorrow at 11:00 AM"
  about: string;
  expertise: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  timings: ClinicTiming[];
  services: string[];
  featured?: boolean;
}

export interface Specialty {
  id: string;
  name: string;
  iconName: string;
  description: string;
  doctorCount: number;
  popularConditions: string[];
}

export interface PakistaniCity {
  id: string;
  name: string;
  province: string;
  popularAreas: string[];
  doctorCount: number;
}
