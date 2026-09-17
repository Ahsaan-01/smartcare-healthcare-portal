import React, { useState, useEffect } from 'react';
import { Stethoscope, X } from 'lucide-react';
import { Specialty } from '../../types/doctor';
import { Button } from '../common/Button';

interface SpecialtyModalProps {
  isOpen: boolean;
  specialtyToEdit?: Specialty | null;
  onClose: () => void;
  onSave: (specialty: Specialty) => void;
}

export const SpecialtyModal: React.FC<SpecialtyModalProps> = ({
  isOpen,
  specialtyToEdit,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [iconName, setIconName] = useState('Stethoscope');
  const [description, setDescription] = useState('');
  const [conditionsText, setConditionsText] = useState('');

  useEffect(() => {
    if (specialtyToEdit) {
      setName(specialtyToEdit.name);
      setIconName(specialtyToEdit.iconName);
      setDescription(specialtyToEdit.description);
      setConditionsText(specialtyToEdit.popularConditions.join(', '));
    } else {
      setName('');
      setIconName('Stethoscope');
      setDescription('');
      setConditionsText('');
    }
  }, [specialtyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = specialtyToEdit
      ? specialtyToEdit.id
      : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const conditions = conditionsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const saved: Specialty = {
      id,
      name: name.trim(),
      iconName,
      description: description.trim() || 'Comprehensive specialist care and diagnostic evaluation.',
      doctorCount: specialtyToEdit ? specialtyToEdit.doctorCount : 0,
      popularConditions: conditions.length > 0 ? conditions : ['General Consultation']
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {specialtyToEdit ? 'Edit Medical Department' : 'Add New Medical Specialty'}
              </h3>
              <p className="text-xs text-slate-400">
                Configure patient discovery taxonomy and condition mappings.
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
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Specialty Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pulmonology & Chest Medicine"
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Icon Category</label>
            <select
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
            >
              <option value="Stethoscope">Stethoscope (General)</option>
              <option value="Heart">Heart (Cardio)</option>
              <option value="Sparkles">Sparkles (Derma/Aesthetic)</option>
              <option value="Brain">Brain (Neuro)</option>
              <option value="Bone">Bone (Ortho)</option>
              <option value="Baby">Baby (Pediatrics)</option>
              <option value="Eye">Eye (Ophthalmology)</option>
              <option value="Activity">Activity (Gynecology / General)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of clinical scope..."
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">
              Popular Conditions Treated (Comma-separated)
            </label>
            <input
              type="text"
              value={conditionsText}
              onChange={(e) => setConditionsText(e.target.value)}
              placeholder="Asthma, Chronic Cough, Bronchitis, Sleep Apnea"
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              {specialtyToEdit ? 'Save Changes' : 'Create Department'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
