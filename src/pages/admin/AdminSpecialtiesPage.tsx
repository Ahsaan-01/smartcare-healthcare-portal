import React, { useState } from 'react';
import {
  Stethoscope,
  Plus,
  Edit2,
  Trash2,
  Search,
  Heart,
  Sparkles,
  Baby,
  Brain,
  Bone,
  Eye,
  Activity
} from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';
import { SpecialtyModal } from '../../components/admin/SpecialtyModal';
import { Specialty } from '../../types/doctor';

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Sparkles,
  Baby,
  Brain,
  Bone,
  Eye,
  Activity,
  Stethoscope
};

export const AdminSpecialtiesPage: React.FC = () => {
  const { specialties, addSpecialty, updateSpecialty, deleteSpecialty } = useAdminStore();
  const { addToast } = useToastStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSpecialties = specialties.filter((s) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      const matchCond = s.popularConditions.some((c) => c.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCond) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setSelectedSpecialty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (spec: Specialty) => {
    setSelectedSpecialty(spec);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    deleteSpecialty(id);
    addToast({ type: 'warning', message: `Medical department ${name} removed from directory.` });
  };

  const handleSave = (saved: Specialty) => {
    if (selectedSpecialty) {
      updateSpecialty(saved.id, saved);
      addToast({ type: 'success', message: `Department ${saved.name} updated successfully.` });
    } else {
      addSpecialty(saved);
      addToast({ type: 'success', message: `New specialty ${saved.name} added to portal.` });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Medical Specialties & Clinical Departments
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Manage clinical taxonomy, doctor capacity allocations, and patient discovery condition mappings.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Specialty
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search specialty by name, condition, or scope..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpecialties.length > 0 ? (
          filteredSpecialties.map((spec) => {
            const IconComponent = ICON_MAP[spec.iconName] || Stethoscope;

            return (
              <div
                key={spec.id}
                className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{spec.name}</h3>
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          {spec.doctorCount} Specialists Enrolled
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {spec.description}
                  </p>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1.5">
                      Popular Conditions Treated
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.popularConditions.map((cond, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-semibold rounded-lg border border-slate-700"
                        >
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(spec)}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Edit Scope</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(spec.id, spec.name)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
                    title="Delete specialty"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <Stethoscope className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Specialties Found</h3>
            <p className="text-xs text-slate-400">
              Try modifying your search term or add a new specialty department.
            </p>
          </div>
        )}
      </div>

      {/* Specialty Edit / Create Modal */}
      <SpecialtyModal
        isOpen={isModalOpen}
        specialtyToEdit={selectedSpecialty}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};
