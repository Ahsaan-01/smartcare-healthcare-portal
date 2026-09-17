import {
  AdminDoctorRecord,
  PlatformActivityLog,
  AdminSystemSettings,
  PlatformMetricsSummary
} from '../types/admin';
import { MOCK_DOCTORS } from './mockDoctors';

export const MOCK_ADMIN_DOCTORS: AdminDoctorRecord[] = [
  ...MOCK_DOCTORS.map((doc, idx) => ({
    ...doc,
    verificationStatus: 'verified' as const,
    licenseExpiryDate: '2028-12-31',
    totalPlatformConsultations: 120 + idx * 18,
    grossEarnedPKR: (120 + idx * 18) * doc.consultationFee,
    registeredAt: '2025-06-15'
  })),
  // Pending verification applicants
  {
    id: 'doc-pending-1',
    name: 'Dr. Naveed Akhtar',
    title: 'Consultant Nephrologist & Renal Specialist',
    specialization: 'Nephrology',
    specializationId: 'nephrology',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: false,
    pmdcNumber: 'PMC-78412-S',
    experienceYears: 11,
    rating: 4.8,
    reviewCount: 32,
    consultationFee: 2800,
    city: 'Karachi',
    area: 'Gulshan-e-Iqbal, Block 6',
    clinicName: 'Karachi Renal & Kidney Institute',
    clinicAddress: 'Block 6, University Road, Gulshan, Karachi',
    consultationType: 'both',
    languages: ['English', 'Urdu'],
    gender: 'Male',
    nextAvailableSlot: 'Pending Verification',
    featured: false,
    about: 'Dr. Naveed Akhtar is an experienced Nephrologist specializing in chronic kidney disease, hemodialysis management, and diabetic renal care.',
    expertise: ['Chronic Kidney Disease', 'Renal Biopsy', 'Hypertensive Nephropathy'],
    education: [
      { degree: 'MBBS', institution: 'Sindh Medical College (JSMU)', year: '2012' },
      { degree: 'FCPS (Nephrology)', institution: 'College of Physicians & Surgeons Pakistan', year: '2018' }
    ],
    experience: [
      { role: 'Consultant Nephrologist', hospital: 'Karachi Renal Institute', period: '2020 — Present' }
    ],
    timings: [{ days: 'Monday – Friday', hours: '05:00 PM – 08:30 PM' }],
    services: ['Renal Function Assessment', 'Video Tele-Consultation'],
    verificationStatus: 'pending',
    licenseExpiryDate: '2029-05-14',
    totalPlatformConsultations: 0,
    grossEarnedPKR: 0,
    registeredAt: '2026-09-04'
  },
  {
    id: 'doc-pending-2',
    name: 'Dr. Mehwish Tariq',
    title: 'Consultant Medical Oncologist',
    specialization: 'Oncology',
    specializationId: 'oncology',
    avatarUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: false,
    pmdcNumber: 'PMC-90214-S',
    experienceYears: 9,
    rating: 4.9,
    reviewCount: 19,
    consultationFee: 3200,
    city: 'Lahore',
    area: 'Johar Town, Phase 1',
    clinicName: 'CarePlus Cancer & Oncology Center',
    clinicAddress: 'Plot 45, Khayaban-e-Firdousi, Johar Town, Lahore',
    consultationType: 'both',
    languages: ['English', 'Urdu', 'Punjabi'],
    gender: 'Female',
    nextAvailableSlot: 'Pending Verification',
    featured: false,
    about: 'Dr. Mehwish Tariq is a dedicated Medical Oncologist trained at Shaukat Khanum Memorial Cancer Hospital, with a strong focus on chemotherapy and targeted immunotherapy.',
    expertise: ['Solid Tumors', 'Breast Oncology', 'Immunotherapy'],
    education: [
      { degree: 'MBBS', institution: 'King Edward Medical University, Lahore', year: '2014' },
      { degree: 'MRCP (UK)', institution: 'Royal College of Physicians', year: '2019' },
      { degree: 'FCPS (Medical Oncology)', institution: 'CPSP', year: '2022' }
    ],
    experience: [
      { role: 'Senior Registrar Oncology', hospital: 'SKMCH&RC, Lahore', period: '2019 — 2023' }
    ],
    timings: [{ days: 'Tuesday – Saturday', hours: '03:00 PM – 07:00 PM' }],
    services: ['Oncology Evaluation', 'Chemotherapy Protocol Planning'],
    verificationStatus: 'pending',
    licenseExpiryDate: '2028-10-30',
    totalPlatformConsultations: 0,
    grossEarnedPKR: 0,
    registeredAt: '2026-09-06'
  }
];

export const MOCK_AUDIT_LOGS: PlatformActivityLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-09-17 11:42 AM',
    category: 'doctor',
    title: 'PMDC Verification Approved',
    description: 'Dr. Ayesha Khan (PMC-29481-S) verified after validation with PMDC official online registry.',
    actorName: 'System Admin (admin-1)',
    actorRole: 'admin',
    status: 'success',
    targetId: 'doc-1'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-17 10:15 AM',
    category: 'financial',
    title: 'Weekly Payout Batch Processed',
    description: 'Weekly clinic disbursements totaling Rs. 436,500 transferred to partner clinics in Karachi & Lahore.',
    actorName: 'SmartCare Automated Financial Gateway',
    actorRole: 'system',
    status: 'success'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-16 04:30 PM',
    category: 'appointment',
    title: 'Tele-Health Consultation Completed',
    description: 'Encrypted video appointment SC-2026-9215 marked completed with digital prescription attached.',
    actorName: 'Dr. Ayesha Khan',
    actorRole: 'doctor',
    status: 'info',
    targetId: 'appt-doc-02'
  },
  {
    id: 'log-104',
    timestamp: '2026-09-16 02:10 PM',
    category: 'doctor',
    title: 'New Doctor Application Received',
    description: 'Dr. Naveed Akhtar submitted credentials for PMDC verification in Nephrology (Karachi).',
    actorName: 'Dr. Naveed Akhtar',
    actorRole: 'doctor',
    status: 'warning',
    targetId: 'doc-pending-1'
  },
  {
    id: 'log-105',
    timestamp: '2026-09-15 09:20 AM',
    category: 'system',
    title: 'Security Audit & SSL Key Renewal',
    description: 'End-to-end telemetry and 256-bit encryption audit passed with 100% compliance.',
    actorName: 'Cloud Security Daemon',
    actorRole: 'system',
    status: 'success'
  },
  {
    id: 'log-106',
    timestamp: '2026-09-14 06:45 PM',
    category: 'appointment',
    title: 'Patient Emergency Cancellation',
    description: 'Appointment SC-2026-8801 cancelled due to doctor emergency on-call at NICVD.',
    actorName: 'Dr. Ayesha Khan',
    actorRole: 'doctor',
    status: 'warning',
    targetId: 'appt-doc-06'
  }
];

export const DEFAULT_ADMIN_SETTINGS: AdminSystemSettings = {
  platformFeePercentage: 10,
  teleHealthDiscountPercentage: 10,
  maintenanceMode: false,
  maintenanceMessage: 'SmartCare platform is undergoing scheduled database maintenance. Services will resume shortly.',
  broadcastAnnouncement: {
    enabled: true,
    message: 'National Dengue & Seasonal Virus Advisory: In-clinic and online fever consultations are active 24/7 with PMDC verified physicians.',
    type: 'info',
    targetAudience: 'all',
    createdAt: '2026-09-01'
  },
  autoPmdcVerification: false,
  emergencyHotline: '+92 21 111-762-782',
  maxDailyBookingPerPatient: 3,
  payoutProcessingDay: 'Every Monday'
};

export const MOCK_PLATFORM_METRICS: PlatformMetricsSummary = {
  totalDoctors: 14,
  verifiedDoctorsCount: 12,
  pendingVerificationsCount: 2,
  totalPatientsCount: 1240,
  totalAppointmentsCount: 1560,
  completedConsultationsCount: 1380,
  cancelledConsultationsCount: 180,
  grossMerchandiseValuePKR: 3850000,
  netPlatformRevenuePKR: 385000,
  averageConsultationFeePKR: 2468,
  cityBreakdown: [
    { city: 'Karachi', doctorCount: 7, patientCount: 680, appointmentCount: 840, percentage: 54 },
    { city: 'Lahore', doctorCount: 4, patientCount: 360, appointmentCount: 440, percentage: 28 },
    { city: 'Islamabad / RWP', doctorCount: 3, patientCount: 200, appointmentCount: 280, percentage: 18 }
  ],
  monthlyGrowth: [
    { month: 'Apr 2026', consultations: 190, gmvPKR: 470000, platformRevenuePKR: 47000 },
    { month: 'May 2026', consultations: 230, gmvPKR: 565000, platformRevenuePKR: 56500 },
    { month: 'Jun 2026', consultations: 275, gmvPKR: 680000, platformRevenuePKR: 68000 },
    { month: 'Jul 2026', consultations: 290, gmvPKR: 715000, platformRevenuePKR: 71500 },
    { month: 'Aug 2026', consultations: 325, gmvPKR: 810000, platformRevenuePKR: 81000 },
    { month: 'Sep 2026 (MTD)', consultations: 250, gmvPKR: 610000, platformRevenuePKR: 61000 }
  ]
};
