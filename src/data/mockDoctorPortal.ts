import {
  DoctorScheduleConfig,
  DoctorPatientRecord,
  DigitalPrescription,
  DoctorAnalyticsSummary
} from '../types/doctorPortal';

export const DEFAULT_DOCTOR_SCHEDULE: DoctorScheduleConfig = {
  doctorId: 'doc-1',
  consultationDuration: 20,
  bufferMinutes: 5,
  maxDailyPatients: 18,
  isEmergencyOff: false,
  emergencyOffReason: '',
  weeklyWorkingDays: [
    {
      day: 'Monday',
      enabled: true,
      morningStart: '09:00 AM',
      morningEnd: '01:00 PM',
      eveningStart: '04:30 PM',
      eveningEnd: '08:30 PM',
      breakStart: '01:00 PM',
      breakEnd: '02:30 PM',
      acceptsInClinic: true,
      acceptsOnline: true
    },
    {
      day: 'Tuesday',
      enabled: true,
      morningStart: '09:00 AM',
      morningEnd: '01:00 PM',
      eveningStart: '04:30 PM',
      eveningEnd: '08:30 PM',
      breakStart: '01:00 PM',
      breakEnd: '02:30 PM',
      acceptsInClinic: true,
      acceptsOnline: true
    },
    {
      day: 'Wednesday',
      enabled: true,
      morningStart: '09:00 AM',
      morningEnd: '01:00 PM',
      eveningStart: '04:30 PM',
      eveningEnd: '08:30 PM',
      breakStart: '01:00 PM',
      breakEnd: '02:30 PM',
      acceptsInClinic: true,
      acceptsOnline: true
    },
    {
      day: 'Thursday',
      enabled: true,
      morningStart: '09:00 AM',
      morningEnd: '01:00 PM',
      eveningStart: '04:30 PM',
      eveningEnd: '08:30 PM',
      breakStart: '01:00 PM',
      breakEnd: '02:30 PM',
      acceptsInClinic: true,
      acceptsOnline: true
    },
    {
      day: 'Friday',
      enabled: true,
      morningStart: '09:00 AM',
      morningEnd: '12:30 PM',
      eveningStart: '04:30 PM',
      eveningEnd: '09:00 PM',
      breakStart: '12:30 PM',
      breakEnd: '03:00 PM', // Friday prayer break
      acceptsInClinic: true,
      acceptsOnline: false
    },
    {
      day: 'Saturday',
      enabled: true,
      morningStart: '10:00 AM',
      morningEnd: '02:00 PM',
      eveningStart: '05:00 PM',
      eveningEnd: '08:00 PM',
      breakStart: '02:00 PM',
      breakEnd: '03:00 PM',
      acceptsInClinic: true,
      acceptsOnline: true
    },
    {
      day: 'Sunday',
      enabled: false,
      morningStart: '10:00 AM',
      morningEnd: '01:00 PM',
      eveningStart: '05:00 PM',
      eveningEnd: '07:00 PM',
      breakStart: '01:00 PM',
      breakEnd: '02:00 PM',
      acceptsInClinic: false,
      acceptsOnline: false
    }
  ],
  blockedDateRanges: [],
  slotOverrides: {}
};

export const MOCK_DOCTOR_PATIENTS: DoctorPatientRecord[] = [
  {
    id: 'patient-1',
    mrn: 'MRN-KHI-1049',
    name: 'Muhammad Tariq',
    age: 38,
    gender: 'Male',
    phone: '+92 300 4567890',
    email: 'patient@smartcare.pk',
    city: 'Karachi',
    bloodGroup: 'B+',
    allergies: ['Penicillin', 'Dust / Pollen'],
    chronicConditions: ['Mild Hypertension', 'Hyperlipidemia'],
    totalVisits: 4,
    lastVisitDate: '2026-08-28',
    lastDiagnosis: 'Essential Primary Hypertension (Stage 1)',
    visitHistory: [
      {
        appointmentId: 'appt-101',
        date: '2026-09-07',
        consultationType: 'in-clinic',
        diagnosis: 'Essential Primary Hypertension — routine follow up'
      },
      {
        appointmentId: 'appt-past-01',
        date: '2026-08-28',
        consultationType: 'in-clinic',
        diagnosis: 'Elevated systolic blood pressure & borderline LDL',
        prescriptionId: 'rx-2026-001'
      },
      {
        appointmentId: 'appt-past-02',
        date: '2026-06-12',
        consultationType: 'online',
        diagnosis: 'Mild palpitations following physical exertion',
        prescriptionId: 'rx-2026-002'
      }
    ]
  },
  {
    id: 'patient-2',
    mrn: 'MRN-KHI-2081',
    name: 'Zainab Bibi',
    age: 52,
    gender: 'Female',
    phone: '+92 321 8765432',
    email: 'zainab.bibi@gmail.com',
    city: 'Karachi',
    bloodGroup: 'O+',
    allergies: ['Sulfa Drugs (Bactrim)', 'Aspirin'],
    chronicConditions: ['Type 2 Diabetes', 'Coronary Artery Disease'],
    totalVisits: 6,
    lastVisitDate: '2026-09-02',
    lastDiagnosis: 'Stable Angina with Dyslipidemia',
    visitHistory: [
      {
        appointmentId: 'appt-past-03',
        date: '2026-09-02',
        consultationType: 'in-clinic',
        diagnosis: 'Stable Angina Pectoris review & ECG check',
        prescriptionId: 'rx-2026-003'
      }
    ]
  },
  {
    id: 'patient-3',
    mrn: 'MRN-LHE-3190',
    name: 'Hamza Ali',
    age: 29,
    gender: 'Male',
    phone: '+92 333 1122334',
    email: 'hamza.ali97@hotmail.com',
    city: 'Lahore',
    bloodGroup: 'A+',
    allergies: [],
    chronicConditions: [],
    totalVisits: 2,
    lastVisitDate: '2026-08-15',
    lastDiagnosis: 'Benign Sinus Tachycardia (Stress/Caffeine Induced)',
    visitHistory: [
      {
        appointmentId: 'appt-past-04',
        date: '2026-08-15',
        consultationType: 'online',
        diagnosis: 'Stress-induced tachycardia with normal echocardiogram'
      }
    ]
  },
  {
    id: 'patient-4',
    mrn: 'MRN-ISB-4128',
    name: 'Fatima Noor',
    age: 45,
    gender: 'Female',
    phone: '+92 345 5566778',
    email: 'fatima.noor@yahoo.com',
    city: 'Islamabad',
    bloodGroup: 'AB+',
    allergies: ['Ibuprofen / NSAIDs'],
    chronicConditions: ['Mitral Valve Prolapse (Mild)'],
    totalVisits: 3,
    lastVisitDate: '2026-07-29',
    lastDiagnosis: 'Grade I Mitral Regurgitation follow up',
    visitHistory: [
      {
        appointmentId: 'appt-past-05',
        date: '2026-07-29',
        consultationType: 'in-clinic',
        diagnosis: 'Regular follow up for MVP with stable ejection fraction'
      }
    ]
  },
  {
    id: 'patient-5',
    mrn: 'MRN-KHI-5542',
    name: 'Bilal Ahmed',
    age: 61,
    gender: 'Male',
    phone: '+92 312 9988776',
    email: 'bilal.ahmed63@gmail.com',
    city: 'Karachi',
    bloodGroup: 'O-',
    allergies: ['Contrast Dye'],
    chronicConditions: ['Post-PCI Stenting (2024)', 'Hypertension'],
    totalVisits: 8,
    lastVisitDate: '2026-08-20',
    lastDiagnosis: 'Post-Angioplasty Stent Surveillance',
    visitHistory: [
      {
        appointmentId: 'appt-past-06',
        date: '2026-08-20',
        consultationType: 'in-clinic',
        diagnosis: 'Post-angioplasty routine checkup — dual antiplatelet therapy review'
      }
    ]
  }
];

export const MOCK_INITIAL_PRESCRIPTIONS: DigitalPrescription[] = [
  {
    id: 'rx-2026-001',
    appointmentId: 'appt-past-01',
    referenceNumber: 'SC-2026-8941',
    patientId: 'patient-1',
    patientName: 'Muhammad Tariq',
    patientAge: 38,
    patientGender: 'Male',
    patientMrn: 'MRN-KHI-1049',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ayesha Khan',
    doctorSpecialization: 'Cardiologist',
    pmdcNumber: '48291-S',
    clinicName: 'SmartCare Heart & Vascular Institute',
    clinicAddress: 'Plot 12-C, Khayaban-e-Iqbal, Clifton Block 4, Karachi',
    date: '2026-08-28',
    chiefComplaint: 'Mild headache in morning, occasional shortness of breath on climbing stairs.',
    diagnosis: 'Essential Primary Hypertension (Stage 1)',
    vitals: {
      bloodPressure: '138/88 mmHg',
      heartRate: '78 bpm',
      temperature: '98.4 °F',
      oxygenSaturation: '99%',
      weight: '76 kg'
    },
    medications: [
      {
        id: 'med-1',
        medicineName: 'Tab. Concor (Bisoprolol)',
        dosage: '2.5 mg',
        frequency: '1-0-0 (Morning)',
        timing: 'after-meal',
        duration: '30 Days',
        instructions: 'Take once daily in the morning after breakfast.'
      },
      {
        id: 'med-2',
        medicineName: 'Tab. Lipitor (Atorvastatin)',
        dosage: '10 mg',
        frequency: '0-0-1 (Night)',
        timing: 'after-meal',
        duration: '30 Days',
        instructions: 'Take at night before sleep.'
      },
      {
        id: 'med-3',
        medicineName: 'Tab. Panadol (Paracetamol)',
        dosage: '500 mg',
        frequency: 'SOS (As needed)',
        timing: 'after-meal',
        duration: '5 Days',
        instructions: 'Take only if tension headache recurs. Max 2 tabs/day.'
      }
    ],
    labInvestigationsAdvised: [
      'Fasting Lipid Profile (Total Cholesterol, HDL, LDL, Triglycerides)',
      'Serum Creatinine & Blood Urea Nitrogen',
      '12-Lead Standard Electrocardiogram (ECG)'
    ],
    clinicalNotes: 'Maintain a low-sodium diet (salt restriction < 3g/day). Engage in 30 minutes of brisk walking 5 days a week. Avoid heavy late-night caffeine.',
    followUpDate: '2026-09-28',
    doctorSignature: 'Dr. Ayesha Khan, MBBS, FCPS',
    createdAt: '2026-08-28T17:15:00Z'
  },
  {
    id: 'rx-2026-003',
    appointmentId: 'appt-past-03',
    referenceNumber: 'SC-2026-6410',
    patientId: 'patient-2',
    patientName: 'Zainab Bibi',
    patientAge: 52,
    patientGender: 'Female',
    patientMrn: 'MRN-KHI-2081',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ayesha Khan',
    doctorSpecialization: 'Cardiologist',
    pmdcNumber: '48291-S',
    clinicName: 'SmartCare Heart & Vascular Institute',
    clinicAddress: 'Plot 12-C, Khayaban-e-Iqbal, Clifton Block 4, Karachi',
    date: '2026-09-02',
    chiefComplaint: 'Substernal chest tightness radiating to left shoulder on brisk walking.',
    diagnosis: 'Stable Angina Pectoris with Type 2 Diabetes Mellitus',
    vitals: {
      bloodPressure: '142/90 mmHg',
      heartRate: '84 bpm',
      temperature: '98.6 °F',
      oxygenSaturation: '98%',
      weight: '68 kg'
    },
    medications: [
      {
        id: 'med-4',
        medicineName: 'Tab. Angisid (Nitroglycerin sublingual)',
        dosage: '0.5 mg',
        frequency: 'SOS (Under tongue)',
        timing: 'with-meal',
        duration: 'As needed',
        instructions: 'Place 1 tablet under tongue if severe chest tightness occurs. Sit down immediately.'
      },
      {
        id: 'med-5',
        medicineName: 'Tab. Eziday (Losartan Potassium)',
        dosage: '50 mg',
        frequency: '1-0-0 (Morning)',
        timing: 'after-meal',
        duration: '30 Days',
        instructions: 'Monitor blood pressure weekly.'
      },
      {
        id: 'med-6',
        medicineName: 'Tab. Glucophage (Metformin)',
        dosage: '500 mg',
        frequency: '1-0-1 (Twice daily)',
        timing: 'with-meal',
        duration: '30 Days',
        instructions: 'Take immediately with meals to prevent GI upset.'
      }
    ],
    labInvestigationsAdvised: [
      'HbA1c Glycated Hemoglobin',
      'Exercise Tolerance Test (ETT / Stress ECG)',
      'Echocardiography (2D Color Doppler)'
    ],
    clinicalNotes: 'Strict diabetic and cardiovascular dietary modifications. In case of unresolved chest pain exceeding 15 minutes, visit emergency triage immediately.',
    followUpDate: '2026-09-20',
    doctorSignature: 'Dr. Ayesha Khan, MBBS, FCPS',
    createdAt: '2026-09-02T11:45:00Z'
  }
];

export const MOCK_DOCTOR_ANALYTICS: DoctorAnalyticsSummary = {
  totalGrossRevenuePKR: 485000,
  platformFeePercent: 10,
  netPayoutPKR: 436500,
  totalConsultations: 168,
  inClinicConsultations: 121,
  onlineConsultations: 47,
  averageConsultationFeePKR: 2450,
  ratingScore: 4.9,
  totalReviews: 124,
  fiveStarCount: 112,
  fourStarCount: 9,
  threeStarCount: 3,
  monthlyTargetPKR: 500000,
  revenueTrend: [
    { month: 'Apr 2026', inClinic: 245000, online: 78000, total: 323000 },
    { month: 'May 2026', inClinic: 280000, online: 92000, total: 372000 },
    { month: 'Jun 2026', inClinic: 310000, online: 105000, total: 415000 },
    { month: 'Jul 2026', inClinic: 295000, online: 115000, total: 410000 },
    { month: 'Aug 2026', inClinic: 350000, online: 110000, total: 460000 },
    { month: 'Sep 2026 (MTD)', inClinic: 365000, online: 120000, total: 485000 }
  ],
  topConditions: [
    { condition: 'Essential Hypertension', patientCount: 68, percentage: 40 },
    { condition: 'Dyslipidemia / High Cholesterol', patientCount: 38, percentage: 23 },
    { condition: 'Ischemic Heart Disease (CAD)', patientCount: 29, percentage: 17 },
    { condition: 'Cardiac Arrhythmia / Palpitations', patientCount: 19, percentage: 11 },
    { condition: 'Valvular Heart Conditions', patientCount: 14, percentage: 9 }
  ],
  peakHours: [
    { timeLabel: '09:00 AM – 11:00 AM', patientCount: 34, percentage: 20 },
    { timeLabel: '11:00 AM – 01:00 PM', patientCount: 42, percentage: 25 },
    { timeLabel: '04:30 PM – 06:30 PM', patientCount: 56, percentage: 33 },
    { timeLabel: '06:30 PM – 08:30 PM', patientCount: 36, percentage: 22 }
  ]
};
