import React from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Bell
} from 'lucide-react';
import { AppointmentNotification } from '../../types/appointment';
import { cn } from '../../utils/cn';

interface NotificationItemProps {
  notification: AppointmentNotification;
  onClick?: () => void;
}

const getIcon = (type: AppointmentNotification['type']) => {
  switch (type) {
    case 'confirmed':
      return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    case 'reminder':
      return <Clock className="w-4 h-4 text-amber-500" />;
    case 'completed':
      return <Calendar className="w-4 h-4 text-sky-600" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-rose-500" />;
    case 'prescription':
      return <FileText className="w-4 h-4 text-[#0D7A5F]" />;
    default:
      return <Bell className="w-4 h-4 text-slate-500" />;
  }
};

const getBackgroundBadge = (type: AppointmentNotification['type']) => {
  switch (type) {
    case 'confirmed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'reminder':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'completed':
      return 'bg-sky-50 text-sky-700 border-sky-200';
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'prescription':
      return 'bg-[#E6F4F1] text-[#0D7A5F] border-[#0D7A5F]/20';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick
}) => {
  const timeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHrs / 24);

      if (diffHrs < 1) return 'Just now';
      if (diffHrs < 24) return `${diffHrs}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return '';
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5',
        notification.read
          ? 'bg-white border-slate-200/90 hover:border-slate-300'
          : 'bg-[#E6F4F1]/30 border-[#0D7A5F]/30 hover:border-[#0D7A5F]/50 shadow-2xs'
      )}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#0D7A5F]" />
      )}

      {/* Icon Badge */}
      <div
        className={cn(
          'w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5',
          getBackgroundBadge(notification.type)
        )}
      >
        {getIcon(notification.type)}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 pr-4 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={cn(
              'text-xs font-bold truncate',
              notification.read ? 'text-slate-900' : 'text-[#084E3D]'
            )}
          >
            {notification.title}
          </h4>
          <span className="text-[10px] text-slate-400 font-medium shrink-0">
            {timeAgo(notification.createdAt)}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {notification.message}
        </p>
      </div>
    </div>
  );
};
