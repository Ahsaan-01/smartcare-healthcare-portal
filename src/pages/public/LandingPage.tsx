import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  ArrowRight,
  HeartPulse,
  Award
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SpecialtyCard } from '../../components/doctor/SpecialtyCard';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import { MOCK_SPECIALTIES } from '../../data/mockSpecialties';
import { MOCK_DOCTORS } from '../../data/mockDoctors';
import { MOCK_CITIES } from '../../data/mockCities';
import { useFilterStore } from '../../store/useFilterStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCity, setSpecialization, setSearchQuery } = useFilterStore();

  const [heroSearch, setHeroSearch] = useState('');
  const [heroCity, setHeroCity] = useState('Karachi');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(heroSearch);
    setCity(heroCity);
    navigate('/find-doctors');
  };

  const handleQuickSpecialty = (specId: string) => {
    setSpecialization(specId);
    navigate('/find-doctors');
  };

  const featuredDoctors = MOCK_DOCTORS.filter((d) => d.featured).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F4F1]/60 via-slate-50 to-slate-50 pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* National Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0D7A5F]/20 text-[#0D7A5F] text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#0D7A5F]" />
              <span>Pakistan’s Trusted Healthcare & Appointment Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Find Trusted Doctors & Book Appointments Across{' '}
              <span className="text-[#0D7A5F] underline decoration-[#0D7A5F]/20">Pakistan</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Connect with over 15,000+ PMDC-verified specialists in Karachi, Lahore, Islamabad, and nationwide. Book in-clinic or video consultations with transparent PKR fees.
            </p>
          </div>

          {/* Interactive Search Box */}
          <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
            >
              {/* Keyword Search */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-2xl border border-slate-200/80 focus-within:border-[#0D7A5F] focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Doctor name, specialty (e.g. Cardiologist)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* City Dropdown */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-2xl border border-slate-200/80 focus-within:border-[#0D7A5F] focus-within:bg-white transition-all sm:w-48 shrink-0">
                <MapPin className="w-4 h-4 text-[#0D7A5F] shrink-0" />
                <select
                  value={heroCity}
                  onChange={(e) => setHeroCity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none"
                >
                  {MOCK_CITIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-6 py-3 shrink-0"
                leftIcon={<Search className="w-4 h-4" />}
              >
                Find Doctors
              </Button>
            </form>

            {/* Quick Specialty Tags */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Popular:</span>
              {[
                { name: 'Cardiologist', id: 'cardiology' },
                { name: 'Dermatologist', id: 'dermatology' },
                { name: 'Gynecologist', id: 'gynecology' },
                { name: 'Pediatrician', id: 'pediatrics' },
                { name: 'Dentist', id: 'dentistry' }
              ].map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => handleQuickSpecialty(spec.id)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#0D7A5F] hover:text-[#0D7A5F] transition-all cursor-pointer"
                >
                  {spec.name}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Metric Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-[#0D7A5F]">15,000+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">PMDC Verified Doctors</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">50+ Cities</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Across Pakistan</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-[#0D7A5F]">4.9 / 5.0</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Patient Satisfaction</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">250,000+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Appointments Booked</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SPECIALIZATIONS SECTION */}
      <section id="specialties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0D7A5F]">
              Comprehensive Medical Specialties
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Browse Doctors by Specialization
            </h2>
          </div>
          <Link to="/find-doctors" className="mt-3 md:mt-0">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 12+ Specialties
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_SPECIALTIES.slice(0, 8).map((specialty) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED PAKISTANI DOCTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0D7A5F]">
              Top-Rated Specialists
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Featured Doctors in Karachi, Lahore & Islamabad
            </h2>
          </div>
          <Link to="/find-doctors" className="mt-3 md:mt-0">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Browse All Doctors
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* 4. HOW SMARTCARE WORKS */}
      <section id="how-it-works" className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            How SmartCare Simplifies Healthcare in Pakistan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0D7A5F] text-white flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Find & Compare Specialists</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Search by city (Karachi, Lahore, Islamabad), PMDC credentials, consultation fees in PKR, patient reviews, and available timings.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0D7A5F] text-white flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Select Date & Mode</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Pick your preferred consultation slot. Choose either an in-clinic visit in your local area or a private online video consultation from home.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0D7A5F] text-white flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Instant Confirmation & Care</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Get an instant booking reference number, SMS/email notifications, and timely reminders before your consultation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS & TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0D7A5F]">
                Healthcare Built for Pakistan
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1 leading-tight">
                Designed for Reliable, Transparent Patient Care
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0D7A5F] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Rigorous PMDC Verification</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Every practitioner’s credentials and degrees (MBBS, FCPS, MRCP) are thoroughly validated before listing on SmartCare.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0D7A5F] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Transparent PKR Pricing</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    No hidden charges. Clear consultation fees in Pakistani Rupees displayed upfront for both physical and online sessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0D7A5F] shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Personalized Health Portal</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Easily maintain your health summary, emergency contacts, upcoming consultations, and saved favourite doctors in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Highlight Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0D7A5F] to-[#084E3D] text-white shadow-2xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold">
                SmartCare Guarantee
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              "Providing dignified, timely, and accessible healthcare to every Pakistani family."
            </h3>

            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Whether you are consulting from Clifton in Karachi, Gulberg in Lahore, or Blue Area in Islamabad, SmartCare brings Pakistan’s most qualified medical minds directly to your fingertips.
            </p>

            <div className="pt-4 border-t border-emerald-800/80 flex items-center justify-between">
              <div>
                <div className="text-xs text-emerald-200">24/7 Patient Helpline</div>
                <div className="text-lg font-bold text-white">021-111-762-782</div>
              </div>
              <Link to="/signup">
                <Button variant="accent" size="md">
                  Join SmartCare Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PATIENT TESTIMONIALS */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0D7A5F]">
              Real Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Trusted by Patients Across Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Finding a female cardiologist in Clifton with immediate slot availability used to take days of phone calls. With SmartCare, I booked Dr. Ayesha Khan within 2 minutes."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Zubair Mansoor</div>
                  <div className="text-[11px] text-slate-400">Karachi (DHA Phase 5)</div>
                </div>
                <span className="text-[10px] font-bold text-[#0D7A5F] bg-[#E6F4F1] px-2 py-0.5 rounded">
                  Verified Patient
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "The video consultation feature is exceptionally reliable. I consulted Dr. Fatima from Lahore while traveling in Rawalpindi, and she followed up with my report review promptly."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Saima Javed</div>
                  <div className="text-[11px] text-slate-400">Lahore (Gulberg III)</div>
                </div>
                <span className="text-[10px] font-bold text-[#0D7A5F] bg-[#E6F4F1] px-2 py-0.5 rounded">
                  Verified Patient
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Transparent fees in PKR without surprise charges at the clinic counter. SmartCare is definitely the cleanest and most professional healthcare app in Pakistan."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Farhan Ali</div>
                  <div className="text-[11px] text-slate-400">Islamabad (Sector F-7)</div>
                </div>
                <span className="text-[10px] font-bold text-[#0D7A5F] bg-[#E6F4F1] px-2 py-0.5 rounded">
                  Verified Patient
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Take Charge of Your Health Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join thousands of Pakistani patients discovering top specialists, managing appointments, and securing their health records with SmartCare.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/find-doctors" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Find a Doctor Now
              </Button>
            </Link>
            <Link to="/signup" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-slate-700 text-white hover:bg-slate-800">
                Create Free Patient Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
