import { DoctorSlotDay } from '../types/appointment';

/**
 * Generates a 7-day rolling slot grid from today onwards.
 * Returns deterministic mock slot data seeded by doctorId to give each doctor different patterns.
 */
const generateSlots = (doctorId: string): DoctorSlotDay[] => {
  const seed = doctorId.charCodeAt(doctorId.length - 1) % 3; // 0, 1, or 2

  const morningTimes = ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', '12:00 PM'];
  const afternoonTimes = ['02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM', '05:00 PM'];
  const eveningTimes = ['05:30 PM', '06:15 PM', '07:00 PM', '07:45 PM', '08:30 PM'];

  // Availability patterns — each pattern has different busy slots
  const patterns: Record<number, boolean[][]> = {
    0: [
      [true, false, true, true, false],  // morning
      [false, true, true, false, true],  // afternoon
      [true, true, false, true, true],   // evening
    ],
    1: [
      [false, true, true, false, true],
      [true, true, false, true, false],
      [false, false, true, true, true],
    ],
    2: [
      [true, true, false, true, true],
      [true, false, true, true, false],
      [true, false, false, true, true],
    ],
  };

  const today = new Date();
  const days: DoctorSlotDay[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const isFriday = date.getDay() === 5; // Friday — reduced slots (Pakistan)
    const isSunday = date.getDay() === 0; // Sunday — most clinics closed

    const patternSet = patterns[seed];

    const morningSlots = morningTimes.map((time, idx) => ({
      id: `${doctorId}-d${i}-m${idx}`,
      time,
      period: 'morning' as const,
      available: isSunday ? false : patternSet[0][idx],
    }));

    const afternoonSlots = afternoonTimes.map((time, idx) => ({
      id: `${doctorId}-d${i}-a${idx}`,
      time,
      period: 'afternoon' as const,
      available: isSunday ? false : isFriday ? idx > 2 ? false : patternSet[1][idx] : patternSet[1][idx],
    }));

    const eveningSlots = eveningTimes.map((time, idx) => ({
      id: `${doctorId}-d${i}-e${idx}`,
      time,
      period: 'evening' as const,
      available: isSunday ? false : patternSet[2][idx],
    }));

    const allSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots];
    const availableCount = allSlots.filter((s) => s.available).length;

    const dd = date.getDate();
    const mm = monthNames[date.getMonth()];

    days.push({
      date: date.toISOString().slice(0, 10),
      dayLabel: dayNames[date.getDay()],
      dateLabel: `${dd} ${mm}`,
      isToday: i === 0,
      availableCount,
      slots: allSlots,
    });
  }

  return days;
};

/**
 * Cache of generated slot grids per doctor ID.
 * In production this would be fetched from the backend API.
 */
const slotCache: Record<string, DoctorSlotDay[]> = {};

export const getMockSlotsForDoctor = (doctorId: string): DoctorSlotDay[] => {
  if (!slotCache[doctorId]) {
    slotCache[doctorId] = generateSlots(doctorId);
  }
  return slotCache[doctorId];
};
