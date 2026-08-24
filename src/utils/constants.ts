import { DoctorFilterState } from '../types/filter';

export const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Gujranwala',
  'Sialkot'
] as const;

export const DEFAULT_FILTERS: DoctorFilterState = {
  searchQuery: '',
  specialization: 'all',
  city: 'all',
  area: 'all',
  consultationType: 'all',
  availability: 'all',
  gender: 'all',
  minRating: 0,
  maxFee: 5000,
  sortBy: 'recommended'
};

export const DEMO_CREDENTIALS = {
  patient: {
    email: 'patient@smartcare.pk',
    password: 'patient123',
    role: 'patient' as const,
    name: 'Muhammad Tariq'
  },
  doctor: {
    email: 'doctor@smartcare.pk',
    password: 'doctor123',
    role: 'doctor' as const,
    name: 'Dr. Ayesha Khan'
  },
  admin: {
    email: 'admin@smartcare.pk',
    password: 'admin123',
    role: 'admin' as const,
    name: 'System Admin'
  }
};
