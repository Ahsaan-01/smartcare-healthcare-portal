export type SortOption = 'recommended' | 'rating-desc' | 'experience-desc' | 'fee-asc' | 'fee-desc';

export interface DoctorFilterState {
  searchQuery: string;
  specialization: string;
  city: string;
  area: string;
  consultationType: 'all' | 'in-clinic' | 'online';
  availability: 'all' | 'today' | 'tomorrow' | 'this-week';
  gender: 'all' | 'Male' | 'Female';
  minRating: number;
  maxFee: number;
  sortBy: SortOption;
}
