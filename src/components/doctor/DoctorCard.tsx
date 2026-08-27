import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Video,
  Building2,
  Heart,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { Doctor } from '../../types/doctor';
import { Avatar } from '../common/Avatar';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatPKR } from '../../utils/formatters';
import { useFavouritesStore } from '../../store/useFavouritesStore';
import { toast } from '../../store/useToastStore';
import { cn } from '../../utils/cn';

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, className }) => {
  const { isFavourite, toggleFavourite } = useFavouritesStore();
  const favourite = isFavourite(doctor.id);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavourite(doctor.id);
    if (added) {
      toast.success(`${doctor.name} saved to your favourites.`);
    } else {
      toast.info(`${doctor.name} removed from your favourites.`);
    }
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-all duration-200 hover:border-[#0D7A5F]/40 hover:shadow-card-hover',
        className
      )}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          <Link to={`/doctors/${doctor.id}`} className="shrink-0 group/avatar">
            <Avatar
              src={doctor.avatarUrl}
              alt={doctor.name}
              size="lg"
              className="rounded-2xl ring-2 ring-transparent group-hover/avatar:ring-[#0D7A5F]/30 transition-all"
            />
          </Link>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                to={`/doctors/${doctor.id}`}
                className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#0D7A5F] transition-colors leading-tight"
              >
                {doctor.name}
              </Link>
              {doctor.pmdcVerified && (
                <span title={`Verified by PMDC (${doctor.pmdcNumber})`}>
                  <Badge variant="pmdc" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                    PMDC
                  </Badge>
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-[#0D7A5F] mt-0.5">
              {doctor.title}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <RatingStars rating={doctor.rating} reviewCount={doctor.reviewCount} size="sm" />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
              <span>{doctor.experienceYears} Yrs Exp</span>
              <span className="text-slate-300">•</span>
              <span>{doctor.languages.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Favourite Button */}
        <button
          onClick={handleFavouriteClick}
          aria-label={favourite ? 'Remove from favourites' : 'Save to favourites'}
          className={cn(
            'p-2 rounded-xl border transition-all cursor-pointer select-none',
            favourite
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 hover:border-rose-200'
          )}
        >
          <Heart className={cn('w-4 h-4', favourite && 'fill-rose-500 text-rose-500')} />
        </button>
      </div>

      {/* Middle Clinic & Info Section */}
      <div className="my-4 pt-3.5 pb-3.5 border-y border-slate-100 space-y-2 text-xs">
        {/* Clinic & Location */}
        <div className="flex items-start gap-2 text-slate-600">
          <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span className="font-medium">
            {doctor.clinicName} — <span className="text-slate-800 font-semibold">{doctor.area}, {doctor.city}</span>
          </span>
        </div>

        {/* Availability & Mode */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Available {doctor.nextAvailableSlot}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {doctor.consultationType === 'both' && (
              <Badge variant="secondary" size="sm" icon={<Video className="w-3 h-3 text-[#0D7A5F]" />}>
                In-Clinic & Video
              </Badge>
            )}
            {doctor.consultationType === 'in-clinic' && (
              <Badge variant="secondary" size="sm">
                In-Clinic Only
              </Badge>
            )}
            {doctor.consultationType === 'online' && (
              <Badge variant="secondary" size="sm" icon={<Video className="w-3 h-3 text-sky-600" />}>
                Video Only
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Fee & Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            Fee (PKR)
          </span>
          <span className="text-base sm:text-lg font-extrabold text-slate-900">
            {formatPKR(doctor.consultationFee)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/doctors/${doctor.id}`}>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </Link>
          <Link to={`/doctors/${doctor.id}#booking`}>
            <Button variant="primary" size="sm" leftIcon={<Calendar className="w-3.5 h-3.5" />}>
              Book Slot
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
