import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Plus
} from 'lucide-react';
import { AppointmentCard } from '../../components/appointment/AppointmentCard';
import { CancellationModal } from '../../components/appointment/CancellationModal';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from '../../store/useToastStore';
import { Appointment } from '../../types/appointment';

export const AppointmentHistoryPage: React.FC = () => {
  const { user } = useAuthStore();
  const { getUpcoming, getPast, getCancelled, cancelAppointment } = useAppointmentStore();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [cancellingAppt, setCancellingAppt] = useState<Appointment | null>(null);

  const patientId = user?.id || 'patient-1';
  const upcomingList = getUpcoming(patientId);
  const completedList = getPast(patientId);
  const cancelledList = getCancelled(patientId);

  const handleOpenCancelModal = (appointmentId: string) => {
    const appt = upcomingList.find((a) => a.id === appointmentId);
    if (appt) {
      setCancellingAppt(appt);
    }
  };

  const handleConfirmCancel = (reason: string) => {
    if (!cancellingAppt) return;
    cancelAppointment(cancellingAppt.id, reason);
    toast.success(`Appointment ${cancellingAppt.referenceNumber} has been cancelled.`);
    setCancellingAppt(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Patient Dashboard', to: '/patient/dashboard' },
          { label: 'My Appointments' }
        ]}
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-[#0D7A5F]" />
            <span>My Appointments</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track, reschedule, and manage your upcoming visits and past consultation history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/find-doctors">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Book New Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* 3 Management Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'upcoming'
              ? 'border-[#0D7A5F] text-[#0D7A5F]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Upcoming & Confirmed</span>
          {upcomingList.length > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'upcoming' ? 'bg-[#E6F4F1] text-[#0D7A5F]' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {upcomingList.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'completed'
              ? 'border-[#0D7A5F] text-[#0D7A5F]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Completed History</span>
          {completedList.length > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'completed' ? 'bg-[#E6F4F1] text-[#0D7A5F]' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {completedList.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'cancelled'
              ? 'border-[#0D7A5F] text-[#0D7A5F]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Cancelled</span>
          {cancelledList.length > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {cancelledList.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Upcoming Appointments */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {upcomingList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingList.map((appt) => (
                <AppointmentCard
                  key={appt.id}
                  appointment={appt}
                  onCancel={handleOpenCancelModal}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Calendar className="w-8 h-8 text-[#0D7A5F]" />}
              title="No Upcoming Consultations"
              description="You have no confirmed or pending appointments scheduled right now. Explore top specialists in Karachi, Lahore, and Islamabad."
              actionLabel="Discover Doctors Now"
              onAction={() => (window.location.href = '/find-doctors')}
            />
          )}
        </div>
      )}

      {/* Tab 2: Completed Appointments */}
      {activeTab === 'completed' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {completedList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedList.map((appt) => (
                <AppointmentCard key={appt.id} appointment={appt} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<CheckCircle2 className="w-8 h-8 text-slate-400" />}
              title="No Completed Consultations Yet"
              description="Your consultation history and digital prescriptions will automatically appear here after each completed doctor visit."
              actionLabel="Book a Doctor"
              onAction={() => (window.location.href = '/find-doctors')}
            />
          )}
        </div>
      )}

      {/* Tab 3: Cancelled Appointments */}
      {activeTab === 'cancelled' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {cancelledList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cancelledList.map((appt) => (
                <AppointmentCard key={appt.id} appointment={appt} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<XCircle className="w-8 h-8 text-slate-300" />}
              title="No Cancelled Appointments"
              description="You do not have any cancelled consultations on your record."
            />
          )}
        </div>
      )}

      {/* Cancellation Modal */}
      {cancellingAppt && (
        <CancellationModal
          isOpen={!!cancellingAppt}
          appointmentRef={cancellingAppt.referenceNumber}
          doctorName={cancellingAppt.doctorName}
          onConfirm={handleConfirmCancel}
          onClose={() => setCancellingAppt(null)}
        />
      )}
    </div>
  );
};
