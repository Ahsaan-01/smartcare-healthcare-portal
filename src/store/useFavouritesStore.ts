import { create } from 'zustand';

interface FavouritesState {
  favouriteDoctorIds: string[];
  toggleFavourite: (doctorId: string) => boolean; // returns new state (true if added, false if removed)
  isFavourite: (doctorId: string) => boolean;
  clearFavourites: () => void;
}

const STORAGE_KEY = 'smartcare_favourite_doctors';

const getInitialFavourites = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ['doc-1', 'doc-3'];
  } catch {
    return ['doc-1', 'doc-3'];
  }
};

export const useFavouritesStore = create<FavouritesState>((set, get) => ({
  favouriteDoctorIds: getInitialFavourites(),

  toggleFavourite: (doctorId: string) => {
    const current = get().favouriteDoctorIds;
    const exists = current.includes(doctorId);
    let updated: string[];

    if (exists) {
      updated = current.filter((id) => id !== doctorId);
    } else {
      updated = [...current, doctorId];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ favouriteDoctorIds: updated });
    return !exists;
  },

  isFavourite: (doctorId: string) => {
    return get().favouriteDoctorIds.includes(doctorId);
  },

  clearFavourites: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ favouriteDoctorIds: [] });
  }
}));
