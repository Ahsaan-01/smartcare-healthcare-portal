import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  showTagline = true,
  linkTo = '/'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const content = (
    <div className={cn('inline-flex items-center gap-2.5 group select-none', className)}>
      <div className={cn(
        'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0D7A5F] to-[#084E3D] text-white shadow-sm transition-transform duration-200 group-hover:scale-105',
        iconSizes[size]
      )}>
        {/* Medical Cross & Shield SVG */}
        <svg viewBox="0 0 32 32" fill="none" className="w-3/5 h-3/5">
          <path
            d="M16 3L27 7.5V15.5C27 22.5 22.2 27.5 16 29.5C9.8 27.5 5 22.5 5 15.5V7.5L16 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M10 16H13.5L15 12.5L17.5 19.5L19 16H22"
            stroke="#48D1B1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={cn('font-bold text-slate-900 tracking-tight font-sans', textSizes[size])}>
            Smart<span className="text-[#0D7A5F]">Care</span>
          </span>
        </div>
        {showTagline && size !== 'sm' && (
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
            Healthcare Pakistan
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A5F] rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
