import React, { useState, useEffect } from 'react';
import { Megaphone, X, AlertTriangle } from 'lucide-react';
import { BroadcastAnnouncement } from '../../types/admin';
import { Button } from '../common/Button';

interface BroadcastModalProps {
  isOpen: boolean;
  currentBroadcast: BroadcastAnnouncement;
  onClose: () => void;
  onSave: (broadcast: BroadcastAnnouncement) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  currentBroadcast,
  onClose,
  onSave
}) => {
  const [enabled, setEnabled] = useState(currentBroadcast.enabled);
  const [message, setMessage] = useState(currentBroadcast.message);
  const [type, setType] = useState(currentBroadcast.type);
  const [targetAudience, setTargetAudience] = useState(currentBroadcast.targetAudience);

  useEffect(() => {
    setEnabled(currentBroadcast.enabled);
    setMessage(currentBroadcast.message);
    setType(currentBroadcast.type);
    setTargetAudience(currentBroadcast.targetAudience);
  }, [currentBroadcast, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      enabled,
      message: message.trim(),
      type,
      targetAudience,
      createdAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-2xl">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Platform Announcement Banner
              </h3>
              <p className="text-xs text-slate-400">
                Broadcast vital health advisories or emergency alerts across all portals.
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
          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
            <div>
              <span className="font-bold text-white block">Display Banner Live</span>
              <span className="text-[11px] text-slate-400">Show ticker to platform users</span>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Alert Severity</label>
            <div className="grid grid-cols-3 gap-2">
              {(['info', 'warning', 'emergency'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setType(lvl)}
                  className={`py-2 px-3 rounded-xl border font-bold capitalize transition-all ${
                    type === lvl
                      ? lvl === 'emergency'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : lvl === 'warning'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Target Audience</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value as 'all' | 'patients' | 'doctors')}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
            >
              <option value="all">All Visitors, Patients & Doctors</option>
              <option value="patients">Patients Only</option>
              <option value="doctors">Physicians & Staff Only</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Broadcast Message *</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. National health alert: Dengue outpatient fever centers are operational 24/7 across Karachi..."
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {enabled && (
            <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Live Preview:</span>
              <div
                className={`p-2 rounded-lg text-[11px] font-semibold flex items-center gap-2 ${
                  type === 'emergency'
                    ? 'bg-rose-950/80 text-rose-200 border border-rose-800'
                    : type === 'warning'
                    ? 'bg-amber-950/80 text-amber-200 border border-amber-800'
                    : 'bg-blue-950/80 text-blue-200 border border-blue-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{message || 'Your broadcast message will appear here...'}</span>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Broadcast
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
