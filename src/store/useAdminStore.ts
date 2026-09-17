import { create } from 'zustand';
import {
  AdminDoctorRecord,
  PlatformActivityLog,
  AdminSystemSettings
} from '../types/admin';
import { Specialty } from '../types/doctor';
import {
  MOCK_ADMIN_DOCTORS,
  MOCK_AUDIT_LOGS,
  DEFAULT_ADMIN_SETTINGS
} from '../data/mockAdminData';
import { MOCK_SPECIALTIES } from '../data/mockSpecialties';

interface AdminState {
  doctors: AdminDoctorRecord[];
  specialties: Specialty[];
  settings: AdminSystemSettings;
  auditLogs: PlatformActivityLog[];

  // Doctor Management Actions
  verifyDoctor: (id: string) => void;
  rejectDoctor: (id: string, reason: string) => void;
  suspendDoctor: (id: string, reason: string) => void;
  toggleFeatureDoctor: (id: string) => void;
  updateDoctorFee: (id: string, fee: number) => void;
  addDoctor: (doctor: AdminDoctorRecord) => void;

  // Specialty Management Actions
  addSpecialty: (specialty: Specialty) => void;
  updateSpecialty: (id: string, updates: Partial<Specialty>) => void;
  deleteSpecialty: (id: string) => void;

  // System Settings Actions
  updateSettings: (updates: Partial<AdminSystemSettings>) => void;
  setBroadcast: (broadcast: AdminSystemSettings['broadcastAnnouncement']) => void;
  toggleMaintenance: (enabled: boolean, message?: string) => void;

  // Logging & Maintenance
  addAuditLog: (log: Omit<PlatformActivityLog, 'id' | 'timestamp'>) => void;
  resetDemoData: () => void;
}

const DOCTORS_STORAGE_KEY = 'smartcare_admin_doctors';
const SPECIALTIES_STORAGE_KEY = 'smartcare_admin_specialties';
const SETTINGS_STORAGE_KEY = 'smartcare_admin_settings';
const LOGS_STORAGE_KEY = 'smartcare_admin_logs';

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
    // Storage write fallback
  }
};

export const useAdminStore = create<AdminState>((set) => ({
  doctors: loadFromStorage<AdminDoctorRecord[]>(DOCTORS_STORAGE_KEY, MOCK_ADMIN_DOCTORS),
  specialties: loadFromStorage<Specialty[]>(SPECIALTIES_STORAGE_KEY, MOCK_SPECIALTIES),
  settings: loadFromStorage<AdminSystemSettings>(SETTINGS_STORAGE_KEY, DEFAULT_ADMIN_SETTINGS),
  auditLogs: loadFromStorage<PlatformActivityLog[]>(LOGS_STORAGE_KEY, MOCK_AUDIT_LOGS),

  verifyDoctor: (id) => {
    set((state) => {
      const updatedDoctors = state.doctors.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              verificationStatus: 'verified' as const,
              pmdcVerified: true,
              nextAvailableSlot: 'Today at 04:30 PM'
            }
          : doc
      );
      saveToStorage(DOCTORS_STORAGE_KEY, updatedDoctors);

      const targetDoctor = state.doctors.find((d) => d.id === id);
      const newLog: PlatformActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        category: 'doctor',
        title: 'PMDC Verification Approved',
        description: `${targetDoctor?.name || 'Doctor'} (${targetDoctor?.pmdcNumber || 'PMDC'}) credentials verified and marked active on platform.`,
        actorName: 'System Admin',
        actorRole: 'admin',
        status: 'success',
        targetId: id
      };
      const updatedLogs = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updatedLogs);

      return { doctors: updatedDoctors, auditLogs: updatedLogs };
    });
  },

  rejectDoctor: (id, reason) => {
    set((state) => {
      const updatedDoctors = state.doctors.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              verificationStatus: 'rejected' as const,
              pmdcVerified: false,
              rejectionReason: reason
            }
          : doc
      );
      saveToStorage(DOCTORS_STORAGE_KEY, updatedDoctors);

      const targetDoctor = state.doctors.find((d) => d.id === id);
      const newLog: PlatformActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        category: 'doctor',
        title: 'PMDC Verification Rejected',
        description: `Application for ${targetDoctor?.name || 'Doctor'} rejected. Reason: ${reason}`,
        actorName: 'System Admin',
        actorRole: 'admin',
        status: 'error',
        targetId: id
      };
      const updatedLogs = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updatedLogs);

      return { doctors: updatedDoctors, auditLogs: updatedLogs };
    });
  },

  suspendDoctor: (id, reason) => {
    set((state) => {
      const updatedDoctors = state.doctors.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              verificationStatus: 'suspended' as const,
              pmdcVerified: false,
              rejectionReason: reason
            }
          : doc
      );
      saveToStorage(DOCTORS_STORAGE_KEY, updatedDoctors);

      const targetDoctor = state.doctors.find((d) => d.id === id);
      const newLog: PlatformActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        category: 'doctor',
        title: 'Doctor Profile Suspended',
        description: `${targetDoctor?.name || 'Doctor'} account temporarily suspended. Reason: ${reason}`,
        actorName: 'System Admin',
        actorRole: 'admin',
        status: 'warning',
        targetId: id
      };
      const updatedLogs = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updatedLogs);

      return { doctors: updatedDoctors, auditLogs: updatedLogs };
    });
  },

  toggleFeatureDoctor: (id) => {
    set((state) => {
      const updatedDoctors = state.doctors.map((doc) =>
        doc.id === id ? { ...doc, featured: !doc.featured } : doc
      );
      saveToStorage(DOCTORS_STORAGE_KEY, updatedDoctors);
      return { doctors: updatedDoctors };
    });
  },

  updateDoctorFee: (id, fee) => {
    set((state) => {
      const updatedDoctors = state.doctors.map((doc) =>
        doc.id === id ? { ...doc, consultationFee: fee } : doc
      );
      saveToStorage(DOCTORS_STORAGE_KEY, updatedDoctors);
      return { doctors: updatedDoctors };
    });
  },

  addDoctor: (newDoctor) => {
    set((state) => {
      const updatedDoctors = [newDoctor, ...state.doctors];
      saveToStorage(DOCTORS_STORAGE_KEY, updatedDoctors);

      const newLog: PlatformActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        category: 'doctor',
        title: 'New Specialist Onboarded',
        description: `${newDoctor.name} added to ${newDoctor.city} directory (${newDoctor.specialization}).`,
        actorName: 'System Admin',
        actorRole: 'admin',
        status: 'info',
        targetId: newDoctor.id
      };
      const updatedLogs = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updatedLogs);

      return { doctors: updatedDoctors, auditLogs: updatedLogs };
    });
  },

  addSpecialty: (specialty) => {
    set((state) => {
      const updated = [...state.specialties, specialty];
      saveToStorage(SPECIALTIES_STORAGE_KEY, updated);
      return { specialties: updated };
    });
  },

  updateSpecialty: (id, updates) => {
    set((state) => {
      const updated = state.specialties.map((spec) =>
        spec.id === id ? { ...spec, ...updates } : spec
      );
      saveToStorage(SPECIALTIES_STORAGE_KEY, updated);
      return { specialties: updated };
    });
  },

  deleteSpecialty: (id) => {
    set((state) => {
      const updated = state.specialties.filter((spec) => spec.id !== id);
      saveToStorage(SPECIALTIES_STORAGE_KEY, updated);
      return { specialties: updated };
    });
  },

  updateSettings: (updates) => {
    set((state) => {
      const updated = { ...state.settings, ...updates };
      saveToStorage(SETTINGS_STORAGE_KEY, updated);

      const newLog: PlatformActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        category: 'system',
        title: 'Platform Settings Updated',
        description: 'Administrator updated platform commission and operational preferences.',
        actorName: 'System Admin',
        actorRole: 'admin',
        status: 'info'
      };
      const updatedLogs = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updatedLogs);

      return { settings: updated, auditLogs: updatedLogs };
    });
  },

  setBroadcast: (broadcast) => {
    set((state) => {
      const updatedSettings = { ...state.settings, broadcastAnnouncement: broadcast };
      saveToStorage(SETTINGS_STORAGE_KEY, updatedSettings);

      const newLog: PlatformActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        category: 'system',
        title: broadcast.enabled ? 'Emergency Broadcast Published' : 'Broadcast Deactivated',
        description: broadcast.enabled ? broadcast.message : 'Announcement removed from portal headers.',
        actorName: 'System Admin',
        actorRole: 'admin',
        status: broadcast.type === 'emergency' ? 'error' : 'warning'
      };
      const updatedLogs = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updatedLogs);

      return { settings: updatedSettings, auditLogs: updatedLogs };
    });
  },

  toggleMaintenance: (enabled, message) => {
    set((state) => {
      const updatedSettings: AdminSystemSettings = {
        ...state.settings,
        maintenanceMode: enabled,
        maintenanceMessage: message || state.settings.maintenanceMessage
      };
      saveToStorage(SETTINGS_STORAGE_KEY, updatedSettings);

      const newLog: PlatformActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        category: 'system',
        title: enabled ? 'Maintenance Mode Activated' : 'Maintenance Mode Deactivated',
        description: enabled ? 'Platform services switched to maintenance.' : 'All public services restored.',
        actorName: 'System Admin',
        actorRole: 'admin',
        status: enabled ? 'warning' : 'success'
      };
      const updatedLogs = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updatedLogs);

      return { settings: updatedSettings, auditLogs: updatedLogs };
    });
  },

  addAuditLog: (log) => {
    const newLog: PlatformActivityLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString()
    };
    set((state) => {
      const updated = [newLog, ...state.auditLogs];
      saveToStorage(LOGS_STORAGE_KEY, updated);
      return { auditLogs: updated };
    });
  },

  resetDemoData: () => {
    localStorage.removeItem(DOCTORS_STORAGE_KEY);
    localStorage.removeItem(SPECIALTIES_STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    localStorage.removeItem(LOGS_STORAGE_KEY);
    set({
      doctors: MOCK_ADMIN_DOCTORS,
      specialties: MOCK_SPECIALTIES,
      settings: DEFAULT_ADMIN_SETTINGS,
      auditLogs: MOCK_AUDIT_LOGS
    });
  }
}));
