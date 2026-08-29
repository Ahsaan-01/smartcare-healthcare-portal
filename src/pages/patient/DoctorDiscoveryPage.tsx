import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  ShieldCheck
} from 'lucide-react';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import { DoctorFilterSidebar } from '../../components/doctor/DoctorFilterSidebar';
import { DoctorCardSkeleton } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { useFilterStore } from '../../store/useFilterStore';
import { doctorService } from '../../services/doctorService';
import { Doctor } from '../../types/doctor';
import { SortOption } from '../../types/filter';

export const DoctorDiscoveryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filterStore = useFilterStore();
  const {
    searchQuery,
    setSearchQuery,
    specialization,
    setSpecialization,
    city,
    setCity,
    area,
    setArea,
    consultationType,
    setConsultationType,
    availability,
    setAvailability,
    gender,
    setGender,
    minRating,
    setMinRating,
    maxFee,
    sortBy,
    setSortBy,
    resetFilters
  } = filterStore;

  // Sync URL query params with filterStore on initial mount
  useEffect(() => {
    const urlSpecialty = searchParams.get('specialty');
    const urlCity = searchParams.get('city');
    const urlSearch = searchParams.get('q');

    if (urlSpecialty) setSpecialization(urlSpecialty);
    if (urlCity) setCity(urlCity);
    if (urlSearch) setSearchQuery(urlSearch);
  }, []);

  // Fetch doctors
  useEffect(() => {
    setIsLoading(true);
    doctorService.getAllDoctors().then((data) => {
      setDoctors(data);
      setIsLoading(false);
    });
  }, []);

  // Apply real-time client filtering & sorting
  const filteredDoctors = useMemo(() => {
    return doctorService.filterDoctors(doctors, {
      searchQuery,
      specialization,
      city,
      area,
      consultationType,
      availability,
      gender,
      minRating,
      maxFee,
      sortBy
    });
  }, [
    doctors,
    searchQuery,
    specialization,
    city,
    area,
    consultationType,
    availability,
    gender,
    minRating,
    maxFee,
    sortBy
  ]);

  // Active filter tags calculation
  const activeFilterTags = useMemo(() => {
    const tags: { id: string; label: string; onRemove: () => void }[] = [];

    if (searchQuery.trim()) {
      tags.push({
        id: 'search',
        label: `"${searchQuery}"`,
        onRemove: () => setSearchQuery('')
      });
    }

    if (specialization && specialization !== 'all') {
      tags.push({
        id: 'spec',
        label: `Specialty: ${specialization}`,
        onRemove: () => setSpecialization('all')
      });
    }

    if (city && city !== 'all') {
      tags.push({
        id: 'city',
        label: `City: ${city}`,
        onRemove: () => setCity('all')
      });
    }

    if (area && area !== 'all') {
      tags.push({
        id: 'area',
        label: `Area: ${area}`,
        onRemove: () => setArea('all')
      });
    }

    if (consultationType && consultationType !== 'all') {
      tags.push({
        id: 'mode',
        label: consultationType === 'in-clinic' ? 'In-Clinic Only' : 'Video Consultation',
        onRemove: () => setConsultationType('all')
      });
    }

    if (availability && availability !== 'all') {
      tags.push({
        id: 'avail',
        label: availability === 'today' ? 'Available Today' : 'Available Tomorrow',
        onRemove: () => setAvailability('all')
      });
    }

    if (gender && gender !== 'all') {
      tags.push({
        id: 'gender',
        label: `Doctor: ${gender}`,
        onRemove: () => setGender('all')
      });
    }

    if (minRating > 0) {
      tags.push({
        id: 'rating',
        label: `Rating: ${minRating}+ Stars`,
        onRemove: () => setMinRating(0)
      });
    }

    if (maxFee < 5000) {
      tags.push({
        id: 'fee',
        label: `Max Fee: Rs. ${maxFee.toLocaleString()}`,
        onRemove: () => resetFilters()
      });
    }

    return tags;
  }, [
    searchQuery,
    specialization,
    city,
    area,
    consultationType,
    availability,
    gender,
    minRating,
    maxFee
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb */}
      <Breadcrumb items={[{ label: 'Find Doctors' }]} />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Verified Doctors in Pakistan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Book physical clinic appointments or online video consultations with PMDC-registered specialists.
          </p>
        </div>

        {/* Results Counter & Mobile Filter Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0D7A5F]" />
            <span>Filters</span>
            {activeFilterTags.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#0D7A5F] text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterTags.length}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="experience-desc">Experience (Years)</option>
              <option value="fee-asc">Fee: Low to High</option>
              <option value="fee-desc">Fee: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-semibold">Active Filters:</span>
          {activeFilterTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E6F4F1] text-[#0D7A5F] border border-[#0D7A5F]/20 font-medium"
            >
              <span>{tag.label}</span>
              <button
                onClick={tag.onRemove}
                className="hover:text-[#084E3D] p-0.5 rounded focus:outline-none cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main 2-Column Discovery Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <DoctorFilterSidebar />
        </div>

        {/* Right Doctor Results List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Status Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-900">{filteredDoctors.length}</strong>{' '}
              {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} matching your criteria
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PMDC Validated
            </span>
          </div>

          {/* Loading Skeletons */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <DoctorCardSkeleton key={n} />
              ))}
            </div>
          )}

          {/* Doctor Cards Grid */}
          {!isLoading && filteredDoctors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}

          {/* No Results Empty State */}
          {!isLoading && filteredDoctors.length === 0 && (
            <EmptyState
              title="No Matching Doctors Found"
              description="We couldn't find any medical specialists matching your current search and filter combination. Try adjusting the city, fee slider, or clearing active filters."
              actionLabel="Reset All Filters"
              onAction={resetFilters}
            />
          )}
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            <DoctorFilterSidebar
              isMobileDrawer
              onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
