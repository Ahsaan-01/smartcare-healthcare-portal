import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';
import { NotificationItem } from '../../components/appointment/NotificationItem';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppointmentStore } from '../../store/useAppointmentStore';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, getUnreadCount, markAllNotificationsRead, markNotificationRead } = useAppointmentStore();

  const unreadCount = getUnreadCount();

  const handleNotificationClick = (notifId: string, appointmentId?: string) => {
    markNotificationRead(notifId);
    if (appointmentId) {
      navigate('/patient/appointments');
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Patient Dashboard', to: '/patient/dashboard' },
          { label: 'Notifications' }
        ]}
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-[#0D7A5F]" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                {unreadCount} Unread
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Stay informed about your confirmed bookings, clinic reminders, and uploaded prescriptions.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsRead}
            leftIcon={<CheckCheck className="w-4 h-4 text-[#0D7A5F]" />}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3 max-w-3xl">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onClick={() => handleNotificationClick(notif.id, notif.appointmentId)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bell className="w-8 h-8 text-slate-300" />}
          title="No Notifications Yet"
          description="You are all caught up! New reminders and appointment updates will appear right here."
        />
      )}
    </div>
  );
};
