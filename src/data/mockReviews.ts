import { DoctorReview } from '../types/doctor';

export const MOCK_REVIEWS: Record<string, DoctorReview[]> = {
  'doc-1': [
    {
      id: 'rev-1',
      patientName: 'Zubair Mansoor',
      patientCity: 'Karachi (DHA)',
      rating: 5,
      comment: 'Dr. Ayesha explained my ECG results with extraordinary clarity. She didn’t prescribe unnecessary medications and gave very practical dietary advice for my cholesterol levels.',
      date: '12 Feb 2026',
      consultationType: 'In-Clinic Consultation',
      verified: true
    },
    {
      id: 'rev-2',
      patientName: 'Saima Javed',
      patientCity: 'Karachi (Clifton)',
      rating: 5,
      comment: 'Very polite, punctual, and professional. The clinic in Clifton is hygienic and well-maintained. Highly recommended for cardiac checkups.',
      date: '28 Jan 2026',
      consultationType: 'In-Clinic Consultation',
      verified: true
    },
    {
      id: 'rev-3',
      patientName: 'Kamran Siddique',
      patientCity: 'Lahore (Online)',
      rating: 4,
      comment: 'Booked an online video consultation from Lahore. Dr. Ayesha gave adequate time, reviewed my past lab reports carefully, and followed up promptly.',
      date: '15 Jan 2026',
      consultationType: 'Online Video Consultation',
      verified: true
    }
  ],
  'doc-2': [
    {
      id: 'rev-4',
      patientName: 'Farhan Ali',
      patientCity: 'Karachi (Gulshan)',
      rating: 5,
      comment: 'Suffered from severe adult acne for 2 years. Dr. Ahmed designed a tailored skincare and medication regimen that gave results within 4 weeks. Best dermatologist in town!',
      date: '04 Feb 2026',
      consultationType: 'In-Clinic Consultation',
      verified: true
    },
    {
      id: 'rev-5',
      patientName: 'Rabia Khalid',
      patientCity: 'Karachi (PECHS)',
      rating: 5,
      comment: 'Consulted for stubborn hair loss. Very thorough analysis and transparent consultation fee. Truly a 5-star experience.',
      date: '19 Jan 2026',
      consultationType: 'In-Clinic Consultation',
      verified: true
    }
  ],
  'doc-3': [
    {
      id: 'rev-6',
      patientName: 'Nadia Qasim',
      patientCity: 'Lahore (Gulberg)',
      rating: 5,
      comment: 'Dr. Fatima is one of the most compassionate gynecologists in Lahore. She guided me with utmost patience through my entire high-risk pregnancy.',
      date: '10 Feb 2026',
      consultationType: 'In-Clinic Consultation',
      verified: true
    }
  ]
};
