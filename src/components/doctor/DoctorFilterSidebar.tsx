import React from 'react';
import {
  RotateCcw,
  Search,
  MapPin,
  Stethoscope,
  Video,
  Clock,
  User,
  Star,
  Banknote,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';
import { MOCK_SPECIALTIES } from '../../data/mockSpecialties';
import { MOCK_CITIES } from '../../data/mockCities';
import { Button } from '../common/Button';
import { formatPKR } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface DoctorFilterSidebarProps {
  className?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const DoctorFilterSidebar: React.FC<DoctorFilterSidebarProps> = ({
  className,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
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
    setMaxFee,
    resetFilters
  } = useFilterStore();

  const selectedCityObj = MOCK_CITIES.find((c) => c.name.toLowerCase() === city.toLowerCase());

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6 shadow-soft',
        isMobileDrawer && 'border-none p-0 shadow-none',
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#0D7A5F]" />
          <h3 className="text-sm font-bold text-slate-900">Filters</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-slate-500 hover:text-[#0D7A5F] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Keyword Search */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-slate-400" /> Search Doctor / Clinic
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g. Dr. Ayesha, Clifton..."
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
        />
      </div>

      {/* 2. Specialization */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Stethoscope className="w-3.5 h-3.5 text-slate-400" /> Specialization
        </label>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
        >
          <option value="all">All Specializations (12+)</option>
          {MOCK_SPECIALTIES.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name} ({spec.doctorCount})
            </option>
          ))}
        </select>
      </div>

      {/* 3. Pakistani City & Sub-Area */}
      <div className="space-y-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> City
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
          >
            <option value="all">All Pakistani Cities</option>
            {MOCK_CITIES.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} ({c.doctorCount} Doctors)
              </option>
            ))}
          </select>
        </div>

        {/* Sub-area dropdown if a city is selected */}
        {selectedCityObj && selectedCityObj.popularAreas.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600">
              Popular Area in {selectedCityObj.name}
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
            >
              <option value="all">All Areas in {selectedCityObj.name}</option>
              {selectedCityObj.popularAreas.map((ar) => (
                <option key={ar} value={ar}>
                  {ar}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 4. Consultation Mode */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5 text-slate-400" /> Consultation Mode
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setConsultationType('all')}
            className={cn(
              'py-1.5 rounded-lg text-center transition-all cursor-pointer',
              consultationType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setConsultationType('in-clinic')}
            className={cn(
              'py-1.5 rounded-lg text-center transition-all cursor-pointer',
              consultationType === 'in-clinic' ? 'bg-white text-[#0D7A5F] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            In-Clinic
          </button>
          <button
            type="button"
            onClick={() => setConsultationType('online')}
            className={cn(
              'py-1.5 rounded-lg text-center transition-all cursor-pointer',
              consultationType === 'online' ? 'bg-white text-sky-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Video
          </button>
        </div>
      </div>

      {/* 5. Availability */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" /> Availability
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setAvailability(availability === 'today' ? 'all' : 'today')}
            className={cn(
              'px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer',
              availability === 'today'
                ? 'bg-[#E6F4F1] border-[#0D7A5F] text-[#0D7A5F]'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            )}
          >
            Available Today
          </button>
          <button
            type="button"
            onClick={() => setAvailability(availability === 'tomorrow' ? 'all' : 'tomorrow')}
            className={cn(
              'px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer',
              availability === 'tomorrow'
                ? 'bg-[#E6F4F1] border-[#0D7A5F] text-[#0D7A5F]'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            )}
          >
            Tomorrow
          </button>
        </div>
      </div>

      {/* 6. Gender Preference */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-400" /> Doctor Gender
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
          {(['all', 'Female', 'Male'] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={cn(
                'py-1.5 rounded-xl border text-center transition-all cursor-pointer',
                gender === g
                  ? 'bg-[#0D7A5F] text-white border-[#0D7A5F] font-bold'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              )}
            >
              {g === 'all' ? 'Any' : g}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Maximum Consultation Fee (PKR) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-700 flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 text-slate-400" /> Max Fee (PKR)
          </label>
          <span className="font-bold text-[#0D7A5F] bg-[#E6F4F1] px-2 py-0.5 rounded-md">
            {formatPKR(maxFee)}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="5000"
          step="500"
          value={maxFee}
          onChange={(e) => setMaxFee(Number(e.target.value))}
          className="w-full accent-[#0D7A5F] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Rs. 1,000</span>
          <span>Rs. 5,000</span>
        </div>
      </div>

      {/* 8. Minimum Rating */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-slate-400" /> Minimum Rating
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[0, 4.0, 4.5, 4.8].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={cn(
                'px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1 cursor-pointer',
                minRating === r
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              )}
            >
              {r === 0 ? (
                'All'
              ) : (
                <>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{r}+</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {isMobileDrawer && onCloseMobileDrawer && (
        <div className="pt-2">
          <Button variant="primary" className="w-full" onClick={onCloseMobileDrawer}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
};
