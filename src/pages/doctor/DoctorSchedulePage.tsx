import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  AlertTriangle,
  Save,
  Coffee,
  Building2,
  Video,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useDoctorStore } from '../../store/useDoctorStore';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';

const SAMPLE_SLOTS_PER_PERIOD = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'],
  afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'],
  evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM']
};

export const DoctorSchedulePage: React.FC = () => {
  const {
    scheduleConfig,
    updateScheduleConfig,
    toggleDayEnabled,
    updateDayShift,
    toggleSlotOverride,
    setEmergencyOff
  } = useDoctorStore();
  const { addToast } = useToastStore();

  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [activeDateTab, setActiveDateTab] = useState<number>(0);

  // Generate next 7 days for the interactive slot matrix
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(2026, 8, 7 + i); // 2026-09-07 onwards
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateLabel = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return { isoDate, dayName, dateLabel, isToday: i === 0 };
  });

  const activeDate = next7Days[activeDateTab].isoDate;

  const handleSaveSettings = () => {
    addToast({
      type: 'success',
      message: 'Practice schedule configuration saved successfully! Patient booking slots updated.'
    });
  };

  const handleResetOverrides = () => {
    updateScheduleConfig({ slotOverrides: {} });
    addToast({ type: 'info', message: 'All custom slot overrides reset to standard shift timings.' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Schedule & Availability Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure working shifts, lunch/prayer breaks, slot durations, and emergency day-off modes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetOverrides}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Reset Overrides
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveSettings}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Schedule
          </Button>
        </div>
      </div>

      {/* Emergency Mode Alert Strip */}
      <div
        className={`p-5 rounded-3xl border transition-all ${
          scheduleConfig.isEmergencyOff
            ? 'bg-rose-50 border-rose-300'
            : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-2xl ${
                scheduleConfig.isEmergencyOff
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Emergency Hospital Call / Out-of-Office Mode
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                When activated, all public booking slots for today are paused. Patients will see a friendly banner stating you are on hospital emergency duty at NICVD.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setEmergencyOff(
                  !scheduleConfig.isEmergencyOff,
                  'Doctor attending emergency cardiovascular surgery'
                )
              }
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                scheduleConfig.isEmergencyOff
                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {scheduleConfig.isEmergencyOff ? 'Emergency Active (Deactivate)' : 'Activate Emergency Day-Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Slot Capacity & Duration Settings */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0D7A5F]" />
          <span>Consultation Slot & Buffer Timing Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Duration */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Consultation Slot Duration:
            </label>
            <div className="flex items-center gap-2">
              {([15, 20, 30, 45] as const).map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() => updateScheduleConfig({ consultationDuration: duration })}
                  className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl border transition-all ${
                    scheduleConfig.consultationDuration === duration
                      ? 'bg-[#0D7A5F] text-white border-[#0D7A5F]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {duration}m
                </button>
              ))}
            </div>
          </div>

          {/* Buffer */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Buffer Gap Between Patients:
            </label>
            <div className="flex items-center gap-2">
              {([0, 5, 10] as const).map((buf) => (
                <button
                  key={buf}
                  type="button"
                  onClick={() => updateScheduleConfig({ bufferMinutes: buf })}
                  className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl border transition-all ${
                    scheduleConfig.bufferMinutes === buf
                      ? 'bg-[#0D7A5F] text-white border-[#0D7A5F]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {buf === 0 ? 'None' : `${buf} mins`}
                </button>
              ))}
            </div>
          </div>

          {/* Max Patients */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Max Patients Per Day:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={5}
                max={40}
                value={scheduleConfig.maxDailyPatients}
                onChange={(e) =>
                  updateScheduleConfig({
                    maxDailyPatients: parseInt(e.target.value, 10) || 18
                  })
                }
                className="w-24 p-1.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-900 focus:outline-none"
              />
              <span className="text-xs text-slate-500">patients / session</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Shift Timings & Working Days Manager */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0D7A5F]" />
              <span>Weekly Shift Timings (Monday – Sunday)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Set customized morning & evening consultation hours per clinic day.
            </p>
          </div>
        </div>

        {/* Day Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {scheduleConfig.weeklyWorkingDays.map((dayCfg, idx) => (
            <button
              key={dayCfg.day}
              type="button"
              onClick={() => setSelectedDayIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                selectedDayIdx === idx
                  ? 'bg-[#0D7A5F] text-white border-[#0D7A5F] shadow-xs'
                  : dayCfg.enabled
                  ? 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  dayCfg.enabled ? 'bg-emerald-400' : 'bg-slate-300'
                }`}
              />
              <span>{dayCfg.day}</span>
            </button>
          ))}
        </div>

        {/* Active Day Shift Editor */}
        {(() => {
          const currentDay = scheduleConfig.weeklyWorkingDays[selectedDayIdx];
          if (!currentDay) return null;

          return (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <h4 className="text-sm font-bold text-slate-900">
                    {currentDay.day} Shift Configuration
                  </h4>
                  <span
                    className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full ${
                      currentDay.enabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {currentDay.enabled ? 'Clinic Open' : 'Clinic Closed'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleDayEnabled(currentDay.day)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    currentDay.enabled
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {currentDay.enabled ? 'Mark Day Closed' : 'Enable Clinic Day'}
                </button>
              </div>

              {currentDay.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Morning Shift */}
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                    <span className="font-bold text-slate-700 block">Morning Shift</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Start</span>
                        <input
                          type="text"
                          value={currentDay.morningStart}
                          onChange={(e) =>
                            updateDayShift(currentDay.day, { morningStart: e.target.value })
                          }
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">End</span>
                        <input
                          type="text"
                          value={currentDay.morningEnd}
                          onChange={(e) =>
                            updateDayShift(currentDay.day, { morningEnd: e.target.value })
                          }
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Evening Shift */}
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                    <span className="font-bold text-slate-700 block">Evening Shift</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Start</span>
                        <input
                          type="text"
                          value={currentDay.eveningStart}
                          onChange={(e) =>
                            updateDayShift(currentDay.day, { eveningStart: e.target.value })
                          }
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">End</span>
                        <input
                          type="text"
                          value={currentDay.eveningEnd}
                          onChange={(e) =>
                            updateDayShift(currentDay.day, { eveningEnd: e.target.value })
                          }
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lunch & Prayer Break */}
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-blue-600" />
                      <span>Lunch & Prayer Break</span>
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Start</span>
                        <input
                          type="text"
                          value={currentDay.breakStart}
                          onChange={(e) =>
                            updateDayShift(currentDay.day, { breakStart: e.target.value })
                          }
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">End</span>
                        <input
                          type="text"
                          value={currentDay.breakEnd}
                          onChange={(e) =>
                            updateDayShift(currentDay.day, { breakEnd: e.target.value })
                          }
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Allowed Modalities */}
                  <div className="md:col-span-3 pt-2 flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={currentDay.acceptsInClinic}
                        onChange={(e) =>
                          updateDayShift(currentDay.day, { acceptsInClinic: e.target.checked })
                        }
                        className="text-[#0D7A5F] rounded focus:ring-[#0D7A5F]"
                      />
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Accept In-Clinic Physical Visits</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={currentDay.acceptsOnline}
                        onChange={(e) =>
                          updateDayShift(currentDay.day, { acceptsOnline: e.target.checked })
                        }
                        className="text-[#0D7A5F] rounded focus:ring-[#0D7A5F]"
                      />
                      <Video className="w-3.5 h-3.5 text-slate-500" />
                      <span>Accept Online Video Tele-Consultations</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* 7-Day Live Interactive Slot Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0D7A5F]" />
              <span>7-Day Rolling Slot Availability Matrix</span>
            </h3>
            <p className="text-xs text-slate-500">
              Click any slot to toggle availability between Available (green) and Blocked (red).
            </p>
          </div>
        </div>

        {/* Date Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {next7Days.map((day, idx) => (
            <button
              key={day.isoDate}
              type="button"
              onClick={() => setActiveDateTab(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                activeDateTab === idx
                  ? 'bg-[#0D7A5F] text-white border-[#0D7A5F] shadow-2xs font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="block text-[10px] uppercase font-bold opacity-80">
                {day.dayName}
              </span>
              <span className="font-bold">{day.dateLabel}</span>
              {day.isToday && (
                <span className="block text-[9px] text-emerald-200 font-bold">TODAY</span>
              )}
            </button>
          ))}
        </div>

        {/* Slot Grid for Active Date */}
        <div className="space-y-4 pt-2">
          {(['morning', 'afternoon', 'evening'] as const).map((period) => (
            <div key={period} className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 capitalize">
                {period} Consultation Slots
              </span>

              <div className="flex flex-wrap gap-2">
                {SAMPLE_SLOTS_PER_PERIOD[period].map((timeStr) => {
                  const key = `${activeDate}_${timeStr}`;
                  // Check override or default to available
                  const isBlocked = scheduleConfig.slotOverrides[key] === false;

                  return (
                    <button
                      key={timeStr}
                      type="button"
                      onClick={() => toggleSlotOverride(activeDate, timeStr, isBlocked)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                        isBlocked
                          ? 'bg-rose-50 text-rose-700 border-rose-200 line-through opacity-70 hover:opacity-100'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isBlocked ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                      />
                      <span>{timeStr}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
