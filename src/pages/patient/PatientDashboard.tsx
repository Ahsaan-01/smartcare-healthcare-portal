import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Heart,
  Search,
  Activity,
  ShieldCheck,
  MapPin,
  PhoneCall
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import { useAuthStore } from '../../store/useAuthStore';
import { useFavouritesStore } from '../../store/useFavouritesStore';
import { MOCK_UPCOMING_APPOINTMENT } from '../../data/mockPatients';
import { MOCK_DOCTORS } from '../../data/mockDoctors';
import { formatPKR } from '../../utils/formatters';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { favouriteDoctorIds } = useFavouritesStore();

  const recommendedDoctors = MOCK_DOCTORS.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* 1. Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0D7A5F] to-[#084E3D] text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold">
            <span>Patient Portal</span> • <span>Karachi, Pakistan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Khushamdeed, {user?.name || 'Muhammad Tariq'}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            Welcome to your SmartCare patient portal. Manage your upcoming consultations, discover specialists, and access your health records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/find-doctors">
            <Button variant="accent" size="md" leftIcon={<Search className="w-4 h-4" />}>
              Find a Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0D7A5F] flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">1</div>
            <div className="text-xs text-slate-500 font-medium">Upcoming Consultation</div>
          </div>
        </div>

        <Link
          to="/patient/favourites"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft hover:border-rose-300 transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {favouriteDoctorIds.length}
            </div>
            <div className="text-xs text-slate-500 font-medium">Saved Doctors</div>
          </div>
        </Link>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">B+</div>
            <div className="text-xs text-slate-500 font-medium">Blood Group (Recorded)</div>
          </div>
        </div>
      </div>

      {/* 3. Upcoming Appointment Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0D7A5F]" />
            <h2 className="text-base font-bold text-slate-900">Next Scheduled Appointment</h2>
          </div>
          <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Doctor Info */}
          <div className="flex items-start gap-4">
            <img
              src={MOCK_UPCOMING_APPOINTMENT.doctorAvatarUrl}
              alt={MOCK_UPCOMING_APPOINTMENT.doctorName}
              className="w-16 h-16 rounded-2xl object-cover object-top border border-slate-200 shrink-0"
            />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                {MOCK_UPCOMING_APPOINTMENT.doctorName}
              </h3>
              <p className="text-xs font-semibold text-[#0D7A5F]">
                {MOCK_UPCOMING_APPOINTMENT.doctorSpecialization}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {MOCK_UPCOMING_APPOINTMENT.clinicName}, {MOCK_UPCOMING_APPOINTMENT.city}
              </p>
            </div>
          </div>

          {/* Time & Consultation Type */}
          <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Date:</span>
              <span className="font-bold text-slate-800">Friday, 28 Aug 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Time (PKT):</span>
              <span className="font-bold text-slate-800">{MOCK_UPCOMING_APPOINTMENT.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Type:</span>
              <span className="font-semibold text-[#0D7A5F]">In-Clinic Consultation</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Fee:</span>
              <span className="font-bold text-slate-900">
                {formatPKR(MOCK_UPCOMING_APPOINTMENT.consultationFee)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Link to={`/doctors/${MOCK_UPCOMING_APPOINTMENT.doctorId}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Doctor Details
              </Button>
            </Link>
            <div className="text-[11px] text-center text-slate-400">
              Ref ID: <span className="font-mono font-bold text-slate-700">{MOCK_UPCOMING_APPOINTMENT.referenceNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Grid */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">Patient Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/find-doctors"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:border-[#0D7A5F]/40 hover:shadow-card-hover transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#0D7A5F] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D7A5F]">
              Find Doctors
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">By city & specialty</div>
          </Link>

          <Link
            to="/patient/favourites"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:border-rose-300 hover:shadow-card-hover transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600">
              Saved Doctors
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{favouriteDoctorIds.length} saved</div>
          </Link>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Health Profile</div>
            <div className="text-[11px] text-slate-400 mt-0.5">B+ Blood Group</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">24/7 Helpline</div>
            <div className="text-[11px] text-slate-400 mt-0.5">021-111-762-782</div>
          </div>
        </div>
      </div>

      {/* 5. Recommended Doctors for You */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Recommended Specialists in Karachi</h2>
          <Link to="/find-doctors" className="text-xs font-semibold text-[#0D7A5F] hover:underline">
            View All Doctors →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};
