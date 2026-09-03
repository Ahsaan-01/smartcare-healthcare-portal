import { create } from 'zustand';
import { Appointment, AppointmentNotification, AppointmentConsultationType } from '../types/appointment';
import { MOCK_APPOINTMENTS } from '../data/mockAppointments';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';

// ── Booking Wizard State ─────────────────────────────────────────────────────
export interface BookingWizardState {
  step: 1 | 2 | 3 | 4;
  doctorId: string | null;
  consultationType: AppointmentConsultationType | null;
  selectedDate: string | null;   // YYYY-MM-DD
  selectedSlotId: string | null;
  selectedTime: string | null;
  patientNotes: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  confirmedReferenceNumber: string | null;
}

const defaultBookingState: BookingWizardState = {
  step: 1,
  doctorId: null,
  consultationType: null,
  selectedDate: null,
  selectedSlotId: null,
  selectedTime: null,
  patientNotes: '',
  isSubmitting: false,
  isSuccess: false,
  confirmedReferenceNumber: null,
};

// ── Store Interface ───────────────────────────────────────────────────────────
interface AppointmentState {
  appointments: Appointment[];
  notifications: AppointmentNotification[];
  booking: BookingWizardState;

  // Getters
  getUpcoming: (patientId: string) => Appointment[];
  getPast: (patientId: string) => Appointment[];
  getCancelled: (patientId: string) => Appointment[];
  getUnreadCount: () => number;
  getAppointmentById: (id: string) => Appointment | undefined;

  // Booking wizard actions
  initBooking: (doctorId: string) => void;
  setConsultationType: (type: AppointmentConsultationType) => void;
  setSelectedDate: (date: string) => void;
  setSelectedSlot: (slotId: string, time: string) => void;
  setPatientNotes: (notes: string) => void;
  goToStep: (step: 1 | 2 | 3 | 4) => void;
  confirmBooking: (appointmentData: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Promise<string>;
  resetBooking: () => void;

  // Appointment management
  cancelAppointment: (id: string, reason: string) => void;

  // Notification actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'smartcare_appointments';
const NOTIF_STORAGE_KEY = 'smartcare_notifications';

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
};

const generateReferenceNumber = (): string => {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `SC-${year}-${rand}`;
};

// ── Store ─────────────────────────────────────────────────────────────────────
export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: loadFromStorage<Appointment[]>(STORAGE_KEY, MOCK_APPOINTMENTS),
  notifications: loadFromStorage<AppointmentNotification[]>(NOTIF_STORAGE_KEY, MOCK_NOTIFICATIONS),
  booking: defaultBookingState,

  // ── Getters ──────────────────────────────────────────────────────────────
  getUpcoming: (patientId) => {
    return get()
      .appointments
      .filter((a) => a.patientId === patientId && (a.status === 'confirmed' || a.status === 'pending'))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  getPast: (patientId) => {
    return get()
      .appointments
      .filter((a) => a.patientId === patientId && a.status === 'completed')
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  getCancelled: (patientId) => {
    return get()
      .appointments
      .filter((a) => a.patientId === patientId && a.status === 'cancelled')
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },

  getAppointmentById: (id) => {
    return get().appointments.find((a) => a.id === id);
  },

  // ── Booking Wizard ────────────────────────────────────────────────────────
  initBooking: (doctorId) => {
    set({ booking: { ...defaultBookingState, doctorId } });
  },

  setConsultationType: (type) => {
    set((state) => ({ booking: { ...state.booking, consultationType: type } }));
  },

  setSelectedDate: (date) => {
    set((state) => ({ booking: { ...state.booking, selectedDate: date, selectedSlotId: null, selectedTime: null } }));
  },

  setSelectedSlot: (slotId, time) => {
    set((state) => ({ booking: { ...state.booking, selectedSlotId: slotId, selectedTime: time } }));
  },

  setPatientNotes: (notes) => {
    set((state) => ({ booking: { ...state.booking, patientNotes: notes } }));
  },

  goToStep: (step) => {
    set((state) => ({ booking: { ...state.booking, step } }));
  },

  confirmBooking: async (appointmentData) => {
    set((state) => ({ booking: { ...state.booking, isSubmitting: true } }));
    await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate API call

    const refNumber = generateReferenceNumber();
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `appt-${Date.now()}`,
      referenceNumber: refNumber,
      status: 'confirmed',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const newNotification: AppointmentNotification = {
      id: `notif-${Date.now()}`,
      type: 'confirmed',
      title: 'Appointment Confirmed',
      message: `Your appointment with ${appointmentData.doctorName} on ${appointmentData.date} at ${appointmentData.time} is confirmed. Ref: ${refNumber}.`,
      appointmentId: newAppointment.id,
      doctorId: appointmentData.doctorId,
      read: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedAppointments = [newAppointment, ...state.appointments];
      const updatedNotifications = [newNotification, ...state.notifications];
      saveToStorage(STORAGE_KEY, updatedAppointments);
      saveToStorage(NOTIF_STORAGE_KEY, updatedNotifications);
      return {
        appointments: updatedAppointments,
        notifications: updatedNotifications,
        booking: {
          ...state.booking,
          isSubmitting: false,
          isSuccess: true,
          confirmedReferenceNumber: refNumber,
        },
      };
    });

    return refNumber;
  },

  resetBooking: () => {
    set({ booking: defaultBookingState });
  },

  // ── Appointment Management ────────────────────────────────────────────────
  cancelAppointment: (id, reason) => {
    set((state) => {
      const updatedAppointments = state.appointments.map((a) =>
        a.id === id ? { ...a, status: 'cancelled' as const, cancellationReason: reason } : a
      );

      const cancelledAppt = updatedAppointments.find((a) => a.id === id);
      const cancelledNotif: AppointmentNotification = {
        id: `notif-cancel-${Date.now()}`,
        type: 'cancelled',
        title: 'Appointment Cancelled',
        message: `Your appointment with ${cancelledAppt?.doctorName ?? 'the doctor'} has been cancelled. Reason: ${reason}`,
        appointmentId: id,
        read: false,
        createdAt: new Date().toISOString(),
      };

      const updatedNotifications = [cancelledNotif, ...state.notifications];
      saveToStorage(STORAGE_KEY, updatedAppointments);
      saveToStorage(NOTIF_STORAGE_KEY, updatedNotifications);
      return { appointments: updatedAppointments, notifications: updatedNotifications };
    });
  },

  // ── Notifications ─────────────────────────────────────────────────────────
  markNotificationRead: (id) => {
    set((state) => {
      const updated = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveToStorage(NOTIF_STORAGE_KEY, updated);
      return { notifications: updated };
    });
  },

  markAllNotificationsRead: () => {
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, read: true }));
      saveToStorage(NOTIF_STORAGE_KEY, updated);
      return { notifications: updated };
    });
  },
}));
