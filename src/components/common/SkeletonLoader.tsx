import React from 'react';
import { cn } from '../../utils/cn';

export const DoctorCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse flex flex-col justify-between">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded-md w-3/4" />
          <div className="h-3 bg-slate-100 rounded-md w-1/2" />
          <div className="h-3 bg-slate-100 rounded-md w-2/3" />
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="h-4 bg-slate-200 rounded-md w-24" />
        <div className="h-9 bg-slate-200 rounded-xl w-28" />
      </div>
    </div>
  );
};

export const TextSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('h-4 bg-slate-200 rounded-md animate-pulse', className)} />
);
