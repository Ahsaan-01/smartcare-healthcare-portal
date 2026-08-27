import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  Stethoscope,
  Baby,
  Activity,
  Bone,
  Brain,
  Smile,
  Ear,
  Eye,
  SmilePlus,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Specialty } from '../../types/doctor';
import { cn } from '../../utils/cn';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6 text-rose-500" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
  Stethoscope: <Stethoscope className="w-6 h-6 text-teal-600" />,
  Baby: <Baby className="w-6 h-6 text-sky-500" />,
  Activity: <Activity className="w-6 h-6 text-emerald-600" />,
  Bone: <Bone className="w-6 h-6 text-indigo-500" />,
  Brain: <Brain className="w-6 h-6 text-purple-500" />,
  Smile: <Smile className="w-6 h-6 text-pink-500" />,
  Ear: <Ear className="w-6 h-6 text-orange-500" />,
  Eye: <Eye className="w-6 h-6 text-blue-500" />,
  SmilePlus: <SmilePlus className="w-6 h-6 text-teal-500" />,
  Flame: <Flame className="w-6 h-6 text-red-500" />
};

interface SpecialtyCardProps {
  specialty: Specialty;
  className?: string;
}

export const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty, className }) => {
  const icon = iconMap[specialty.iconName] || <Stethoscope className="w-6 h-6 text-[#0D7A5F]" />;

  return (
    <Link
      to={`/find-doctors?specialty=${specialty.id}`}
      className={cn(
        'group flex flex-col justify-between p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#0D7A5F]/40 hover:shadow-card-hover transition-all duration-200',
        className
      )}
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#E6F4F1] transition-all">
          {icon}
        </div>
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0D7A5F] transition-colors leading-snug">
          {specialty.name}
        </h4>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {specialty.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-[#0D7A5F]">
        <span>{specialty.doctorCount} Doctors</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
