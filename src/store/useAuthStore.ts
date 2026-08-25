import { create } from 'zustand';
import { User, UserRole, PatientProfile } from '../types/user';
import { MOCK_PATIENT_PROFILE } from '../data/mockPatients';
import { DEMO_CREDENTIALS } from '../utils/constants';

interface AuthState {
  user: User | PatientProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: (role: UserRole) => Promise<boolean>;
  signup: (data: { name: string; email: string; phone: string; password: string; role: UserRole; city?: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User | PatientProfile>) => void;
}

const STORAGE_KEY = 'smartcare_auth_user';

const getInitialUser = (): User | PatientProfile | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalizedEmail = email.trim().toLowerCase();

    // Check demo credentials
    if (normalizedEmail === DEMO_CREDENTIALS.patient.email && password === DEMO_CREDENTIALS.patient.password) {
      const user = MOCK_PATIENT_PROFILE;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false, error: null });
      return true;
    }

    if (normalizedEmail === DEMO_CREDENTIALS.doctor.email && password === DEMO_CREDENTIALS.doctor.password) {
      const user: User = {
        id: 'doc-1',
        name: 'Dr. Ayesha Khan',
        email: DEMO_CREDENTIALS.doctor.email,
        role: 'doctor',
        phone: '+92 300 1234567',
        city: 'Karachi',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
        createdAt: '2025-01-15'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false, error: null });
      return true;
    }

    if (normalizedEmail === DEMO_CREDENTIALS.admin.email && password === DEMO_CREDENTIALS.admin.password) {
      const user: User = {
        id: 'admin-1',
        name: 'System Admin',
        email: DEMO_CREDENTIALS.admin.email,
        role: 'admin',
        city: 'Islamabad',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
        createdAt: '2025-01-01'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false, error: null });
      return true;
    }

    // Generic fallback login for custom tests
    if (password.length >= 6) {
      const user: PatientProfile = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email: normalizedEmail,
        role: 'patient',
        phone: '+92 300 0000000',
        city: 'Karachi',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false, error: null });
      return true;
    }

    set({ isLoading: false, error: 'Invalid email or password. Use demo shortcuts or valid credentials.' });
    return false;
  },

  loginAsDemo: async (role: UserRole) => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 300));

    let user: User | PatientProfile;
    if (role === 'patient') {
      user = MOCK_PATIENT_PROFILE;
    } else if (role === 'doctor') {
      user = {
        id: 'doc-1',
        name: 'Dr. Ayesha Khan',
        email: DEMO_CREDENTIALS.doctor.email,
        role: 'doctor',
        phone: '+92 300 1234567',
        city: 'Karachi',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
        createdAt: '2025-01-15'
      };
    } else {
      user = {
        id: 'admin-1',
        name: 'System Admin',
        email: DEMO_CREDENTIALS.admin.email,
        role: 'admin',
        city: 'Islamabad',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
        createdAt: '2025-01-01'
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true, isLoading: false, error: null });
    return true;
  },

  signup: async (data) => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newUser: PatientProfile = {
      id: `pat-${Date.now()}`,
      name: data.name,
      email: data.email.trim().toLowerCase(),
      phone: data.phone,
      role: 'patient',
      city: data.city || 'Karachi',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true, isLoading: false, error: null });
    return true;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateUser: (data) => {
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { user: updated as User | PatientProfile };
    });
  }
}));
