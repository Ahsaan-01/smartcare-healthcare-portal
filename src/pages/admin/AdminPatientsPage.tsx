import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  HeartPulse,
  X
} from 'lucide-react';
import { useDoctorStore } from '../../store/useDoctorStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { DoctorPatientRecord } from '../../types/doctorPortal';

export const AdminPatientsPage: React.FC = () => {
  const { patientRecords } = useDoctorStore();
  const { addToast } = useToastStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [bloodFilter, setBloodFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatientRecord | null>(null);

  // Filtered patients
  const filteredPatients = patientRecords.filter((pat) => {
    if (cityFilter !== 'all' && pat.city !== cityFilter) return false;
    if (bloodFilter !== 'all' && pat.bloodGroup !== bloodFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = pat.name.toLowerCase().includes(q);
      const matchMrn = pat.mrn.toLowerCase().includes(q);
      const matchPhone = pat.phone.toLowerCase().includes(q);
      const matchCity = pat.city.toLowerCase().includes(q);
      if (!matchName && !matchMrn && !matchPhone && !matchCity) return false;
    }

    return true;
  });

  const handleFlagPatient = (patientName: string) => {
    addToast({
      type: 'warning',
      message: `Account security alert flagged for ${patientName}. Activity placed under surveillance.`
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Platform Patient Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor registered patients across Pakistan, verify emergency contacts, and audit health files.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-xl border border-purple-500/40">
            1,240 Total Platform Patients
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, MRN (MRN-KHI...), phone, or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer font-medium"
            >
              <option value="all">All Cities</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer font-medium"
            >
              <option value="all">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((pat) => (
            <div
              key={pat.id}
              className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{pat.name}</h3>
                    <p className="text-xs font-mono text-amber-400 font-semibold">{pat.mrn}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold rounded-lg">
                    {pat.bloodGroup}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pat.city}, Pakistan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pat.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate">{pat.email}</span>
                  </div>
                </div>

                {pat.allergies.length > 0 && (
                  <div className="p-2 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">Allergy: {pat.allergies.join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPatient(pat)}
                  className="flex-1 border-slate-700 text-slate-200 hover:bg-slate-800"
                  leftIcon={<HeartPulse className="w-3.5 h-3.5" />}
                >
                  Health File
                </Button>
                <button
                  type="button"
                  onClick={() => handleFlagPatient(pat.name)}
                  className="p-2 text-slate-500 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-colors text-xs font-bold"
                  title="Flag account for review"
                >
                  Audit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Patients Found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your city filter or search keyword.
            </p>
          </div>
        )}
      </div>

      {/* Patient Health File Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedPatient.name}</h3>
                <p className="text-xs font-mono text-amber-400 font-semibold">{selectedPatient.mrn}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Demographics</span>
                <p className="text-slate-200">
                  {selectedPatient.age} Years &bull; {selectedPatient.gender} &bull; Blood Group: <strong>{selectedPatient.bloodGroup}</strong>
                </p>
                <p className="text-slate-400">Contact: {selectedPatient.phone} &bull; {selectedPatient.city}</p>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Allergy Contraindications</span>
                {selectedPatient.allergies.length > 0 ? (
                  <p className="text-rose-400 font-semibold">
                    {selectedPatient.allergies.join(', ')}
                  </p>
                ) : (
                  <p className="text-emerald-400">No known drug allergies (NKDA)</p>
                )}
              </div>

              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Chronic Conditions</span>
                <p className="text-slate-200">
                  {selectedPatient.chronicConditions.join(', ') || 'None recorded'}
                </p>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Most Recent Clinical Diagnosis</span>
                <p className="text-slate-200 font-semibold">{selectedPatient.lastDiagnosis}</p>
                <p className="text-[10px] text-slate-400">Date: {selectedPatient.lastVisitDate}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                Close File
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
