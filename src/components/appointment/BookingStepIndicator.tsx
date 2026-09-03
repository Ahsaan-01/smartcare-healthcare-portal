import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Step {
  number: 1 | 2 | 3 | 4;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: 'Consultation Type' },
  { number: 2, label: 'Select Date' },
  { number: 3, label: 'Choose Slot' },
  { number: 4, label: 'Confirm' },
];

interface BookingStepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const BookingStepIndicator: React.FC<BookingStepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 z-0" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-[#0D7A5F] z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isDone = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center gap-2 z-10">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300',
                  isDone
                    ? 'bg-[#0D7A5F] border-[#0D7A5F] text-white'
                    : isActive
                    ? 'bg-white border-[#0D7A5F] text-[#0D7A5F] shadow-md shadow-[#0D7A5F]/20'
                    : 'bg-white border-slate-200 text-slate-400'
                )}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={cn(
                  'text-[10px] sm:text-xs font-semibold text-center leading-tight hidden sm:block',
                  isActive ? 'text-[#0D7A5F]' : isDone ? 'text-slate-600' : 'text-slate-400'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
