import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastItem = { ...toast, id };

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    const duration = toast.duration ?? 4000;
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  }
}));

// Quick convenience helpers
export const toast = {
  success: (message: string, title?: string) => useToastStore.getState().addToast({ type: 'success', message, title }),
  error: (message: string, title?: string) => useToastStore.getState().addToast({ type: 'error', message, title }),
  info: (message: string, title?: string) => useToastStore.getState().addToast({ type: 'info', message, title }),
  warning: (message: string, title?: string) => useToastStore.getState().addToast({ type: 'warning', message, title })
};
