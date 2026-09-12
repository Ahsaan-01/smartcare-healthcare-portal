import { create } from 'zustand';
import {
  DutyStatus,
  DoctorScheduleConfig,
  DoctorPatientRecord,
  DigitalPrescription,
  DayShiftConfig
} from '../types/doctorPortal';
import {
  DEFAULT_DOCTOR_SCHEDULE,
  MOCK_DOCTOR_PATIENTS,
  MOCK_INITIAL_PRESCRIPTIONS
} from '../data/mockDoctorPortal';

interface DoctorState {
  dutyStatus: DutyStatus;
  selectedClinic: string;
  scheduleConfig: DoctorScheduleConfig;
  patientRecords: DoctorPatientRecord[];
  prescriptions: DigitalPrescription[];

  // Actions
  setDutyStatus: (status: DutyStatus) => void;
  setSelectedClinic: (clinic: string) => void;
  updateScheduleConfig: (config: Partial<DoctorScheduleConfig>) => void;
  toggleDayEnabled: (day: DayShiftConfig['day']) => void;
  updateDayShift: (day: DayShiftConfig['day'], updates: Partial<DayShiftConfig>) => void;
  toggleSlotOverride: (date: string, time: string, isAvailable: boolean) => void;
  setEmergencyOff: (enabled: boolean, reason?: string) => void;
  issuePrescription: (data: Omit<DigitalPrescription, 'id' | 'createdAt'>) => DigitalPrescription;
  getPrescriptionById: (id: string) => DigitalPrescription | undefined;
  getPrescriptionByAppointmentId: (appointmentId: string) => DigitalPrescription | undefined;
  getPatientById: (id: string) => DoctorPatientRecord | undefined;
  updatePatientRecord: (id: string, updates: Partial<DoctorPatientRecord>) => void;
  addPatientRecord: (record: DoctorPatientRecord) => void;
}

const SCHEDULE_STORAGE_KEY = 'smartcare_doctor_schedule';
const PATIENTS_STORAGE_KEY = 'smartcare_doctor_patients';
const PRESCRIPTIONS_STORAGE_KEY = 'smartcare_doctor_prescriptions';
const STATUS_STORAGE_KEY = 'smartcare_doctor_status';

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

export const useDoctorStore = create<DoctorState>((set, get) => ({
  dutyStatus: loadFromStorage<DutyStatus>(STATUS_STORAGE_KEY, 'available'),
  selectedClinic: 'SmartCare Heart & Vascular Institute, Clifton',
  scheduleConfig: loadFromStorage<DoctorScheduleConfig>(SCHEDULE_STORAGE_KEY, DEFAULT_DOCTOR_SCHEDULE),
  patientRecords: loadFromStorage<DoctorPatientRecord[]>(PATIENTS_STORAGE_KEY, MOCK_DOCTOR_PATIENTS),
  prescriptions: loadFromStorage<DigitalPrescription[]>(PRESCRIPTIONS_STORAGE_KEY, MOCK_INITIAL_PRESCRIPTIONS),

  setDutyStatus: (status) => {
    saveToStorage(STATUS_STORAGE_KEY, status);
    set({ dutyStatus: status });
  },

  setSelectedClinic: (clinic) => {
    set({ selectedClinic: clinic });
  },

  updateScheduleConfig: (updates) => {
    set((state) => {
      const updated = { ...state.scheduleConfig, ...updates };
      saveToStorage(SCHEDULE_STORAGE_KEY, updated);
      return { scheduleConfig: updated };
    });
  },

  toggleDayEnabled: (day) => {
    set((state) => {
      const updatedDays = state.scheduleConfig.weeklyWorkingDays.map((d) =>
        d.day === day ? { ...d, enabled: !d.enabled } : d
      );
      const updated = { ...state.scheduleConfig, weeklyWorkingDays: updatedDays };
      saveToStorage(SCHEDULE_STORAGE_KEY, updated);
      return { scheduleConfig: updated };
    });
  },

  updateDayShift: (day, updates) => {
    set((state) => {
      const updatedDays = state.scheduleConfig.weeklyWorkingDays.map((d) =>
        d.day === day ? { ...d, ...updates } : d
      );
      const updated = { ...state.scheduleConfig, weeklyWorkingDays: updatedDays };
      saveToStorage(SCHEDULE_STORAGE_KEY, updated);
      return { scheduleConfig: updated };
    });
  },

  toggleSlotOverride: (date, time, isAvailable) => {
    set((state) => {
      const key = `${date}_${time}`;
      const updatedOverrides = {
        ...state.scheduleConfig.slotOverrides,
        [key]: isAvailable
      };
      const updated = { ...state.scheduleConfig, slotOverrides: updatedOverrides };
      saveToStorage(SCHEDULE_STORAGE_KEY, updated);
      return { scheduleConfig: updated };
    });
  },

  setEmergencyOff: (enabled, reason) => {
    set((state) => {
      const updated: DoctorScheduleConfig = {
        ...state.scheduleConfig,
        isEmergencyOff: enabled,
        emergencyOffReason: reason || ''
      };
      saveToStorage(SCHEDULE_STORAGE_KEY, updated);
      const dutyStatus: DutyStatus = enabled ? 'emergency-off' : 'available';
      saveToStorage(STATUS_STORAGE_KEY, dutyStatus);
      return { scheduleConfig: updated, dutyStatus };
    });
  },

  issuePrescription: (data) => {
    const newPrescription: DigitalPrescription = {
      ...data,
      id: `rx-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    set((state) => {
      const updatedPrescriptions = [newPrescription, ...state.prescriptions];
      saveToStorage(PRESCRIPTIONS_STORAGE_KEY, updatedPrescriptions);

      // Update patient records
      const updatedPatients = state.patientRecords.map((patient) => {
        if (patient.id === data.patientId || patient.name.toLowerCase() === data.patientName.toLowerCase()) {
          return {
            ...patient,
            totalVisits: patient.totalVisits + 1,
            lastVisitDate: data.date,
            lastDiagnosis: data.diagnosis,
            visitHistory: [
              {
                appointmentId: data.appointmentId,
                date: data.date,
                consultationType: 'in-clinic' as const,
                diagnosis: data.diagnosis,
                prescriptionId: newPrescription.id
              },
              ...patient.visitHistory
            ]
          };
        }
        return patient;
      });

      saveToStorage(PATIENTS_STORAGE_KEY, updatedPatients);
      return {
        prescriptions: updatedPrescriptions,
        patientRecords: updatedPatients
      };
    });

    return newPrescription;
  },

  getPrescriptionById: (id) => {
    return get().prescriptions.find((p) => p.id === id);
  },

  getPrescriptionByAppointmentId: (appointmentId) => {
    return get().prescriptions.find((p) => p.appointmentId === appointmentId);
  },

  getPatientById: (id) => {
    return get().patientRecords.find((p) => p.id === id);
  },

  updatePatientRecord: (id, updates) => {
    set((state) => {
      const updatedPatients = state.patientRecords.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      saveToStorage(PATIENTS_STORAGE_KEY, updatedPatients);
      return { patientRecords: updatedPatients };
    });
  },

  addPatientRecord: (record) => {
    set((state) => {
      const updatedPatients = [record, ...state.patientRecords];
      saveToStorage(PATIENTS_STORAGE_KEY, updatedPatients);
      return { patientRecords: updatedPatients };
    });
  }
}));
