import { Doctor, Specialty, PakistaniCity, DoctorReview } from '../types/doctor';
import { DoctorFilterState } from '../types/filter';
import { MOCK_DOCTORS } from '../data/mockDoctors';
import { MOCK_SPECIALTIES } from '../data/mockSpecialties';
import { MOCK_CITIES } from '../data/mockCities';
import { MOCK_REVIEWS } from '../data/mockReviews';

export const doctorService = {
  getAllDoctors: async (): Promise<Doctor[]> => {
    // Simulate brief network delay
    await new Promise((r) => setTimeout(r, 100));
    return [...MOCK_DOCTORS];
  },

  getFeaturedDoctors: async (): Promise<Doctor[]> => {
    return MOCK_DOCTORS.filter((d) => d.featured || d.rating >= 4.8);
  },

  getDoctorById: async (id: string): Promise<Doctor | null> => {
    await new Promise((r) => setTimeout(r, 80));
    return MOCK_DOCTORS.find((d) => d.id === id) || null;
  },

  getReviewsByDoctorId: async (doctorId: string): Promise<DoctorReview[]> => {
    return MOCK_REVIEWS[doctorId] || [];
  },

  getSpecialties: async (): Promise<Specialty[]> => {
    return [...MOCK_SPECIALTIES];
  },

  getCities: async (): Promise<PakistaniCity[]> => {
    return [...MOCK_CITIES];
  },

  filterDoctors: (doctors: Doctor[], filters: DoctorFilterState): Doctor[] => {
    let result = [...doctors];

    // 1. Keyword search (Doctor name, specialization, clinic name, area, conditions)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q) ||
          doc.clinicName.toLowerCase().includes(q) ||
          doc.area.toLowerCase().includes(q) ||
          doc.city.toLowerCase().includes(q) ||
          doc.expertise.some((exp) => exp.toLowerCase().includes(q))
      );
    }

    // 2. Specialization filter
    if (filters.specialization && filters.specialization !== 'all') {
      result = result.filter(
        (doc) =>
          doc.specializationId === filters.specialization ||
          doc.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
      );
    }

    // 3. City filter
    if (filters.city && filters.city !== 'all') {
      result = result.filter((doc) => doc.city.toLowerCase() === filters.city.toLowerCase());
    }

    // 4. Sub-area filter
    if (filters.area && filters.area !== 'all') {
      result = result.filter((doc) => doc.area.toLowerCase().includes(filters.area.toLowerCase()));
    }

    // 5. Consultation type
    if (filters.consultationType && filters.consultationType !== 'all') {
      result = result.filter((doc) => doc.consultationType === 'both' || doc.consultationType === filters.consultationType);
    }

    // 6. Availability
    if (filters.availability && filters.availability !== 'all') {
      if (filters.availability === 'today') {
        result = result.filter((doc) => doc.nextAvailableSlot.toLowerCase().includes('today'));
      } else if (filters.availability === 'tomorrow') {
        result = result.filter((doc) => doc.nextAvailableSlot.toLowerCase().includes('tomorrow'));
      }
    }

    // 7. Gender filter
    if (filters.gender && filters.gender !== 'all') {
      result = result.filter((doc) => doc.gender === filters.gender);
    }

    // 8. Minimum rating
    if (filters.minRating > 0) {
      result = result.filter((doc) => doc.rating >= filters.minRating);
    }

    // 9. Maximum fee
    if (filters.maxFee) {
      result = result.filter((doc) => doc.consultationFee <= filters.maxFee);
    }

    // 10. Sorting
    switch (filters.sortBy) {
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'experience-desc':
        result.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case 'fee-asc':
        result.sort((a, b) => a.consultationFee - b.consultationFee);
        break;
      case 'fee-desc':
        result.sort((a, b) => b.consultationFee - a.consultationFee);
        break;
      case 'recommended':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
        break;
    }

    return result;
  }
};
