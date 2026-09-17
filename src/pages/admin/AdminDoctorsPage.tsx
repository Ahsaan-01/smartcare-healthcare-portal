import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  UserCheck,
  Search,
  Filter,
  ShieldCheck,
  Star,
  UserPlus,
  MapPin
} from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { VerifyDoctorModal } from '../../components/admin/VerifyDoctorModal';
import { AddDoctorModal } from '../../components/admin/AddDoctorModal';
import { AdminDoctorRecord, DoctorVerificationStatus } from '../../types/admin';

export const AdminDoctorsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as DoctorVerificationStatus | 'all') || 'all';

  const {
    doctors,
    verifyDoctor,
    rejectDoctor,
    suspendDoctor,
    toggleFeatureDoctor,
    updateDoctorFee,
    addDoctor
  } = useAdminStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<'all' | DoctorVerificationStatus>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');

  const [verifyModalDoctor, setVerifyModalDoctor] = useState<AdminDoctorRecord | null>(null);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [newFeeValue, setNewFeeValue] = useState<number>(2500);

  // Tab counts
  const counts = {
    all: doctors.length,
    verified: doctors.filter((d) => d.verificationStatus === 'verified').length,
    pending: doctors.filter((d) => d.verificationStatus === 'pending').length,
    suspended: doctors.filter((d) => d.verificationStatus === 'suspended').length
  };

  // Filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    if (activeTab !== 'all' && doc.verificationStatus !== activeTab) {
      return false;
    }

    if (cityFilter !== 'all' && doc.city !== cityFilter) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchPmdc = doc.pmdcNumber.toLowerCase().includes(q);
      const matchClinic = doc.clinicName.toLowerCase().includes(q);
      const matchSpec = doc.specialization.toLowerCase().includes(q);
      if (!matchName && !matchPmdc && !matchClinic && !matchSpec) {
        return false;
      }
    }

    return true;
  });

  const handleSaveFee = (docId: string) => {
    updateDoctorFee(docId, newFeeValue);
    setEditingFeeId(null);
    addToast({ type: 'success', message: `Consultation fee updated to Rs. ${newFeeValue}.` });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Specialist Directory & PMDC Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Audit PMDC registrations, approve physician licenses, toggle homepage featured placement, and adjust fees.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddDoctorOpen(true)}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Onboard Specialist
        </Button>
      </div>

      {/* Tabs Bar */}
      <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 flex flex-wrap gap-1.5 text-xs">
        {(
          [
            { id: 'all', label: 'All Specialists', count: counts.all },
            { id: 'verified', label: 'PMDC Verified', count: counts.verified },
            { id: 'pending', label: 'Pending Verification', count: counts.pending },
            { id: 'suspended', label: 'Suspended', count: counts.suspended }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 text-[10px] rounded-full font-black ${
                activeTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by physician name, PMDC number (PMC-...), hospital, or specialty..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 w-full sm:w-auto">
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
            <option value="Rawalpindi">Rawalpindi</option>
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="space-y-3">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              {/* Doctor Avatar & Information */}
              <div className="flex items-start gap-4 min-w-0">
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-700 shrink-0"
                />

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white truncate">{doc.name}</h3>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${
                        doc.verificationStatus === 'verified'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : doc.verificationStatus === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {doc.verificationStatus}
                    </span>

                    {doc.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-md">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 truncate">
                    {doc.title} &bull; <strong className="text-amber-400">{doc.specialization}</strong>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                    <span className="font-mono text-slate-300 font-bold">PMDC: {doc.pmdcNumber}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {doc.city} ({doc.area})
                    </span>
                    <span>&bull;</span>
                    <span>Exp: {doc.experienceYears} Yrs</span>
                    <span>&bull;</span>
                    <span className="text-emerald-400 font-bold">
                      Fee: Rs. {doc.consultationFee.toLocaleString()}
                    </span>
                  </div>

                  {doc.rejectionReason && (
                    <p className="text-[11px] text-rose-400 pt-0.5 italic">
                      Audit Note: {doc.rejectionReason}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                {/* Featured Toggle */}
                <button
                  type="button"
                  onClick={() => toggleFeatureDoctor(doc.id)}
                  className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                    doc.featured
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                  title={doc.featured ? 'Remove from featured list' : 'Feature on homepage'}
                >
                  <Star className={`w-4 h-4 ${doc.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span className="hidden sm:inline">{doc.featured ? 'Featured' : 'Feature'}</span>
                </button>

                {/* Audit & PMDC Check */}
                {doc.verificationStatus === 'pending' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setVerifyModalDoctor(doc)}
                    leftIcon={<ShieldCheck className="w-4 h-4" />}
                  >
                    Audit & Verify
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVerifyModalDoctor(doc)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    View PMDC File
                  </Button>
                )}

                {/* Fee Editor Toggle */}
                {editingFeeId === doc.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step={100}
                      value={newFeeValue}
                      onChange={(e) => setNewFeeValue(Number(e.target.value))}
                      className="w-20 p-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveFee(doc.id)}
                      className="px-2 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingFeeId(null)}
                      className="px-2 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFeeId(doc.id);
                      setNewFeeValue(doc.consultationFee);
                    }}
                    className="p-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
                    title="Adjust consultation fee"
                  >
                    Edit Fee
                  </button>
                )}

                {/* Suspend / Reactivate */}
                {doc.verificationStatus === 'suspended' ? (
                  <button
                    type="button"
                    onClick={() => verifyDoctor(doc.id)}
                    className="px-3 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 rounded-xl text-xs font-bold hover:bg-emerald-600/30"
                  >
                    Reactivate
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => suspendDoctor(doc.id, 'Routine administrative license audit')}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors text-xs font-semibold"
                    title="Temporarily suspend doctor"
                  >
                    Suspend
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <UserCheck className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Specialists Match Filter</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your verification status tab or city search query.
            </p>
          </div>
        )}
      </div>

      {/* Verify Doctor Modal */}
      <VerifyDoctorModal
        doctor={verifyModalDoctor}
        isOpen={!!verifyModalDoctor}
        onClose={() => setVerifyModalDoctor(null)}
        onVerify={(id) => {
          verifyDoctor(id);
          addToast({ type: 'success', message: 'Doctor verified & published on SmartCare.' });
        }}
        onReject={(id, reason) => {
          rejectDoctor(id, reason);
          addToast({ type: 'warning', message: 'Application rejected and notice recorded.' });
        }}
      />

      {/* Add Doctor Modal */}
      <AddDoctorModal
        isOpen={isAddDoctorOpen}
        onClose={() => setIsAddDoctorOpen(false)}
        onAddDoctor={(newDoc) => {
          addDoctor(newDoc);
          addToast({ type: 'success', message: `Specialist ${newDoc.name} onboarded successfully.` });
        }}
      />
    </div>
  );
};
