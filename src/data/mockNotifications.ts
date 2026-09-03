import { AppointmentNotification } from '../types/appointment';

export const MOCK_NOTIFICATIONS: AppointmentNotification[] = [
  {
    id: 'notif-1',
    type: 'confirmed',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Ayesha Khan on Sep 10 at 04:30 PM (In-Clinic, Clifton) has been confirmed. Ref: SC-2026-8941.',
    appointmentId: 'appt-101',
    doctorId: 'doc-1',
    read: false,
    createdAt: '2026-08-31T14:20:00Z'
  },
  {
    id: 'notif-2',
    type: 'confirmed',
    title: 'Video Consultation Booked',
    message: 'Online video session with Dr. Sara Baig on Sep 18 at 11:00 AM is confirmed. Meeting link will be sent 30 minutes prior. Ref: SC-2026-9104.',
    appointmentId: 'appt-102',
    doctorId: 'doc-3',
    read: false,
    createdAt: '2026-08-28T09:45:00Z'
  },
  {
    id: 'notif-3',
    type: 'reminder',
    title: 'Appointment Reminder — Tomorrow',
    message: 'You have an in-clinic appointment with Dr. Ayesha Khan tomorrow at 04:30 PM at SmartCare Heart & Vascular Institute, Clifton.',
    appointmentId: 'appt-101',
    doctorId: 'doc-1',
    read: false,
    createdAt: '2026-09-09T09:00:00Z'
  },
  {
    id: 'notif-4',
    type: 'prescription',
    title: 'Digital Prescription Ready',
    message: 'Dr. Ahmed Raza has uploaded your prescription from the Jul 22 consultation. You can download it from your appointment history.',
    appointmentId: 'appt-091',
    doctorId: 'doc-2',
    read: true,
    createdAt: '2026-07-22T20:15:00Z'
  },
  {
    id: 'notif-5',
    type: 'completed',
    title: 'Consultation Completed — Share Feedback',
    message: 'Your consultation with Dr. Imran Siddiqui on Jun 15 is complete. Share your experience to help other patients in Islamabad.',
    appointmentId: 'appt-085',
    doctorId: 'doc-5',
    read: true,
    createdAt: '2026-06-15T12:30:00Z'
  },
  {
    id: 'notif-6',
    type: 'cancelled',
    title: 'Appointment Cancellation Processed',
    message: 'Your appointment with Dr. Fatima Malik (May 30) has been cancelled as requested. No fee was charged. Ref: SC-2026-5541.',
    appointmentId: 'appt-078',
    doctorId: 'doc-4',
    read: true,
    createdAt: '2026-05-25T11:00:00Z'
  },
  {
    id: 'notif-7',
    type: 'system',
    title: 'SmartCare Pakistan — Welcome!',
    message: 'Your SmartCare patient account is active. You can now book consultations with 15,000+ PMDC-verified doctors across Pakistan.',
    read: true,
    createdAt: '2026-08-24T08:00:00Z'
  }
];
