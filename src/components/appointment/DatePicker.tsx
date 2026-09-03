import React from 'react';
import { DoctorSlotDay } from '../../types/appointment';
import { cn } from '../../utils/cn';

interface DatePickerProps {
  days: DoctorSlotDay[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ days, selectedDate, onSelectDate }) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const isSelected = selectedDate === day.date;
        const hasSlots = day.availableCount > 0;

        return (
          <button
            key={day.date}
            type="button"
            disabled={!hasSlots}
            onClick={() => hasSlots && onSelectDate(day.date)}
            className={cn(
              'flex flex-col items-center gap-1 py-2.5 px-1 rounded-2xl border-2 text-center transition-all duration-200 focus:outline-none',
              !hasSlots
                ? 'border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed'
                : isSelected
                ? 'border-[#0D7A5F] bg-[#0D7A5F] text-white shadow-lg shadow-[#0D7A5F]/25 cursor-pointer'
                : 'border-slate-200 bg-white hover:border-[#0D7A5F]/50 cursor-pointer'
            )}
          >
            {/* Day name */}
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-wide',
                isSelected ? 'text-emerald-100' : day.isToday ? 'text-[#0D7A5F]' : 'text-slate-400'
              )}
            >
              {day.isToday ? 'Today' : day.dayLabel}
            </span>

            {/* Date number */}
            <span
              className={cn(
                'text-base sm:text-lg font-extrabold leading-none',
                isSelected ? 'text-white' : 'text-slate-900'
              )}
            >
              {day.dateLabel.split(' ')[0]}
            </span>

            {/* Month */}
            <span
              className={cn(
                'text-[9px] font-semibold',
                isSelected ? 'text-emerald-100' : 'text-slate-400'
              )}
            >
              {day.dateLabel.split(' ')[1]}
            </span>

            {/* Slot count dot */}
            {hasSlots && (
              <span
                className={cn(
                  'text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5',
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-50 text-emerald-700'
                )}
              >
                {day.availableCount} slots
              </span>
            )}

            {!hasSlots && (
              <span className="text-[9px] text-slate-300 font-medium">Full</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
