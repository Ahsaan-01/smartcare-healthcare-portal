import { create } from 'zustand';
import { DoctorFilterState, SortOption } from '../types/filter';
import { DEFAULT_FILTERS } from '../utils/constants';

interface FilterStore extends DoctorFilterState {
  setSearchQuery: (query: string) => void;
  setSpecialization: (specialization: string) => void;
  setCity: (city: string) => void;
  setArea: (area: string) => void;
  setConsultationType: (type: 'all' | 'in-clinic' | 'online') => void;
  setAvailability: (availability: 'all' | 'today' | 'tomorrow' | 'this-week') => void;
  setGender: (gender: 'all' | 'Male' | 'Female') => void;
  setMinRating: (rating: number) => void;
  setMaxFee: (fee: number) => void;
  setSortBy: (sort: SortOption) => void;
  setFilters: (filters: Partial<DoctorFilterState>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...DEFAULT_FILTERS,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSpecialization: (specialization) => set({ specialization }),
  setCity: (city) => set({ city, area: 'all' }),
  setArea: (area) => set({ area }),
  setConsultationType: (consultationType) => set({ consultationType }),
  setAvailability: (availability) => set({ availability }),
  setGender: (gender) => set({ gender }),
  setMinRating: (minRating) => set({ minRating }),
  setMaxFee: (maxFee) => set({ maxFee }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set(DEFAULT_FILTERS)
}));
