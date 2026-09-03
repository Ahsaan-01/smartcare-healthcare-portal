import React from 'react';
import { Sun, Sunset, Moon } from 'lucide-react';
import { TimeSlot } from '../../types/appointment';
import { cn } from '../../utils/cn';

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string, time: string) => void;
}

interface PeriodGroup {
  period: 'morning' | 'afternoon' | 'evening';
  label: string;
  icon: React.ReactNode;
  slots: TimeSlot[];
}

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ slots, selectedSlotId, onSelectSlot }) => {
  const periods: PeriodGroup[] = [
    {
      period: 'morning',
      label: 'Morning',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
      slots: slots.filter((s) => s.period === 'morning'),
    },
    {
      period: 'afternoon',
      label: 'Afternoon',
      icon: <Sunset className="w-3.5 h-3.5 text-orange-400" />,
      slots: slots.filter((s) => s.period === 'afternoon'),
    },
    {
      period: 'evening',
      label: 'Evening',
      icon: <Moon className="w-3.5 h-3.5 text-indigo-500" />,
      slots: slots.filter((s) => s.period === 'evening'),
    },
  ];

  return (
    <div className="space-y-5">
      {periods.map((group) => {
        const hasAvailable = group.slots.some((s) => s.available);

        return (
          <div key={group.period} className="space-y-3">
            {/* Period Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              {group.icon}
              <span>{group.label}</span>
              {!hasAvailable && (
                <span className="text-[10px] font-medium text-slate-400 ml-1">(Fully Booked)</span>
              )}
            </div>

            {/* Slot Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {group.slots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => slot.available && onSelectSlot(slot.id, slot.time)}
                    className={cn(
                      'py-2 px-1 rounded-xl border text-[11px] sm:text-xs font-bold text-center transition-all duration-200 focus:outline-none',
                      !slot.available
                        ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through'
                        : isSelected
                        ? 'border-[#0D7A5F] bg-[#0D7A5F] text-white shadow-md shadow-[#0D7A5F]/20'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-[#0D7A5F]/60 hover:text-[#0D7A5F] cursor-pointer'
                    )}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
