import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Video,
  Building2,
  Heart,
  Star,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Share2,
  UserCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { RatingStars } from '../../components/common/RatingStars';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { EmptyState } from '../../components/common/EmptyState';
import { doctorService } from '../../services/doctorService';
import { Doctor, DoctorReview } from '../../types/doctor';
import { formatPKR } from '../../utils/formatters';
import { useFavouritesStore } from '../../store/useFavouritesStore';
import { toast } from '../../store/useToastStore';

export const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [reviews, setReviews] = useState<DoctorReview[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'timings' | 'reviews'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  const { isFavourite, toggleFavourite } = useFavouritesStore();
  const favourite = doctor ? isFavourite(doctor.id) : false;

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    doctorService.getDoctorById(id).then((doc) => {
      setDoctor(doc);
      if (doc) {
        doctorService.getReviewsByDoctorId(doc.id).then((revs) => setReviews(revs));
      }
      setIsLoading(false);
    });
  }, [id]);

  const handleFavouriteToggle = () => {
    if (!doctor) return;
    const added = toggleFavourite(doctor.id);
    if (added) {
      toast.success(`${doctor.name} saved to your favourites.`);
    } else {
      toast.info(`${doctor.name} removed from your favourites.`);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Doctor profile link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-500">
        Loading doctor profile...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          title="Doctor Not Found"
          description="The requested doctor profile does not exist or has been relocated."
          actionLabel="Browse All Doctors"
          onAction={() => navigate('/find-doctors')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Find Doctors', to: '/find-doctors' },
          { label: doctor.name }
        ]}
      />

      {/* 1. Doctor Profile Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Avatar & Key Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover object-top border-2 border-slate-100 shadow-md shrink-0"
            />

            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {doctor.name}
                </h1>
                {doctor.pmdcVerified && (
                  <Badge variant="pmdc" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                    PMDC Verified
                  </Badge>
                )}
              </div>

              <p className="text-sm font-semibold text-[#0D7A5F]">
                {doctor.title}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 flex-wrap">
                <span>{doctor.experienceYears} Years Clinical Experience</span>
                <span>•</span>
                <span>Reg: {doctor.pmdcNumber}</span>
                <span>•</span>
                <span>{doctor.languages.join(', ')}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <RatingStars rating={doctor.rating} reviewCount={doctor.reviewCount} size="md" />
              </div>
            </div>
          </div>

          {/* Quick Action Buttons & Fee Badge */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center md:items-end justify-between gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="text-center md:text-right">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                Consultation Fee
              </span>
              <span className="text-2xl font-extrabold text-slate-900">
                {formatPKR(doctor.consultationFee)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFavouriteToggle}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  favourite
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-500'
                }`}
                title={favourite ? 'Remove from favourites' : 'Save to favourites'}
              >
                <Heart className={`w-4 h-4 ${favourite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-[#0D7A5F] hover:border-slate-300 transition-all cursor-pointer"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <a href="#booking">
                <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                  Book Appointment
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5 text-slate-600">
            <Building2 className="w-4 h-4 text-[#0D7A5F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">{doctor.clinicName}</span>
              <span>{doctor.clinicAddress}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-600">
            <Clock className="w-4 h-4 text-[#0D7A5F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Next Available Slot</span>
              <span className="text-emerald-700 font-semibold">{doctor.nextAvailableSlot}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-600">
            <Video className="w-4 h-4 text-[#0D7A5F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Consultation Modes</span>
              <span>
                {doctor.consultationType === 'both'
                  ? 'In-Clinic & Video Consultation'
                  : doctor.consultationType === 'in-clinic'
                  ? 'In-Clinic Only'
                  : 'Video Consultation'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Tabs & Booking Box Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Tabbed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs Bar */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: 'Overview & Bio' },
              { id: 'experience', label: 'Education & Career' },
              { id: 'timings', label: 'Clinic Schedule' },
              { id: 'reviews', label: `Reviews (${doctor.reviewCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#0D7A5F] text-[#0D7A5F]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6 animate-in fade-in">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">About {doctor.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doctor.about}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Areas of Clinical Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {doctor.expertise.map((exp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0D7A5F] shrink-0" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Services Offered</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {doctor.services.map((srv, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A5F]" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Experience & Education */}
          {activeTab === 'experience' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-8 animate-in fade-in">
              {/* Education */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <GraduationCap className="w-5 h-5 text-[#0D7A5F]" />
                  <span>Medical Degrees & Certifications</span>
                </div>

                <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                  {doctor.education.map((edu, idx) => (
                    <div key={idx} className="relative pl-4 space-y-0.5">
                      <div className="absolute -left-[13px] top-1.5 w-2 h-2 rounded-full bg-[#0D7A5F]" />
                      <div className="text-xs font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-xs text-slate-600">{edu.institution}</div>
                      <div className="text-[11px] text-slate-400">Class of {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Briefcase className="w-5 h-5 text-[#0D7A5F]" />
                  <span>Hospital & Clinical Appointments</span>
                </div>

                <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                  {doctor.experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-4 space-y-0.5">
                      <div className="absolute -left-[13px] top-1.5 w-2 h-2 rounded-full bg-[#0D7A5F]" />
                      <div className="text-xs font-bold text-slate-900">{exp.role}</div>
                      <div className="text-xs text-slate-600">{exp.hospital}</div>
                      <div className="text-[11px] text-[#0D7A5F] font-semibold">{exp.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Clinic Schedule */}
          {activeTab === 'timings' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6 animate-in fade-in">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">In-Clinic Consultation Schedule</h3>
                <div className="space-y-2">
                  {doctor.timings.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <span className="font-bold text-slate-800">{t.days}</span>
                      <span className="font-semibold text-[#0D7A5F] bg-[#E6F4F1] px-2.5 py-1 rounded-md">
                        {t.hours} (PKT)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Location Map</h3>
                <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-2">
                  <MapPin className="w-8 h-8 text-[#0D7A5F] mx-auto" />
                  <div className="text-xs font-bold text-slate-800">{doctor.clinicName}</div>
                  <div className="text-xs text-slate-500">{doctor.clinicAddress}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Patient Reviews */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Verified Patient Feedback
                </h3>
                <div className="text-xs font-bold text-[#0D7A5F]">
                  {doctor.rating.toFixed(1)} / 5.0 Average Rating
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#0D7A5F]" />
                          <span>{rev.patientName}</span>
                          <span className="text-[11px] font-normal text-slate-400">
                            ({rev.patientCity})
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              rev.rating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-slate-600 leading-relaxed italic">
                        "{rev.comment}"
                      </p>

                      <div className="text-[10px] font-semibold text-[#0D7A5F]">
                        Consulted via: {rev.consultationType}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 text-center text-xs text-slate-500">
                  No written reviews yet. Be the first patient to share feedback after your appointment!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Appointment Booking Teaser Box */}
        <div id="booking" className="sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl border-2 border-[#0D7A5F]/40 shadow-xl p-6 space-y-5">
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#0D7A5F]">
                Book Appointment
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Select Consultation Slot
              </h3>
            </div>

            {/* In-Clinic / Online selector */}
            <div className="space-y-2 text-xs font-semibold">
              <label className="text-slate-700 block">Consultation Type:</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2.5 rounded-xl border border-[#0D7A5F] bg-[#E6F4F1] text-[#0D7A5F] font-bold flex items-center justify-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> In-Clinic
                </button>
                <button className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-slate-300 flex items-center justify-center gap-1.5">
                  <Video className="w-3.5 h-3.5" /> Video Call
                </button>
              </div>
            </div>

            {/* Date Picker Teaser */}
            <div className="space-y-2 text-xs font-semibold">
              <label className="text-slate-700 block">Available Days:</label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-2 rounded-xl border border-[#0D7A5F] bg-[#0D7A5F] text-white">
                  <div className="text-[10px]">Today</div>
                  <div className="text-xs font-bold">24 Aug</div>
                </div>
                <div className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300">
                  <div className="text-[10px]">Tomorrow</div>
                  <div className="text-xs font-bold">25 Aug</div>
                </div>
                <div className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300">
                  <div className="text-[10px]">Wed</div>
                  <div className="text-xs font-bold">26 Aug</div>
                </div>
              </div>
            </div>

            {/* Time Slot Teaser */}
            <div className="space-y-2 text-xs font-semibold">
              <label className="text-slate-700 block">Available Slots (PKT):</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 px-3 rounded-xl border border-[#0D7A5F] bg-[#E6F4F1] text-[#0D7A5F] font-bold text-xs">
                  04:30 PM
                </button>
                <button className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300 text-xs">
                  05:15 PM
                </button>
                <button className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300 text-xs">
                  06:00 PM
                </button>
                <button className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300 text-xs">
                  06:45 PM
                </button>
              </div>
            </div>

            {/* Total Fee & Confirmation CTA */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Payable at Clinic:</span>
                <span className="text-base font-extrabold text-slate-900">
                  {formatPKR(doctor.consultationFee)}
                </span>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  toast.success(`Booking slot selected with ${doctor.name}! (Module 2 appointment flow)`);
                }}
              >
                Proceed to Booking (Module 2)
              </Button>

              <p className="text-[10px] text-center text-slate-400">
                Instant confirmation • No upfront credit card required
              </p>
            </div>
          </div>

          {/* Need Assistance Hotline */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-center space-y-1">
            <div className="font-bold text-slate-800 flex items-center justify-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#0D7A5F]" /> Questions about booking?
            </div>
            <p className="text-slate-500 text-[11px]">
              Call SmartCare Support: <strong>021-111-762-782</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
