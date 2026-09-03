import { Appointment } from '../types/appointment';
import { getMockSlotsForDoctor } from '../data/mockSlots';
import { DoctorSlotDay } from '../types/appointment';

export const appointmentService = {
  /**
   * Returns upcoming appointments (confirmed/pending) for a patient, sorted by date ASC.
   */
  getUpcomingAppointments: (appointments: Appointment[], patientId: string): Appointment[] => {
    return appointments
      .filter((a) => a.patientId === patientId && (a.status === 'confirmed' || a.status === 'pending'))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  /**
   * Returns completed appointments for a patient, sorted by date DESC.
   */
  getPastAppointments: (appointments: Appointment[], patientId: string): Appointment[] => {
    return appointments
      .filter((a) => a.patientId === patientId && a.status === 'completed')
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Returns cancelled appointments for a patient, sorted by date DESC.
   */
  getCancelledAppointments: (appointments: Appointment[], patientId: string): Appointment[] => {
    return appointments
      .filter((a) => a.patientId === patientId && a.status === 'cancelled')
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Gets 7-day slot availability for a given doctor.
   */
  getSlotsForDoctor: (doctorId: string): DoctorSlotDay[] => {
    return getMockSlotsForDoctor(doctorId);
  },

  /**
   * Returns slots for a specific date for a doctor.
   */
  getSlotsForDate: (doctorId: string, date: string): DoctorSlotDay | undefined => {
    return getMockSlotsForDoctor(doctorId).find((d) => d.date === date);
  },

  /**
   * Calculates how many days until a given date from today.
   * Returns 0 if today, negative if past.
   */
  getDaysUntil: (dateStr: string): number => {
    const target = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  },

  /**
   * Formats a date string (YYYY-MM-DD) to a human-readable label.
   * e.g. "Wednesday, 10 Sep 2026"
   */
  formatAppointmentDate: (dateStr: string): string => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-PK', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  },

  /**
   * Returns a contextual countdown label for an appointment.
   * e.g. "Today", "Tomorrow", "In 3 days", "3 days ago"
   */
  getCountdownLabel: (dateStr: string): { label: string; urgency: 'today' | 'soon' | 'upcoming' | 'past' } => {
    const days = appointmentService.getDaysUntil(dateStr);
    if (days === 0) return { label: 'Today', urgency: 'today' };
    if (days === 1) return { label: 'Tomorrow', urgency: 'soon' };
    if (days > 1 && days <= 7) return { label: `In ${days} days`, urgency: 'soon' };
    if (days > 7) return { label: `In ${days} days`, urgency: 'upcoming' };
    return { label: `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`, urgency: 'past' };
  },
};
