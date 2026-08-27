import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Logo } from '../common/Logo';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 p-2.5 rounded-2xl inline-block">
              <Logo size="md" className="[&_span]:text-white [&_span.text-slate-500]:text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              SmartCare is Pakistan’s leading digital healthcare ecosystem, connecting patients with PMDC-verified doctors across Karachi, Lahore, Islamabad, and nationwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% PMDC Verified Specialists
              </div>
            </div>
          </div>

          {/* Quick Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/find-doctors?specialty=cardiology" className="hover:text-emerald-400 transition-colors">
                  Cardiologists
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?specialty=dermatology" className="hover:text-emerald-400 transition-colors">
                  Dermatologists
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?specialty=gynecology" className="hover:text-emerald-400 transition-colors">
                  Gynecologists
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?specialty=pediatrics" className="hover:text-emerald-400 transition-colors">
                  Pediatricians
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?specialty=orthopedics" className="hover:text-emerald-400 transition-colors">
                  Orthopedic Surgeons
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?specialty=psychiatry" className="hover:text-emerald-400 transition-colors">
                  Psychiatrists
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Top Cities
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/find-doctors?city=Karachi" className="hover:text-emerald-400 transition-colors">
                  Doctors in Karachi (Clifton & DHA)
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?city=Lahore" className="hover:text-emerald-400 transition-colors">
                  Doctors in Lahore (Gulberg & DHA)
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?city=Islamabad" className="hover:text-emerald-400 transition-colors">
                  Doctors in Islamabad (Blue Area)
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?city=Rawalpindi" className="hover:text-emerald-400 transition-colors">
                  Doctors in Rawalpindi
                </Link>
              </li>
              <li>
                <Link to="/find-doctors?city=Faisalabad" className="hover:text-emerald-400 transition-colors">
                  Doctors in Faisalabad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Helpline & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Executive Tower, Clifton Block 4, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UAN: +92 (21) 111-762-782</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@smartcare.pk</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon – Sat: 09:00 AM – 09:00 PM PKT</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} SmartCare Pakistan. All rights reserved. Fictional demonstration portal.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Currency: Pakistani Rupees (PKR)</span>
            <span className="text-slate-400">Timezone: PKT (UTC+5)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
