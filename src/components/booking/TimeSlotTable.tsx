import { useState, useRef } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { uz } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export interface TimeSlot {
  date: string;
  time: string;
  isBooked: boolean;
  bookedBy?: {
    name: string;
    phone?: string;
  };
}

interface TimeSlotTableProps {
  teacherId: string;
  teacherName: string;
  bookedSlots: TimeSlot[];
  onSlotSelect: (date: string, time: string) => void;
  isLoading?: boolean;
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const TimeSlotTable = ({ 
  bookedSlots, 
  onSlotSelect,
  isLoading 
}: TimeSlotTableProps) => {
  const initialWeekStart = useRef(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [weekStart, setWeekStart] = useState(initialWeekStart.current);
  const [hasMovedNext, setHasMovedNext] = useState(false);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const isSlotBooked = (date: Date, time: string): TimeSlot | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return bookedSlots.find(slot => slot.date === dateStr && slot.time === time);
  };

  const isPastSlot = (date: Date, time: string): boolean => {
    const now = new Date();
    const [hours] = time.split(':').map(Number);
    const slotDate = new Date(date);
    slotDate.setHours(hours, 0, 0, 0);
    return slotDate < now;
  };

  const handleNextWeek = () => {
    setWeekStart(prev => addDays(prev, 7));
    setHasMovedNext(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-muted-foreground">Yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-foreground">
          {format(weekStart, 'd MMMM', { locale: uz })} - {format(addDays(weekStart, 6), 'd MMMM yyyy', { locale: uz })}
        </span>
        {!hasMovedNext && (
          <button
            onClick={handleNextWeek}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Keyingi hafta →
          </button>
        )}
      </div>

      {/* Time Slot Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-border bg-muted text-muted-foreground text-sm font-medium min-w-[70px]">
                Vaqt
              </th>
              {weekDays.map((day) => (
                <th 
                  key={day.toISOString()} 
                  className={cn(
                    "p-2 border border-border text-sm font-medium min-w-[100px]",
                    isSameDay(day, new Date()) 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <div>{format(day, 'EEEE', { locale: uz })}</div>
                  <div className="text-xs opacity-80">{format(day, 'd MMM', { locale: uz })}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time) => (
              <tr key={time}>
                <td className="p-2 border border-border bg-muted text-center text-sm font-medium text-muted-foreground">
                  {time}
                </td>
                {weekDays.map((day) => {
                  const bookedSlot = isSlotBooked(day, time);
                  const isPast = isPastSlot(day, time);
                  const dateStr = format(day, 'yyyy-MM-dd');

                  return (
                    <td 
                      key={`${dateStr}-${time}`}
                      className="p-1 border border-border"
                    >
                      {bookedSlot ? (
                        <div 
                          className="p-2 rounded bg-destructive/20 text-destructive text-xs text-center cursor-not-allowed"
                          title={`Band: ${bookedSlot.bookedBy?.name || 'Noma\'lum'}`}
                        >
                          <div className="font-medium">Band</div>
                          <div className="truncate text-[10px] opacity-80">
                            {bookedSlot.bookedBy?.name}
                          </div>
                        </div>
                      ) : isPast ? (
                        <div className="p-2 rounded bg-muted text-muted-foreground text-xs text-center cursor-not-allowed">
                          O'tgan
                        </div>
                      ) : (
                        <button
                          onClick={() => onSlotSelect(dateStr, time)}
                          className="w-full p-2 rounded bg-green-100 hover:bg-green-200 text-green-700 text-xs text-center transition-colors dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400"
                        >
                          Bo'sh
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30"></div>
          <span className="text-muted-foreground">Bo'sh</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/20"></div>
          <span className="text-muted-foreground">Band</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted"></div>
          <span className="text-muted-foreground">O'tgan</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotTable;
