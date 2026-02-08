import { useState, useRef } from 'react';
import { format, addDays, startOfWeek, isSameDay, isAfter, isBefore } from 'date-fns';
import { uz } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Clock, User, X } from 'lucide-react';

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

  const maxWeekStart = addDays(initialWeekStart.current, 7);
  const latestAllowedDate = addDays(initialWeekStart.current, 13);
  const canMoveNext = isBefore(weekStart, maxWeekStart);
  const canMovePrev = isAfter(weekStart, initialWeekStart.current);

  const handleNextWeek = () => {
    if (!canMoveNext) return;
    setWeekStart(prev => addDays(prev, 7));
  };

  const handlePrevWeek = () => {
    if (!canMovePrev) return;
    setWeekStart(prev => addDays(prev, -7));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <span className="text-muted-foreground font-medium">Ma'lumotlar yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hafta</p>
            <p className="font-semibold text-foreground">
              {format(weekStart, 'd MMMM', { locale: uz })} - {format(addDays(weekStart, 6), 'd MMMM', { locale: uz })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevWeek}
            disabled={!canMovePrev}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              canMovePrev
                ? "bg-background border border-border hover:bg-accent text-foreground shadow-sm"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextWeek}
            disabled={!canMoveNext}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              canMoveNext
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Time Slot Grid */}
      <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="w-full border-collapse bg-background">
          <thead>
            <tr>
              <th className="p-3 bg-muted/70 text-muted-foreground text-xs font-semibold uppercase tracking-wider min-w-[70px] border-b border-r border-border">
                Vaqt
              </th>
              {weekDays.map((day) => (
                <th 
                  key={day.toISOString()} 
                  className={cn(
                    "p-3 text-xs font-semibold min-w-[110px] border-b border-r border-border last:border-r-0",
                    isSameDay(day, new Date()) 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/70 text-muted-foreground"
                  )}
                >
                  <div className="uppercase tracking-wider">{format(day, 'EEE', { locale: uz })}</div>
                  <div className={cn(
                    "text-lg font-bold mt-1",
                    isSameDay(day, new Date()) ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {format(day, 'd', { locale: uz })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time, rowIdx) => (
              <tr key={time} className={rowIdx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                <td className="p-2 border-r border-b border-border text-center">
                  <span className="text-sm font-semibold text-foreground">{time}</span>
                </td>
                {weekDays.map((day) => {
                  const bookedSlot = isSlotBooked(day, time);
                  const isPast = isPastSlot(day, time);
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const isBeyondAllowed = isAfter(day, latestAllowedDate);

                  return (
                    <td 
                      key={`${dateStr}-${time}`}
                      className="p-1.5 border-r border-b border-border last:border-r-0"
                    >
                      {bookedSlot ? (
                        <div 
                          className="h-full min-h-[52px] rounded-lg bg-destructive/10 border-2 border-destructive/30 p-2 flex flex-col items-center justify-center cursor-not-allowed"
                          title={`Band: ${bookedSlot.bookedBy?.name || 'Noma\'lum'}`}
                        >
                          <div className="flex items-center gap-1 text-destructive font-semibold text-xs">
                            <User className="w-3 h-3" />
                            <span>Band</span>
                          </div>
                          <div className="text-[10px] text-destructive/80 truncate max-w-full mt-0.5">
                            {bookedSlot.bookedBy?.name}
                          </div>
                        </div>
                      ) : isPast ? (
                        <div className="h-full min-h-[52px] rounded-lg bg-muted/50 border border-border p-2 flex items-center justify-center cursor-not-allowed">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <X className="w-3 h-3" />
                            <span>O'tgan</span>
                          </div>
                        </div>
                      ) : isBeyondAllowed ? (
                        <div className="h-full min-h-[52px] rounded-lg bg-muted/30 border border-dashed border-border p-2 flex items-center justify-center cursor-not-allowed">
                          <span className="text-muted-foreground/60 text-xs">—</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onSlotSelect(dateStr, time)}
                          className="w-full h-full min-h-[52px] rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-200 p-2 flex items-center justify-center group"
                        >
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium text-xs group-hover:scale-105 transition-transform">
                            Bo'sh
                          </span>
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
      <div className="flex flex-wrap gap-4 text-sm bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800"></div>
          <span className="text-muted-foreground text-xs font-medium">Bo'sh</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-destructive/10 border-2 border-destructive/30"></div>
          <span className="text-muted-foreground text-xs font-medium">Band</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-muted/50 border border-border"></div>
          <span className="text-muted-foreground text-xs font-medium">O'tgan</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotTable;
