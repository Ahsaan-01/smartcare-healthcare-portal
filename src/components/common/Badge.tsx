import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'pmdc';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  icon,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-[#E6F4F1] text-[#0D7A5F] border border-[#0D7A5F]/20',
    secondary: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    outline: 'bg-transparent text-slate-600 border border-slate-200',
    pmdc: 'bg-[#0D7A5F] text-white border border-[#084E3D] font-semibold tracking-wide'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium rounded-md',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium rounded-lg'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center select-none shrink-0 transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
