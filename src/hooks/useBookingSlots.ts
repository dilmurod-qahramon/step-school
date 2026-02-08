import { useState, useEffect, useCallback } from 'react';
import type { TimeSlot } from '@/components/booking/TimeSlotTable';
import type { BookingFormData } from '@/components/booking/BookingDialog';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzszU_Lsrc5jbn--b8LKcfrFh5qU4V2fU7Mw21MUUGT34-G3lv2dbWhhEjOlcVzC-Dy/exec';

interface UseBookingSlotsProps {
  teacherId: string;
  teacherName: string;
}

export const useBookingSlots = ({ teacherId, teacherName }: UseBookingSlotsProps) => {
  const [bookedSlots, setBookedSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookedSlots = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
         `${APPS_SCRIPT_URL}?teacherName=${encodeURIComponent(teacherName)}`,
        {
          method: 'GET',
          redirect: 'follow',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.bookings)) {
        setBookedSlots(data.bookings.map((booking: any) => ({
          date: booking.date,
          time: booking.time,
          isBooked: true,
          bookedBy: {
            name: booking.name,
            phone: booking.phone,
          },
        })));
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookedSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, [teacherName]);

  // Create a new booking
  const createBooking = async (
    date: string,
    time: string,
    formData: BookingFormData
  ): Promise<boolean> => {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'createBooking',
          teacherId,
          teacherName,
          date,
          time,
          name: formData.fullName,
          phone: formData.phone || '',
          comments: formData.comments || '',
          timestamp: new Date().toISOString(),
        }),
        redirect: 'follow',
      });

      const data = await response.json();

      if (data.success) {
        setBookedSlots(prev => [
          ...prev,
          {
            date,
            time,
            isBooked: true,
            bookedBy: {
              name: formData.fullName,
              phone: formData.phone,
            },
          },
        ]);
        return true;
      } else {
        throw new Error(data.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  return {
    bookedSlots,
    isLoading,
    error,
    createBooking,
    refetch: fetchBookedSlots,
  };
};
