import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Award, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumb items={[{ label: 'About SmartCare' }]} />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F1] text-[#0D7A5F] text-xs font-bold">
          <ShieldCheck className="w-4 h-4" /> About SmartCare Pakistan
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Transforming Access to Quality Healthcare Across Pakistan
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          SmartCare is built to eliminate the friction in finding verified healthcare specialists, booking appointments, and consulting doctors in Pakistan.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0D7A5F]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">PMDC Credential Verification</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We ensure every doctor listed on SmartCare holds a genuine registration number from Pakistan Medical & Dental Council (PMDC), ensuring patient safety and peace of mind.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0D7A5F]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Fee Transparency in PKR</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Patients can compare consultation charges clearly in Pakistani Rupees (PKR) with zero hidden clinic fees or last-minute surprises.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0D7A5F]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Nationwide Coverage</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Active medical networks across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar, supporting both in-clinic visits and secure telehealth video calls.
          </p>
        </div>
      </div>

      {/* Internship Project Note */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Zynvex Solutions Batch 3 Frontend Internship
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          SmartCare — Healthcare Appointment & Patient Portal
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Developed as part of the Frontend Development Internship (ID: ZYNVEX-CERT-1176). Designed with a Pakistan-first approach, modular architecture, and patient-centered usability.
        </p>
        <div className="pt-2">
          <Link to="/find-doctors">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Discover Doctors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
