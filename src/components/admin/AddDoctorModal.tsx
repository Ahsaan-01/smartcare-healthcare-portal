import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { AdminDoctorRecord } from '../../types/admin';
import { useAdminStore } from '../../store/useAdminStore';
import { Button } from '../common/Button';

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDoctor: (doctor: AdminDoctorRecord) => void;
}

export const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  isOpen,
  onClose,
  onAddDoctor
}) => {
  const { specialties } = useAdminStore();

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [pmdcNumber, setPmdcNumber] = useState('');
  const [specializationId, setSpecializationId] = useState(specialties[0]?.id || 'cardiology');
  const [experienceYears, setExperienceYears] = useState(10);
  const [consultationFee, setConsultationFee] = useState(2500);
  const [city, setCity] = useState('Karachi');
  const [area, setArea] = useState('Clifton Block 5');
  const [clinicName, setClinicName] = useState('SmartCare Specialist Clinic');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const clinicAddress = `${area}, ${city}`;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !pmdcNumber.trim()) return;

    const matchedSpec = specialties.find((s) => s.id === specializationId);
    const specName = matchedSpec ? matchedSpec.name : 'General Medicine';

    const newDoc: AdminDoctorRecord = {
      id: `doc-${Date.now()}`,
      name: name.trim().startsWith('Dr.') ? name.trim() : `Dr. ${name.trim()}`,
      title: title.trim() || `Consultant ${specName}`,
      specialization: specName,
      specializationId,
      avatarUrl:
        gender === 'Female'
          ? 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400'
          : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      pmdcVerified: true,
      pmdcNumber: pmdcNumber.trim().toUpperCase(),
      experienceYears: Number(experienceYears),
      rating: 4.9,
      reviewCount: 1,
      consultationFee: Number(consultationFee),
      city,
      area,
      clinicName,
      clinicAddress,
      consultationType: 'both',
      languages: ['English', 'Urdu'],
      gender,
      nextAvailableSlot: 'Today at 05:00 PM',
      featured: false,
      about: `${name} is an experienced specialist in ${specName} with a strong track record of clinical excellence in ${city}.`,
      expertise: ['Diagnostic Consultation', 'Preventive Care', 'Therapeutic Management'],
      education: [
        { degree: 'MBBS', institution: 'Recognized Medical College', year: '2012' },
        { degree: 'FCPS', institution: 'College of Physicians & Surgeons Pakistan', year: '2018' }
      ],
      experience: [
        { role: 'Senior Consultant', hospital: clinicName, period: '2020 — Present' }
      ],
      timings: [{ days: 'Monday – Friday', hours: '05:00 PM – 08:30 PM' }],
      services: ['Physical Consultation', 'Online Video Consultation', 'Digital Prescriptions'],
      verificationStatus: 'verified',
      licenseExpiryDate: '2029-12-31',
      totalPlatformConsultations: 0,
      grossEarnedPKR: 0,
      registeredAt: new Date().toISOString().slice(0, 10)
    };

    onAddDoctor(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Onboard Verified Specialist
              </h3>
              <p className="text-xs text-slate-400">
                Register a new Pakistani physician into the SmartCare clinical network.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Doctor Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Faraz Ahmed"
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">PMDC License # *</label>
              <input
                type="text"
                required
                value={pmdcNumber}
                onChange={(e) => setPmdcNumber(e.target.value)}
                placeholder="PMC-88219-S"
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Consultant Pulmonologist"
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Specialty Department</label>
              <select
                value={specializationId}
                onChange={(e) => setSpecializationId(e.target.value)}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Consultation Fee (PKR)</label>
              <input
                type="number"
                min={500}
                step={100}
                value={consultationFee}
                onChange={(e) => setConsultationFee(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Experience (Years)</label>
              <input
                type="number"
                min={1}
                max={50}
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Clinic / Hospital Name</label>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Area / Address</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Gender</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <span>Male Doctor</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <span>Female Doctor</span>
              </label>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Register & Publish Specialist
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
